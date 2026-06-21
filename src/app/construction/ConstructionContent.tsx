"use client";

import { RouteLoadingLink } from "@/components/RouteLoadingLink";
import { ShaderBackground } from "@/components/ui/shader-background";
import { ArrowLeftRight, Building2, CheckCircle2, Menu } from "lucide-react";
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

const transformationSlots = [
  {
    title: "Facade Transformation",
    before: "Original elevation",
    after: "Refined street presence",
  },
  {
    title: "Interior Planning",
    before: "Closed, dated rooms",
    after: "Open, functional living",
  },
  {
    title: "Builder Floor Upgrade",
    before: "Basic builder finish",
    after: "Premium material language",
  },
  {
    title: "Complete Property Renewal",
    before: "Ageing South Delhi home",
    after: "Modern residence handover",
  },
];

const milestones = [
  "Site study, structural planning, and design direction",
  "Material selection, execution scheduling, and quality checks",
  "Exterior, interior, services, and final finishing coordination",
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

function ConstructionHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <RouteLoadingLink href="/#home" pageTitle="Home" ariaLabel="Sky Skrabers home">
        <Logo />
      </RouteLoadingLink>
      <nav className={open ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        {navItems.map((item) => (
          <RouteLoadingLink
            key={item.href}
            href={item.href}
            pageTitle={getPageTitle(item.href, item.label)}
            onNavigate={() => setOpen(false)}
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

export function ConstructionContent() {
  const [revealedCards, setRevealedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (title: string) => {
    setRevealedCards((current) => ({
      ...current,
      [title]: !current[title],
    }));
  };

  return (
    <>
      <ShaderBackground className="construction-shader-background" />
      <ConstructionHeader />
      <main className="construction-page">
        <section className="construction-hero">
          <div className="construction-hero__signal" aria-hidden="true">
            <span />
            <Building2 size={24} />
            <span />
          </div>
          <p className="eyebrow">Construction</p>
          <h1>
            Building South Delhi
            <br />
            <span>With A Sharper Eye.</span>
          </h1>
          <p>
            Sky Skrabers has shaped premium homes, builder floors, and full property transformations across South Delhi,
            turning dated structures into refined spaces with stronger planning, better finishes, and a lasting sense of
            arrival.
          </p>
          <div className="construction-hero__metrics" aria-label="Construction focus areas">
            <span>Planning</span>
            <span>Execution</span>
            <span>Transformation</span>
          </div>
        </section>

        <section className="construction-story glass-card">
          <div>
            <p className="eyebrow">Over The Years</p>
            <h2>From Existing Structures To Modern Residences.</h2>
          </div>
          <p>
            Our construction work focuses on the whole journey: understanding the property, improving its structure and
            usability, refining the exterior language, and building interiors that feel considered from the first step
            inside. The spaces below are ready for before-after images as new project documentation is added.
          </p>
        </section>

        <section className="before-after-section" aria-labelledby="before-after-title">
          <div className="section-heading">
            <p className="eyebrow">Before / After</p>
            <h2 id="before-after-title">Property Transformations.</h2>
            <p className="section-copy">
              Add project images here to show how Sky Skrabers has changed the look, feel, and value of South Delhi
              properties.
            </p>
          </div>
          <div className="before-after-grid">
            {transformationSlots.map((slot) => {
              const showingAfter = Boolean(revealedCards[slot.title]);

              return (
                <button
                  className={showingAfter ? "before-after-card before-after-card--after glass-card" : "before-after-card glass-card"}
                  type="button"
                  key={slot.title}
                  onClick={() => toggleCard(slot.title)}
                  aria-pressed={showingAfter}
                >
                  <span className="before-after-card__badge">
                    <ArrowLeftRight size={15} />
                    {showingAfter ? "Click to see before" : "Click to see after"}
                  </span>
                  <div className="image-slot image-slot--interactive" aria-label={`${slot.title} ${showingAfter ? "after" : "before"} image placeholder`}>
                    <span>{showingAfter ? "After Image" : "Before Image"}</span>
                    <strong>{showingAfter ? slot.after : slot.before}</strong>
                  </div>
                  <h3>{slot.title}</h3>
                  <p>
                    {showingAfter
                      ? "After space reserved for completed construction visuals, handover polish, and finished detail shots."
                      : "Before space reserved for original property condition, raw site, and early construction references."}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="construction-process">
          <p className="eyebrow">How We Build</p>
          <h2>Measured Work. Visible Change.</h2>
          <div className="process-grid">
            {milestones.map((milestone, index) => (
            <article className="glass-card process-card" key={milestone}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <CheckCircle2 size={22} />
              <p>{milestone}</p>
            </article>
          ))}
          </div>
        </section>
      </main>
    </>
  );
}
