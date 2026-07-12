import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionProducts, getCollections } from "@/lib/shopify";
import { CollectionBrowser } from "@/components/collection/collection-browser";

export const revalidate = 3600;

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
  if (!collection) return { title: "Collection" };
  return {
    title: collection.title,
    description: collection.description || `Shop ${collection.title} at Etty Heckelman London.`,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const { collection, products } = await getCollectionProducts(handle);

  if (!collection) notFound();

  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20">
      <header className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
        <nav className="text-[0.7rem] uppercase tracking-[0.16em] text-ash mb-6">
          <a href="/" className="hover:text-ink transition-colors">Home</a>
          <span className="mx-2">/</span>
          <a href="/collections" className="hover:text-ink transition-colors">Collections</a>
          <span className="mx-2">/</span>
          <span className="text-ink">{collection.title}</span>
        </nav>
        <h1 className="font-display text-5xl md:text-6xl">{collection.title}</h1>
        {collection.description && (
          <p className="text-ash font-light mt-5 leading-relaxed">{collection.description}</p>
        )}
      </header>

      <CollectionBrowser products={products} />
    </div>
  );
}
