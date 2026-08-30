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
/** A visitor who arrives already looking at the section gets a timed reveal
 *  rather than a scrubbed one — there is no scroll left to drive it. */
const ALREADY_IN_VIEW = 0.7;
const TIMED_MS = 900;
const TIMED_STAGGER = 140;
const EASE = "cubic-bezier(0.19, 1, 0.22, 1)";

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

    const setStep = (i: number, local: number) => {
      const rail = railRefs.current[i];
      if (rail) rail.style.transform = `scaleY(${local.toFixed(3)})`;

      const copy = copyRefs.current[i];
      if (copy) {
        copy.style.opacity = clamp(local / COPY_IN).toFixed(3);
        copy.style.transform = `translateX(${(-ENTRY + local * ENTRY).toFixed(2)}px)`;
      }
    };

    const progress = () => {
      const box = grid.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return {
        p: clamp(((1 - START) * vh - box.top) / (vh * TRAVEL)),
        inView: box.top < vh * ALREADY_IN_VIEW,
      };
    };

    // Reloading restores the scroll position, and a shared link can point
    // straight here — either way the section is already on screen and there is
    // no scroll left to scrub. Play the reveal on a timer so it still happens.
    if (progress().inView) {
      steps.forEach((_, i) => {
        const rail = railRefs.current[i];
        const copy = copyRefs.current[i];
        if (rail) rail.style.transition = "none";
        if (copy) copy.style.transition = "none";
        setStep(i, 0);
      });

      const play = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          steps.forEach((_, i) => {
            const delay = i * TIMED_STAGGER;
            const rail = railRefs.current[i];
            const copy = copyRefs.current[i];
            if (rail) {
              rail.style.transition = `transform ${TIMED_MS}ms ${EASE} ${delay}ms`;
              rail.style.transform = "scaleY(1)";
            }
            if (copy) {
              copy.style.transition =
                `opacity ${Math.round(TIMED_MS * 0.6)}ms ${EASE} ${delay}ms, ` +
                `transform ${TIMED_MS}ms ${EASE} ${delay}ms`;
              copy.style.opacity = "1";
              copy.style.transform = "translateX(0px)";
            }
          });
        })
      );

      return () => cancelAnimationFrame(play);
    }

    const paint = () => {
      const { p } = progress();
      for (let i = 0; i < latched.length; i++) {
        const live = clamp((p - i * STAGGER) / DRAW);
        const local = live > latched[i] ? live : latched[i];
        latched[i] = local;
        setStep(i, local);
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
