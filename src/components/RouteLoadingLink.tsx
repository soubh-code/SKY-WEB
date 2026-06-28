"use client";

import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import gsap from "gsap";
import { SkyLogo } from "./SkyLogo";

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
    const targetIsHomeLanding = target.pathname === "/";

    if ((currentIsHome && !targetIsHomeLanding) || (!currentIsHome && targetIsHomeLanding)) {
      window.sessionStorage.setItem(HOME_RELOAD_PENDING_KEY, "1");
    }
  } catch {
    // If URL parsing fails, navigation should continue without the reload marker.
  }
}

function getSamePageHashTarget(href: string) {
  try {
    const target = new URL(href, window.location.href);
    const isSamePage = target.origin === window.location.origin && target.pathname === window.location.pathname;
    return isSamePage && target.hash ? target.hash : null;
  } catch {
    return null;
  }
}

function LoaderLogo() {
  return <SkyLogo centered priority />;
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
  const navigationTimeoutRef = useRef<gsap.core.Tween | null>(null);
  const safetyTimeoutRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const resetLoading = () => {
      setLoading(false);
      document.querySelectorAll(".route-kontext").forEach((node) => node.remove());
      if (navigationTimeoutRef.current !== null) {
        navigationTimeoutRef.current.kill();
        navigationTimeoutRef.current = null;
      }
      if (safetyTimeoutRef.current !== null) {
        safetyTimeoutRef.current.kill();
        safetyTimeoutRef.current = null;
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

    const samePageHash = getSamePageHashTarget(href);
    if (samePageHash) {
      event.preventDefault();
      const target = document.querySelector<HTMLElement>(samePageHash);
      if (target) {
        window.history.pushState(null, "", samePageHash);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    let targetUrl: URL;
    try {
      targetUrl = new URL(href, window.location.href);
    } catch {
      return;
    }

    if (targetUrl.origin !== window.location.origin) {
      return;
    }

    const destination = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (destination === current) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    markHomeReloadIfNeeded(href);
    setLoading(true);

    if (navigationTimeoutRef.current !== null) {
      navigationTimeoutRef.current.kill();
      navigationTimeoutRef.current = null;
    }
    if (safetyTimeoutRef.current !== null) {
      safetyTimeoutRef.current.kill();
      safetyTimeoutRef.current = null;
    }

    navigationTimeoutRef.current = gsap.delayedCall(0.95, () => {
      navigationTimeoutRef.current = null;
      window.location.assign(destination);
      safetyTimeoutRef.current = gsap.delayedCall(2.4, () => {
        safetyTimeoutRef.current = null;
        setLoading(false);
        document.querySelectorAll(".route-kontext").forEach((node) => node.remove());
      });
    });
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
