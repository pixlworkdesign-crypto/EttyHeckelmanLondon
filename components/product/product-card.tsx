import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const price = product.priceRange.minVariantPrice;
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
            className="object-cover transition-opacity duration-700 group-hover:opacity-0"
          />
        )}
        {hover && (
          <Image
            src={hover.url}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        {product.tags.includes("bestseller") && (
          <span className="absolute top-3 left-3 bg-porcelain/90 text-ink text-[0.6rem] uppercase tracking-[0.16em] px-3 py-1.5">
            Bestseller
          </span>
        )}
      </div>
      <div className="pt-4 text-center">
        <p className="overline text-ash/80 mb-1">{product.productType}</p>
        <h3 className="font-display text-xl text-ink group-hover:text-champagne-dark transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-ash mt-1.5 tracking-wide">{formatPrice(price)}</p>
      </div>
    </Link>
  );
}
