export const agencyPricingConfig = {
  defaultEventType: "wedding",
  defaultGuests: 70,
  defaultDuration: "6h",
  guestLimits: { min: 20, max: 500, step: 10 },
  eventTypes: {
    wedding: { label: "Свадьба", base: 180000, perGuest: 1300 },
    corporate: { label: "Корпоратив", base: 210000, perGuest: 1500 },
    private: { label: "Частный вечер", base: 145000, perGuest: 1100 },
    brand: { label: "Бренд-ивент", base: 260000, perGuest: 1800 },
  },
  durations: {
    "4h": { label: "4 часа", multiplier: 1 },
    "6h": { label: "6 часов", multiplier: 1.2 },
    "8h": { label: "8 часов", multiplier: 1.4 },
    "10h": { label: "10 часов", multiplier: 1.65 },
  },
  options: [
    { id: "decor", label: "Декор-концепция", price: 55000 },
    { id: "content", label: "Фото + видео продакшн", price: 80000 },
    { id: "artists", label: "Кастинг артистов", price: 90000 },
    { id: "soundlight", label: "Сценический свет и звук", price: 65000 },
  ],
} as const;

export type EventTypeKey = keyof typeof agencyPricingConfig.eventTypes;
export type DurationKey = keyof typeof agencyPricingConfig.durations;
export type OptionId = (typeof agencyPricingConfig.options)[number]["id"];
