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
  titleClass,
}: {
  href: string;
  title: string;
  image: ImageRef;
  ratio: string;
  titleClass: string;
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
              <h3 className={`font-display ${titleClass}`}>{title}</h3>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-ink">
            <h3 className={`font-display ${titleClass}`}>{title}</h3>
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
    <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 md:py-16">
      <p className="eyebrow text-center mb-8">Shop by Category</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {CATEGORIES.map((c) => (
          <Tile
            key={c.handle}
            href={`/shop/${c.handle}`}
            title={c.title}
            image={imageFor(c.handle)}
            ratio="aspect-[4/5]"
            titleClass="text-lg md:text-xl tracking-wide"
          />
        ))}
      </div>
    </section>
  );
}

export function ShopByCollection({ collections }: { collections: Collection[] }) {
  // Themed collections only — exclude the four category collections.
  const themed = collections.filter((c) => !CATEGORY_HANDLES.has(c.handle));

  return (
    <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28 border-t border-line">
      <div className="text-center mb-14">
        <p className="eyebrow">Curated Edits</p>
        <h2 className="font-display text-4xl md:text-5xl mt-3">Shop by Collection</h2>
      </div>
      {themed.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {themed.map((c) => (
            <Tile
              key={c.id}
              href={`/collections/${c.handle}`}
              title={c.title}
              image={c.image}
              ratio="aspect-[16/10]"
              titleClass="text-3xl md:text-4xl"
            />
          ))}
        </div>
      ) : (
        <div className="text-center max-w-md mx-auto">
          <p className="text-ash font-light leading-relaxed">
            Our curated collections are being prepared. Explore the full boutique in the
            meantime.
          </p>
          <Link href="/collections" className="btn btn-outline mt-7">
            Browse all
          </Link>
        </div>
      )}
    </section>
  );
}
