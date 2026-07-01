"use client";

import { WhatsAppButton } from "@/components/WhatsAppButton";
import { InstagramLink } from "@/components/InstagramLink";
import { SkyLogo } from "@/components/SkyLogo";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Send } from "lucide-react";
import type { MouseEvent } from "react";
import styles from "../lajpat-nagar-1-2/project-page.module.css";

const HOME_RELOAD_PENDING_KEY = "sky-home-reload-pending";

export type ProjectAddress = {
  title: string;
  tags?: string[];
  details?: {
    label: string;
    value: string;
  }[];
};

export type ProjectDetailPageProps = {
  titleLines: string[];
  projectName: string;
  addressLabel: string;
  addresses: ProjectAddress[];
  whatsappText: string;
};

export function ProjectDetailPage({
  titleLines,
  projectName,
  addressLabel,
  addresses,
  whatsappText,
}: ProjectDetailPageProps) {
  const whatsappUrl = `https://wa.me/919999997327?text=${encodeURIComponent(whatsappText)}`;
  const scrollToProjects = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("details")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.history.replaceState(null, "", "#details");
  };
  const scrollToVisit = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("visit")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.history.replaceState(null, "", "#visit");
  };
  const markHomeReloadPending = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.currentTarget.target === "_blank") {
      return;
    }

    window.sessionStorage.setItem(HOME_RELOAD_PENDING_KEY, "1");
  };

  return (
    <main className={styles.page}>
      <header className={styles.navbar}>
        <Link className={styles.logo} href="/#home" aria-label="Sky Skrabers home" onClick={markHomeReloadPending}>
          <SkyLogo className={styles.projectLogo} priority />
        </Link>
        <nav className={styles.navPill} aria-label="Project navigation">
          <a href="#details" onClick={scrollToProjects}>
            Projects
          </a>
          <a href="#visit" onClick={scrollToVisit}>
            Details
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Visit
          </a>
        </nav>
        <div className={styles.socials} aria-label="Social links">
          <InstagramLink iconOnly />
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <Send size={18} />
          </a>
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="project-title">
        <p className={styles.kicker}>Ongoing Project / South Delhi</p>
        <h1 id="project-title">
          {titleLines.map((line, index) => (
            index === 0 ? line : <span key={line}>{line}</span>
          ))}
        </h1>
      </section>

      <section className={styles.marqueeSection} aria-label="Project highlights">
        <div className={styles.marqueeTrack}>
          <span>{projectName} • Sky Skrabers • Ongoing Project •</span>
          <span>{projectName} • Sky Skrabers • Ongoing Project •</span>
        </div>
        <div className={`${styles.marqueeTrack} ${styles.marqueeReverse}`}>
          <span>Prime Address • South Delhi • Site Visit Ready •</span>
          <span>Prime Address • South Delhi • Site Visit Ready •</span>
        </div>
      </section>

      <section id="details" className={styles.serviceList} aria-label={`${addressLabel} project addresses`}>
        <div>
          {addresses.map((item, index) => (
            <article className={styles.serviceItem} key={item.title}>
              <span className={styles.serviceIndex}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.serviceBody}>
                <h3>{item.title}</h3>
                <div className={styles.tags}>
                  {(item.tags ?? ["Residence", "Ongoing", "South Delhi"]).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {item.details ? (
                  <dl className={styles.addressDetails}>
                    {item.details.map((detail) => (
                      <div key={detail.label}>
                        <dt>{detail.label}</dt>
                        <dd>{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>
              <ArrowUpRight className={styles.serviceArrow} size={70} strokeWidth={2.1} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section id="visit" className={styles.ctaSection}>
        <p>Private project conversation</p>
        <h2>Book A {addressLabel} Visit.</h2>
        <a className={styles.ctaButton} href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={26} />
          WhatsApp Sky Skrabers
        </a>
      </section>

      <footer className={styles.footer}>
        <span>© 2026 Sky Skrabers</span>
        <nav aria-label="Footer links">
          <Link href="/#home">Home</Link>
          <Link href="/#contact-us">Contact</Link>
          <InstagramLink>Instagram</InstagramLink>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </nav>
      </footer>
      <WhatsAppButton href={whatsappUrl} />
    </main>
  );
}
