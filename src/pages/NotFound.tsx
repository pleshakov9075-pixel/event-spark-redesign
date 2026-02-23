import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const confettiColors = [
  "hsl(160, 65%, 28%)",
  "hsl(345, 45%, 28%)",
  "hsl(42, 70%, 55%)",
  "hsl(160, 70%, 35%)",
  "hsl(345, 50%, 40%)",
];

const Confetti = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-3 rounded-sm"
        style={{
          backgroundColor: confettiColors[i % confettiColors.length],
          left: `${Math.random() * 100}%`,
          top: `-${Math.random() * 20}%`,
        }}
        animate={{
          y: ["0vh", "110vh"],
          rotate: [0, Math.random() * 720],
          opacity: [1, 0],
        }}
        transition={{
          duration: 2.5 + Math.random() * 2,
          delay: Math.random() * 2,
          repeat: Infinity,
          ease: "easeIn",
        }}
      />
    ))}
  </div>
);

const NotFound = () => {
  return (
    <main className="min-h-screen bg-gradient-dark flex items-center justify-center px-6 relative overflow-hidden">
      <Confetti />
      <div className="text-center relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <h1 className="font-display text-8xl md:text-9xl font-bold text-gradient-emerald mb-4">404</h1>
          <p className="font-display text-2xl md:text-3xl text-foreground mb-2">Страница не найдена</p>
          <p className="font-body text-muted-foreground mb-8">Похоже, это событие ещё не создано</p>
          <Link to="/">
            <Button size="lg" className="bg-gradient-emerald hover:opacity-90 text-primary-foreground interactive">
              Вернуться на главную
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;
