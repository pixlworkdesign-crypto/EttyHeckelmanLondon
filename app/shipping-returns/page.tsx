import type { Metadata } from "next";
import Image from "next/image";
import { ContentPage } from "@/components/content-page";
import { PACKAGING_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping, Returns & Warranty",
  description:
    "Complimentary insured worldwide delivery, 30-day returns and a lifetime warranty on every Etty Hekelman London piece.",
};

export default function ShippingReturnsPage() {
  return (
    <ContentPage
      overline="Client Care"
      title="Shipping, Returns & Warranty"
      intro="Every order is handled with the same care as the jewellery itself — discreetly packaged, fully insured and supported for a lifetime."
    >
      <h2>Delivery</h2>
      <p>
        We offer <strong>complimentary insured delivery</strong> on all orders, presented in our
        signature packaging. Each piece is fully insured until the moment it reaches your hands.
      </p>
      <ul>
        <li><strong>United Kingdom:</strong> 1–2 working days, by secure courier.</li>
        <li><strong>Europe:</strong> 2–4 working days, fully insured and tracked.</li>
        <li><strong>Rest of the world:</strong> 3–6 working days, fully insured and tracked.</li>
      </ul>
      <p>
        Bespoke and made-to-order pieces are crafted especially for you; your appointed adviser
        will confirm the delivery timeline at the time of commission.
      </p>

      <h2>Returns &amp; Exchanges</h2>
      <p>
        We want you to be entirely delighted. If a piece is not right, you may return it within
        <strong> 30 days</strong> of delivery for a full refund or exchange, provided it is unworn
        and in its original condition and packaging, with all certification.
      </p>
      <h3>How to return</h3>
      <ul>
        <li>Contact us to arrange a fully insured, complimentary return collection.</li>
        <li>Refunds are processed within 5–7 working days of the piece being received and inspected.</li>
        <li>Bespoke, engraved and made-to-order pieces are non-returnable, as they are created uniquely for you.</li>
      </ul>

      <h2>Signature Packaging</h2>
      <div className="not-prose my-6 relative aspect-[16/10] overflow-hidden bg-ivory">
        <Image
          src={PACKAGING_IMAGE}
          alt="Etty Hekelman London signature packaging"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>
      <p>
        Every order is presented in our signature packaging — a hand-finished box, a soft
        microfibre pouch and polishing cloth, wrapped in acid-free tissue and finished with our
        seal. Complimentary gift wrapping is available on request; simply note it at checkout or
        let your adviser know.
      </p>

      <h2>Lifetime Warranty &amp; Aftercare</h2>
      <p>
        Every Etty Hekelman London piece is guaranteed against manufacturing defects for life.
        We also offer <strong>complimentary cleaning, servicing and re-polishing</strong> to keep
        your jewellery as radiant as the day you received it.
      </p>
      <p>
        Resizing, restringing and general repairs are available; please contact us and we will be
        delighted to assist.
      </p>
    </ContentPage>
  );
}
