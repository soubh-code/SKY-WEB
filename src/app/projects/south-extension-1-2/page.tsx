import { ProjectDetailPage } from "@/app/projects/_components/ProjectDetailPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "South Extension Part 1/2 Project | Sky Skrabers",
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
      addresses={[{ title: "G-16, South Extension, Part-2." }]}
      whatsappText="Hello Sky Skrabers, I want details for the South Extension Part 1/2 project."
    />
  );
}
