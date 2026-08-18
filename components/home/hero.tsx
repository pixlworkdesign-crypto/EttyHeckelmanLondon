import Image from "next/image";
import Link from "next/link";
import { HERO_IMAGE } from "@/lib/site";

/**
 * The homepage hero. Two layouts, chosen by the merchant from Shopify via the
 * `hero_layout` field on the `site_settings` metaobject:
 *   • "split" (default) — image in one column, headline/buttons on cream beside it.
 *   • "full"            — full-width image with the headline centred on top.
 * The hero image itself is the `hero_image` field on the same metaobject.
 */
export function Hero({ image, layout }: { image?: string | null; layout?: string | null }) {
  const src = image || HERO_IMAGE || null;
  const isFull = (layout ?? "").trim().toLowerCase().startsWith("full");
  return isFull ? <FullHero src={src} /> : <SplitHero src={src} />;
}

/** Quiet brand-cream stand-in shown only if no real hero image has loaded —
 *  never a stock photo. */
function HeroPlaceholder() {
  return <div className="absolute inset-0 bg-gradient-to-br from-ivory via-stone/50 to-ivory" />;
}

const EYEBROW = "The Winter Collection";
const HEADLINE = (
  <>
    Light, held<br />for a lifetime
  </>
);
const BLURB =
  "Fine jewellery, handcrafted with care. Rare stones, set by hand, made to be treasured and passed on.";

function SplitHero({ src }: { src: string | null }) {
  return (
    <section className="relative md:grid md:grid-cols-2 md:min-h-[86vh]">
      {/* Image — full-bleed behind the copy on mobile, its own column on desktop */}
      <div className="absolute inset-0 md:relative md:order-1 overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt="Etty Hekelman London fine jewellery"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        ) : (
          <HeroPlaceholder />
        )}
        {/* Mobile-only scrim so overlaid text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir/65 via-noir/15 to-noir/5 md:hidden" />
      </div>

      {/* Copy — overlaid at the bottom on mobile, cream column on desktop */}
      <div className="relative order-2 min-h-[80vh] md:min-h-0 flex flex-col justify-end md:justify-center gap-5 md:gap-6 px-8 md:px-14 lg:px-20 pb-16 md:py-0 text-center md:text-left md:bg-ivory">
        <p className="eyebrow text-porcelain/80 md:text-champagne animate-rise">{EYEBROW}</p>
        <h1 className="font-display font-light text-[2.7rem] md:text-6xl lg:text-[4.4rem] leading-[1.05] tracking-[0.01em] text-porcelain md:text-noir animate-rise">
          {HEADLINE}
        </h1>
        <p className="max-w-md mx-auto md:mx-0 font-light md:text-lg leading-relaxed text-porcelain/90 md:text-ash animate-rise">
          {BLURB}
        </p>
        <div className="mt-2 flex flex-col sm:flex-row gap-3.5 justify-center md:justify-start animate-rise">
          <Link
            href="/collections/earrings"
            className="btn bg-porcelain text-ink hover:bg-champagne hover:text-porcelain md:bg-noir md:text-porcelain md:border md:border-noir md:hover:bg-transparent md:hover:text-noir"
          >
            Shop Earrings
          </Link>
          <Link
            href="/bespoke"
            className="btn border border-porcelain text-porcelain hover:bg-porcelain hover:text-ink md:border-noir md:text-noir md:hover:bg-noir md:hover:text-porcelain"
          >
            Create Bespoke
          </Link>
        </div>
      </div>
    </section>
  );
}

function FullHero({ src }: { src: string | null }) {
  return (
    <section className="relative h-[86vh] min-h-[600px] w-full overflow-hidden">
      {src ? (
        <Image
          src={src}
          alt="Etty Hekelman London fine jewellery"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      ) : (
        <HeroPlaceholder />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-noir/45 via-noir/10 to-noir/5" />

      <div className="relative h-full mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col items-center justify-center text-center text-porcelain">
        <p className="eyebrow text-porcelain/75 animate-rise">{EYEBROW}</p>
        <h1 className="font-display font-light text-[2.9rem] md:text-7xl lg:text-[5.5rem] mt-7 leading-[1.06] tracking-[0.015em] animate-rise">
          {HEADLINE}
        </h1>
        <p className="mt-8 max-w-md text-porcelain/85 font-light md:text-lg leading-relaxed tracking-wide animate-rise">
          {BLURB}
        </p>
        <div className="mt-11 flex flex-col sm:flex-row gap-4 animate-rise">
          <Link href="/collections/earrings" className="btn btn-primary bg-porcelain text-ink hover:bg-champagne hover:text-porcelain">
            Shop Earrings
          </Link>
          <Link href="/bespoke" className="btn btn-outline border-porcelain text-porcelain hover:bg-porcelain hover:text-ink">
            Create Bespoke
          </Link>
        </div>
      </div>
    </section>
  );
}
