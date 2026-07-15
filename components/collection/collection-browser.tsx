"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/product/product-card";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "az", label: "Alphabetical" },
];

const PRICE_BUCKETS = [
  { key: "u1000", label: "Under £1,000", test: (p: number) => p < 1000 },
  { key: "1000-2500", label: "£1,000 – £2,500", test: (p: number) => p >= 1000 && p < 2500 },
  { key: "2500-5000", label: "£2,500 – £5,000", test: (p: number) => p >= 2500 && p < 5000 },
  { key: "5000", label: "£5,000 & above", test: (p: number) => p >= 5000 },
];

const priceOf = (p: Product) => Number(p.priceRange.minVariantPrice.amount);

export function CollectionBrowser({ products }: { products: Product[] }) {
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [priceKeys, setPriceKeys] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Build filter facets from the products' own options (e.g. Metal, Gemstone).
  const facets = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    for (const p of products) {
      for (const opt of p.options) {
        if (opt.name.toLowerCase() === "title") continue;
        map[opt.name] = map[opt.name] ?? new Set<string>();
        opt.values.forEach((v) => map[opt.name].add(v));
      }
    }
    return Object.entries(map)
      .map(([name, set]) => ({ name, values: Array.from(set) }))
      .filter((f) => f.values.length > 1);
  }, [products]);

  const activeCount =
    priceKeys.length + Object.values(selected).reduce((n, v) => n + v.length, 0);

  const toggleFacet = (name: string, value: string) =>
    setSelected((prev) => {
      const cur = prev[name] ?? [];
      const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
      return { ...prev, [name]: next };
    });

  const togglePrice = (key: string) =>
    setPriceKeys((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const clearAll = () => {
    setSelected({});
    setPriceKeys([]);
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (priceKeys.length) {
        const price = priceOf(p);
        if (!PRICE_BUCKETS.some((b) => priceKeys.includes(b.key) && b.test(price))) return false;
      }
      for (const [name, values] of Object.entries(selected)) {
        if (!values.length) continue;
        const opt = p.options.find((o) => o.name === name);
        if (!opt || !opt.values.some((v) => values.includes(v))) return false;
      }
      return true;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => priceOf(a) - priceOf(b));
    else if (sort === "price-desc") list = [...list].sort((a, b) => priceOf(b) - priceOf(a));
    else if (sort === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [products, selected, priceKeys, sort]);

  const chip = (active: boolean) =>
    cn(
      "px-4 py-2 text-[0.72rem] tracking-[0.06em] border transition-colors",
      active ? "border-ink bg-ink text-porcelain" : "border-line text-ink hover:border-ink"
    );

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between border-y border-line py-4 mb-8">
        <button
          onClick={() => setFiltersOpen((o) => !o)}
          className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-ink hover:text-champagne-dark transition-colors"
          aria-expanded={filtersOpen}
        >
          Filter
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-ink text-porcelain text-[0.6rem] flex items-center justify-center">
              {activeCount}
            </span>
          )}
          <ChevronDownIcon className={cn("w-4 h-4 transition-transform", filtersOpen && "rotate-180")} />
        </button>

        <label className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-ink">
          <span className="hidden sm:inline text-ash">Sort</span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-transparent pr-6 py-1 focus:outline-none cursor-pointer uppercase tracking-[0.12em] text-[0.72rem]"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </label>
      </div>

      {/* Filter panel */}
      {filtersOpen && (
        <div className="mb-10 pb-8 border-b border-line space-y-6 animate-rise">
          <div>
            <p className="eyebrow mb-3">Price</p>
            <div className="flex flex-wrap gap-2.5">
              {PRICE_BUCKETS.map((b) => (
                <button key={b.key} onClick={() => togglePrice(b.key)} className={chip(priceKeys.includes(b.key))}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {facets.map((facet) => (
            <div key={facet.name}>
              <p className="eyebrow mb-3">{facet.name}</p>
              <div className="flex flex-wrap gap-2.5">
                {facet.values.map((value) => (
                  <button
                    key={value}
                    onClick={() => toggleFacet(facet.name, value)}
                    className={chip((selected[facet.name] ?? []).includes(value))}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="text-[0.72rem] uppercase tracking-[0.16em] text-ash hover:text-ink transition-colors underline underline-offset-4"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Results */}
      <p className="text-xs uppercase tracking-[0.16em] text-ash mb-8">
        {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
      </p>

      {filtered.length === 0 ? (
        <p className="text-center text-ash font-light py-20">
          No pieces match your selection.{" "}
          <button onClick={clearAll} className="underline underline-offset-4 hover:text-ink">
            Clear filters
          </button>
        </p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
