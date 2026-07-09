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
          title: "B-15, Lajpat Nagar-3",
          details: [
            { label: "Area", value: "190 sqyrd" },
            { label: "Config", value: "3BHK" },
            { label: "Availability", value: "3rd floor with terrace" },
            { label: "Special", value: "Lift, 1 car separate parking, glass room on terrace" },
            { label: "Status", value: "Ready to move, renovated floor" },
          ],
        },
      ]}
      whatsappText="I want to know more about Lajpat Nagar 3 ongoing projects."
    />
  );
}
