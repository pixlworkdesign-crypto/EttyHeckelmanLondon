"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import { BagIcon, MenuIcon, CloseIcon, SearchIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Rings", href: "/collections/rings" },
  { label: "Earrings", href: "/collections/earrings" },
  { label: "Necklaces", href: "/collections/necklaces" },
  { label: "Bracelets", href: "/collections/bracelets" },
  { label: "Bespoke", href: "/bespoke" },
  { label: "The House", href: "/about" },
];

export function Header() {
  const { totalQuantity, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink text-porcelain text-center text-[0.68rem] tracking-[0.2em] uppercase py-2.5 px-4">
        Complimentary insured delivery &amp; lifetime aftercare · Book a private appointment
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500 border-b",
          scrolled
            ? "bg-porcelain/95 backdrop-blur-md border-line py-4"
            : "bg-porcelain border-transparent py-6"
        )}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Left: desktop nav / mobile menu button */}
          <nav className="hidden lg:flex items-center gap-7 text-[0.72rem] uppercase tracking-[0.14em] text-ink/85">
            {NAV.slice(0, 3).map((item) => (
              <Link key={item.href} href={item.href} className="link-underline hover:text-champagne-dark transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            className="lg:hidden justify-self-start p-1"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>

          {/* Centre: wordmark */}
          <Link href="/" className="justify-self-center text-center leading-none">
            <span className="block font-display text-2xl md:text-[2rem] tracking-[0.14em] text-ink">
              ETTY HECKELMAN
            </span>
            <span className="block overline mt-1 text-champagne">London</span>
          </Link>

          {/* Right: remaining nav + icons */}
          <div className="flex items-center justify-end gap-6 text-ink">
            <nav className="hidden lg:flex items-center gap-7 text-[0.72rem] uppercase tracking-[0.14em] text-ink/85">
              {NAV.slice(3).map((item) => (
                <Link key={item.href} href={item.href} className="link-underline hover:text-champagne-dark transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link href="/search" aria-label="Search" className="hidden sm:block hover:text-champagne-dark transition-colors">
              <SearchIcon className="w-5 h-5" />
            </Link>
            <button
              aria-label={`Shopping bag, ${totalQuantity} items`}
              onClick={openCart}
              className="relative hover:text-champagne-dark transition-colors"
            >
              <BagIcon className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2.5 min-w-[1.05rem] h-[1.05rem] px-1 rounded-full bg-champagne text-porcelain text-[0.6rem] font-medium flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-[82%] max-w-sm bg-porcelain shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-line">
            <span className="font-display text-xl tracking-[0.14em]">ETTY HECKELMAN</span>
            <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 border-b border-line/60 font-display text-2xl text-ink hover:text-champagne-dark transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/search"
              onClick={() => setMobileOpen(false)}
              className="py-4 text-[0.72rem] uppercase tracking-[0.18em] text-ash"
            >
              Search
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
