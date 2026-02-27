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
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
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
    setSideMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!sideMenuOpen && !quickOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sideMenuOpen, quickOpen]);

  const isRouteActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname === to || location.pathname.startsWith(`${to}/`);

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

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setQuickOpen(true)}
              className={cn(
                "interactive hidden rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] transition-colors sm:inline-flex",
                ui.button,
              )}
            >
              {ctaLabel}
            </button>

            <button
              type="button"
              onClick={() => setSideMenuOpen(true)}
              className="interactive inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#d6b57a5f] bg-[#121826ab] px-3.5 text-[#f1dfbe] hover:border-[#d6b57ab8] hover:bg-[#151d2fa8]"
              aria-expanded={sideMenuOpen}
              aria-label="Открыть боковое меню"
            >
              <Menu className="h-4 w-4" />
              <span className="hidden text-[11px] uppercase tracking-[0.16em] sm:inline">Меню</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pt-[74px]">{children}</main>
      <Footer />

      <AnimatePresence>
        {sideMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[120]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setSideMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-label="Закрыть меню"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 h-full w-full max-w-[380px] border-l border-[#d6b57a55] bg-[#0b1019f5] shadow-[-24px_0_48px_rgba(2,3,6,0.56)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#dfcba4]">Навигация</p>
                <button
                  type="button"
                  onClick={() => setSideMenuOpen(false)}
                  className="interactive inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-[#f1dfbe] hover:border-[#d6b57a88]"
                  aria-label="Закрыть меню"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex h-[calc(100%-74px)] flex-col overflow-y-auto px-5 py-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#a9adbb]">Страницы</p>
                <nav className="mt-2 grid gap-2">
                  {routeTabs.map((tab) => (
                    <Link
                      key={tab.to}
                      to={tab.to}
                      onClick={() => setSideMenuOpen(false)}
                      className={cn(
                        "interactive rounded-xl border border-transparent px-3 py-2.5 text-sm uppercase tracking-[0.16em] text-[#c8cad6] hover:border-white/10 hover:bg-white/5 hover:text-[#f2dfbe]",
                        isRouteActive(tab.to) && "border-[#d6b57a4f] bg-[#d6b57a14] text-[#f2dfbe]",
                      )}
                    >
                      {tab.label}
                    </Link>
                  ))}
                </nav>

                <div className="my-5 h-px bg-white/10" />

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#a9adbb]">Разделы страницы</p>
                <nav className="mt-2 grid gap-2">
                  {sectionNav.map((item) => (
                    <a
                      key={item.href}
                      href={navigationBasePath ? `${navigationBasePath}${item.href}` : item.href}
                      onClick={() => setSideMenuOpen(false)}
                      className="interactive rounded-xl border border-transparent px-3 py-2.5 text-sm uppercase tracking-[0.16em] text-[#c8cad6] hover:border-white/10 hover:bg-white/5 hover:text-[#f2dfbe]"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <button
                  type="button"
                  onClick={() => {
                    setSideMenuOpen(false);
                    setQuickOpen(true);
                  }}
                  className={cn(
                    "interactive mt-6 inline-flex w-full justify-center rounded-full border px-5 py-3 text-xs uppercase tracking-[0.16em]",
                    ui.button,
                  )}
                >
                  {ctaLabel}
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}

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
