"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchIcon, CloseIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/utils";

type Result = {
  handle: string;
  title: string;
  image: string | null;
  price: { amount: string; currencyCode: string };
};

export function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const term = q.trim();
    if (!term) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const term = q.trim();

  return (
    <>
      <button
        aria-label="Search"
        onClick={() => setOpen(true)}
        className="hidden sm:block hover:text-champagne-dark transition-colors"
      >
        <SearchIcon className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-label="Search">
          <div className="absolute inset-0 bg-noir/40" onClick={() => setOpen(false)} />
          <div className="absolute top-0 inset-x-0 bg-porcelain shadow-[0_24px_60px_-24px_rgba(0,0,0,0.3)]">
            <div className="mx-auto max-w-[900px] px-5 md:px-10 py-7">
              <div className="flex items-center gap-4 border-b border-line pb-4">
                <SearchIcon className="w-5 h-5 text-ash shrink-0" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search rings, diamonds, earrings…"
                  className="flex-1 bg-transparent text-base md:text-lg font-light focus:outline-none placeholder:text-ash/60"
                  aria-label="Search products"
                />
                <button
                  aria-label="Close search"
                  onClick={() => setOpen(false)}
                  className="shrink-0 hover:text-champagne-dark transition-colors"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              {term && (
                <div className="mt-6 max-h-[60vh] overflow-y-auto">
                  {loading && results.length === 0 ? (
                    <p className="text-sm text-ash font-light py-3">Searching…</p>
                  ) : results.length > 0 ? (
                    <ul className="divide-y divide-line">
                      {results.map((r) => (
                        <li key={r.handle}>
                          <Link
                            href={`/products/${r.handle}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-4 py-3 group"
                          >
                            <div className="relative w-14 h-16 bg-ivory shrink-0 overflow-hidden">
                              {r.image && (
                                <Image src={r.image} alt="" fill sizes="56px" className="object-cover" />
                              )}
                            </div>
                            <span className="flex-1 font-display text-lg leading-snug group-hover:text-champagne-dark transition-colors">
                              {r.title}
                            </span>
                            <span className="text-sm text-ash tabular-nums shrink-0">
                              {formatPrice(r.price)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-ash font-light py-3">
                      No pieces matched &ldquo;{term}&rdquo;.
                    </p>
                  )}

                  <Link
                    href={`/search?q=${encodeURIComponent(term)}`}
                    onClick={() => setOpen(false)}
                    className="link-underline inline-block mt-5 text-[0.72rem] uppercase tracking-[0.18em] text-ink"
                  >
                    View all results
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
