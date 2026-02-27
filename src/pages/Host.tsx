import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import HeroVideo from "@/components/HeroVideo";
import ScrollReveal from "@/components/ScrollReveal";
import SiteLayout from "@/components/SiteLayout";
import { cn } from "@/lib/utils";
import {
  hostHero,
  hostPhotoShowcase,
  hostVideoTiles,
  siteContacts,
} from "@/content/siteData";

const services = [
  { title: "Свадьбы", description: "Авторская драматургия вечера, мягкий темп и живые интерактивы." },
  { title: "Корпоративы", description: "Энергия, командная динамика и интеллигентный юмор без перегруза." },
  { title: "Частные события", description: "Камерные ужины, юбилеи и вечера, где важна атмосфера и такт." },
  { title: "Форумы и премии", description: "Сценическая уверенность, работа с аудиторией и точный тайминг." },
];

const testimonials = [
  {
    author: "Екатерина",
    text: "Владимир дал ощущение, что весь вечер выстроен точно под нас. Легко, стильно, без пауз и неловкости.",
  },
  {
    author: "Андрей",
    text: "Редкое сочетание: интеллигентный юмор, энергия и чувство меры. Гости после мероприятия отдельно писали слова благодарности.",
  },
  {
    author: "Марина",
    text: "Не было ни одного шаблонного момента. Всё звучало живо и персонально, а праздник пролетел на одном дыхании.",
  },
];

