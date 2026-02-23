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
      <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setFilter(cat); setSelected(null); }}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-body transition-all interactive ${
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
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
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
                  className="relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden border border-border cursor-pointer group interactive"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-end p-3 sm:p-4">
                    <span className="font-body text-xs sm:text-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                      {img.alt}
                    </span>
                  </div>
                  {/* Corner accent */}
                  <div className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-body ${bgAccent} ${textAccent} opacity-0 group-hover:opacity-100 transition-opacity`}>
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
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-muted-foreground hover:text-foreground transition-colors interactive"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-2 sm:left-4 md:left-8 text-muted-foreground hover:text-foreground transition-colors interactive"
            >
              <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-2 sm:right-4 md:right-8 text-muted-foreground hover:text-foreground transition-colors interactive"
            >
              <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
            </button>
            <motion.img
              key={filtered[selected].src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={filtered[selected].src}
              alt={filtered[selected].alt}
              className="max-w-full max-h-[80vh] sm:max-h-[85vh] rounded-xl sm:rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 font-body text-xs sm:text-sm text-muted-foreground">
              {selected + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventGallery;