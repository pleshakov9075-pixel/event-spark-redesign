import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Gem, Crown, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQSection from "@/components/FAQSection";
import Calculator from "@/components/Calculator";
import Footer from "@/components/Footer";

const packages = [
  {
    name: "Атмосфера",
    icon: Sparkles,
    features: ["Авторская концепция", "Премиум-ведение", "Саунд-дизайн", "Координация"],
  },
  {
    name: "Событие",
    icon: Gem,
    features: ["Всё из «Атмосфера»", "Авторский сценарий", "Режиссура", "Продюсирование"],
    highlighted: true,
  },
  {
    name: "Создание",
    icon: Crown,
    features: ["Всё из «Событие»", "Кастинг артистов", "Полное продюсирование", "VIP-сопровождение"],
  },
];

const testimonials = [
  { name: "Маргарита и Дмитрий", text: "Art-Box превратили нашу свадьбу в настоящий спектакль. Каждая деталь была продумана до мелочей — от сценария до финального фейерверка.", event: "Свадьба" },
  { name: "Ирина", text: "Команда Art-Box — это волшебники. Они услышали наши пожелания и создали событие, которое превзошло все ожидания.", event: "Юбилей" },
  { name: "Арина и Сергей", text: "Профессионализм высочайшего уровня. Гости до сих пор вспоминают наш праздник как лучшее событие в жизни.", event: "Свадьба" },
];

const faqItems = [
  { q: "Чем вы отличаетесь от других агентств?", a: "Мы не тиражируем решения. Каждое событие — авторская постановка с уникальным сценарием, режиссурой и художественным решением." },
  { q: "Какова стоимость сопровождения?", a: "Стоимость зависит от выбранного пакета и масштаба мероприятия. Воспользуйтесь калькулятором или свяжитесь с нами для персонального предложения." },
  { q: "Работаете ли вы в других городах?", a: "Да, мы работаем по всей России и за рубежом. У нас есть опыт организации мероприятий в разных странах." },
  { q: "Возможен ли договор?", a: "Обязательно. Мы работаем официально, заключаем договор и предоставляем все необходимые документы." },
  { q: "Можно ли заказать только ведущего?", a: "Да, вы можете заказать только ведущего без полного пакета сопровождения. Перейдите на страницу ведущего для деталей." },
  { q: "С чего начать?", a: "Оставьте заявку через калькулятор или напишите нам. Мы проведём бесплатную консультацию и обсудим вашу идею." },
];

const Agency = () => {
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-dark">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors interactive font-body text-sm">
            <ArrowLeft className="w-4 h-4" /> Главная
          </Link>
          <Button onClick={() => setCalcOpen(true)} size="sm" className="bg-gradient-wine hover:opacity-90 text-secondary-foreground interactive">
            Рассчитать стоимость
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/agency-work.jpg" alt="Art-Box Agency за работой" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/50" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-body text-wine-foreground text-sm md:text-base tracking-widest uppercase mb-4">Event Agency</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              Art-Box
              <br />
              <span className="text-gradient-gold">творческая лаборатория</span>
            </h1>
            <p className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Создаём мероприятия, которые остаются внутри. Не тиражируем, не повторяемся — каждое событие является авторской постановкой.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setCalcOpen(true)} size="lg" className="bg-gradient-wine hover:opacity-90 text-secondary-foreground text-base px-8 interactive">
                Рассчитать стоимость
              </Button>
              <Button variant="outline" size="lg" className="border-wine/30 text-wine-foreground hover:bg-wine/10 text-base px-8 interactive">
                Обсудить проект
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-display text-2xl md:text-4xl font-light text-foreground/90 leading-relaxed">
              Мы не организуем мероприятия — мы{" "}
              <span className="text-gradient-gold font-semibold">режиссируем эмоции</span>.
              Каждый проект начинается с вашей истории и превращается в{" "}
              <span className="italic">незабываемый опыт</span>.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 md:py-32 px-6 bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Пакеты услуг" subtitle="Выберите уровень сопровождения для вашего события" accent="wine" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => {
              const Icon = pkg.icon;
              return (
                <ScrollReveal key={pkg.name} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className={`rounded-2xl p-8 border transition-all interactive ${
                      pkg.highlighted
                        ? "border-wine/50 bg-wine/5 shadow-wine"
                        : "border-border bg-card/50 hover:border-wine/30"
                    }`}
                  >
                    {pkg.highlighted && (
                      <span className="font-body text-xs uppercase tracking-widest text-wine-foreground bg-wine/20 px-3 py-1 rounded-full mb-4 inline-block">
                        Популярный
                      </span>
                    )}
                    <Icon className={`w-8 h-8 mb-4 ${pkg.highlighted ? "text-gold" : "text-muted-foreground"}`} />
                    <h3 className="font-display text-2xl font-bold mb-4">{pkg.name}</h3>
                    <ul className="space-y-3">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => setCalcOpen(true)}
                      className={`w-full mt-6 interactive ${
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
      <section className="py-20 md:py-32 px-6">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient-gold mb-4">Начнём создавать?</h2>
            <p className="font-body text-muted-foreground mb-8">Расскажите о вашей идее, и мы превратим её в незабываемое событие.</p>
            <Button onClick={() => setCalcOpen(true)} size="lg" className="bg-gradient-wine hover:opacity-90 text-secondary-foreground text-base px-10 interactive">
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
