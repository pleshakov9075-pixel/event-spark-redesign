import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

interface Testimonial {
  name: string;
  text: string;
  event?: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  accent?: "emerald" | "wine";
}

const TestimonialSlider = ({ testimonials, accent = "emerald" }: TestimonialSliderProps) => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];
  const borderClass = accent === "emerald" ? "border-gradient-emerald" : "border-gradient-wine";
  const shadowClass = accent === "emerald" ? "shadow-emerald" : "shadow-wine";

  return (
    <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Отзывы" accent={accent} />
        <ScrollReveal>
          <div className={`relative rounded-2xl p-6 sm:p-8 md:p-12 bg-card ${borderClass} ${shadowClass}`}>
            <Quote className="text-primary/30 w-8 h-8 sm:w-12 sm:h-12 mb-3 sm:mb-4" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-body text-foreground/90 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 italic">
                  «{t.text}»
                </p>
                <div>
                  <p className="font-display text-base sm:text-lg text-foreground">{t.name}</p>
                  {t.event && (
                    <p className="font-body text-xs sm:text-sm text-muted-foreground">{t.event}</p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-3 mt-6 sm:mt-8 justify-center">
              <button
                onClick={prev}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors interactive"
                aria-label="Предыдущий отзыв"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors interactive"
                aria-label="Следующий отзыв"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="flex gap-1.5 justify-center mt-3 sm:mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all interactive ${i === current ? "bg-primary w-6" : "bg-muted-foreground/30"}`}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialSlider;