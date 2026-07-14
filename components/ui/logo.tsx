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
    // The uploaded logo has empty margins baked in. We show it inside a fixed,
    // compact box and use object-cover so the surrounding whitespace is cropped
    // away — this enlarges the actual lettering without making the header taller.
    return (
      <span className="block h-12 md:h-16 w-[280px] md:w-[420px] overflow-hidden mx-auto">
        <img
          src={url}
          alt="Etty Hekelman London"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center" }}
        />
      </span>
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
