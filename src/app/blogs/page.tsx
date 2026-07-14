import type { Metadata } from "next";
import { siteUrl } from "@/lib/business";
import { getBlogCategories, getBlogPosts } from "@/sanity/client";
import { BlogShell, BlogsIndex } from "./BlogClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "South Delhi Real Estate Journal",
  description:
    "Sky Skrabers blog on South Delhi real estate, builder floors, construction, RERA, interiors, selling strategy, market trends, and legal clarity for owners.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Sky Skrabers Blog | South Delhi Real Estate Journal",
    description:
      "Developer-led notes on South Delhi real estate, construction quality, joint development, interiors, RERA and market trends.",
    url: "/blogs",
    siteName: "Sky Skrabers",
    type: "website",
  },
};

export default async function BlogsPage() {
  const blogPosts = await getBlogPosts();
  const blogCategories = getBlogCategories(blogPosts);
  const blogSchema = {
    "@context": "https://schema.org",
      "@type": "Blog",
    "@id": `${siteUrl}/blogs#blog`,
    name: "Sky Skrabers Blog",
    url: `${siteUrl}/blogs`,
    description:
      "Developer-led notes on South Delhi real estate, construction quality, joint development, interiors, RERA and market trends.",
    publisher: {
      "@type": "Organization",
      name: "Sky Skrabers",
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updatedDate ?? post.date,
      image: `${siteUrl}${post.image}`,
      author: {
        "@type": "Organization",
        name: "Sky Skrabers",
      },
      url: `${siteUrl}/blogs/${post.slug}`,
    })),
  };

  return (
    <BlogShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <BlogsIndex posts={blogPosts} categories={blogCategories} />
    </BlogShell>
  );
}
