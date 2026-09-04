import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/business";
import { getBlogPosts } from "@/sanity/client";
import { completedProjects } from "./completed-projects/completed-project-data";

export const revalidate = 60;

const staticRoutes = [
  "",
  "/our-projects",
  "/ongoing-projects",
  "/residential-projects",
  "/commercial-projects",
  "/e-visiting-card",
  "/buy-new-home",
  "/about-us",
  "/contact-us",
  "/construction",
  "/sell-property",
  "/collaboration",
  "/virtual-tours",
  "/gallery",
  "/blogs",
  "/privacy-policy",
  "/terms-and-conditions",
  "/projects/lajpat-nagar-1-2",
  "/projects/lajpat-nagar-3-4",
  "/projects/south-extension-1-2",
  "/projects/east-of-kailash",
  "/projects/defence-colony",
  "/projects/hauz-khas",
  "/projects/kalkaji",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();
  const staticPages = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
  })) satisfies MetadataRoute.Sitemap;

  const blogPages = blogPosts.map((post) => ({
    url: `${siteUrl}/blogs/${post.slug}`,
    lastModified: post.date,
  })) satisfies MetadataRoute.Sitemap;

  const completedProjectPages = completedProjects.map((project) => ({
    url: `${siteUrl}/completed-projects/${project.slug}`,
  })) satisfies MetadataRoute.Sitemap;

  return [...staticPages, ...blogPages, ...completedProjectPages];
}
