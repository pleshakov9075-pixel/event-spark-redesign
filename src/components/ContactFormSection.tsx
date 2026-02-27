import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, Send, X } from "lucide-react";
import { siteContacts } from "@/content/siteData";

interface ContactFormSectionProps {
  id: string;
  title: string;
  subtitle: string;
}

type ContactChannel = "whatsapp" | "telegram" | "phone";

const eventTypeOptions = ["Свадьба", "Корпоратив", "Приватное событие", "Форум / конференция", "Другое"];

const ContactFormSection = ({ id, title, subtitle }: ContactFormSectionProps) => {
  const whatsapp = useMemo(
    () => siteContacts.socials.find((item) => item.label === "WhatsApp")?.href ?? siteContacts.phoneLink,
    [],
  );
  const telegram = useMemo(
    () => siteContacts.socials.find((item) => item.label === "Telegram")?.href ?? siteContacts.phoneLink,
    [],
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState(eventTypeOptions[0]);
  const [comment, setComment] = useState("");
  const [channel, setChannel] = useState<ContactChannel>("whatsapp");
  const [thanksOpen, setThanksOpen] = useState(false);

  const buildLeadText = () =>
    [
      "Здравствуйте! Новая заявка с сайта.",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Email: ${email || "-"}`,
      `Тип события: ${eventType}`,
      `Комментарий: ${comment || "-"}`,
    ].join("\n");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = buildLeadText();

    if (channel === "whatsapp") {
      const base = whatsapp.includes("?") ? `${whatsapp}&` : `${whatsapp}?`;
      window.open(`${base}text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    }

    if (channel === "telegram") {
      window.open(telegram, "_blank", "noopener,noreferrer");
      navigator.clipboard?.writeText(text).catch(() => undefined);
    }

    if (channel === "phone") {
      window.location.href = siteContacts.phoneLink;
    }

    setThanksOpen(true);
  };

  return (
    <section id={id} className="bg-[#0d1018] px-6 py-16 sm:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h3 className="font-display text-5xl tracking-[0.08em] text-[#f3e1bf] sm:text-6xl">{title}</h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#aeb2c1]">{subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={siteContacts.phoneLink}
              className="interactive inline-flex items-center gap-2 rounded-full border border-[#d6b57a80] bg-[#d6b57a1f] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#f5e7cb] hover:bg-[#d6b57a33]"
            >
              <Phone className="h-3.5 w-3.5" />
              Позвонить
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#141722] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#d6d8e2] hover:border-[#d6b57a66] hover:text-[#f5e7cb]"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
            <a
              href={telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#141722] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#d6d8e2] hover:border-[#d6b57a66] hover:text-[#f5e7cb]"
            >
              <Send className="h-3.5 w-3.5" />
              Telegram
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-[#10131bcc] p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-[#b5b8c6]">
              Имя
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="rounded-xl border border-white/15 bg-[#111521] px-4 py-3 text-sm text-[#f2e2c3] outline-none transition-colors focus:border-[#d6b57a99]"
                placeholder="Как к вам обращаться"
              />
            </label>

            <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-[#b5b8c6]">
              Телефон
              <input
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="rounded-xl border border-white/15 bg-[#111521] px-4 py-3 text-sm text-[#f2e2c3] outline-none transition-colors focus:border-[#d6b57a99]"
                placeholder="+7 ..."
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-[#b5b8c6]">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-xl border border-white/15 bg-[#111521] px-4 py-3 text-sm text-[#f2e2c3] outline-none transition-colors focus:border-[#d6b57a99]"
                placeholder="mail@domain.ru"
              />
            </label>

            <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-[#b5b8c6]">
              Тип события
              <select
                value={eventType}
                onChange={(event) => setEventType(event.target.value)}
                className="rounded-xl border border-white/15 bg-[#111521] px-4 py-3 text-sm text-[#f2e2c3] outline-none transition-colors focus:border-[#d6b57a99]"
              >
                {eventTypeOptions.map((item) => (
                  <option key={item} value={item} className="bg-[#111521]">
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#b5b8c6]">Куда отправить заявку</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { id: "whatsapp", label: "WhatsApp" },
                { id: "telegram", label: "Telegram" },
                { id: "phone", label: "Телефонный звонок" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setChannel(item.id as ContactChannel)}
                  className={`interactive rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] ${
                    channel === item.id
                      ? "border-[#d6b57a99] bg-[#d6b57a26] text-[#f2dfbe]"
                      : "border-white/20 bg-[#121622] text-[#c9ccda] hover:border-[#d6b57a66]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <label className="mt-4 grid gap-2 text-xs uppercase tracking-[0.18em] text-[#b5b8c6]">
            Комментарий
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              className="min-h-[118px] rounded-xl border border-white/15 bg-[#111521] px-4 py-3 text-sm text-[#f2e2c3] outline-none transition-colors focus:border-[#d6b57a99]"
              placeholder="Опишите задачу, формат и желаемую дату"
            />
          </label>

          <p className="mt-4 text-xs leading-relaxed text-[#9ca0ae]">
            Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных согласно политике конфиденциальности.
          </p>

          <button
            type="submit"
            className="interactive mt-5 rounded-full border border-[#d6b57a99] bg-[#d6b57a26] px-7 py-3 text-xs uppercase tracking-[0.18em] text-[#f5e7cb] hover:bg-[#d6b57a38]"
          >
            Отправить
          </button>
        </form>
      </div>

      <AnimatePresence>
        {thanksOpen && (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setThanksOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              aria-label="Закрыть окно благодарности"
            />
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="relative w-full max-w-md rounded-2xl border border-[#d6b57a66] bg-[#0f131dcc] p-6 text-center"
            >
              <button
                type="button"
                onClick={() => setThanksOpen(false)}
                className="interactive absolute right-3 top-3 rounded-full border border-white/20 p-2 text-[#f2dfbe]"
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>
              <h4 className="font-display text-4xl tracking-[0.08em] text-[#f5e7cb]">Спасибо</h4>
              <p className="mt-2 text-sm text-[#b3b6c4]">Заявка отправлена. Свяжемся с вами через выбранный канал.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactFormSection;
