import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface StatsCounterProps {
  stats: Stat[];
}

const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-gradient-gold">
      {count}{suffix}
    </span>
  );
};

const StatsCounter = ({ stats }: StatsCounterProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="text-center"
        >
          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          <p className="font-body text-muted-foreground text-xs sm:text-sm mt-1 sm:mt-2">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCounter;