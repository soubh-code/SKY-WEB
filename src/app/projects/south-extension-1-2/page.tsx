import { ProjectDetailPage } from "@/app/projects/_components/ProjectDetailPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "South Extension Part 1/2 Project",
  description: "Explore the South Extension Part 1/2 ongoing residence by Sky Skrabers in South Delhi.",
  alternates: {
    canonical: "/projects/south-extension-1-2",
  },
  openGraph: {
    title: "South Extension Part 1/2 Project | Sky Skrabers",
    description: "Explore the South Extension Part 1/2 ongoing project by Sky Skrabers.",
    url: "/projects/south-extension-1-2",
    siteName: "Sky Skrabers",
    type: "website",
  },
};

export default function SouthExtensionProjectPage() {
  return (
    <ProjectDetailPage
      titleLines={["SOUTH", "EXTENSION 1/2"]}
      projectName="South Extension Part 1/2"
      addressLabel="South Extension"
      addresses={[
        {
          title: "G-16, South Extension, Part-2.",
          details: [
            { label: "Area", value: "600 sqyrd" },
            { label: "Config", value: "4BHK" },
            { label: "Units", value: "Dual unit, front & back" },
            { label: "Availability", value: "All floors available" },
            { label: "Status", value: "Booking open" },
          ],
        },
      ]}
      whatsappText="I want to know more about South Extension Part 1 and 2 ongoing projects."
    />
  );
}
