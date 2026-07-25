import type { Metadata } from "next";
import { HomePage } from "../page";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Sky Skrabers in Lajpat Nagar, New Delhi for property enquiries, development, buying, selling, and collaboration.",
  alternates: {
    canonical: "/contact-us",
  },
};

export default function ContactUsPage() {
  return <HomePage initialSection="contact-us" />;
}
