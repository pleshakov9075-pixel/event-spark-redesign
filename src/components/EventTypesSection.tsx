import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Building2, PartyPopper, Briefcase, GlassWater, Mic } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const eventTypes = [
  {
    id: "weddings",
    icon: Heart,
    title: "Свадьбы",
    description: "Авторские свадебные церемонии с индивидуальным сценарием. Трогательные моменты, живые эмоции и атмосфера, которую хочется пережить снова.",
    image: "/images/event-wedding-1.jpg",
    stats: "200+ свадеб",
  },
  {
    id: "corporate",
    icon: Building2,
    title: "Корпоративы",
    description: "Деловые и развлекательные мероприятия для компаний. Не шаблонные корпоративы — события, которые работают на лояльность и командный дух.",
    image: "/images/event-corporate-1.jpg",
    stats: "100+ корпоративов",
  },
  {
    id: "birthdays",
    icon: PartyPopper,
    title: "Дни рождения",
    description: "Юбилеи и дни рождения, где каждый гость — часть истории. Персональный подход и неповторимая программа.",
    image: "/images/event-birthday.jpg",
    stats: "Камерные и масштабные",
  },
  {
    id: "private",
    icon: GlassWater,
    title: "Частные ужины",
    description: "Камерные вечера с изысканной атмосферой. Когда важна каждая деталь — от сервировки до финального аккорда.",
    image: "/images/event-dinner.jpg",
    stats: "VIP-формат",
  },
  {
    id: "gala",
    icon: Briefcase,
    title: "Гала-вечера",
    description: "Масштабные мероприятия и презентации брендов. Полный продакшн от сценария до координации на площадке.",
    image: "/images/event-gala.jpg",
    stats: "До 500+ гостей",
  },
  {
    id: "ceremonies",
    icon: Mic,
    title: "Церемонии",
    description: "Выездные церемонии, вручения наград, торжественные открытия. Сценарная режиссура каждого момента.",
    image: "/images/event-wedding-2.jpg",
    stats: "Выезд по всей России",
  },
];

interface EventTypesSectionProps {
  accent?: "emerald" | "wine";
}

const EventTypesSection = ({ accent = "emerald" }: EventTypesSectionProps) => {
  const [active, setActive] = useState(0);
  const activeEvent = eventTypes[active];

  const gradientClass = accent === "emerald" ? "text-gradient-emerald" : "text-gradient-gold";
  const borderActive = accent === "emerald" ? "border-primary/50 bg-primary/5" : "border-wine/50 bg-wine/5";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Left: Type selector */}
      <div className="space-y-3">
        {eventTypes.map((evt, i) => {
          const Icon = evt.icon;
          const isActive = i === active;
          return (
            <ScrollReveal key={evt.id} delay={i * 0.05}>
              <motion.button
                onClick={() => setActive(i)}
                whileHover={{ x: 4 }}
                className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all interactive flex items-center gap-4 ${
                  isActive ? borderActive : "border-border bg-card/30 hover:border-primary/20"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isActive ? "bg-primary/20" : "bg-muted/50"
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-display text-lg font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {evt.title}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">{evt.stats}</p>
                </div>
                <motion.div
                  animate={{ scale: isActive ? 1 : 0 }}
                  className="w-2 h-2 rounded-full bg-primary shrink-0"
                />
              </motion.button>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Right: Image + description */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border">
              <img
                src={activeEvent.image}
                alt={activeEvent.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className={`font-display text-2xl md:text-3xl font-bold mb-2 ${gradientClass}`}>
                {activeEvent.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {activeEvent.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventTypesSection;
