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
