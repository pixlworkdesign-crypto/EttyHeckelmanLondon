import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/shopify";
import { ProductGrid } from "@/components/product/product-grid";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Etty Heckelman London collection.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const all = await getProducts({ first: 50 });
  const results = query
    ? all.filter((p) => {
        const haystack = `${p.title} ${p.description} ${p.productType} ${p.tags.join(" ")}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
      })
    : all;

  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
      <header className="text-center max-w-xl mx-auto mb-12">
        <p className="overline">Search</p>
        <h1 className="font-display text-5xl mt-3">Find Your Piece</h1>
        <form action="/search" className="mt-8 flex items-center border-b border-line">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search rings, diamonds, earrings…"
            className="flex-1 bg-transparent py-3 text-base focus:outline-none placeholder:text-ash/60"
            aria-label="Search products"
          />
          <button type="submit" className="text-[0.72rem] uppercase tracking-[0.16em] text-ink hover:text-champagne-dark transition-colors">
            Search
          </button>
        </form>
      </header>

      {query && (
        <p className="text-center text-sm text-ash mb-10">
          {results.length} {results.length === 1 ? "result" : "results"} for{" "}
          <span className="text-ink">“{query}”</span>
        </p>
      )}

      {results.length > 0 ? (
        <ProductGrid products={results} />
      ) : (
        <div className="text-center py-16">
          <p className="font-display text-2xl">No pieces matched your search</p>
          <Link href="/collections" className="btn btn-outline mt-6">
            Browse all collections
          </Link>
        </div>
      )}
    </div>
  );
}
