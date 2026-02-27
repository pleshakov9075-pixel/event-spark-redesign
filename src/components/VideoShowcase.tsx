import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, X } from "lucide-react";

type VideoItem = {
  id: string;
  title: string;
  src: string;
  poster: string;
};

interface VideoShowcaseProps {
  items: VideoItem[];
  subtitle?: string;
}

const VideoShowcase = ({ items, subtitle }: VideoShowcaseProps) => {
  const [active, setActive] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = async () => {
    const node = videoRef.current;
    if (!node) return;

    if (node.paused) {
      await node.play().catch(() => undefined);
      setIsPlaying(true);
      return;
    }

    node.pause();
    setIsPlaying(false);
  };

  return (
    <>
      {subtitle && <p className="mt-3 max-w-2xl text-sm text-[#afb2bf]">{subtitle}</p>}

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {items.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => {
              setActive(video);
              setIsPlaying(true);
              setProgress(0);
            }}
            className="interactive group relative overflow-hidden rounded-2xl border border-white/10 bg-[#11131b] text-left"
            aria-label={`Открыть видео: ${video.title}`}
          >
            <img
              src={video.poster}
              alt={video.title}
              className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/28 to-transparent" />
            <div className="absolute left-5 top-5 rounded-full border border-[#d6b57a80] bg-[#111826b3] p-2 text-[#f3e2c2]">
              <Play className="h-4 w-4 fill-current" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[#d5c4a0]">Смотреть</p>
              <p className="mt-1 text-2xl text-[#f4e4c5]">{video.title}</p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/88 backdrop-blur-sm"
              onClick={() => setActive(null)}
              aria-label="Закрыть видео"
            />

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-black"
            >
              <video
                ref={videoRef}
                src={active.src}
                poster={active.poster}
                className="aspect-video w-full bg-black object-contain"
                autoPlay
                playsInline
                preload="metadata"
                controls={false}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={(event) => {
                  const node = event.currentTarget;
                  if (!node.duration) return;
                  setProgress((node.currentTime / node.duration) * 100);
                }}
              />

              <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-[#080b11f2] px-4 py-3 sm:px-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#d5c4a0]">Видео</p>
                  <p className="text-sm text-[#f4e4c5]">{active.title}</p>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="interactive rounded-full border border-[#d6b57a66] bg-[#101624] p-2 text-[#f3e2c2] hover:bg-[#161d2d]"
                    aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                  </button>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#2a2f3e]">
                    <motion.div className="h-full bg-[#d6b57a]" animate={{ width: `${progress}%` }} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="interactive rounded-full border border-white/20 bg-[#11131b] p-2 text-[#d3d6df] hover:border-[#d6b57a66] hover:text-[#f3e2c2]"
                    aria-label="Закрыть"
                  >
                    <X className="h-4 w-4" />
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

export default VideoShowcase;
