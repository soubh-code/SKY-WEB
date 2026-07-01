import { ProjectDetailPage } from "@/app/projects/_components/ProjectDetailPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Defence Colony Project | Sky Skrabers",
  description: "Explore the Defence Colony ongoing residence by Sky Skrabers in South Delhi.",
  alternates: {
    canonical: "/projects/defence-colony",
  },
  openGraph: {
    title: "Defence Colony Project | Sky Skrabers",
    description: "Explore the Defence Colony ongoing project by Sky Skrabers.",
    url: "/projects/defence-colony",
    siteName: "Sky Skrabers",
    type: "website",
  },
};

export default function DefenceColonyProjectPage() {
  return (
    <ProjectDetailPage
      titleLines={["DEFENCE", "COLONY"]}
      projectName="Defence Colony"
      addressLabel="Defence Colony"
      addresses={[
        {
          title: "23, Defence Colony",
          details: [
            { label: "Area", value: "225 sqyrd" },
            { label: "Opening", value: "Corner 3 side open" },
            { label: "Structure", value: "4 Floors + Basement, Stilt Parking" },
            { label: "Config", value: "3BHK" },
            { label: "Completion", value: "By the end of Mar-27" },
          ],
        },
      ]}
      whatsappText="I want to know more about Defence Colony ongoing projects."
    />
  );
}
