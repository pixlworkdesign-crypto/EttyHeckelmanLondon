import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/shopify/types";

/** The four fixed jewellery types. These always show, even before any Shopify
 *  collection exists — a category with a matching collection handle borrows its
 *  image; otherwise it renders as a clean brand tile. */
const CATEGORIES = [
  { title: "Rings", handle: "rings" },
  { title: "Earrings", handle: "earrings" },
  { title: "Necklaces", handle: "necklaces" },
  { title: "Bracelets", handle: "bracelets" },
];

const CATEGORY_HANDLES = new Set(CATEGORIES.map((c) => c.handle));

type ImageRef = Collection["image"];

function Tile({
  href,
  title,
  image,
  ratio,
}: {
  href: string;
  title: string;
  image: ImageRef;
  ratio: string;
}) {
  const url = image?.url ?? null;
  return (
    <Link href={href} className="group relative block">
      <div className={`relative ${ratio} overflow-hidden bg-gradient-to-br from-ivory via-stone/40 to-champagne/15`}>
        {url ? (
          <>
            <Image
              src={url}
              alt={image?.altText ?? title}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-center text-porcelain">
              <h3 className="font-display text-2xl md:text-3xl">{title}</h3>
              <span className="eyebrow text-porcelain/80 inline-block mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Discover &rarr;
              </span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink">
            <h3 className="font-display text-2xl md:text-3xl">{title}</h3>
            <span className="eyebrow text-champagne opacity-0 group-hover:opacity-100 transition-opacity">
              Discover &rarr;
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

export function ShopByCategory({ collections }: { collections: Collection[] }) {
  const imageFor = (handle: string) =>
    collections.find((c) => c.handle === handle)?.image ?? null;

  return (
    <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28">
      <div className="text-center mb-14">
        <p className="eyebrow">Find Your Piece</p>
        <h2 className="font-display text-4xl md:text-5xl mt-3">Shop by Category</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {CATEGORIES.map((c) => (
          <Tile
            key={c.handle}
            href={`/collections/${c.handle}`}
            title={c.title}
            image={imageFor(c.handle)}
            ratio="aspect-[3/4]"
          />
        ))}
      </div>
    </section>
  );
}

export function ShopByCollection({ collections }: { collections: Collection[] }) {
  // Themed collections only — exclude the four category collections.
  const themed = collections.filter((c) => !CATEGORY_HANDLES.has(c.handle));
  if (themed.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28 border-t border-line">
      <div className="text-center mb-14">
        <p className="eyebrow">Curated Edits</p>
        <h2 className="font-display text-4xl md:text-5xl mt-3">Shop by Collection</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {themed.map((c) => (
          <Tile
            key={c.id}
            href={`/collections/${c.handle}`}
            title={c.title}
            image={c.image}
            ratio="aspect-[16/10]"
          />
        ))}
      </div>
    </section>
  );
}
