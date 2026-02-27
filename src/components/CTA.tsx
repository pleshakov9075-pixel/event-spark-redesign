import { siteContacts } from "@/content/siteData";

const socials = siteContacts.socials.filter((item) => item.label !== "Instagram");

const CTA = () => {
  return (
    <section id="contacts" className="section-shell pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="section-divider" />
        <div className="rounded-[2rem] border border-white/14 bg-[linear-gradient(140deg,rgba(91,124,255,0.2)_0%,rgba(11,12,16,0.66)_56%)] px-6 py-10 sm:px-10 sm:py-14">
          <h2 className="font-editorial max-w-4xl text-4xl uppercase leading-[0.95] text-white sm:text-6xl">
            Сделаем событие, которое запомнят.
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteContacts.socials.find((item) => item.label === "Telegram")?.href ?? siteContacts.phoneLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-transparent bg-accent px-7 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-accent-foreground transition-colors hover:bg-accent/85"
            >
              Написать
            </a>
            <a
              href={siteContacts.phoneLink}
              className="rounded-full border border-white/38 bg-black/30 px-7 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:border-white/65"
            >
              Позвонить
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-2 sm:gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white/72 transition-colors hover:border-white/52 hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
