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
      {/* Hero */}
      <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/images/hero-luxury-bg.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/50" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 sm:mb-16"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 0.2, duration: 1 }}
              className="font-body text-primary text-[10px] sm:text-xs md:text-sm uppercase mb-4 sm:mb-6 tracking-[0.2em] sm:tracking-[0.3em]"
            >
              Ведущий мероприятий • Event-агентство
            </motion.p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold mb-3 sm:mb-4">
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-gradient-emerald inline-block"
              >
                Владимир
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-foreground inline-block"
              >
                Башмаков
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="font-body text-foreground/70 text-base sm:text-lg md:text-xl max-w-xl mx-auto px-2"
            >
              Создаём события-произведения искусства для тех, кто ценит атмосферу, эстетику и смысл
            </motion.p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl w-full mx-auto">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.to}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + i * 0.15 }}
                >
                  <Link to={card.to} className="block group interactive">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -6 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className={`relative rounded-2xl overflow-hidden ${card.border} ${card.shadow} ${card.hoverShadow} transition-shadow duration-500`}
                    >
                      {/* Card image */}
                      <div className="relative h-[140px] sm:h-[180px] md:h-[200px] overflow-hidden">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-background/40 to-transparent" />
                        <Icon className="absolute top-4 left-4 sm:top-5 sm:left-6 w-6 h-6 sm:w-7 sm:h-7 text-primary drop-shadow-lg group-hover:scale-110 transition-transform" />
                      </div>
                      {/* Card content */}
                      <div className="relative p-5 sm:p-6 md:p-8 flex flex-col bg-card min-h-[160px] sm:min-h-[180px]">
                        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
                          {card.title}
                        </h2>
                        <p className="font-display text-xs sm:text-sm md:text-base italic text-foreground/50 mb-2 sm:mb-3">
                          {card.tagline}
                        </p>
                        <p className="font-body text-xs sm:text-sm text-foreground/60 leading-relaxed flex-1">
                          {card.description}
                        </p>
                        <div className="mt-3 sm:mt-4 flex items-center gap-2 text-primary font-body text-sm font-medium group-hover:gap-3 transition-all">
                          Подробнее
                          <motion.span className="inline-block" animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
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
            <span className="font-body text-[10px] sm:text-xs text-muted-foreground/50 uppercase tracking-widest">Листайте</span>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground/30" />
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