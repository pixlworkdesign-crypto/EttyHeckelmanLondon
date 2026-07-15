"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cart-context";
import { createCheckout } from "@/app/actions/checkout";
import { CloseIcon, MinusIcon, PlusIcon, ArrowRightIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, currencyCode, totalQuantity } = useCart();
  const [isPending, startTransition] = useTransition();
  const [notice, setNotice] = useState<string | null>(null);

  const handleCheckout = () => {
    setNotice(null);
    startTransition(async () => {
      const result = await createCheckout(
        items.map((i) => ({ merchandiseId: i.variantId, quantity: i.quantity }))
      );
      if (result.ok) {
        window.location.href = result.url;
      } else {
        setNotice(result.message);
      }
    });
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-ink/40" onClick={closeCart} />

      <aside
        className={cn(
          "absolute right-0 top-0 h-full w-full max-w-md bg-porcelain shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-label="Shopping bag"
      >
        <header className="flex items-center justify-between px-6 py-6 border-b border-line">
          <div>
            <h2 className="font-display text-2xl">Your Bag</h2>
            <p className="text-xs text-ash tracking-wide mt-0.5">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </p>
          </div>
          <button aria-label="Close bag" onClick={closeCart} className="p-1 hover:text-champagne-dark transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-5">
            <p className="font-display text-2xl text-ink">Your bag is empty</p>
            <p className="text-sm text-ash font-light">
              Discover our latest pieces, crafted by hand.
            </p>
            <Link href="/collections/rings" onClick={closeCart} className="btn btn-primary mt-2">
              Explore the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 divide-y divide-line">
              {items.map((item) => (
                <li key={item.variantId} className="py-6 flex gap-4">
                  <Link
                    href={`/products/${item.productHandle}`}
                    onClick={closeCart}
                    className="relative w-20 h-24 shrink-0 bg-ivory overflow-hidden"
                  >
                    {item.image && (
                      <Image src={item.image} alt={item.title} fill sizes="80px" className="object-cover" />
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/products/${item.productHandle}`}
                        onClick={closeCart}
                        className="font-display text-lg leading-tight hover:text-champagne-dark transition-colors"
                      >
                        {item.title}
                      </Link>
                      <button
                        aria-label="Remove item"
                        onClick={() => removeItem(item.variantId)}
                        className="text-ash hover:text-ink transition-colors shrink-0"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-ash mt-1">{item.variantTitle}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-line">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-2 hover:text-champagne-dark transition-colors"
                        >
                          <MinusIcon className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="p-2 hover:text-champagne-dark transition-colors"
                        >
                          <PlusIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-sm">
                        {formatPrice({ amount: String(item.price * item.quantity), currencyCode: item.currencyCode })}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-line px-6 py-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="uppercase tracking-[0.14em] text-ash text-xs">Subtotal</span>
                <span className="font-display text-xl">
                  {formatPrice({ amount: String(subtotal), currencyCode })}
                </span>
              </div>
              <p className="text-[0.7rem] text-ash text-center">
                Taxes and insured delivery calculated at checkout.
              </p>
              {notice && (
                <p className="text-[0.72rem] text-champagne-dark bg-ivory border border-line px-4 py-3 leading-relaxed">
                  {notice}
                </p>
              )}
              <button
                onClick={handleCheckout}
                disabled={isPending}
                className="btn btn-primary w-full"
              >
                {isPending ? "Preparing checkout…" : "Proceed to Checkout"}
                {!isPending && <ArrowRightIcon className="w-4 h-4" />}
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
