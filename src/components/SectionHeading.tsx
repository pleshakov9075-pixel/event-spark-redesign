import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accent?: "emerald" | "wine" | "gold";
  className?: string;
}

const accentClasses = {
  emerald: "text-gradient-emerald",
  wine: "text-gradient-gold",
  gold: "text-gradient-gold",
};

const SectionHeading = ({ title, subtitle, accent = "emerald", className = "" }: SectionHeadingProps) => {
  return (
    <div className={`text-center mb-12 md:mb-16 ${className}`}>
      <ScrollReveal>
        <h2 className={`font-display text-3xl md:text-5xl lg:text-6xl font-bold ${accentClasses[accent]} mb-4`}>
          {title}
        </h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal delay={0.1}>
          <p className="text-muted-foreground font-body text-lg md:text-xl max-w-2xl mx-auto">
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
};

export default SectionHeading;
