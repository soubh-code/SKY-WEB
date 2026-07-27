export const EVISITING_CARD_URL = "https://skyskrabers.in/e-visiting-card";

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
  location: "C 132, Block C, Lajpat Nagar II, Lajpat Nagar, New Delhi, Delhi 110024",
  tagline: "SKY SKRABERS: LUXURY REDEFINED",
  qrUrl: EVISITING_CARD_URL,
};

export const LOGO_PATH = "/assets/e-visiting-card/sky-skrabers-golden-logo-transparent.png";
