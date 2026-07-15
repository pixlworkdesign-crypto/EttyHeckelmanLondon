import { WhatsAppIcon } from "@/components/ui/icons";

const MESSAGE = "Hello Etty Hekelman London, I would like to enquire about a piece.";

/**
 * Floating WhatsApp button. Uses the number from Shopify Site Settings
 * (passed in) or NEXT_PUBLIC_WHATSAPP_NUMBER; hidden until one is set so we
 * never link to a dead number.
 */
export function WhatsAppButton({ number }: { number?: string | null }) {
  const raw = number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;

  const href = `https://wa.me/${digits}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-full bg-ink text-porcelain shadow-lg hover:bg-champagne-dark transition-colors duration-300"
      style={{ width: "3.25rem", height: "3.25rem" }}
    >
      <WhatsAppIcon className="w-6 h-6" />
    </a>
  );
}
