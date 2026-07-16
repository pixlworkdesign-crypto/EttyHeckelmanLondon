"use client";

import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="border border-line bg-ivory px-8 py-12 text-center">
        <div className="rule-motif mb-6">
          <span />
        </div>
        <p className="eyebrow text-champagne">Request Received</p>
        <h3 className="font-display text-3xl mt-3">We look forward to welcoming you</h3>
        <p className="text-ash font-light mt-3">
          A member of our team will be in touch shortly to confirm your appointment.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Connect to your booking system, calendar or email service here.
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
        <Field label="Telephone" name="phone" type="tel" required />
      </div>

      <div>
        <span className="text-[0.72rem] uppercase tracking-[0.16em] text-ink">Appointment type</span>
        <div className="flex flex-wrap gap-3 mt-3">
          {["In our London showroom", "Virtual appointment"].map((type, i) => (
            <label key={type} className="cursor-pointer">
              <input type="radio" name="type" value={type} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-block px-5 py-2.5 text-xs tracking-wide border border-line text-ink peer-checked:border-noir peer-checked:bg-noir peer-checked:text-porcelain transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <DatePicker label="Preferred date" name="date" required />
        <label className="block">
          <span className="text-[0.72rem] uppercase tracking-[0.16em] text-ink">Preferred time</span>
          <select
            name="time"
            className="w-full mt-2 bg-transparent border-b border-line py-3 text-sm focus:outline-none focus:border-champagne transition-colors"
          >
            <option>Morning (10am – 12pm)</option>
            <option>Afternoon (12pm – 4pm)</option>
            <option>Late afternoon (4pm – 6pm)</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-[0.72rem] uppercase tracking-[0.16em] text-ink">
          What are you looking for? <span className="text-ash">(optional)</span>
        </span>
        <textarea
          name="message"
          rows={4}
          className="w-full mt-2 bg-transparent border-b border-line py-3 text-sm resize-none focus:outline-none focus:border-champagne transition-colors"
        />
      </label>

      <button type="submit" className="btn btn-primary">
        Request Appointment
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
