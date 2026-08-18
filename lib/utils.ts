import type { Money } from "./shopify/types";

export function formatPrice(money: Money | { amount: string; currencyCode: string }): string {
  const amount = Number(money.amount);
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: money.currencyCode || "GBP",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Per-product image framing, controlled from Shopify with product tags — so the
 * shop owner can decide how each photo sits without touching code.
 *
 * Tags (add on the product in Shopify):
 *   img:contain  → zoom out, show the whole photo (no cropping)
 *   img:left / img:right / img:top / img:bottom  → shift where the crop sits
 * Default (no tag): fills the frame, centred (object-cover).
 */
export function imageFraming(tags: string[] = []): string {
  const t = tags.map((s) => s.toLowerCase());
  const fit = t.includes("img:contain") ? "object-contain" : "object-cover";
  const position = t.includes("img:left")
    ? "object-left"
    : t.includes("img:right")
      ? "object-right"
      : t.includes("img:top")
        ? "object-top"
        : t.includes("img:bottom")
          ? "object-bottom"
          : "object-center";
  return `${fit} ${position}`;
}
