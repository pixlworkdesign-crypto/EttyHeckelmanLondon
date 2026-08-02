"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Hero image with a gentle, contained parallax drift on scroll. The image is
 * scaled up slightly so the drift never reveals an edge, and the effect is
 * clamped and disabled under prefers-reduced-motion.
 */
export function HeroImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const section = el.closest("section");
      const top = section ? section.getBoundingClientRect().top : 0;
      const y = Math.max(-36, Math.min(36, top * -0.05));
      el.style.transform = `translate3d(0, ${y}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="parallax-layer absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-top scale-[1.12]"
      />
    </div>
  );
}
