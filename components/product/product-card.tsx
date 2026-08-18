import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { formatPrice, cn, imageFraming } from "@/lib/utils";
import { WishlistButton } from "@/components/wishlist/wishlist-button";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const onSale = compareAt && Number(compareAt.amount) > Number(price.amount);
  const priceOnRequest = Number(price.amount) <= 0;
  const hover = product.images[1] ?? product.featuredImage;
  const framing = imageFraming(product.tags);

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
            className={cn(framing, "transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-0 group-hover:scale-[1.04]")}
          />
        )}
        {hover && (
          <Image
            src={hover.url}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={cn(framing, "scale-105 opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-100 group-hover:scale-100")}
          />
        )}
        <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-2">
          {product.tags.includes("bestseller") && (
            <span className="bg-porcelain/95 text-ink text-[0.58rem] uppercase tracking-[0.18em] px-3 py-1.5">
              Bestseller
            </span>
          )}
          {onSale && (
            <span className="bg-noir text-porcelain text-[0.58rem] uppercase tracking-[0.18em] px-3 py-1.5">
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
      </div>
      <div className="pt-6 text-center">
        <h3 className="font-display text-xl md:text-[1.4rem] leading-snug text-ink transition-colors duration-500 group-hover:text-champagne">
          {product.title}
        </h3>
        <p className="text-[0.8rem] mt-2.5 tracking-[0.1em] text-ash tabular-nums">
          {priceOnRequest ? (
            <span>Price on request</span>
          ) : onSale ? (
            <>
              <span className="line-through mr-2 opacity-60">{formatPrice(compareAt)}</span>
              <span className="text-champagne-dark">{formatPrice(price)}</span>
            </>
          ) : (
            <span>{formatPrice(price)}</span>
          )}
        </p>
      </div>
    </Link>
  );
}
