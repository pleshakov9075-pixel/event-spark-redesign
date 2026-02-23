import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Theater } from "lucide-react";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const cards = [
  {
    to: "/host",
    title: "Ведущий",
    tagline: "Амбассадор ярких событий",
    description: "Персональный подход к каждому мероприятию. Создаю атмосферу, в которой гости чувствуют себя свободно.",
    icon: Sparkles,
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
    gradient: "bg-gradient-wine",
    border: "border-gradient-wine",
    shadow: "shadow-wine",
    hoverShadow: "hover:shadow-[0_0_60px_-10px_hsl(345_50%_35%/0.4)]",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-dark">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/images/hero-main.jpg" alt="Владимир Башмаков — ведущий" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 relative z-10"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
            <span className="text-gradient-emerald">Владимир</span>{" "}
            <span className="text-foreground">Башмаков</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-body text-muted-foreground text-lg md:text-xl max-w-xl mx-auto"
          >
            Создаём события-произведения искусства для тех, кто ценит атмосферу, эстетику и смысл
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl w-full relative z-10">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.to}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              >
                <Link to={card.to} className="block group interactive">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={`relative rounded-2xl p-8 md:p-10 bg-card/80 ${card.border} ${card.shadow} ${card.hoverShadow} transition-shadow duration-500 overflow-hidden`}
                  >
                    {/* Glow overlay */}
                    <div className={`absolute inset-0 ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    <Icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {card.title}
                    </h2>
                    <p className="font-display text-sm md:text-base italic text-muted-foreground mb-3">
                      {card.tagline}
                    </p>
                    <p className="font-body text-sm text-muted-foreground/80 leading-relaxed">
                      {card.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-primary font-body text-sm group-hover:gap-3 transition-all">
                      Подробнее
                      <motion.span
                        className="inline-block"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-display text-2xl md:text-4xl font-light text-foreground/90 leading-relaxed">
              Мы не тиражируем — мы{" "}
              <span className="text-gradient-emerald font-semibold">создаём</span>.
              Каждое событие — уникальное произведение искусства, отражающее{" "}
              <span className="italic">вашу историю</span>.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
