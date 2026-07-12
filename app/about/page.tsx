import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The House",
  description:
    "The story of Etty Heckelman London — fine jewellery handcrafted in London with rare stones and enduring design.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600721391689-2564bb8055de?auto=format&fit=crop&w=2000&q=80"
          alt="The Etty Heckelman atelier"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-porcelain px-6">
          <p className="overline text-porcelain/80">Est. London</p>
          <h1 className="font-display text-5xl md:text-7xl mt-4">The House of Etty Heckelman</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28 text-center">
        <p className="overline">Our Philosophy</p>
        <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight">
          Jewellery is memory, made to be worn
        </h2>
        <p className="text-ash font-light leading-relaxed mt-8 text-lg">
          Etty Heckelman London was founded on a simple belief: that the finest jewellery
          should feel personal. Not merely bought, but chosen — for a moment, a person, a
          promise. We design pieces that carry meaning quietly, and wear beautifully for a
          lifetime.
        </p>
        <p className="text-ash font-light leading-relaxed mt-5">
          From our London atelier, every piece is drawn by hand, sculpted in wax, and set by
          craftspeople who have spent decades perfecting their art. We source only
          conflict-free, fully traceable stones, and we stand behind every creation with
          lifetime aftercare.
        </p>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 grid md:grid-cols-3 gap-12 text-center">
          {[
            { n: "1974", l: "Family heritage in fine jewellery" },
            { n: "100%", l: "Ethically sourced, traceable stones" },
            { n: "∞", l: "Lifetime servicing on every piece" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-6xl text-champagne">{s.n}</p>
              <p className="text-ash font-light mt-3">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=1200&q=80"
            alt="A craftsperson at the bench"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="overline">The Atelier</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
            Where every piece begins
          </h2>
          <p className="text-ash font-light leading-relaxed mt-6">
            Behind each Etty Heckelman creation is a small team of designers, goldsmiths and
            gem-setters working side by side. It is slow, deliberate work — the kind that
            cannot be rushed and does not wish to be.
          </p>
          <Link href="/bespoke" className="btn btn-outline mt-8">
            Commission a Piece
          </Link>
        </div>
      </section>
    </>
  );
}
