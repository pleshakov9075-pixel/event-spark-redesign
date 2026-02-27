import { useEffect, useRef, useState, type ReactNode } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePageTransition } from "@/components/PageTransitionProvider";

interface HeroVideoProps {
  src: string;
  poster?: string;
  finalFrameSrc?: string;
  loop?: boolean;
  showFinalFrameOnEnd?: boolean;
  className?: string;
  overlayClassName?: string;
  children?: ReactNode;
}

const HeroVideo = ({
  src,
  poster,
  finalFrameSrc,
  loop = true,
  showFinalFrameOnEnd = false,
  className,
  overlayClassName,
  children,
}: HeroVideoProps) => {
  const { isTransitioning } = usePageTransition();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [ended, setEnded] = useState(false);

  const showFinalFrame = showFinalFrameOnEnd && !loop && ended && Boolean(finalFrameSrc);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isTransitioning) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    setAutoplayBlocked(false);
    setEnded(false);
    video.currentTime = 0;

    const playAttempt = video.play();
    if (playAttempt) {
      playAttempt.catch(() => setAutoplayBlocked(true));
    }
  }, [isTransitioning, src, loop]);

  const handlePlayClick = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setAutoplayBlocked(false);
    } catch {
      setAutoplayBlocked(true);
    }
  };

  return (
    <div className={cn("relative isolate h-full w-full overflow-hidden", className)}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        loop={loop}
        preload="metadata"
        onEnded={() => {
          if (!loop) setEnded(true);
        }}
      />

      {showFinalFrame && finalFrameSrc && (
        <img
          src={finalFrameSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}

      {autoplayBlocked && (
        <button
          type="button"
          onClick={handlePlayClick}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/45 backdrop-blur-[2px]"
          aria-label="Запустить видео"
        >
          <span className="flex items-center gap-2 rounded-full border border-[#f0d8ac66] bg-[#11121abf] px-5 py-3 text-sm uppercase tracking-[0.18em] text-[#f0d8ac]">
            <Play className="h-4 w-4" />
            Play
          </span>
        </button>
      )}

      <div className={cn("pointer-events-none absolute inset-0", overlayClassName)} />
      {children}
    </div>
  );
};

export default HeroVideo;
