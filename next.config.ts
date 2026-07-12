import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Shopify product & CDN imagery
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "*.myshopify.com" },
      // Demo imagery used before a store is connected
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
