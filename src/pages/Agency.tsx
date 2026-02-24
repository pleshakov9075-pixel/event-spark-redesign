import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Gem, Crown, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQSection from "@/components/FAQSection";
import Calculator from "@/components/Calculator";
import EventGallery from "@/components/EventGallery";
import Footer from "@/components/Footer";
import { useRef } from "react";

const packages = [
  {
    name: "Атмосфера",
    icon: Sparkles,
    ideal: "Камерные корпоративы, VIP-дни рождения, деловые вечера",
    features: [
      "Авторская концепция мероприятия",
      "Премиум-ведение (до 4 часов)",
      "Персональный сценарий с dramaturg-подачей",
      "Саунд-дизайн и световое сопровождение",
      "Визуальное mood-оформление",
      "Координация тайминга, бриф гостей",
    ],
  },
  {
    name: "Событие",
    icon: Gem,
    ideal: "Презентации бренда, вечеринки, частные ужины, свадьбы до 50 гостей",
    features: [
      "Всё из «Атмосфера», плюс:",
      "Полноценная режиссура вечера",
      "Команда: координатор + stage-менеджер",
      "Декор-концепт + подбор подрядчиков",
      "Welcome-сценарий + сценарий выхода",
      "Репетиции / прогон на площадке",
    ],
    highlighted: true,
  },
  {
    name: "Создание",
    icon: Crown,
    ideal: "Имиджевые корпоративы, масштабные презентации, креативные свадьбы",
    features: [
      "Всё из «Событие», плюс:",
      "Полный продюсинг под ключ",
      "Кастинг артистов / подбор ведущих",
      "Индивидуальный визуальный код",
      "Пост-мероприятие: видеоотчёт, рассылка",
      "Персональный менеджер",
      "Площадка «под концепт» (поиск, переговоры)",
    ],
  },
];

const testimonials = [
  { name: "Ирина", text: "Я не знала, что бывает так: ты просто рассказываешь, что хочешь почувствовать, а команда делает так, что это случается. ART BOX взяли на себя всё — от концепции до финальной свечки в торте.", event: "Свадьба" },
  { name: "Никита", text: "Мы хотели корпоратив не ради галочки, а с настроением и смыслом. ART BOX собрали команду, продумали всё: визуал, динамику, музыку, атмосферу. Это дорого, но стоит каждой копейки.", event: "Корпоратив" },
  { name: "Маргарита", text: "Когда ты хочешь не просто праздник, а событие, о котором говорят — это к ART BOX. Они создают не шаблоны, а сценарии эмоций. Команда, которая работает как единый мозг.", event: "Корпоратив" },
  { name: "Алёна и Сергей", text: "Не верила, что всё получится без нервов. Но ART BOX сделали так, что мы просто наслаждались. Всё было тонко, интеллигентно, красиво. Свадьба дочки — лучшее воспоминание в моей жизни.", event: "Свадьба" },
  { name: "Олег и Кира", text: "Свадьба должна была быть камерной, но стильной. ART BOX придумали концепт, в который влюбились все. Было ощущение, что праздник «похож на нас». Без типовых решений — только вкус и лёгкость.", event: "Свадьба" },
];

const faqItems = [
  { q: "Сколько стоит ваше сопровождение?", a: "Мы не работаем по прайсу «за час». Стоимость формируется из сложности идеи, масштаба события, состава команды и технических решений. Базовые пакеты начинаются от 80 000 ₽, но мы всегда готовы обсудить формат под ваш запрос." },
  { q: "Чем вы отличаетесь от других агентств?", a: "ART BOX — это не подрядчики, а соавторы. Мы не штампуем, а проектируем. Каждый сценарий создаётся с нуля. Мы работаем с настроением, эстетикой и смыслом, а не просто с таймингом." },
  { q: "Вы работаете только в Ижевске?", a: "Нет. Мы готовы выезжать в другие города и страны. Наши проекты уже в Москве, Казани, Перми, Тюмени и на частных площадках по всей России." },
  { q: "Можно ли заказать только ведущего без команды?", a: "Да, в рамках пакета «Атмосфера» вы можете заказать индивидуальное ведение с проработанным сценарием. Но мы предлагаем рассмотреть комплексный подход — он качественно влияет на восприятие." },
  { q: "Вы делаете корпоративы?", a: "Да, и мы делаем их непохожими на всё, что принято называть корпоративом. Для HR и руководителей мы проектируем события, которые работают на лояльность, командный дух и имидж компании." },
  { q: "С чего начать?", a: "С короткой консультации. Просто оставьте заявку — мы зададим вам несколько простых вопросов и предложим три возможных сценария начала." },
  { q: "Можно ли работать по договору?", a: "Обязательно. Мы оформляем договор, согласовываем смету, ведём документацию и работаем официально — особенно для корпоративных клиентов." },
];

const galleryImages = [
  { src: "/images/agency-work.jpg", alt: "Art-Box за работой", category: "Команда" },
  { src: "/images/event-wedding-1.jpg", alt: "Свадебный банкет", category: "Свадьбы" },
  { src: "/images/event-wedding-2.jpg", alt: "Выездная церемония", category: "Свадьбы" },
  { src: "/images/event-corporate-1.jpg", alt: "Корпоратив на сцене", category: "Корпоративы" },
  { src: "/images/event-gala.jpg", alt: "Гала-вечер", category: "Корпоративы" },
  { src: "/images/event-birthday.jpg", alt: "День рождения", category: "Дни рождения" },
  { src: "/images/event-dinner.jpg", alt: "Камерный ужин", category: "Частные ужины" },
  { src: "/images/host-stage.jpg", alt: "На сцене", category: "Команда" },
];

const Agency = () => {
  const [calcOpen, setCalcOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-strong border-b border-border/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors interactive font-body text-sm">
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Главная</span>
          </Link>
          <Button onClick={() => setCalcOpen(true)} size="sm" className="bg-gradient-wine hover:opacity-90 text-secondary-foreground interactive text-xs sm:text-sm">
            Рассчитать стоимость
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 relative overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src="/images/agency-hero.jpg" alt="Команда Art-Box Agency" className="w-full h-full object-cover scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/40" />
          <div className="absolute inset-0 bg-gradient-hero-agency" />
        </motion.div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="flex items-center justify-center gap-3 mb-4 sm:mb-5"
            >
              <span className="h-px w-8 sm:w-10 bg-agency/40" />
              <span className="font-body text-agency text-xs sm:text-sm tracking-[0.25em] uppercase font-medium">Event Agency</span>
              <span className="h-px w-8 sm:w-10 bg-agency/40" />
            </motion.div>
            <h1 className="font-display font-bold mb-4 sm:mb-6">
              Art-Box<br />
              <span className="text-gradient-agency">творческая лаборатория</span>
            </h1>
            <p className="font-body text-foreground/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
              Создаём мероприятия, которые остаются внутри. Не тиражируем, не повторяемся — каждое событие является авторской постановкой.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button onClick={() => setCalcOpen(true)} size="lg" className="bg-gradient-wine hover:opacity-90 text-secondary-foreground text-sm sm:text-base px-6 sm:px-8 interactive">
                Рассчитать стоимость
              </Button>
              <Button variant="outline" size="lg" className="border-agency/25 text-agency hover:bg-agency/10 text-sm sm:text-base px-6 sm:px-8 interactive">
                Обсудить проект
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-display text-xl sm:text-2xl md:text-4xl font-light text-foreground/90 leading-relaxed">
              ART BOX — это не просто event-агентство. Это{" "}
              <span className="text-gradient-gold font-semibold">творческая лаборатория</span>,
              где каждое событие рождается как живая история: с настроением, эмоциями и тонкой атмосферой.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Наши проекты" subtitle="Каждое мероприятие — авторская работа" accent="wine" />
          <EventGallery images={galleryImages} accent="wine" />
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Что будет в вашем празднике?" accent="wine" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { title: "Идея, а не шаблон", desc: "Событие, собранное вокруг вашей уникальности, а не по шаблону из Pinterest." },
              { title: "Атмосфера", desc: "Которую хочется пережить снова. Не просто тайминг. Мы проектируем эмоции и состояния." },
              { title: "Команда", desc: "Профессиональные специалисты. Мы контролируем процесс и следим за каждым штрихом." },
              { title: "Премиум-сервис", desc: "ART BOX — это не шоу ради шоу. Это работа на ваше имя и вашу репутацию." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="p-5 sm:p-6 rounded-xl bg-card/50 border border-border hover:border-wine/30 transition-all interactive"
                >
                  <h3 className="font-display text-lg sm:text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Пакеты услуг" subtitle="Выберите уровень сопровождения для вашего события" accent="wine" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {packages.map((pkg, i) => {
              const Icon = pkg.icon;
              return (
                <ScrollReveal key={pkg.name} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`rounded-2xl p-6 sm:p-8 border transition-all interactive h-full flex flex-col ${
                      pkg.highlighted
                        ? "border-wine/50 bg-wine/5 shadow-wine"
                        : "border-border bg-card/50 hover:border-wine/30"
                    }`}
                  >
                    {pkg.highlighted && (
                      <span className="font-body text-xs uppercase tracking-widest text-wine-foreground bg-wine/20 px-3 py-1 rounded-full mb-4 inline-block self-start">
                        Популярный
                      </span>
                    )}
                    <Icon className={`w-7 h-7 sm:w-8 sm:h-8 mb-3 sm:mb-4 ${pkg.highlighted ? "text-gold" : "text-muted-foreground"}`} />
                    <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{pkg.name}</h3>
                    <ul className="space-y-2 sm:space-y-3 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 font-body text-xs sm:text-sm text-muted-foreground">
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="font-body text-[10px] sm:text-xs text-muted-foreground/70 mt-3 sm:mt-4 italic">Идеально для: {pkg.ideal}</p>
                    <Button
                      onClick={() => setCalcOpen(true)}
                      className={`w-full mt-4 sm:mt-6 interactive ${
                        pkg.highlighted
                          ? "bg-gradient-wine hover:opacity-90 text-secondary-foreground"
                          : "bg-muted hover:bg-muted/80 text-foreground"
                      }`}
                    >
                      Рассчитать
                    </Button>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider testimonials={testimonials} accent="wine" />

      {/* FAQ */}
      <FAQSection items={faqItems} accent="wine" />

      {/* CTA */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/event-gala.jpg" alt="" className="w-full h-full object-cover blur-2xl" />
        </div>
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-gradient-gold mb-4">Начнём создавать?</h2>
            <p className="font-body text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8">Расскажите о вашей идее, и мы превратим её в незабываемое событие.</p>
            <Button onClick={() => setCalcOpen(true)} size="lg" className="bg-gradient-wine hover:opacity-90 text-secondary-foreground text-sm sm:text-base px-8 sm:px-10 interactive">
              Обсудить проект
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
      <Calculator isOpen={calcOpen} onClose={() => setCalcOpen(false)} variant="agency" />
    </main>
  );
};

export default Agency;