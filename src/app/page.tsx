"use client";

import { CircularGallery, GalleryItem } from "@/components/ui/circular-gallery";
import { InstagramLink } from "@/components/InstagramLink";
import { RouteLoadingLink } from "@/components/RouteLoadingLink";
import { SkyLogo } from "@/components/SkyLogo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", id: "home", href: "/#home", section: true },
  { label: "Our Projects", id: "our-projects", href: "/#our-projects", section: true },
  { label: "About Us", id: "about-us", href: "/#about-us", section: true },
  { label: "Virtual Tours", id: "virtual-tours", href: "/virtual-tours", section: false, trackOnHome: true },
  { label: "Blogs", id: "blogs", href: "/blogs", section: false, trackOnHome: true },
  { label: "Contact Us", id: "contact-us", href: "/#contact-us", section: true },
];
const navTargets = navItems.filter((item) => item.section || item.trackOnHome);
const displayPhoneNumber = "+91 99999 97327";
const skySkrabersAddress = "Sky Skrabers, C-132, Lajpat Nagar 2, New Delhi, Delhi 110024";
const skySkrabersMapQuery = "Sky Skrabers Lajpat Nagar 2";
const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(skySkrabersMapQuery)}&output=embed`;
const HOME_RELOAD_PENDING_KEY = "sky-home-reload-pending";
const PHONE_ENTRY_FRAME_COUNT = 99;
const PHONE_ENTRY_FRAME_VERSION = "20fps-99";
const ANDROID_ENTRY_FRAME_COUNT = 92;
const ANDROID_ENTRY_FRAME_VERSION = "android-webp-92";
const phoneEntryFrameSrc = (index: number) =>
  `/assets/entry-phone-frames/${String(index).padStart(3, "0")}.webp?v=${PHONE_ENTRY_FRAME_VERSION}`;
const androidEntryFrameSrc = (index: number) =>
  `/assets/entry-android-frames/${String(index).padStart(3, "0")}.webp?v=${ANDROID_ENTRY_FRAME_VERSION}`;

const cardImages = [
  "/assets/card-images/card-01.avif",
  "/assets/card-images/card-02.avif",
  "/assets/card-images/card-03.avif",
  "/assets/card-images/card-04.avif",
  "/assets/card-images/card-05.jpg",
  "/assets/card-images/card-06.jpg",
] as const;

const projects: GalleryItem[] = [
  {
    name: "Lajpat Nagar 1/2/4",
    location: "New Delhi",
    year: "2026",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5672° N, 77.2430° E",
    image: cardImages[0],
    imagePosition: "50% 55%",
  },
  {
    name: "Lajpat Nagar 3",
    location: "New Delhi",
    year: "2025",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5355° N, 77.2410° E",
    image: cardImages[1],
    imagePosition: "50% 56%",
  },
  {
    name: "Defence Colony",
    location: "New Delhi",
    year: "2025",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5672° N, 77.2290° E",
    image: cardImages[2],
    imagePosition: "50% 50%",
  },
  {
    name: "East Of Kailash",
    location: "New Delhi",
    year: "2025",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5494° N, 77.2430° E",
    image: cardImages[3],
    imagePosition: "50% 55%",
  },
  {
    name: "South Extension Part 1/2",
    location: "New Delhi",
    year: "2025",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5687° N, 77.2209° E",
    image: cardImages[4],
    imagePosition: "50% 52%",
  },
  {
    name: "Hauz Khas",
    location: "New Delhi",
    year: "2025",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5603° N, 77.1633° E",
    image: cardImages[5],
    imagePosition: "50% 57%",
  },
];

const ongoing = [
  {
    name: "Lajpat Nagar 1/2/4",
    image: projects[0].image,
    imagePosition: projects[0].imagePosition,
    coords: "Lajpat Nagar 1/2/4",
    slug: "lajpat-nagar-1-2",
  },
  {
    name: "Lajpat Nagar 3",
    image: projects[1].image,
    imagePosition: projects[1].imagePosition,
    coords: "Lajpat Nagar 3",
    slug: "lajpat-nagar-3-4",
  },
  {
    name: "South Extension Part 1/2",
    image: projects[4].image,
    imagePosition: projects[4].imagePosition,
    coords: "South Extension Part 1/2",
    slug: "south-extension-1-2",
  },
  {
    name: "East Of Kailash",
    image: projects[3].image,
    imagePosition: projects[3].imagePosition,
    coords: "East Of Kailash",
    slug: "east-of-kailash",
  },
  {
    name: "Defence Colony",
    image: projects[2].image,
    imagePosition: projects[2].imagePosition,
    coords: "Defence Colony",
    slug: "defence-colony",
  },
  {
    name: "Hauz Khas",
    image: projects[5].image,
    imagePosition: projects[5].imagePosition,
    coords: "Hauz Khas",
    slug: "hauz-khas",
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
      <a href="#home" aria-label="Sky Skrabers home">
        <Logo />
      </a>
      <nav className={open ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        {navItems.map((item) =>
          item.href === "/blogs" ? (
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
              onClick={() => {
                if (item.section) setActiveSection(item.id);
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
  type EntryFrame = HTMLImageElement | ImageBitmap | VideoFrame;

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
    const context = canvas.getContext("2d");
    if (!context) return;

    let disposed = false;
    let readyFrames = 0;
    let readySignaled = false;
    let frameCount = 72;
    let avifDecoder: ImageDecoder | null = null;
    const isTouchViewport = () => window.innerWidth <= 560;
    const isPhoneViewport = () => window.innerWidth <= 560;
    const isAndroidPhoneViewport = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return isPhoneViewport() && userAgent.includes("android");
    };
    const getEntryAnimationSrc = () =>
      isPhoneViewport() ? "/assets/entry-scroll-phone.avif" : "/assets/entry-scroll-desktop.avif";

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
      if ("displayWidth" in image) {
        return { width: image.displayWidth, height: image.displayHeight };
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

    const loadImageFrame = (src: string, index: number) => {
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

        if ("createImageBitmap" in window) {
          try {
            framesRef.current[index] = await window.createImageBitmap(image);
          } catch {
            framesRef.current[index] = image;
          }
        }

        readyFrames += 1;
        if (!disposed && index === pendingFrameRef.current) {
          scheduleFrame(index);
        }
        if (!disposed) signalReady();
      };
      image.src = src;
      return image;
    };

    const loadFrameSequence = (count: number, srcForIndex: (index: number) => string) => {
      frameCount = count;
      readyFrames = 0;
      framesRef.current = new Array<EntryFrame>(frameCount);

      for (let index = 0; index < frameCount; index += 1) {
        framesRef.current[index] = loadImageFrame(srcForIndex(index), index);
      }
    };

    const loadPhoneFrameSequenceFallback = () => {
      loadFrameSequence(PHONE_ENTRY_FRAME_COUNT, phoneEntryFrameSrc);
    };

    const loadAndroidFrameSequence = () => {
      loadFrameSequence(ANDROID_ENTRY_FRAME_COUNT, androidEntryFrameSrc);
    };

    const loadStaticAvifFallback = (src: string) => {
      if (isAndroidPhoneViewport()) {
        loadAndroidFrameSequence();
        return;
      }

      if (isPhoneViewport()) {
        loadPhoneFrameSequenceFallback();
        return;
      }

      frameCount = 1;
      readyFrames = 0;
      framesRef.current = [loadImageFrame(src, 0)];
    };

    const loadAnimatedAvifFrames = async (src: string) => {
      const decoderConstructor = (window as unknown as { ImageDecoder?: typeof ImageDecoder }).ImageDecoder;

      if (!decoderConstructor) {
        loadStaticAvifFallback(src);
        return;
      }

      const response = await fetch(src);
      if (!response.ok || disposed) return;

      const blob = await response.blob();
      const data = await blob.arrayBuffer();
      const decoder = new decoderConstructor({ data, type: blob.type || "image/avif" });
      avifDecoder = decoder;
      await decoder.tracks.ready;

      const decodedFrameCount = decoder.tracks.selectedTrack?.frameCount ?? 0;
      if (!decodedFrameCount || disposed) {
        decoder.close?.();
        avifDecoder = null;
        loadStaticAvifFallback(src);
        return;
      }

      frameCount = decodedFrameCount;
      readyFrames = 0;
      framesRef.current = new Array<EntryFrame>(frameCount);

      for (let index = 0; index < frameCount; index += 1) {
        if (disposed) return;
        const { image } = await decoder.decode({ frameIndex: index });
        framesRef.current[index] = image;
        readyFrames += 1;
        if (index === pendingFrameRef.current) {
          scheduleFrame(index);
        }
        signalReady();
      }
    };

    if (isAndroidPhoneViewport()) {
      loadAndroidFrameSequence();
    } else if (isPhoneViewport()) {
      loadPhoneFrameSequenceFallback();
    } else {
      const entryAnimationSrc = getEntryAnimationSrc();
      void loadAnimatedAvifFrames(entryAnimationSrc).catch(() => {
        if (!disposed) loadStaticAvifFallback(entryAnimationSrc);
      });
    }

    resize();
    window.addEventListener("resize", resize);

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
        window.removeEventListener("resize", resize);
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
      avifDecoder?.close?.();
      window.removeEventListener("resize", resize);
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
      href: "/#contact-us",
    },
  ] as const;

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;
    if (window.innerWidth <= 560) return;

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

function CompletedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);
  const [galleryRadius, setGalleryRadius] = useState(410);
  const [isTouchViewport, setIsTouchViewport] = useState(false);
  const anglePerProject = 360 / projects.length;
  const previousScrollProgressRef = useRef(0);
  const targetRotationRef = useRef(0);
  const displayRotationRef = useRef(0);
  const activeRef = useRef(0);
  const lastAutoFrameRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<gsap.core.Tween | null>(null);
  const scrollIdleTimeoutRef = useRef<gsap.core.Tween | null>(null);

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

  const goToProject = (index: number) => {
    pauseBriefly();
    const forwardSteps = (index - active + projects.length) % projects.length;
    rotateBy(-forwardSteps * anglePerProject);
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
      <Image
        src="/assets/section-3-background.avif"
        alt=""
        fill
        className="atmosphere projects__background"
        quality={100}
        sizes="(max-width: 560px) 240vw, (max-width: 820px) 180vw, 120vw"
        unoptimized
      />
      <div className="section-overlay projects__overlay" />
      <motion.div
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
      </motion.div>

      <motion.div
        className="gallery-shell"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 92, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.04 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.08, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        <CircularGallery items={projects} rotation={rotation} radius={galleryRadius} activeIndex={active} onItemSelect={goToProject} />
        <button className="gallery-arrow gallery-arrow--left" onClick={previousProject} aria-label="Previous completed project">
          <ArrowLeft size={22} />
        </button>
        <button className="gallery-arrow gallery-arrow--right" onClick={nextProject} aria-label="Next completed project">
          <ArrowRight size={22} />
        </button>
      </motion.div>

      <motion.div
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
            onClick={() => goToProject(index)}
            aria-label={`Show ${project.name}`}
          />
        ))}
      </motion.div>
    </section>
  );
}

function OngoingProjects() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(2);
  const [clickToExpand, setClickToExpand] = useState(false);
  const [armedProject, setArmedProject] = useState<number | null>(null);
  const icons = [Home, Building2, Sparkles, Waves, MapPin, WalletCards];
  const activateProject = (index: number) => setActive((current) => (current === index ? current : index));
  const handleProjectClick = (index: number) => {
    if (clickToExpand && (active !== index || armedProject !== index)) {
      activateProject(index);
      setArmedProject(index);
      return;
    }

    router.push(`/projects/${ongoing[index].slug}`);
  };

  useEffect(() => {
    const query = window.matchMedia("(max-width: 560px)");
    const syncMode = () => {
      setClickToExpand(query.matches);
      setArmedProject(null);
    };

    syncMode();
    query.addEventListener("change", syncMode);
    return () => query.removeEventListener("change", syncMode);
  }, []);

  return (
    <section id="ongoing-projects" className="ongoing" data-nav-section="our-projects">
      <Image src="/assets/section-3-background.avif" alt="" fill className="ongoing__tower" />
      <div className="section-overlay section-overlay--heavy" />
      <motion.div
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
      </motion.div>
      <motion.div
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
          <motion.button
            key={project.name}
            className={`ongoing-card ${active === index ? "is-active" : ""}`}
            onPointerEnter={(event) => {
              if (!clickToExpand && event.pointerType !== "touch") activateProject(index);
            }}
            onClick={() => handleProjectClick(index)}
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
            <span
              className="ongoing-card__image"
              style={{ backgroundImage: `linear-gradient(90deg, rgba(5, 11, 20, 0.08), rgba(5, 11, 20, 0.58)), url("${project.image}")`, backgroundPosition: project.imagePosition }}
            />
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
              <i />
            </span>
          </motion.button>
        ))}
      </motion.div>
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
            >
              {skySkrabersAddress}
            </a>
          </p>
          <p>
            <Phone size={18} /> {displayPhoneNumber}
          </p>
          <p>
            <Mail size={18} /> hello@skyskrabers.com
          </p>
          <p>
            <InstagramLink className="contact-instagram-link">@sky.skrabers</InstagramLink>
          </p>
          <p>
            <Mail size={18} />
            <a href="mailto:help@skyskrabers.in?subject=Report%20a%20bug">Report a bug @help.skyskrabers.in</a>
          </p>
        </div>
      </div>
      <div className="map-panel glass-card">
        <iframe
          title="Sky Skrabers Lajpat Nagar 2 location"
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
          item.href === "/blogs" ? (
            <RouteLoadingLink key={item.id} href={item.href} pageTitle={item.label}>
              {item.label}
            </RouteLoadingLink>
          ) : (
            <a key={item.id} href={item.href}>
            {item.label}
            </a>
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
    const fallback = gsap.delayedCall(12, () => setHeroReady(true));
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      fallback.kill();
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!heroReady) return;

    const timeout = gsap.delayedCall(0.85, () => setLoading(false));
    return () => {
      timeout.kill();
    };
  }, [heroReady]);

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
      gsap.from(".site-header", { y: -26, autoAlpha: 0, duration: 1.1, ease: "power3.out", force3D: true });
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
  }, []);

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
