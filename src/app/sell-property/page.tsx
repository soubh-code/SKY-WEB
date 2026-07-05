import type { Metadata } from "next";
import { SellPropertyContent } from "./SellPropertyContent";

export const metadata: Metadata = {
  title: "Sell Property in South Delhi",
  description:
    "Sell your property with Sky Skrabers. Message us on WhatsApp, connect with our team, arrange a property visit, and understand the best possible value.",
  alternates: {
    canonical: "/sell-property",
  },
  openGraph: {
    title: "Sell Property in South Delhi | Sky Skrabers",
    description:
      "A direct WhatsApp-first property selling route with quick replies, personal connection, property visits, and value guidance.",
    url: "/sell-property",
    siteName: "Sky Skrabers",
    type: "website",
  },
};

export default function SellPropertyPage() {
  return <SellPropertyContent />;
}
