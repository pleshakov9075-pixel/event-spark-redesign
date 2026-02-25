import { motion } from "framer-motion";

interface HeroProps {
  backgroundSrc: string;
  onWatchReel: () => void;
}

const Hero = ({ backgroundSrc, onWatchReel }: HeroProps) => {
  return (
    <section id="top" className="relative flex min-h-screen items-end overflow-hidden pt-24 sm:items-center">
      <motion.img
        src={backgroundSrc}
        alt="Владимир Башмаков на мероприятии"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 14, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,16,0.18)_0%,rgba(11,12,16,0.7)_56%,rgba(11,12,16,0.95)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(91,124,255,0.28)_0%,transparent_44%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="mb-6 inline-flex items-center rounded-full border border-white/22 bg-black/25 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/78 sm:text-xs">
            Ижевск • Выезд • Премиальные события
          </p>

          <h1 className="font-editorial text-5xl uppercase leading-[0.93] tracking-[0.04em] text-[#f2f2f2] sm:text-7xl lg:text-8xl">
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
            >
              Владимир
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.55 }}
            >
              Башмаков
            </motion.span>
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/88 sm:text-xl">
            Амбассадор ярких эмоций
          </p>
          <p className="mt-2 max-w-2xl text-sm text-white/62 sm:text-lg">
            Ведущий и шоумен. События, которые помнят.
          </p>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <button
              type="button"
              onClick={onWatchReel}
              className="rounded-full border border-transparent bg-accent px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-accent/85"
            >
              Смотреть шоу-рил
            </button>
            <a
              href="#contacts"
              className="rounded-full border border-white/34 bg-black/24 px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-white/62"
            >
              Связаться
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
