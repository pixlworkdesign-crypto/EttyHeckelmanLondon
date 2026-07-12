"use server";

import { createCart, isShopifyConfigured } from "@/lib/shopify";

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; reason: "not-configured" | "error"; message: string };

/**
 * Builds a Shopify cart from the browser's line items and returns the hosted
 * checkout URL. In demo mode (no credentials) it reports back gracefully so the
 * UI can explain that a store must be connected to complete a purchase.
 */
export async function createCheckout(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<CheckoutResult> {
  if (!isShopifyConfigured) {
    return {
      ok: false,
      reason: "not-configured",
      message:
        "Checkout is disabled in preview mode. Connect your Shopify Storefront API credentials to enable secure checkout.",
    };
  }

  try {
    const cart = await createCart(lines);
    if (!cart?.checkoutUrl) {
      return { ok: false, reason: "error", message: "Unable to create checkout." };
    }
    return { ok: true, url: cart.checkoutUrl };
  } catch (err) {
    return {
      ok: false,
      reason: "error",
      message: err instanceof Error ? err.message : "Checkout failed.",
    };
  }
}
