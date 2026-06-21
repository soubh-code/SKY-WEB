"use client";

import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

type RouteLoadingLinkProps = {
  href: string;
  pageTitle: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  onNavigate?: () => void;
};

const HOME_RELOAD_PENDING_KEY = "sky-home-reload-pending";

function markHomeReloadIfNeeded(href: string) {
  try {
    const target = new URL(href, window.location.href);
    if (target.origin !== window.location.origin) return;

    const currentIsHome = window.location.pathname === "/";
    const targetIsHomeLanding = target.pathname === "/" && (!target.hash || target.hash === "#home");

    if ((currentIsHome && !targetIsHomeLanding) || (!currentIsHome && targetIsHomeLanding)) {
      window.sessionStorage.setItem(HOME_RELOAD_PENDING_KEY, "1");
    }
  } catch {
    // If URL parsing fails, navigation should continue without the reload marker.
  }
}

function LoaderLogo() {
  return (
    <div className="brand-logo brand-logo--centered">
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

export function RouteLoadingLink({
  href,
  pageTitle,
  children,
  className,
  ariaLabel,
  onNavigate,
}: RouteLoadingLinkProps) {
  const [loading, setLoading] = useState(false);
  const navigationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const resetLoading = () => {
      setLoading(false);
      document.querySelectorAll(".route-kontext").forEach((node) => node.remove());
      if (navigationTimeoutRef.current !== null) {
        window.clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
      }
    };

    window.addEventListener("pageshow", resetLoading);
    window.addEventListener("popstate", resetLoading);

    return () => {
      resetLoading();
      window.removeEventListener("pageshow", resetLoading);
      window.removeEventListener("popstate", resetLoading);
    };
  }, []);

  const transition = (
    <section className="route-kontext" aria-label={`Opening ${pageTitle}`}>
      <article className="route-kontext__stage" aria-hidden="true">
        <div className="route-kontext__layer route-kontext__layer--one route-kontext__layer--show">
          <span />
        </div>
        <div className="route-kontext__layer route-kontext__layer--two">
          <span />
        </div>
        <div className="route-kontext__layer route-kontext__layer--three">
          <span />
        </div>
      </article>
      <div className="route-kontext__content">
        <LoaderLogo />
        <p>Crafting Tomorrow...</p>
        <strong>{pageTitle}</strong>
      </div>
    </section>
  );

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.currentTarget.target === "_blank") {
      return;
    }

    onNavigate?.();
    markHomeReloadIfNeeded(href);
    setLoading(true);

    if (navigationTimeoutRef.current !== null) {
      window.clearTimeout(navigationTimeoutRef.current);
    }

    navigationTimeoutRef.current = window.setTimeout(() => {
      navigationTimeoutRef.current = null;
      setLoading(false);
      document.querySelectorAll(".route-kontext").forEach((node) => node.remove());
    }, 1400);
  };

  return (
    <>
      <Link className={className} href={href} aria-label={ariaLabel} onClick={handleClick}>
        {children}
      </Link>
      {loading && typeof document !== "undefined" ? createPortal(transition, document.body) : null}
    </>
  );
}
