import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import BrandLogo from "@/components/BrandLogo";
import { siteContacts } from "@/content/siteData";

interface SiteLayoutProps {
  branch: "host" | "agency";
  ctaLabel: string;
  ctaHref: string;
  navigationBasePath?: string;
  children: ReactNode;
}

const branchUi = {
  host: {
    active: "text-[#f2dfbe]",
    button: "border-[#d2b07a80] bg-[#d2b07a22] text-[#f2dfbe] hover:bg-[#d2b07a33]",
  },
  agency: {
    active: "text-[#f4e3be]",
    button: "border-[#e6c48c99] bg-[#e6c48c22] text-[#f4e3be] hover:bg-[#e6c48c33]",
  },
};

const branchNav = {
  host: [
    { label: "О ведущем", href: "#host-about" },
    { label: "Фото", href: "#host-photos" },
    { label: "Видео", href: "#host-video" },
    { label: "Форматы", href: "#host-formats" },
    { label: "Отзывы", href: "#host-reviews" },
    { label: "Контакты", href: "#host-contacts" },
  ],
  agency: [
    { label: "Об агентстве", href: "#agency-about" },
    { label: "Кейсы", href: "#agency-cases" },
    { label: "Услуги", href: "#agency-services" },
    { label: "Калькулятор", href: "#agency-calculator" },
    { label: "Процесс работы", href: "#agency-process" },
    { label: "Контакты", href: "#agency-contacts" },
  ],
};

const routeTabs = [
  { label: "Ведущий", to: "/host" },
  { label: "Агентство", to: "/agency" },
  { label: "Главная", to: "/" },
];

