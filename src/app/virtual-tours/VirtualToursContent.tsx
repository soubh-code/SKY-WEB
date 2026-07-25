"use client";

import { RouteLoadingLink } from "@/components/RouteLoadingLink";
import { SkyLogo } from "@/components/SkyLogo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ShaderBackground } from "@/components/ui/shader-background";
import { Menu, Sparkles } from "lucide-react";
import Image from "next/image";
import { type MouseEvent, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Our Projects", href: "/our-projects" },
  { label: "About Us", href: "/about-us" },
  { label: "Virtual Tours", href: "/virtual-tours" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Gallery", href: "/gallery" },
];

const getPageTitle = (href: string, label: string) => {
  if (href === "/blogs") return "Blogs";
  if (href === "/virtual-tours") return "Virtual Tours";
  return label;
};

const tours = [
  [
    "Lajpat Nagar Residence",
    "Private 360 walkthrough",
    "/assets/card-images/card-01.avif",
    "Luxury builder floor in Lajpat Nagar South Delhi by Sky Skrabers",
  ],
  [
    "Greater Kailash Villa",
    "Cinematic room preview",
    "/assets/card-images/card-04.avif",
    "Luxury residential facade in Greater Kailash South Delhi by Sky Skrabers",
  ],
  [
    "South Extension Floor",
    "Immersive residence scan",
    "/assets/card-images/card-05.jpg",
    "Premium builder floor in South Extension South Delhi by Sky Skrabers",
  ],
] as const;

function VirtualToursHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <RouteLoadingLink href="/" pageTitle="Home" ariaLabel="Sky Skrabers home">
        <SkyLogo priority />
      </RouteLoadingLink>
      <nav className={open ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        {navItems.map((item) => (
          <RouteLoadingLink
            key={item.href}
            href={item.href}
            pageTitle={getPageTitle(item.href, item.label)}
            onNavigate={() => setOpen(false)}
            className={item.href === "/virtual-tours" ? "is-active" : undefined}
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

export function VirtualToursContent() {
  const tourFrameRef = useRef<number | null>(null);
  const tourPointerRef = useRef<{
    card: HTMLElement;
    rotateX: number;
    rotateY: number;
  } | null>(null);

  const handleTourCardMove = (event: MouseEvent<HTMLElement>) => {
    if (!window.matchMedia("(hover: hover) and (min-width: 821px)").matches) {
      return;
    }

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -7;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 7;

    tourPointerRef.current = { card, rotateX, rotateY };
    if (tourFrameRef.current !== null) return;

    tourFrameRef.current = window.requestAnimationFrame(() => {
      tourFrameRef.current = null;
      const next = tourPointerRef.current;
      if (!next) return;

      next.card.style.setProperty("--tour-rotate-x", `${next.rotateX.toFixed(2)}deg`);
      next.card.style.setProperty("--tour-rotate-y", `${next.rotateY.toFixed(2)}deg`);
    });
  };

  const handleTourCardLeave = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    tourPointerRef.current = null;
    window.requestAnimationFrame(() => {
      card.style.setProperty("--tour-rotate-x", "0deg");
      card.style.setProperty("--tour-rotate-y", "0deg");
    });
  };

  return (
    <>
      <ShaderBackground className="construction-shader-background" />
      <VirtualToursHeader />
      <main className="construction-page virtual-tours-page">
        <section id="virtual-tours" className="tour reveal-section">
          <div className="section-heading">
            <p className="eyebrow">Virtual Tours</p>
            <h1>Explore Before You Arrive.</h1>
          </div>
          <div className="tour-card-grid">
            {tours.map(([title, description, image, imageAlt]) => (
              <button
                className="tour-card"
                key={title}
                type="button"
                onMouseMove={handleTourCardMove}
                onMouseLeave={handleTourCardLeave}
                aria-label={`${title}: ${description}`}
                data-analytics-event="property_card_click"
                data-analytics-label={`${title} virtual tour card`}
              >
                <Image src={image} alt={imageAlt} fill sizes="(max-width: 820px) 100vw, 33vw" />
                <span className="tour-card__button">
                  <span>
                    <span className="tour-card__title">{title}</span>
                    <small>{description}</small>
                    <span className="tour-card__status">Coming Soon</span>
                  </span>
                  <Sparkles aria-hidden="true" size={18} />
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
      <WhatsAppButton />
    </>
  );
}
