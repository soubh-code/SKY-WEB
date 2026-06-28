import type { Metadata } from "next";
import { BlogShell, BlogsIndex } from "./BlogClient";
import { blogCategories, blogPosts } from "./blog-data";

export const metadata: Metadata = {
  title: "Sky Skrabers Blog | South Delhi Real Estate Journal",
  description:
    "Sky Skrabers blog on South Delhi real estate, builder floors, construction, RERA, interiors, selling strategy, market trends, and legal clarity for owners.",
};

export default function BlogsPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Sky Skrabers Blog",
    description:
      "Developer-led notes on South Delhi real estate, construction quality, joint development, interiors, RERA and market trends.",
    publisher: {
      "@type": "Organization",
      name: "Sky Skrabers",
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
      url: `/blogs/${post.slug}`,
    })),
  };

  return (
    <BlogShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <BlogsIndex posts={blogPosts} categories={blogCategories} />
    </BlogShell>
  );
}
