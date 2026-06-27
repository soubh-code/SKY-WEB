"use client";

import { RouteLoadingLink } from "@/components/RouteLoadingLink";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ShaderBackground } from "@/components/ui/shader-background";
import { CalendarCheck2, Home, Menu, MessageCircle, TrendingUp, UserRoundCheck } from "lucide-react";
import { useState } from "react";

const whatsappSellUrl =
  "https://wa.me/919999997327?text=Hello%20Sky%20Skrabers%2C%20I%20want%20to%20sell%20my%20property.%20Please%20connect%20with%20me.";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Our Projects", href: "/#our-projects" },
  { label: "About Us", href: "/#about-us" },
  { label: "Virtual Tours", href: "/#virtual-tours" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/#contact-us" },
];

const steps = [
  {
    Icon: MessageCircle,
    title: "Message On WhatsApp",
    copy: "Share your property details and location. We usually reply within a minute.",
  },
  {
    Icon: UserRoundCheck,
    title: "A Specialist Connects",
    copy: "Someone from Sky Skrabers speaks with you, understands the property, and plans the next step.",
  },
  {
    Icon: Home,
    title: "Property Visit",
    copy: "Our team visits your property, studies the condition, location, and market fit.",
  },
  {
    Icon: TrendingUp,
    title: "Best Possible Value",
    copy: "You receive a clear value direction based on real demand and premium buyer expectations.",
  },
];

const getPageTitle = (href: string, label: string) => (href === "/blogs" ? "Blogs" : label);

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

function SellPropertyHeader() {
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

export function SellPropertyContent() {
  return (
    <>
      <ShaderBackground className="construction-shader-background" />
      <SellPropertyHeader />
      <main className="construction-page sell-property-page">
        <section className="construction-hero sell-property-hero">
          <div>
            <div className="construction-hero__signal" aria-hidden="true">
              <span />
              <MessageCircle size={24} />
              <span />
            </div>
            <p className="eyebrow">Sell Property</p>
            <h1>
              Get The Right Buyer
              <br />
              <span>For Your Property.</span>
            </h1>
            <p>
              Start with one WhatsApp message. We usually reply within a minute, then someone from Sky Skrabers connects
              with you, visits your property, and helps you understand the best possible value.
            </p>
            <div className="sell-property-actions">
              <a className="sell-property-whatsapp" href={whatsappSellUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={21} />
                Start On WhatsApp
              </a>
              <span>Reply usually within 1 minute</span>
            </div>
          </div>

          <aside className="sell-property-panel glass-card" aria-label="Sell property support summary">
            <span>01</span>
            <h2>Message. Connect. Visit. Value.</h2>
            <p>
              A simpler route for owners who want clarity before making a property decision. Your first step stays easy:
              send a WhatsApp message and our team takes it from there.
            </p>
          </aside>
        </section>

        <section className="sell-property-flow" aria-labelledby="sell-property-flow-title">
          <div className="section-heading">
            <p className="eyebrow">How It Works</p>
            <h2 id="sell-property-flow-title">A Direct Path To A Better Property Value.</h2>
          </div>
          <div className="sell-property-grid">
            {steps.map(({ Icon, title, copy }, index) => (
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
            <p className="eyebrow">Ready When You Are</p>
            <h2>Want Us To Visit Your Property?</h2>
            <p>
              Send your details on WhatsApp and we will connect with you quickly to understand your property and arrange
              the next step.
            </p>
          </div>
          <a className="sell-property-whatsapp sell-property-whatsapp--compact" href={whatsappSellUrl} target="_blank" rel="noopener noreferrer">
            <CalendarCheck2 size={20} />
            Book A Visit
          </a>
        </section>
      </main>
      <WhatsAppButton />
    </>
  );
}
