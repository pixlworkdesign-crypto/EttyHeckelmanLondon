import type { Metadata } from "next";
import { getProducts } from "@/lib/shopify";
import { CollectionBrowser } from "@/components/collection/collection-browser";

export const metadata: Metadata = {
  title: "All Jewellery",
  description: "Explore every piece from Etty Hekelman London — rings, earrings, necklaces and bracelets.",
};

export const revalidate = 60;

export default async function ShopAllPage() {
  const products = await getProducts({ first: 100 });

  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20">
      <header className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
        <p className="eyebrow">The Collection</p>
        <h1 className="font-display text-5xl md:text-6xl mt-4 tracking-[0.01em]">All Jewellery</h1>
        <span aria-hidden className="mt-6 inline-block w-[6px] h-[6px] rotate-45 bg-champagne" />
      </header>

      {products.length > 0 ? (
        <CollectionBrowser products={products} />
      ) : (
        <p className="text-center text-ash font-light py-16">
          Our pieces will appear here soon.
        </p>
      )}
    </div>
  );
}
