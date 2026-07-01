import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sky Skrabers",
    short_name: "Sky Skrabers",
    description: "Premium South Delhi real estate, construction, collaborations, and ongoing projects.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050b14",
    theme_color: "#050b14",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
