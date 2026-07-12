import Link from "next/link";
import { getCollections, getProducts } from "@/lib/shopify";
import { Hero } from "@/components/home/hero";
import { CategoryTiles } from "@/components/home/category-tiles";
import { StorySplit, BespokeBanner, ValueRow } from "@/components/home/editorial";
import { ProductGrid } from "@/components/product/product-grid";

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
      <CategoryTiles collections={collections} />

      {/* Featured pieces */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 pb-20 md:pb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="overline">Newly Arrived</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3">The Latest Pieces</h2>
          </div>
          <Link href="/collections/rings" className="link-underline text-sm uppercase tracking-[0.16em] text-ink self-start md:self-auto">
            View all
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <StorySplit />
      <BespokeBanner />
    </>
  );
}
