import { NextResponse } from "next/server";

// Temporary diagnostic: shows exactly what the Storefront API returns for the
// "site_settings" metaobject, so we can see why the logo/hero aren't updating.
export const dynamic = "force-dynamic";

export async function GET() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "");
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2025-01";

  if (!domain || !token) {
    return NextResponse.json({ ok: false, reason: "Shopify not configured (missing domain or token)." });
  }

  const query = /* GraphQL */ `
    {
      metaobjects(type: "site_settings", first: 5) {
        edges {
          node {
            handle
            type
            fields {
              key
              type
              value
              reference {
                __typename
                ... on MediaImage { image { url } }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });
    const body = await res.json();
    const edges = body?.data?.metaobjects?.edges ?? [];
    return NextResponse.json(
      {
        ok: true,
        httpStatus: res.status,
        graphqlErrors: body?.errors ?? null,
        entriesFound: edges.length,
        raw: body,
        hint:
          edges.length === 0
            ? "No 'site_settings' entries are readable. Check: (1) definition type is exactly 'site_settings', (2) Storefront API access is enabled on the definition, (3) an entry exists and is Active."
            : "Entries found — check the field keys are exactly 'logo' and 'hero_image' and that each 'reference' resolves to a MediaImage with an image url.",
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) });
  }
}
