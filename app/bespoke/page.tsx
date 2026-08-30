import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bespoke",
  description:
    "Commission a one-of-a-kind piece with Etty Hekelman London. From first sketch to final setting, designed entirely around you.",
};

const STEPS = [
  { n: "01", t: "Consultation", d: "We begin with an unhurried conversation — in person or virtually — to understand the piece and the moment behind it." },
  { n: "02", t: "Design", d: "Our designers translate your vision into hand-drawn sketches and detailed renders for your approval." },
  { n: "03", t: "Stone Selection", d: "We present a curated selection of ethically sourced stones, each chosen for its life and character." },
  { n: "04", t: "Creation", d: "Master goldsmiths bring your piece to life by hand in our atelier, then present it in our signature packaging." },
];

export default function BespokePage() {
  return (
    <>
      <section className="relative h-[70vh] min-h-[460px] overflow-hidden bg-gradient-to-br from-noir via-champagne-dark to-noir">
        <div className="relative h-full flex flex-col items-center justify-center text-center text-porcelain px-6">
          <p className="eyebrow text-porcelain/80">The Bespoke Service</p>
          <h1 className="font-display text-5xl md:text-7xl mt-4 max-w-3xl leading-tight">
            A piece entirely your own
          </h1>
          <p className="mt-5 max-w-xl font-light text-porcelain/85">
            The most personal way to own an Etty Hekelman. Together, we create something
            that has never existed before — and never will again.
          </p>
          <Link href="/contact" className="btn btn-primary bg-porcelain text-ink hover:bg-champagne hover:text-porcelain mt-8">
            Enquire Now
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28">
        <div className="text-center mb-16">
          <p className="eyebrow">The Journey</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Four Steps to Forever</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="group relative pt-6 transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="absolute left-0 top-0 h-px w-full bg-line" aria-hidden />
              <span className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100 motion-reduce:transition-none" aria-hidden />
              <p className="font-display text-5xl text-champagne transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1 group-hover:text-champagne-dark motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                {s.n}
              </p>
              <h3 className="font-display text-2xl mt-4 transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1 group-hover:text-champagne-dark motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                {s.t}
              </h3>
              <p className="text-ash font-light leading-relaxed mt-3 text-sm transition-colors duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-ink motion-reduce:transition-none">
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-noir text-porcelain">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28 text-center">
          <p className="eyebrow text-champagne">Begin</p>
          <h2 className="font-display text-4xl md:text-5xl mt-4">
            Let us create something extraordinary
          </h2>
          <p className="text-porcelain/70 font-light mt-5 leading-relaxed">
            Share a few details and one of our designers will be in touch to arrange your
            private consultation.
          </p>
          <Link href="/contact" className="btn btn-primary bg-porcelain text-ink hover:bg-champagne hover:text-porcelain mt-8">
            Start Your Commission
          </Link>
        </div>
      </section>
    </>
  );
}
