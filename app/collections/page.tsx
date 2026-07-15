import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getCollections } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore the collections of Etty Hekelman London — rings, earrings, necklaces and bracelets.",
};

export const revalidate = 60;

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
      <header className="text-center mb-14">
        <p className="eyebrow">The Collections</p>
        <h1 className="font-display text-5xl md:text-6xl mt-3">Explore Our World</h1>
        <p className="text-ash font-light mt-4 max-w-xl mx-auto">
          Each collection is designed and handcrafted in our London atelier, using the
          finest ethically sourced stones.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {collections.map((c) => (
          <Link key={c.id} href={`/collections/${c.handle}`} className="group relative block">
            <div className="relative aspect-[16/10] overflow-hidden bg-ivory">
              {c.image && (
                <Image
                  src={c.image.url}
                  alt={c.image.altText ?? c.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-porcelain">
                <h2 className="font-display text-3xl md:text-4xl">{c.title}</h2>
                {c.description && (
                  <p className="text-porcelain/80 font-light text-sm mt-2 max-w-md line-clamp-2">
                    {c.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
