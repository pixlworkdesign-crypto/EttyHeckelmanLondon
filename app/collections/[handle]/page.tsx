import type { Metadata } from "next";
import Link from "next/link";
import { getCollectionProducts, getCollections, getProducts } from "@/lib/shopify";
import { CollectionBrowser } from "@/components/collection/collection-browser";
import type { Collection } from "@/lib/shopify/types";

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

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const { collection } = await getCollectionProducts(handle);
  const title = collection?.title ?? titleFromHandle(handle);
  return {
    title,
    description: collection?.description || `Shop ${title} at Etty Hekelman London.`,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  let { collection, products } = await getCollectionProducts(handle);

  // Graceful fallback: if there is no Shopify collection with this handle yet,
  // match products by their type or tags so menu links work as soon as a
  // product's category is set — no hard 404 while the shop is being set up.
  if (!collection) {
    const all = await getProducts({ first: 100 });
    products = all.filter(
      (p) => slugify(p.productType) === handle || p.tags.some((t) => slugify(t) === handle)
    );
    const synthetic: Collection = {
      id: handle,
      handle,
      title: titleFromHandle(handle),
      description: "",
      image: null,
    };
    collection = synthetic;
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20">
      <header className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
        <nav className="text-[0.7rem] uppercase tracking-[0.16em] text-ash mb-6">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:text-ink transition-colors">Collections</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{collection.title}</span>
        </nav>
        <h1 className="font-display text-5xl md:text-6xl">{collection.title}</h1>
        {collection.description && (
          <p className="text-ash font-light mt-5 leading-relaxed">{collection.description}</p>
        )}
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
            This collection is being prepared. In the meantime, discover the rest of our
            handcrafted pieces.
          </p>
          <Link href="/collections" className="btn btn-outline mt-7">
            Browse All Collections
          </Link>
        </div>
      )}
    </div>
  );
}
