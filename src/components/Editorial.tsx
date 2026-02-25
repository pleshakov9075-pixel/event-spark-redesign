import type { MediaItem } from "@/content/media";

interface EditorialProps {
  portraits: MediaItem[];
}

const signatureTechniques = [
  "Интеллектуальный юмор",
  "Ритм и импровизация",
  "Интерактив без кринжа",
];

const Editorial = ({ portraits }: EditorialProps) => {
  const leadPortrait = portraits[0]?.src ?? "/assets/photo/vk/vk-046.jpg";

  return (
    <section className="section-shell" id="editorial">
      <div className="mx-auto max-w-7xl">
        <div className="section-divider" />
        <h2 className="font-editorial mb-10 text-4xl uppercase leading-[0.95] text-white sm:text-6xl">
          Искусство управлять атмосферой
        </h2>

        <div className="grid gap-7 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/[0.02]">
            <img src={leadPortrait} alt="Портрет Владимира Башмакова" className="h-full w-full object-cover" loading="lazy" decoding="async" />
          </div>

          <div className="space-y-7 rounded-3xl border border-white/12 bg-white/[0.02] p-6 sm:p-8">
            <p className="text-base leading-relaxed text-white/76 sm:text-lg">
              Владимир ведет события как режиссер живого действия: точно считывает зал, держит ритм и переводит настроение в
              общий драйв. От камерных вечеров до крупных форумов он управляет вниманием без пафоса, с тонкой подачей и
              сценическим вкусом.
            </p>

            <div className="grid gap-3">
              {signatureTechniques.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/14 bg-black/26 px-4 py-3 text-sm uppercase tracking-[0.12em] text-white/88"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Editorial;
