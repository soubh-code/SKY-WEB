import { ProjectDetailPage } from "@/app/projects/_components/ProjectDetailPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lajpat Nagar 1/2 Project | Sky Skrabers",
  description: "Explore the Lajpat Nagar 1/2 ongoing residences by Sky Skrabers in South Delhi.",
  alternates: {
    canonical: "/projects/lajpat-nagar-1-2",
  },
  openGraph: {
    title: "Lajpat Nagar 1/2 Project | Sky Skrabers",
    description: "Explore the Lajpat Nagar 1/2 ongoing project by Sky Skrabers.",
    url: "/projects/lajpat-nagar-1-2",
    siteName: "Sky Skrabers",
    type: "website",
  },
};

export default function LajpatNagarProjectPage() {
  return (
    <ProjectDetailPage
      titleLines={["LAJPAT", "NAGAR 1/2"]}
      projectName="Lajpat Nagar 1/2"
      addressLabel="Lajpat Nagar"
      addresses={[
        { title: "G-9, Lajpat Nagar-1" },
        { title: "B-89, Lajpat Nagar-2" },
        { title: "B-45A, Lajpat Nagar-2" },
        { title: "A-217, Lajpat Nagar-1" },
        { title: "E-102, Lajpat Nagar-1" },
      ]}
      whatsappText="I want to know more about Lajpat Nagar 1 and 2 ongoing projects."
    />
  );
}
