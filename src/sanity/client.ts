import { createClient, groq } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { blogPosts as localBlogPosts, type BlogMetric, type BlogPost } from "@/app/blogs/blog-data";
import { isSanityConfigured, sanityApiVersion, sanityDataset, sanityProjectId } from "./env";

type SanityBlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  updatedDate?: string;
  readTime?: string;
  description: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  pullQuotes?: string[];
  metrics?: BlogMetric[];
  body?: PortableTextBlock[];
};

const client = createClient({
  projectId: sanityProjectId || "skyplaceholder",
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
});

const blogPostQuery = groq`
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
    "slug": slug.current,
    category,
    title,
    excerpt,
    "date": coalesce(publishedAt, _createdAt),
    "updatedDate": updatedAt,
    readTime,
    description,
    "image": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    keywords,
    pullQuotes,
    metrics[] {
      value,
      label
    },
    body
  }
`;

function formatDisplayDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function normalizeSanityPost(post: SanityBlogPost): BlogPost {
  return {
    slug: post.slug,
    category: post.category || "Market Intelligence",
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    updatedDate: post.updatedDate,
    displayDate: formatDisplayDate(post.date),
    readTime: post.readTime || "7 min read",
    description: post.description,
    image: post.image || "/assets/blogs/south-delhi-micro-market.webp",
    imageAlt: post.imageAlt || `${post.title} by Sky Skrabers`,
    imageSource: post.image ? "Sanity CMS" : "Local fallback",
    keywords: post.keywords || [],
    pullQuotes: [post.pullQuotes?.[0] || "", post.pullQuotes?.[1] || ""],
    metrics: post.metrics || [],
    sections: [],
    body: post.body || [],
  };
}

function sortBlogPostsNewestFirst(posts: BlogPost[]) {
  return [...posts].sort((left, right) => {
    const rightDate = new Date(right.date).getTime();
    const leftDate = new Date(left.date).getTime();

    return rightDate - leftDate;
  });
}

export async function getBlogPosts() {
  if (!isSanityConfigured) {
    return sortBlogPostsNewestFirst(localBlogPosts);
  }

  try {
    const sanityPosts = await client.fetch<SanityBlogPost[]>(blogPostQuery, {}, { next: { revalidate: 60 } });
    const normalizedPosts = sanityPosts.map(normalizeSanityPost);
    const sanitySlugs = new Set(normalizedPosts.map((post) => post.slug));
    const localFallbackPosts = localBlogPosts.filter((post) => !sanitySlugs.has(post.slug));

    return sortBlogPostsNewestFirst([...normalizedPosts, ...localFallbackPosts]);
  } catch (error) {
    console.warn("Sanity blog fetch failed. Falling back to local blog posts.", error);
    return sortBlogPostsNewestFirst(localBlogPosts);
  }
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export function getBlogCategories(posts: BlogPost[]) {
  return ["All", ...Array.from(new Set(posts.map((post) => post.category)))];
}
