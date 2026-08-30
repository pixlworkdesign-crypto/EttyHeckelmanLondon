"use client";

import { useEffect, useRef } from "react";

const VALUES = [
  {
    key: "gem",
    title: "Fine Jewellery",
    body: "Rare stones, hand-set with exacting care.",
    icon: (
      <svg className="i-gem" viewBox="0 0 32 32" aria-hidden>
        <path d="M8 6 H24 L28 12 L16 27 L4 12 Z" />
        <path d="M4 12 H28" />
        <path d="M12 6 L10 12" />
        <path d="M20 6 L22 12" />
        <path d="M16 27 L10 12" />
        <path d="M16 27 L22 12" />
      </svg>
    ),
  },
  {
    key: "compass",
    title: "Considered Design",
    body: "Every detail drawn and refined by hand.",
    icon: (
      <svg className="i-compass" viewBox="0 0 32 32" aria-hidden>
        <circle cx="16" cy="6" r="2.4" />
        <path d="M16 8.4 L9 26" />
        <path d="M16 8.4 L23 26" />
        <path d="M11.4 19 A6.2 6.2 0 0 0 20.6 19" />
      </svg>
    ),
  },
  {
    key: "hour",
    title: "Timeless Design",
    body: "Made to be worn today and treasured always.",
    icon: (
      <svg className="i-hour" viewBox="0 0 32 32" aria-hidden>
        <path d="M8 4 H24" />
        <path d="M8 28 H24" />
        <path d="M9 4 L23 4 L16 16 L23 28 L9 28 L16 16 Z" />
      </svg>
    ),
  },
  {
    key: "shield",
    title: "Made to Last",
    body: "Built to endure, backed by lifetime aftercare.",
    icon: (
      <svg className="i-shield" viewBox="0 0 32 32" aria-hidden>
        <path d="M16 3 L26 7 V15 C26 22 21 26 16 28 C11 26 6 22 6 15 V7 Z" />
        <path d="M12 15 l3 3 l6 -7" />
      </svg>
    ),
  },
];

export function ValueRow() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      el?.classList.add("go");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => el.classList.toggle("go", e.isIntersecting));
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-porcelain">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 py-16 md:py-24">
        <div ref={gridRef} className="vgrid">
          {VALUES.map((v) => (
            <div key={v.key} className="vitem">
              <span className="vic">{v.icon}</span>
              <h3 className="vtitle font-display font-light text-2xl md:text-[1.6rem] leading-tight tracking-[0.01em] text-noir">
                {v.title}
              </h3>
              <p className="text-sm text-ash font-light mt-4 leading-relaxed max-w-[14rem] mx-auto">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
