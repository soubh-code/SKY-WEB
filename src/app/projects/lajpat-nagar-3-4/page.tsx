import { ProjectDetailPage } from "@/app/projects/_components/ProjectDetailPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lajpat Nagar 3 Project",
  description: "Explore the Lajpat Nagar 3 ongoing residence by Sky Skrabers in South Delhi.",
  alternates: {
    canonical: "/projects/lajpat-nagar-3-4",
  },
  openGraph: {
    title: "Lajpat Nagar 3 Project | Sky Skrabers",
    description: "Explore the Lajpat Nagar 3 ongoing project by Sky Skrabers.",
    url: "/projects/lajpat-nagar-3-4",
    siteName: "Sky Skrabers",
    type: "website",
  },
};

export default function LajpatNagarThreeFourProjectPage() {
  return (
    <ProjectDetailPage
      titleLines={["LAJPAT", "NAGAR 3"]}
      projectName="Lajpat Nagar 3"
      addressLabel="Lajpat Nagar"
      addresses={[
        {
          title: "G-16, Lajpat Nagar-3.",
          details: [
            { label: "Area", value: "200 sqmt" },
            { label: "Structure", value: "4 Floors + Basement, Stilt Parking" },
            { label: "Config", value: "3BHK" },
            { label: "Completion", value: "By the end of Sep-26" },
          ],
        },
      ]}
      whatsappText="I want to know more about Lajpat Nagar 3 ongoing projects."
    />
  );
}
