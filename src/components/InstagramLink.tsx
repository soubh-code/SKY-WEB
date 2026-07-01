"use client";

import type { MouseEvent, ReactNode } from "react";

export const instagramWebUrl = "https://www.instagram.com/sky.skrabers/";
const instagramAppUrl = "instagram://user?username=sky.skrabers";

type InstagramIconProps = {
  size?: number;
  className?: string;
};

export function InstagramIcon({ size = 18, className }: InstagramIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="18" height="18" rx="5.2" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4.05" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="17.35" cy="6.65" r="1.15" fill="currentColor" />
    </svg>
  );
}

type InstagramLinkProps = {
  children?: ReactNode;
  className?: string;
  iconOnly?: boolean;
  iconSize?: number;
};

export function InstagramLink({ children, className, iconOnly = false, iconSize = 18 }: InstagramLinkProps) {
  const openInstagram = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();

    let didLeavePage = false;
    const fallbackDelay = 850;
    const fallbackTimer = window.setTimeout(() => {
      if (!didLeavePage) {
        window.location.href = instagramWebUrl;
      }
    }, fallbackDelay);

    const cleanup = () => {
      didLeavePage = true;
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("pagehide", cleanup);
      window.removeEventListener("blur", cleanup);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        cleanup();
      }
    };

    window.addEventListener("pagehide", cleanup, { once: true });
    window.addEventListener("blur", cleanup, { once: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.location.href = instagramAppUrl;
  };

  return (
    <a
      aria-label={iconOnly ? "Open Sky Skrabers on Instagram" : undefined}
      className={className}
      href={instagramWebUrl}
      onClick={openInstagram}
      rel="noopener noreferrer"
    >
      <InstagramIcon size={iconSize} />
      {children}
    </a>
  );
}
