import { motion } from "framer-motion";

const formats = [
  {
    title: "Корпоратив",
    text: "Сценарий, который собирает команду в единый ритм и добавляет энергии бренду.",
  },
  {
    title: "Свадьба",
    text: "Интеллигентная динамика вечера, где внимание к паре и гостям остается главным.",
  },
  {
    title: "Юбилей",
    text: "Теплая атмосфера с живыми импровизациями и точным чувством темпа.",
  },
  {
    title: "Форум",
    text: "Четкая модерация, плотный тайминг и уверенная работа с большой аудиторией.",
  },
];

const Formats = () => {
  return (
    <section id="formats" className="section-shell">
      <div className="mx-auto max-w-7xl">
        <div className="section-divider" />
        <h2 className="font-editorial mb-8 text-4xl uppercase leading-[0.95] text-white sm:mb-10 sm:text-6xl">Форматы</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {formats.map((format, index) => (
            <motion.article
              key={format.title}
              whileHover={{ y: -6, rotateX: -3, rotateY: index % 2 === 0 ? 2.5 : -2.5 }}
              transition={{ duration: 0.22 }}
              className="relative overflow-hidden rounded-3xl border border-white/12 bg-[linear-gradient(155deg,rgba(255,255,255,0.07)_0%,rgba(11,12,16,0.36)_64%)] p-6 [transform-style:preserve-3d]"
            >
              <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-accent/18 blur-3xl" />
              <h3 className="font-editorial text-3xl uppercase tracking-[0.03em] text-white">{format.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">{format.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Formats;
