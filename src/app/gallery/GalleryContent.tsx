"use client";

import { RouteLoadingLink } from "@/components/RouteLoadingLink";
import { SkyLogo } from "@/components/SkyLogo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ShaderBackground } from "@/components/ui/shader-background";
import { Camera, Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Our Projects", href: "/#our-projects" },
  { label: "About Us", href: "/#about-us" },
  { label: "Virtual Tours", href: "/virtual-tours" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/#contact-us" },
  { label: "Gallery", href: "/gallery" },
];

const getPageTitle = (href: string, label: string) => {
  if (href === "/blogs") return "Blogs";
  if (href === "/virtual-tours") return "Virtual Tours";
  if (href === "/gallery") return "Gallery";
  return label;
};

const galleryItems = [
  {
    src: "/assets/gallery/sky-gallery-01.webp",
    title: "Sky Skrabers gallery image 1",
    alt: "Sky Skrabers South Delhi residence interior gallery image",
  },
  {
    src: "/assets/gallery/sky-gallery-02.webp",
    title: "Sky Skrabers gallery image 2",
    alt: "Modern modular kitchen in a South Delhi residence by Sky Skrabers",
  },
  {
    src: "/assets/gallery/sky-gallery-03.webp",
    title: "Sky Skrabers gallery image 3",
    alt: "Premium white kitchen and hallway detail by Sky Skrabers",
  },
  {
    src: "/assets/gallery/sky-gallery-05.webp",
    title: "Sky Skrabers gallery image 5",
    alt: "Refined bedroom wall paneling in a Sky Skrabers residential project",
  },
  {
    src: "/assets/gallery/sky-gallery-06.webp",
    title: "Sky Skrabers gallery image 6",
    alt: "Elegant South Delhi living area with marble flooring by Sky Skrabers",
  },
  {
    src: "/assets/gallery/sky-gallery-07.webp",
    title: "Sky Skrabers gallery image 7",
    alt: "Premium entrance and window detailing in a Sky Skrabers home",
  },
  {
    src: "/assets/gallery/sky-gallery-08.webp",
    title: "Sky Skrabers gallery image 8",
    alt: "South Delhi residence interior passage with warm wall lighting by Sky Skrabers",
  },
  {
    src: "/assets/gallery/sky-gallery-09.webp",
    title: "Sky Skrabers gallery image 9",
    alt: "Modern kitchen and corridor design in a Sky Skrabers residence",
  },
  {
    src: "/assets/gallery/sky-gallery-10.webp",
    title: "Sky Skrabers gallery image 10",
    alt: "Luxury kitchen and foyer detail by Sky Skrabers in South Delhi",
  },
  {
    src: "/assets/gallery/sky-gallery-11.webp",
    title: "Sky Skrabers gallery image 11",
    alt: "Premium white modular kitchen by Sky Skrabers",
  },
  {
    src: "/assets/gallery/sky-gallery-14.webp",
    title: "Sky Skrabers gallery image 14",
    alt: "Bright bedroom interior with white wall paneling by Sky Skrabers",
  },
  {
    src: "/assets/gallery/sky-gallery-20.webp",
    title: "Sky Skrabers gallery image 20",
    alt: "Elegant bedroom and media wall design by Sky Skrabers",
  },
  {
    src: "/assets/gallery/sky-gallery-21.webp",
    title: "Sky Skrabers gallery image 21",
    alt: "Bright South Delhi kitchen and living space by Sky Skrabers",
  },
  {
    src: "/assets/gallery/sky-gallery-22.webp",
    title: "Sky Skrabers gallery image 22",
    alt: "Luxury bedroom interior by Sky Skrabers",
  },
] as const;

const topRow = galleryItems.slice(0, 7);
const bottomRow = galleryItems.slice(7);

function GalleryHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <RouteLoadingLink href="/#home" pageTitle="Home" ariaLabel="Sky Skrabers home">
        <SkyLogo priority />
      </RouteLoadingLink>
      <nav className={open ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        {navItems.map((item) => (
          <RouteLoadingLink
            key={item.href}
            href={item.href}
            pageTitle={getPageTitle(item.href, item.label)}
            onNavigate={() => setOpen(false)}
            className={item.href === "/gallery" ? "is-active" : undefined}
          >
            {item.label}
          </RouteLoadingLink>
        ))}
      </nav>
      <button className="menu-button" aria-label="Open navigation" onClick={() => setOpen((value) => !value)}>
        <Menu size={22} />
      </button>
    </header>
  );
}

function GalleryRail({ items, reverse = false }: { items: typeof topRow; reverse?: boolean }) {
  const doubledItems = [...items, ...items];

  return (
    <div className={reverse ? "gallery-rail gallery-rail--reverse" : "gallery-rail"} aria-hidden="true">
      <div className="gallery-rail__track">
        {doubledItems.map((item, index) => (
          <article className="gallery-frame" key={`${item.title}-${index}`}>
            <Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 76vw, 34vw" />
          </article>
        ))}
      </div>
    </div>
  );
}

export function GalleryContent() {
  return (
    <>
      <ShaderBackground className="construction-shader-background" />
      <GalleryHeader />
      <main className="gallery-page">
        <section className="gallery-hero" aria-labelledby="gallery-title">
          <div className="construction-hero__signal" aria-hidden="true">
            <span />
            <Camera size={24} />
            <span />
          </div>
          <p className="eyebrow">Gallery</p>
          <h1 id="gallery-title">
            The <span>SKY SKRABERS</span>
            <br />
            {" "}Touch
          </h1>
        </section>

        <section className="gallery-marquee" aria-label="Sky Skrabers visual gallery">
          <GalleryRail items={topRow} />
          <GalleryRail items={bottomRow} reverse />
        </section>
      </main>
      <WhatsAppButton />
    </>
  );
}
