import type { MetadataRoute } from "next";
import { getCollections, getProducts } from "@/lib/shopify";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ettyheckelmanlondon.com";

  const staticRoutes = [
    "",
    "/collections",
    "/about",
    "/bespoke",
    "/contact",
    "/appointments",
    "/search",
    "/shipping-returns",
    "/jewellery-care",
    "/size-guide",
    "/privacy",
    "/terms",
    "/cookies",
  ].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })
  );

  const [collections, products] = await Promise.all([getCollections(), getProducts({ first: 100 })]);

  const collectionRoutes = collections.map((c) => ({
    url: `${base}/collections/${c.handle}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/products/${p.handle}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
