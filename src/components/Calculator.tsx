import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Video, MapPin, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: "host" | "agency";
}

const hostGifts = [
  { id: "video", label: "Видеоролик", icon: Video },
  { id: "venue", label: "Помощь с площадкой", icon: MapPin },
  { id: "certificate", label: "Подарочный сертификат", icon: Gift },
  { id: "none", label: "Подарок не нужен", icon: X },
];

const agencyGifts = [
  { id: "voice", label: "Голосовая открытка", icon: Gift },
  { id: "guide", label: "Гайд «7 деталей атмосферы»", icon: Check },
  { id: "none", label: "Подарок не нужен", icon: X },
];

const Calculator = ({ isOpen, onClose, variant = "host" }: CalculatorProps) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    gift: "",
    date: "",
    location: "",
    guests: "",
    contact: "",
    contactMethod: "whatsapp",
  });
  const [submitted, setSubmitted] = useState(false);

  const isWine = variant === "agency";
  const gifts = isWine ? agencyGifts : hostGifts;
  const totalSteps = 3;

  const gradientBtn = isWine ? "bg-gradient-wine" : "bg-gradient-emerald";
  const gradientTitle = isWine ? "text-gradient-gold" : "text-gradient-emerald";
  const shadowCard = isWine ? "shadow-wine" : "shadow-emerald";
  const activeClass = isWine
    ? "border-wine/50 bg-wine/10 shadow-wine"
    : "border-primary bg-primary/10 shadow-emerald";
  const activeIcon = isWine ? "text-wine-foreground" : "text-primary";
  const activeContact = isWine
    ? "border-wine/50 bg-wine/10 text-wine-foreground"
    : "border-primary bg-primary/10 text-primary";
  const progressBg = isWine ? "bg-gradient-wine" : "bg-gradient-emerald";

  const handleNext = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else setSubmitted(true);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setStep(0);
    setData({ gift: "", date: "", location: "", guests: "", contact: "", contactMethod: "whatsapp" });
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={reset}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className={`relative bg-card border border-border rounded-2xl p-6 sm:p-8 md:p-10 max-w-lg w-full ${shadowCard}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={reset} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors interactive">
          <X className="w-5 h-5" />
        </button>

        <h3 className={`font-display text-xl sm:text-2xl md:text-3xl mb-2 ${gradientTitle}`}>Рассчитать стоимость</h3>

        {/* Progress bar */}
        {!submitted && (
          <div className="flex gap-1.5 mb-6 sm:mb-8">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? progressBg : "bg-muted"}`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-6 sm:py-8"
            >
              <div className={`w-16 h-16 rounded-full ${gradientBtn} flex items-center justify-center mx-auto mb-4`}>
                <Check className="w-8 h-8 text-primary-foreground" />
              </div>
              <h4 className="font-display text-xl mb-2">Спасибо!</h4>
              <p className="text-muted-foreground font-body text-sm mb-6">
                Мы подготовим персональное предложение и свяжемся с вами в ближайшее время.
              </p>
              <Button onClick={reset} className={`${gradientBtn} hover:opacity-90 text-primary-foreground interactive`}>
                Вернуться на сайт
              </Button>
            </motion.div>
          ) : step === 0 ? (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="font-body text-muted-foreground text-sm mb-4">Выберите подарок:</p>
              <div className="grid grid-cols-2 gap-3">
                {gifts.map((g) => {
                  const Icon = g.icon;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setData({ ...data, gift: g.id })}
                      className={`p-4 rounded-xl border transition-all text-left interactive ${
                        data.gift === g.id ? activeClass : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${data.gift === g.id ? activeIcon : "text-muted-foreground"}`} />
                      <span className="font-body text-sm">{g.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : step === 1 ? (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">Дата мероприятия *</label>
                <input
                  type="date"
                  value={data.date}
                  onChange={(e) => setData({ ...data, date: e.target.value })}
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 font-body text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">Место проведения</label>
                <input
                  type="text"
                  value={data.location}
                  onChange={(e) => setData({ ...data, location: e.target.value })}
                  placeholder="Город, площадка"
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">Количество гостей</label>
                <input
                  type="number"
                  value={data.guests}
                  onChange={(e) => setData({ ...data, guests: e.target.value })}
                  placeholder="50"
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">Ваш контакт *</label>
                <input
                  type="text"
                  value={data.contact}
                  onChange={(e) => setData({ ...data, contact: e.target.value })}
                  placeholder="Телефон или имя пользователя"
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-3">Способ связи</label>
                <div className="flex flex-wrap gap-3">
                  {["whatsapp", "telegram", "call"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setData({ ...data, contactMethod: m })}
                      className={`px-4 py-2 rounded-lg border font-body text-sm transition-all interactive ${
                        data.contactMethod === m ? activeContact : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {m === "whatsapp" ? "WhatsApp" : m === "telegram" ? "Telegram" : "Звонок"}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!submitted && (
          <div className="flex justify-between mt-6 sm:mt-8">
            {step > 0 ? (
              <button onClick={handleBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm transition-colors interactive">
                <ArrowLeft className="w-4 h-4" /> Назад
              </button>
            ) : <div />}
            <Button
              onClick={handleNext}
              disabled={step === 2 && !data.contact}
              className={`${gradientBtn} hover:opacity-90 text-primary-foreground gap-2 interactive`}
            >
              {step === totalSteps - 1 ? "Отправить" : "Далее"} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Calculator;