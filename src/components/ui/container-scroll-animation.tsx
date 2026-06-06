"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
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

  const rotate = useTransform(scrollYProgress, [0.08, 0.62], [18, 0]);
  const scale = useTransform(scrollYProgress, [0.08, 0.62], isMobile ? [0.78, 0.96] : [1.04, 1]);
  const translate = useTransform(scrollYProgress, [0.08, 0.62], [0, -80]);

  return (
    <div className="container-scroll" ref={containerRef}>
      <div className="container-scroll__inner">
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({ translate, children }: { translate: MotionValue<number>; children: ReactNode }) {
  return (
    <motion.div className="container-scroll__header" style={{ y: translate }}>
      {children}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: ReactNode;
}) {
  return (
    <motion.div
      className="container-scroll__card"
      style={{
        rotateX: rotate,
        scale,
      }}
    >
      <div className="container-scroll__screen">{children}</div>
    </motion.div>
  );
}
