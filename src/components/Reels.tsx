import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { MediaItem } from "@/content/media";

interface ReelsProps {
  videos: MediaItem[];
  openSignal: number;
}

const Reels = ({ videos, openSignal }: ReelsProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeVideo = useMemo(() => {
    if (activeIndex === null) return null;
    return videos[activeIndex] ?? null;
  }, [activeIndex, videos]);

  useEffect(() => {
    if (!videos.length || openSignal < 1) return;
    setActiveIndex(0);
  }, [openSignal, videos]);

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
    if (activeIndex === null || !videos.length) return;
    setActiveIndex((activeIndex - 1 + videos.length) % videos.length);
  };

  const goNext = () => {
    if (activeIndex === null || !videos.length) return;
    setActiveIndex((activeIndex + 1) % videos.length);
  };

  return (
    <section id="reels" className="section-shell">
      <div className="mx-auto max-w-7xl">
        <div className="section-divider" />
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/48">Reels</p>
            <h2 className="font-editorial mt-3 text-4xl uppercase leading-[0.95] text-white sm:text-6xl">Энергия в кадре</h2>
          </div>
          <div className="space-y-1 text-sm text-white/58">
            {videos.length > 0 ? (
              <>
                <p className="max-w-md">Горизонтальная лента с вертикальными роликами. Нажмите на любой кадр, чтобы открыть полноэкранный просмотр.</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/42">{videos.length} видео в шоу-риле</p>
              </>
            ) : (
              <>
                <p className="max-w-md">Видео-блок временно обновляется. Ниже оставлена структура секции и навигация по будущим выпускам.</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/42">showreel update</p>
              </>
            )}
          </div>
        </div>

        {videos.length > 0 ? (
          <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-6">
            {videos.map((video, index) => (
              <motion.button
                key={video.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.24 }}
                className="group relative aspect-[9/16] w-[190px] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/16 bg-[#111318] sm:w-[230px]"
              >
                <video
                  src={video.src}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,16,0.02)_0%,rgba(11,12,16,0.7)_100%)]" />
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full border border-white/22 bg-black/34 px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-white/82">
                  <span>Reel {String(index + 1).padStart(2, "0")}</span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/35">
                    <Play className="h-3.5 w-3.5 fill-white text-white" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-white/16 bg-[linear-gradient(155deg,rgba(91,124,255,0.2)_0%,rgba(17,19,24,0.86)_62%)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(255,255,255,0.2)_0%,transparent_40%)]" />
                <div className="absolute inset-x-3 bottom-3 rounded-full border border-white/22 bg-black/34 px-3 py-2 text-center text-[10px] uppercase tracking-[0.14em] text-white/82">
                  Reel скоро
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/28 text-white transition-colors hover:border-white/62"
              aria-label="Закрыть видео"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/22 text-white hover:border-white/56"
                aria-label="Предыдущее видео"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <motion.video
                key={activeVideo.id}
                src={activeVideo.src}
                className="max-h-[90vh] w-auto max-w-[86vw] rounded-2xl border border-white/14"
                controls
                autoPlay
                playsInline
                initial={{ y: 30, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ duration: 0.24 }}
              />

              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/22 text-white hover:border-white/56"
                aria-label="Следующее видео"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Reels;
