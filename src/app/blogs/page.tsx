"use client";

import { WhatsAppButton } from "@/components/WhatsAppButton";
import { RouteLoadingLink } from "@/components/RouteLoadingLink";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { BookOpenText, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Our Projects", href: "/#our-projects" },
  { label: "About Us", href: "/#about-us" },
  { label: "Virtual Tours", href: "/#virtual-tours" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/#contact-us" },
];

const getPageTitle = (href: string, label: string) => (href === "/blogs" ? "Blogs" : label);

const posts = [
  {
    category: "Architecture",
    title: "The Quiet Details That Make a Luxury Floor Feel Expensive",
    image: "/assets/card-images/card-04.avif",
  },
  {
    category: "Real Estate",
    title: "Why South Delhi Builder Floors Continue to Hold Premium Value",
    image: "/assets/card-images/card-05.jpg",
  },
  {
    category: "Luxury Living",
    title: "Designing Homes Around Arrival, Privacy, and Light",
    image: "/assets/card-images/card-06.jpg",
  },
  {
    category: "Construction",
    title: "How Material Choices Shape a Home's Long-Term Character",
    image: "/assets/card-images/card-01.avif",
  },
  {
    category: "Interiors",
    title: "Balancing Privacy, Openness, and Everyday Comfort",
    image: "/assets/card-images/card-02.avif",
  },
  {
    category: "Investment",
    title: "What Buyers Notice First in a Premium Builder Floor",
    image: "/assets/card-images/card-03.avif",
  },
];

function Logo() {
  return (
    <div className="brand-logo">
      <span className="logo-mark" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="logo-line" />
      <span className="logo-text">Sky Skrabers</span>
    </div>
  );
}

function BlogHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <RouteLoadingLink href="/#home" pageTitle="Home" ariaLabel="Sky Skrabers home">
        <Logo />
      </RouteLoadingLink>
      <nav className={open ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        {navItems.map((item) =>
          item.href === "/blogs" ? (
            <Link
              key={item.href}
              href={item.href}
              className="is-active"
              onClick={() => setOpen(false)}
            >
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
      <Logo />
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
      <p>Built Spaces. Real Legacies.</p>
      <small>© 2026 Sky Skrabers. All rights reserved.</small>
    </footer>
  );
}

function BlogJournalIntro() {
  const featuredPosts = posts.slice(0, 3);

  return (
    <section className="blog-gateway blog-gateway--page" aria-label="Sky Skrabers journal overview">
      <ContainerScroll
        titleComponent={
          <div className="blog-gateway__heading">
            <p className="eyebrow">Sky Skrabers Journal</p>
            <h1>
              Ideas Behind
              <br />
              <span>Refined Living.</span>
            </h1>
          </div>
        }
      >
        <div className="blog-gateway__panel">
          <div className="blog-gateway__copy">
            <BookOpenText size={34} />
            <p>
              Notes on construction quality, premium property decisions, and homes designed around privacy, arrival,
              light, and long-term value.
            </p>
            <div className="blog-gateway__meta" aria-label="Journal themes">
              <span>Architecture</span>
              <span>Real Estate</span>
              <span>Luxury Living</span>
            </div>
          </div>
          <div className="blog-gateway__cards" aria-hidden="true">
            {featuredPosts.map((post) => (
              <article className="blog-gateway__card" key={post.title}>
                <Image src={post.image} alt="" fill sizes="(max-width: 820px) 42vw, 18vw" />
                <span />
                <div>
                  <small>{post.category}</small>
                  <strong>{post.title}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}

export default function BlogsPage() {
  return (
    <>
      <BlogHeader />
      <main className="blog-page">
        <BlogJournalIntro />
        <section className="blogs blogs--page">
          <div className="section-heading">
            <p className="eyebrow">Insights</p>
            <h2>
              Latest Notes.
              <br />
              <span>Built For Better Decisions.</span>
            </h2>
            <p className="section-copy">
              Notes on construction quality, premium property decisions, and homes designed for a lasting impression.
            </p>
          </div>
          <div className="blog-grid blog-grid--page">
            {posts.map((post) => (
              <article className="blog-card glass-card" key={post.title}>
                <div className="blog-card__image">
                  <Image src={post.image} alt="" fill sizes="(max-width: 820px) 100vw, 33vw" />
                </div>
                <span>{post.category}</span>
                <h3>{post.title}</h3>
                <p>Practical perspective for buyers, sellers, and homeowners shaping a more considered way to live.</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <WhatsAppButton />
      <BlogFooter />
    </>
  );
}
