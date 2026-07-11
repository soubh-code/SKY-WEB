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
}: DeferredPictureProps) {
  const pictureRef = useRef<HTMLPictureElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const picture = pictureRef.current;
    if (!picture) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(picture);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <picture ref={pictureRef} className={className}>
      {shouldLoad && tabletSrc ? (
        <source
          media="(min-width: 768px) and (max-width: 1199px) and (pointer: coarse), (min-width: 1200px) and (max-width: 1366px) and (max-height: 1199px) and (pointer: coarse)"
          srcSet={tabletSrc}
        />
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shouldLoad ? src : transparentPixel}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={imageClassName}
        style={style}
      />
    </picture>
  );
}
