import { NextResponse } from "next/server";
import { getProducts } from "@/lib/shopify";

export const revalidate = 60;

/** Lightweight predictive-search endpoint: returns up to 6 matching pieces. */
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.trim().toLowerCase() ?? "";
  if (!q) return NextResponse.json({ results: [] });

  const all = await getProducts({ first: 100 });
  const results = all
    .filter((p) =>
      `${p.title} ${p.productType} ${p.tags.join(" ")}`.toLowerCase().includes(q)
    )
    .slice(0, 6)
    .map((p) => ({
      handle: p.handle,
      title: p.title,
      image: p.featuredImage?.url ?? null,
      price: p.priceRange.minVariantPrice,
    }));

  return NextResponse.json({ results });
}
