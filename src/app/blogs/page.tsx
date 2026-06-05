"use client";

import { Menu, Sparkles } from "lucide-react";
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
      <Link href="/#home" aria-label="Sky Skrabers home">
        <Logo />
      </Link>
      <nav className={open ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={item.href === "/blogs" ? "is-active" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
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
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <p>Built Spaces. Real Legacies.</p>
      <small>© 2026 Sky Skrabers. All rights reserved.</small>
    </footer>
  );
}

export default function BlogsPage() {
  return (
    <>
      <BlogHeader />
      <main className="blog-page">
        <section className="blogs blogs--page">
          <div className="section-heading">
            <p className="eyebrow">Insights</p>
            <h1>
              Measured Thought.
              <br />
              <span>Refined Living.</span>
            </h1>
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
      <Link className="floating-contact" href="/#contact-us" aria-label="Contact Sky Skrabers">
        <Sparkles size={18} />
      </Link>
      <BlogFooter />
    </>
  );
}
