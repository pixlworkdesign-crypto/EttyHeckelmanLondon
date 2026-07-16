import { WhatsAppIcon } from "@/components/ui/icons";
import { CONTACT } from "@/lib/site";

const MESSAGE = "Hello Etty Hekelman London, I would like to enquire about a piece.";

/**
 * Floating WhatsApp button. Uses CONTACT.whatsapp from lib/site.ts; hidden
 * until a number is set so we never link to a dead number.
 */
export function WhatsAppButton() {
  const digits = CONTACT.whatsapp.replace(/[^\d]/g, "");
  if (!digits) return null;

  const href = `https://wa.me/${digits}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-full bg-noir text-porcelain shadow-lg hover:bg-champagne-dark transition-colors duration-300"
      style={{ width: "3.25rem", height: "3.25rem" }}
    >
      <WhatsAppIcon className="w-6 h-6" />
    </a>
  );
}
