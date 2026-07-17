/* eslint-disable @next/next/no-img-element */
import { LOGO_URL } from "@/lib/site";

/**
 * The house wordmark — your uploaded logo image (from the Shopify site-settings
 * `logo`, or NEXT_PUBLIC_LOGO_URL). Change the height classes below to make the
 * writing bigger or smaller. Falls back to the typeset wordmark only if no
 * image is set.
 */
export function Logo({ src }: { src?: string | null }) {
  const url = src || LOGO_URL;

  if (url) {
    return (
      <img
        src={url}
        alt="Etty Hekelman London"
        className="h-32 md:h-40 w-auto object-contain mx-auto"
      />
    );
  }

  return (
    <span className="block leading-none">
      <span className="block font-display font-light text-[1.15rem] tracking-[0.16em] sm:text-3xl sm:tracking-[0.2em] md:text-4xl lg:text-[3.1rem] text-ink whitespace-nowrap">
        ETTY HEKELMAN
      </span>
      <span className="block eyebrow mt-1.5 md:mt-3 text-ash text-[0.55rem] tracking-[0.4em] md:text-[0.8rem] md:tracking-[0.55em]">
        London
      </span>
    </span>
  );
}
