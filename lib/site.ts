// Point this at your hosted logo image (e.g. a Shopify Files URL, which look
// like https://cdn.shopify.com/s/files/.../logo.png) to replace the text
// wordmark in the header with your actual logo. Leave empty to use the text
// version. Can also be set via the NEXT_PUBLIC_LOGO_URL environment variable.
export const LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL ?? "";

// The homepage hero image is managed in Shopify (site_settings → hero_image).
// This is only an optional override via env var — intentionally NO stock/demo
// default, so a placeholder photo can never masquerade as the real hero.
export const HERO_IMAGE = process.env.NEXT_PUBLIC_HERO_IMAGE ?? "";

// Signature-packaging photo (homepage "Presented beautifully" section and the
// Shipping page). Swap this one value for your own photo — upload it to Shopify
// Files, then paste the link here (or set NEXT_PUBLIC_PACKAGING_IMAGE).
export const PACKAGING_IMAGE =
  process.env.NEXT_PUBLIC_PACKAGING_IMAGE ??
  "https://cdn.shopify.com/s/files/1/0740/9149/5555/files/740C6223-B870-4F75-8666-51DAAE04DE98.jpg?v=1784131710";

// Contact details, edited here in code (opening hours are managed separately in
// Shopify → Site Settings). Leave a field as an empty string to hide it.
export const CONTACT = {
  email: "ethelhekelman@gmail.com",
  phone: "", // e.g. "+44 7700 900000"
  whatsapp: "", // international, e.g. "44 7700 900000" — blank hides the button
  address: "By appointment only\nMayfair, London\nUnited Kingdom",
};
