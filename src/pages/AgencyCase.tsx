import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import ScrollReveal from "@/components/ScrollReveal";
import VideoShowcase from "@/components/VideoShowcase";
import { getAgencyCaseBySlug } from "@/content/siteData";

const AgencyCase = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseItem = slug ? getAgencyCaseBySlug(slug) : undefined;

  useEffect(() => {
    document.title = caseItem ? `${caseItem.title} | Artbox` : "Кейс | Artbox";
  }, [caseItem]);

  if (!caseItem) {
    return <Navigate to="/agency" replace />;
  }

  return (
    <SiteLayout
      branch="agency"
      ctaLabel="Обсудить проект"
      ctaHref="#agency-contacts"
      navigationBasePath="/agency"
    >
      <section className="px-6 py-8">
        <div className="mx-auto w-full max-w-7xl">
          <nav className="text-xs uppercase tracking-[0.2em] text-[#a9adbb]" aria-label="Хлебные крошки">
            <Link to="/" className="interactive hover:text-[#f2dfbe]">
              Главная
            </Link>
            {" / "}
            <Link to="/agency" className="interactive hover:text-[#f2dfbe]">
              Агентство
            </Link>
            {" / "}
            <span className="text-[#f2dfbe]">{caseItem.title}</span>
          </nav>
        </div>
      </section>

      <section className="px-6 pb-16 sm:pb-20">
        <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-[#11131b]">
          <img src={caseItem.heroImage} alt={caseItem.title} className="aspect-[16/8] w-full object-cover" />
          <div className="p-6 sm:p-8">
            <h1 className="font-display text-5xl tracking-[0.08em] text-[#f2dfbe] sm:text-6xl">{caseItem.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#b4b7c5]">{caseItem.summary}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#0d1018] px-6 py-16 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-3">
          <ScrollReveal>
            <article className="rounded-2xl border border-white/10 bg-[#10131bcc] p-6">
              <h2 className="font-display text-3xl text-[#f5e6c8]">Задача</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#afb1be]">{caseItem.challenge}</p>
            </article>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <article className="rounded-2xl border border-white/10 bg-[#10131bcc] p-6">
              <h2 className="font-display text-3xl text-[#f5e6c8]">Решение</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#afb1be]">{caseItem.solution}</p>
            </article>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <article className="rounded-2xl border border-white/10 bg-[#10131bcc] p-6">
              <h2 className="font-display text-3xl text-[#f5e6c8]">Результат</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#afb1be]">{caseItem.result}</p>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <h2 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Фото кейса</h2>
          </ScrollReveal>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {caseItem.gallery.map((image, index) => (
              <ScrollReveal key={image} delay={index * 0.05}>
                <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#11131b]">
                  <img src={image} alt={`${caseItem.title} — фото ${index + 1}`} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {caseItem.video && (
        <section className="bg-[#0d1018] px-6 py-16 sm:py-24">
          <div className="mx-auto w-full max-w-7xl">
            <ScrollReveal>
              <h2 className="font-display text-4xl tracking-[0.08em] text-[#f2dfbe] sm:text-5xl">Видео кейса</h2>
            </ScrollReveal>
            <VideoShowcase items={[{ id: `${caseItem.slug}-video`, ...caseItem.video }]} />
          </div>
        </section>
      )}

      <section id="agency-contacts" className="px-6 pb-16 sm:pb-24">
        <div className="mx-auto w-full max-w-7xl rounded-3xl border border-[#d6b57a40] bg-[#10131bcc] p-8">
          <h3 className="font-display text-5xl tracking-[0.08em] text-[#f3e1bf] sm:text-6xl">Обсудить похожий проект</h3>
          <p className="mt-3 text-sm text-[#aeb2c1]">Перейдите к форме на странице агентства и пришлите параметры события.</p>
          <Link
            to="/agency#agency-contacts"
            className="interactive mt-6 inline-flex rounded-full border border-[#d6b57a80] bg-[#d6b57a1f] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#f5e7cb] hover:bg-[#d6b57a33]"
          >
            Оставить заявку
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
};

export default AgencyCase;
