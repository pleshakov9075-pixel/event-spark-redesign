import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  accent?: "emerald" | "wine";
}

const FAQSection = ({ items, accent = "emerald" }: FAQSectionProps) => {
  return (
    <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <SectionHeading title="Частые вопросы" accent={accent} />
        <ScrollReveal>
          <Accordion type="single" collapsible className="space-y-2 sm:space-y-3">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-lg px-4 sm:px-6 bg-card/50"
              >
                <AccordionTrigger className="font-display text-sm sm:text-base md:text-lg hover:text-primary transition-colors py-4 sm:py-5 text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed pb-4 sm:pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQSection;