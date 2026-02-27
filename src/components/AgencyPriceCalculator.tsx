import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  agencyPricingConfig,
  type CityKey,
  type ContactMethodKey,
  type EventTypeKey,
  type GiftKey,
} from "@/content/agencyPricing";
import { siteContacts } from "@/content/siteData";

const money = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

const AgencyPriceCalculator = () => {
  const [eventType, setEventType] = useState<EventTypeKey>(agencyPricingConfig.defaultEventType);
  const [guests, setGuests] = useState(agencyPricingConfig.defaultGuests);
  const [city, setCity] = useState(agencyPricingConfig.defaultCity);
  const [contactMethod, setContactMethod] = useState<ContactMethodKey>(agencyPricingConfig.defaultContactMethod);
  const [gift, setGift] = useState<GiftKey>(agencyPricingConfig.defaultGift);

  const limits = agencyPricingConfig.guestLimits;
  const whatsapp = siteContacts.socials.find((item) => item.label === "WhatsApp")?.href ?? siteContacts.phoneLink;
  const telegram = siteContacts.socials.find((item) => item.label === "Telegram")?.href ?? siteContacts.phoneLink;

  const estimate = useMemo(() => {
    const event = agencyPricingConfig.eventTypes[eventType];
    const cityMultiplier =
      agencyPricingConfig.cityMultipliers[city as CityKey] ?? agencyPricingConfig.cityMultipliers["Другой город"];
    const base = event.base + guests * event.perGuest;
    return Math.round(base * cityMultiplier);
  }, [city, eventType, guests]);

  const changeGuests = (next: number) => {
    if (Number.isNaN(next)) return;
    const clamped = Math.min(limits.max, Math.max(limits.min, next));
    setGuests(clamped);
  };

  const submitEstimate = () => {
    const text = [
      "Здравствуйте! Нужна смета ART BOX.",
      `Тип события: ${agencyPricingConfig.eventTypes[eventType].label}`,
      `Количество гостей: ${guests}`,
      `Город: ${city}`,
      `Предпочтительный канал связи: ${agencyPricingConfig.contactMethods[contactMethod].label}`,
      `Подарок: ${agencyPricingConfig.gifts[gift].label}`,
      `Примерная стоимость: ${money.format(estimate)}`,
    ].join("\n");

    if (contactMethod === "whatsapp") {
      const base = whatsapp.includes("?") ? `${whatsapp}&` : `${whatsapp}?`;
      window.open(`${base}text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      return;
    }

    if (contactMethod === "telegram") {
      window.open(telegram, "_blank", "noopener,noreferrer");
      navigator.clipboard?.writeText(text).catch(() => undefined);
      return;
    }

    window.location.href = siteContacts.phoneLink;
  };

  return (
    <section id="agency-calculator" className="rounded-3xl border border-[#d6b57a30] bg-[#101019cc] p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-7">
          <div>
            <label htmlFor="event-type" className="text-xs uppercase tracking-[0.2em] text-[#b9bac6]">
              Тип события
            </label>
            <select
              id="event-type"
              value={eventType}
              onChange={(event) => setEventType(event.target.value as EventTypeKey)}
              className="mt-2 w-full rounded-2xl border border-white/15 bg-[#10131acc] px-4 py-4 text-base text-[#f1e2c4] outline-none transition-colors focus:border-[#d6b57a80]"
            >
              {Object.entries(agencyPricingConfig.eventTypes).map(([key, type]) => (
                <option key={key} value={key} className="bg-[#11131a]">
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#b9bac6]">Количество гостей</span>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => changeGuests(guests - limits.step)}
                className="interactive rounded-xl border border-white/15 bg-[#131722] p-3 text-[#d7c298] hover:border-[#d6b57a66]"
                aria-label="Уменьшить количество гостей"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min={limits.min}
                max={limits.max}
                step={limits.step}
                value={guests}
                onChange={(event) => changeGuests(Number(event.target.value))}
                className="w-28 rounded-xl border border-white/15 bg-[#121722] px-3 py-2 text-center font-display text-3xl leading-none text-[#f0dfbe] outline-none focus:border-[#d6b57a80]"
                aria-label="Введите количество гостей"
              />
              <button
                type="button"
                onClick={() => changeGuests(guests + limits.step)}
                className="interactive rounded-xl border border-white/15 bg-[#131722] p-3 text-[#d7c298] hover:border-[#d6b57a66]"
                aria-label="Увеличить количество гостей"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <input
              type="range"
              min={limits.min}
              max={limits.max}
              step={limits.step}
              value={guests}
              onChange={(event) => changeGuests(Number(event.target.value))}
              className="mt-4 h-3 w-full cursor-pointer appearance-none rounded-full bg-[#2a2f3e]"
            />
          </div>

          <div>
            <label htmlFor="city-name" className="text-xs uppercase tracking-[0.2em] text-[#b9bac6]">
              Город
            </label>
            <input
              id="city-name"
              list="agency-city-list"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/15 bg-[#10131acc] px-4 py-4 text-base text-[#f1e2c4] outline-none transition-colors focus:border-[#d6b57a80]"
              placeholder="Введите город"
            />
            <datalist id="agency-city-list">
              {Object.keys(agencyPricingConfig.cityMultipliers).map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#b9bac6]">Как связаться?</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(agencyPricingConfig.contactMethods).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setContactMethod(key as ContactMethodKey)}
                  className={`interactive rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] ${
                    contactMethod === key
                      ? "border-[#d6b57a99] bg-[#d6b57a26] text-[#f2dfbe]"
                      : "border-white/20 bg-[#121622] text-[#c9ccda] hover:border-[#d6b57a66]"
                  }`}
                >
                  {value.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#b9bac6]">Выберите подарок</span>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {Object.entries(agencyPricingConfig.gifts).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setGift(key as GiftKey)}
                  className={`interactive rounded-2xl border px-4 py-4 text-left text-sm ${
                    gift === key
                      ? "border-[#d6b57a99] bg-[#d6b57a1f] text-[#f2dfbe]"
                      : "border-white/15 bg-[#11131acc] text-[#c3c6d5] hover:border-[#d6b57a66]"
                  }`}
                >
                  {value.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#d6b57a40] bg-[#0b0d13] p-6">
          <div className="flex items-center gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a6a8b4]">Примерная смета</p>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="interactive rounded-full border border-white/20 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[#c4c7d1] hover:border-[#d6b57a66]"
                  aria-label="Пояснение по стоимости"
                >
                  ?
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Стоимость примерная и уточняется после брифа.</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <motion.p
            key={estimate}
            initial={{ opacity: 0.35, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-display text-5xl leading-none text-[#f2e2c3]"
          >
            {money.format(estimate)}
          </motion.p>

          <p className="mt-4 text-sm leading-relaxed text-[#aeb0bd]">
            Мы не работаем по шаблону «цена за час». Итог формируется от идеи, масштаба и состава команды.
          </p>

          <button
            type="button"
            onClick={submitEstimate}
            className="interactive mt-6 rounded-full border border-[#d6b57a80] bg-[#d6b57a26] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#f4e3be] hover:bg-[#d6b57a38]"
          >
            Отправить смету
          </button>
        </div>
      </div>
    </section>
  );
};

export default AgencyPriceCalculator;
