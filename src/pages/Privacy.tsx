import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/10 bg-[#090a0fc4] backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6">
          <Link to="/" className="interactive text-xs uppercase tracking-[0.22em] text-[#f1dfbe]">
            Вернуться на главную
          </Link>
        </div>
      </header>

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="font-display text-5xl tracking-[0.07em] text-[#f4e4c4] sm:text-6xl">Политика конфиденциальности</h1>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#b7b9c5]">
            <p>Мы обрабатываем персональные данные только для связи с вами по заявке и подготовки предложения.</p>
            <p>Данные не передаются третьим лицам без законных оснований и используются в объёме, необходимом для работы по проекту.</p>
            <p>По вопросам обработки данных свяжитесь с нами через контакты, указанные на сайте.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Privacy;
