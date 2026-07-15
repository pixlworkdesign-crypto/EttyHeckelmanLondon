import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";
import { WishlistButton } from "@/components/wishlist/wishlist-button";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const onSale = compareAt && Number(compareAt.amount) > Number(price.amount);
  const hover = product.images[1] ?? product.featuredImage;

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
        {product.featuredImage && (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-0 group-hover:scale-[1.04]"
          />
        )}
        {hover && (
          <Image
            src={hover.url}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover scale-105 opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-100 group-hover:scale-100"
          />
        )}
        <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-2">
          {product.tags.includes("bestseller") && (
            <span className="bg-porcelain/95 text-ink text-[0.58rem] uppercase tracking-[0.18em] px-3 py-1.5">
              Bestseller
            </span>
          )}
          {onSale && (
            <span className="bg-ink text-porcelain text-[0.58rem] uppercase tracking-[0.18em] px-3 py-1.5">
              Sale
            </span>
          )}
        </div>
        <WishlistButton
          item={{
            id: product.id,
            handle: product.handle,
            title: product.title,
            image: product.featuredImage?.url ?? null,
            price: Number(price.amount),
            currencyCode: price.currencyCode,
          }}
        />
        {/* Quiet hover affordance */}
        <span className="absolute inset-x-0 bottom-0 py-3.5 text-center text-[0.62rem] uppercase tracking-[0.22em] text-ink bg-porcelain/90 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
          View Piece
        </span>
      </div>
      <div className="pt-5 text-center">
        <p className="eyebrow text-ash/70 mb-1.5">{product.productType}</p>
        <h3 className="font-display text-xl text-ink transition-colors group-hover:text-champagne-dark">
          {product.title}
        </h3>
        <p className="text-[0.82rem] mt-2 tracking-[0.06em]">
          {onSale ? (
            <>
              <span className="text-ash/70 line-through mr-2">{formatPrice(compareAt)}</span>
              <span className="text-champagne-dark">{formatPrice(price)}</span>
            </>
          ) : (
            <span className="text-ash">{formatPrice(price)}</span>
          )}
        </p>
      </div>
    </Link>
  );
}
