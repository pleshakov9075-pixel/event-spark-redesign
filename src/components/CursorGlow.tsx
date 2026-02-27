import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CursorGlow = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(hover:hover) and (pointer:fine) and (min-width:1024px)");
    const updateEnabled = () => setEnabled(finePointerQuery.matches);
    updateEnabled();

    finePointerQuery.addEventListener("change", updateEnabled);
    return () => finePointerQuery.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      setVisible(true);
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const onLeave = () => setVisible(false);
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, .interactive")) {
        setHoveringInteractive(true);
      }
    };
    const onOut = () => setHoveringInteractive(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[90] rounded-full"
        animate={{
          opacity: visible ? 1 : 0,
          x: position.x - (hoveringInteractive ? 85 : 70),
          y: position.y - (hoveringInteractive ? 85 : 70),
          width: hoveringInteractive ? 170 : 140,
          height: hoveringInteractive ? 170 : 140,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.45 }}
        style={{
          background:
            "radial-gradient(circle, rgba(225,189,130,0.24) 0%, rgba(225,189,130,0.1) 38%, rgba(0,0,0,0) 72%)",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[91] rounded-full border border-[#e7c791]"
        animate={{
          opacity: visible ? 0.85 : 0,
          x: position.x - (hoveringInteractive ? 15 : 6),
          y: position.y - (hoveringInteractive ? 15 : 6),
          width: hoveringInteractive ? 30 : 12,
          height: hoveringInteractive ? 30 : 12,
        }}
        transition={{ type: "spring", stiffness: 520, damping: 35, mass: 0.45 }}
      />
    </>
  );
};

export default CursorGlow;
