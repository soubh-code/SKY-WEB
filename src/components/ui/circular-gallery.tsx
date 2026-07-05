"use client";

import React, { HTMLAttributes, useEffect, useState } from "react";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");
const roundTo = (value: number, precision = 100) => Math.round(value * precision) / precision;

const getTowerOcclusion = (angle: number) => {
  const fadeInStart = 158;
  const hiddenStart = 166;
  const hiddenEnd = 202;
  const fadeOutEnd = 212;

  if (angle <= fadeInStart || angle >= fadeOutEnd) {
    return 1;
  }

  if (angle >= hiddenStart && angle <= hiddenEnd) {
    return 0;
  }

  if (angle < hiddenStart) {
    return 1 - (angle - fadeInStart) / (hiddenStart - fadeInStart);
  }

  return (angle - hiddenEnd) / (fadeOutEnd - hiddenEnd);
};

const getMobileOpacity = (relativeAngle: number, normalizedAngle: number) => {
  const behindTower = relativeAngle >= 162 && relativeAngle <= 208;

  if (behindTower) {
    return 0;
  }

  if (normalizedAngle <= 100) {
    return 1;
  }

  if (normalizedAngle <= 142) {
    return 0.62;
  }

  return 0.34;
};

const getMobileTransform = (relativeAngle: number, radius: number, isActive: boolean) => {
  const radians = (relativeAngle * Math.PI) / 180;
  const depth = (Math.cos(radians) + 1) / 2;
  const x = roundTo(Math.sin(radians) * radius * 0.92, 10);
  const y = roundTo((1 - depth) * 20, 10);
  const scale = roundTo(isActive ? 1 : 0.82 + depth * 0.16, 1000);

  return {
    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
    zIndex: Math.round(800 + depth * 220),
  };
};

export interface GalleryItem {
  name: string;
  location: string;
  year: string;
  configuration: string;
  coordinates: string;
  image: string;
  imageAlt?: string;
  imagePosition?: string;
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  rotation?: number;
  radius?: number;
  activeIndex?: number;
  onItemSelect?: (index: number) => void;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, rotation = 0, radius = 560, activeIndex = 0, onItemSelect, ...props }, ref) => {
    const anglePerItem = 360 / items.length;
    const [isMobileGallery, setIsMobileGallery] = useState(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 560px)");
      const updateMobileState = () => setIsMobileGallery(mediaQuery.matches);

      updateMobileState();
      mediaQuery.addEventListener("change", updateMobileState);

      return () => mediaQuery.removeEventListener("change", updateMobileState);
    }, []);

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Sky Skrabers circular project gallery"
        className={cn("circular-gallery", className)}
        {...props}
      >
        <div className="circular-gallery__stage">
          {items.map((item, index) => {
            const itemAngle = index * anglePerItem + rotation;
            const relativeAngle = ((itemAngle % 360) + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const isActive = index === activeIndex;
            const depthOpacity = normalizedAngle <= 72 ? 1 : Math.max(0.18, 1 - (normalizedAngle - 72) / 86);
            const towerOcclusion = getTowerOcclusion(relativeAngle);
            const opacity = isMobileGallery
              ? getMobileOpacity(relativeAngle, normalizedAngle)
              : depthOpacity * towerOcclusion;
            const scale = isActive ? 1 : 0.84 + (1 - normalizedAngle / 180) * 0.1;
            const displayAngle = isMobileGallery ? roundTo(itemAngle, 10) : itemAngle;
            const displayScale = isMobileGallery ? roundTo(scale, 100) : scale;
            const mobileTransform = isMobileGallery ? getMobileTransform(relativeAngle, radius, isActive) : null;

            return (
              <button
                type="button"
                key={item.name}
                className={cn("circular-gallery__item", isActive && "is-active")}
                aria-label={`Show ${item.name}`}
                data-analytics-event="property_card_click"
                data-analytics-label={`${item.name} completed project gallery card`}
                onClick={() => onItemSelect?.(index)}
                style={
                  {
                    "--item-transform": mobileTransform?.transform ?? `rotateY(${displayAngle}deg) translateZ(${radius}px) rotateY(${-displayAngle}deg) scale(${displayScale})`,
                    "--item-opacity": opacity,
                    "--item-z": mobileTransform?.zIndex ?? Math.round(1000 - normalizedAngle),
                    pointerEvents: opacity < 0.08 ? "none" : "auto",
                  } as React.CSSProperties
                }
              >
                <span className="circular-gallery__image-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.imageAlt ?? `${item.name} premium South Delhi project by Sky Skrabers`}
                    style={{ objectPosition: item.imagePosition || "center" }}
                  />
                </span>
                <span className="circular-gallery__shade" />
                <span className="circular-gallery__content">
                  <strong>{item.name}</strong>
                  <em>{item.location}</em>
                  <span>{item.year} · {item.configuration}</span>
                  <span>{item.coordinates}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
