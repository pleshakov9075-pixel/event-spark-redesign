import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePageTransition } from "@/components/PageTransitionProvider";
import { useIsMobile } from "@/hooks/use-mobile";

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
    mobileAccent: string;
    imageFilter: string;
  }
> = {
  host: {
    title: "Ведущий\nВладимир Башмаков",
    subtitle: "живой ритм, эмоция, личный контакт",
    route: "/host",
    bgImage: "/media/landing/home-host-choice.webp",
    clipPath: "polygon(0 0, 59% 0, 43% 100%, 0 100%)",
    accent: "from-[#18283ecc] via-[#111a2fbe] to-[#0b111dd9]",
    mobileAccent: "from-[#1a2a42d6] via-[#121b30ca] to-[#0b101dd9]",
    imageFilter: "saturate(0.92) hue-rotate(-12deg) brightness(0.88)",
  },
  agency: {
    title: "Ивент-агентство\nArtbox",
    subtitle: "концепция, продакшн, премиальная реализация",
    route: "/agency",
    bgImage: "/media/landing/home-agency-choice.webp",
    clipPath: "polygon(59% 0, 100% 0, 100% 100%, 43% 100%)",
    accent: "from-[#2a2017cc] via-[#19161dbf] to-[#111015db]",
    mobileAccent: "from-[#2d2218d4] via-[#1b1821cc] to-[#111016dd]",
    imageFilter: "saturate(1.02) hue-rotate(8deg) brightness(0.9)",
  },
};

const SplitLanding = () => {
  const navigate = useNavigate();
  const { isTransitioning, startTransition } = usePageTransition();
  const isMobile = useIsMobile();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const [hovered, setHovered] = useState<Side | null>(null);
  const [selected, setSelected] = useState<Side | null>(null);
  const [finePointer, setFinePointer] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const query = window.matchMedia("(hover:hover) and (pointer:fine)");
    const sync = () => setFinePointer(query.matches && !isMobile);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [isMobile]);

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
    }, 520);
  };

  const updateCursor = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!finePointer || isMobile) return;
    const bounds = wrapRef.current?.getBoundingClientRect();
    if (!bounds) return;

    setCursor({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      visible: true,
    });
  };

  const sides = Object.keys(sideMeta) as Side[];

  if (isMobile) {
    return (
      <section className="relative min-h-[100svh] overflow-hidden bg-[#07080d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(220,180,118,0.11),transparent_40%),radial-gradient(circle_at_18%_80%,rgba(75,105,150,0.14),transparent_44%)]" />
        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-md flex-col px-4 pb-8 pt-8">
          <p className="text-center text-[10px] uppercase tracking-[0.28em] text-[#b4b7c4]">Выберите направление</p>

          <div className="mt-4 grid gap-4">
            {sides.map((side) => {
              const sideData = sideMeta[side];
              const isSelected = selected === side;
              const isInactive = selected && !isSelected;

              return (
                <motion.button
                  key={side}
                  type="button"
                  onClick={() => triggerRoute(side)}
                  className="interactive relative h-[42svh] min-h-[290px] overflow-hidden rounded-3xl border border-white/10 text-left shadow-[0_16px_40px_rgba(4,5,10,0.45)]"
                  animate={{ opacity: isInactive ? 0 : 1, scale: isSelected ? 1.01 : 1, y: isInactive ? 20 : 0 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={sideData.bgImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ filter: sideData.imageFilter }}
                    loading="eager"
                    decoding="async"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${sideData.mobileAccent}`} />
                  <div className="absolute inset-0 bg-black/35" />

                  <div className={`absolute inset-x-0 bottom-0 z-10 p-5 ${side === "agency" ? "text-right" : ""}`}>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#dfcba4]">
                      {side === "host" ? "Ведущий" : "Агентство"}
                    </p>
                    <h1 className="mt-2 whitespace-pre-line font-display text-[2.3rem] leading-[0.9] tracking-[0.04em] text-[#f4e4c8]">
                      {sideData.title}
                    </h1>
                    <p
                      className={`mt-3 max-w-[16rem] text-[10px] uppercase tracking-[0.16em] text-[#c8cad5] ${
                        side === "agency" ? "ml-auto" : ""
                      }`}
                    >
                      {sideData.subtitle}
                    </p>
                    <span className="mt-4 inline-flex rounded-full border border-[#e2c79066] bg-[#0f1422b8] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#f1ddb5]">
                      Открыть
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={wrapRef}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#07080d]"
      onMouseMove={updateCursor}
      onMouseEnter={() => setCursor((prev) => ({ ...prev, visible: true }))}
      onMouseLeave={() => {
        setCursor((prev) => ({ ...prev, visible: false }));
        if (!selected) setHovered(null);
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(216,180,124,0.14),transparent_45%),radial-gradient(circle_at_12%_85%,rgba(79,111,156,0.16),transparent_46%)]" />

      {sides.map((side) => {
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
            className={`interactive absolute inset-0 overflow-hidden text-left ${finePointer ? "cursor-none" : ""}`}
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
              style={{ filter: sideData.imageFilter }}
              loading="eager"
              decoding="async"
            />
            <div className={`absolute inset-0 bg-gradient-to-b ${sideData.accent}`} />
            <motion.div
              className="absolute inset-0 bg-black/34"
              animate={{
                opacity:
                  hovered && hovered !== side && !selected
                    ? 0.56
                    : isHovered && !selected
                      ? 0.22
                      : 0.34,
              }}
              transition={{ duration: 0.24 }}
            />
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
              className={`absolute top-1/2 z-10 w-[min(34rem,88vw)] -translate-y-1/2 px-8 lg:px-14 ${
                side === "host" ? "left-0 md:left-2" : "right-0 text-right md:right-2"
              }`}
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#d7c5a2]">
                {side === "host" ? "Ведущий" : "Агентство"}
              </p>
              <h1 className="mt-4 whitespace-pre-line font-display text-[clamp(2.2rem,6.2vw,5.6rem)] leading-[0.9] tracking-[0.06em] text-[#f5e5c8]">
                {sideData.title}
              </h1>
              <p className={`mt-5 text-sm uppercase tracking-[0.18em] text-[#c0c1cc] ${side === "agency" ? "ml-auto max-w-[23rem]" : "max-w-[22rem]"}`}>
                {sideData.subtitle}
              </p>
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
