import type { Collection, Product } from "./types";

// Curated demo catalogue used when no Shopify credentials are present, so the
// storefront renders a complete, luxurious experience out of the box. Every
// query in `index.ts` transparently falls back to this data.

const GBP = (amount: string) => ({ amount, currencyCode: "GBP" });

const img = (url: string, altText: string) => ({
  url,
  altText,
  width: 1200,
  height: 1500,
});

function makeProduct(p: {
  handle: string;
  title: string;
  price: string;
  compareAt?: string;
  type: string;
  image: string;
  gallery?: string[];
  description: string;
  tags?: string[];
}): Product {
  const variantId = `gid://shopify/ProductVariant/mock-${p.handle}`;
  const compareAtMoney = p.compareAt ? GBP(p.compareAt) : null;
  return {
    id: `gid://shopify/Product/mock-${p.handle}`,
    handle: p.handle,
    title: p.title,
    description: p.description,
    descriptionHtml: `<p>${p.description}</p>`,
    availableForSale: true,
    tags: p.tags ?? [],
    productType: p.type,
    vendor: "Etty Heckelman London",
    featuredImage: img(p.image, p.title),
    images: [img(p.image, p.title), ...(p.gallery ?? []).map((g) => img(g, p.title))],
    options: [
      {
        id: `gid://shopify/ProductOption/mock-${p.handle}`,
        name: "Metal",
        values: ["18ct Yellow Gold", "18ct White Gold", "Platinum"],
      },
    ],
    variants: [
      {
        id: variantId,
        title: "18ct Yellow Gold",
        availableForSale: true,
        quantityAvailable: 5,
        selectedOptions: [{ name: "Metal", value: "18ct Yellow Gold" }],
        price: GBP(p.price),
        compareAtPrice: compareAtMoney,
      },
      {
        id: `${variantId}-white`,
        title: "18ct White Gold",
        availableForSale: true,
        quantityAvailable: 3,
        selectedOptions: [{ name: "Metal", value: "18ct White Gold" }],
        price: GBP(p.price),
        compareAtPrice: compareAtMoney,
      },
      {
        id: `${variantId}-platinum`,
        title: "Platinum",
        availableForSale: true,
        quantityAvailable: 2,
        selectedOptions: [{ name: "Metal", value: "Platinum" }],
        price: GBP((Number(p.price) * 1.25).toFixed(2)),
        compareAtPrice: p.compareAt ? GBP((Number(p.compareAt) * 1.25).toFixed(2)) : null,
      },
    ],
    priceRange: {
      minVariantPrice: GBP(p.price),
      maxVariantPrice: GBP((Number(p.price) * 1.25).toFixed(2)),
    },
    compareAtPriceRange: compareAtMoney ? { minVariantPrice: compareAtMoney } : null,
    seo: { title: p.title, description: p.description },
  };
}

