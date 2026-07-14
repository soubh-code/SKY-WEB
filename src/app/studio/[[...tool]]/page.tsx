import type { Metadata } from "next";
import { StudioPage } from "./StudioPage";

export const metadata: Metadata = {
  title: "Sky Skrabers CMS",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioRoute() {
  return <StudioPage />;
}
