import { getProductQuery, getProductsQuery, getCollectionsQuery, getCollectionProductsQuery, getCartQuery } from "./queries";
import { createCartMutation, addToCartMutation, updateCartMutation, removeFromCartMutation } from "./mutations";
import { MOCK_COLLECTIONS, MOCK_PRODUCTS, mockCollectionProducts } from "./mock-data";
import type { Cart, Collection, Product, ProductVariant } from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "");
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2025-01";

/** True when real Shopify credentials are configured. */
export const isShopifyConfigured = Boolean(domain && accessToken);

const endpoint = domain
  ? `https://${domain}/api/${apiVersion}/graphql.json`
  : "";

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  tags,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": accessToken as string,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    ...(tags ? { next: { tags } } : {}),
  });

  if (!res.ok) {
    throw new Error(`Shopify request failed: ${res.status} ${res.statusText}`);
  }

  const body = (await res.json()) as GraphQLResponse<T>;
  if (body.errors?.length) {
    throw new Error(body.errors.map((e) => e.message).join("; "));
  }
  return body.data as T;
}

// --- normalisation helpers -------------------------------------------------

type Edge<T> = { node: T };
type Connection<T> = { edges: Edge<T>[] };

const flatten = <T>(c?: Connection<T>): T[] => (c ? c.edges.map((e) => e.node) : []);

type RawProduct = Omit<Product, "images" | "variants"> & {
  images: Connection<Product["images"][number]>;
  variants: Connection<ProductVariant>;
};

function normaliseProduct(raw: RawProduct | null): Product | null {
  if (!raw) return null;
  return {
    ...raw,
    images: flatten(raw.images),
    variants: flatten(raw.variants),
  };
}

type RawCart = Omit<Cart, "lines"> & { lines: Connection<Cart["lines"][number]> };

function normaliseCart(raw: RawCart | null): Cart | null {
  if (!raw) return null;
  return { ...raw, lines: flatten(raw.lines) };
}

// --- public data access ----------------------------------------------------

export async function getProducts(options?: {
  first?: number;
  query?: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<Product[]> {
  if (!isShopifyConfigured) return MOCK_PRODUCTS.slice(0, options?.first ?? MOCK_PRODUCTS.length);
  const data = await shopifyFetch<{ products: Connection<RawProduct> }>({
    query: getProductsQuery,
    variables: {
      first: options?.first ?? 24,
      query: options?.query,
      sortKey: options?.sortKey,
      reverse: options?.reverse,
    },
    tags: ["products"],
  });
  return flatten(data.products).map(normaliseProduct).filter(Boolean) as Product[];
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured) return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
  const data = await shopifyFetch<{ product: RawProduct | null }>({
    query: getProductQuery,
    variables: { handle },
    tags: ["products", `product-${handle}`],
  });
  return normaliseProduct(data.product);
}

export async function getCollections(): Promise<Collection[]> {
  if (!isShopifyConfigured) return MOCK_COLLECTIONS;
  const data = await shopifyFetch<{ collections: Connection<Collection> }>({
    query: getCollectionsQuery,
    variables: { first: 20 },
    tags: ["collections"],
  });
  return flatten(data.collections).filter((c) => !c.handle.startsWith("frontpage"));
}

export async function getCollectionProducts(
  handle: string,
  options?: { sortKey?: string; reverse?: boolean }
): Promise<{ collection: Collection | null; products: Product[] }> {
  if (!isShopifyConfigured) {
    const collection = MOCK_COLLECTIONS.find((c) => c.handle === handle) ?? null;
    return { collection, products: mockCollectionProducts(handle) };
  }
  const data = await shopifyFetch<{
    collection: (Collection & { products: Connection<RawProduct> }) | null;
  }>({
    query: getCollectionProductsQuery,
    variables: { handle, first: 48, sortKey: options?.sortKey, reverse: options?.reverse },
    tags: ["collections", "products", `collection-${handle}`],
  });
  if (!data.collection) return { collection: null, products: [] };
  const { products, ...collection } = data.collection;
  return {
    collection,
    products: flatten(products).map(normaliseProduct).filter(Boolean) as Product[],
  };
}

// --- cart -------------------------------------------------------------------

export async function getCart(cartId: string): Promise<Cart | null> {
  if (!isShopifyConfigured) return null;
  const data = await shopifyFetch<{ cart: RawCart | null }>({
    query: getCartQuery,
    variables: { cartId },
    cache: "no-store",
  });
  return normaliseCart(data.cart);
}

export async function createCart(lines: { merchandiseId: string; quantity: number }[] = []): Promise<Cart | null> {
  if (!isShopifyConfigured) return null;
  const data = await shopifyFetch<{ cartCreate: { cart: RawCart | null } }>({
    query: createCartMutation,
    variables: { lines },
    cache: "no-store",
  });
  return normaliseCart(data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart | null> {
  if (!isShopifyConfigured) return null;
  const data = await shopifyFetch<{ cartLinesAdd: { cart: RawCart | null } }>({
    query: addToCartMutation,
    variables: { cartId, lines },
    cache: "no-store",
  });
  return normaliseCart(data.cartLinesAdd.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart | null> {
  if (!isShopifyConfigured) return null;
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: RawCart | null } }>({
    query: updateCartMutation,
    variables: { cartId, lines },
    cache: "no-store",
  });
  return normaliseCart(data.cartLinesUpdate.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart | null> {
  if (!isShopifyConfigured) return null;
  const data = await shopifyFetch<{ cartLinesRemove: { cart: RawCart | null } }>({
    query: removeFromCartMutation,
    variables: { cartId, lineIds },
    cache: "no-store",
  });
  return normaliseCart(data.cartLinesRemove.cart);
}

export type { Cart, Collection, Product, ProductVariant };
