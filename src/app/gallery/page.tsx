import type { Metadata } from "next";
import { GalleryContent } from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore Sky Skrabers project visuals, South Delhi residential facades, interiors, and premium property transformation moments.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery | Sky Skrabers",
    description:
      "A moving visual gallery of Sky Skrabers project imagery across South Delhi residences and property transformations.",
    url: "/gallery",
    siteName: "Sky Skrabers",
    type: "website",
  },
};

export default function GalleryPage() {
  return <GalleryContent />;
}
