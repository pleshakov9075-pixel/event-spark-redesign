import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Music2,
  Phone,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { galleryMedia, heroMedia } from "@/content/media";

type SectionLink = { id: string; label: string };

type PackageTier = {
  name: string;
  price: string;
  includes: string[];
};

const sectionLinks: SectionLink[] = [
  { id: "hero", label: "Старт" },
  { id: "about", label: "О Владимире" },
  { id: "artbox", label: "ArtBox" },
  { id: "gallery", label: "Галерея" },
  { id: "cases", label: "Кейсы" },
  { id: "formats", label: "Форматы" },
  { id: "contacts", label: "Контакты" },
];

const values = [
  { title: "До-фамин", icon: "⚡", text: "Драйв, темп и ощущение «вау» с первых минут." },
  { title: "Окси-тоцин", icon: "🤝", text: "Тёплая коммуникация, забота о гостях и атмосфера доверия." },
  { title: "Серо-тонин", icon: "😌", text: "Баланс, уверенность и тонкое управление динамикой вечера." },
  { title: "Эндор-фин", icon: "🎉", text: "Лёгкий юмор, смех и живые эмоции без неловкости." },
];

const benefits = [
  "18+ лет сценического опыта и событий любого масштаба",
  "Команда режиссуры, техпродакшна и шоу-контента под ключ",
  "Персональные сценарии вместо шаблонов",
  "Гибкая коммуникация: от идеи до финального тоста",
];

const team = [
  { name: "Владимир Башмаков", role: "Креативный продюсер", desc: "Смысл, ритм и харизма события." },
  { name: "Анна Лебедева", role: "Режиссёр", desc: "Собирает шоу в цельную драматургию." },
  { name: "Михаил Орлов", role: "Техдиректор", desc: "Свет, звук и визуал без компромиссов." },
  { name: "Елена Фролова", role: "Event-менеджер", desc: "Контроль сроков и идеальная логистика." },
];

const servicePackages: PackageTier[] = [
  { name: "Базовый", price: "от 120 000 ₽", includes: ["Ведущий + DJ", "Сценарный план", "Координация 1 менеджером"] },
  {
    name: "Премиум",
    price: "от 240 000 ₽",
    includes: ["Режиссура вечера", "Шоу-номера и интерактивы", "Расширенный техпродакшн"],
  },
  {
    name: "Эксклюзив",
    price: "от 420 000 ₽",
    includes: ["Авторская концепция", "Full-service команда ArtBox", "Индивидуальный контент и вау-эффекты"],
  },
];

const eventTypes = ["Корпоратив", "Свадьба", "Форум", "Юбилей"];
const addons = ["Декор", "Кавер-группа", "LED-экраны", "Фото/видео продакшн"];

const faq = [
  { q: "Можно ли работать в другом городе?", a: "Да, мы проводим проекты по всей России и за рубежом." },
  { q: "За сколько нужно бронировать дату?", a: "Оптимально за 1–3 месяца, но часто находим решения и срочно." },
  { q: "Кто будет на площадке в день события?", a: "Ведущий, координатор, техническая и креативная группа по задаче." },
];

const testimonials = [
  { name: "Юлия и Артём", quote: "Это была свадьба, где плакали и смеялись все — в самом лучшем смысле.", role: "Свадьба · 120 гостей" },
  { name: "ООО ТехноПром", quote: "Собрали форум на 800 участников и удерживали внимание до финала.", role: "Форум · 800 гостей" },
  { name: "ГК Волга", quote: "Корпоратив без «кринжа». Только стиль, юмор и мощная энергия.", role: "Корпоратив · 300 гостей" },
];

const caseItems = [
  { title: "Форум лидеров", stats: "900 гостей · 10 часов · 14 спикеров", desc: "Полноформатный деловой день и вечерний шоу-блок." },
  { title: "Свадьба на воде", stats: "170 гостей · 8 часов · 3 сцены", desc: "Иммерсивные переходы между локациями и live-шоу." },
  { title: "Юбилей бренда", stats: "420 гостей · 6 часов · 1 брендфильм", desc: "Ретроспектива компании в формате эмоционального спектакля." },
];

