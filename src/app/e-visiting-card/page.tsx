import type { Metadata } from "next";
import { EVisitingCardStudio } from "./EVisitingCardStudio";

export const metadata: Metadata = {
  title: "Avneet Singh Arora | E-Visiting Card",
  description:
    "Connect with Avneet Singh Arora, Founder and Director of Sky Skrabers, for luxury real estate, construction and redevelopment in South Delhi.",
  alternates: {
    canonical: "/e-visiting-card",
  },
};

export default function EVisitingCardPage() {
  return <EVisitingCardStudio />;
}
