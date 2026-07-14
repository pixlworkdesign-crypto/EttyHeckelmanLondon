import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing your use of the Etty Hekelman London website and purchases.",
};

export default function TermsPage() {
  return (
    <ContentPage overline="Legal" title="Terms & Conditions">
      <p>
        These Terms &amp; Conditions govern your use of the Etty Hekelman London website and any
        purchase you make from us. By using our website, you agree to these terms.
      </p>

      <h2>Products &amp; Pricing</h2>
      <ul>
        <li>All prices are shown in pounds sterling (GBP) and include applicable UK taxes unless stated otherwise.</li>
        <li>As our pieces are handcrafted, slight natural variations in stones and finish are part of their character.</li>
        <li>We reserve the right to correct any pricing errors and to update prices at any time.</li>
      </ul>

      <h2>Orders</h2>
      <p>
        Your order is an offer to purchase. A contract is formed once we confirm and dispatch your
        order. We may decline an order where a product is unavailable or a pricing error has occurred.
      </p>

      <h2>Payment</h2>
      <p>
        Payments are processed securely through Shopify&apos;s checkout. We do not store your card
        details.
      </p>

      <h2>Returns</h2>
      <p>
        Please see our <a href="/shipping-returns">Shipping, Returns &amp; Warranty</a> page for full
        details of our returns policy and lifetime warranty.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this website — including designs, imagery and text — is the property of Etty
        Hekelman London and may not be used without our written permission.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of England and Wales, and any disputes are subject to
        the exclusive jurisdiction of its courts.
      </p>

      <p>
        <em>
          This document is a starting template. Please have it reviewed by a qualified legal adviser
          and add your registered company details before publishing.
        </em>
      </p>
    </ContentPage>
  );
}
