import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ettyheckelmanlondon.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ETTY HECKELMAN LONDON — Fine Jewellery",
    template: "%s · ETTY HECKELMAN LONDON",
  },
  description:
    "ETTY HECKELMAN LONDON — fine jewellery handcrafted in London. Diamond engagement rings, earrings, necklaces and bespoke commissions.",
  keywords: [
    "fine jewellery",
    "diamond rings",
    "engagement rings London",
    "luxury jewellery",
    "Etty Heckelman",
  ],
  openGraph: {
    title: "ETTY HECKELMAN LONDON — Fine Jewellery",
    description:
      "Fine jewellery handcrafted in London. Diamond engagement rings, earrings, necklaces and bespoke commissions.",
    url: siteUrl,
    siteName: "ETTY HECKELMAN LONDON",
    locale: "en_GB",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
