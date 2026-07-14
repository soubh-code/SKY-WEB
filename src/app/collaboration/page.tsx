import type { Metadata } from "next";
import { CollaborationContent } from "./CollaborationContent";

export const metadata: Metadata = {
  title: "Collaborate With Sky Skrabers",
  description:
    "Collaborate with Sky Skrabers on your South Delhi land. Share your land details on WhatsApp and connect with our team for development possibilities.",
  alternates: {
    canonical: "/collaboration",
  },
  openGraph: {
    title: "Collaborate With Sky Skrabers | South Delhi Property Development",
    description:
      "A direct WhatsApp-first collaboration route for landowners who want to explore planning, development, and value creation with Sky Skrabers.",
    url: "/collaboration",
    siteName: "Sky Skrabers",
    type: "website",
  },
};

export default function CollaborationPage() {
  return <CollaborationContent />;
}
