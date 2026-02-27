import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import AgencyPriceCalculator from "@/components/AgencyPriceCalculator";
import AnimatedArtboxLogo from "@/components/AnimatedArtboxLogo";
import HeroVideo from "@/components/HeroVideo";
import ScrollReveal from "@/components/ScrollReveal";
import SiteLayout from "@/components/SiteLayout";
import { agencyCaseTiles, agencyHero, siteContacts } from "@/content/siteData";

const services = [
  {
    title: "Концепция события",
    text: "Смысловая идея, визуальный язык и сценарная драматургия под задачу клиента.",
  },
  {
    title: "Продакшн под ключ",
    text: "Подбор площадки, команда, техника, тайминг и координация всех блоков проекта.",
  },
  {
    title: "Сервис для брендов",
    text: "Ивенты, которые поддерживают имидж компании и усиливают коммуникацию с аудиторией.",
  },
  {
    title: "Private events",
    text: "Камерные и премиальные частные события с вниманием к деталям и гостевому опыту.",
  },
];

const processSteps = [
  { title: "01 / Бриф", text: "Короткая стратегическая сессия: цели, формат, стиль, ограничения." },
  { title: "02 / Концепт", text: "Предлагаем 2-3 идеи, визуальную подачу и сценарный каркас." },
  { title: "03 / Подготовка", text: "Формируем смету, собираем команду и закрываем продакшн-задачи." },
  { title: "04 / Реализация", text: "Запускаем событие и управляем площадкой в реальном времени." },
];

const Agency = () => {
  const [activeVideo, setActiveVideo] = useState<{ src: string; poster?: string; title: string } | null>(null);

  return (
    <SiteLayout branch="agency" ctaLabel="Обсудить проект" ctaHref="#agency-cta">
      <section className="relative min-h-[calc(100vh-4rem)]">
        <HeroVideo
          src={agencyHero.video}
          poster={agencyHero.poster}
          finalFrameSrc={agencyHero.finalFrame}
          loop
          showFinalFrameOnEnd={false}
          overlayClassName="bg-[linear-gradient(180deg,rgba(8,8,12,0.2)_0%,rgba(9,9,13,0.72)_66%,rgba(9,9,13,0.94)_100%)]"
        >
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20">
              <AnimatedArtboxLogo
                src={agencyHero.logo}
                fallbackSrc={agencyHero.logoFallback}
                alt="Artbox logo"
                className="w-[220px] max-w-[58vw] sm:w-[280px]"
                variant="hero"
              />
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-3xl text-sm uppercase tracking-[0.2em] text-[#ddc79a] sm:text-base"
              >
                Создаём премиальные события, где идея, эстетика и продакшн работают как единый организм.
              </motion.p>
            </div>
          </div>
        </HeroVideo>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal>
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-[#d4bc8d]">Об агентстве</p>
              <h2 className="mt-3 font-display text-5xl leading-[0.92] tracking-[0.06em] text-[#f2e0bf] sm:text-6xl">
                Artbox event agency
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p className="text-base leading-relaxed text-[#b3b6c4]">
              Мы продюсируем события с характером: от концепции до финального кадра. Работаем с частными и
              корпоративными клиентами, создавая проекты, которые остаются в памяти и визуально, и эмоционально.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#0d1018] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Кейсы</h3>
          </ScrollReveal>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {agencyCaseTiles.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.05}>
                {item.type === "video" ? (
                  <button
                    type="button"
                    onClick={() => setActiveVideo({ src: item.src, poster: item.poster, title: item.title })}
                    className="interactive group relative overflow-hidden rounded-2xl border border-white/10 bg-[#11131b] text-left"
                  >
                    <video
                      src={item.src}
                      poster={item.poster}
                      className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                      <p className="text-xs uppercase tracking-[0.2em] text-[#d4c39f]">Кейс / Video</p>
                      <p className="mt-1 text-lg text-[#f3e3c5]">{item.title}</p>
                    </div>
                  </button>
                ) : (
                  <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#11131b]">
                    <img src={item.src} alt={item.title} className="h-64 w-full object-cover" loading="lazy" decoding="async" />
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#d4c39f]">Кейс / Photo</p>
                      <p className="mt-1 text-lg text-[#f3e3c5]">{item.title}</p>
                    </div>
                  </article>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Услуги</h3>
          </ScrollReveal>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.05}>
                <article className="rounded-2xl border border-white/10 bg-[#11131bcc] p-6">
                  <h4 className="font-display text-3xl tracking-[0.05em] text-[#f5e6c8]">{service.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#afb1be]">{service.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d1018] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Прайс-калькулятор</h3>
          </ScrollReveal>
          <div className="mt-7">
            <AgencyPriceCalculator />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Процесс работы</h3>
          </ScrollReveal>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 0.05}>
                <article className="rounded-2xl border border-white/10 bg-[#10131bcc] p-6">
                  <h4 className="font-display text-3xl tracking-[0.05em] text-[#f5e6c8]">{step.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#afb1be]">{step.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="agency-cta" className="bg-[#0d1018] px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-3xl text-center">
          <ScrollReveal>
            <h3 className="font-display text-5xl tracking-[0.08em] text-[#f3e1bf] sm:text-6xl">Заявка / Созвон</h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#aeb2c1]">
              Отправьте удобный контакт. Зафиксируем задачу, сроки и вернёмся с рабочей концепцией.
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
                Оставить заявку
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
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-black"
            >
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="interactive absolute right-3 top-3 z-10 rounded-full border border-white/35 bg-black/60 p-2 text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <video
                src={activeVideo.src}
                poster={activeVideo.poster}
                controls
                autoPlay
                playsInline
                className="h-full w-full max-h-[78vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
};

export default Agency;
