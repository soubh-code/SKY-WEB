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
          title: "217, Vinoba Puri",
          details: [
            { label: "Area", value: "400 sqyrd" },
            { label: "Units", value: "Dual unit, right & left" },
            { label: "Special", value: "Park facing property" },
            { label: "Availability", value: "All floors available" },
            { label: "Status", value: "Booking open" },
          ],
        },
        {
          title: "B-45/A, Lajpat Nagar-2",
          details: [
            { label: "Area", value: "135 sqyrd" },
            { label: "Config", value: "3BHK" },
            { label: "Availability", value: "1st floor, 2nd floor, bacha flat 1BHK" },
            { label: "Status", value: "Possession soon" },
          ],
        },
        {
          title: "B-58, Lajpat Nagar-1",
          details: [
            { label: "Area", value: "100 sqyrd" },
            { label: "Config", value: "2BHK" },
            { label: "Special", value: "Park facing, 1 car parking" },
            { label: "Availability", value: "3rd floor with terrace room" },
            { label: "Status", value: "Possession soon" },
          ],
        },
        {
          title: "A-217, Lajpat Nagar-1",
          details: [
            { label: "Area", value: "100 sqyrd" },
            { label: "Availability", value: "3rd floor with 1 room set on terrace" },
            { label: "Status", value: "Booking open" },
          ],
        },
        {
          title: "E-102, Lajpat Nagar-1",
          details: [
            { label: "Area", value: "100 sqyrd" },
            { label: "Availability", value: "1st & 2nd floor" },
            { label: "Status", value: "Booking open" },
          ],
        },
        {
          title: "A-160, Dayanand Colony, Lajpat Nagar-4",
          details: [
            { label: "Area", value: "100 sqyrd" },
            { label: "Config", value: "2BHK" },
            { label: "Availability", value: "All floors available" },
            { label: "Status", value: "Booking open" },
          ],
        },
        {
          title: "A-108, Dayanand Colony, Lajpat Nagar-4",
          details: [
            { label: "Area", value: "100 sqyrd" },
            { label: "Special", value: "Park facing" },
            { label: "Availability", value: "Ground, 1st & 2nd floor" },
            { label: "Status", value: "Booking open" },
          ],
        },
        {
          title: "A-149, Dayanand Colony, Lajpat Nagar-4",
          details: [
            { label: "Area", value: "100 sqyrd" },
            { label: "Availability", value: "3rd floor with 1 room set on terrace" },
            { label: "Status", value: "Booking open" },
          ],
        },
        {
          title: "C-80, Dayanand Colony, Lajpat Nagar-4",
          details: [
            { label: "Area", value: "100 sqyrd" },
            { label: "Special", value: "Park facing" },
            { label: "Availability", value: "3rd floor with 1 room set on terrace" },
            { label: "Status", value: "Booking open" },
          ],
        },
      ]}
      whatsappText="I want to know more about Lajpat Nagar 1, 2 and 4 ongoing projects."
    />
  );
}
