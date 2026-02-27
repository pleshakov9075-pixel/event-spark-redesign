import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { siteContacts } from "@/content/siteData";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#090a0f] px-4 py-12 sm:px-6 sm:py-14 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-3">
          <div>
            <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-[#f1dfbe]">Владимир / Artbox</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#acadb7]">
              Ведущий и event-агентство в единой системе: сценарий, эмоция, продакшн, результат.
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="interactive mt-5 inline-flex items-center gap-2 rounded-full border border-[#d6b57a66] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#e2c999] transition-colors hover:bg-[#d6b57a22]"
            >
              Наверх
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div>
            <h4 className="font-display text-xl uppercase tracking-[0.08em] text-[#f1dfbe]">Мини-навигация</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="interactive mt-3 text-sm uppercase tracking-[0.18em] text-[#aeb0bb] transition-colors hover:text-[#f1dfbe]">
                Home
              </Link>
              <Link to="/host" className="interactive text-sm uppercase tracking-[0.18em] text-[#aeb0bb] transition-colors hover:text-[#f1dfbe]">
                Host
              </Link>
              <Link to="/agency" className="interactive text-sm uppercase tracking-[0.18em] text-[#aeb0bb] transition-colors hover:text-[#f1dfbe]">
                Agency
              </Link>
              <Link to="/privacy" className="interactive text-sm uppercase tracking-[0.18em] text-[#aeb0bb] transition-colors hover:text-[#f1dfbe]">
                Privacy
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-display text-xl uppercase tracking-[0.08em] text-[#f1dfbe]">Контакты</h4>
            <div className="mt-3 flex flex-col gap-1.5 text-sm text-[#aeb0bb]">
              <a href={siteContacts.phoneLink} className="interactive transition-colors hover:text-[#f1dfbe]">
                {siteContacts.phone}
              </a>
              <a href={siteContacts.emailLink} className="interactive transition-colors hover:text-[#f1dfbe]">
                {siteContacts.email}
              </a>
              <p>{siteContacts.city}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em]">
              {siteContacts.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive text-[#b9bac4] transition-colors hover:text-[#f1dfbe]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.14em] text-[#9193a0] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Владимир Башмаков / Artbox</p>
          <p>Все права защищены</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
