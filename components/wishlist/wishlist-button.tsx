"use client";

import { useWishlist, type WishlistItem } from "./wishlist-context";
import { HeartIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function WishlistButton({
  item,
  className,
  variant = "overlay",
}: {
  item: WishlistItem;
  className?: string;
  variant?: "overlay" | "inline";
}) {
  const { has, toggle } = useWishlist();
  const active = has(item.id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(item);
      }}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={cn(
        "flex items-center justify-center transition-colors",
        variant === "overlay" &&
          "absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-porcelain/85 backdrop-blur-sm hover:bg-porcelain",
        active ? "text-champagne-dark" : "text-ink/70 hover:text-ink",
        className
      )}
    >
      <HeartIcon className="w-[18px] h-[18px]" filled={active} />
    </button>
  );
}
