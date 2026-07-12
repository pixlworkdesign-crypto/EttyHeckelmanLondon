"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="border border-line bg-ivory px-8 py-12 text-center">
        <p className="overline text-champagne">Thank you</p>
        <h3 className="font-display text-3xl mt-3">We&apos;ll be in touch shortly</h3>
        <p className="text-ash font-light mt-3">
          A member of our team will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Wire this to your CRM, email service, or Shopify customer API.
        setSubmitted(true);
      }}
      className="space-y-6"
    >
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="First name" name="firstName" required />
        <Field label="Last name" name="lastName" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Email" name="email" type="email" required />
        <Field label="Telephone" name="phone" type="tel" />
      </div>
      <div>
        <label className="block">
          <span className="text-[0.72rem] uppercase tracking-[0.16em] text-ink">How can we help?</span>
          <select
            name="topic"
            className="w-full mt-2 bg-transparent border-b border-line py-3 text-sm focus:outline-none focus:border-champagne transition-colors"
          >
            <option>A bespoke commission</option>
            <option>An existing order</option>
            <option>Book a private appointment</option>
            <option>Jewellery care &amp; servicing</option>
            <option>Something else</option>
          </select>
        </label>
      </div>
      <div>
        <label className="block">
          <span className="text-[0.72rem] uppercase tracking-[0.16em] text-ink">Message</span>
          <textarea
            name="message"
            rows={5}
            required
            className="w-full mt-2 bg-transparent border-b border-line py-3 text-sm resize-none focus:outline-none focus:border-champagne transition-colors"
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Send Enquiry
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[0.72rem] uppercase tracking-[0.16em] text-ink">
        {label}
        {required && <span className="text-champagne"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full mt-2 bg-transparent border-b border-line py-3 text-sm focus:outline-none focus:border-champagne transition-colors"
      />
    </label>
  );
}
