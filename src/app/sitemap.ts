import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/business";
import { blogPosts } from "./blogs/blog-data";

const staticRoutes = [
  "",
  "/#about-us",
  "/#our-projects",
  "/#ongoing-projects",
  "/#contact-us",
  "/construction",
  "/sell-property",
  "/virtual-tours",
  "/blogs",
  "/privacy-policy",
  "/terms-and-conditions",
  "/projects/lajpat-nagar-1-2",
  "/projects/lajpat-nagar-3-4",
  "/projects/south-extension-1-2",
  "/projects/east-of-kailash",
  "/projects/defence-colony",
  "/projects/hauz-khas",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.72,
  })) satisfies MetadataRoute.Sitemap;

  const blogPages = blogPosts.map((post) => ({
    url: `${siteUrl}/blogs/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.64,
  })) satisfies MetadataRoute.Sitemap;

  return [...staticPages, ...blogPages];
}
