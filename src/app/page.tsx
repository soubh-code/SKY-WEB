"use client";

import type { GalleryItem } from "@/components/ui/circular-gallery";
import { DeferredPicture } from "@/components/DeferredPicture";
import { InstagramLink } from "@/components/InstagramLink";
import { RouteLoadingLink } from "@/components/RouteLoadingLink";
import { SkyLogo } from "@/components/SkyLogo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useDeferredMotion } from "@/hooks/useDeferredMotion";
import {
  isTabletPerformanceDevice,
  useTabletPerformanceMode,
} from "@/hooks/useTabletPerformanceMode";
import { business } from "@/lib/business";
import {
  removeLocationHash,
  takeHomeSectionTarget,
} from "@/lib/home-section-navigation";
import { getCompletedProjectPropertyCount } from "./completed-projects/completed-project-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Handshake,
  Home,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Waves,
  WalletCards,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const CircularGallery = dynamic(
  () => import("@/components/ui/circular-gallery").then((module) => module.CircularGallery),
  { ssr: false },
);

const navItems = [
  { label: "Home", id: "home", href: "/#home", section: true },
  { label: "Our Projects", id: "our-projects", href: "/#our-projects", section: true },
  { label: "About Us", id: "about-us", href: "/#about-us", section: true },
  { label: "Virtual Tours", id: "virtual-tours", href: "/virtual-tours", section: false, trackOnHome: true },
  { label: "Blogs", id: "blogs", href: "/blogs", section: false, trackOnHome: true },
  { label: "Contact Us", id: "contact-us", href: "/#contact-us", section: true },
  { label: "Gallery", id: "gallery", href: "/gallery", section: false },
];
const navTargets = navItems.filter((item) => item.section || item.trackOnHome);
const displayPhoneNumber = business.phoneDisplay;
const skySkrabersAddress = `${business.name}, ${business.address}`;
const skySkrabersMapQuery = business.mapQuery;
const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(skySkrabersMapQuery)}&output=embed`;
const HOME_RELOAD_PENDING_KEY = "sky-home-reload-pending";
const PHONE_ENTRY_FRAME_COUNT = 99;
const PHONE_ENTRY_FRAME_VERSION = "20fps-99";
const ANDROID_ENTRY_FRAME_COUNT = 92;
const ANDROID_ENTRY_FRAME_VERSION = "android-webp-92";
const TABLET_ENTRY_FRAME_COUNT = 80;
const TABLET_ENTRY_FRAME_VERSION = "tablet-webp-80";
const DESKTOP_ENTRY_FRAME_COUNT = 91;
const DESKTOP_ENTRY_FRAME_VERSION = "desktop-webp-91";
const phoneEntryFrameSrc = (index: number) =>
  `/assets/entry-phone-frames/${String(index).padStart(3, "0")}.webp?v=${PHONE_ENTRY_FRAME_VERSION}`;
const androidEntryFrameSrc = (index: number) =>
  `/assets/entry-android-frames/${String(index).padStart(3, "0")}.webp?v=${ANDROID_ENTRY_FRAME_VERSION}`;
const tabletEntryFrameSrc = (index: number) =>
  `/assets/tablet/entry-frames/${String(index).padStart(3, "0")}.webp?v=${TABLET_ENTRY_FRAME_VERSION}`;
const desktopEntryFrameSrc = (index: number) =>
  `/assets/entry-desktop-frames/${String(index).padStart(3, "0")}.webp?v=${DESKTOP_ENTRY_FRAME_VERSION}`;

const cardImages = [
  "/assets/card-images/card-01.avif",
  "/assets/card-images/card-02.avif",
  "/assets/card-images/card-03.avif",
  "/assets/card-images/card-04.avif",
  "/assets/card-images/card-05.jpg",
  "/assets/card-images/card-06.jpg",
  "/assets/card-images/kalkaji.webp",
] as const;

const projects: GalleryItem[] = [
  {
    name: "Lajpat Nagar 1/2",
    slug: "lajpat-nagar-1-2",
    location: "New Delhi",
    year: "2026",
    configuration: "Outright · Commercial",
    propertyCount: getCompletedProjectPropertyCount("lajpat-nagar-1-2"),
    image: cardImages[0],
    imageAlt: "Lajpat Nagar property portfolio by Sky Skrabers",
    imagePosition: "50% 55%",
  },
  {
    name: "Nehru Enclave",
    slug: "nehru-enclave",
    location: "New Delhi",
    year: "2026",
    configuration: "Outright Plot",
    propertyCount: getCompletedProjectPropertyCount("nehru-enclave"),
    image: cardImages[1],
    imageAlt: "Nehru Enclave outright property portfolio by Sky Skrabers",
    imagePosition: "50% 56%",
  },
  {
    name: "Noida Sector 31",
    slug: "noida-sector-31",
    location: "Delhi NCR",
    year: "2026",
    configuration: "Outright Kothi",
    propertyCount: getCompletedProjectPropertyCount("noida-sector-31"),
    image: cardImages[2],
    imageAlt: "Noida Sector 31 outright property portfolio by Sky Skrabers",
    imagePosition: "50% 50%",
  },
  {
    name: "Ramesh Nagar",
    slug: "ramesh-nagar",
    location: "New Delhi",
    year: "2026",
    configuration: "Outright Plots",
    propertyCount: getCompletedProjectPropertyCount("ramesh-nagar"),
    image: cardImages[3],
    imageAlt: "Ramesh Nagar residential plot portfolio by Sky Skrabers",
    imagePosition: "50% 55%",
  },
  {
    name: "Kalkaji",
    slug: "kalkaji",
    location: "New Delhi",
    year: "2026",
    configuration: "Outright · Commercial",
    propertyCount: getCompletedProjectPropertyCount("kalkaji"),
    image: cardImages[6],
    imageAlt: "Kalkaji property portfolio by Sky Skrabers",
    imagePosition: "50% 50%",
  },
  {
    name: "Hauz Khas",
    slug: "hauz-khas",
    location: "New Delhi",
    year: "2026",
    configuration: "Commercial Shop",
    propertyCount: getCompletedProjectPropertyCount("hauz-khas"),
    image: cardImages[5],
    imageAlt: "Hauz Khas commercial property portfolio by Sky Skrabers",
    imagePosition: "50% 57%",
  },
  {
    name: "Defence Colony",
    slug: "defence-colony",
    location: "New Delhi",
    year: "2026",
    configuration: "Commercial Floor",
    propertyCount: getCompletedProjectPropertyCount("defence-colony"),
    image: cardImages[2],
    imageAlt: "Defence Colony commercial property portfolio by Sky Skrabers",
    imagePosition: "50% 50%",
  },
];

const ongoing = [
  {
    name: "Lajpat Nagar 1/2/4",
    image: cardImages[0],
    imagePosition: "50% 55%",
    coords: "Lajpat Nagar 1/2/4",
    slug: "lajpat-nagar-1-2",
    propertyCount: 10,
  },
  {
    name: "Lajpat Nagar 3",
    image: cardImages[1],
    imagePosition: "50% 56%",
    coords: "Lajpat Nagar 3",
    slug: "lajpat-nagar-3-4",
    propertyCount: 1,
  },
  {
    name: "South Extension Part 1/2",
    image: cardImages[4],
    imagePosition: "50% 52%",
    coords: "South Extension Part 1/2",
    slug: "south-extension-1-2",
    propertyCount: 1,
  },
  {
    name: "East Of Kailash",
    image: cardImages[3],
    imagePosition: "50% 55%",
    coords: "East Of Kailash",
    slug: "east-of-kailash",
    propertyCount: 2,
  },
  {
    name: "Defence Colony",
    image: cardImages[2],
    imagePosition: "50% 50%",
    coords: "Defence Colony",
    slug: "defence-colony",
    propertyCount: 1,
  },
  {
    name: "Hauz Khas",
    image: cardImages[5],
    imagePosition: "50% 57%",
    coords: "Hauz Khas",
    slug: "hauz-khas",
    propertyCount: 1,
  },
  {
    name: "Kalkaji",
    image: cardImages[6],
    imagePosition: "50% 50%",
    coords: "Kalkaji",
    slug: "kalkaji",
    propertyCount: 3,
  },
];

function Logo({ centered = false }: { centered?: boolean }) {
  return <SkyLogo centered={centered} priority />;
}

function LuxuryLoader({ ready = false }: { ready?: boolean }) {
  return (
    <section className={ready ? "loader loader--ready" : "loader"} aria-label="Loading Sky Skrabers">
      <div className="loader__veil" />
      <div className="loader__content">
        <Logo centered />
        <div className="loader__ring">
          <span />
          <Building2 size={28} />
        </div>
        <p>Crafting Tomorrow...</p>
      </div>
      <div className="loader__bottom">
        <i />
        <span>Please Wait</span>
        <i />
      </div>
    </section>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrollToHomeSection = useCallback((href: string) => {
    const hash = href.includes("#") ? href.slice(href.indexOf("#")) : href;
    const target = document.querySelector<HTMLElement>(hash);
    if (!target) return;

    const scrollToTarget = (behavior: ScrollBehavior) => {
      const headerOffset = 92;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, top), behavior });
    };

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      scrollToTarget("smooth");
      gsap.delayedCall(0.42, () => scrollToTarget("auto"));
    });
    removeLocationHash();
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const checkpoint = window.innerHeight * 0.38;
      const current = navTargets.reduce((active, target) => {
        const sections = Array.from(
          document.querySelectorAll<HTMLElement>(`#${target.id}, [data-nav-section="${target.id}"]`),
        );
        const isCurrent = sections.some((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= checkpoint && rect.bottom > checkpoint;
        });

        return isCurrent ? target.id : active;
      }, "home");

      setActiveSection(current);
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header className="site-header">
      <Link
        href="/"
        aria-label="Sky Skrabers home"
        onClick={(event) => {
          event.preventDefault();
          setActiveSection("home");
          scrollToHomeSection("#home");
          setOpen(false);
        }}
      >
        <Logo />
      </Link>
      <nav className={open ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        {navItems.map((item) =>
          !item.section ? (
            <RouteLoadingLink
              key={item.id}
              className={activeSection === item.id ? "is-active" : undefined}
              href={item.href}
              pageTitle={item.label}
              onNavigate={() => setOpen(false)}
            >
              {item.label}
            </RouteLoadingLink>
          ) : (
            <a
              key={item.id}
              href={item.href}
              className={activeSection === item.id ? "is-active" : undefined}
              onClick={(event) => {
                event.preventDefault();
                if (item.section) setActiveSection(item.id);
                scrollToHomeSection(item.href);
                setOpen(false);
              }}
            >
              {item.label}
            </a>
          ),
        )}
      </nav>
      <button className="menu-button" aria-label="Open navigation" onClick={() => setOpen((value) => !value)}>
        <Menu size={22} />
      </button>
    </header>
  );
}

