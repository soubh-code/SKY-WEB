import { ProjectDetailPage } from "@/app/projects/_components/ProjectDetailPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "East Of Kailash Project",
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
          title: "1, Sant Nagar, East of Kailash",
          details: [
            { label: "Area", value: "240 sqyrd" },
            { label: "Opening", value: "Corner property" },
            { label: "Availability", value: "Ground floor & 3rd floor with terrace" },
            { label: "Status", value: "Booking open" },
          ],
        },
        {
          title: "109, Sant Nagar, East of Kailash",
          details: [
            { label: "Area", value: "133 sqyrd" },
            { label: "Config", value: "3BHK" },
            { label: "Availability", value: "3rd floor available" },
            { label: "Special", value: "1 car parking" },
            { label: "Status", value: "Possession soon" },
          ],
        },
      ]}
      whatsappText="I want to know more about East Of Kailash ongoing projects."
    />
  );
}
