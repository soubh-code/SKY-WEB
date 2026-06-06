"use client";

import { MouseEvent, ReactNode, useState } from "react";
import { createPortal } from "react-dom";

type RouteLoadingLinkProps = {
  href: string;
  pageTitle: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  onNavigate?: () => void;
};

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

    event.preventDefault();
    onNavigate?.();
    setLoading(true);
    window.setTimeout(() => {
      window.location.href = href;
    }, 850);
  };

  return (
    <>
      <a className={className} href={href} aria-label={ariaLabel} onClick={handleClick}>
        {children}
      </a>
      {loading && typeof document !== "undefined" ? createPortal(transition, document.body) : null}
    </>
  );
}
