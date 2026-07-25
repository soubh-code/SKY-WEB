"use client";

import { RouteLoadingLink } from "@/components/RouteLoadingLink";
import { SkyLogo } from "@/components/SkyLogo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ShaderBackground } from "@/components/ui/shader-background";
import { business } from "@/lib/business";
import { Building2, Handshake, MapPinned, Menu, MessageCircle, PenLine, Scale } from "lucide-react";
import { useState } from "react";

const collaborationMessage = "im interested in collaboration with sky skrabers";
const whatsappCollaborationUrl = `https://wa.me/${business.whatsappSchema.replace("+", "")}?text=${encodeURIComponent(
  collaborationMessage,
)}`;

const navItems = [
  { label: "Home", href: "/" },
  { label: "Our Projects", href: "/our-projects" },
  { label: "About Us", href: "/about-us" },
  { label: "Virtual Tours", href: "/virtual-tours" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Gallery", href: "/gallery" },
];

const collaborationSteps = [
  {
    Icon: MapPinned,
    title: "Share Your Land Details",
    copy: "Send the location, plot size, and basic ownership context so our team can understand the opportunity.",
  },
  {
    Icon: PenLine,
    title: "Planning Direction",
    copy: "We review development potential, market fit, and the kind of premium residence the land can support.",
  },
  {
    Icon: Scale,
    title: "Value Alignment",
    copy: "The next conversation focuses on clarity, expectations, and a structure that works for both sides.",
  },
  {
    Icon: Building2,
    title: "Build With Sky Skrabers",
    copy: "If the fit is right, Sky Skrabers brings disciplined planning, execution, and South Delhi market experience.",
  },
];

const getPageTitle = (href: string, label: string) => (href === "/blogs" ? "Blogs" : label);

function CollaborationHeader() {
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

export function CollaborationContent() {
  return (
    <>
      <ShaderBackground className="construction-shader-background" />
      <CollaborationHeader />
      <main className="construction-page sell-property-page collaboration-page">
        <section className="construction-hero sell-property-hero">
          <div>
            <div className="construction-hero__signal" aria-hidden="true">
              <span />
              <Handshake size={24} />
              <span />
            </div>
            <p className="eyebrow">Collaboration</p>
            <h1>
              Develop Your Land
              <br />
              <span>With Sky Skrabers.</span>
            </h1>
            <p>
              If you own land in South Delhi and want to explore a premium development partnership, start with one
              WhatsApp message. Our team will connect with you, understand the property, and discuss the right
              collaboration direction.
            </p>
            <div className="sell-property-actions">
              <a
                className="sell-property-whatsapp"
                href={whatsappCollaborationUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="generate_lead"
                data-analytics-label="Collaboration hero WhatsApp"
              >
                <MessageCircle size={21} />
                Discuss Collaboration
              </a>
              <span>Landowners and property partners</span>
            </div>
          </div>

          <aside className="sell-property-panel glass-card" aria-label="Collaboration summary">
            <span>01</span>
            <h2>Land. Planning. Value. Development.</h2>
            <p>
              A direct way for landowners to explore what can be built, how the property can be positioned, and whether
              a collaboration with Sky Skrabers is the right next step.
            </p>
          </aside>
        </section>

        <section className="sell-property-flow" aria-labelledby="collaboration-flow-title">
          <div className="section-heading">
            <p className="eyebrow">How Collaboration Starts</p>
            <h2 id="collaboration-flow-title">A Clear First Conversation For Your Land.</h2>
          </div>
          <div className="sell-property-grid">
            {collaborationSteps.map(({ Icon, title, copy }, index) => (
              <article className="glass-card sell-step-card" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="sell-property-cta glass-card">
          <div>
            <p className="eyebrow">Start The Conversation</p>
            <h2>Want To Collaborate On Your Land?</h2>
            <p>
              Send us your property details on WhatsApp and our team will connect with you to understand the land,
              location, and development possibility.
            </p>
          </div>
          <a
            className="sell-property-whatsapp sell-property-whatsapp--compact"
            href={whatsappCollaborationUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="generate_lead"
            data-analytics-label="Collaboration CTA WhatsApp"
          >
            <MessageCircle size={20} />
            WhatsApp Sky Skrabers
          </a>
        </section>
      </main>
      <WhatsAppButton href={whatsappCollaborationUrl} />
    </>
  );
}
