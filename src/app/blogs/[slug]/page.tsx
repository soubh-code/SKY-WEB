import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RouteLoadingLink } from "@/components/RouteLoadingLink";
import { siteUrl } from "@/lib/business";
import { BlogShell } from "../BlogClient";
import { blogPosts, getBlogPost } from "../blog-data";

type BlogArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Sky Skrabers`,
      description: post.description,
      url: `/blogs/${post.slug}`,
      siteName: "Sky Skrabers",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedDate ?? post.date,
      authors: ["Sky Skrabers"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Sky Skrabers`,
      description: post.description,
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteUrl}/blogs/${post.slug}#article`,
    mainEntityOfPage: `${siteUrl}/blogs/${post.slug}`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedDate ?? post.date,
    author: {
      "@type": "Organization",
      name: "Sky Skrabers",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Sky Skrabers",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/brand-logo-white.png`,
      },
    },
    keywords: post.keywords.join(", "),
    url: `${siteUrl}/blogs/${post.slug}`,
  };

  return (
    <BlogShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="blog-page blog-article-page">
        <article className="blog-article" itemScope itemType="https://schema.org/BlogPosting">
          <RouteLoadingLink className="blog-article__back" href="/#home" pageTitle="Home">
            Back to home
          </RouteLoadingLink>
          <header className="blog-article__header">
            <p className="eyebrow">{post.category}</p>
            <h1 itemProp="headline">{post.title}</h1>
            <div className="blog-article__meta">
              <time itemProp="datePublished" dateTime={post.date}>
                {post.displayDate}
              </time>
              <span>{post.readTime}</span>
              <span itemProp="author">Sky Skrabers</span>
            </div>
          </header>

          <div className="blog-article__placeholder blog-article__placeholder--hero" aria-hidden="true">
            <span>Sky Skrabers Journal</span>
          </div>

          <div className="blog-article__body" itemProp="articleBody">
            {post.sections.map((section, index) => (
              <section key={section.heading}>
                {index === 1 ? <blockquote>{post.pullQuotes[0]}</blockquote> : null}
                {index === 2 ? (
                  <>
                    <div className="blog-article__metrics" aria-label="Article highlights">
                      {post.metrics.map((metric) => (
                        <div key={metric.value}>
                          <strong>{metric.value}</strong>
                          <span>{metric.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="blog-article__placeholder blog-article__placeholder--inline" aria-hidden="true">
                      <span>Field Notes</span>
                    </div>
                  </>
                ) : null}
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {index === 2 ? <blockquote>{post.pullQuotes[1]}</blockquote> : null}
              </section>
            ))}
          </div>
        </article>
      </main>
    </BlogShell>
  );
}
