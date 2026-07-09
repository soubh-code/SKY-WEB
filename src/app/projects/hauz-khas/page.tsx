import { ProjectDetailPage } from "@/app/projects/_components/ProjectDetailPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hauz Khas Project",
  description: "Explore the Hauz Khas ongoing residence by Sky Skrabers in South Delhi.",
  alternates: {
    canonical: "/projects/hauz-khas",
  },
  openGraph: {
    title: "Hauz Khas Project | Sky Skrabers",
    description: "Explore the Hauz Khas ongoing project by Sky Skrabers.",
    url: "/projects/hauz-khas",
    siteName: "Sky Skrabers",
    type: "website",
  },
};

export default function HauzKhasProjectPage() {
  return (
    <ProjectDetailPage
      titleLines={["HAUZ", "KHAS"]}
      projectName="Hauz Khas"
      addressLabel="Hauz Khas"
      addresses={[
        {
          title: "B1-3, Hauz Khas.",
          details: [
            { label: "Area", value: "300 sqyrd" },
            { label: "Availability", value: "Ground floor & 1st floor" },
            { label: "Status", value: "Booking open" },
          ],
        },
      ]}
      whatsappText="I want to know more about HAUZKHAS ongoing projects."
    />
  );
}
