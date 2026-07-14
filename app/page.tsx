import Link from "next/link";
import { getCollections, getProducts } from "@/lib/shopify";
import { Hero } from "@/components/home/hero";
import { CategoryTiles } from "@/components/home/category-tiles";
import { StorySplit, BespokeBanner, ValueRow } from "@/components/home/editorial";
import { ProductGrid } from "@/components/product/product-grid";
import { Reveal } from "@/components/ui/reveal";

export const revalidate = 60;

export default async function HomePage() {
  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts({ first: 8 }),
  ]);

  const featured = products.slice(0, 4);

  return (
    <>
      <Hero />
      <ValueRow />

      <Reveal>
        <CategoryTiles collections={collections} />
      </Reveal>

      {/* Featured pieces */}
      <Reveal as="section" className="mx-auto max-w-[1400px] px-5 md:px-10 pb-20 md:pb-28">
        <div className="rule-motif mb-6">
          <span />
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="overline">Newly Arrived</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3">The Latest Pieces</h2>
          </div>
          <Link
            href="/collections"
            className="link-underline text-[0.72rem] uppercase tracking-[0.18em] text-ink self-start md:self-auto"
          >
            View all
          </Link>
        </div>
        <ProductGrid products={featured} />
      </Reveal>

      <Reveal>
        <StorySplit />
      </Reveal>

      <Reveal>
        <BespokeBanner />
      </Reveal>
    </>
  );
}
