import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  agencyPricingConfig,
  type DurationKey,
  type EventTypeKey,
  type OptionId,
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
  const [duration, setDuration] = useState<DurationKey>(agencyPricingConfig.defaultDuration);
  const [options, setOptions] = useState<OptionId[]>([]);

  const limits = agencyPricingConfig.guestLimits;

  const estimate = useMemo(() => {
    const event = agencyPricingConfig.eventTypes[eventType];
    const time = agencyPricingConfig.durations[duration];
    const selectedOptionsTotal = options.reduce((sum, optionId) => {
      const option = agencyPricingConfig.options.find((item) => item.id === optionId);
      return sum + (option?.price ?? 0);
    }, 0);

    const base = event.base + guests * event.perGuest + selectedOptionsTotal;
    return Math.round(base * time.multiplier);
  }, [duration, eventType, guests, options]);

  const toggleOption = (optionId: OptionId) => {
    setOptions((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]));
  };

  const changeGuests = (next: number) => {
    if (Number.isNaN(next)) return;
    const clamped = Math.min(limits.max, Math.max(limits.min, next));
    setGuests(clamped);
  };

  const buildEstimateMailTo = () => {
    const selectedOptionLabels = options
      .map((optionId) => agencyPricingConfig.options.find((item) => item.id === optionId)?.label)
      .filter(Boolean)
      .join(", ");

    const body = [
      "Здравствуйте, прошу подготовить смету.",
      "",
      `Тип события: ${agencyPricingConfig.eventTypes[eventType].label}`,
      `Количество гостей: ${guests}`,
      `Длительность: ${agencyPricingConfig.durations[duration].label}`,
      `Доп. опции: ${selectedOptionLabels || "не выбраны"}`,
      `Примерная стоимость: ${money.format(estimate)}`,
    ].join("\n");

    return `${siteContacts.emailLink}?subject=${encodeURIComponent("Запрос сметы Artbox")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="agency-calculator" className="rounded-3xl border border-[#d6b57a38] bg-[#101019e8] p-6 sm:p-8">
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
            <label htmlFor="duration" className="text-xs uppercase tracking-[0.2em] text-[#b9bac6]">
              Длительность
            </label>
            <select
              id="duration"
              value={duration}
              onChange={(event) => setDuration(event.target.value as DurationKey)}
              className="mt-2 w-full rounded-2xl border border-white/15 bg-[#10131acc] px-4 py-4 text-base text-[#f1e2c4] outline-none transition-colors focus:border-[#d6b57a80]"
            >
              {Object.entries(agencyPricingConfig.durations).map(([key, time]) => (
                <option key={key} value={key} className="bg-[#11131a]">
                  {time.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#b9bac6]">Дополнительные опции</span>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {agencyPricingConfig.options.map((option) => {
                const active = options.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleOption(option.id)}
                    className={`interactive rounded-2xl border px-4 py-4 text-left transition-colors ${
                      active
                        ? "border-[#d6b57a99] bg-[#d6b57a1f]"
                        : "border-white/15 bg-[#11131acc] hover:border-[#d6b57a66]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-base text-[#f0dfbe]">{option.label}</span>
                      <span className={`mt-0.5 shrink-0 ${active ? "text-[#f4e3be]" : "text-[#858897]"}`}>
                        <Check className="h-4 w-4" />
                      </span>
                    </div>
                    <motion.span
                      key={`${option.id}-${active ? "on" : "off"}`}
                      initial={{ opacity: 0.5, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 block text-xs uppercase tracking-[0.15em] text-[#b5b7c3]"
                    >
                      + {money.format(option.price)}
                    </motion.span>
                  </button>
                );
              })}
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
            Точная стоимость зависит от площадки, технического райдера и состава команды.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#agency-contacts"
              className="interactive rounded-full border border-[#d6b57a80] bg-[#d6b57a26] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#f4e3be] hover:bg-[#d6b57a38]"
            >
              Получить смету
            </a>
            <a
              href={buildEstimateMailTo()}
              className="interactive rounded-full border border-white/20 bg-[#121621] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#d1d4df] hover:border-[#d6b57a66] hover:text-[#f4e3be]"
            >
              Отправить смету на email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyPriceCalculator;
