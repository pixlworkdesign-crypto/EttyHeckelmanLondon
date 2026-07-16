import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/shopify/types";

export function CategoryTiles({ collections }: { collections: Collection[] }) {
  const featured = collections.slice(0, 4);
  return (
    <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28">
      <div className="text-center mb-14">
        <p className="eyebrow">Explore the Collection</p>
        <h2 className="font-display text-4xl md:text-5xl mt-3">Shop by Category</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {featured.map((c) => (
          <Link key={c.id} href={`/collections/${c.handle}`} className="group relative block">
            <div className="relative aspect-[3/4] overflow-hidden bg-ivory">
              {c.image && (
                <Image
                  src={c.image.url}
                  alt={c.image.altText ?? c.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-noir/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-center text-porcelain">
                <h3 className="font-display text-2xl md:text-3xl">{c.title}</h3>
                <span className="eyebrow text-porcelain/80 inline-block mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Discover →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
