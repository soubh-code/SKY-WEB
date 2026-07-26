import type { Metadata } from "next";
import { HomePage } from "../page";

export const metadata: Metadata = {
  title: "Residential Projects",
  description:
    "Explore ongoing residential projects and available homes by Sky Skrabers across South Delhi.",
  alternates: {
    canonical: "/residential-projects",
  },
};

export default function ResidentialProjectsPage() {
  return <HomePage initialSection="ongoing-projects" />;
}
