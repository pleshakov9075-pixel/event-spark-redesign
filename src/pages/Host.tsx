import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Mic, Heart, Zap, Smile, Star, Users, Music, Palette, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQSection from "@/components/FAQSection";
import Calculator from "@/components/Calculator";
import Footer from "@/components/Footer";

const hormones = [
  { name: "Серотонин", desc: "Хорошее настроение. Тёплая атмосфера, в которой каждый гость чувствует себя значимым.", icon: Smile, color: "text-yellow-400" },
  { name: "Окситоцин", desc: "Расслабленность. Гости чувствуют себя комфортно и раскрепощённо.", icon: Heart, color: "text-pink-400" },
  { name: "Эндорфин", desc: "Трогательные моменты. Искренние эмоции, от которых наворачиваются слёзы радости.", icon: Star, color: "text-emerald-glow" },
  { name: "Дофамин", desc: "Мурашки. Каждый следующий момент лучше предыдущего.", icon: Zap, color: "text-blue-400" },
  { name: "Адреналин", desc: "Драйв и энергия. Моменты, от которых захватывает дух.", icon: Mic, color: "text-red-400" },
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

const Host = () => {
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-dark">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors interactive font-body text-sm">
            <ArrowLeft className="w-4 h-4" /> Главная
          </Link>
          <Button onClick={() => setCalcOpen(true)} size="sm" className="bg-gradient-emerald hover:opacity-90 text-primary-foreground interactive">
            Рассчитать стоимость
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/host-stage.jpg" alt="Владимир Башмаков на сцене" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-body text-primary text-sm md:text-base tracking-widest uppercase mb-4">Ведущий мероприятий</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              Амбассадор <br />
              <span className="text-gradient-emerald">ярких событий</span>
            </h1>
            <p className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              15 лет с микрофоном. Комфортно, интеллигентно, весело, с душой, индивидуально и современно.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setCalcOpen(true)} size="lg" className="bg-gradient-emerald hover:opacity-90 text-primary-foreground text-base px-8 interactive">
                Рассчитать стоимость
              </Button>
              <Button variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/10 text-base px-8 interactive">
                Познакомимся?
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Strip */}
      <section className="py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { src: "/images/host-portrait.png", alt: "Владимир Башмаков — портрет" },
              { src: "/images/host-event.png", alt: "Владимир Башмаков на мероприятии" },
              { src: "/images/host-guests.jpg", alt: "Владимир Башмаков с гостями" },
            ].map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Storytelling - Hormones */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Пять гормонов вашего праздника" subtitle="На мероприятиях стараюсь, чтобы гости почувствовали выброс этих пяти гормонов — и напрочь забыли про кортизол." />
          <div className="space-y-6">
            {hormones.map((h, i) => {
              const Icon = h.icon;
              return (
                <ScrollReveal key={h.name} delay={i * 0.05} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className="flex items-start gap-6 p-6 md:p-8 rounded-2xl bg-card/40 border border-border hover:border-primary/30 transition-colors group">
                    <div className={`w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${h.color}`} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-semibold mb-1">{h.name}</h3>
                      <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-32 px-6 bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Почему выбирают меня" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="p-6 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all group interactive hover:shadow-emerald">
                    <Icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <p className="font-body text-sm text-foreground/90 leading-relaxed">{f.text}</p>
                  </div>
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
      <section className="py-20 md:py-32 px-6">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient-emerald mb-4">Обсудим ваш праздник?</h2>
            <p className="font-body text-muted-foreground mb-8">Расскажите о вашем мероприятии, и мы создадим для вас что-то особенное.</p>
            <Button onClick={() => setCalcOpen(true)} size="lg" className="bg-gradient-emerald hover:opacity-90 text-primary-foreground text-base px-10 interactive">
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
