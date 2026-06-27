"use client";

import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const syncViewport = () => setIsMobile(window.innerWidth <= 768);

    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  const rotate = useTransform(scrollYProgress, [0.08, 0.62], isMobile ? [8, 0] : [18, 0]);
  const scale = useTransform(scrollYProgress, [0.08, 0.62], isMobile ? [0.94, 1] : [1.04, 1]);
  const translate = useTransform(scrollYProgress, [0.08, 0.62], isMobile ? [0, -34] : [0, -80]);

  return (
    <div className="container-scroll" ref={containerRef}>
      <div className="container-scroll__inner">
        <Header translate={translate} prefersReducedMotion={prefersReducedMotion}>
          {titleComponent}
        </Header>
        <Card rotate={rotate} scale={scale} prefersReducedMotion={prefersReducedMotion}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({
  translate,
  prefersReducedMotion,
  children,
}: {
  translate: MotionValue<number>;
  prefersReducedMotion: boolean | null;
  children: ReactNode;
}) {
  return (
    <motion.div
      className="container-scroll__header"
      style={{ y: prefersReducedMotion ? 0 : translate, willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  prefersReducedMotion,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  prefersReducedMotion: boolean | null;
  children: ReactNode;
}) {
  return (
    <motion.div
      className="container-scroll__card"
      style={{
        rotateX: prefersReducedMotion ? 0 : rotate,
        scale: prefersReducedMotion ? 1 : scale,
        willChange: "transform, opacity",
      }}
    >
      <div className="container-scroll__screen">{children}</div>
    </motion.div>
  );
}
