import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { getSiteSettings } from "@/lib/shopify";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Appointments",
  description:
    "Contact Etty Hekelman London, book a private appointment or enquire about a bespoke commission.",
};

export const revalidate = 60;

// Opening hours are managed in Shopify → Site Settings; this is the fallback.
const DEFAULT_HOURS =
  "Monday – Friday · 10am – 6pm\nSaturday · 11am – 5pm\nSunday · By appointment";

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
const waHref = (num: string) => `https://wa.me/${num.replace(/[^\d]/g, "")}`;

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const hours = settings.hours ?? DEFAULT_HOURS;

  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
      <header className="text-center max-w-2xl mx-auto mb-16">
        <p className="eyebrow">We would love to hear from you</p>
        <h1 className="font-display text-5xl md:text-6xl mt-3">Contact &amp; Appointments</h1>
        <p className="text-ash font-light mt-4">
          Whether you are beginning a bespoke commission or would like to view a piece in
          person, our team is here to help.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20">
        <aside className="space-y-10">
          {CONTACT.address && (
            <div>
              <h2 className="eyebrow text-champagne mb-3">The Showroom</h2>
              <p className="font-light text-ash leading-relaxed whitespace-pre-line">
                {CONTACT.address}
              </p>
            </div>
          )}
          <div>
            <h2 className="eyebrow text-champagne mb-3">Enquiries</h2>
            <ul className="font-light text-ash leading-relaxed space-y-1.5">
              {CONTACT.email && (
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="link-underline hover:text-ink transition-colors">
                    {CONTACT.email}
                  </a>
                </li>
              )}
              {CONTACT.phone && (
                <li>
                  <a href={telHref(CONTACT.phone)} className="link-underline hover:text-ink transition-colors">
                    {CONTACT.phone}
                  </a>
                </li>
              )}
              {CONTACT.whatsapp && (
                <li>
                  <a
                    href={waHref(CONTACT.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline hover:text-ink transition-colors"
                  >
                    Message us on WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-champagne mb-3">Opening Hours</h2>
            <p className="font-light text-ash leading-relaxed whitespace-pre-line">{hours}</p>
          </div>
        </aside>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
