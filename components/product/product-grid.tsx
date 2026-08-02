import type { Product } from "@/lib/shopify/types";
import { ProductCard } from "./product-card";
import { Stagger } from "@/components/ui/stagger";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="text-center text-ash font-light py-20">
        No pieces to show just yet. Please check back soon.
      </p>
    );
  }

  return (
    <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 md:gap-x-10 md:gap-y-24">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} />
      ))}
    </Stagger>
  );
}
