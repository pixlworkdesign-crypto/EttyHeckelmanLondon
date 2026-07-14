/* eslint-disable @next/next/no-img-element */
import { LOGO_URL } from "@/lib/site";

/**
 * The house wordmark. Renders your uploaded logo image when LOGO_URL is set,
 * otherwise falls back to the typeset wordmark so the header is never empty.
 */
export function Logo({ src }: { src?: string | null }) {
  const url = src || LOGO_URL;
  if (url) {
    return (
      <img
        src={url}
        alt="Etty Hekelman London"
        className="h-9 md:h-11 w-auto object-contain mx-auto"
      />
    );
  }

  return (
    <span className="block leading-none">
      <span className="block font-display font-light text-2xl md:text-[1.85rem] tracking-[0.24em] text-ink">
        ETTY HEKELMAN
      </span>
      <span className="block overline mt-1.5 text-ash tracking-[0.42em]">London</span>
    </span>
  );
}