function EntryTransition({ onReady }: { onReady?: () => void }) {
  type EntryFrame = HTMLImageElement | ImageBitmap;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<EntryFrame[]>([]);
  const currentFrameRef = useRef(-1);
  const pendingFrameRef = useRef(0);
  const drawRafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tabletPerformance = isTabletPerformanceDevice();
    const context = canvas.getContext("2d");
    if (!context) return;

    let disposed = false;
    let readyFrames = 0;
    let readySignaled = false;
    let frameCount = DESKTOP_ENTRY_FRAME_COUNT;
    const isTouchViewport = () => window.innerWidth <= 560 || tabletPerformance;
    const isPhoneViewport = () => window.innerWidth <= 560;
    const isAndroidPhoneViewport = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return isPhoneViewport() && userAgent.includes("android");
    };
    const isTabletPortraitViewport = () =>
      window.matchMedia(
        "(min-width: 561px) and (max-width: 1199px) and (orientation: portrait), " +
          "(min-width: 1200px) and (max-width: 1366px) and (max-height: 1199px) and (orientation: portrait)",
      ).matches;
    let entryTrigger: ScrollTrigger | null = null;

    const setEntryLayerHints = (active: boolean) => {
      section.style.willChange = active ? "transform" : "auto";
      [copyRef.current, hintRef.current, servicesRef.current].forEach((element) => {
        if (element) element.style.willChange = active ? "transform, opacity" : "auto";
      });
    };

    const signalReady = () => {
      if (readySignaled || readyFrames < frameCount) return;
      readySignaled = true;
      scheduleFrame(pendingFrameRef.current);
      if (!reduced) {
        createEntryTrigger();
      }
      onReady?.();
      requestAnimationFrame(() => {
        resize();
        ScrollTrigger.refresh();
      });
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, isTouchViewport() ? 1.35 : 1.5);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      currentFrameRef.current = -1;
      scheduleFrame(pendingFrameRef.current);
    };

    const getFrameSize = (image: EntryFrame) => {
      if ("naturalWidth" in image) {
        return { width: image.naturalWidth, height: image.naturalHeight };
      }

      return { width: image.width, height: image.height };
    };

    const isFrameReady = (image: EntryFrame | undefined) => {
      if (!image) return false;
      return !("complete" in image) || image.complete;
    };

    const drawCover = (image: EntryFrame) => {
      const size = getFrameSize(image);
      if (!size.width || !size.height) return;
      const { width, height } = canvas.getBoundingClientRect();
      const scale = Math.max(width / size.width, height / size.height);
      const drawWidth = size.width * scale;
      const drawHeight = size.height * scale;
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = isTouchViewport() ? "medium" : "high";
      context.drawImage(image, x, y, drawWidth, drawHeight);
    };

    const drawFrame = (index: number) => {
      const frameIndex = Math.round(Math.max(0, Math.min(frameCount - 1, index)));
      if (frameIndex === currentFrameRef.current) return;

      const image = framesRef.current[frameIndex];
      if (!isFrameReady(image)) return;

      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);
      currentFrameRef.current = frameIndex;
      drawCover(image);
    };

    const scheduleFrame = (index: number) => {
      pendingFrameRef.current = Math.max(0, Math.min(frameCount - 1, index));
      if (drawRafRef.current !== null) return;

      drawRafRef.current = window.requestAnimationFrame(() => {
        drawRafRef.current = null;
        drawFrame(pendingFrameRef.current);
      });
    };

    const loadImageFrame = (
      src: string,
      index: number,
      createBitmap = true,
      onReady?: () => void,
    ) => {
      const image = new window.Image();
      image.decoding = "async";
      image.onload = async () => {
        framesRef.current[index] = image;

        if ("decode" in image) {
          try {
            await image.decode();
          } catch {
            // The load event already guarantees a drawable image in browsers that reject decode().
          }
        }

        if (createBitmap && "createImageBitmap" in window) {
          try {
            framesRef.current[index] = await window.createImageBitmap(image);
          } catch {
            framesRef.current[index] = image;
          }
        }

        readyFrames += 1;
        if (!disposed && index === Math.round(pendingFrameRef.current)) {
          scheduleFrame(index);
        }
        if (!disposed) signalReady();
        if (!disposed) onReady?.();
      };
      image.src = src;
      return image;
    };

    const loadFrameSequence = (
      count: number,
      srcForIndex: (index: number) => string,
      createBitmaps = true,
    ) => {
      frameCount = count;
      readyFrames = 0;
      framesRef.current = new Array<EntryFrame>(frameCount);

      for (let index = 0; index < frameCount; index += 1) {
        framesRef.current[index] = loadImageFrame(srcForIndex(index), index, createBitmaps);
      }
    };

    const loadPhoneFrameSequenceFallback = () => {
      loadFrameSequence(PHONE_ENTRY_FRAME_COUNT, phoneEntryFrameSrc);
    };

    const loadAndroidFrameSequence = () => {
      loadFrameSequence(ANDROID_ENTRY_FRAME_COUNT, androidEntryFrameSrc);
    };

    const loadTabletFrameSequence = () => {
      loadFrameSequence(TABLET_ENTRY_FRAME_COUNT, tabletEntryFrameSrc);
    };

    const loadDesktopFrameSequence = () => {
      loadFrameSequence(DESKTOP_ENTRY_FRAME_COUNT, desktopEntryFrameSrc);
    };

    if (isTabletPortraitViewport()) {
      loadPhoneFrameSequenceFallback();
    } else if (tabletPerformance) {
      loadTabletFrameSequence();
    } else if (isAndroidPhoneViewport()) {
      loadAndroidFrameSequence();
    } else if (isPhoneViewport()) {
      loadPhoneFrameSequenceFallback();
    } else {
      loadDesktopFrameSequence();
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);
    window.visualViewport?.addEventListener("resize", resize);
    const canvasResizeObserver = new ResizeObserver(resize);
    canvasResizeObserver.observe(canvas);

    if (reduced) {
      scheduleFrame(frameCount - 1);
      gsap.set(copyRef.current, { autoAlpha: 0, force3D: true });
      gsap.set(hintRef.current, { autoAlpha: 0, force3D: true });
      gsap.set(servicesRef.current, { autoAlpha: 1, y: 0, force3D: true });
      return () => {
        disposed = true;
        if (drawRafRef.current !== null) {
          window.cancelAnimationFrame(drawRafRef.current);
        }
        canvasResizeObserver.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("orientationchange", resize);
        window.visualViewport?.removeEventListener("resize", resize);
      };
    }

    const updateEntryVisuals = (progress: number) => {
      const frame = progress * (frameCount - 1);
      scheduleFrame(frame);

      const copyAlpha = gsap.utils.clamp(0, 1, 1 - progress / 0.23);
      const hintAlpha = gsap.utils.clamp(0, 1, 1 - progress / 0.3);
      const servicesAlpha = gsap.utils.clamp(0, 1, (progress - 0.48) / 0.14);

      gsap.set(copyRef.current, { autoAlpha: copyAlpha, y: -36 * (1 - copyAlpha), force3D: true });
      gsap.set(hintRef.current, { autoAlpha: hintAlpha, y: -18 * (1 - hintAlpha), force3D: true });
      gsap.set(servicesRef.current, { autoAlpha: servicesAlpha, y: 44 * (1 - servicesAlpha), force3D: true });
    };

    const createEntryTrigger = () => {
      entryTrigger?.kill(true);
      ScrollTrigger.getById("entry-transition-scroll")?.kill(true);
      setEntryLayerHints(true);
      gsap.set(copyRef.current, { autoAlpha: 1, y: 0, force3D: true });
      gsap.set(hintRef.current, { autoAlpha: 1, y: 0, force3D: true });
      gsap.set(servicesRef.current, { autoAlpha: 0, y: 44, force3D: true });

      entryTrigger = ScrollTrigger.create({
        id: "entry-transition-scroll",
        trigger: section,
        start: "top top",
        end: () => (isTouchViewport() ? "+=175%" : "+=155%"),
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => setEntryLayerHints(true),
        onEnterBack: () => setEntryLayerHints(true),
        onLeave: () => setEntryLayerHints(false),
        onLeaveBack: () => setEntryLayerHints(false),
        onUpdate: (self) => updateEntryVisuals(self.progress),
      });
    };

    const isHomeLanding = () => window.location.pathname === "/" && (!window.location.hash || window.location.hash === "#home");
    const wasHistoryNavigation = () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      return navigation?.type === "back_forward";
    };

    const restoreEntryAnimation = (event?: PageTransitionEvent | PopStateEvent | HashChangeEvent) => {
      if (document.visibilityState === "hidden" || !isHomeLanding() || !readySignaled) return;
      if (event?.type === "pageshow" && "persisted" in event && !event.persisted && !wasHistoryNavigation()) return;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          pendingFrameRef.current = 0;
          currentFrameRef.current = -1;
          requestAnimationFrame(() => {
            resize();
            createEntryTrigger();
            scheduleFrame(0);
            requestAnimationFrame(() => {
              entryTrigger?.refresh();
              entryTrigger?.update();
              ScrollTrigger.refresh();
            });
          });
        });
      });
    };

    window.addEventListener("pageshow", restoreEntryAnimation);
    window.addEventListener("popstate", restoreEntryAnimation);
    window.addEventListener("hashchange", restoreEntryAnimation);

    return () => {
      disposed = true;
      setEntryLayerHints(false);
      entryTrigger?.kill(true);
      if (drawRafRef.current !== null) {
        window.cancelAnimationFrame(drawRafRef.current);
      }
      framesRef.current.forEach((frame) => {
        if ("close" in frame) {
          frame.close();
        }
      });
      canvasResizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      window.visualViewport?.removeEventListener("resize", resize);
      window.removeEventListener("pageshow", restoreEntryAnimation);
      window.removeEventListener("popstate", restoreEntryAnimation);
      window.removeEventListener("hashchange", restoreEntryAnimation);
    };
  }, [onReady]);

  return (
    <section id="home" ref={sectionRef} className="entry-transition" aria-label="Entering Sky Skrabers">
      <canvas ref={canvasRef} className="entry-transition__canvas" />
      <div className="hero__shade" />
      <div ref={copyRef} className="hero__copy">
        <h1>
          <span>Luxury</span>
          <strong>Redefined.</strong>
        </h1>
        <div className="gold-rule" />
        <p>
          Step into the space
          <br />
          you have been searching for
        </p>
      </div>
      <div ref={hintRef} className="entry-transition__hint">
        <span>Private Arrival</span>
        <p>Scroll to enter</p>
      </div>
      <div ref={servicesRef} className="entry-transition__services">
        <ServicesPanel />
      </div>
    </section>
  );
}

