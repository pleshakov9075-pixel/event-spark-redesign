import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, .interactive")) {
        setIsHovering(true);
      }
    };

    const handleOut = () => setIsHovering(false);
    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Hide on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <>
      {/* Flashlight */}
      <div
        className="flashlight hidden md:block"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: pos.x - (isHovering ? 20 : 6),
          y: pos.y - (isHovering ? 20 : 6),
          width: isHovering ? 40 : 12,
          height: isHovering ? 40 : 12,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{
          borderRadius: "50%",
          border: `2px solid hsl(var(--primary))`,
          backgroundColor: isHovering ? "hsl(var(--primary) / 0.1)" : "hsl(var(--primary) / 0.4)",
        }}
      />
    </>
  );
};

export default CustomCursor;
