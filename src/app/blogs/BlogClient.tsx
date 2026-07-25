"use client";

import { WhatsAppButton } from "@/components/WhatsAppButton";
import { RouteLoadingLink } from "@/components/RouteLoadingLink";
import { SkyLogo } from "@/components/SkyLogo";
import { InstagramLink } from "@/components/InstagramLink";
import type { BlogPost } from "./blog-data";
import { ArrowUpRight, BookOpenText, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Our Projects", href: "/our-projects" },
  { label: "About Us", href: "/about-us" },
  { label: "Virtual Tours", href: "/virtual-tours" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Gallery", href: "/gallery" },
];

const getPageTitle = (href: string, label: string) => (href === "/blogs" ? "Blogs" : label);

function BlogHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <RouteLoadingLink href="/" pageTitle="Home" ariaLabel="Sky Skrabers home">
        <SkyLogo priority />
      </RouteLoadingLink>
      <nav className={open ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        {navItems.map((item) =>
          item.href === "/blogs" ? (
            <Link key={item.href} href={item.href} className="is-active" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ) : (
            <RouteLoadingLink
              key={item.href}
              href={item.href}
              pageTitle={getPageTitle(item.href, item.label)}
              onNavigate={() => setOpen(false)}
            >
              {item.label}
            </RouteLoadingLink>
          ),
        )}
      </nav>
      <button className="menu-button" aria-label="Open navigation" onClick={() => setOpen((value) => !value)}>
        <Menu size={22} />
      </button>
    </header>
  );
}

function BlogFooter() {
  return (
    <footer className="footer">
      <SkyLogo />
      <nav>
        {navItems.map((item) =>
          item.href === "/blogs" ? (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ) : (
            <RouteLoadingLink key={item.href} href={item.href} pageTitle={getPageTitle(item.href, item.label)}>
              {item.label}
            </RouteLoadingLink>
          ),
        )}
      </nav>
      <nav className="footer-legal" aria-label="Legal links">
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms-and-conditions">Terms & Conditions</Link>
      </nav>
      <nav className="footer-legal" aria-label="Social links">
        <InstagramLink>Instagram</InstagramLink>
      </nav>
      <p>Built Spaces. Real Legacies.</p>
      <small>© 2026 Sky Skrabers. All rights reserved.</small>
    </footer>
  );
}

export function BlogShell({ children }: { children: ReactNode }) {
  return (
    <>
      <BlogHeader />
      {children}
      <WhatsAppButton />
      <BlogFooter />
    </>
  );
}

export function BlogsIndex({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const visiblePosts =
    activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory);

  return (
    <main className="blog-page">
      <section className="blog-journal-hero" aria-labelledby="blog-title">
        <p className="eyebrow">Sky Skrabers Journal</p>
        <h1 id="blog-title">
          South Delhi
          <br />
          <span>Property Notes.</span>
        </h1>
        <p>
          Developer-led writing on builder floors, construction quality, joint development, resale decisions,
          interiors, RERA and the small South Delhi market signals that usually decide the real money.
        </p>
        <div className="blog-journal-hero__meta" aria-label="Journal focus">
          <span>
            <BookOpenText size={18} />
            8 field notes
          </span>
          <span>Builder floors</span>
          <span>Owner strategy</span>
        </div>
      </section>

      <section className="blogs blogs--page" id="articles" aria-label="Blog articles">
        <div className="blog-filter-bar" aria-label="Blog categories">
          {categories.map((category) => (
            <button
              className={category === activeCategory ? "is-active" : ""}
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="blog-grid blog-grid--page">
          {visiblePosts.map((post, index) => (
            <Link
              className={index === 0 && activeCategory === "All" ? "blog-card blog-card--featured glass-card" : "blog-card glass-card"}
              href={`/blogs/${post.slug}`}
              key={post.slug}
              aria-label={`Read ${post.title}`}
            >
              <div className="blog-card__image">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  priority={index === 0 && activeCategory === "All"}
                  sizes={index === 0 && activeCategory === "All" ? "(max-width: 980px) 100vw, 66vw" : "(max-width: 980px) 100vw, 33vw"}
                />
              </div>
              <span>{post.category}</span>
              {index === 0 && activeCategory === "All" ? <h2>{post.title}</h2> : <h3>{post.title}</h3>}
              <p>{post.excerpt}</p>
              <div className="blog-card__footer">
                <small>
                  {post.displayDate} · {post.readTime}
                </small>
                <ArrowUpRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
