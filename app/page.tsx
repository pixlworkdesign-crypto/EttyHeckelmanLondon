import Link from "next/link";
import { getProducts, getSiteSettings } from "@/lib/shopify";
import { Hero } from "@/components/home/hero";
import { StorySplit, BespokeBanner, ValueRow, SignaturePackaging } from "@/components/home/editorial";
import { ProductGrid } from "@/components/product/product-grid";
import { Reveal } from "@/components/ui/reveal";

export const revalidate = 60;

export default async function HomePage() {
  const [products, settings] = await Promise.all([
    getProducts({ first: 8 }),
    getSiteSettings(),
  ]);

  const featured = products.slice(0, 4);

  return (
    <>
      <Hero image={settings.heroUrl} />
      <ValueRow />

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
        <SignaturePackaging />
      </Reveal>

      <Reveal>
        <BespokeBanner />
      </Reveal>
    </>
  );
}
