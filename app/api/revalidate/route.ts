import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * Shopify webhook → on-demand revalidation.
 *
 * Configure a webhook in Shopify Admin (Settings → Notifications → Webhooks or
 * via the Admin API) for topics such as `products/update`,
 * `collections/update` and point it at:
 *
 *   POST https://your-domain.com/api/revalidate?secret=YOUR_SECRET
 *
 * The secret must match SHOPIFY_REVALIDATION_SECRET.
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const expected = process.env.SHOPIFY_REVALIDATION_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  const topic = req.headers.get("x-shopify-topic") ?? "";

  // Revalidate the caches relevant to the change. The "max" profile purges the
  // tag immediately (Next.js 16 requires an explicit cache-life profile).
  revalidateTag("products", "max");
  revalidateTag("collections", "max");

  return NextResponse.json({ revalidated: true, topic, now: Date.now() });
}
