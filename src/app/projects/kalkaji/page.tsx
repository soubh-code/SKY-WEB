import { ProjectDetailPage } from "@/app/projects/_components/ProjectDetailPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkaji Project",
  description: "Explore the Kalkaji ongoing residence by Sky Skrabers in South Delhi.",
  alternates: {
    canonical: "/projects/kalkaji",
  },
  openGraph: {
    title: "Kalkaji Project | Sky Skrabers",
    description: "Explore the Kalkaji ongoing project by Sky Skrabers.",
    url: "/projects/kalkaji",
    siteName: "Sky Skrabers",
    type: "website",
  },
};

export default function KalkajiProjectPage() {
  return (
    <ProjectDetailPage
      titleLines={["KALKAJI"]}
      projectName="Kalkaji"
      addressLabel="Kalkaji"
      addresses={[
        {
          title: "B-71, Kalkaji",
          details: [
            { label: "Area", value: "300 sqyrd" },
            { label: "Opening", value: "Corner property" },
            { label: "Availability", value: "Ground floor & 3rd floor with terrace" },
            { label: "Status", value: "Booking open" },
          ],
        },
        {
          title: "A8/119, Kalkaji Extension",
          details: [
            { label: "Area", value: "192 sqyrd" },
            { label: "Config", value: "3BHK" },
            { label: "Availability", value: "1st & 3rd floor with terrace" },
            { label: "Status", value: "Booking open" },
          ],
        },
        {
          title: "C-100/A, Kalkaji",
          details: [
            { label: "Area", value: "100 sqyrd" },
            { label: "Special", value: "Free hold property" },
            { label: "Availability", value: "1st & 3rd floor" },
            { label: "Status", value: "Booking open" },
          ],
        },
      ]}
      whatsappText="I want to know more about Kalkaji ongoing projects."
    />
  );
}
