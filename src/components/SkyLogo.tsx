import Image from "next/image";

type SkyLogoProps = {
  centered?: boolean;
  className?: string;
  priority?: boolean;
};

export function SkyLogo({ centered = false, className, priority = false }: SkyLogoProps) {
  const classes = [centered ? "brand-logo brand-logo--center" : "brand-logo", className].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      <Image
        src="/assets/brand-logo-white.png"
        alt="Sky Skrabers"
        width={349}
        height={193}
        priority={priority}
        className="brand-logo__image"
      />
    </span>
  );
}
