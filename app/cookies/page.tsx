import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Etty Heckelman London uses cookies and how you can manage your preferences.",
};

export default function CookiesPage() {
  return (
    <ContentPage overline="Legal" title="Cookie Policy">
      <p>
        Cookies are small text files stored on your device that help our website function and help
        us understand how it is used. This policy explains how we use them.
      </p>

      <h2>Types of Cookies We Use</h2>
      <ul>
        <li><strong>Essential cookies</strong> — required for the website and your shopping bag to work.</li>
        <li><strong>Analytics cookies</strong> — help us understand how visitors use the site so we can improve it.</li>
        <li><strong>Marketing cookies</strong> — used, with your consent, to show relevant advertising.</li>
      </ul>

      <h2>Managing Cookies</h2>
      <p>
        When you first visit, we ask for your consent to non-essential cookies. You can change your
        mind at any time by clearing cookies in your browser settings, which will prompt the banner
        to appear again on your next visit.
      </p>

      <h2>More Information</h2>
      <p>
        For how we handle your wider personal data, please see our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <p>
        <em>
          This policy is a starting template. Please review it alongside your analytics and
          marketing setup and adjust as needed.
        </em>
      </p>
    </ContentPage>
  );
}
