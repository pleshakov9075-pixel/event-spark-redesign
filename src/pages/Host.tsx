import { useEffect } from "react";
import { motion } from "framer-motion";
import HeroVideo from "@/components/HeroVideo";
import ScrollReveal from "@/components/ScrollReveal";
import SiteLayout from "@/components/SiteLayout";
import HostPhotoGrid from "@/components/HostPhotoGrid";
import VideoShowcase from "@/components/VideoShowcase";
import ContactFormSection from "@/components/ContactFormSection";
import { hostHero, hostVideoTiles } from "@/content/siteData";

const keyBenefits = [
  {
    title: "Счастливые гости",
    text: "Создаю атмосферу, где гости активно участвуют, чувствуют себя комфортно и уходят с настоящими эмоциями.",
  },
  {
    title: "Интерактив про пару",
    text: "Собираю информацию о женихе и невесте (или юбилярах) заранее и органично вплетаю это в программу.",
  },
  {
    title: "Универсальная программа",
    text: "Сценарий подходит гостям разных возрастов и темпераментов: вовлекаю без неловких пауз и перегруза.",
  },
  {
    title: "Персонализированная церемония",
    text: "Каждый вечер пишется под заказчиков как живая история, а не шаблонный набор конкурсов.",
  },
];

const formatCards = [
  {
    title: "Свадьбы",
    description: "Авторская драматургия вечера, мягкий темп и живые интерактивы.",
    photos: [
      "/media/host/photos/host-red-stage.webp",
      "/media/host/photos/host-red-with-guest.webp",
      "/media/host/photos/host-group-photo.webp",
      "/media/host/photos/1771868102_699c8fc60c624.webp",
    ],
  },
  {
    title: "Корпоративы",
    description: "Энергия, командная динамика и интеллигентный юмор без перегруза.",
    photos: [
      "/media/host/photos/host-mic-audience.webp",
      "/media/host/photos/host-event-arms-open.webp",
      "/media/host/photos/host-backstage-smile.webp",
      "/media/host/photos/host-group-photo.webp",
    ],
  },
  {
    title: "Частные события",
    description: "Камерные ужины, юбилеи и вечера, где важна атмосфера и такт.",
    photos: [
      "/media/host/photos/host-red-portrait.webp",
      "/media/host/photos/host-stage-collage.webp",
      "/media/host/photos/host-red-with-guest.webp",
      "/media/host/photos/host-backstage-smile.webp",
    ],
  },
  {
    title: "Форумы и премии",
    description: "Сценическая уверенность, работа с аудиторией и точный тайминг.",
    photos: [
      "/media/host/photos/host-forum-sochi-2025.webp",
      "/media/host/photos/host-forum-global-2024.webp",
      "/media/host/photos/host-forum-stage-2024.webp",
      "/media/host/photos/host-mic-audience.webp",
    ],
  },
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
      <section className="relative h-[70svh] min-h-[420px] bg-[#080b12] sm:h-[calc(100vh-4rem)]">
        <HeroVideo
          src={hostHero.video}
          poster={hostHero.poster}
          finalFrameSrc={hostHero.finalFrame}
          loop
          showFinalFrameOnEnd={false}
          overlayClassName="bg-[linear-gradient(180deg,rgba(6,7,11,0.44)_0%,rgba(8,10,15,0.82)_62%,rgba(8,10,15,0.97)_100%)] sm:bg-[linear-gradient(180deg,rgba(6,7,11,0.28)_0%,rgba(8,10,15,0.76)_68%,rgba(8,10,15,0.96)_100%)]"
        >
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-5 pb-8 sm:px-6 sm:pb-20">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(2.5rem,14vw,4.2rem)] leading-[0.9] tracking-[0.05em] text-[#f7e8ca] sm:text-8xl"
              >
                Владимир Башмаков
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 max-w-2xl text-xs uppercase tracking-[0.16em] text-[#d4c39f] sm:mt-5 sm:text-base sm:tracking-[0.2em]"
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

      <section className="bg-[#0d1018] px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Что получает заказчик</h3>
          </ScrollReveal>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {keyBenefits.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.04}>
                <article className="rounded-2xl border border-white/10 bg-[#10131bcc] p-6">
                  <h4 className="font-display text-3xl tracking-[0.05em] text-[#f5e6c8]">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#afb1be]">{item.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="host-photos" className="px-6 py-16 sm:py-24">
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

      <section id="host-video" className="bg-[#0d1018] px-6 py-16 sm:py-24">
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

      <section id="host-formats" className="px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h3 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Форматы</h3>
          </ScrollReveal>
          <div className="mt-7 grid gap-5">
            {formatCards.map((card, index) => (
              <ScrollReveal key={card.title} delay={index * 0.04}>
                <article className="rounded-2xl border border-white/10 bg-[#11131bcc] p-5 sm:p-6">
                  <h4 className="font-display text-3xl tracking-[0.05em] text-[#f5e6c8]">{card.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#afb1be]">{card.description}</p>
                  <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1">
                    {card.photos.map((photo) => (
                      <img
                        key={photo}
                        src={photo}
                        alt={`${card.title} — фото`}
                        className="h-52 w-auto min-w-[170px] rounded-xl border border-white/10 object-contain bg-[#0e1118] p-1"
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="host-reviews" className="bg-[#0d1018] px-6 py-16 sm:py-24">
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
