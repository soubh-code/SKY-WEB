"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

const transparentPixel =
  "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

type DeferredPictureProps = {
  src: string;
  tabletSrc?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
  rootMargin?: string;
  eager?: boolean;
};

export function DeferredPicture({
  src,
  tabletSrc,
  alt,
  className,
  imageClassName,
  width,
  height,
  style,
  rootMargin = "600px",
  eager = false,
}: DeferredPictureProps) {
  const pictureRef = useRef<HTMLPictureElement>(null);
  const [hasIntersected, setHasIntersected] = useState(false);
  const shouldLoad = eager || hasIntersected;

  useEffect(() => {
    if (eager) return;

    const picture = pictureRef.current;
    if (!picture) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasIntersected(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(picture);
    return () => observer.disconnect();
  }, [eager, rootMargin]);

  return (
    <picture ref={pictureRef} className={className}>
      {shouldLoad && tabletSrc ? (
        <source
          media="(min-width: 768px) and (max-width: 1199px) and (pointer: coarse), (min-width: 1200px) and (max-width: 1366px) and (max-height: 1199px) and (pointer: coarse)"
          srcSet={tabletSrc}
        />
      ) : null}
      <img
        src={shouldLoad ? src : transparentPixel}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={imageClassName}
        style={style}
      />
    </picture>
  );
}
