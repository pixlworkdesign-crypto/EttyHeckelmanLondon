"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Scroll-scrubbed reveal for the bespoke journey steps.
 *
 * Each step's champagne rail draws down its left edge while the copy slides in,
 * tied to how far the section has travelled up the viewport. Progress only ever
 * moves forward: once a step has drawn it stays drawn, so scrolling back up to
 * re-read a step never un-writes it.
 *
 * Fails safe: the markup renders in its finished state, so if scripting never
 * runs — or the visitor prefers reduced motion — the steps are simply there.
 */

/** How far into the viewport the section must be before anything moves. */
const START = 0.2;
/** Screen-heights of scrolling the whole cascade takes. */
const TRAVEL = 0.5;
/** How far behind each step trails the one before it. */
const STAGGER = 0.13;
/** Share of the cascade a single step takes on its own. */
const DRAW = 0.5;
/** Copy reaches full opacity this far through its step, so it reads early. */
const COPY_IN = 0.55;
/** Pixels the copy travels on the way in. */
const ENTRY = 14;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export type JourneyStep = { n: string; t: string; d: string };

export function JourneySteps({ steps }: { steps: readonly JourneyStep[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const railRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Leave the settled markup alone for anyone who prefers reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const latched = steps.map(() => 0);

    const paint = () => {
      const box = grid.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const p = clamp(((1 - START) * vh - box.top) / (vh * TRAVEL));

      for (let i = 0; i < latched.length; i++) {
        const live = clamp((p - i * STAGGER) / DRAW);
        const local = live > latched[i] ? live : latched[i];
        latched[i] = local;

        const rail = railRefs.current[i];
        if (rail) rail.style.transform = `scaleY(${local.toFixed(3)})`;

        const copy = copyRefs.current[i];
        if (copy) {
          copy.style.opacity = clamp(local / COPY_IN).toFixed(3);
          copy.style.transform = `translateX(${(-ENTRY + local * ENTRY).toFixed(2)}px)`;
        }
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        paint();
        ticking = false;
      });
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps]);

  return (
    <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
      {steps.map((s, i) => (
        <div key={s.n} className="relative pt-6 pl-[18px]">
          <span className="absolute left-0 top-0 h-px w-full bg-line" aria-hidden />
          <span
            ref={(el) => {
              railRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-champagne"
            aria-hidden
          />
          <div
            ref={(el) => {
              copyRefs.current[i] = el;
            }}
          >
            <p className="font-display text-5xl text-champagne">{s.n}</p>
            <h3 className="font-display text-2xl mt-4">{s.t}</h3>
            <p className="text-ash font-light leading-relaxed mt-3 text-sm">{s.d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
