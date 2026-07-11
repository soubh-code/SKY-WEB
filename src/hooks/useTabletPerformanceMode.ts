"use client";

import { useEffect, useState } from "react";

export const TABLET_PERFORMANCE_QUERY =
  "(min-width: 768px) and (max-width: 1199px) and (pointer: coarse), " +
  "(min-width: 1200px) and (max-width: 1366px) and (max-height: 1199px) and (pointer: coarse)";

export const isTabletPerformanceDevice = () =>
  typeof window !== "undefined" && window.matchMedia(TABLET_PERFORMANCE_QUERY).matches;

export function useTabletPerformanceMode() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(TABLET_PERFORMANCE_QUERY);
    const syncMode = () => {
      const enabled = query.matches;
      setIsTablet(enabled);
      document.documentElement.classList.toggle("tablet-performance", enabled);
    };

    syncMode();
    query.addEventListener("change", syncMode);

    return () => {
      query.removeEventListener("change", syncMode);
      document.documentElement.classList.remove("tablet-performance");
    };
  }, []);

  return isTablet;
}
