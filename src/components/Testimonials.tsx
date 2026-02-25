const testimonials = [
  {
    quote: "Здесь будет реальный отзыв клиента: 2-3 строки о драйве, такте и работе с залом.",
    author: "Кейс #1",
    role: "Корпоративный вечер",
  },
  {
    quote: "Здесь будет реальный отзыв клиента: про атмосферу, вовлечение гостей и точный тайминг.",
    author: "Кейс #2",
    role: "Свадебное событие",
  },
  {
    quote: "Здесь будет реальный отзыв клиента: про импровизацию, юмор и уверенную сценическую подачу.",
    author: "Кейс #3",
    role: "Форум / деловая программа",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-shell">
      <div className="mx-auto max-w-7xl">
        <div className="section-divider" />
        <h2 className="font-editorial mb-8 text-4xl uppercase leading-[0.95] text-white sm:mb-10 sm:text-6xl">Отзывы и кейсы</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.author} className="rounded-2xl border border-white/12 bg-white/[0.02] p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-white/72">{item.quote}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-white">{item.author}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/45">{item.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
