import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { brandAssets } from "@/content/siteData";

interface BrandLogoProps {
  className?: string;
  alt?: string;
  priority?: boolean;
}

const BrandLogo = ({ className, alt = "Логотип Artbox", priority = false }: BrandLogoProps) => {
  const [fallbackToSvg, setFallbackToSvg] = useState(false);

  const sources = useMemo(
    () =>
      fallbackToSvg
        ? [brandAssets.logoFallback]
        : [brandAssets.logoWebp, brandAssets.logoPng, brandAssets.logoFallback],
    [fallbackToSvg],
  );

  return (
    <picture className={cn("block", className)}>
      {!fallbackToSvg && <source srcSet={brandAssets.logoWebp} type="image/webp" />}
      <img
        src={sources[1] ?? sources[0]}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-auto w-full object-contain select-none"
        onError={() => setFallbackToSvg(true)}
      />
    </picture>
  );
};

export default BrandLogo;
