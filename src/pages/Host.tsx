import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mic, Heart, Zap, Smile, Star, Users, Music, Palette, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQSection from "@/components/FAQSection";
import Calculator from "@/components/Calculator";
import EventGallery from "@/components/EventGallery";
import StatsCounter from "@/components/StatsCounter";
import Footer from "@/components/Footer";
import { useRef } from "react";

const hormones = [
  { name: "Серотонин", desc: "Хорошее настроение. Тёплая атмосфера, в которой каждый гость чувствует себя значимым.", icon: Smile, color: "text-host" },
  { name: "Окситоцин", desc: "Расслабленность. Гости чувствуют себя комфортно и раскрепощённо.", icon: Heart, color: "text-secondary" },
  { name: "Эндорфин", desc: "Трогательные моменты. Искренние эмоции, от которых наворачиваются слёзы радости.", icon: Star, color: "text-host-glow" },
  { name: "Дофамин", desc: "Мурашки. Каждый следующий момент лучше предыдущего.", icon: Zap, color: "text-accent" },
  { name: "Адреналин", desc: "Драйв и энергия. Моменты, от которых захватывает дух.", icon: Mic, color: "text-secondary" },
];

const features = [
  { icon: Users, text: "Не принуждаю к интерактивам и поздравлениям. Не перетягиваю одеяло. Главные — вы и гости" },
  { icon: Music, text: "Использую информацию о вас и гостях. Уникальный контент будет только на вашей свадьбе" },
  { icon: Palette, text: "На моих мероприятиях весело и старшему, и младшему поколению — универсальная программа" },
  { icon: Heart, text: "Создаю трогательные и одновременно смешные церемонии индивидуально под вашу историю" },
  { icon: MessageCircle, text: "Консультация по свадебным специалистам: кого бронировать и на что обратить внимание" },
];

const testimonials = [
  { name: "Ирина", text: "Я не знала, что бывает так: ты просто рассказываешь, что хочешь почувствовать, а Владимир делает так, что это случается. Получился вечер, где каждый гость был внутри большой истории, а не просто на празднике.", event: "Свадьба" },
  { name: "Никита", text: "Мы хотели корпоратив не ради галочки, а с настроением и смыслом. Владимир продумал всё: динамику, музыку, атмосферу. Вечер прошёл идеально — это был подарок всей нашей команде.", event: "Корпоратив" },
  { name: "Арина", text: "У нас не было времени на долгие репетиции. Владимир сам всё увидел и сделал. Красиво, точно, вовремя. Когда ты на мероприятии и тебе самому хочется аплодировать — это про него.", event: "Свадьба" },
];

const faqItems = [
  { q: "Как будут выстроены поздравления гостей?", a: "1) Заранее уточняю, готов ли человек говорить тост. 2) Благодаря описаниям гостей готовлю представление каждого — так комфортнее выходить. 3) Предлагаю рассказать забавную историю или первое впечатление от знакомства, чтобы поздравление было живым и душевным." },
  { q: "Можете провести свадьбу без конкурсов?", a: "В таком случае будет больше общения вместо конкурсов. Мой подход — создание атмосферы, а не заполнение времени." },
  { q: "Что будет на первой встрече?", a: "Вначале мы знакомимся — это важно, чтобы понять, с кем проведём один из важных дней в жизни. Если вы знаете, какую свадьбу хотите — помогу реализовать идеи. Если нет — подберу формат под вас и ваших гостей." },
  { q: "Как происходит подготовка к мероприятию?", a: "Утверждаем программу: церемонию, интерактивы, традиции, выступления. Я формирую интерактивы под вас и гостей, работаю с информацией о вашей истории любви, готовлю представление каждого гостя с шутками, информирую гостей в чате и отвечаю на все вопросы." },
  { q: "За какое время приезжаете на площадку?", a: "Приезжаем с DJ за 1,5–2 часа до мероприятия, чтобы встречать гостей будучи полностью подготовленными." },
  { q: "Будут ли перерывы на танцы и общение?", a: "Обязательно! Соблюдаю баланс между программой и перерывами. Гости хотят потанцевать, поболтать, подышать воздухом — всего будет в меру, чтобы никто не устал." },
  { q: "Молодёжь и старшее поколение — как сделать интересно всем?", a: "Подбираю интерактивы и программу так, чтобы комфортно чувствовали себя люди любых возрастов. Программа будет интересна и понятна как старшему поколению, так и молодёжи." },
];