function ServicesPanel() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const cards = [
    {
      Icon: Home,
      title: "Construction",
      copy: "From concept to completion, we build spaces that stand the test of time.",
      href: "/construction",
    },
    {
      Icon: Building2,
      title: "Buy New Home",
      copy: "Find your perfect home in our handpicked premium properties.",
      href: "/#ongoing-projects",
    },
    {
      Icon: WalletCards,
      title: "Sell Property",
      copy: "We help you sell your property quickly and at the best possible value.",
      href: "/sell-property",
    },
    {
      Icon: Handshake,
      title: "Collaboration",
      copy: "Partner with us to plan, build, or unlock the right value for your property.",
      href: "/collaboration",
    },
  ] as const;

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;
    if (window.innerWidth <= 560 || isTabletPerformanceDevice()) return;

    const syncPointer = (event: PointerEvent) => {
      const positions = Array.from(container.querySelectorAll<HTMLElement>(".service-card"), (card) => {
        const rect = card.getBoundingClientRect();
        return {
          card,
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
      });

      window.requestAnimationFrame(() => {
        positions.forEach(({ card, x, y }) => {
          card.style.setProperty("--x", `${x}px`);
          card.style.setProperty("--y", `${y}px`);
        });
      });
    };

    window.addEventListener("pointermove", syncPointer, { passive: true });
    return () => window.removeEventListener("pointermove", syncPointer);
  }, []);

  return (
    <div className="section-grid">
      <div>
        <p className="eyebrow">What We Shape</p>
        <h2>
          Things <span>we can help</span>
          <br />
          with...
        </h2>
        <div className="gold-rule" />
        <p className="section-copy">
          We design, build, buy, and sell premium properties, helping you own a home crafted with trust, quality, and
          modern elegance.
        </p>
      </div>
      <div className="service-cards" ref={cardsRef}>
        {cards.map(({ Icon, title, copy, href }) => {
          const card = (
            <article className="glass-card service-card" data-glow-card tabIndex={href ? -1 : 0}>
              <Icon size={46} />
              <h3>{title}</h3>
              <i />
              <p>{copy}</p>
            </article>
          );

          return href ? (
            <RouteLoadingLink
              key={title}
              className="service-card-link"
              href={href}
              pageTitle={title}
              ariaLabel={`Open ${title}`}
            >
              {card}
            </RouteLoadingLink>
          ) : (
            <div key={title} className="service-card-link">
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ResponsiveSectionBackground({ className, alt }: { className: string; alt: string }) {
  return (
    <DeferredPicture
      className="responsive-section-background"
      imageClassName={className}
      src="/assets/section-3-background.avif"
      tabletSrc="/assets/tablet/section-3-background.avif"
      alt={alt}
      width={1672}
      height={941}
      rootMargin="700px"
    />
  );
}

function CompletedProjects() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const { MotionDiv, prefersReducedMotion } = useDeferredMotion();
  const [active, setActive] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);
  const [galleryRadius, setGalleryRadius] = useState(410);
  const [isTouchViewport, setIsTouchViewport] = useState(false);
  const [galleryReady, setGalleryReady] = useState(false);
  const anglePerProject = 360 / projects.length;
  const previousScrollProgressRef = useRef(0);
  const targetRotationRef = useRef(0);
  const displayRotationRef = useRef(0);
  const activeRef = useRef(0);
  const lastAutoFrameRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<gsap.core.Tween | null>(null);
  const scrollIdleTimeoutRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setGalleryReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const getActiveProject = useCallback((nextRotation: number) => {
    const normalized = ((-nextRotation % 360) + 360) % 360;
    return Math.round(normalized / anglePerProject) % projects.length;
  }, [anglePerProject]);

  const rotateBy = useCallback((delta: number, immediate = false) => {
    targetRotationRef.current += delta;

      if (immediate) {
        displayRotationRef.current = targetRotationRef.current;
        setRotation(displayRotationRef.current);
      const nextActive = getActiveProject(displayRotationRef.current);
      activeRef.current = nextActive;
      setActive(nextActive);
    }
  }, [getActiveProject]);

  const pauseBriefly = useCallback(() => {
    setPaused(true);
    if (resumeTimeoutRef.current) {
      resumeTimeoutRef.current.kill();
      resumeTimeoutRef.current = null;
    }
    resumeTimeoutRef.current = gsap.delayedCall(1.2, () => {
      resumeTimeoutRef.current = null;
      setPaused(false);
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          section.style.willChange = "transform";
        },
        onEnterBack: () => {
          section.style.willChange = "transform";
        },
        onLeave: () => {
          section.style.willChange = "auto";
        },
        onLeaveBack: () => {
          section.style.willChange = "auto";
        },
        onUpdate: (self) => {
          const deltaProgress = self.progress - previousScrollProgressRef.current;
          previousScrollProgressRef.current = self.progress;

          if (deltaProgress > 0) {
            if (isTouchViewport) {
              setPaused(true);
              if (scrollIdleTimeoutRef.current) {
                scrollIdleTimeoutRef.current.kill();
                scrollIdleTimeoutRef.current = null;
              }
              scrollIdleTimeoutRef.current = gsap.delayedCall(0.65, () => {
                scrollIdleTimeoutRef.current = null;
                setPaused(false);
              });
            }

            rotateBy(deltaProgress * -360);
          }
        },
      });
    }, section);

    return () => {
      section.style.willChange = "auto";
      ctx.revert();
      if (scrollIdleTimeoutRef.current) {
        scrollIdleTimeoutRef.current.kill();
        scrollIdleTimeoutRef.current = null;
      }
    };
  }, [isTouchViewport, prefersReducedMotion, rotateBy]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let frameId = 0;
    const degreesPerMs = anglePerProject / 3000;

    const animate = (time: number) => {
      if (lastAutoFrameRef.current === null) {
        lastAutoFrameRef.current = time;
      }

      const deltaTime = time - lastAutoFrameRef.current;
      lastAutoFrameRef.current = time;

      if (!paused) {
        targetRotationRef.current -= deltaTime * degreesPerMs;
      }

      displayRotationRef.current += (targetRotationRef.current - displayRotationRef.current) * (isTouchViewport ? 0.11 : 0.12);
      setRotation(displayRotationRef.current);
      const nextActive = getActiveProject(displayRotationRef.current);
      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive;
        setActive(nextActive);
      }
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      lastAutoFrameRef.current = null;
      if (resumeTimeoutRef.current) {
        resumeTimeoutRef.current.kill();
        resumeTimeoutRef.current = null;
      }
    };
  }, [anglePerProject, getActiveProject, isTouchViewport, paused, prefersReducedMotion]);

  useEffect(() => {
    const syncRadius = () => {
      setIsTouchViewport(window.innerWidth <= 560);

      if (window.innerWidth <= 560) {
        setGalleryRadius(218);
        return;
      }

      setGalleryRadius(410);
    };

    syncRadius();
    window.addEventListener("resize", syncRadius);
    return () => window.removeEventListener("resize", syncRadius);
  }, []);

  const selectProject = (index: number) => {
    pauseBriefly();
    const forwardSteps = (index - active + projects.length) % projects.length;
    rotateBy(-forwardSteps * anglePerProject);
  };

  const openOrSelectProject = (index: number) => {
    if (index === active && projects[index].slug) {
      router.push(`/completed-projects/${projects[index].slug}`);
      return;
    }

    selectProject(index);
  };

  const nextProject = () => {
    pauseBriefly();
    rotateBy(-anglePerProject);
  };

  const previousProject = () => {
    pauseBriefly();
    rotateBy(anglePerProject);
  };
  return (
    <section
      ref={sectionRef}
      id="our-projects"
      className="projects projects--gallery"
    >
      <ResponsiveSectionBackground
        alt="Completed South Delhi residential project background by Sky Skrabers"
        className="atmosphere projects__background"
      />
      <div className="section-overlay projects__overlay" />
      <MotionDiv
        className="gallery-heading"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 90 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.45 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        <p className="eyebrow">Our Completed Projects</p>
        <h2>
          Built Spaces.
          <br />
          <span>Real Legacies.</span>
        </h2>
      </MotionDiv>

      <MotionDiv
        className="gallery-shell"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 92, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.04 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.08, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        {galleryReady ? (
          <CircularGallery
            items={projects}
            rotation={rotation}
            radius={galleryRadius}
            activeIndex={active}
            onItemSelect={openOrSelectProject}
          />
        ) : (
          <div className="circular-gallery circular-gallery--reserved" aria-hidden="true" />
        )}
        <button className="gallery-arrow gallery-arrow--left" onClick={previousProject} aria-label="Previous completed project">
          <ArrowLeft size={22} />
        </button>
        <button className="gallery-arrow gallery-arrow--right" onClick={nextProject} aria-label="Next completed project">
          <ArrowRight size={22} />
        </button>
      </MotionDiv>

      <MotionDiv
        className="project-controls gallery-dots"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.04 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        {projects.map((project, index) => (
          <button
            key={project.name}
            className={active === index ? "dot is-active" : "dot"}
            onClick={() => selectProject(index)}
            aria-label={`Show ${project.name}`}
          />
        ))}
      </MotionDiv>
    </section>
  );
}

