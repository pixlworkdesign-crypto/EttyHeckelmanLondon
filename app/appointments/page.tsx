import type { Metadata } from "next";
import { AppointmentForm } from "./appointment-form";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book a private, one-to-one appointment with Etty Hekelman London — in our showroom or virtually.",
};

export default function AppointmentsPage() {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Image side */}
      <div className="relative hidden lg:block bg-gradient-to-br from-noir via-champagne-dark to-noir">
        <div className="absolute bottom-0 left-0 p-12 text-porcelain">
          <p className="eyebrow text-porcelain/80">By Appointment</p>
          <h2 className="font-display text-4xl mt-2 max-w-sm leading-tight">
            An unhurried, private experience
          </h2>
        </div>
      </div>

      {/* Form side */}
      <div className="px-5 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="max-w-lg mx-auto">
          <header className="mb-10">
            <p className="eyebrow">Private Appointments</p>
            <h1 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
              Book Your Visit
            </h1>
            <p className="text-ash font-light mt-4 leading-relaxed">
              Whether you are choosing an engagement ring or beginning a bespoke commission, we
              would be delighted to welcome you for a private, one-to-one appointment — in person or
              virtually.
            </p>
          </header>
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
}
