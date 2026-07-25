import type { Metadata } from "next";
import { HomePage } from "../page";

export const metadata: Metadata = {
  title: "Buy New Home",
  description:
    "Browse premium homes available from Sky Skrabers across sought-after South Delhi locations.",
  alternates: {
    canonical: "/buy-new-home",
  },
};

export default function BuyNewHomePage() {
  return <HomePage initialSection="ongoing-projects" />;
}
