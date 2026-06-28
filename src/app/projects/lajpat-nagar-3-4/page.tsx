import { ProjectDetailPage } from "@/app/projects/_components/ProjectDetailPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lajpat Nagar 3/4 Project | Sky Skrabers",
  description: "Explore the Lajpat Nagar 3/4 ongoing residences by Sky Skrabers in South Delhi.",
  alternates: {
    canonical: "/projects/lajpat-nagar-3-4",
  },
  openGraph: {
    title: "Lajpat Nagar 3/4 Project | Sky Skrabers",
    description: "Explore the Lajpat Nagar 3/4 ongoing project by Sky Skrabers.",
    url: "/projects/lajpat-nagar-3-4",
    siteName: "Sky Skrabers",
    type: "website",
  },
};

export default function LajpatNagarThreeFourProjectPage() {
  return (
    <ProjectDetailPage
      titleLines={["LAJPAT", "NAGAR 3/4"]}
      projectName="Lajpat Nagar 3/4"
      addressLabel="Lajpat Nagar"
      addresses={[
        { title: "A-160, Dayanand Colony, Lajpat Nagar-4" },
        { title: "G-16, Lajpat Nagar-3." },
      ]}
      whatsappText="I want to know more about Lajpat Nagar 3 and 4 ongoing projects."
    />
  );
}
