import Image from "next/image";

const whatsappUrl = "https://wa.me/919999997327?text=hello";
const whatsappIcon = "/assets/whatsapp-icon-transparent.png";

export function WhatsAppButton() {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sky Skrabers on WhatsApp"
    >
      <Image src={whatsappIcon} alt="" aria-hidden="true" fill sizes="62px" />
    </a>
  );
}
