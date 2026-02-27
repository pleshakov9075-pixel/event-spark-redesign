import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePageTransition } from "@/components/PageTransitionProvider";

type Side = "host" | "agency";

const sideMeta: Record<
  Side,
  {
    title: string;
    subtitle: string;
    route: string;
    bgImage: string;
    clipPath: string;
    accent: string;
  }
> = {
  host: {
    title: "Ведущий\nВладимир Башмаков",
    subtitle: "живой ритм, эмоция, личный контакт",
    route: "/host",
    bgImage: "/images/host-stage.jpg",
    clipPath: "polygon(0 0, 59% 0, 43% 100%, 0 100%)",
    accent: "from-[#1f3147a6] to-[#0d1119e6]",
  },
  agency: {
    title: "Ивент-агентство\nArtbox",
    subtitle: "концепция, продакшн, премиальная реализация",
    route: "/agency",
    bgImage: "/images/agency-work.jpg",
    clipPath: "polygon(59% 0, 100% 0, 100% 100%, 43% 100%)",
    accent: "from-[#1f1712cc] to-[#111015db]",
  },
};

const SplitLanding = () => {
  const navigate = useNavigate();
  const { isTransitioning, startTransition } = usePageTransition();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const [hovered, setHovered] = useState<Side | null>(null);
  const [selected, setSelected] = useState<Side | null>(null);
  const [finePointer, setFinePointer] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const query = window.matchMedia("(pointer:fine)");
    const sync = () => setFinePointer(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const triggerRoute = (side: Side) => {
    if (selected || isTransitioning) return;

    setSelected(side);
    timeoutRef.current = window.setTimeout(() => {
      startTransition({
        variant: side,
        onReady: () => navigate(sideMeta[side].route),
      });
    }, 560);
  };

  const updateCursor = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!finePointer) return;
    const bounds = wrapRef.current?.getBoundingClientRect();
    if (!bounds) return;

    setCursor({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      visible: true,
    });
  };

  return (
    <section
      ref={wrapRef}
      className="relative h-screen min-h-[640px] overflow-hidden bg-[#07080d]"
      onMouseMove={updateCursor}
      onMouseEnter={() => setCursor((prev) => ({ ...prev, visible: true }))}
      onMouseLeave={() => {
        setCursor((prev) => ({ ...prev, visible: false }));
        if (!selected) setHovered(null);
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(216,180,124,0.14),transparent_45%),radial-gradient(circle_at_12%_85%,rgba(79,111,156,0.16),transparent_46%)]" />

      {(Object.keys(sideMeta) as Side[]).map((side) => {
        const isHovered = hovered === side;
        const isSelected = selected === side;
        const isInactive = selected && !isSelected;
        const sideData = sideMeta[side];

        return (
          <motion.button
            key={side}
            type="button"
            initial={false}
            onMouseEnter={() => !selected && setHovered(side)}
            onFocus={() => !selected && setHovered(side)}
            onMouseLeave={() => !selected && setHovered(null)}
            onClick={() => triggerRoute(side)}
            className="interactive absolute inset-0 cursor-none overflow-hidden text-left"
            style={{ clipPath: sideData.clipPath }}
            animate={{
              clipPath: isSelected ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : sideData.clipPath,
              opacity: isInactive ? 0 : 1,
              scale: isHovered && !selected ? 1.01 : 1,
            }}
            transition={{ duration: isSelected ? 0.56 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={sideData.bgImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              animate={{ scale: isHovered && !selected ? 1.06 : 1 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              loading="eager"
              decoding="async"
            />
            <div className={`absolute inset-0 bg-gradient-to-b ${sideData.accent}`} />
            <div className="absolute inset-0 bg-black/34" />
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: isHovered && !selected ? 1 : 0 }}
              transition={{ duration: 0.24 }}
              style={{
                background:
                  side === "host"
                    ? "radial-gradient(circle at 30% 40%, rgba(207,169,109,0.2), transparent 46%)"
                    : "radial-gradient(circle at 70% 40%, rgba(230,196,140,0.2), transparent 46%)",
              }}
            />

            <div
              className={`absolute top-1/2 z-10 w-[min(36rem,92vw)] -translate-y-1/2 px-8 sm:px-14 ${
                side === "host" ? "left-0 sm:left-4" : "right-0 text-right sm:right-4"
              }`}
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#d7c5a2]">{side === "host" ? "Host" : "Agency"}</p>
              <h1 className="mt-4 whitespace-pre-line font-display text-5xl leading-[0.9] tracking-[0.06em] text-[#f5e5c8] sm:text-7xl">
                {sideData.title}
              </h1>
              <p className="mt-5 max-w-[22rem] text-sm uppercase tracking-[0.18em] text-[#c0c1cc] sm:text-[13px]">{sideData.subtitle}</p>
            </div>
          </motion.button>
        );
      })}

      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#e1c89480] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-20 text-center text-[10px] uppercase tracking-[0.28em] text-[#a7a9b5] sm:text-xs">
        выберите направление
      </div>

      {finePointer && hovered && !selected && (
        <motion.div
          className="pointer-events-none absolute z-30"
          animate={{
            opacity: cursor.visible ? 1 : 0,
            x: cursor.x - 46,
            y: cursor.y - 46,
            scale: hovered ? 1 : 0.92,
          }}
          transition={{ type: "spring", stiffness: 360, damping: 28, mass: 0.4 }}
        >
          <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full border border-[#efd8ab70] bg-[#11131db3] text-[10px] uppercase tracking-[0.22em] text-[#efd8ab]">
            Выбрать
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default SplitLanding;
