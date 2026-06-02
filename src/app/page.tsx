"use client";

import { CircularGallery, GalleryItem } from "@/components/ui/circular-gallery";
import { InteractiveTourCard } from "@/components/ui/interactive-tour-card";
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
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const navItems = ["Home", "Our Projects", "About Us", "Virtual Tours", "Blogs", "Contact Us"];
const navTargets = navItems.map((item) => ({
  label: item,
  id: item.toLowerCase().replaceAll(" ", "-"),
}));

const projects: GalleryItem[] = [
  {
    name: "Lajpat Nagar",
    location: "New Delhi",
    year: "2022",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5672° N, 77.2430° E",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80",
    imagePosition: "50% 55%",
  },
  {
    name: "South Delhi",
    location: "New Delhi",
    year: "2023",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5355° N, 77.2410° E",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&auto=format&fit=crop&q=80",
    imagePosition: "50% 56%",
  },
  {
    name: "Defence Colony",
    location: "New Delhi",
    year: "2023",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5672° N, 77.2290° E",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&auto=format&fit=crop&q=80",
    imagePosition: "50% 50%",
  },
  {
    name: "Greater Kailash",
    location: "New Delhi",
    year: "2024",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5494° N, 77.2430° E",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&auto=format&fit=crop&q=80",
    imagePosition: "50% 55%",
  },
  {
    name: "South Extension",
    location: "New Delhi",
    year: "2024",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5687° N, 77.2209° E",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1000&auto=format&fit=crop&q=80",
    imagePosition: "50% 52%",
  },
  {
    name: "Vasant Vihar",
    location: "New Delhi",
    year: "2025",
    configuration: "3 BHK · 3 Floors",
    coordinates: "28.5603° N, 77.1633° E",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1000&auto=format&fit=crop&q=80",
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

function LuxuryLoader() {
  return (
    <section className="loader" aria-label="Loading Sky Skrabers">
      <Image src="/assets/loading-page.png" alt="" fill priority className="loader__image" />
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
        {navTargets.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeSection === item.id ? "is-active" : undefined}
            onClick={() => {
              setActiveSection(item.id);
              setOpen(false);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <button className="menu-button" aria-label="Open navigation" onClick={() => setOpen((value) => !value)}>
        <Menu size={22} />
      </button>
    </header>
  );
}

function EntryTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = canvas.getContext("2d");
    if (!context) return;

    const frameCount = 96;
    const framePaths = Array.from(
      { length: frameCount },
      (_, index) => `/assets/entry-frames/frame-${String(index).padStart(3, "0")}.webp`,
    );

    let disposed = false;
    const isTouchViewport = () => window.innerWidth <= 820 || window.matchMedia("(pointer: coarse)").matches;

    const resize = () => {
      const ratio = isTouchViewport() ? Math.min(window.devicePixelRatio || 1, 1.6) : window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      currentFrameRef.current = -1;
      drawFrame(currentFrameRef.current < 0 ? 0 : currentFrameRef.current);
    };

    const drawCover = (image: HTMLImageElement) => {
      const { width, height } = canvas.getBoundingClientRect();
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.clearRect(0, 0, width, height);
      context.drawImage(image, x, y, drawWidth, drawHeight);
    };

    const drawFrame = (index: number) => {
      const frame = Math.max(0, Math.min(frameCount - 1, index));
      if (frame === currentFrameRef.current) return;
      const image = framesRef.current[frame];
      if (!image?.complete) return;
      currentFrameRef.current = frame;
      drawCover(image);
    };

    framesRef.current = framePaths.map((src, index) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
      image.onload = () => {
        if (!disposed && index === 0) drawFrame(0);
      };
      return image;
    });

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      drawFrame(frameCount - 1);
      gsap.set(copyRef.current, { autoAlpha: 0 });
      gsap.set(hintRef.current, { autoAlpha: 0 });
      gsap.set(servicesRef.current, { autoAlpha: 1, y: 0 });
      return () => {
        disposed = true;
        window.removeEventListener("resize", resize);
      };
    }

    const ctx = gsap.context(() => {
      gsap.set(copyRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(hintRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(servicesRef.current, { autoAlpha: 0, y: 44 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => (isTouchViewport() ? "+=250%" : "+=220%"),
        pin: true,
        scrub: isTouchViewport() ? 0.85 : 0.55,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const frame = Math.round(self.progress * (frameCount - 1));
          drawFrame(frame);

          const copyAlpha = gsap.utils.clamp(0, 1, 1 - self.progress / 0.28);
          const hintAlpha = gsap.utils.clamp(0, 1, 1 - self.progress / 0.36);
          const servicesAlpha = gsap.utils.clamp(0, 1, (self.progress - 0.72) / 0.22);

          gsap.set(copyRef.current, { autoAlpha: copyAlpha, y: -36 * (1 - copyAlpha) });
          gsap.set(hintRef.current, { autoAlpha: hintAlpha, y: -18 * (1 - hintAlpha) });
          gsap.set(servicesRef.current, { autoAlpha: servicesAlpha, y: 44 * (1 - servicesAlpha) });
        },
      });
    }, section);

    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      ctx.revert();
    };
  }, []);

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
    [Home, "Construction", "From concept to completion, we build spaces that stand the test of time."],
    [Building2, "Buy New Home", "Find your perfect home in our handpicked premium properties."],
    [WalletCards, "Sell Property", "We help you sell your property quickly and at the best possible value."],
  ] as const;

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

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
        {cards.map(([Icon, title, copy]) => (
          <article className="glass-card service-card" data-glow-card key={title}>
            <Icon size={46} />
            <h3>{title}</h3>
            <i />
            <p>{copy}</p>
          </article>
        ))}
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
      setActive(getActiveProject(displayRotationRef.current));
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

            rotateBy(deltaProgress * (isTouchViewport ? -180 : -360));
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
    const degreesPerMs = anglePerProject / (isTouchViewport ? 5200 : 3000);

    const animate = (time: number) => {
      if (lastAutoFrameRef.current === null) {
        lastAutoFrameRef.current = time;
      }

      const deltaTime = time - lastAutoFrameRef.current;
      lastAutoFrameRef.current = time;

      if (!paused) {
        targetRotationRef.current -= deltaTime * degreesPerMs;
      }

      displayRotationRef.current += (targetRotationRef.current - displayRotationRef.current) * (isTouchViewport ? 0.055 : 0.12);
      setRotation(displayRotationRef.current);
      setActive(getActiveProject(displayRotationRef.current));
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
      setIsTouchViewport(window.innerWidth <= 820 || window.matchMedia("(pointer: coarse)").matches);

      if (window.innerWidth <= 560) {
        setGalleryRadius(218);
        return;
      }

      if (window.innerWidth <= 820) {
        setGalleryRadius(286);
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
        initial={{ opacity: 0, y: 140, scale: 0.86, filter: "blur(22px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.34 }}
        transition={{ duration: 1.55, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
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
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
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
  const icons = [Home, Building2, Sparkles, Waves, MapPin];
  const activateProject = (index: number) => setActive((current) => (current === index ? current : index));

  return (
    <section className="ongoing" data-nav-section="our-projects">
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
              if (event.pointerType !== "touch") activateProject(index);
            }}
            onClick={() => activateProject(index)}
            onFocus={() => activateProject(index)}
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
          Sky Skrabers creates premium residences in South Delhi with disciplined construction, sharp architectural
          detailing, and a quiet belief that trust is built into every finish. From acquisition to delivery, each home is
          shaped for modern elegance, long-term value, and the rare comfort of knowing everything has been considered.
        </p>
        <div className="stats">
          <strong>3 BHK</strong>
          <span>Builder floors</span>
          <strong>South Delhi</strong>
          <span>Focused portfolio</span>
        </div>
      </div>
      <i className="vertical-rule" />
      <div className="about__image">
        <Image src="/assets/section-2.png" alt="Luxury villa master bedroom" fill sizes="(max-width: 820px) 100vw, 42vw" priority={false} />
      </div>
    </section>
  );
}

function VirtualTours() {
  const tours = [
    ["Lajpat Nagar Residence", "Private 360 walkthrough", "/assets/section-2.png"],
    ["Greater Kailash Villa", "Cinematic room preview", "/assets/section-3.png"],
    ["South Extension Floor", "Immersive residence scan", "/assets/section-4.png"],
  ];

  return (
    <section id="virtual-tours" className="tour reveal-section">
      <div className="section-heading">
        <p className="eyebrow">Virtual Tours</p>
        <h2>Explore Before You Arrive.</h2>
      </div>
      <div className="tour-card-grid">
        {tours.map(([title, description, image]) => (
          <InteractiveTourCard
            key={title}
            title={title}
            description={description}
            image={image}
            status="Unavailable"
          />
        ))}
      </div>
    </section>
  );
}

function Blogs() {
  const posts = [
    ["Architecture", "The Quiet Details That Make a Luxury Floor Feel Expensive"],
    ["Real Estate", "Why South Delhi Builder Floors Continue to Hold Premium Value"],
    ["Luxury Living", "Designing Homes Around Arrival, Privacy, and Light"],
  ];

  return (
    <section id="blogs" className="blogs reveal-section">
      <div className="section-heading">
        <p className="eyebrow">Insights</p>
        <h2>Measured Thought. Refined Living.</h2>
      </div>
      <div className="blog-grid">
        {posts.map(([category, title], index) => (
          <article className="blog-card glass-card" key={title}>
            <div className="blog-card__image">
              <Image src={index === 1 ? "/assets/section-4.png" : "/assets/section-3.png"} alt="" fill />
            </div>
            <span>{category}</span>
            <h3>{title}</h3>
            <p>Notes on construction quality, premium property decisions, and homes designed for a lasting impression.</p>
          </article>
        ))}
      </div>
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
            <MapPin size={18} /> South Delhi, New Delhi
          </p>
          <p>
            <Phone size={18} /> +91 98710 00000
          </p>
          <p>
            <Mail size={18} /> hello@skyskrabers.com
          </p>
        </div>
        <form onSubmit={submit}>
          <input aria-label="Name" placeholder="Name" required />
          <input aria-label="Phone" placeholder="Phone" required />
          <input aria-label="Email" placeholder="Email" type="email" />
          <select aria-label="Requirement" defaultValue="">
            <option value="" disabled>
              Requirement
            </option>
            <option>Construction</option>
            <option>Buy New Home</option>
            <option>Sell Property</option>
            <option>Virtual Tour</option>
          </select>
          <textarea aria-label="Message" placeholder="Message" rows={4} />
          <button type="submit">
            <Send size={18} /> {sent ? "Request Received" : "Submit"}
          </button>
        </form>
      </div>
      <div className="map-panel glass-card">
        <iframe
          title="Sky Skrabers South Delhi location"
          src="https://www.google.com/maps?q=Greater%20Kailash%20New%20Delhi&output=embed"
          loading="lazy"
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
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`}>
            {item}
          </a>
        ))}
      </nav>
      <p>Built Spaces. Real Legacies.</p>
      <small>© 2026 Sky Skrabers. All rights reserved.</small>
    </footer>
  );
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 2200);
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => {
      window.clearTimeout(timeout);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".site-header", { y: -26, autoAlpha: 0, duration: 1.1, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
        gsap.from(section.querySelectorAll("h2, .eyebrow, .section-copy, .glass-card, .ongoing-card, .interactive-tour-card"), {
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
        <EntryTransition />
        <CompletedProjects />
        <OngoingProjects />
        <About />
        <VirtualTours />
        <Blogs />
        <Contact />
        <Footer />
      </>
    ),
    [],
  );

  return (
    <>
      {loading && <LuxuryLoader />}
      <main>{main}</main>
      <a className="floating-contact" href="#contact-us" aria-label="Contact Sky Skrabers">
        <Sparkles size={18} />
      </a>
    </>
  );
}
