"use client";

import {
  ArrowLeft,
  Globe2,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { InstagramIcon, InstagramLink } from "@/components/InstagramLink";
import { business, siteUrl } from "@/lib/business";
import { cardDetails, LOGO_PATH } from "./card-config";
import styles from "./e-visiting-card.module.css";

type QrGenerator = {
  toString: (
    text: string,
    options: {
      type: "svg";
      errorCorrectionLevel: "H";
      margin: number;
      width: number;
      color: { dark: string; light: string };
    },
  ) => Promise<string>;
};

declare global {
  interface Window {
    SkyQRCode?: QrGenerator;
  }
}

const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
const whatsappHref = `https://wa.me/91${cardDetails.phone}?text=${encodeURIComponent(
  "Hello Sky Skrabers, I would like to connect with Avneet Singh Arora.",
)}`;
const personalInstagramHref = "https://www.instagram.com/avneetsingharora/";

function WhatsAppMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.2L4 20l1.1-4A8.2 8.2 0 1 1 20.2 11.8Z" />
      <path d="M9.1 8.2c.2-.5.5-.6.9-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.5.6c.5 1 1.3 1.8 2.3 2.3l.6-.5c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .4-.1.7-.6.9-.4.2-.9.3-1.4.2-2.7-.4-5.8-3.5-6.2-6.2-.1-.5 0-1 .2-1.4Z" />
    </svg>
  );
}

function BrandLogo() {
  return (
    <Image
      className={styles.logo}
      src={LOGO_PATH}
      alt="Sky Skrabers gold logo"
      width={1635}
      height={962}
      loading="eager"
      priority
      unoptimized
      draggable={false}
    />
  );
}

function ContactLink({
  href,
  icon,
  label,
  children,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      className={styles.contactLink}
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className={styles.contactIcon}>{icon}</span>
      <span>{children}</span>
    </a>
  );
}

export function EVisitingCardStudio() {
  const [qrSvg, setQrSvg] = useState("");

  useEffect(() => {
    const createQr = async () => {
      if (!window.SkyQRCode) {
        await new Promise<void>((resolve, reject) => {
          const existing = document.querySelector<HTMLScriptElement>('script[data-sky-vendor="qr-generator"]');
          if (existing?.dataset.loaded === "true") {
            resolve();
            return;
          }

          const script = existing ?? document.createElement("script");
          script.addEventListener("load", () => {
            script.dataset.loaded = "true";
            resolve();
          }, { once: true });
          script.addEventListener("error", () => reject(new Error("QR generator failed to load")), { once: true });

          if (!existing) {
            script.src = "/vendor/qrcode.min.js";
            script.async = true;
            script.dataset.skyVendor = "qr-generator";
            document.head.appendChild(script);
          }
        });
      }

      const svg = await window.SkyQRCode?.toString(cardDetails.qrUrl, {
        type: "svg",
        errorCorrectionLevel: "H",
        margin: 2,
        width: 420,
        color: { dark: "#07101d", light: "#f4e7cc" },
      });
      if (svg) setQrSvg(svg);
    };

    void createQr();
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.ambientGlow} aria-hidden="true" />

      <nav className={styles.topbar} aria-label="E-visiting card navigation">
        <Link href="/" className={styles.homeLink}>
          <ArrowLeft size={17} />
          Home
        </Link>
        <span>SKY SKRABERS · DIGITAL CARD</span>
      </nav>

      <div className={styles.cardStack}>
        <section className={styles.faceSection} aria-labelledby="front-label">
          <p className={styles.faceLabel} id="front-label">Front</p>
          <article className={`${styles.cardFace} ${styles.frontFace}`}>
            <Image
              className={styles.frontResidence}
              src="/assets/e-visiting-card/luxury-residence-right.webp"
              alt=""
              aria-hidden="true"
              width={1672}
              height={941}
              loading="eager"
              priority
              unoptimized
            />
            <div className={styles.goldArc} aria-hidden="true" />
            <div className={styles.frontLogo}>
              <BrandLogo />
              <p>REAL ESTATE&nbsp;&nbsp; | &nbsp;&nbsp;CONSTRUCTION&nbsp;&nbsp; | &nbsp;&nbsp;REDEVELOPMENT</p>
            </div>
            <p className={styles.frontTagline}>CRAFTING LANDMARKS. CREATING LEGACIES.</p>
          </article>
        </section>

        <section className={styles.faceSection} aria-labelledby="back-label">
          <p className={styles.faceLabel} id="back-label">Back</p>
          <article className={`${styles.cardFace} ${styles.backFace}`}>
            <div className={styles.marblePanel} aria-hidden="true" />
            <div className={styles.qrColumn}>
              <div>
                <p className={styles.scanTitle}>SCAN TO CONNECT</p>
                <span className={styles.scanDivider} aria-hidden="true" />
                <p className={styles.scanText}>
                  Explore Sky Skrabers, save our contact details and connect with our team.
                </p>
              </div>
              <div className={styles.qrFrame} aria-label="QR code linking to this Sky Skrabers e-visiting card">
                {qrSvg ? (
                  <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
                ) : (
                  <span className={styles.qrLoading}>SKY<br />SKRABERS</span>
                )}
                <span className={styles.qrLogo}>
                  <Image
                    src={LOGO_PATH}
                    alt=""
                    aria-hidden="true"
                    width={1707}
                    height={1034}
                    unoptimized
                  />
                </span>
              </div>
            </div>

            <div className={styles.detailsColumn}>
              <div className={styles.identity}>
                <span className={styles.contactIcon}><UserRound /></span>
                <div>
                  <h1>{cardDetails.name}</h1>
                  <p>{cardDetails.designation}</p>
                </div>
              </div>

              <div className={styles.contactList}>
                <div className={styles.phoneRow}>
                  <ContactLink href={`tel:+91${cardDetails.phone}`} icon={<Phone />} label={`Call ${cardDetails.name}`}>
                    +91 {cardDetails.phone.slice(0, 5)} {cardDetails.phone.slice(5)}
                  </ContactLink>
                  <a className={styles.saveContact} href="/avneet-singh-arora.vcf" download="Avneet-Singh-Arora.vcf">
                    Save contact
                  </a>
                </div>
                <ContactLink href={`mailto:${cardDetails.email}`} icon={<Mail />} label={`Email ${cardDetails.name}`}>
                  {cardDetails.email}
                </ContactLink>
                <ContactLink href={siteUrl} icon={<Globe2 />} label="Visit the Sky Skrabers website" external>
                  www.skyskrabers.in
                </ContactLink>
                <ContactLink href={mapHref} icon={<MapPin />} label="Open the Sky Skrabers office in Google Maps" external>
                  {cardDetails.location}
                </ContactLink>
              </div>

              <div className={styles.socialActions}>
                <InstagramLink className={styles.socialButton} iconSize={18}>
                  <span>{business.instagramHandle}</span>
                </InstagramLink>
                <a
                  className={styles.socialButton}
                  href={personalInstagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Avneet Singh Arora on Instagram"
                >
                  <InstagramIcon size={18} />
                  <span>@avneetsingharora</span>
                </a>
                <a
                  className={`${styles.socialButton} ${styles.whatsappButton}`}
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Sky Skrabers on WhatsApp"
                >
                  <WhatsAppMark />
                  <span>WhatsApp</span>
                </a>
              </div>

              <p className={styles.values}>
                <span>LUXURY</span>
                <b aria-hidden="true">◆</b>
                <span>EXCELLENCE</span>
                <b aria-hidden="true">◆</b>
                <span>TRUST</span>
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
