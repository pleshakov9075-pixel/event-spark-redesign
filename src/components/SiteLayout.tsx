import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import BrandLogo from "@/components/BrandLogo";

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
  const location = useLocation();
  const ui = branchUi[branch];
  const sectionNav = useMemo(() => branchNav[branch], [branch]);

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

          <a
            href={ctaHref}
            className={cn(
              "interactive ml-2 hidden rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] transition-colors md:inline-flex",
              ui.button,
            )}
          >
            {ctaLabel}
          </a>

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
            <a
              href={ctaHref}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "interactive mt-4 inline-flex rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.16em]",
                ui.button,
              )}
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </header>

      <main className="pt-[74px]">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
