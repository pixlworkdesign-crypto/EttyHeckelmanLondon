/* eslint-disable @next/next/no-img-element */
import { LOGO_URL } from "@/lib/site";

/**
 * The house wordmark.
 *
 * By default we render the *typeset* wordmark — built from the Cormorant serif.
 * It is razor-sharp at any size, always the exact brand brown, and can never
 * show a background box, so it's the most reliable, high-end option.
 *
 * To use an uploaded image logo instead (from the Shopify site-settings `logo`
 * or NEXT_PUBLIC_LOGO_URL), set NEXT_PUBLIC_USE_IMAGE_LOGO=1. Ideally that image
 * has a transparent background and is cropped tight to the artwork.
 */
export function Logo({ src }: { src?: string | null }) {
  const useImage = process.env.NEXT_PUBLIC_USE_IMAGE_LOGO === "1";
  const url = useImage ? src || LOGO_URL : "";

  if (url) {
    return (
      <img
        src={url}
        alt="Etty Hekelman London"
        className="h-36 md:h-44 w-auto object-contain mx-auto"
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
