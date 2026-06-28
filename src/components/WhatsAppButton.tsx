import Image from "next/image";

const defaultWhatsappUrl = "https://wa.me/919999997327?text=hello";
const whatsappIcon = "/assets/whatsapp-icon-transparent.png";

type WhatsAppButtonProps = {
  href?: string;
};

export function WhatsAppButton({ href = defaultWhatsappUrl }: WhatsAppButtonProps) {
  return (
    <a
      className="floating-whatsapp"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sky Skrabers on WhatsApp"
    >
      <Image src={whatsappIcon} alt="" aria-hidden="true" fill sizes="62px" />
    </a>
  );
}
