"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import { useWishlist } from "@/components/wishlist/wishlist-context";
import { BagIcon, MenuIcon, CloseIcon, SearchIcon, HeartIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

// Top-level navigation. Each `children` link points to a Shopify collection —
// create a collection with the matching name/handle to fill it with products.
const NAV: NavItem[] = [
  {
    label: "Rings",
    href: "/collections/rings",
    children: [
      { label: "Engagement Rings", href: "/collections/engagement-rings" },
      { label: "Eternity Rings", href: "/collections/eternity-rings" },
      { label: "Wedding Bands", href: "/collections/wedding-bands" },
      { label: "The Emerald Collection", href: "/collections/emerald-collection" },
    ],
  },
  {
    label: "Earrings",
    href: "/collections/earrings",
    children: [
      { label: "Stud Earrings", href: "/collections/stud-earrings" },
      { label: "Drop Earrings", href: "/collections/drop-earrings" },
      { label: "Hoop Earrings", href: "/collections/hoop-earrings" },
    ],
  },
  {
    label: "Necklaces",
    href: "/collections/necklaces",
    children: [
      { label: "Pendants", href: "/collections/pendants" },
      { label: "Rivière Necklaces", href: "/collections/riviere-necklaces" },
      { label: "Chains", href: "/collections/chains" },
    ],
  },
  {
    label: "Bracelets",
    href: "/collections/bracelets",
    children: [
      { label: "Tennis Bracelets", href: "/collections/tennis-bracelets" },
      { label: "Bangles", href: "/collections/bangles" },
    ],
  },
  { label: "Bespoke", href: "/bespoke" },
  { label: "The House", href: "/about" },
];

function DesktopNavItem({ item }: { item: NavItem }) {
  if (!item.children) {
    return (
      <Link href={item.href} className="link-underline hover:text-champagne-dark transition-colors">
        {item.label}
      </Link>
    );
  }
  return (
    <div className="relative group">
      <Link href={item.href} className="link-underline group-hover:text-champagne-dark transition-colors">
        {item.label}
      </Link>
      {/* Dropdown (pt-6 forms an invisible hover bridge to the panel) */}
      <div className="absolute left-0 top-full pt-6 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
        <div className="bg-porcelain border border-line shadow-[0_24px_60px_-24px_rgba(0,0,0,0.28)] py-3 min-w-[240px]">
          <Link
            href={item.href}
            className="block px-6 py-2.5 text-[0.68rem] tracking-[0.16em] uppercase text-ash hover:text-ink hover:bg-ivory transition-colors"
          >
            All {item.label}
          </Link>
          <div className="my-2 mx-6 h-px bg-line" />
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-6 py-2.5 text-[0.82rem] tracking-[0.04em] normal-case text-ink/85 hover:text-champagne-dark hover:bg-ivory transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const { totalQuantity, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

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

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink text-porcelain/90 text-center text-[0.62rem] tracking-[0.28em] uppercase py-3 px-4 font-light">
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
              <DesktopNavItem key={item.label} item={item} />
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
            <span className="block font-display font-light text-2xl md:text-[1.85rem] tracking-[0.24em] text-ink">
              ETTY HEKELMAN
            </span>
            <span className="block overline mt-1.5 text-ash tracking-[0.42em]">London</span>
          </Link>

          {/* Right: remaining nav + icons */}
          <div className="flex items-center justify-end gap-6 text-ink">
            <nav className="hidden lg:flex items-center gap-7 text-[0.72rem] uppercase tracking-[0.14em] text-ink/85">
              {NAV.slice(3).map((item) => (
                <DesktopNavItem key={item.label} item={item} />
              ))}
            </nav>
            <Link href="/search" aria-label="Search" className="hidden sm:block hover:text-champagne-dark transition-colors">
              <SearchIcon className="w-5 h-5" />
            </Link>
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishlistCount} items`}
              className="relative hidden sm:block hover:text-champagne-dark transition-colors"
            >
              <HeartIcon className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2.5 min-w-[1.05rem] h-[1.05rem] px-1 rounded-full bg-champagne text-porcelain text-[0.6rem] font-medium flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
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
        <div className="absolute inset-0 bg-ink/40" onClick={closeMobile} />
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-[86%] max-w-sm bg-porcelain shadow-2xl overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-line">
            <span className="font-display text-xl tracking-[0.14em]">ETTY HEKELMAN</span>
            <button aria-label="Close menu" onClick={closeMobile}>
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-2">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-line/60">
                  <button
                    onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                    className="w-full flex items-center justify-between py-4 font-display text-2xl text-ink"
                    aria-expanded={expanded === item.label}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "text-champagne text-xl font-light transition-transform duration-300",
                        expanded === item.label && "rotate-45"
                      )}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      expanded === item.label ? "max-h-96 pb-3" : "max-h-0"
                    )}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      className="block py-2 pl-3 text-[0.72rem] uppercase tracking-[0.16em] text-ash"
                    >
                      All {item.label}
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeMobile}
                        className="block py-2.5 pl-3 text-base text-ink/80 hover:text-champagne-dark transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobile}
                  className="py-4 border-b border-line/60 font-display text-2xl text-ink hover:text-champagne-dark transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/search"
              onClick={closeMobile}
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
