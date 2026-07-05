import { ProjectDetailPage } from "@/app/projects/_components/ProjectDetailPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lajpat Nagar 1/2/4 Project",
  description: "Explore the Lajpat Nagar 1/2/4 ongoing residences by Sky Skrabers in South Delhi.",
  alternates: {
    canonical: "/projects/lajpat-nagar-1-2",
  },
  openGraph: {
    title: "Lajpat Nagar 1/2/4 Project | Sky Skrabers",
    description: "Explore the Lajpat Nagar 1/2/4 ongoing project by Sky Skrabers.",
    url: "/projects/lajpat-nagar-1-2",
    siteName: "Sky Skrabers",
    type: "website",
  },
};

export default function LajpatNagarProjectPage() {
  return (
    <ProjectDetailPage
      titleLines={["LAJPAT", "NAGAR 1/2/4"]}
      projectName="Lajpat Nagar 1/2/4"
      addressLabel="Lajpat Nagar"
      addresses={[
        {
          title: "G-9, Lajpat Nagar-1",
          details: [
            { label: "Area", value: "100 sqyrd" },
            { label: "Opening", value: "Corner 3 side open" },
            { label: "Structure", value: "4 Floors + Basement, Stilt Parking" },
            { label: "Config", value: "2BHK" },
            { label: "Completion", value: "By the end of Sep-26" },
          ],
        },
        {
          title: "B-89, Lajpat Nagar-2",
          details: [
            { label: "Area", value: "100 sqyrd" },
            { label: "Opening", value: "Corner 3 side open" },
            { label: "Structure", value: "4 Floors + Basement, Stilt Parking" },
            { label: "Config", value: "2BHK" },
            { label: "Completion", value: "By the end of Sep-26" },
          ],
        },
        {
          title: "B-45A, Lajpat Nagar-2",
          details: [
            { label: "Area", value: "200 sqmt" },
            { label: "Opening", value: "Corner 3 side open" },
            { label: "Structure", value: "4 Floors + Basement, Stilt Parking" },
            { label: "Config", value: "3BHK" },
            { label: "Completion", value: "By the end of Oct-26" },
          ],
        },
        {
          title: "A-217, Lajpat Nagar-1",
          details: [
            { label: "Area", value: "100 sqyrd" },
            { label: "Structure", value: "4 Floors + Basement, Stilt Parking" },
            { label: "Config", value: "2BHK" },
            { label: "Completion", value: "By the end of Oct-26" },
          ],
        },
        {
          title: "E-102, Lajpat Nagar-1",
          details: [
            { label: "Area", value: "100 sqyrd" },
            { label: "Structure", value: "4 Floors + Basement, Stilt Parking" },
            { label: "Config", value: "2BHK" },
            { label: "Completion", value: "By the end of Oct-26" },
          ],
        },
        {
          title: "A-160, Dayanand Colony, Lajpat Nagar-4",
          details: [
            { label: "Area", value: "100 sqyrd" },
            { label: "Structure", value: "4 Floors + Basement, Stilt Parking" },
            { label: "Config", value: "2BHK" },
            { label: "Completion", value: "By the end of Sep-26" },
          ],
        },
      ]}
      whatsappText="I want to know more about Lajpat Nagar 1, 2 and 4 ongoing projects."
    />
  );
}
