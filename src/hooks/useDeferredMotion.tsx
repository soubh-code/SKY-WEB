"use client";

import { isTabletPerformanceDevice } from "@/hooks/useTabletPerformanceMode";
import type { ComponentPropsWithoutRef, ForwardedRef } from "react";
import { forwardRef, useEffect, useState } from "react";

type MotionOnlyProps = {
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  whileInView?: unknown;
  viewport?: unknown;
  variants?: unknown;
  transition?: unknown;
};

type StaticDivProps = ComponentPropsWithoutRef<"div"> & MotionOnlyProps;
type StaticButtonProps = ComponentPropsWithoutRef<"button"> & MotionOnlyProps;

function stripMotionProps<T extends MotionOnlyProps>(props: T) {
  const {
    initial: _initial,
    animate: _animate,
    exit: _exit,
    whileInView: _whileInView,
    viewport: _viewport,
    variants: _variants,
    transition: _transition,
    ...domProps
  } = props;

  return domProps;
}

const StaticDiv = forwardRef(function StaticDiv(
  props: StaticDivProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return <div ref={ref} {...stripMotionProps(props)} />;
});

const StaticButton = forwardRef(function StaticButton(
  props: StaticButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return <button ref={ref} {...stripMotionProps(props)} />;
});

export function useDeferredMotion() {
  const [motion, setMotion] = useState<(typeof import("framer-motion"))["motion"] | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => setPrefersReducedMotion(reducedMotionQuery.matches);
    syncReducedMotion();
    reducedMotionQuery.addEventListener("change", syncReducedMotion);

    let active = true;
    if (!isTabletPerformanceDevice()) {
      void import("framer-motion").then((module) => {
        if (active) setMotion(() => module.motion);
      });
    }

    return () => {
      active = false;
      reducedMotionQuery.removeEventListener("change", syncReducedMotion);
    };
  }, []);

  return {
    MotionDiv: motion?.div ?? StaticDiv,
    MotionButton: motion?.button ?? StaticButton,
    prefersReducedMotion,
  };
}
