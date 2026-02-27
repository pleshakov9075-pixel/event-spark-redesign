import { AnimatePresence, motion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";

export type LoaderPhase = "idle" | "enter" | "hold" | "exit";
export type LoaderVariant = "neutral" | "host" | "agency";

interface LoaderOverlayProps {
  phase: LoaderPhase;
  variant: LoaderVariant;
}

const gradientByVariant: Record<LoaderVariant, string> = {
  neutral: "from-[#06080f] via-[#0a1221] to-[#11161f]",
  host: "from-[#050912] via-[#0a1529] to-[#141d2b]",
  agency: "from-[#06080f] via-[#111522] to-[#1e1a14]",
};

const LoaderOverlay = ({ phase, variant }: LoaderOverlayProps) => {
  const visible = phase !== "idle";
  const showExit = phase === "exit";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader-overlay"
          className="fixed inset-0 z-[120] isolate overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.26 } }}
        >
          <div className="absolute inset-0 bg-black/80" />
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${gradientByVariant[variant]}`}
            initial={{ opacity: 0.9, scale: 1.03 }}
            animate={{ opacity: showExit ? 0.66 : 1, scale: showExit ? 1.08 : 1 }}
            transition={{ duration: showExit ? 0.52 : 0.46, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="absolute inset-0 flex items-center justify-center px-6">
            <motion.div
              className="w-[min(540px,92vw)]"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: showExit ? 0 : 1, y: showExit ? -8 : 0, scale: showExit ? 0.98 : 1 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <BrandLogo className="mx-auto w-full max-w-[430px]" priority alt="Логотип Artbox" />
              <motion.div
                className="mx-auto mt-5 h-px w-[72%] max-w-[280px] bg-gradient-to-r from-transparent via-[#e2c790] to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: showExit ? 0.4 : 1, opacity: showExit ? 0 : 0.9 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderOverlay;
