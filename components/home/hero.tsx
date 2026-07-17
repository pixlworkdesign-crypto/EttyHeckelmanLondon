import Image from "next/image";
import Link from "next/link";
import { HERO_IMAGE } from "@/lib/site";

export function Hero({ image }: { image?: string | null }) {
  return (
    <section className="relative h-[100svh] min-h-[720px] w-full overflow-hidden">
      <Image
        src={image || HERO_IMAGE}
        alt="Etty Hekelman London fine jewellery"
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-noir/40 via-noir/10 to-noir/5" />

      <div className="relative h-full mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col items-center justify-center text-center text-porcelain">
        <p className="eyebrow text-porcelain/75 animate-rise">The Winter Collection</p>
        <h1 className="font-display font-light text-[2.9rem] md:text-7xl lg:text-[5.75rem] mt-7 leading-[1.06] tracking-[0.015em] animate-rise">
          Light, held<br />for a lifetime
        </h1>
        <p className="mt-8 max-w-md text-porcelain/85 font-light md:text-lg leading-relaxed tracking-wide animate-rise">
          Fine jewellery, handcrafted with care. Rare stones, set by hand, made to be
          treasured and passed on.
        </p>
        <div className="mt-11 flex flex-col sm:flex-row gap-4 animate-rise">
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
