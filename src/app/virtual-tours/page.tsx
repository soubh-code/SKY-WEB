import type { Metadata } from "next";
import { VirtualToursContent } from "./VirtualToursContent";

export const metadata: Metadata = {
  title: "Virtual Tours",
  description: "Explore Sky Skrabers virtual tour previews for premium South Delhi residences.",
};

export default function VirtualToursPage() {
  return <VirtualToursContent />;
}
