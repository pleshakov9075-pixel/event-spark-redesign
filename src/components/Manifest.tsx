const pillars = ["Тонко", "Смело", "Интеллигентно"];

const Manifest = () => {
  return (
    <section className="section-shell" id="manifest">
      <div className="mx-auto max-w-6xl">
        <div className="section-divider" />
        <div className="grid gap-10 md:grid-cols-[1.25fr_1fr] md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/48">Manifest</p>
            <h2 className="font-editorial mt-4 text-4xl uppercase leading-[0.96] text-white sm:text-6xl">
              Искусство
              <br />
              управлять атмосферой.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/68 sm:text-lg">
              Пауза. Взрыв смеха. Музыка. И все ваши — вместе.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {pillars.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/12 bg-white/[0.03] px-3 py-4 text-center text-[11px] uppercase tracking-[0.22em] text-white/84 sm:text-xs"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manifest;
