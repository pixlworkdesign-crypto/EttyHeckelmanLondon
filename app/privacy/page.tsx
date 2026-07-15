import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Etty Hekelman London collects, uses and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <ContentPage eyebrow="Legal" title="Privacy Policy">
      <p>
        This Privacy Policy explains how <strong>Etty Hekelman London</strong> (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;) collects, uses and protects your personal information when you visit our
        website or purchase from us. We are committed to protecting your privacy and handling your
        data in line with UK GDPR and the Data Protection Act 2018.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Contact details you provide (name, email, telephone, delivery and billing address).</li>
        <li>Order and payment information (payments are processed securely by Shopify; we do not store your card details).</li>
        <li>Information you share when you contact us or book an appointment.</li>
        <li>Technical data such as your IP address and browsing activity, via cookies.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To process and deliver your orders and provide aftercare.</li>
        <li>To respond to enquiries and appointment requests.</li>
        <li>To send you marketing communications, where you have consented.</li>
        <li>To improve our website and comply with our legal obligations.</li>
      </ul>

      <h2>Sharing Your Information</h2>
      <p>
        We share data only with trusted providers who help us operate — such as our e-commerce
        platform (Shopify), payment processors and delivery partners — and only as needed. We never
        sell your personal data.
      </p>

      <h2>Your Rights</h2>
      <p>
        You have the right to access, correct or delete your personal data, and to object to or
        restrict its processing. To exercise any of these rights, please{" "}
        <a href="/contact">contact us</a>.
      </p>

      <h2>Contact</h2>
      <p>
        For any privacy questions, email <a href="mailto:privacy@ettyhekelmanlondon.com">privacy@ettyhekelmanlondon.com</a>.
      </p>

      <p>
        <em>
          This policy is provided as a starting template. Please review it with a qualified adviser
          and update the business details to reflect your registered company information.
        </em>
      </p>
    </ContentPage>
  );
}
