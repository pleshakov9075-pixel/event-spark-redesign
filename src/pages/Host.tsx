import { useEffect } from "react";
import { motion } from "framer-motion";
import HeroVideo from "@/components/HeroVideo";
import ScrollReveal from "@/components/ScrollReveal";
import SiteLayout from "@/components/SiteLayout";
import HostPhotoGrid from "@/components/HostPhotoGrid";
import VideoShowcase from "@/components/VideoShowcase";
import ContactFormSection from "@/components/ContactFormSection";
import { hostHero, hostVideoTiles } from "@/content/siteData";

const services = [
  { title: "Свадьбы", description: "Авторская драматургия вечера, мягкий темп и живые интерактивы." },
  { title: "Корпоративы", description: "Энергия, командная динамика и интеллигентный юмор без перегруза." },
  { title: "Частные события", description: "Камерные ужины, юбилеи и вечера, где важна атмосфера и такт." },
  { title: "Форумы и премии", description: "Сценическая уверенность, работа с аудиторией и точный тайминг." },
];

const testimonials = [
  {
    author: "Екатерина",
    text: "Владимир дал ощущение, что весь вечер выстроен точно под нас. Легко, стильно, без пауз и неловкости.",
  },
  {
    author: "Андрей",
    text: "Интеллигентный юмор, энергия и чувство меры. Гости отдельно писали слова благодарности.",
  },
  {
    author: "Марина",
    text: "Ни одного шаблонного момента. Всё звучало живо и персонально, а праздник пролетел на одном дыхании.",
  },
];

const Host = () => {
  useEffect(() => {
    document.title = "Ведущий Владимир Башмаков";
  }, []);

  return (
    <SiteLayout branch="host" ctaLabel="Связаться" ctaHref="#host-contacts">
      <section className="relative min-h-[calc(100vh-4rem)]">
        <HeroVideo
          src={hostHero.video}
          poster={hostHero.poster}
          finalFrameSrc={hostHero.finalFrame}
          loop
          showFinalFrameOnEnd={false}
          overlayClassName="bg-[linear-gradient(180deg,rgba(6,7,11,0.18)_0%,rgba(8,10,15,0.72)_68%,rgba(8,10,15,0.95)_100%)]"
        >
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-6 pb-14 sm:pb-20">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-6xl leading-[0.9] tracking-[0.06em] text-[#f7e8ca] sm:text-8xl"
              >
                Владимир Башмаков
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 max-w-2xl text-sm uppercase tracking-[0.2em] text-[#d4c39f] sm:text-base"
              >
                ведущий, продюсер эмоций, амбассадор ярких событий
              </motion.p>
            </div>
          </div>
        </HeroVideo>
      </section>

      <section id="host-about" className="px-6 py-16 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal>
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-[#c6b18b]">О ведущем</p>
              <h2 className="mt-3 font-display text-5xl leading-[0.92] tracking-[0.06em] text-[#f4e3c3] sm:text-6xl">
                Мероприятия, которые запоминают сердцем
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p className="text-base leading-relaxed text-[#b3b6c4]">
              Более 15 лет веду события разного масштаба. Беру на себя ритм, держу внимание аудитории и создаю
              атмосферу, где каждый гость чувствует себя вовлечённо и комфортно.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section id="host-photos" className="bg-[#0d1018] px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Фото</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#aeb2c1]">
              Акцентный чёрно-белый кадр + живая подборка событий. Клик по фото открывает полноэкранный просмотр.
            </p>
          </ScrollReveal>
          <div className="mt-7">
            <HostPhotoGrid />
          </div>
        </div>
      </section>

      <section id="host-video" className="px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Видео</h3>
          </ScrollReveal>
          <VideoShowcase
            items={hostVideoTiles}
            subtitle="Единый формат 16:9, кастомное модальное окно и загрузка видео только по клику."
          />
        </div>
      </section>

      <section id="host-formats" className="bg-[#0d1018] px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Форматы</h3>
          </ScrollReveal>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.05}>
                <article className="rounded-2xl border border-white/10 bg-[#11131bd1] p-6">
                  <h4 className="font-display text-3xl tracking-[0.05em] text-[#f5e6c8]">{service.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#afb1be]">{service.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="host-reviews" className="px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Отзывы</h3>
          </ScrollReveal>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <ScrollReveal key={item.author} delay={index * 0.05}>
                <article className="rounded-2xl border border-white/10 bg-[#10131bcc] p-5">
                  <p className="text-sm leading-relaxed text-[#b5b8c6]">{item.text}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#dfcaa0]">{item.author}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ContactFormSection
        id="host-contacts"
        title="Контакты"
        subtitle="Оставьте заявку: обсудим формат события, тайминг и предложим рабочий сценарий под вашу аудиторию."
      />
    </SiteLayout>
  );
};

export default Host;
