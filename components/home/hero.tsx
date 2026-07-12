import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-[86vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80"
        alt="A diamond ring resting on soft fabric"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent" />

      <div className="relative h-full mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col items-center justify-center text-center text-porcelain">
        <p className="overline text-porcelain/70 animate-rise">The Winter Collection</p>
        <h1 className="font-display font-light text-5xl md:text-7xl lg:text-[5.5rem] mt-6 leading-[1.02] tracking-[0.01em] animate-rise">
          Light, held<br />for a lifetime
        </h1>
        <p className="mt-7 max-w-md text-porcelain/85 font-light md:text-lg leading-relaxed animate-rise">
          Fine jewellery, handcrafted in London. Rare stones, set by hand, made to be
          treasured and passed on.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-rise">
          <Link href="/collections/rings" className="btn btn-primary bg-porcelain text-ink hover:bg-champagne hover:text-porcelain">
            Shop Engagement
          </Link>
          <Link href="/bespoke" className="btn btn-outline border-porcelain text-porcelain hover:bg-porcelain hover:text-ink">
            Create Bespoke
          </Link>
        </div>
      </div>
    </section>
  );
}
