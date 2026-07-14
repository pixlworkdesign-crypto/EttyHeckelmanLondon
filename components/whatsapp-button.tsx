import { WhatsAppIcon } from "@/components/ui/icons";

// Set NEXT_PUBLIC_WHATSAPP_NUMBER in your environment (international format,
// digits only, e.g. 447700900000). Falls back to a placeholder until then.
const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "447000000000";
const MESSAGE = "Hello Etty Hekelman London, I would like to enquire about a piece.";

export function WhatsAppButton() {
  const href = `https://wa.me/${NUMBER}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-13 h-13 flex items-center justify-center rounded-full bg-ink text-porcelain shadow-lg hover:bg-champagne-dark transition-colors duration-300"
      style={{ width: "3.25rem", height: "3.25rem" }}
    >
      <WhatsAppIcon className="w-6 h-6" />
    </a>
  );
}
