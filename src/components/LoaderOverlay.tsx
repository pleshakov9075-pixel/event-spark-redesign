import { AnimatePresence, motion } from "framer-motion";
import AnimatedArtboxLogo from "@/components/AnimatedArtboxLogo";
import { agencyHero } from "@/content/siteData";

export type LoaderPhase = "idle" | "enter" | "hold" | "exit";
export type LoaderVariant = "neutral" | "host" | "agency";

interface LoaderOverlayProps {
  phase: LoaderPhase;
  variant: LoaderVariant;
}

const paletteByVariant: Record<LoaderVariant, { panel: string; text: string; glow: string; originX: number }> = {
  host: {
    panel: "from-[#0C1019] via-[#101A2A] to-[#1A2A3C]",
    text: "text-[#E7C992]",
    glow: "shadow-[0_0_50px_rgba(231,201,146,0.32)]",
    originX: 0,
  },
  agency: {
    panel: "from-[#0C0C10] via-[#18161E] to-[#241D17]",
    text: "text-[#F4E3BE]",
    glow: "shadow-[0_0_55px_rgba(244,227,190,0.35)]",
    originX: 1,
  },
  neutral: {
    panel: "from-[#0A0A0D] via-[#13141B] to-[#1B1D27]",
    text: "text-[#E6D4B0]",
    glow: "shadow-[0_0_40px_rgba(230,212,176,0.25)]",
    originX: 0.5,
  },
};

const HostSymbol = ({ phase }: { phase: LoaderPhase }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.96 }}
    animate={{
      opacity: phase === "exit" ? 0 : 1,
      y: phase === "exit" ? -14 : 0,
      scale: phase === "exit" ? 0.95 : 1,
    }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className="relative overflow-hidden rounded-2xl border border-[#d4b17366] px-8 py-6 text-center"
  >
    <span className="block text-xs uppercase tracking-[0.45em] text-[#c9b08a]">Host</span>
    <span className="mt-2 block font-display text-5xl leading-none tracking-[0.1em] text-[#f3dfbb]">VB</span>
    <span className="mt-1 block text-[11px] uppercase tracking-[0.36em] text-[#d4c3a1]">Vladimir Bashmakov</span>
  </motion.div>
);

const AgencySymbol = ({ phase }: { phase: LoaderPhase }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.96 }}
    animate={{
      opacity: phase === "exit" ? 0 : 1,
      y: phase === "exit" ? -14 : 0,
      scale: phase === "exit" ? 0.95 : 1,
    }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className="relative rounded-2xl border border-[#d6b57a5a] bg-[#0f0d11]/70 p-3 backdrop-blur-sm"
  >
    <AnimatedArtboxLogo
      src={agencyHero.logo}
      fallbackSrc={agencyHero.logoFallback}
      alt="Artbox logo"
      variant="loader"
      className="w-[230px] max-w-[62vw]"
    />
  </motion.div>
);

const NeutralSymbol = ({ phase }: { phase: LoaderPhase }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: phase === "exit" ? 0 : 1, y: phase === "exit" ? -10 : 0 }}
    transition={{ duration: 0.4 }}
    className="text-center"
  >
    <span className="block text-[10px] uppercase tracking-[0.5em] text-[#cdb58c]">Choose Direction</span>
    <div className="mt-2 flex items-center gap-4 text-[#f0dcb5]">
      <span className="font-display text-4xl tracking-[0.08em]">VB</span>
      <span className="h-px w-8 bg-[#e2c99988]" />
      <span className="font-display text-4xl tracking-[0.08em]">ARTBOX</span>
    </div>
  </motion.div>
);

const LoaderOverlay = ({ phase, variant }: LoaderOverlayProps) => {
  const visible = phase !== "idle";
  const palette = paletteByVariant[variant];
  const showExit = phase === "exit";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader-overlay"
          className="fixed inset-0 z-[120] isolate overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.28 } }}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-[4px]" />

          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${palette.panel}`}
            style={{ originX: palette.originX }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showExit ? 0 : 1 }}
            transition={{
              duration: showExit ? 0.7 : 0.58,
              ease: showExit ? [0.78, 0, 0.22, 1] : [0.22, 1, 0.36, 1],
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className={`relative ${palette.text} ${palette.glow}`}
              animate={{ opacity: showExit ? 0 : 1 }}
              transition={{ duration: 0.28 }}
            >
              {variant === "host" && <HostSymbol phase={phase} />}
              {variant === "agency" && <AgencySymbol phase={phase} />}
              {variant === "neutral" && <NeutralSymbol phase={phase} />}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderOverlay;
