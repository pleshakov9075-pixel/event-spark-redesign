import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import AgencyPriceCalculator from "@/components/AgencyPriceCalculator";
import BrandLogo from "@/components/BrandLogo";
import HeroVideo from "@/components/HeroVideo";
import ScrollReveal from "@/components/ScrollReveal";
import SiteLayout from "@/components/SiteLayout";
import ContactFormSection from "@/components/ContactFormSection";
import { agencyCaseCards, agencyHero } from "@/content/siteData";

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
    title: "Приватные события",
    text: "Камерные премиальные вечера с точной режиссурой атмосферы и деталями сервиса.",
  },
];

const processSteps = [
  { title: "01 / Бриф", text: "Стратегическая сессия: цели, формат, стиль, ограничения." },
  { title: "02 / Концепт", text: "2-3 идеи, визуальная подача и сценарный каркас." },
  { title: "03 / Подготовка", text: "Смета, команда, тайминг и продакшн-план." },
  { title: "04 / Реализация", text: "Управляем событием на площадке в реальном времени." },
];

const Agency = () => {
  useEffect(() => {
    document.title = "Ивент-агентство Artbox";
  }, []);

  return (
    <SiteLayout branch="agency" ctaLabel="Обсудить проект" ctaHref="#agency-contacts">
      <section className="relative min-h-[calc(100vh-4rem)]">
        <HeroVideo
          src={agencyHero.video}
          poster={agencyHero.poster}
          finalFrameSrc={agencyHero.finalFrame}
          loop
          showFinalFrameOnEnd={false}
          overlayClassName="bg-[linear-gradient(180deg,rgba(8,8,12,0.18)_0%,rgba(9,9,13,0.72)_66%,rgba(9,9,13,0.94)_100%)]"
        >
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-6 pb-14 sm:pb-20">
              <BrandLogo className="w-[220px] max-w-[58vw] sm:w-[280px]" priority />
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

      <section id="agency-about" className="px-6 py-16 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal>
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-[#d4bc8d]">Об агентстве</p>
              <h2 className="mt-3 font-display text-5xl leading-[0.92] tracking-[0.06em] text-[#f2e0bf] sm:text-6xl">
                Ивент-агентство Artbox
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p className="text-base leading-relaxed text-[#b3b6c4]">
              Продюсируем события с характером: от концепции до финального кадра. Работаем с частными и
              корпоративными клиентами, создавая проекты, которые остаются в памяти и визуально, и эмоционально.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section id="agency-cases" className="bg-[#0d1018] px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Кейсы</h3>
          </ScrollReveal>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {agencyCaseCards.map((item, index) => (
              <ScrollReveal key={item.slug} delay={index * 0.05}>
                <Link
                  to={`/agency/cases/${item.slug}`}
                  className="interactive group block overflow-hidden rounded-2xl border border-white/10 bg-[#11131b] hover:border-[#d6b57a66]"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent" />
                    {item.video && (
                      <div className="absolute left-4 top-4 rounded-full border border-[#d6b57a80] bg-[#111826b3] p-2 text-[#f3e2c2]">
                        <Play className="h-4 w-4 fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#d4c39f]">Кейс</p>
                    <p className="mt-1 text-2xl text-[#f3e3c5]">{item.title}</p>
                    <p className="mt-2 text-sm text-[#b5b8c6]">{item.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-[#d7c79f]">
                      Смотреть кейс
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="agency-services" className="px-6 py-16 sm:py-24">
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

      <section className="bg-[#0d1018] px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Калькулятор стоимости</h3>
          </ScrollReveal>
          <div className="mt-7">
            <AgencyPriceCalculator />
          </div>
        </div>
      </section>

      <section id="agency-process" className="px-6 py-16 sm:py-24">
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

      <ContactFormSection
        id="agency-contacts"
        title="Контакты"
        subtitle="Оставьте параметры проекта и удобный способ связи. Вернёмся с рабочим предложением и сметой."
      />
    </SiteLayout>
  );
};

export default Agency;