function OngoingProjects() {
  const router = useRouter();
  const { MotionDiv, MotionButton, prefersReducedMotion } = useDeferredMotion();
  const [active, setActive] = useState(2);
  const [clickToExpand, setClickToExpand] = useState(false);
  const [armedProject, setArmedProject] = useState<number | null>(null);
  const icons = [Home, Building2, Sparkles, Waves, MapPin, WalletCards, MapPin];
  const activateProject = (index: number) => setActive(index);
  const handleProjectClick = (index: number) => {
    if (clickToExpand && (active !== index || armedProject !== index)) {
      activateProject(index);
      setArmedProject(index);
      return;
    }

    router.push(`/projects/${ongoing[index].slug}`);
  };

  useEffect(() => {
    const phoneQuery = window.matchMedia("(max-width: 560px)");
    const tabletQuery = window.matchMedia(
      "(min-width: 561px) and (max-width: 1199px), " +
        "(min-width: 1200px) and (max-width: 1366px) and (min-height: 800px) and (max-height: 1199px)",
    );
    const tabletLandscapeQuery = window.matchMedia(
      "(orientation: landscape) and (min-width: 900px) and (max-width: 1536px) and (min-height: 680px)",
    );
    const syncMode = () => {
      const hasTouchScreen = navigator.maxTouchPoints > 0;
      setClickToExpand(phoneQuery.matches || tabletQuery.matches || (hasTouchScreen && tabletLandscapeQuery.matches));
      setArmedProject(null);
    };

    syncMode();
    phoneQuery.addEventListener("change", syncMode);
    tabletQuery.addEventListener("change", syncMode);
    tabletLandscapeQuery.addEventListener("change", syncMode);
    window.addEventListener("resize", syncMode);
    return () => {
      phoneQuery.removeEventListener("change", syncMode);
      tabletQuery.removeEventListener("change", syncMode);
      tabletLandscapeQuery.removeEventListener("change", syncMode);
      window.removeEventListener("resize", syncMode);
    };
  }, []);

  return (
    <section id="ongoing-projects" className="ongoing" data-nav-section="our-projects">
      <ResponsiveSectionBackground
        alt="Ongoing South Delhi residential project backdrop by Sky Skrabers"
        className="ongoing__tower"
      />
      <div className="section-overlay section-overlay--heavy" />
      <MotionDiv
        className="section-heading"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 76 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.45 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        <p className="eyebrow">Our Ongoing Projects</p>
        <h2>
          Crafting Tomorrow.
          <br />
          <span>Building Today.</span>
        </h2>
      </MotionDiv>
      <MotionDiv
        className="expanding-carousel"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.28 }}
        variants={
          prefersReducedMotion
            ? { hidden: {}, visible: {} }
            : {
                hidden: {},
                visible: { transition: { staggerChildren: 0.16, delayChildren: 0.18 } },
              }
        }
        style={{ willChange: "transform, opacity" }}
      >
        {ongoing.map((project, index) => (
          <MotionButton
            key={project.name}
            className={`ongoing-card ${active === index ? "is-active" : ""}`}
            onPointerEnter={(event) => {
              if (!clickToExpand && event.pointerType !== "touch") activateProject(index);
            }}
            onClick={() => handleProjectClick(index)}
            data-analytics-event="property_card_click"
            data-analytics-label={`${project.name} ongoing project card`}
            onFocus={() => {
              if (!clickToExpand) activateProject(index);
            }}
            aria-label={
              clickToExpand && (active !== index || armedProject !== index)
                ? `Expand ${project.name} project card`
                : `Open ${project.name} project page`
            }
            aria-pressed={active === index}
            variants={
              prefersReducedMotion
                ? {
                    hidden: { opacity: 1, x: 0, scale: 1 },
                    visible: { opacity: 1, x: 0, scale: 1 },
                  }
                : {
                    hidden: { opacity: 0, x: -32, scale: 0.97 },
                    visible: { opacity: 1, x: 0, scale: 1 },
                  }
            }
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <span className="ongoing-card__image">
              <DeferredPicture
                src={project.image}
                tabletSrc={`/assets/tablet/card-images/${project.image.split("/").pop()?.replace(/\.[^.]+$/, ".webp")}`}
                alt={`${project.name} ongoing residential project in New Delhi by Sky Skrabers`}
                rootMargin="500px"
                style={{ objectFit: "cover", objectPosition: project.imagePosition }}
              />
            </span>
            <span className="ongoing-card__details-cta">Click to view details</span>
            <span className="ongoing-card__label">
              <span className="ongoing-card__icon">
                {(() => {
                  const Icon = icons[index] || Home;
                  return <Icon size={23} />;
                })()}
              </span>
              <span className="ongoing-card__compact">{project.name}</span>
            </span>
            <span className="ongoing-card__content">
              <small>Featured Project</small>
              <strong>{project.name}</strong>
              <em>
                <MapPin size={17} /> New Delhi
              </em>
              <span className="ongoing-card__property-count">
                {project.propertyCount} {project.propertyCount === 1 ? "property" : "properties"} available
              </span>
              <i />
            </span>
          </MotionButton>
        ))}
      </MotionDiv>
    </section>
  );
}

