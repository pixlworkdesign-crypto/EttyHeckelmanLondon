// Point this at your hosted logo image (e.g. a Shopify Files URL, which look
// like https://cdn.shopify.com/s/files/.../logo.png) to replace the text
// wordmark in the header with your actual logo. Leave empty to use the text
// version. Can also be set via the NEXT_PUBLIC_LOGO_URL environment variable.
export const LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL ?? "";

// The main homepage hero image. Point NEXT_PUBLIC_HERO_IMAGE at your own
// hosted image (e.g. a Shopify Files URL) to replace it, or update the default
// below. Use a wide, high-resolution photo (~2000px) for best results.
export const HERO_IMAGE =
  process.env.NEXT_PUBLIC_HERO_IMAGE ??
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80";

// Signature-packaging photo (homepage "Presented beautifully" section and the
// Shipping page). Swap this one value for your own photo — upload it to Shopify
// Files, then paste the link here (or set NEXT_PUBLIC_PACKAGING_IMAGE).
export const PACKAGING_IMAGE =
  process.env.NEXT_PUBLIC_PACKAGING_IMAGE ??
  "https://images.unsplash.com/photo-1600721391689-2564bb8055de?auto=format&fit=crop&w=1400&q=80";

// Contact details, edited here in code (opening hours are managed separately in
// Shopify → Site Settings). Leave a field as an empty string to hide it.
export const CONTACT = {
  email: "ethelhekelman@gmail.com",
  phone: "", // e.g. "+44 7700 900000"
  whatsapp: "", // international, e.g. "44 7700 900000" — blank hides the button
  address: "By appointment only\nMayfair, London\nUnited Kingdom",
};
