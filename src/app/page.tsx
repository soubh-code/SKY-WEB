"use client";

import { CircularGallery, GalleryItem } from "@/components/ui/circular-gallery";
import { RouteLoadingLink } from "@/components/RouteLoadingLink";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Home,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Sparkles,
  Waves,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", id: "home", href: "/#home", section: true },
  { label: "Our Projects", id: "our-projects", href: "/#our-projects", section: true },
  { label: "About Us", id: "about-us", href: "/#about-us", section: true },
  { label: "Virtual Tours", id: "virtual-tours", href: "/#virtual-tours", section: true },
  { label: "Blogs", id: "blogs", href: "/blogs", section: false },
  { label: "Contact Us", id: "contact-us", href: "/#contact-us", section: true },
];
const navTargets = navItems.filter((item) => item.section);
const displayPhoneNumber = "+91 99999 97327";
const skySkrabersAddress = "Sky Skrabers, C-132, Lajpat Nagar 2, New Delhi, Delhi 110024";
const skySkrabersMapQuery = "Sky Skrabers Lajpat Nagar 2";
const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(skySkrabersMapQuery)}&output=embed`;
const HOME_RELOAD_PENDING_KEY = "sky-home-reload-pending";
const PHONE_ENTRY_FRAME_COUNT = 99;
const PHONE_ENTRY_FRAME_VERSION = "20fps-99";
const phoneEntryFrameSrc = (index: number) =>
  `/assets/entry-phone-frames/${String(index).padStart(3, "0")}.webp?v=${PHONE_ENTRY_FRAME_VERSION}`;

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
    name: "Lajpat Nagar",
    location: "New Delhi",
    year: "2022",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5672° N, 77.2430° E",
    image: cardImages[0],
    imagePosition: "50% 55%",
  },
  {
    name: "South Delhi",
    location: "New Delhi",
    year: "2023",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5355° N, 77.2410° E",
    image: cardImages[1],
    imagePosition: "50% 56%",
  },
  {
    name: "Defence Colony",
    location: "New Delhi",
    year: "2023",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5672° N, 77.2290° E",
    image: cardImages[2],
    imagePosition: "50% 50%",
  },
  {
    name: "Greater Kailash",
    location: "New Delhi",
    year: "2024",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5494° N, 77.2430° E",
    image: cardImages[3],
    imagePosition: "50% 55%",
  },
  {
    name: "South Extension",
    location: "New Delhi",
    year: "2024",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5687° N, 77.2209° E",
    image: cardImages[4],
    imagePosition: "50% 52%",
  },
  {
    name: "Vasant Vihar",
    location: "New Delhi",
    year: "2025",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5603° N, 77.1633° E",
    image: cardImages[5],
    imagePosition: "50% 57%",
  },
];

const ongoing = [
  { name: "Lajpat Nagar - 1", image: projects[0].image, imagePosition: projects[0].imagePosition, coords: "28.5660° N, 77.2440° E" },
  { name: "Lajpat Nagar - 2", image: projects[1].image, imagePosition: projects[1].imagePosition, coords: "28.5684° N, 77.2398° E" },
  { name: "Greater Kailash", image: projects[3].image, imagePosition: projects[3].imagePosition, coords: "28.5494° N, 77.2430° E" },
  { name: "South Extension", image: projects[4].image, imagePosition: projects[4].imagePosition, coords: "28.5687° N, 77.2209° E" },
  { name: "Defence Colony", image: projects[2].image, imagePosition: projects[2].imagePosition, coords: "28.5736° N, 77.2326° E" },
];

function Logo({ centered = false }: { centered?: boolean }) {
  return (
    <div className={centered ? "brand-logo brand-logo--center" : "brand-logo"}>
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
            <RouteLoadingLink key={item.id} href={item.href} pageTitle={item.label} onNavigate={() => setOpen(false)}>
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
    const getEntryAnimationSrc = () =>
      isPhoneViewport() ? "/assets/entry-scroll-phone.avif" : "/assets/entry-scroll-desktop.avif";

    const signalReady = () => {
      if (readySignaled || readyFrames < frameCount) return;
      readySignaled = true;
      scheduleFrame(pendingFrameRef.current);
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
      drawFrame(pendingFrameRef.current);
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

    const loadPhoneFrameSequenceFallback = () => {
      frameCount = PHONE_ENTRY_FRAME_COUNT;
      readyFrames = 0;
      framesRef.current = new Array<EntryFrame>(frameCount);

      for (let index = 0; index < frameCount; index += 1) {
        framesRef.current[index] = loadImageFrame(phoneEntryFrameSrc(index), index);
      }
    };

    const loadStaticAvifFallback = (src: string) => {
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

    if (isPhoneViewport()) {
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
      gsap.set(copyRef.current, { autoAlpha: 0 });
      gsap.set(hintRef.current, { autoAlpha: 0 });
      gsap.set(servicesRef.current, { autoAlpha: 1, y: 0 });
      return () => {
        disposed = true;
        if (drawRafRef.current !== null) {
          window.cancelAnimationFrame(drawRafRef.current);
        }
        window.removeEventListener("resize", resize);
      };
    }

    let entryTrigger: ScrollTrigger | null = null;

    const updateEntryVisuals = (progress: number) => {
      const frame = progress * (frameCount - 1);
      scheduleFrame(frame);

      const copyAlpha = gsap.utils.clamp(0, 1, 1 - progress / 0.23);
      const hintAlpha = gsap.utils.clamp(0, 1, 1 - progress / 0.3);
      const servicesAlpha = gsap.utils.clamp(0, 1, (progress - 0.48) / 0.14);

      gsap.set(copyRef.current, { autoAlpha: copyAlpha, y: -36 * (1 - copyAlpha) });
      gsap.set(hintRef.current, { autoAlpha: hintAlpha, y: -18 * (1 - hintAlpha) });
      gsap.set(servicesRef.current, { autoAlpha: servicesAlpha, y: 44 * (1 - servicesAlpha) });
    };

    const createEntryTrigger = () => {
      entryTrigger?.kill(true);
      ScrollTrigger.getById("entry-transition-scroll")?.kill(true);
      gsap.set(copyRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(hintRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(servicesRef.current, { autoAlpha: 0, y: 44 });

      entryTrigger = ScrollTrigger.create({
        id: "entry-transition-scroll",
        trigger: section,
        start: "top top",
        end: () => (isTouchViewport() ? "+=175%" : "+=155%"),
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateEntryVisuals(self.progress),
      });
    };

    const ctx = gsap.context(() => {
      createEntryTrigger();
    }, section);

    const isHomeLanding = () => window.location.pathname === "/" && (!window.location.hash || window.location.hash === "#home");
    const wasHistoryNavigation = () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      return navigation?.type === "back_forward";
    };

    const restoreEntryAnimation = (event?: PageTransitionEvent | PopStateEvent | HashChangeEvent) => {
      if (document.visibilityState === "hidden" || !isHomeLanding()) return;
      if (event?.type === "pageshow" && "persisted" in event && !event.persisted && !wasHistoryNavigation()) return;

      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        pendingFrameRef.current = 0;
        currentFrameRef.current = -1;
        resize();
        createEntryTrigger();
        scheduleFrame(0);
        requestAnimationFrame(() => {
          entryTrigger?.refresh();
          entryTrigger?.update();
          ScrollTrigger.refresh();
        });
      });
    };

    window.addEventListener("pageshow", restoreEntryAnimation);
    window.addEventListener("popstate", restoreEntryAnimation);
    window.addEventListener("hashchange", restoreEntryAnimation);

    return () => {
      disposed = true;
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
      ctx.revert();
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
      href: undefined,
    },
  ] as const;

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;
    if (window.innerWidth <= 560) return;

    const syncPointer = (event: PointerEvent) => {
      container.querySelectorAll<HTMLElement>(".service-card").forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--y", `${event.clientY - rect.top}px`);
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
  const resumeTimeoutRef = useRef<number | null>(null);
  const scrollIdleTimeoutRef = useRef<number | null>(null);

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
      window.clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = window.setTimeout(() => setPaused(false), 1200);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const deltaProgress = self.progress - previousScrollProgressRef.current;
          previousScrollProgressRef.current = self.progress;

          if (deltaProgress > 0) {
            if (isTouchViewport) {
              setPaused(true);
              if (scrollIdleTimeoutRef.current) {
                window.clearTimeout(scrollIdleTimeoutRef.current);
              }
              scrollIdleTimeoutRef.current = window.setTimeout(() => setPaused(false), 650);
            }

            rotateBy(deltaProgress * -360);
          }
        },
      });
    }, section);

    return () => {
      ctx.revert();
      if (scrollIdleTimeoutRef.current) {
        window.clearTimeout(scrollIdleTimeoutRef.current);
      }
    };
  }, [isTouchViewport, rotateBy]);

  useEffect(() => {
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
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [anglePerProject, getActiveProject, isTouchViewport, paused]);

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
        src="/assets/section-3-background.png"
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
        initial={{ opacity: 0, y: 90, filter: "blur(18px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.45 }}
        transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
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
        initial={{ opacity: 0, y: 92, scale: 0.9, filter: "blur(16px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.04 }}
        transition={{ duration: 1.08, ease: [0.16, 1, 0.3, 1] }}
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
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.04 }}
        transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
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
  const [active, setActive] = useState(2);
  const [clickToExpand, setClickToExpand] = useState(false);
  const icons = [Home, Building2, Sparkles, Waves, MapPin];
  const activateProject = (index: number) => setActive((current) => (current === index ? current : index));

  useEffect(() => {
    const query = window.matchMedia("(max-width: 560px)");
    const syncMode = () => setClickToExpand(query.matches);

    syncMode();
    query.addEventListener("change", syncMode);
    return () => query.removeEventListener("change", syncMode);
  }, []);

  return (
    <section id="ongoing-projects" className="ongoing" data-nav-section="our-projects">
      <Image src="/assets/section-3.png" alt="" fill className="ongoing__tower" />
      <div className="section-overlay section-overlay--heavy" />
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 76, filter: "blur(16px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.45 }}
        transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
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
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.16, delayChildren: 0.18 } },
        }}
      >
        {ongoing.map((project, index) => (
          <motion.button
            key={project.name}
            className={`ongoing-card ${active === index ? "is-active" : ""}`}
            onPointerEnter={(event) => {
              if (!clickToExpand && event.pointerType !== "touch") activateProject(index);
            }}
            onClick={() => activateProject(index)}
            onFocus={() => activateProject(index)}
            aria-pressed={active === index}
            variants={{
              hidden: { opacity: 0, x: -32, scale: 0.97 },
              visible: { opacity: 1, x: 0, scale: 1 },
            }}
            transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="ongoing-card__image"
              style={{ backgroundImage: `linear-gradient(90deg, rgba(5, 11, 20, 0.08), rgba(5, 11, 20, 0.58)), url("${project.image}")`, backgroundPosition: project.imagePosition }}
            />
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
              <b>Expected Completion</b>
              <span>2026</span>
              <b>Configuration</b>
              <span>3 BHK · 3 Floors</span>
              <b>Project Location</b>
              <span>{project.coords}</span>
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

function VirtualTours() {
  const tours = [
    ["Lajpat Nagar Residence", "Private 360 walkthrough", cardImages[0]],
    ["Greater Kailash Villa", "Cinematic room preview", cardImages[2]],
    ["South Extension Floor", "Immersive residence scan", cardImages[4]],
  ];
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

    card.style.setProperty("--tour-rotate-x", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--tour-rotate-y", `${rotateY.toFixed(2)}deg`);
  };
  const handleTourCardLeave = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tour-rotate-x", "0deg");
    event.currentTarget.style.setProperty("--tour-rotate-y", "0deg");
  };

  return (
    <section id="virtual-tours" className="tour reveal-section">
      <div className="section-heading">
        <p className="eyebrow">Virtual Tours</p>
        <h2>Explore Before You Arrive.</h2>
      </div>
      <div className="tour-card-grid">
        {tours.map(([title, description, image]) => (
          <article
            className="tour-card"
            key={title}
            onMouseMove={handleTourCardMove}
            onMouseLeave={handleTourCardLeave}
          >
            <Image src={image} alt="" fill sizes="(max-width: 820px) 100vw, 33vw" />
            <span className="tour-card__shade" />
            <div className="tour-card__glass">
              <div>
                <h3>{title}</h3>
                <small>{description}</small>
              </div>
              <Sparkles aria-hidden="true" size={18} />
            </div>
            <div className="tour-card__content">
              <small>{description}</small>
              <h3>{title}</h3>
              <strong>Unavailable</strong>
            </div>
            <div className="tour-card__dots" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BlogCta() {
  return (
    <section className="blog-button-section reveal-section" aria-label="Open Sky Skrabers blogs">
      <RouteLoadingLink className="glow-blog-button" href="/blogs" pageTitle="Blogs" ariaLabel="Open Sky Skrabers blogs page">
        <span>Blogs</span>
        <ArrowRight size={18} />
      </RouteLoadingLink>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

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
        </div>
        <form onSubmit={submit}>
          <input aria-label="Name" placeholder="Name" autoComplete="name" maxLength={80} required />
          <input
            aria-label="Phone"
            placeholder="Phone"
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            pattern="[0-9+() -]{7,20}"
            required
          />
          <input aria-label="Email" placeholder="Email" type="email" autoComplete="email" maxLength={120} />
          <select aria-label="Requirement" defaultValue="">
            <option value="" disabled>
              Requirement
            </option>
            <option>Construction</option>
            <option>Buy New Home</option>
            <option>Sell Property</option>
            <option>Virtual Tour</option>
          </select>
          <textarea aria-label="Message" placeholder="Message" rows={4} maxLength={800} />
          <button type="submit">
            <Send size={18} /> {sent ? "Request Received" : "Submit"}
          </button>
        </form>
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
    const fallback = window.setTimeout(() => setHeroReady(true), 12000);
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => {
      window.clearTimeout(fallback);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!heroReady) return;

    const timeout = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(timeout);
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
      gsap.from(".site-header", { y: -26, autoAlpha: 0, duration: 1.1, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
        gsap.from(section.querySelectorAll("h2, .eyebrow, .section-copy, .glass-card, .ongoing-card"), {
          y: 38,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1,
          ease: "power3.out",
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
        <VirtualTours />
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
