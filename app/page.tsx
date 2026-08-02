import Link from "next/link";
import { getCollections, getProducts, getSiteSettings } from "@/lib/shopify";
import { Hero } from "@/components/home/hero";
import { StorySplit, BespokeBanner, ValueRow, SignaturePackaging } from "@/components/home/editorial";
import { ShopByCollection } from "@/components/home/shop-by";
import { ProductGrid } from "@/components/product/product-grid";
import { Reveal } from "@/components/ui/reveal";

export const revalidate = 60;

export default async function HomePage() {
  const [products, settings, collections] = await Promise.all([
    getProducts({ first: 8 }),
    getSiteSettings(),
    getCollections(),
  ]);

  const featured = products.slice(0, 4);

  return (
    <>
      <Hero image={settings.heroUrl} layout={settings.heroLayout} />
      <ValueRow />

      {/* Featured pieces */}
      <Reveal as="section" className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-28">
        <div className="text-center mb-12 md:mb-16">
          <p className="eyebrow">Newly Arrived</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.4rem] mt-4 tracking-[0.01em]">
            The Latest Pieces
          </h2>
          <span aria-hidden className="mt-6 inline-block w-[6px] h-[6px] rotate-45 bg-champagne" />
        </div>
        <ProductGrid products={featured} />
        <div className="text-center mt-14">
          <Link
            href="/collections"
            className="link-underline text-[0.72rem] uppercase tracking-[0.2em] text-ink"
          >
            View all
          </Link>
        </div>
      </Reveal>

      <Reveal>
        <ShopByCollection collections={collections} />
      </Reveal>

      <Reveal>
        <StorySplit />
      </Reveal>

      <Reveal>
        <SignaturePackaging />
      </Reveal>

      <Reveal>
        <BespokeBanner />
      </Reveal>
    </>
  );
}
