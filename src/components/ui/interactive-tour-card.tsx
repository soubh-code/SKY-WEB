"use client";

import Image from "next/image";
import React, { HTMLAttributes, useRef, useState } from "react";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

interface InteractiveTourCardProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  description: string;
  status: string;
}

function InteractiveTourCard({ className, image, title, description, status, ...props }: InteractiveTourCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    const rotateX = ((y - height / 2) / (height / 2)) * -7;
    const rotateY = ((x - width / 2) / (width / 2)) * 7;

    setStyle({
      transform: `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.035, 1.035, 1.035)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
    });
  };

  return (
    <div
      ref={cardRef}
      className={cn("interactive-tour-card", className)}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <Image src={image} alt="" fill className="interactive-tour-card__image" />
      <span className="interactive-tour-card__aura" />
      <div className="interactive-tour-card__panel">
        <div className="interactive-tour-card__glass">
          <span>
            <strong>{title}</strong>
            <small>{description}</small>
          </span>
          <i>SS</i>
        </div>
        <div className="interactive-tour-card__status">{status}</div>
        <div className="interactive-tour-card__dots" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export { InteractiveTourCard };