function About() {
  return (
    <section id="about-us" className="about reveal-section">
      <div>
        <p className="eyebrow">About Sky Skrabers</p>
        <h2>
          Designed for Legacy.
          <br />
          <span>Built with Precision.</span>
        </h2>
        <p>
          Established in 2011, Sky Skrabers is a Delhi-based real estate enterprise with 100+ landmark residences across
          South Delhi. For more than 14 years, we have shaped premium homes with disciplined construction, thoughtful
          detailing, and a wholehearted belief in delivering value, timeless design, and lasting trust.
        </p>
      </div>
      <i className="vertical-rule" />
      <div className="about__image" aria-hidden="true" />
    </section>
  );
}

function VirtualToursCta() {
  return (
    <section
      id="virtual-tours"
      className="blog-button-section reveal-section"
      aria-label="Open Sky Skrabers virtual tours"
    >
      <RouteLoadingLink
        className="glow-blog-button"
        href="/virtual-tours"
        pageTitle="Virtual Tours"
        ariaLabel="Open Sky Skrabers virtual tours page"
      >
        <span>Virtual Tours</span>
        <ArrowRight size={18} />
      </RouteLoadingLink>
    </section>
  );
}

function BlogCta() {
  return (
    <section id="blogs" className="blog-button-section reveal-section" aria-label="Open Sky Skrabers blogs">
      <RouteLoadingLink className="glow-blog-button" href="/blogs" pageTitle="Blogs" ariaLabel="Open Sky Skrabers blogs page">
        <span>Blogs</span>
        <ArrowRight size={18} />
      </RouteLoadingLink>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact-us" className="contact reveal-section">
      <div className="contact-panel glass-card">
        <p className="eyebrow">Contact</p>
        <h2>Begin a Private Conversation.</h2>
        <div className="contact-lines">
          <p>
            <Building2 size={18} /> Sky Skrabers
          </p>
          <p>
            <MapPin size={18} />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(skySkrabersMapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-meta-lead-source="contact_map"
            >
              {skySkrabersAddress}
            </a>
          </p>
          <p>
            <Phone size={18} />
            <a href={business.phoneHref}>{displayPhoneNumber}</a>
          </p>
          <p>
            <svg className="contact-whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.2L4 20l1.1-4A8.2 8.2 0 1 1 20.2 11.8Z" />
              <path d="M9.1 8.2c.2-.5.5-.6.9-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.5.6c.5 1 1.3 1.8 2.3 2.3l.6-.5c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .4-.1.7-.6.9-.4.2-.9.3-1.4.2-2.7-.4-5.8-3.5-6.2-6.2-.1-.5 0-1 .2-1.4Z" />
            </svg>
            <a href={business.whatsappHref} target="_blank" rel="noopener noreferrer">
              {business.whatsappDisplay}
            </a>
          </p>
          <p>
            <Mail size={18} />
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </p>
          <p>
            <InstagramLink className="contact-instagram-link">{business.instagramHandle}</InstagramLink>
          </p>
          <p>
            <Mail size={18} />
            <a href="mailto:help@skyskrabers.in?subject=Report%20a%20bug">Report a bug help@skyskrabers.in</a>
          </p>
        </div>
      </div>
      <div className="map-panel glass-card">
        <iframe
          title="Sky Skrabers Lajpat Nagar II location"
          src={mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Logo />
      <nav>
        {navItems.map((item) =>
          !item.section ? (
            <RouteLoadingLink key={item.id} href={item.href} pageTitle={item.label}>
              {item.label}
            </RouteLoadingLink>
          ) : (
            <RouteLoadingLink key={item.id} href={item.href} pageTitle={item.label}>
              {item.label}
            </RouteLoadingLink>
          ),
        )}
      </nav>
      <nav className="footer-legal" aria-label="Legal links">
        <RouteLoadingLink href="/privacy-policy" pageTitle="Privacy Policy">
          Privacy Policy
        </RouteLoadingLink>
        <RouteLoadingLink href="/terms-and-conditions" pageTitle="Terms and Conditions">
          Terms & Conditions
        </RouteLoadingLink>
      </nav>
      <nav className="footer-legal" aria-label="Social links">
        <InstagramLink>Instagram</InstagramLink>
      </nav>
      <p>Built Spaces. Real Legacies.</p>
      <small>© 2026 Sky Skrabers. All rights reserved.</small>
    </footer>
  );
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const isTabletPerformance = useTabletPerformanceMode();

  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
  }, []);

  useEffect(() => {
    const reloadHomeIfNeeded = () => {
      if (window.location.pathname !== "/") return;
      if (window.sessionStorage.getItem(HOME_RELOAD_PENDING_KEY) !== "1") return;

      window.sessionStorage.removeItem(HOME_RELOAD_PENDING_KEY);
      window.location.reload();
    };

    reloadHomeIfNeeded();
    window.addEventListener("pageshow", reloadHomeIfNeeded);
    window.addEventListener("popstate", reloadHomeIfNeeded);

    return () => {
      window.removeEventListener("pageshow", reloadHomeIfNeeded);
      window.removeEventListener("popstate", reloadHomeIfNeeded);
    };
  }, []);

  useEffect(() => {
    if (loading || !heroReady) return;

    const hash = takeHomeSectionTarget() ?? window.location.hash;
    const sectionId = hash.startsWith("#") ? hash.slice(1) : "";
    if (!sectionId) return;

    const target = document.getElementById(sectionId);
    if (!target) {
      removeLocationHash();
      return;
    }

    const scrollToTarget = () => {
      const headerOffset = 92;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      ScrollTrigger.refresh();
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      removeLocationHash();
    };

    const delayedScroll = gsap.delayedCall(0.08, scrollToTarget);
    return () => {
      delayedScroll.kill();
    };
  }, [heroReady, loading]);

  useEffect(() => {
    const fallback = gsap.delayedCall(12, () => setHeroReady(true));
    let cancelled = false;
    let lenis: InstanceType<(typeof import("lenis"))["default"]> | null = null;
    let updateLenis: ((time: number) => void) | null = null;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      updateLenis = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      cancelled = true;
      fallback.kill();
      lenis?.off("scroll", ScrollTrigger.update);
      if (updateLenis) gsap.ticker.remove(updateLenis);
      lenis?.destroy();
    };
  }, [isTabletPerformance]);

  useEffect(() => {
    if (!heroReady) return;

    const tabletLoaderSeen = isTabletPerformance && window.sessionStorage.getItem("sky-tablet-loader-seen") === "1";
    const delay = isTabletPerformance ? (tabletLoaderSeen ? 0.08 : 0.18) : 0.85;
    if (isTabletPerformance) window.sessionStorage.setItem("sky-tablet-loader-seen", "1");
    const timeout = gsap.delayedCall(delay, () => setLoading(false));
    return () => {
      timeout.kill();
    };
  }, [heroReady, isTabletPerformance]);

  useEffect(() => {
    const wasHistoryNavigation = () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      return navigation?.type === "back_forward";
    };

    if (wasHistoryNavigation()) {
      requestAnimationFrame(() => {
        setHeroReady(true);
        setLoading(false);
        ScrollTrigger.refresh();
      });
    }

    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted && !wasHistoryNavigation()) return;
      requestAnimationFrame(() => {
        setHeroReady(true);
        setLoading(false);
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".site-header", {
        y: -26,
        autoAlpha: 0,
        duration: 1.1,
        ease: "power3.out",
        force3D: true,
      });
      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
        const targets = section.querySelectorAll<HTMLElement>("h2, .eyebrow, .section-copy, .glass-card, .ongoing-card");

        gsap.from(targets, {
          y: 38,
          autoAlpha: 0,
          force3D: true,
          stagger: 0.08,
          duration: 1,
          ease: "power3.out",
          onStart: () => gsap.set(targets, { willChange: "transform, opacity" }),
          onComplete: () => gsap.set(targets, { willChange: "auto" }),
          scrollTrigger: { trigger: section, start: "top 75%" },
        });
      });
    });

    return () => ctx.revert();
  }, [isTabletPerformance]);

  const main = useMemo(
    () => (
      <>
        <Header />
        <EntryTransition onReady={handleHeroReady} />
        <CompletedProjects />
        <OngoingProjects />
        <About />
        <VirtualToursCta />
        <BlogCta />
        <Contact />
        <Footer />
      </>
    ),
    [handleHeroReady],
  );

  return (
    <>
      {loading && <LuxuryLoader ready={heroReady} />}
      <main>{main}</main>
      <WhatsAppButton />
    </>
  );
}
