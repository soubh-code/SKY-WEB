import type { Metadata } from "next";
import { HomePage } from "../page";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore completed residential projects by Sky Skrabers across South Delhi.",
  alternates: {
    canonical: "/our-projects",
  },
};

export default function OurProjectsPage() {
  return <HomePage initialSection="our-projects" />;
}
