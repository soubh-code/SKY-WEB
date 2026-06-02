"use client";

import React, { HTMLAttributes, useEffect, useState } from "react";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

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

export interface GalleryItem {
  name: string;
  location: string;
  year: string;
  configuration: string;
  coordinates: string;
  image: string;
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

            return (
              <button
                type="button"
                key={item.name}
                className={cn("circular-gallery__item", isActive && "is-active")}
                aria-label={`Show ${item.name}`}
                onClick={() => onItemSelect?.(index)}
                style={
                  {
                    "--item-transform": `rotateY(${itemAngle}deg) translateZ(${radius}px) rotateY(${-itemAngle}deg) scale(${scale})`,
                    "--item-opacity": opacity,
                    "--item-z": Math.round(1000 - normalizedAngle),
                    pointerEvents: opacity < 0.08 ? "none" : "auto",
                  } as React.CSSProperties
                }
              >
                <span className="circular-gallery__image-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={`${item.name} project`} style={{ objectPosition: item.imagePosition || "center" }} />
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
