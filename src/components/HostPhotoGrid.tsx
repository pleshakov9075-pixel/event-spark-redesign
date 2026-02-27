import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { hostPhotoShowcase } from "@/content/siteData";
import { cn } from "@/lib/utils";

const HostPhotoGrid = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const openByIndex = (index: number) => setActiveIndex(index);
  const close = () => setActiveIndex(null);

  const goPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev === 0 ? hostPhotoShowcase.length - 1 : (prev ?? 0) - 1));
  };

  const goNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev === hostPhotoShowcase.length - 1 ? 0 : (prev ?? 0) + 1));
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {hostPhotoShowcase.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => openByIndex(index)}
            className={cn(
              "interactive group relative overflow-hidden rounded-2xl border border-white/10 bg-[#11131b] text-left",
              photo.accent && "lg:col-span-2",
            )}
            aria-label={`Открыть фото: ${photo.title}`}
          >
            <div className={cn("aspect-[4/5] bg-[#0e1118]", photo.accent && "lg:aspect-[16/10]")}>
              <img
                src={photo.src}
                alt={photo.alt}
                className={cn(
                  "h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]",
                  photo.accent && "grayscale",
                )}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#d8c5a0]">Фотоархив</p>
              <p className="mt-1 text-base text-[#f5e7cb]">{photo.title}</p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/88 backdrop-blur-sm"
              onClick={close}
              aria-label="Закрыть фото"
            />

            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-[#0d1018]"
              onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
              onTouchEnd={(event) => {
                if (touchStartX === null) return;
                const endX = event.changedTouches[0]?.clientX ?? touchStartX;
                const delta = endX - touchStartX;
                if (delta > 42) goPrev();
                if (delta < -42) goNext();
                setTouchStartX(null);
              }}
            >
              <div className="flex h-[82vh] items-center justify-center bg-[#090c13] p-3 sm:p-6">
                <img
                  src={hostPhotoShowcase[activeIndex].src}
                  alt={hostPhotoShowcase[activeIndex].alt}
                  className={cn("max-h-full max-w-full object-contain", hostPhotoShowcase[activeIndex].accent && "grayscale")}
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#d2be95]">
                    {activeIndex + 1} / {hostPhotoShowcase.length}
                  </p>
                  <p className="mt-1 text-sm text-[#f5e7cb]">{hostPhotoShowcase[activeIndex].title}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="interactive rounded-full border border-[#d6b57a66] bg-[#111826] p-2 text-[#f2dfbe] hover:bg-[#171e2d]"
                    aria-label="Предыдущее фото"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="interactive rounded-full border border-[#d6b57a66] bg-[#111826] p-2 text-[#f2dfbe] hover:bg-[#171e2d]"
                    aria-label="Следующее фото"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="interactive rounded-full border border-white/20 bg-[#121622] p-2 text-[#d0d3de] hover:border-[#d6b57a66] hover:text-[#f2dfbe]"
                    aria-label="Закрыть"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HostPhotoGrid;
