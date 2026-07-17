import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/shopify";
import { CollectionBrowser } from "@/components/collection/collection-browser";

export const revalidate = 60;

function titleFromHandle(handle: string) {
  return handle
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const title = titleFromHandle(type);
  return { title, description: `Shop ${title} at Etty Hekelman London.` };
}

export default async function ShopByTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const all = await getProducts({ first: 100 });
  // Match on the Shopify Product Type (falling back to a matching tag), so a
  // category shows every product of that type — no collection required.
  const products = all.filter(
    (p) => slugify(p.productType) === type || p.tags.some((t) => slugify(t) === type)
  );
  const title = titleFromHandle(type);

  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20">
      <header className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
        <nav className="text-[0.7rem] uppercase tracking-[0.16em] text-ash mb-6">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{title}</span>
        </nav>
        <h1 className="font-display text-5xl md:text-6xl">{title}</h1>
      </header>

      {products.length > 0 ? (
        <CollectionBrowser products={products} />
      ) : (
        <div className="text-center py-16 max-w-md mx-auto">
          <div className="rule-motif mb-6">
            <span />
          </div>
          <h2 className="font-display text-3xl">Arriving Soon</h2>
          <p className="text-ash font-light mt-3 leading-relaxed">
            Pieces in this category are being prepared. In the meantime, discover the rest
            of our handcrafted pieces.
          </p>
          <Link href="/collections" className="btn btn-outline mt-8">
            Browse all
          </Link>
        </div>
      )}
    </div>
  );
}