// Unsplash imagery — refined, editorial jewellery photography for the demo.
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export const MOCK_PRODUCTS: Product[] = [
  makeProduct({
    handle: "solitaire-brilliant-ring",
    title: "The Solitaire Brilliant Ring",
    price: "4850.00",
    type: "Rings",
    image: U("1605100804763-247f67b3557e"),
    gallery: [U("1602751584552-8ba73aad10e1"), U("1515562141207-7a88fb7ce338")],
    description:
      "A single brilliant-cut diamond set upon a hand-finished band. Timeless, luminous and made to be worn for a lifetime.",
    tags: ["engagement", "diamond", "bestseller"],
  }),
  makeProduct({
    handle: "eternity-pave-band",
    title: "Eternity Pavé Band",
    price: "3200.00",
    compareAt: "3850.00",
    type: "Rings",
    image: U("1603561591411-07134e71a2a9"),
    gallery: [U("1596944924616-7b38e7cfac36")],
    description:
      "An unbroken line of pavé-set diamonds encircling the finger — a quiet symbol of forever.",
    tags: ["wedding", "diamond"],
  }),
  makeProduct({
    handle: "drop-diamond-earrings",
    title: "Drop Diamond Earrings",
    price: "2750.00",
    type: "Earrings",
    image: U("1535632066927-ab7c9ab60908"),
    gallery: [U("1611591437281-460bfbe1220a")],
    description:
      "Articulated diamond drops that catch the light with every movement. Featherlight, endlessly elegant.",
    tags: ["earrings", "diamond", "bestseller"],
  }),
  makeProduct({
    handle: "riviere-diamond-necklace",
    title: "Rivière Diamond Necklace",
    price: "9600.00",
    type: "Necklaces",
    image: U("1599643478518-a784e5dc4c8f"),
    gallery: [U("1611085583191-a3b181a88401")],
    description:
      "A graduated rivière of brilliant diamonds resting perfectly along the collarbone. The definition of occasion jewellery.",
    tags: ["necklace", "diamond", "high-jewellery"],
  }),
  makeProduct({
    handle: "sapphire-halo-ring",
    title: "Ceylon Sapphire Halo Ring",
    price: "6400.00",
    type: "Rings",
    image: U("1608042314453-ae338d80c427"),
    description:
      "A velvet-blue Ceylon sapphire framed by a halo of brilliant diamonds, set in platinum.",
    tags: ["sapphire", "engagement"],
  }),
  makeProduct({
    handle: "gold-tennis-bracelet",
    title: "Diamond Tennis Bracelet",
    price: "5200.00",
    type: "Bracelets",
    image: U("1611652022419-a9419f74343d"),
    description:
      "A supple line of individually claw-set diamonds. The bracelet that never leaves your wrist.",
    tags: ["bracelet", "diamond", "bestseller"],
  }),
  makeProduct({
    handle: "pearl-drop-pendant",
    title: "South Sea Pearl Pendant",
    price: "1850.00",
    type: "Necklaces",
    image: U("1611591437281-460bfbe1220a"),
    description:
      "A single lustrous South Sea pearl suspended from a fine gold chain. Understated luxury.",
    tags: ["pearl", "necklace"],
  }),
  makeProduct({
    handle: "emerald-cut-studs",
    title: "Emerald-Cut Diamond Studs",
    price: "3950.00",
    type: "Earrings",
    image: U("1589207212797-cfd578c76b3e"),
    description:
      "Architectural emerald-cut diamonds set close to the ear. Clean lines, exceptional clarity.",
    tags: ["earrings", "diamond"],
  }),
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "gid://shopify/Collection/mock-rings",
    handle: "rings",
    title: "Rings",
    description:
      "Engagement, eternity and cocktail rings — each stone hand-selected and set in our London atelier.",
    image: img(U("1605100804763-247f67b3557e"), "Rings"),
  },
  {
    id: "gid://shopify/Collection/mock-earrings",
    handle: "earrings",
    title: "Earrings",
    description: "From everyday studs to statement drops, made to catch the light.",
    image: img(U("1535632066927-ab7c9ab60908"), "Earrings"),
  },
  {
    id: "gid://shopify/Collection/mock-necklaces",
    handle: "necklaces",
    title: "Necklaces",
    description: "Pendants, rivières and chains that trace the neckline with quiet brilliance.",
    image: img(U("1599643478518-a784e5dc4c8f"), "Necklaces"),
  },
  {
    id: "gid://shopify/Collection/mock-bracelets",
    handle: "bracelets",
    title: "Bracelets",
    description: "Tennis bracelets and bangles finished by hand to sit perfectly on the wrist.",
    image: img(U("1611652022419-a9419f74343d"), "Bracelets"),
  },
];

export function mockCollectionProducts(handle: string): Product[] {
  const byType: Record<string, string> = {
    rings: "Rings",
    earrings: "Earrings",
    necklaces: "Necklaces",
    bracelets: "Bracelets",
  };
  const type = byType[handle];
  if (!type) return MOCK_PRODUCTS;
  return MOCK_PRODUCTS.filter((p) => p.productType === type);
}
