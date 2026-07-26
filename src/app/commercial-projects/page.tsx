import type { Metadata } from "next";
import { HomePage } from "../page";

export const metadata: Metadata = {
  title: "Commercial Projects",
  description:
    "Explore completed commercial and property projects delivered by Sky Skrabers.",
  alternates: {
    canonical: "/commercial-projects",
  },
};

export default function CommercialProjectsPage() {
  return <HomePage initialSection="our-projects" />;
}
