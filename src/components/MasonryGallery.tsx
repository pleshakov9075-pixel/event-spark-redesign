import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { MediaItem } from "@/content/media";

interface MasonryGalleryProps {
  photos: MediaItem[];
}

const MasonryGallery = ({ photos }: MasonryGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activePhoto = useMemo(() => {
    if (activeIndex === null) return null;
    return photos[activeIndex] ?? null;
  }, [activeIndex, photos]);

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  const goPrev = () => {
    if (activeIndex === null || !photos.length) return;
    setActiveIndex((activeIndex - 1 + photos.length) % photos.length);
  };

  const goNext = () => {
    if (activeIndex === null || !photos.length) return;
    setActiveIndex((activeIndex + 1) % photos.length);
  };

  return (
    <section id="gallery" className="section-shell">
      <div className="mx-auto max-w-7xl">
        <div className="section-divider" />
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/48">Gallery</p>
            <h2 className="font-editorial mt-3 text-4xl uppercase leading-[0.95] text-white sm:text-6xl">Живые гости</h2>
          </div>
          <p className="max-w-sm text-sm text-white/58">Динамическая masonry-сетка, hover-zoom и lightbox для просмотра ключевых кадров.</p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              className="group mb-4 block w-full overflow-hidden rounded-2xl border border-white/11 bg-white/[0.02]"
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={photo.src}
                alt={`Кадр ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              className="fixed inset-0 z-[9999] bg-black/92 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/26 text-white hover:border-white/62"
                aria-label="Закрыть фото"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex h-full items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/24 text-white hover:border-white/58"
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <motion.img
                  key={activePhoto.id}
                  src={activePhoto.src}
                  alt="Крупный просмотр"
                  className="max-h-[88vh] max-w-[84vw] rounded-2xl border border-white/18 object-contain"
                  initial={{ y: 24, opacity: 0, scale: 0.98 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.2, scale: 0.98 }}
                  transition={{ duration: 0.24 }}
                />

                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/24 text-white hover:border-white/58"
                  aria-label="Следующее фото"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default MasonryGallery;
