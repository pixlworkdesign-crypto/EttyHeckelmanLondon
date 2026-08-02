import { getProductQuery, getProductsQuery, getCollectionsQuery, getCollectionProductsQuery, getCartQuery, getSiteSettingsQuery } from "./queries";
import { createCartMutation, addToCartMutation, updateCartMutation, removeFromCartMutation } from "./mutations";
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

// Storefront reads are cached but automatically refreshed every 60s (ISR), so
// edits made in Shopify appear on the live site within about a minute — no
// redeploy needed. Tags also allow instant, on-demand purges via the webhook
// at /api/revalidate. Cart calls opt out with cache: "no-store".
const DEFAULT_REVALIDATE = 60;

async function shopifyFetch<T>({
  query,
  variables,
  cache,
  tags,
  revalidate = DEFAULT_REVALIDATE,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number;
}): Promise<T> {
  const init: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": accessToken as string,
    },
    body: JSON.stringify({ query, variables }),
  };
  const isMutation = cache === "no-store";
  if (isMutation) {
    init.cache = "no-store";
  } else {
    init.next = { revalidate, tags };
  }

  // Read requests are safe to retry, so a transient Shopify hiccup (e.g. a 502
  // during a build) doesn't take down the whole page/build. Mutations (cart)
  // are never retried, to avoid duplicating an action.
  const maxAttempts = isMutation ? 1 : 3;
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(endpoint, init);
      if (!res.ok) {
        // Retry on transient server errors; fail fast on 4xx (our bug).
        if (res.status >= 500 && attempt < maxAttempts) {
          await new Promise((r) => setTimeout(r, attempt * 400));
          continue;
        }
        throw new Error(`Shopify request failed: ${res.status} ${res.statusText}`);
      }
      const body = (await res.json()) as GraphQLResponse<T>;
      if (body.errors?.length) {
        throw new Error(body.errors.map((e) => e.message).join("; "));
      }
      return body.data as T;
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, attempt * 400));
        continue;
      }
    }
  }
  throw lastError;
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
  if (!isShopifyConfigured) return [];
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
  if (!isShopifyConfigured) return null;
  const data = await shopifyFetch<{ product: RawProduct | null }>({
    query: getProductQuery,
    variables: { handle },
    tags: ["products", `product-${handle}`],
  });
  return normaliseProduct(data.product);
}

export async function getCollections(): Promise<Collection[]> {
  if (!isShopifyConfigured) return [];
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
  if (!isShopifyConfigured) return { collection: null, products: [] };
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

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[] = [],
  note?: string
): Promise<Cart | null> {
  if (!isShopifyConfigured) return null;
  const data = await shopifyFetch<{ cartCreate: { cart: RawCart | null } }>({
    query: createCartMutation,
    variables: { lines, note: note?.trim() || null },
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

// --- site settings (merchant-controlled logo & hero via a metaobject) -------

export type SiteSettings = {
  logoUrl: string | null;
  heroUrl: string | null;
  heroLayout: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  hours: string | null;
};

type MetaImageField = { reference?: { image?: { url?: string | null } | null } | null } | null;
type MetaTextField = { value?: string | null } | null;

export async function getSiteSettings(): Promise<SiteSettings> {
  const empty: SiteSettings = {
    logoUrl: null,
    heroUrl: null,
    heroLayout: null,
    email: null,
    phone: null,
    whatsapp: null,
    address: null,
    hours: null,
  };
  if (!isShopifyConfigured) return empty;
  try {
    const data = await shopifyFetch<{
      metaobjects: Connection<{
        logo?: MetaImageField;
        hero?: MetaImageField;
        layout?: MetaTextField;
        email?: MetaTextField;
        phone?: MetaTextField;
        whatsapp?: MetaTextField;
        address?: MetaTextField;
        hours?: MetaTextField;
      }>;
    }>({
      query: getSiteSettingsQuery,
      tags: ["site-settings"],
    });
    const node = data.metaobjects?.edges?.[0]?.node;
    const text = (f?: MetaTextField) => (f?.value?.trim() ? f.value.trim() : null);
    return {
      logoUrl: node?.logo?.reference?.image?.url ?? null,
      heroUrl: node?.hero?.reference?.image?.url ?? null,
      heroLayout: text(node?.layout),
      email: text(node?.email),
      phone: text(node?.phone),
      whatsapp: text(node?.whatsapp),
      address: text(node?.address),
      hours: text(node?.hours),
    };
  } catch {
    // The metaobject may not exist yet — fall back silently to defaults.
    return empty;
  }
}

export type { Cart, Collection, Product, ProductVariant };
