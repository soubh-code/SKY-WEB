"use client";

import { useEffect } from "react";
import { removeLocationHash } from "@/lib/home-section-navigation";

export function CleanLegacyUrlHash() {
  useEffect(() => {
    // The homepage consumes legacy section hashes after its loader; every other page can clean them immediately.
    if (window.location.pathname !== "/") removeLocationHash();
  }, []);

  return null;
}
