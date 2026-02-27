import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedArtboxLogoProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  variant?: "loader" | "hero";
}

const AnimatedArtboxLogo = ({
  src,
  fallbackSrc,
  alt,
  className,
  variant = "hero",
}: AnimatedArtboxLogoProps) => {
  const [resolvedSrc, setResolvedSrc] = useState(src);
  const isLoader = variant === "loader";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 18, filter: "blur(7px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative isolate", className)}
    >
      <motion.div
        className="absolute -inset-3 rounded-[1.7rem] bg-[radial-gradient(circle,rgba(229,196,141,0.3)_0%,rgba(229,196,141,0.12)_34%,transparent_72%)]"
        animate={{
          opacity: isLoader ? [0.48, 0.82, 0.58] : [0.28, 0.55, 0.34],
          scale: isLoader ? [0.98, 1.04, 1] : [0.98, 1.02, 1],
        }}
        transition={{ duration: isLoader ? 1.1 : 2.8, ease: "easeInOut" }}
      />

      <motion.div
        className="relative overflow-hidden rounded-2xl"
        initial={{ clipPath: "inset(0 100% 0 0 round 1rem)" }}
        animate={{ clipPath: "inset(0 0% 0 0 round 1rem)" }}
        transition={{ duration: isLoader ? 0.62 : 0.82, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={resolvedSrc}
          alt={alt}
          className="h-auto w-full"
          loading={isLoader ? "eager" : "lazy"}
          decoding="async"
          onError={() => {
            if (fallbackSrc && resolvedSrc !== fallbackSrc) {
              setResolvedSrc(fallbackSrc);
            }
          }}
        />

        <motion.img
          src={resolvedSrc}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen"
          animate={{
            opacity: isLoader ? [0, 0.62, 0.35] : [0.08, 0.3, 0.14],
            filter: isLoader
              ? ["brightness(1.15) blur(2px)", "brightness(1.45) blur(0px)", "brightness(1.2) blur(0.8px)"]
              : ["brightness(1.05) blur(0px)", "brightness(1.2) blur(0px)", "brightness(1.08) blur(0px)"],
          }}
          transition={{ duration: isLoader ? 0.9 : 2.6, ease: "easeInOut" }}
        />

        <motion.span
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#fff4d2aa] to-transparent"
          animate={{ x: ["-100%", "320%"] }}
          transition={{
            duration: isLoader ? 0.95 : 1.35,
            ease: "easeInOut",
            delay: isLoader ? 0.15 : 0.5,
            repeat: isLoader ? 0 : Infinity,
            repeatDelay: 4.3,
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl border border-[#dcb9793d]"
        animate={{ opacity: isLoader ? [0.2, 0.75, 0.35] : [0.16, 0.36, 0.18] }}
        transition={{ duration: isLoader ? 0.85 : 2.2, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default AnimatedArtboxLogo;
