export const agencyPricingConfig = {
  defaultEventType: "wedding",
  defaultGuests: 70,
  defaultCity: "Ижевск",
  defaultContactMethod: "whatsapp",
  defaultGift: "voice-card",
  guestLimits: { min: 20, max: 700, step: 10 },
  eventTypes: {
    wedding: { label: "Свадьба", base: 140000, perGuest: 1400 },
    corporate: { label: "Корпоратив", base: 150000, perGuest: 1600 },
    private: { label: "Приватное событие", base: 120000, perGuest: 1300 },
    forum: { label: "Форум / конференция", base: 180000, perGuest: 1700 },
  },
  cityMultipliers: {
    Ижевск: 1,
    Москва: 1.28,
    Казань: 1.17,
    Пермь: 1.12,
    Тюмень: 1.14,
    "Другой город": 1.2,
  },
  contactMethods: {
    whatsapp: { label: "WhatsApp" },
    telegram: { label: "Telegram" },
    phone: { label: "Телефонный звонок" },
  },
  gifts: {
    "voice-card": { label: "Голосовая открытка от ART BOX" },
    "guide-7-details": { label: "Гайд «7 деталей, которые создают атмосферу»" },
  },
} as const;

export type EventTypeKey = keyof typeof agencyPricingConfig.eventTypes;
export type CityKey = keyof typeof agencyPricingConfig.cityMultipliers;
export type ContactMethodKey = keyof typeof agencyPricingConfig.contactMethods;
export type GiftKey = keyof typeof agencyPricingConfig.gifts;
