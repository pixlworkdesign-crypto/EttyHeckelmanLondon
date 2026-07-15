/* eslint-disable @next/next/no-img-element */
import { LOGO_URL } from "@/lib/site";

/**
 * The house wordmark — uses your uploaded logo image (from the Shopify
 * metaobject, or NEXT_PUBLIC_LOGO_URL), falling back to the typeset wordmark
 * only if no image is set.
 */
export function Logo({ src }: { src?: string | null }) {
  const url = src || LOGO_URL;
  if (url) {
    return (
      <img
        src={url}
        alt="Etty Hekelman London"
        className="h-28 w-auto object-contain mx-auto"
      />
    );
  }

  return (
    <span className="block leading-none">
      <span className="block font-display font-light text-2xl md:text-[1.85rem] tracking-[0.24em] text-ink">
        ETTY HEKELMAN
      </span>
      <span className="block eyebrow mt-1.5 text-ash tracking-[0.42em]">London</span>
    </span>
  );
}