const SiteLayout = ({ branch, ctaLabel, ctaHref, navigationBasePath, children }: SiteLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [quickName, setQuickName] = useState("");
  const [quickPhone, setQuickPhone] = useState("");
  const [quickComment, setQuickComment] = useState("");
  const [quickChannel, setQuickChannel] = useState<"whatsapp" | "telegram" | "phone">("whatsapp");
  const location = useLocation();
  const ui = branchUi[branch];
  const sectionNav = useMemo(() => branchNav[branch], [branch]);
  const whatsappLink = useMemo(
    () => siteContacts.socials.find((item) => item.label === "WhatsApp")?.href ?? siteContacts.phoneLink,
    [],
  );
  const telegramLink = useMemo(
    () => siteContacts.socials.find((item) => item.label === "Telegram")?.href ?? siteContacts.phoneLink,
    [],
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const submitQuickLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = [
      "Здравствуйте! Заявка с кнопки «Связаться».",
      `Направление: ${branch === "host" ? "Ведущий" : "Агентство"}`,
      `Имя: ${quickName}`,
      `Телефон: ${quickPhone}`,
      `Комментарий: ${quickComment || "-"}`,
    ].join("\n");

    if (quickChannel === "whatsapp") {
      const base = whatsappLink.includes("?") ? `${whatsappLink}&` : `${whatsappLink}?`;
      window.open(`${base}text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    }

    if (quickChannel === "telegram") {
      window.open(telegramLink, "_blank", "noopener,noreferrer");
      navigator.clipboard?.writeText(text).catch(() => undefined);
    }

    if (quickChannel === "phone") {
      window.location.href = siteContacts.phoneLink;
    }

    setQuickOpen(false);
    setQuickName("");
    setQuickPhone("");
    setQuickComment("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07090fcc] backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] w-full max-w-7xl items-center gap-4 px-6 lg:px-8">
          <Link to="/" className="interactive flex items-center rounded-xl p-1" aria-label="Перейти на главную">
            <BrandLogo className="w-[150px] sm:w-[172px]" priority />
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {sectionNav.map((item) => (
              <a
                key={item.href}
                href={navigationBasePath ? `${navigationBasePath}${item.href}` : item.href}
                className="group interactive relative rounded-xl px-3 py-2 text-xs uppercase tracking-[0.16em] text-[#c4c6d2] hover:text-[#f2dfbe]"
              >
                {item.label}
                <span className="absolute bottom-1 left-3 right-3 h-px origin-left scale-x-0 bg-[#d6b57a] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {routeTabs.map((tab) => {
              const active =
                tab.to === "/"
                  ? location.pathname === "/"
                  : location.pathname === tab.to || location.pathname.startsWith(`${tab.to}/`);
              return (
                <Link
                  key={tab.to}
                  to={tab.to}
                  className={cn(
                    "group interactive relative rounded-xl px-3 py-2 text-[11px] uppercase tracking-[0.17em] text-[#bfc1cd] hover:text-[#efe0c3]",
                    active && ui.active,
                  )}
                >
                  {tab.label}
                  <span
                    className={cn(
                      "absolute bottom-1 left-3 right-3 h-px origin-left bg-[#d6b57a] transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setQuickOpen(true)}
            className={cn(
              "interactive ml-2 hidden rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] transition-colors md:inline-flex",
              ui.button,
            )}
          >
            {ctaLabel}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="interactive ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#f1dfbe] hover:border-[#d6b57a80] md:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#0b0f18f2] px-6 py-5 md:hidden">
            <nav className="grid gap-2">
              {routeTabs.map((tab) => (
                <Link
                  key={tab.to}
                  to={tab.to}
                  className={cn(
                    "interactive rounded-xl px-3 py-3 text-sm uppercase tracking-[0.16em] text-[#c8cad6] hover:bg-white/5 hover:text-[#f2dfbe]",
                    location.pathname === tab.to && "bg-white/5 text-[#f2dfbe]",
                  )}
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
            <div className="my-4 h-px bg-white/10" />
            <nav className="grid gap-2">
              {sectionNav.map((item) => (
                <a
                  key={item.href}
                  href={navigationBasePath ? `${navigationBasePath}${item.href}` : item.href}
                  onClick={() => setMobileOpen(false)}
                  className="interactive rounded-xl px-3 py-3 text-sm uppercase tracking-[0.16em] text-[#c8cad6] hover:bg-white/5 hover:text-[#f2dfbe]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setQuickOpen(true);
              }}
              className={cn(
                "interactive mt-4 inline-flex rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.16em]",
                ui.button,
              )}
            >
              {ctaLabel}
            </button>
          </div>
        )}
      </header>

      <main className="pt-[74px]">{children}</main>
      <Footer />

      <AnimatePresence>
        {quickOpen && (
          <motion.div
            className="fixed inset-0 z-[140] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setQuickOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              aria-label="Закрыть окно связи"
            />
            <motion.form
              onSubmit={submitQuickLead}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              className="relative w-full max-w-lg rounded-2xl border border-[#d6b57a66] bg-[#0d111be6] p-6"
            >
              <button
                type="button"
                onClick={() => setQuickOpen(false)}
                className="interactive absolute right-3 top-3 rounded-full border border-white/20 p-2 text-[#f2dfbe]"
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>

              <h3 className="font-display text-4xl tracking-[0.08em] text-[#f5e7cb]">Связаться</h3>
              <p className="mt-1 text-sm text-[#b2b6c4]">Оставьте контакт и выберите канал связи.</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  required
                  value={quickName}
                  onChange={(event) => setQuickName(event.target.value)}
                  className="rounded-xl border border-white/15 bg-[#111521] px-4 py-3 text-sm text-[#f2e2c3] outline-none focus:border-[#d6b57a99]"
                  placeholder="Имя"
                />
                <input
                  required
                  value={quickPhone}
                  onChange={(event) => setQuickPhone(event.target.value)}
                  className="rounded-xl border border-white/15 bg-[#111521] px-4 py-3 text-sm text-[#f2e2c3] outline-none focus:border-[#d6b57a99]"
                  placeholder="Телефон"
                />
              </div>

              <textarea
                value={quickComment}
                onChange={(event) => setQuickComment(event.target.value)}
                className="mt-3 min-h-[104px] w-full rounded-xl border border-white/15 bg-[#111521] px-4 py-3 text-sm text-[#f2e2c3] outline-none focus:border-[#d6b57a99]"
                placeholder="Коротко о задаче"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { id: "whatsapp", label: "WhatsApp" },
                  { id: "telegram", label: "Telegram" },
                  { id: "phone", label: "Телефон" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setQuickChannel(item.id as "whatsapp" | "telegram" | "phone")}
                    className={`interactive rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] ${
                      quickChannel === item.id
                        ? "border-[#d6b57a99] bg-[#d6b57a26] text-[#f2dfbe]"
                        : "border-white/20 bg-[#121622] text-[#c9ccda] hover:border-[#d6b57a66]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="interactive rounded-full border border-[#d6b57a99] bg-[#d6b57a26] px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#f5e7cb] hover:bg-[#d6b57a38]"
                >
                  Отправить
                </button>
                <a
                  href={ctaHref}
                  className="interactive rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#c7cada] hover:border-[#d6b57a66] hover:text-[#f2dfbe]"
                  onClick={() => setQuickOpen(false)}
                >
                  К полной форме
                </a>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SiteLayout;
