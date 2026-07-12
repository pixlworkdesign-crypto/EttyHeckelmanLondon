"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/components/wishlist/wishlist-context";
import { CloseIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { items, remove } = useWishlist();

  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
      <header className="text-center mb-14">
        <p className="overline">Kept Close</p>
        <h1 className="font-display text-5xl md:text-6xl mt-3">Your Wishlist</h1>
        <p className="text-ash font-light mt-4">
          The pieces you have saved to revisit, share or make your own.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-display text-2xl">Your wishlist is empty</p>
          <p className="text-ash font-light mt-3">
            Tap the heart on any piece to save it here.
          </p>
          <Link href="/collections" className="btn btn-primary mt-7">
            Explore the Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16">
          {items.map((item) => (
            <div key={item.id} className="group relative">
              <button
                onClick={() => remove(item.id)}
                aria-label="Remove from wishlist"
                className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-porcelain/85 backdrop-blur-sm flex items-center justify-center text-ink/70 hover:text-ink transition-colors"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
              <Link href={`/products/${item.handle}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <div className="pt-5 text-center">
                  <h3 className="font-display text-xl text-ink group-hover:text-champagne-dark transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[0.82rem] text-ash mt-2 tracking-[0.06em]">
                    {formatPrice({ amount: String(item.price), currencyCode: item.currencyCode })}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
