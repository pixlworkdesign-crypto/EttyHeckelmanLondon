"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/shopify/types";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice, cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/ui/icons";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

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
                  "relative aspect-[4/5] w-16 md:w-full overflow-hidden bg-ivory border transition-colors",
                  i === activeImage ? "border-champagne" : "border-transparent hover:border-line"
                )}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={img.url} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
        <div className="relative flex-1 aspect-[4/5] overflow-hidden bg-ivory">
          {images[activeImage] && (
            <Image
              src={images[activeImage].url}
              alt={images[activeImage].altText ?? product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Details */}
      <div className="lg:py-6 lg:pr-8">
        <p className="overline">{product.productType || "Fine Jewellery"}</p>
        <h1 className="font-display text-4xl md:text-5xl mt-3 leading-[1.05]">{product.title}</h1>
        <p className="text-2xl font-light mt-5 text-ink/90">
          {formatPrice(selectedVariant?.price ?? product.priceRange.minVariantPrice)}
        </p>

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
                          ? "border-ink bg-ink text-porcelain"
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
          <button
            onClick={handleAdd}
            disabled={!selectedVariant?.availableForSale}
            className="btn btn-primary w-full sm:w-auto sm:min-w-[16rem]"
          >
            {!selectedVariant?.availableForSale
              ? "Sold Out"
              : added
                ? "Added to Bag ✓"
                : "Add to Bag"}
            {selectedVariant?.availableForSale && !added && <ArrowRightIcon className="w-4 h-4" />}
          </button>
          <p className="text-[0.72rem] text-ash tracking-wide">
            Complimentary insured delivery · Presented in our signature packaging
          </p>
        </div>

        {/* Assurances */}
        <div className="mt-10 border-t border-line pt-8 grid grid-cols-2 gap-6 text-sm font-light text-ash">
          <div>
            <p className="text-ink text-xs uppercase tracking-[0.14em] mb-1.5">Handcrafted</p>
            Made by hand in our London atelier.
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
        </div>
      </div>
    </div>
  );
}