const videoCards = [
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [faqOpen, setFaqOpen] = useState<string | null>(faq[0].q);
  const [galleryFilter, setGalleryFilter] = useState("Все");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [caseModal, setCaseModal] = useState<string | null>(null);
  const [expandedFormat, setExpandedFormat] = useState<string | null>(null);
  const [wizardStep, setWizardStep] = useState(1);
  const [eventType, setEventType] = useState(eventTypes[0]);
  const [guests, setGuests] = useState(80);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [soundOn, setSoundOn] = useState(false);
  const [easterClicks, setEasterClicks] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 },
    );

    sectionLinks.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (!soundOn) {
      audioRef.current.pause();
      return;
    }
    audioRef.current.volume = 0.25;
    audioRef.current.play().catch(() => setSoundOn(false));
  }, [soundOn]);

  const mappedGallery = useMemo(
    () =>
      galleryMedia.slice(0, 16).map((item, index) => ({
        src: item.src,
        type: ["Корпоратив", "Свадьба", "Форум", "Юбилей"][index % 4],
      })),
    [],
  );

  const filteredGallery = mappedGallery.filter((item) => galleryFilter === "Все" || item.type === galleryFilter);

  const score = guests + selectedAddons.length * 60 + (eventType === "Форум" ? 100 : eventType === "Свадьба" ? 70 : 40);
  const recommended = score < 220 ? servicePackages[0] : score < 360 ? servicePackages[1] : servicePackages[2];

  return (
    <main className="brand-page relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />
      <div className="fixed left-0 top-0 z-[70] h-1 bg-accent" style={{ width: `${scrollProgress}%` }} />
      <audio ref={audioRef} loop src="https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3" />

      <aside className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 rounded-3xl border border-white/20 bg-black/45 p-3 backdrop-blur md:block">
        <nav className="space-y-2">
          {sectionLinks.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className={`group flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] ${
                activeSection === item.id ? "text-accent" : "text-white/60"
              }`}
            >
              <span className={`h-2.5 w-2.5 rounded-full border ${activeSection === item.id ? "border-accent bg-accent" : "border-white/45"}`} />
              <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[120px]">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <button
        type="button"
        onClick={() => setSoundOn((v) => !v)}
        className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-4 py-2 text-xs uppercase tracking-[0.14em] text-white"
      >
        {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        {soundOn ? "Выключить звук" : "Включить звук"}
      </button>

      <section id="hero" className="relative flex min-h-screen items-end overflow-hidden pt-20 sm:items-center">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoCards[0]}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,16,0.2)_0%,rgba(11,12,16,0.86)_75%)]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20">
          <h1 className="font-editorial text-6xl uppercase leading-[0.92] sm:text-8xl">Владимир Башмаков</h1>
          <p className="mt-4 text-xl text-white/85">Ведущий. Продюсер эмоций. Амбассадор ярких событий.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#about" className="rounded-full bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-black transition-transform hover:-translate-y-1">Ведущий</a>
            <a href="#artbox" className="rounded-full border border-white/50 bg-black/30 px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-1">Агентство ArtBox</a>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="#about-reels" className="rounded-full bg-accent px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-black transition-all hover:scale-105 hover:shadow-[0_0_32px_rgba(111,132,255,0.7)]">Смотреть шоу-рил</a>
            <a href="#contacts" className="rounded-full border border-accent px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all hover:scale-105 hover:bg-accent hover:text-black">Связаться</a>
          </div>
        </div>
      </section>

      <motion.section id="about" className="section-shell" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="font-editorial text-5xl uppercase sm:text-7xl">О Владимире</h2>
          <p className="mt-5 max-w-3xl text-white/75">Кратко: интеллигентный юмор, точная драматургия и шоу, в котором каждый гость чувствует себя важным.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <article key={item.title} className="group rounded-2xl border border-white/15 bg-white/[0.03] p-5 transition-all hover:-translate-y-1 hover:border-accent/70">
                <p className="text-2xl">{item.icon}</p>
                <h3 className="mt-3 font-semibold uppercase tracking-[0.08em]">{item.title}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/65 transition-all duration-300 group-hover:max-h-20">{item.text}</p>
              </article>
            ))}
          </div>

          <div id="about-reels" className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="overflow-hidden rounded-3xl border border-white/15">
              <iframe className="aspect-video w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Шоу-рил" allowFullScreen />
            </div>
            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2 lg:flex-col">
              {videoCards.map((video, idx) => (
                <video key={video} src={video} controls className="aspect-video w-64 rounded-2xl border border-white/15 object-cover lg:w-full" preload="metadata" />
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {benefits.map((item, idx) => (
              <motion.div key={item} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} viewport={{ once: true }} className="rounded-2xl border border-white/15 bg-white/[0.02] p-5">
                {item}
              </motion.div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-white/15 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-4xl uppercase">Отзывы</h3>
              <div className="flex gap-2">
                <button type="button" onClick={() => setActiveReview((v) => (v - 1 + testimonials.length) % testimonials.length)}><ChevronLeft /></button>
                <button type="button" onClick={() => setActiveReview((v) => (v + 1) % testimonials.length)}><ChevronRight /></button>
              </div>
            </div>
            <article className="mt-4 grid gap-4 sm:grid-cols-[110px_1fr] sm:items-center">
              <img src={heroMedia[activeReview]?.src ?? "/placeholder.svg"} className="h-24 w-24 rounded-full object-cover" alt="Клиент" />
              <div>
                <p className="text-white/80">“{testimonials[activeReview].quote}”</p>
                <p className="mt-2 text-sm uppercase tracking-[0.14em] text-white/60">{testimonials[activeReview].name} · {testimonials[activeReview].role}</p>
              </div>
            </article>
          </div>

          <div className="mt-10 space-y-3">
            <h3 className="font-editorial text-4xl uppercase">FAQ</h3>
            {faq.map((item) => (
              <div key={item.q} className="rounded-2xl border border-white/15">
                <button type="button" onClick={() => setFaqOpen((v) => (v === item.q ? null : item.q))} className="flex w-full items-center justify-between px-5 py-4 text-left">
                  <span>{item.q}</span>
                  <span>{faqOpen === item.q ? "−" : "+"}</span>
                </button>
                {faqOpen === item.q && <p className="px-5 pb-4 text-sm text-white/70">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <section id="artbox" className="section-shell bg-black/20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-editorial text-5xl uppercase sm:text-7xl">ArtBox Agency</h2>
          <p className="mt-4 max-w-3xl text-white/75">Миссия — превращать событие в историю. Концепция — стиль + эмоции + продакшн. Работаем как партнёры, а не подрядчики.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, idx) => (
              <article key={member.name} className="group rounded-2xl border border-white/15 bg-white/[0.02] p-4">
                <img src={heroMedia[(idx + 3) % heroMedia.length]?.src} className="h-48 w-full rounded-xl object-cover" alt={member.name} />
                <h3 className="mt-3 text-lg">{member.name}</h3>
                <p className="text-xs uppercase tracking-[0.12em] text-white/50">{member.role}</p>
                <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/70 transition-all duration-300 group-hover:max-h-20">{member.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Организация", "Декор", "Шоу", "Технический продакшн"].map((service) => (
              <div key={service} className="rounded-2xl border border-white/15 p-5 text-center">
                <Sparkles className="mx-auto h-5 w-5 text-accent" />
                <p className="mt-2">{service}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {servicePackages.map((pack) => (
              <article key={pack.name} className="rounded-2xl border border-white/15 bg-white/[0.02] p-5">
                <h3 className="font-editorial text-3xl uppercase">{pack.name}</h3>
                <p className="mb-4 mt-1 text-accent">{pack.price}</p>
                <ul className="space-y-1 text-sm text-white/75">
                  {pack.includes.map((inc) => <li key={inc}>• {inc}</li>)}
                </ul>
                <button type="button" onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })} className="mt-5 rounded-full bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-black">Рассчитать стоимость</button>
              </article>
            ))}
          </div>

          <div id="calculator" className="mt-12 rounded-3xl border border-white/15 bg-black/30 p-6">
            <h3 className="font-editorial text-4xl uppercase">Мастер-форма расчёта</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/45">Шаг {wizardStep} из 3</p>

            {wizardStep === 1 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                  <button key={type} type="button" onClick={() => setEventType(type)} className={`rounded-full border px-4 py-2 text-sm ${eventType === type ? "border-accent bg-accent text-black" : "border-white/30"}`}>{type}</button>
                ))}
              </div>
            )}
            {wizardStep === 2 && (
              <div className="mt-4">
                <label className="text-sm text-white/75">Количество гостей: {guests}</label>
                <input type="range" min={20} max={1200} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="mt-2 w-full" />
              </div>
            )}
            {wizardStep === 3 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {addons.map((addon) => (
                  <button key={addon} type="button" onClick={() => setSelectedAddons((prev) => prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon])} className={`rounded-full border px-4 py-2 text-sm ${selectedAddons.includes(addon) ? "border-accent bg-accent text-black" : "border-white/30"}`}>{addon}</button>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              <button type="button" onClick={() => setWizardStep((v) => Math.max(1, v - 1))} className="rounded-full border border-white/30 px-4 py-2 text-xs uppercase">Назад</button>
              <button type="button" onClick={() => setWizardStep((v) => Math.min(3, v + 1))} className="rounded-full bg-accent px-4 py-2 text-xs uppercase text-black">Далее</button>
            </div>

            {wizardStep === 3 && (
              <div className="mt-6 rounded-2xl border border-accent/40 bg-accent/10 p-4">
                <p className="text-sm">Рекомендуемый пакет: <b>{recommended.name}</b></p>
                <p className="text-sm text-white/75">Ориентировочный бюджет: {recommended.price}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="gallery" className="section-shell">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-editorial text-5xl uppercase sm:text-7xl">Живые гости</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Все", ...eventTypes].map((filter) => (
              <button key={filter} type="button" onClick={() => setGalleryFilter(filter)} className={`rounded-full border px-4 py-2 text-xs uppercase ${galleryFilter === filter ? "border-accent bg-accent text-black" : "border-white/30"}`}>{filter}</button>
            ))}
          </div>
          <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filteredGallery.map((item, idx) => (
              <button key={`${item.src}-${idx}`} type="button" onClick={() => setLightbox(item.src)} className="mb-4 block w-full overflow-hidden rounded-2xl border border-white/10">
                <img src={item.src} className="w-full object-cover transition-transform hover:scale-105" alt={item.type} />
              </button>
            ))}
          </div>

          <h3 className="font-editorial mt-12 text-4xl uppercase">Видеогалерея</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {videoCards.map((src) => (
              <video key={src} src={src} muted loop playsInline onMouseEnter={(e) => e.currentTarget.play()} onMouseLeave={(e) => e.currentTarget.pause()} className="aspect-video w-full rounded-2xl border border-white/15 object-cover" />
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="section-shell bg-black/20">
        <div className="mx-auto max-w-7xl space-y-5">
          <h2 className="font-editorial text-5xl uppercase sm:text-7xl">Портфолио и кейсы</h2>
          {caseItems.map((item, idx) => (
            <article key={item.title} className="relative overflow-hidden rounded-3xl border border-white/15 p-6 sm:p-10">
              <img src={heroMedia[(idx + 8) % heroMedia.length]?.src} className="absolute inset-0 h-full w-full object-cover" alt={item.title} />
              <div className="absolute inset-0 bg-black/55" />
              <div className="relative z-10 max-w-2xl">
                <h3 className="font-editorial text-4xl uppercase">{item.title}</h3>
                <p className="text-sm uppercase tracking-[0.16em] text-accent">{item.stats}</p>
                <p className="mt-2 text-white/80">{item.desc}</p>
                <button type="button" onClick={() => setCaseModal(item.title)} className="mt-5 rounded-full border border-white/40 px-5 py-2 text-xs uppercase">Подробнее</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="formats" className="section-shell">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-editorial text-5xl uppercase sm:text-7xl">Форматы событий</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {eventTypes.map((format, idx) => (
              <button key={format} type="button" onClick={() => setExpandedFormat(format)} className="relative overflow-hidden rounded-3xl border border-white/15 p-8 text-left">
                <img src={heroMedia[(idx + 12) % heroMedia.length]?.src} className="absolute inset-0 h-full w-full object-cover" alt={format} />
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10">
                  <h3 className="font-editorial text-4xl uppercase">{format}</h3>
                  <p className="text-sm text-white/75">Нажмите, чтобы развернуть описание и примеры.</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="section-shell pb-16">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/15 bg-[linear-gradient(130deg,rgba(91,124,255,0.3)_0%,rgba(0,0,0,0.4)_70%)] p-7 sm:p-10">
          <h2 className="font-editorial text-5xl uppercase sm:text-7xl">Сделаем событие, которое запомнят</h2>
          <button type="button" className="mt-5 rounded-full bg-accent px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-black">Оставить заявку</button>

          <form className="mt-6 grid gap-3 sm:grid-cols-2">
            <input placeholder="Имя" className="rounded-xl border border-white/25 bg-black/30 px-4 py-3" />
            <input placeholder="Телефон" className="rounded-xl border border-white/25 bg-black/30 px-4 py-3" />
            <input placeholder="Дата" type="date" className="rounded-xl border border-white/25 bg-black/30 px-4 py-3" />
            <select className="rounded-xl border border-white/25 bg-black/30 px-4 py-3">
              {eventTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            <a href="tel:+79990000000" className="rounded-full border border-white/35 px-4 py-2 text-xs uppercase"><Phone className="mr-1 inline h-3.5 w-3.5" />Позвонить</a>
            <a href="https://instagram.com" className="rounded-full border border-white/35 px-4 py-2 text-xs uppercase">Instagram</a>
            <a href="https://vk.com" className="rounded-full border border-white/35 px-4 py-2 text-xs uppercase">VK</a>
            <a href="https://wa.me/79990000000" className="rounded-full border border-white/35 px-4 py-2 text-xs uppercase">WhatsApp</a>
            <a href="https://t.me" className="rounded-full border border-white/35 px-4 py-2 text-xs uppercase">Telegram</a>
          </div>

          <footer className="mt-8 border-t border-white/20 pt-5 text-sm text-white/70">
            <p>Ижевск, ул. Пушкинская, 100 · Ежедневно 10:00–20:00</p>
            <div className="mt-3 flex items-center gap-3">
              <button type="button" onClick={() => setEasterClicks((v) => v + 1)} className="rounded-full border border-white/25 px-3 py-1 text-xs">
                <Music2 className="mr-1 inline h-3.5 w-3.5" /> Мини‑игра
              </button>
              {easterClicks >= 5 && <span className="text-accent">Пасхалка: вы открыли режим «Суперведущий» 🎊</span>}
            </div>
            <p className="mt-2 text-xs">© 2026 Владимир Башмаков · ArtBox Agency</p>
          </footer>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
            <button type="button" onClick={() => setLightbox(null)} className="absolute right-5 top-5"><X /></button>
            <img src={lightbox} className="max-h-[88vh] rounded-2xl" alt="Галерея" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {caseModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-4">
            <div className="max-w-lg rounded-3xl border border-white/20 bg-[#12141d] p-6">
              <h3 className="font-editorial text-4xl uppercase">{caseModal}</h3>
              <p className="mt-3 text-white/75">Подробный разбор кейса: тайминг, механика вовлечения, технический сценарий и финальные KPI проекта.</p>
              <button type="button" onClick={() => setCaseModal(null)} className="mt-5 rounded-full bg-accent px-5 py-2 text-xs uppercase text-black">Закрыть</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expandedFormat && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] overflow-y-auto bg-black/90 p-6">
            <button type="button" onClick={() => setExpandedFormat(null)} className="ml-auto block"><X /></button>
            <div className="mx-auto mt-10 max-w-4xl">
              <h3 className="font-editorial text-6xl uppercase">{expandedFormat}</h3>
              <p className="mt-4 text-white/75">Полноэкранная карточка формата: сценарные варианты, визуальные решения, интерактивы и референсы для этого типа события.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <a href="#contacts" className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-black shadow-lg">
        <MessageCircle className="h-5 w-5" />
      </a>
    </main>
  );
};

export default Index;