const Host = () => {
  const [activeVideo, setActiveVideo] = useState<(typeof hostVideoTiles)[number] | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const goToPrevPhoto = () =>
    setCurrentPhoto((prev) => (prev === 0 ? hostPhotoShowcase.length - 1 : prev - 1));
  const goToNextPhoto = () =>
    setCurrentPhoto((prev) => (prev === hostPhotoShowcase.length - 1 ? 0 : prev + 1));

  return (
    <SiteLayout branch="host" ctaLabel="Связаться" ctaHref="#host-cta">
      <section className="relative min-h-[calc(100vh-4rem)]">
        <HeroVideo
          src={hostHero.video}
          poster={hostHero.poster}
          finalFrameSrc={hostHero.finalFrame}
          loop
          showFinalFrameOnEnd={false}
          overlayClassName="bg-[linear-gradient(180deg,rgba(6,7,11,0.22)_0%,rgba(8,10,15,0.74)_70%,rgba(8,10,15,0.95)_100%)]"
        >
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-6xl leading-[0.9] tracking-[0.06em] text-[#f7e8ca] sm:text-8xl"
              >
                Владимир Башмаков
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 max-w-2xl text-sm uppercase tracking-[0.2em] text-[#d4c39f] sm:text-base"
              >
                ведущий, продюсер эмоций, амбассадор ярких событий
              </motion.p>
            </div>
          </div>
        </HeroVideo>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal>
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-[#c6b18b]">О Владимире</p>
              <h2 className="mt-3 font-display text-5xl leading-[0.92] tracking-[0.06em] text-[#f4e3c3] sm:text-6xl">
                Мероприятия, которые запоминают сердцем
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p className="text-base leading-relaxed text-[#b3b6c4]">
              Работаю с аудиторией более 15 лет. Беру на себя ритм события, собираю внимание гостей и сохраняю
              лёгкость вечера. Вместо формальностей создаю живую историю, где каждый чувствует себя на своём месте.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#0d1018] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <ScrollReveal>
              <div>
                <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Фото</h3>
                <div className="mt-3 max-w-2xl text-sm leading-relaxed text-[#aeb2c1]">
                  Акцентный кадр открывает блок, остальные фото идут полноформатной лентой слева направо.
                </div>
              </div>
            </ScrollReveal>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrevPhoto}
                className="interactive rounded-full border border-[#d6b57a55] bg-[#121521] p-2 text-[#e7d2ac] hover:bg-[#181c2a]"
                aria-label="Листать фото влево"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goToNextPhoto}
                className="interactive rounded-full border border-[#d6b57a55] bg-[#121521] p-2 text-[#e7d2ac] hover:bg-[#181c2a]"
                aria-label="Листать фото вправо"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-7 overflow-hidden rounded-3xl border border-white/10 bg-[#11131b]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={hostPhotoShowcase[currentPhoto].src}
                initial={{ opacity: 0, x: 42 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -42 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <div className="flex h-[62vh] min-h-[380px] items-center justify-center bg-[#0f121a] p-4 sm:h-[70vh] sm:p-8">
                  <img
                    src={hostPhotoShowcase[currentPhoto].src}
                    alt={hostPhotoShowcase[currentPhoto].alt}
                    className={cn(
                      "h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]",
                      hostPhotoShowcase[currentPhoto].accent && "grayscale",
                    )}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/76 via-black/22 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-4 sm:p-7">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#d8c5a0]">Host archive</p>
                    <p className="mt-1 text-base text-[#f5e7cb] sm:text-xl">{hostPhotoShowcase[currentPhoto].label}</p>
                  </div>
                  {hostPhotoShowcase[currentPhoto].accent && (
                    <span className="rounded-full border border-[#d8bb8899] bg-[#d8bb8824] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f2dfbe]">
                      Accent
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
            <div className="flex items-center justify-between border-t border-white/10 bg-[#0f121acc] px-4 py-3 sm:px-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#b7ab90]">
                {String(currentPhoto + 1).padStart(2, "0")} / {String(hostPhotoShowcase.length).padStart(2, "0")}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrevPhoto}
                  className="interactive rounded-full border border-[#d6b57a55] bg-[#121521] p-2 text-[#e7d2ac] hover:bg-[#181c2a]"
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goToNextPhoto}
                  className="interactive rounded-full border border-[#d6b57a55] bg-[#121521] p-2 text-[#e7d2ac] hover:bg-[#181c2a]"
                  aria-label="Следующее фото"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Видео</h3>
          </ScrollReveal>
          <div className="mt-7 space-y-6">
            <ScrollReveal>
              <button
                type="button"
                onClick={() => setActiveVideo(hostVideoTiles[0])}
                className="interactive group relative w-full overflow-hidden rounded-3xl border border-[#d6b57a4d] bg-[#11131b] text-left shadow-[0_24px_70px_rgba(0,0,0,0.4)]"
              >
                <video
                  src={hostVideoTiles[0].src}
                  poster={hostVideoTiles[0].poster}
                  className="aspect-[16/8.6] min-h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:min-h-[440px]"
                  muted
                  loop
                  playsInline
                  preload="none"
                  onMouseEnter={(event) => {
                    event.currentTarget.play().catch(() => undefined);
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.pause();
                    event.currentTarget.currentTime = 0;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#d5c4a0]">Смотреть</p>
                  <p className="mt-1 text-3xl text-[#f4e4c5] sm:text-5xl">{hostVideoTiles[0].title}</p>
                </div>
              </button>
            </ScrollReveal>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {hostVideoTiles.slice(1).map((video, index) => (
                <ScrollReveal key={video.src} delay={index * 0.05}>
                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className="interactive group relative overflow-hidden rounded-2xl border border-white/10 bg-[#11131b] text-left"
                  >
                    <video
                      src={video.src}
                      poster={video.poster}
                      className="aspect-[16/10] min-h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:min-h-[320px]"
                      muted
                      loop
                      playsInline
                      preload="none"
                      onMouseEnter={(event) => {
                        event.currentTarget.play().catch(() => undefined);
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.pause();
                        event.currentTarget.currentTime = 0;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/24 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#d5c4a0]">Смотреть</p>
                      <p className="mt-1 text-2xl text-[#f4e4c5]">{video.title}</p>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0d1018] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Форматы и услуги</h3>
          </ScrollReveal>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.05}>
                <article className="rounded-2xl border border-white/10 bg-[#11131bd1] p-6">
                  <h4 className="font-display text-3xl tracking-[0.05em] text-[#f5e6c8]">{service.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#afb1be]">{service.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Отзывы</h3>
          </ScrollReveal>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <ScrollReveal key={item.author} delay={index * 0.05}>
                <article className="rounded-2xl border border-white/10 bg-[#10131bcc] p-5">
                  <p className="text-sm leading-relaxed text-[#b5b8c6]">{item.text}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#dfcaa0]">{item.author}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="host-cta" className="bg-[#0d1018] px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-3xl text-center">
          <ScrollReveal>
            <h3 className="font-display text-5xl tracking-[0.08em] text-[#f3e1bf] sm:text-6xl">Связаться / Оставить заявку</h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#aeb2c1]">
              Напишите в мессенджер или позвоните. Обсудим формат события и предложим сценарий под ваш вечер.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={siteContacts.phoneLink}
                className="interactive rounded-full border border-[#d6b57a80] bg-[#d6b57a1f] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#f5e7cb] transition-colors hover:bg-[#d6b57a33]"
              >
                Позвонить
              </a>
              <a
                href={siteContacts.emailLink}
                className="interactive rounded-full border border-white/20 bg-[#141722] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#d6d8e2] transition-colors hover:border-[#d6b57a66] hover:text-[#f5e7cb]"
              >
                Написать
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setActiveVideo(null)}
              aria-label="Закрыть видео"
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.28 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-black"
            >
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="interactive absolute right-3 top-3 z-10 rounded-full border border-white/35 bg-black/60 p-2 text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <video src={activeVideo.src} poster={activeVideo.poster} controls autoPlay playsInline className="h-full w-full max-h-[78vh] object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
};

export default Host;
