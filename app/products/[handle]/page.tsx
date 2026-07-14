import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/shopify";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductGrid } from "@/components/product/product-grid";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts({ first: 50 });
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Product" };
  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    openGraph: product.featuredImage
      ? { images: [{ url: product.featuredImage.url }] }
      : undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const all = await getProducts({ first: 8 });
  const related = all.filter((p) => p.handle !== product.handle).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((i) => i.url),
    brand: { "@type": "Brand", name: "Etty Heckelman London" },
    offers: {
      "@type": "Offer",
      price: product.priceRange.minVariantPrice.amount,
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-10 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-[0.7rem] uppercase tracking-[0.16em] text-ash mb-10">
        <a href="/" className="hover:text-ink transition-colors">Home</a>
        <span className="mx-2">/</span>
        <a href="/collections" className="hover:text-ink transition-colors">Collections</a>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.title}</span>
      </nav>

      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mt-24 md:mt-32">
          <div className="text-center mb-12">
            <p className="overline">You may also love</p>
            <h2 className="font-display text-4xl mt-2">Complete the Look</h2>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
