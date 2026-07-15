# ETTY HEKELMAN LONDON

A luxury, high-end **headless Shopify** storefront for the fine-jewellery house
**Etty Hekelman London**. Built with Next.js (App Router), TypeScript and
Tailwind CSS, with an editorial aesthetic inspired by the great jewellery
maisons.

It runs beautifully out of the box using a curated demo catalogue, and connects
to a real Shopify store the moment you add your Storefront API credentials — no
code changes required.

---

## ✨ Features

- **Headless Shopify** via the Storefront GraphQL API (products, collections, cart, hosted checkout)
- **Graceful demo mode** — renders a full luxury catalogue before a store is connected
- **Luxury design system** — Cormorant Garamond + Jost, an ivory / ink / champagne palette, refined motion
- **Full storefront** — home, collections, collection & product pages, search, bespoke, about, contact
- **Persistent cart** with a slide-out bag and Shopify hosted checkout
- **SEO built-in** — dynamic metadata, Open Graph, JSON-LD product schema, `sitemap.xml`, `robots.txt`
- **Performance** — static generation with ISR, `next/image` optimisation, on-demand revalidation via Shopify webhooks
- **Responsive & accessible** — mobile navigation, keyboard-friendly controls, reduced-motion support

---

## 🚀 Getting started

```bash
npm install
cp .env.example .env.local   # optional — the site runs without it in demo mode
npm run dev                  # http://localhost:3000
```

### Production

```bash
npm run build
npm run start
```

---

## 🔌 Connecting your Shopify store

The storefront is fully headless. To go live with real products:

1. In **Shopify Admin → Settings → Apps and sales channels → Develop apps**,
   create an app.
2. Enable the **Storefront API** and grant the unauthenticated scopes
   (`read_product_listings`, `read_product_inventory`,
   `write_checkouts`, `read_checkouts`, …).
3. Install the app and copy the **Storefront API access token**.
4. Fill in `.env.local`:

   ```env
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   SHOPIFY_API_VERSION=2025-01
   NEXT_PUBLIC_SITE_URL=https://ettyhekelmanlondon.com
   ```

That's it. `lib/shopify/index.ts` detects the credentials and automatically
switches from the demo catalogue to live Storefront data.

### Keeping content fresh (webhooks)

Set `SHOPIFY_REVALIDATION_SECRET` and add Shopify webhooks
(`products/update`, `collections/update`) pointing to:

```
POST https://your-domain.com/api/revalidate?secret=YOUR_SECRET
```

Pages are cached with ISR and purged on demand whenever your catalogue changes.

---

## 🗂 Project structure

```
app/
  layout.tsx              Root layout, fonts, metadata, cart + header/footer
  page.tsx                Home page
  collections/            Collections index + [handle] listing
  products/[handle]/      Product detail (gallery, variants, add-to-bag, JSON-LD)
  search/                 Product search
  about/ bespoke/ contact/  Editorial & lead-capture pages
  api/revalidate/         Shopify webhook → on-demand revalidation
  sitemap.ts / robots.ts  SEO
components/
  layout/                 Header (nav, cart badge, mobile menu) + Footer
  home/                   Hero, category tiles, editorial sections
  product/                ProductCard, ProductGrid, ProductDetail
  cart/                   Cart context (persistent), cart drawer
  ui/                     Icons
lib/
  shopify/                Storefront client, queries, mutations, types, demo data
  utils.ts                Currency formatting & helpers
```

---

## 🎨 Design tokens

Defined in `app/globals.css` (`@theme`). Swap these to re-skin the house:

| Token          | Value      | Use                     |
| -------------- | ---------- | ----------------------- |
| `--color-ink`  | `#1c1a17`  | Primary text / buttons  |
| `--color-champagne` | `#b08d57` | Accent / eyebrows |
| `--color-ivory` | `#f8f6f1` | Section backgrounds     |
| `--color-porcelain` | `#fdfcfa` | Page background     |

---

## 🛠 Tech

Next.js · React · TypeScript · Tailwind CSS · Shopify Storefront API

## 📦 Deployment

Deploys to any Node host. Recommended: **Vercel** — push the repo, add the
environment variables above, and deploy. The `cdn.shopify.com` and
`*.myshopify.com` image hosts are already allow-listed in `next.config.ts`.
