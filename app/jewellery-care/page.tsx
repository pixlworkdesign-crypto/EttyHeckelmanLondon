import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Jewellery Care",
  description:
    "How to care for your fine jewellery — storage, cleaning and servicing advice from the Etty Hekelman London atelier.",
};

export default function JewelleryCarePage() {
  return (
    <ContentPage
      eyebrow="The Atelier"
      title="Caring for Your Jewellery"
      intro="Fine jewellery is made to be worn and enjoyed. A little care keeps every stone and setting looking its best for generations."
    >
      <h2>Everyday Wear</h2>
      <ul>
        <li>Apply perfume, cosmetics and hairspray <strong>before</strong> putting on your jewellery.</li>
        <li>Remove pieces before swimming, bathing, exercising or gardening.</li>
        <li>Avoid contact with household chemicals, chlorine and abrasive surfaces.</li>
        <li>Put jewellery on last when dressing, and take it off first when undressing.</li>
      </ul>

      <h2>Cleaning at Home</h2>
      <p>
        For most diamond and precious-metal pieces, soak in warm water with a little mild soap,
        gently brush with a soft toothbrush, rinse and pat dry with a lint-free cloth.
      </p>
      <ul>
        <li><strong>Pearls &amp; opals</strong> are delicate — wipe only with a soft, damp cloth and never soak.</li>
        <li><strong>Emeralds</strong> should never be submerged; wipe gently instead.</li>
      </ul>

      <h2>Storage</h2>
      <p>
        Store each piece separately in a soft pouch or lined box to prevent scratching. Keep away
        from direct sunlight, heat and humidity.
      </p>

      <h2>Professional Servicing</h2>
      <p>
        We recommend a professional clean and settings check once a year. As part of our
        <strong> complimentary lifetime aftercare</strong>, we are always here to clean, service and
        restore your jewellery. Simply <a href="/contact">contact us</a> to arrange.
      </p>
    </ContentPage>
  );
}
