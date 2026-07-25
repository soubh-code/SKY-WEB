import type { Metadata } from "next";
import { HomePage } from "../page";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Sky Skrabers, a South Delhi real estate enterprise creating enduring residential spaces since 2011.",
  alternates: {
    canonical: "/about-us",
  },
};

export default function AboutUsPage() {
  return <HomePage initialSection="about-us" />;
}
