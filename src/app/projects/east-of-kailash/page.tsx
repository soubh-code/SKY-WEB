import { ProjectDetailPage } from "@/app/projects/_components/ProjectDetailPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "East Of Kailash Project | Sky Skrabers",
  description: "Explore the East Of Kailash ongoing residences by Sky Skrabers in South Delhi.",
  alternates: {
    canonical: "/projects/east-of-kailash",
  },
  openGraph: {
    title: "East Of Kailash Project | Sky Skrabers",
    description: "Explore the East Of Kailash ongoing project by Sky Skrabers.",
    url: "/projects/east-of-kailash",
    siteName: "Sky Skrabers",
    type: "website",
  },
};

export default function EastOfKailashProjectPage() {
  return (
    <ProjectDetailPage
      titleLines={["EAST OF", "KAILASH"]}
      projectName="East Of Kailash"
      addressLabel="East Of Kailash"
      addresses={[
        {
          title: "G-52 East Of Kailash.",
          details: [
            { label: "Area", value: "800 sqyrd" },
            { label: "Units", value: "2 units, 400 yards each" },
            { label: "Config", value: "5BHK" },
            { label: "Completion", value: "By the end of Jul-26" },
          ],
        },
        {
          title: "no.-1,Sant nagar, East of Kailash",
          details: [
            { label: "Area", value: "200 sqmt" },
            { label: "Opening", value: "Corner 3 side open" },
            { label: "Structure", value: "4 Floors + Basement, Stilt Parking" },
            { label: "Config", value: "3BHK" },
            { label: "Completion", value: "By the end of Oct-26" },
          ],
        },
      ]}
      whatsappText="I want to know more about East Of Kailash ongoing projects."
    />
  );
}
