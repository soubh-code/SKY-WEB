import Image from "next/image";
import { business } from "@/lib/business";

const whatsappIcon = "/assets/whatsapp-icon-transparent.png";

type WhatsAppButtonProps = {
  href?: string;
};

export function WhatsAppButton({ href = business.whatsappHref }: WhatsAppButtonProps) {
  return (
    <a
      className="floating-whatsapp"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sky Skrabers on WhatsApp"
      data-analytics-event="whatsapp_click"
      data-analytics-label="Floating WhatsApp button"
    >
      <Image src={whatsappIcon} alt="" aria-hidden="true" fill sizes="62px" />
    </a>
  );
}
