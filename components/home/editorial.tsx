import Image from "next/image";
import Link from "next/link";

export function StorySplit() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
      <div className="grid md:grid-cols-2 items-stretch">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[560px] order-1">
          <Image
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1400&q=80"
            alt="A jeweller setting a stone by hand"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="order-2 bg-ivory flex items-center">
          <div className="px-8 md:px-16 py-14 md:py-0 max-w-xl">
            <p className="overline">Our Craft</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
              Made by hand,<br />in London
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
            <Link href="/about" className="btn btn-outline mt-8">
              Discover the House
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BespokeBanner() {
  return (
    <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=2000&q=80"
        alt="Bespoke jewellery design"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="relative h-full flex flex-col items-center justify-center text-center text-porcelain px-6">
        <p className="overline text-porcelain/80">A piece entirely your own</p>
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
  { title: "Ethically Sourced", body: "Conflict-free, fully traceable diamonds and precious metals." },
  { title: "Lifetime Aftercare", body: "Complimentary cleaning, servicing and re-sizing, forever." },
  { title: "Insured Delivery", body: "Discreet, fully insured worldwide delivery on every order." },
  { title: "Private Appointments", body: "Meet us for an unhurried, one-to-one viewing in London." },
];

export function ValueRow() {
  return (
    <section className="border-y border-line">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-line">
        {VALUES.map((v) => (
          <div key={v.title} className="px-5 md:px-8 py-10 text-center">
            <h3 className="overline text-champagne">{v.title}</h3>
            <p className="text-sm text-ash font-light mt-3 leading-relaxed">{v.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
