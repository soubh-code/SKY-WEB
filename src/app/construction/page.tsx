import type { Metadata } from "next";
import { ConstructionContent } from "./ConstructionContent";

export const metadata: Metadata = {
  title: "Construction in South Delhi | Sky Skrabers",
  description:
    "Explore how Sky Skrabers constructs and transforms South Delhi properties with refined builder-floor construction, structural planning, and complete before-after makeovers.",
  alternates: {
    canonical: "/construction",
  },
  openGraph: {
    title: "Construction in South Delhi | Sky Skrabers",
    description:
      "Dedicated construction and transformation work by Sky Skrabers across South Delhi homes and premium builder floors.",
    url: "/construction",
    siteName: "Sky Skrabers",
    type: "website",
  },
};

export default function ConstructionPage() {
  return <ConstructionContent />;
}
