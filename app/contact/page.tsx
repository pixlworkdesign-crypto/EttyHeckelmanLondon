import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact & Appointments",
  description:
    "Contact Etty Hekelman London, book a private appointment or enquire about a bespoke commission.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
      <header className="text-center max-w-2xl mx-auto mb-16">
        <p className="overline">We would love to hear from you</p>
        <h1 className="font-display text-5xl md:text-6xl mt-3">Contact &amp; Appointments</h1>
        <p className="text-ash font-light mt-4">
          Whether you are beginning a bespoke commission or would like to view a piece in
          person, our team is here to help.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20">
        <aside className="space-y-10">
          <div>
            <h2 className="overline text-champagne mb-3">The Showroom</h2>
            <p className="font-light text-ash leading-relaxed">
              By appointment only
              <br />
              Mayfair, London
              <br />
              United Kingdom
            </p>
          </div>
          <div>
            <h2 className="overline text-champagne mb-3">Enquiries</h2>
            <p className="font-light text-ash leading-relaxed">
              <a href="mailto:enquiries@ettyhekelmanlondon.com" className="link-underline">
                enquiries@ettyhekelmanlondon.com
              </a>
              <br />
              +44 (0)20 7000 0000
            </p>
          </div>
          <div>
            <h2 className="overline text-champagne mb-3">Opening Hours</h2>
            <p className="font-light text-ash leading-relaxed">
              Monday – Friday · 10am – 6pm
              <br />
              Saturday · 11am – 5pm
              <br />
              Sunday · By appointment
            </p>
          </div>
        </aside>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
