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
  poster: "/media/images/host-hero-poster.jpg",
  finalFrame: "/images/host-hero.png",
};

export const agencyHero = {
  video: "/media/videos/agency-hero.mp4",
  poster: "/media/images/agency-hero-poster.jpg",
  finalFrame: "/images/agency-hero.jpg",
  logo: "/media/logo/artbox-logo-main.png",
  logoFallback: "/media/logo/artbox-logo.svg",
};

export type HostPhotoVariant = "accent" | "wide" | "tall" | "square";

export type HostPhotoItem = {
  src: string;
  alt: string;
  label: string;
  variant: HostPhotoVariant;
  accent?: boolean;
};

export const hostPhotoShowcase: HostPhotoItem[] = [
  {
    src: "/media/host/photos/1771868102_699c8fc60c624.jpg",
    alt: "Черно-белый портрет Владимира Башмакова",
    label: "Ч/Б акцент",
    variant: "accent",
    accent: true,
  },
  {
    src: "/media/host/photos/host-forum-sochi-2025.jpg",
    alt: "Афиша Event Forum GS 2025",
    label: "Event Forum",
    variant: "square",
  },
  {
    src: "/media/host/photos/host-forum-global-2024.jpg",
    alt: "Афиша Global Event Forum 2024",
    label: "Global Event Forum",
    variant: "square",
  },
  {
    src: "/media/host/photos/host-event-arms-open.jpg",
    alt: "Владимир на мероприятии с поднятыми руками",
    label: "Живой зал",
    variant: "wide",
  },
  {
    src: "/media/host/photos/host-stage-collage.jpg",
    alt: "Коллаж выступления Владимира на сцене",
    label: "Сцена",
    variant: "wide",
  },
  {
    src: "/media/host/photos/host-forum-stage-2024.jpg",
    alt: "Владимир на форуме в Сочи 2024",
    label: "Форум / Live",
    variant: "wide",
  },
  {
    src: "/media/host/photos/host-mic-audience.jpg",
    alt: "Владимир ведет программу в зале",
    label: "В зале",
    variant: "wide",
  },
  {
    src: "/media/host/photos/host-red-with-guest.jpg",
    alt: "Владимир в красном костюме с гостьей",
    label: "Afterparty",
    variant: "tall",
  },
  {
    src: "/media/host/photos/host-red-portrait.jpg",
    alt: "Портрет Владимира в красном костюме",
    label: "Editorial",
    variant: "tall",
  },
  {
    src: "/media/host/photos/host-group-photo.jpg",
    alt: "Групповое фото с Владимиром",
    label: "Команда и гости",
    variant: "wide",
  },
  {
    src: "/media/host/photos/host-backstage-smile.jpg",
    alt: "Владимир с гостем на мероприятии",
    label: "Backstage",
    variant: "square",
  },
  {
    src: "/media/host/photos/host-red-stage.jpg",
    alt: "Владимир на красной сцене",
    label: "Красная сцена",
    variant: "tall",
  },
];

export const hostVideoTiles = [
  {
    title: "Энергичное открытие",
    src: "/media/videos/host-reel-01.mp4",
    poster: "/assets/photo/vk/vk-009.jpg",
  },
  {
    title: "Диалог с залом",
    src: "/media/videos/host-reel-02.mp4",
    poster: "/assets/photo/vk/vk-018.jpg",
  },
  {
    title: "Финал с эмоцией",
    src: "/media/videos/host-reel-03.mp4",
    poster: "/assets/photo/vk/vk-030.jpg",
  },
  {
    title: "Интерактив на сцене",
    src: "/media/videos/host-reel-04.mp4",
    poster: "/assets/photo/vk/vk-046.jpg",
  },
];

export const agencyCaseTiles = [
  {
    type: "image" as const,
    title: "Премиальный корпоратив",
    src: "/images/event-corporate-1.jpg",
  },
  {
    type: "video" as const,
    title: "Иммерсивный вечер",
    src: "/media/videos/agency-case-01.mp4",
    poster: "/images/event-gala.jpg",
  },
  {
    type: "image" as const,
    title: "Свадебный продакшн",
    src: "/images/event-wedding-2.jpg",
  },
  {
    type: "video" as const,
    title: "Камерный private dinner",
    src: "/media/videos/agency-case-02.mp4",
    poster: "/images/event-dinner.jpg",
  },
];
