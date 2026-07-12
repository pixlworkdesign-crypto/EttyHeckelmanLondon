"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "ehl-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        // Small delay so it eases in after the page settles.
        const t = setTimeout(() => setVisible(true), 900);
        return () => clearTimeout(t);
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] p-4 md:p-6 animate-rise">
      <div className="mx-auto max-w-3xl bg-ink text-porcelain shadow-2xl px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center gap-5">
        <p className="text-sm font-light text-porcelain/85 leading-relaxed flex-1">
          We use cookies to give you the finest experience and to understand how our site is used.
          See our{" "}
          <Link href="/cookies" className="underline underline-offset-2 hover:text-champagne">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => decide("declined")}
            className="btn btn-outline border-white/40 text-porcelain hover:bg-porcelain hover:text-ink !py-2.5 !px-5 text-[0.62rem]"
          >
            Decline
          </button>
          <button
            onClick={() => decide("accepted")}
            className="btn btn-primary bg-porcelain text-ink hover:bg-champagne hover:text-porcelain !py-2.5 !px-5 text-[0.62rem]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
