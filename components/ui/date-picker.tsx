"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type YMD = { y: number; m: number; d: number };

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (v: YMD) => `${v.y}-${pad(v.m + 1)}-${pad(v.d)}`;
const sameDay = (a: YMD, b: YMD) => a.y === b.y && a.m === b.m && a.d === b.d;

function CalendarGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} aria-hidden>
      <rect x="4" y="5" width="16" height="16" rx="1" />
      <path d="M4 9h16M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

export function DatePicker({
  name,
  label,
  required = false,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<YMD | null>(null);
  const today = useMemo<YMD>(() => {
    const t = new Date();
    return { y: t.getFullYear(), m: t.getMonth(), d: t.getDate() };
  }, []);
  const [view, setView] = useState({ y: today.y, m: today.m });
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const firstWeekday = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const beforeToday = (d: number) =>
    view.y < today.y ||
    (view.y === today.y && view.m < today.m) ||
    (view.y === today.y && view.m === today.m && d < today.d);
  const atMinMonth = view.y === today.y && view.m === today.m;

  const label_display = selected
    ? new Date(selected.y, selected.m, selected.d).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Select a date";

  const shiftMonth = (delta: number) =>
    setView((v) => {
      const m = v.m + delta;
      if (m < 0) return { y: v.y - 1, m: 11 };
      if (m > 11) return { y: v.y + 1, m: 0 };
      return { y: v.y, m };
    });

  return (
    <div className="relative" ref={ref}>
      <span className="text-[0.72rem] uppercase tracking-[0.16em] text-ink">
        {label}
        {required && <span className="text-champagne"> *</span>}
      </span>

      {/* Hidden field for form submission */}
      <input type="hidden" name={name} value={selected ? toISO(selected) : ""} required={required} />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full mt-2 flex items-center justify-between border-b border-line py-3 text-sm text-left focus:outline-none focus:border-champagne transition-colors"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={cn(selected ? "text-ink" : "text-ash/70")}>{label_display}</span>
        <CalendarGlyph className="w-4 h-4 text-ash" />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-[19rem] bg-porcelain border border-line shadow-[0_24px_60px_-24px_rgba(0,0,0,0.28)] p-5 animate-rise">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              disabled={atMinMonth}
              aria-label="Previous month"
              className="p-1.5 text-ink disabled:opacity-25 hover:text-champagne-dark transition-colors"
            >
              ‹
            </button>
            <span className="font-display text-lg">
              {MONTHS[view.m]} {view.y}
            </span>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label="Next month"
              className="p-1.5 text-ink hover:text-champagne-dark transition-colors"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((w, i) => (
              <span key={i} className="text-center text-[0.6rem] uppercase tracking-wider text-ash py-1">
                {w}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstWeekday }).map((_, i) => (
              <span key={`e${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const cell: YMD = { y: view.y, m: view.m, d: day };
              const disabled = beforeToday(day);
              const isSelected = selected && sameDay(selected, cell);
              const isToday = sameDay(today, cell);
              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    setSelected(cell);
                    setOpen(false);
                  }}
                  className={cn(
                    "aspect-square flex items-center justify-center text-sm transition-colors",
                    disabled && "text-ash/30 cursor-not-allowed",
                    !disabled && !isSelected && "text-ink hover:bg-ivory",
                    isSelected && "bg-noir text-porcelain",
                    !isSelected && isToday && "ring-1 ring-champagne"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
