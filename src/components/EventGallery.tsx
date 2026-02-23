import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

interface EventGalleryProps {
  images: GalleryImage[];
  accent?: "emerald" | "wine";
}

const EventGallery = ({ images, accent = "emerald" }: EventGalleryProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("Все");

  const categories = ["Все", ...Array.from(new Set(images.map((img) => img.category)))];
  const filtered = filter === "Все" ? images : images.filter((img) => img.category === filter);

  const borderAccent = accent === "emerald" ? "border-primary/50" : "border-wine/50";
  const bgAccent = accent === "emerald" ? "bg-primary/20" : "bg-wine/20";
  const textAccent = accent === "emerald" ? "text-primary" : "text-wine-foreground";

  const navigate = (dir: number) => {
    if (selected === null) return;
    const idx = (selected + dir + filtered.length) % filtered.length;
    setSelected(idx);
  };

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setFilter(cat); setSelected(null); }}
            className={`px-4 py-2 rounded-full text-sm font-body transition-all interactive ${
              filter === cat
                ? `${bgAccent} ${textAccent} ${borderAccent} border`
                : "bg-card/50 text-muted-foreground border border-border hover:border-primary/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((img, i) => (
            <motion.div
              key={img.src}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <ScrollReveal delay={i * 0.02}>
                <div
                  onClick={() => setSelected(i)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border border-border cursor-pointer group interactive`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-end p-4">
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 0 }}
                      className="font-body text-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {img.alt}
                    </motion.span>
                  </div>
                  {/* Corner accent */}
                  <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-body ${bgAccent} ${textAccent} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    {img.category}
                  </div>
                </div>
              </ScrollReveal>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setSelected(null); }}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors interactive"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 md:left-8 text-muted-foreground hover:text-foreground transition-colors interactive"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 md:right-8 text-muted-foreground hover:text-foreground transition-colors interactive"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            <motion.img
              key={filtered[selected].src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={filtered[selected].src}
              alt={filtered[selected].alt}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-sm text-muted-foreground">
              {selected + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventGallery;
