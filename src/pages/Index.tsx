import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Theater, ChevronDown } from "lucide-react";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import StatsCounter from "@/components/StatsCounter";
import EventTypesSection from "@/components/EventTypesSection";
import SectionHeading from "@/components/SectionHeading";
import { useRef } from "react";

const cards = [
  {
    to: "/host",
    title: "Ведущий",
    tagline: "Амбассадор ярких событий",
    description: "Персональный подход к каждому мероприятию. Создаю атмосферу, в которой гости чувствуют себя свободно.",
    icon: Sparkles,
    image: "/images/card-host-bg.jpg",
    gradient: "bg-gradient-emerald",
    border: "border-gradient-emerald",
    shadow: "shadow-emerald",
    hoverShadow: "hover:shadow-[0_0_60px_-10px_hsl(160_70%_35%/0.4)]",
  },
  {
    to: "/agency",
    title: "Art-Box Agency",
    tagline: "Творческая лаборатория эмоций",
    description: "Полное сопровождение мероприятий от концепции до финального аккорда. Каждое событие — авторская постановка.",
    icon: Theater,
    image: "/images/card-agency-bg.jpg",
    gradient: "bg-gradient-wine",
    border: "border-gradient-wine",
    shadow: "shadow-wine",
    hoverShadow: "hover:shadow-[0_0_60px_-10px_hsl(345_50%_35%/0.4)]",
  },
];

const stats = [
  { value: 15, suffix: "+", label: "Лет опыта" },
  { value: 500, suffix: "+", label: "Мероприятий" },
  { value: 50, suffix: "K+", label: "Гостей" },
  { value: 30, suffix: "+", label: "Городов" },
];

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-gradient-dark">
      {/* Hero — fullscreen video */}
      <section ref={heroRef} className="min-h-screen relative overflow-hidden flex items-end">
        {/* Video background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/images/hero-luxury-bg.jpg"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-20 sm:pb-28 md:pb-36 pt-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">
            {/* Left — name & tagline */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-body text-primary text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-5 sm:mb-6"
              >
                Ведущий мероприятий • Event-агентство
              </motion.p>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] mb-6 sm:mb-8">
                <motion.span
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-gradient-gold block"
                >
                  Владимир
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-foreground block"
                >
                  Башмаков
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="font-body text-foreground/60 text-sm sm:text-base md:text-lg max-w-md leading-relaxed"
              >
                Создаём события-произведения искусства для тех, кто ценит атмосферу, эстетику и смысл
              </motion.p>
            </div>

            {/* Right — cards */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {cards.map((card, i) => (
                <motion.div
                  key={card.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + i * 0.15 }}
                >
                  <Link to={card.to} className="block group interactive">
                    <motion.div
                      whileHover={{ x: 8 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="relative glass rounded-xl p-5 sm:p-6 flex items-center gap-5 border border-primary/10 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-0.5">
                          {card.title}
                        </h2>
                        <p className="font-body text-xs sm:text-sm text-foreground/50 leading-relaxed line-clamp-2">
                          {card.tagline}
                        </p>
                      </div>
                      <span className="shrink-0 font-body text-xs text-primary/60 group-hover:text-primary transition-colors tracking-wide uppercase">
                        →
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="flex flex-col items-center gap-2">
            <span className="font-body text-[10px] sm:text-xs text-primary-foreground/50 uppercase tracking-widest">Листайте</span>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Мероприятия" subtitle="Свадьбы, корпоративы, частные ужины и гала-вечера — каждое событие уникально" />
          <EventTypesSection accent="emerald" />
        </div>
      </section>

      {/* Photo marquee */}
      <section className="py-10 sm:py-16 overflow-hidden">
        <div className="flex gap-3 sm:gap-4 animate-[scroll_30s_linear_infinite]" style={{ width: "max-content" }}>
          {[
            "/images/event-wedding-1.jpg",
            "/images/event-corporate-1.jpg",
            "/images/event-birthday.jpg",
            "/images/event-dinner.jpg",
            "/images/event-gala.jpg",
            "/images/event-wedding-2.jpg",
            "/images/event-wedding-1.jpg",
            "/images/event-corporate-1.jpg",
          ].map((src, i) => (
            <div key={i} className="w-56 sm:w-72 md:w-96 aspect-[3/2] rounded-xl overflow-hidden border border-border shrink-0">
              <img src={src} alt="Мероприятие" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-display text-xl sm:text-2xl md:text-4xl font-light text-foreground/90 leading-relaxed">
              Мы не тиражируем — мы <span className="text-gradient-emerald font-semibold">создаём</span>.
              <br />
              Каждое событие — уникальное произведение искусства,
              <br />
              отражающее <span className="italic">вашу историю</span>.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;