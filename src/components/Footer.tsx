import { Link } from "react-router-dom";
import { ArrowUp, MessageCircle, Send } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { siteContacts } from "@/content/siteData";

const VkIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M13.1 16.87h1.44s.43-.05.66-.27c.2-.2.2-.57.2-.57s-.03-1.74.77-2c.79-.26 1.8 1.68 2.87 2.42.81.56 1.43.44 1.43.44l2.86-.04s1.5-.1.79-1.27c-.06-.1-.44-.94-2.27-2.64-1.92-1.77-1.66-1.49.65-4.53 1.4-1.85 1.97-2.98 1.8-3.46-.16-.46-1.15-.34-1.15-.34l-3.22.02s-.24-.03-.42.08c-.18.11-.29.37-.29.37s-.5 1.31-1.18 2.43c-1.43 2.36-2 2.48-2.23 2.34-.53-.34-.4-1.37-.4-2.1 0-2.3.35-3.25-.68-3.5-.34-.08-.6-.14-1.49-.15-1.14-.01-2.1 0-2.65.27-.36.17-.63.56-.47.58.2.03.65.12.89.43.3.4.29 1.28.29 1.28s.17 2.71-.39 3.04c-.38.23-.9-.24-2.01-2.38-.57-1.1-1-2.31-1-2.31s-.09-.24-.25-.37c-.2-.15-.5-.2-.5-.2l-3.06.02s-.46.01-.62.22c-.14.2-.01.6-.01.6s2.4 5.6 5.1 8.44c2.48 2.6 5.3 2.43 5.3 2.43Z" />
  </svg>
);

const Footer = () => {
  const whatsapp = siteContacts.socials.find((item) => item.label === "WhatsApp");
  const telegram = siteContacts.socials.find((item) => item.label === "Telegram");
  const vk = siteContacts.socials.find((item) => item.label === "VK");

  return (
    <footer className="border-t border-white/10 bg-[#07090f] px-6 py-12 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <BrandLogo className="w-[180px]" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#aeb0bd]">
              Ведущий и ивент-агентство в едином визуальном языке: эмоция, продакшн и результат.
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="interactive mt-5 inline-flex items-center gap-2 rounded-full border border-[#d6b57a66] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#e2c999] hover:bg-[#d6b57a20]"
            >
              Наверх
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>

          <div>
            <h4 className="font-display text-3xl tracking-[0.06em] text-[#f1dfbe]">Навигация</h4>
            <nav className="mt-3 grid gap-2">
              <Link to="/" className="interactive rounded-lg px-1 py-1.5 text-sm text-[#b7b9c6] hover:text-[#f1dfbe]">
                Главная
              </Link>
              <Link to="/host" className="interactive rounded-lg px-1 py-1.5 text-sm text-[#b7b9c6] hover:text-[#f1dfbe]">
                Ведущий
              </Link>
              <Link to="/agency" className="interactive rounded-lg px-1 py-1.5 text-sm text-[#b7b9c6] hover:text-[#f1dfbe]">
                Агентство
              </Link>
              <Link to="/privacy" className="interactive rounded-lg px-1 py-1.5 text-sm text-[#b7b9c6] hover:text-[#f1dfbe]">
                Политика конфиденциальности
              </Link>
              <Link to="/privacy#consent" className="interactive rounded-lg px-1 py-1.5 text-sm text-[#b7b9c6] hover:text-[#f1dfbe]">
                Согласие на обработку данных
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-display text-3xl tracking-[0.06em] text-[#f1dfbe]">Контакты</h4>
            <div className="mt-3 grid gap-1.5 text-sm text-[#b7b9c6]">
              <a href={siteContacts.phoneLink} className="interactive hover:text-[#f1dfbe]">
                {siteContacts.phone}
              </a>
              <p>{siteContacts.city}</p>
              <p className="text-xs text-[#9fa3b1]">{siteContacts.cityExtended}</p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              {whatsapp && (
                <a
                  href={whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#d4c29b] hover:border-[#d6b57a80] hover:bg-[#d6b57a20]"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              )}
              {telegram && (
                <a
                  href={telegram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#d4c29b] hover:border-[#d6b57a80] hover:bg-[#d6b57a20]"
                  aria-label="Telegram"
                >
                  <Send className="h-4 w-4" />
                </a>
              )}
              {vk && (
                <a
                  href={vk.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#d4c29b] hover:border-[#d6b57a80] hover:bg-[#d6b57a20]"
                  aria-label="VK"
                >
                  <VkIcon />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.14em] text-[#8f92a0]">
          <p>© {new Date().getFullYear()} Владимир Башмаков / Artbox. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
