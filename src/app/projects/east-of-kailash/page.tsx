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
      addresses={[{ title: "G-52 East Of Kailash." }, { title: "no.-1,Sant nagar, East of Kailash" }]}
      whatsappText="Hello Sky Skrabers, I want details for the East Of Kailash project."
    />
  );
}
