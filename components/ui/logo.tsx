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
        // mix-blend-multiply makes the logo's light background blend into the
        // page (dark lettering stays), so its box/edge disappears on the cream.
        className="h-12 md:h-14 w-auto object-contain mx-auto mix-blend-multiply"
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
