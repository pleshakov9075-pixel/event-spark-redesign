export const brandAssets = {
  logoWebp: "/media/logo/artbox-logo-main.webp",
  logoPng: "/media/logo/artbox-logo-main.png",
  logoFallback: "/media/logo/artbox-logo.svg",
};

export const siteContacts = {
  phone: "+7 (999) 000-00-00",
  phoneLink: "tel:+79990000000",
  email: "hello@artbox-event.ru",
  emailLink: "mailto:hello@artbox-event.ru",
  city: "Ижевск, работа по России",
  socials: [
    { label: "Telegram", href: "https://t.me/" },
    { label: "WhatsApp", href: "https://wa.me/79990000000" },
    { label: "VK", href: "https://vk.com/" },
  ],
};

export const hostHero = {
  video: "/media/videos/host-hero.mp4",
  poster: "/media/images/host-hero-poster.webp",
  finalFrame: "/images/host-hero.png",
};

export const agencyHero = {
  video: "/media/videos/agency-hero.mp4",
  poster: "/media/images/agency-hero-poster.webp",
  finalFrame: "/images/agency-hero.webp",
  logo: brandAssets.logoWebp,
  logoFallback: brandAssets.logoPng,
};

export type HostPhotoItem = {
  src: string;
  alt: string;
  title: string;
  accent?: boolean;
};

export const hostPhotoShowcase: HostPhotoItem[] = [
  {
    src: "/media/host/photos/1771868102_699c8fc60c624.webp",
    alt: "Черно-белый портрет Владимира Башмакова",
    title: "Шоумен",
    accent: true,
  },
  {
    src: "/media/host/photos/host-forum-sochi-2025.webp",
    alt: "Афиша форума в Сочи с участием Владимира Башмакова",
    title: "Форум GS 2025",
  },
  {
    src: "/media/host/photos/host-forum-global-2024.webp",
    alt: "Афиша Global Event Forum 2024",
    title: "GEF 2024",
  },
  {
    src: "/media/host/photos/host-event-arms-open.webp",
    alt: "Владимир на мероприятии с поднятыми руками",
    title: "Энергия зала",
  },
  {
    src: "/media/host/photos/host-stage-collage.webp",
    alt: "Владимир ведет интерактив на сцене",
    title: "Сцена",
  },
  {
    src: "/media/host/photos/host-forum-stage-2024.webp",
    alt: "Владимир выступает на форуме в Сочи",
    title: "Форум 2024",
  },
  {
    src: "/media/host/photos/host-mic-audience.webp",
    alt: "Работа с микрофоном и аудиторией",
    title: "Диалог с залом",
  },
  {
    src: "/media/host/photos/host-red-with-guest.webp",
    alt: "Владимир в красном костюме на afterparty",
    title: "Афтепати",
  },
  {
    src: "/media/host/photos/host-red-portrait.webp",
    alt: "Портрет Владимира в красном костюме",
    title: "Портрет",
  },
  {
    src: "/media/host/photos/host-group-photo.webp",
    alt: "Групповое фото с гостями",
    title: "Команда и гости",
  },
  {
    src: "/media/host/photos/host-backstage-smile.webp",
    alt: "Владимир улыбается с гостем за кулисами",
    title: "Бэкстейдж",
  },
  {
    src: "/media/host/photos/host-red-stage.webp",
    alt: "Владимир на красной сцене",
    title: "Красная сцена",
  },
];

export const hostVideoTiles = [
  {
    id: "host-open",
    title: "Энергичное открытие",
    src: "/media/videos/host-reel-01.mp4",
    poster: "/media/host/photos/host-stage-collage.webp",
  },
  {
    id: "host-dialog",
    title: "Диалог с залом",
    src: "/media/videos/host-reel-02.mp4",
    poster: "/media/host/photos/host-mic-audience.webp",
  },
  {
    id: "host-final",
    title: "Финал с эмоцией",
    src: "/media/videos/host-reel-03.mp4",
    poster: "/media/host/photos/host-event-arms-open.webp",
  },
  {
    id: "host-interactive",
    title: "Интерактив на сцене",
    src: "/media/videos/host-reel-04.mp4",
    poster: "/media/host/photos/host-red-stage.webp",
  },
];

export type AgencyCaseItem = {
  slug: string;
  title: string;
  summary: string;
  heroImage: string;
  challenge: string;
  solution: string;
  result: string;
  gallery: string[];
  video?: { src: string; poster: string; title: string };
};

export const agencyCases: AgencyCaseItem[] = [
  {
    slug: "premium-corporate",
    title: "Премиальный корпоратив",
    summary: "Вечер для компании с акцентом на имидж бренда и вовлечение команды.",
    heroImage: "/images/event-corporate-1.webp",
    challenge: "Собрать деловую аудиторию в теплой атмосфере и сохранить ритм без перегруза активностями.",
    solution: "Сценарий из трёх актов: welcome, интерактивный блок, финальный wow-номер. Продакшн и режиссура под ключ.",
    result: "Высокая вовлеченность гостей, сильный визуальный контент и стабильный темп программы весь вечер.",
    gallery: ["/images/event-corporate-1.webp", "/images/event-gala.webp", "/images/event-dinner.webp"],
    video: {
      src: "/media/videos/agency-case-01.mp4",
      poster: "/images/event-gala.webp",
      title: "Иммерсивный вечер",
    },
  },
  {
    slug: "wedding-production",
    title: "Свадебный продакшн",
    summary: "Авторская концепция свадьбы: от сценарного каркаса до визуального продакшна.",
    heroImage: "/images/event-wedding-2.webp",
    challenge: "Создать индивидуальный формат, который выглядит кинематографично и остаётся комфортным для гостей.",
    solution: "Кураторская подготовка, эмоциональная драматургия вечера и синхронизация ведущего с режиссурой площадки.",
    result: "Событие с цельной эстетикой и органичной атмосферой, где каждый блок логично усиливал следующий.",
    gallery: ["/images/event-wedding-2.webp", "/images/event-wedding-1.webp", "/images/event-dinner.webp"],
    video: {
      src: "/media/videos/agency-case-02.mp4",
      poster: "/images/event-dinner.webp",
      title: "Камерный приватный ужин",
    },
  },
  {
    slug: "birthday-concept",
    title: "Концептуальный день рождения",
    summary: "Приватный вечер с акцентом на персональный сценарий и иммерсивную подачу.",
    heroImage: "/images/event-birthday.webp",
    challenge: "Сделать камерный праздник выразительным и исключить шаблонный сценарий.",
    solution: "Разработали уникальные интерактивы и визуальные акценты, собрали команду под конкретный формат события.",
    result: "Гости получили насыщенный вечер с цельным настроением и высокой динамикой без пауз.",
    gallery: ["/images/event-birthday.webp", "/images/event-gala.webp", "/images/event-dinner.webp"],
  },
];

export const agencyCaseCards = agencyCases.map((item) => ({
  slug: item.slug,
  title: item.title,
  summary: item.summary,
  cover: item.heroImage,
  video: item.video,
}));

export const getAgencyCaseBySlug = (slug: string) => agencyCases.find((item) => item.slug === slug);
