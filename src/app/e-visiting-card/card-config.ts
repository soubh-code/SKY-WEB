export const EVISITING_CARD_URL = "https://www.skyskrabers.in/e-visiting-card";

export type CardDetails = {
  name: string;
  designation: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  tagline: string;
  qrUrl: string;
};

export const cardDetails: CardDetails = {
  name: "AVNEET SINGH ARORA",
  designation: "FOUNDER / OWNER",
  phone: "9999997327",
  email: "arora.avneet100@gmail.com",
  website: "skyskrabers.in",
  location: "Sky Skrabers",
  tagline: "SKY SKRABERS: LUXURY REDEFINED",
  qrUrl: EVISITING_CARD_URL,
};

export const LOGO_PATH = "/assets/e-visiting-card/sky-skrabers-golden-logo-transparent.png";
