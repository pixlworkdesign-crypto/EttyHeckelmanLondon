"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { useCart } from "@/components/cart/cart-context";
import { WishlistButton } from "@/components/wishlist/wishlist-button";
import { formatPrice, cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/ui/icons";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Track a selected value per option name.
  const [selections, setSelections] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map((o) => [o.name, o.values[0]]))
  );

  const selectedVariant = useMemo(() => {
    return (
      product.variants.find((v) =>
        v.selectedOptions.every((o) => selections[o.name] === o.value)
      ) ?? product.variants[0]
    );
  }, [product.variants, selections]);

  const images = product.images.length ? product.images : product.featuredImage ? [product.featuredImage] : [];

  // No price set (£0) → present as "Price on request" with an enquiry, rather
  // than showing £0.
  const priceOnRequest =
    Number((selectedVariant?.price ?? product.priceRange.minVariantPrice).amount) <= 0;

  const goToImage = (i: number) => {
    if (images.length === 0) return;
    setActiveImage((i + images.length) % images.length);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) goToImage(activeImage + (dx < 0 ? 1 : -1));
    setTouchStartX(null);
  };

  const handleAdd = () => {
    if (!selectedVariant) return;
    addItem({
      variantId: selectedVariant.id,
      productHandle: product.handle,
      title: product.title,
      variantTitle: selectedVariant.title,
      image: product.featuredImage?.url ?? null,
      price: Number(selectedVariant.price.amount),
      currencyCode: selectedVariant.price.currencyCode,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
      {/* Gallery */}
      <div className="flex flex-col-reverse md:flex-row gap-4">
        {images.length > 1 && (
          <div className="flex md:flex-col gap-3 md:w-20 shrink-0">
            {images.map((img, i) => (
              <button
                key={img.url + i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "relative aspect-square w-16 md:w-full overflow-hidden bg-white border transition-colors",
                  i === activeImage ? "border-champagne" : "border-line hover:border-champagne/60"
                )}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={img.url} alt="" fill sizes="80px" className="object-contain" />
              </button>
            ))}
          </div>
        )}
        <div
          className="relative flex-1 aspect-square overflow-hidden bg-white border border-line touch-pan-y select-none"
          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
          onTouchEnd={onTouchEnd}
        >
          {images[activeImage] && (
            <Image
              src={images[activeImage].url}
              alt={images[activeImage].altText ?? product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              draggable={false}
            />
          )}
          {/* Swipe dots (mobile) */}
          {images.length > 1 && (
            <div className="md:hidden absolute bottom-4 inset-x-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToImage(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === activeImage ? "w-5 bg-noir" : "w-1.5 bg-noir/30"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="lg:py-6 lg:pr-8">
        <p className="eyebrow">{product.productType || "Fine Jewellery"}</p>
        <h1 className="font-display text-4xl md:text-5xl mt-3 leading-[1.05]">{product.title}</h1>
        {(() => {
          const activePrice = selectedVariant?.price ?? product.priceRange.minVariantPrice;
          const activeCompareAt = selectedVariant?.compareAtPrice;
          const onSale =
            activeCompareAt && Number(activeCompareAt.amount) > Number(activePrice.amount);
          if (priceOnRequest) {
            return <p className="mt-5 text-2xl font-light text-ink/90">Price on request</p>;
          }
          return (
            <p className="mt-5 flex items-baseline gap-3 tabular-nums">
              {onSale && (
                <span className="text-xl font-light text-ash/70 line-through">
                  {formatPrice(activeCompareAt)}
                </span>
              )}
              <span
                className={cn(
                  "text-2xl font-light",
                  onSale ? "text-champagne-dark" : "text-ink/90"
                )}
              >
                {formatPrice(activePrice)}
              </span>
              {onSale && (
                <span className="text-[0.62rem] uppercase tracking-[0.18em] bg-noir text-porcelain px-2.5 py-1">
                  Sale
                </span>
              )}
            </p>
          );
        })()}

        <div className="w-full h-px bg-line my-8" />

        {product.description && (
          <p className="text-ash leading-relaxed font-light max-w-prose">{product.description}</p>
        )}

        {/* Options */}
        {product.options
          .filter((o) => o.values.length > 1 || o.name.toLowerCase() !== "title")
          .map((option) => (
            <div key={option.id} className="mt-8">
              <p className="text-[0.72rem] uppercase tracking-[0.16em] text-ink mb-3">
                {option.name}: <span className="text-ash">{selections[option.name]}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {option.values.map((value) => {
                  const active = selections[option.name] === value;
                  return (
                    <button
                      key={value}
                      onClick={() => setSelections((s) => ({ ...s, [option.name]: value }))}
                      className={cn(
                        "px-5 py-2.5 text-xs tracking-wide border transition-colors",
                        active
                          ? "border-noir bg-noir text-porcelain"
                          : "border-line text-ink hover:border-ink"
                      )}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

        {/* Add to cart */}
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {priceOnRequest ? (
              <Link href="/contact" className="btn btn-primary flex-1 sm:min-w-[15rem]">
                Enquire
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            ) : (
              <button
                onClick={handleAdd}
                disabled={!selectedVariant?.availableForSale}
                className="btn btn-primary flex-1 sm:min-w-[15rem]"
              >
                {!selectedVariant?.availableForSale
                  ? "Sold Out"
                  : added
                    ? "Added to Bag ✓"
                    : "Add to Bag"}
                {selectedVariant?.availableForSale && !added && <ArrowRightIcon className="w-4 h-4" />}
              </button>
            )}
            <WishlistButton
              variant="inline"
              className="border border-ink w-full sm:w-[3.4rem] h-[3.4rem] hover:bg-ivory shrink-0"
              item={{
                id: product.id,
                handle: product.handle,
                title: product.title,
                image: product.featuredImage?.url ?? null,
                price: Number((selectedVariant?.price ?? product.priceRange.minVariantPrice).amount),
                currencyCode: (selectedVariant?.price ?? product.priceRange.minVariantPrice).currencyCode,
              }}
            />
          </div>
          <p className="text-[0.72rem] text-ash tracking-wide">
            Complimentary insured delivery · Presented in our signature packaging
          </p>
        </div>

        {/* Assurances */}
        <div className="mt-10 border-t border-line pt-8 grid grid-cols-2 gap-6 text-sm font-light text-ash">
          <div>
            <p className="text-ink text-xs uppercase tracking-[0.14em] mb-1.5">Handcrafted</p>
            Made by hand in our atelier.
          </div>
          <div>
            <p className="text-ink text-xs uppercase tracking-[0.14em] mb-1.5">Lifetime care</p>
            Complimentary cleaning &amp; servicing.
          </div>
          <div>
            <p className="text-ink text-xs uppercase tracking-[0.14em] mb-1.5">Ethically sourced</p>
            Conflict-free, fully traceable stones.
          </div>
          <div>
            <p className="text-ink text-xs uppercase tracking-[0.14em] mb-1.5">Bespoke</p>
            Every piece can be tailored to you.
          </div>
          <div>
            <p className="text-ink text-xs uppercase tracking-[0.14em] mb-1.5">Signature packaging</p>
            Presented in our box &amp; pouch, ready to gift.
          </div>
          <div>
            <p className="text-ink text-xs uppercase tracking-[0.14em] mb-1.5">Insured delivery</p>
            Discreet, fully insured worldwide.
          </div>
        </div>
      </div>
    </div>
  );
}
