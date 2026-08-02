import Image from "next/image";
import Link from "next/link";
import { PACKAGING_IMAGE } from "@/lib/site";

export function SignaturePackaging() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
      <div className="grid md:grid-cols-2 items-stretch">
        <div className="order-2 md:order-1 bg-ivory flex items-center">
          <div className="px-8 md:px-16 py-14 md:py-0 max-w-xl">
            <p className="eyebrow">The Experience</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
              Presented beautifully
            </h2>
            <p className="text-ash font-light leading-relaxed mt-6">
              Every piece arrives in our signature packaging — a hand-finished box, a soft
              microfibre pouch and polishing cloth, wrapped in tissue and finished with our
              seal. Made to be given, and to be kept.
            </p>
            <ul className="mt-7 space-y-2.5 text-sm text-ash font-light">
              <li>Signature boxes &amp; suede pouches</li>
              <li>Complimentary gift wrapping</li>
              <li>Discreet, fully insured worldwide delivery</li>
            </ul>
            <Link href="/shipping-returns" className="btn btn-outline mt-8">
              Shipping &amp; Gifting
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2 relative aspect-[4/3] md:aspect-auto md:min-h-[560px]">
          <Image
            src={PACKAGING_IMAGE}
            alt="Etty Hekelman London signature packaging"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export function StorySplit() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
      <div className="grid md:grid-cols-2 items-stretch">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[560px] order-1 bg-gradient-to-br from-champagne/25 via-ivory to-stone" />
        <div className="order-2 bg-ivory flex items-center">
          <div className="px-8 md:px-16 py-14 md:py-0 max-w-xl">
            <p className="eyebrow">Our Craft</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
              Made<br />by hand
            </h2>
            <p className="text-ash font-light leading-relaxed mt-6">
              Every Etty Hekelman piece begins as a sketch and ends in the hands of a
              master setter. We select each stone for its life and character, then set it
              with a precision that only time and patience can teach.
            </p>
            <p className="text-ash font-light leading-relaxed mt-4">
              The result is jewellery with quiet presence — designed to be worn every day
              and treasured for generations.
            </p>
            <Link href="/bespoke" className="btn btn-outline mt-8">
              Discover Bespoke
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BespokeBanner() {
  return (
    <section className="relative h-[70vh] min-h-[480px] overflow-hidden bg-gradient-to-br from-noir via-champagne-dark to-noir">
      <div className="relative h-full flex flex-col items-center justify-center text-center text-porcelain px-6">
        <p className="eyebrow text-porcelain/80">A piece entirely your own</p>
        <h2 className="font-display text-4xl md:text-6xl mt-4 max-w-3xl leading-tight">
          The Bespoke Commission
        </h2>
        <p className="mt-5 max-w-xl font-light text-porcelain/85">
          From a first conversation to the final setting, we design one-of-a-kind pieces
          around the moments that matter most.
        </p>
        <Link href="/bespoke" className="btn btn-primary bg-porcelain text-ink hover:bg-champagne hover:text-porcelain mt-8">
          Begin Your Commission
        </Link>
      </div>
    </section>
  );
}

const VALUES = [
  { title: "Fine Jewellery", body: "Rare stones, hand-set with exacting care." },
  { title: "Considered Design", body: "Every detail drawn and refined by hand." },
  { title: "Timeless Design", body: "Made to be worn today and treasured always." },
  { title: "Made to Last", body: "Built to endure, backed by lifetime aftercare." },
];

export function ValueRow() {
  return (
    <section className="border-y border-line bg-ivory">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-16 grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0">
        {VALUES.map(({ title, body }, i) => (
          <div key={title} className="relative px-6 md:px-10 text-center">
            {/* delicate champagne diamond separator between pillars (desktop) */}
            {i > 0 && (
              <span
                aria-hidden
                className="hidden lg:block absolute left-0 top-1.5 -translate-x-1/2 w-[5px] h-[5px] rotate-45 bg-champagne"
              />
            )}
            <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-ink">
              {title}
            </h3>
            <p className="text-sm text-ash font-light mt-3.5 leading-relaxed max-w-[15rem] mx-auto">
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
