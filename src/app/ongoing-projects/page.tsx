import type { Metadata } from "next";
import { HomePage } from "../page";

export const metadata: Metadata = {
  title: "Ongoing Projects",
  description:
    "View ongoing Sky Skrabers residential projects and available properties across South Delhi.",
  alternates: {
    canonical: "/ongoing-projects",
  },
};

export default function OngoingProjectsPage() {
  return <HomePage initialSection="ongoing-projects" />;
}
