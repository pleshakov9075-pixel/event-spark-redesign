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

const packages = [
  {
    title: "Атмосфера",
    price: "от 80 000 ₽",
    items: [
      "Авторская концепция вечера",
      "Ведение до 4 часов",
      "Сценарный каркас и тайминг",
      "Саунд-дизайн и визуальные референсы",
      "Координация программы в день события",
    ],
  },
  {
    title: "Событие",
    price: "от 140 000 ₽",
    items: [
      "Все опции пакета «Атмосфера»",
      "Полноценная режиссура вечера",
      "Координатор и stage-менеджер",
      "Концепт декора и welcome-сценарий",
      "Работа с фото/видео-командой и репетиции",
    ],
  },
  {
    title: "Создание",
    price: "от 220 000 ₽",
    items: [
      "Все опции пакета «Событие»",
      "Полный продюсинг и кастинг артистов",
      "Индивидуальный визуальный код",
      "Пост-мероприятие: видео, фото, рассылка",
      "Персональный менеджер и подбор площадки",
    ],
  },
];

const testimonials = [
  {
    author: "Елена, бренд-директор",
    text: "Команда ART BOX сделала корпоратив стильным и живым. Сценарий, свет, темп, работа с гостями — всё было выверено.",
  },
  {
    author: "Артур, владелец бизнеса",
    text: "Ощущение дорогого продукта с первого созвона. В день события мы были спокойны: команда держала площадку полностью.",
  },
  {
    author: "Кристина, невеста",
    text: "Нас услышали в деталях и собрали вечер как фильм про нас. Получилось красиво, эмоционально и без хаоса.",
  },
];

const processSteps = [
  {
    title: "01 / Бриф",
    text: "Разбираем задачу, аудиторию, формат, сроки и ограничения площадки.",
  },
  {
    title: "02 / Концепт",
    text: "Собираем идею, сценарную архитектуру и визуальный язык проекта.",
  },
  {
    title: "03 / Подготовка",
    text: "Формируем команду, координируем подрядчиков, закрываем продакшн и репетиции.",
  },
  {
    title: "04 / Реализация",
    text: "Управляем площадкой в день события и доводим проект до финального результата.",
  },
];

const faqItems = [
  {
    question: "Сколько стоит сопровождение?",
    answer:
      "Базовые пакеты начинаются от 80 000 ₽. Итоговая стоимость зависит от сложности идеи, масштаба события и состава команды.",
  },
  {
    question: "Чем вы отличаетесь от других агентств?",
    answer:
      "ART BOX работает как творческая лаборатория: мы не штампуем шаблоны, а собираем уникальную драматургию, визуальный код и атмосферу под конкретного клиента.",
  },
  {
    question: "Работаете ли вы вне Ижевска?",
    answer:
      "Да. Работаем в Ижевске и выезжаем в другие города России, а также на международные площадки по предварительному плану.",
  },
  {
    question: "Можно ли заказать только ведущего?",
    answer:
      "Да, можно. Для этого предусмотрено направление «Ведущий Владимир Башмаков» с отдельными форматами и сценарной проработкой.",
  },
  {
    question: "Делаете ли корпоративы?",
    answer:
      "Да, корпоративные события — один из ключевых форматов: от камерных вечеров до больших бренд-проектов.",
  },
  {
    question: "Можно ли работать по договору?",
    answer:
      "Да, работаем официально. Подписываем договор, фиксируем объём работ, этапы и ответственность сторон.",
  },
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
                className="mt-6 max-w-4xl text-sm uppercase tracking-[0.18em] text-[#ddc79a] sm:text-base"
              >
                ART BOX — творческая лаборатория, где каждое событие рождается как живая история: с настроением,
                эмоциями и тонкой атмосферой. Мы работаем с теми, кто ценит глубину, эстетику и смысл.
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
            <div className="space-y-4 text-base leading-relaxed text-[#b3b6c4]">
              <p>
                Мы не штампуем проекты по прайсу «за час». Стоимость формируется из сложности идеи, масштаба и
                состава команды.
              </p>
              <p>Работаем в Ижевске и выезжаем в другие города и страны.</p>
            </div>
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
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Пакеты услуг</h3>
          </ScrollReveal>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {packages.map((pack, index) => (
              <ScrollReveal key={pack.title} delay={index * 0.05}>
                <article className="rounded-2xl border border-white/10 bg-[#11131bcc] p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#ccb788]">{pack.price}</p>
                  <h4 className="mt-2 font-display text-4xl tracking-[0.05em] text-[#f5e6c8]">{pack.title}</h4>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#afb1be]">
                    {pack.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#d6b57a]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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

      <section id="agency-reviews" className="px-6 py-16 sm:py-24">
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

      <section id="agency-process" className="px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Процесс работы</h3>
          </ScrollReveal>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {processSteps.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.04}>
                <article className="rounded-2xl border border-white/10 bg-[#10131bcc] p-6">
                  <h4 className="font-display text-3xl tracking-[0.05em] text-[#f5e6c8]">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#afb1be]">{item.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="agency-faq" className="bg-[#0d1018] px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">FAQ</h3>
          </ScrollReveal>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {faqItems.map((item, index) => (
              <ScrollReveal key={item.question} delay={index * 0.04}>
                <article className="rounded-2xl border border-white/10 bg-[#10131bcc] p-6">
                  <h4 className="font-display text-3xl tracking-[0.05em] text-[#f5e6c8]">{item.question}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#afb1be]">{item.answer}</p>
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