const galleryImages = [
  { src: "/images/host-portrait.png", alt: "Владимир Башмаков — портрет", category: "Портрет" },
  { src: "/images/host-event.png", alt: "На мероприятии", category: "Свадьбы" },
  { src: "/images/host-guests.jpg", alt: "С гостями", category: "Свадьбы" },
  { src: "/images/event-wedding-1.jpg", alt: "Свадебный банкет", category: "Свадьбы" },
  { src: "/images/event-wedding-2.jpg", alt: "Выездная церемония", category: "Свадьбы" },
  { src: "/images/event-corporate-1.jpg", alt: "Корпоративное мероприятие", category: "Корпоративы" },
  { src: "/images/event-birthday.jpg", alt: "День рождения", category: "Дни рождения" },
  { src: "/images/event-dinner.jpg", alt: "Камерный ужин", category: "Частные ужины" },
  { src: "/images/event-gala.jpg", alt: "Гала-вечер", category: "Корпоративы" },
];

const stats = [
  { value: 15, suffix: "+", label: "Лет с микрофоном" },
  { value: 500, suffix: "+", label: "Мероприятий" },
  { value: 30, suffix: "+", label: "Городов" },
  { value: 98, suffix: "%", label: "Рекомендуют" },
];

const Host = () => {
  const [calcOpen, setCalcOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar
        accent="host"
        cta={{ label: "Рассчитать стоимость", onClick: () => setCalcOpen(true) }}
      />

      {/* Hero with parallax */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 relative overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src="/images/host-hero.png" alt="Владимир Башмаков — ведущий" className="w-full h-full object-cover scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/40" />
          <div className="absolute inset-0 bg-gradient-hero-host" />
        </motion.div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="flex items-center justify-center gap-3 mb-4 sm:mb-5"
            >
              <span className="h-px w-8 sm:w-10 bg-host/40" />
              <span className="font-body text-host text-xs sm:text-sm tracking-[0.25em] uppercase font-medium">Ведущий мероприятий</span>
              <span className="h-px w-8 sm:w-10 bg-host/40" />
            </motion.div>
            <h1 className="font-display font-bold mb-4 sm:mb-6">
              Амбассадор <br />
              <span className="text-gradient-emerald">ярких событий</span>
            </h1>
            <p className="font-body text-foreground/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
              15 лет с микрофоном. Комфортно, интеллигентно, весело, с душой, индивидуально и современно.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button onClick={() => setCalcOpen(true)} size="lg" className="bg-gradient-emerald hover:opacity-90 text-primary-foreground text-sm sm:text-base px-6 sm:px-8 interactive">
                Рассчитать стоимость
              </Button>
              <Button variant="outline" size="lg" className="border-host/25 text-host hover:bg-host/10 text-sm sm:text-base px-6 sm:px-8 interactive">
                Познакомимся?
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-dark">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Галерея мероприятий" subtitle="Свадьбы, корпоративы, частные ужины и дни рождения" />
          <EventGallery images={galleryImages} accent="emerald" />
        </div>
      </section>

      {/* Storytelling - Hormones */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Пять гормонов вашего праздника" subtitle="На мероприятиях стараюсь, чтобы гости почувствовали выброс этих пяти гормонов — и напрочь забыли про кортизол." />
          <div className="space-y-3 sm:space-y-4">
            {hormones.map((h, i) => {
              const Icon = h.icon;
              return (
                <ScrollReveal key={h.name} delay={i * 0.05} direction={i % 2 === 0 ? "left" : "right"}>
                  <motion.div
                    whileHover={{ scale: 1.01, x: i % 2 === 0 ? 6 : -6 }}
                    className="flex items-start gap-4 sm:gap-6 p-5 sm:p-6 md:p-8 rounded-2xl glass-strong border border-border/50 hover:border-host/30 transition-all group interactive"
                  >
                    <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-host/8 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-host/15 transition-all">
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${h.color}`} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold mb-1">{h.name}</h3>
                      <p className="font-body text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">{h.desc}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Почему выбирают меня" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="p-5 sm:p-7 rounded-2xl glass-strong border border-border/50 hover:border-host/30 transition-all group interactive hover:shadow-emerald"
                  >
                    <div className="w-10 h-10 rounded-xl bg-host/8 flex items-center justify-center mb-4 group-hover:bg-host/15 group-hover:scale-110 transition-all">
                      <Icon className="w-5 h-5 text-host" />
                    </div>
                    <p className="font-body text-sm text-foreground/80 leading-relaxed">{f.text}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider testimonials={testimonials} accent="emerald" />

      {/* FAQ */}
      <FAQSection items={faqItems} accent="emerald" />

      {/* CTA */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="/images/event-wedding-1.jpg" alt="" className="w-full h-full object-cover blur-2xl scale-110" />
        </div>
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-gradient-emerald mb-4 sm:mb-6">Обсудим ваш праздник?</h2>
            <p className="font-body text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">Расскажите о вашем мероприятии, и мы создадим для вас что-то особенное.</p>
            <Button onClick={() => setCalcOpen(true)} size="lg" className="bg-gradient-emerald hover:opacity-90 text-primary-foreground text-sm sm:text-base px-8 sm:px-10 interactive">
              Рассчитать стоимость
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
      <Calculator isOpen={calcOpen} onClose={() => setCalcOpen(false)} variant="host" />
    </main>
  );
};

export default Host;
