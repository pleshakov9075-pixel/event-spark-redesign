import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-gradient-dark">
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors interactive font-body text-sm">
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Главная</span>
          </Link>
        </div>
      </nav>

      <section className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-6 sm:mb-8">Политика конфиденциальности</h1>
          <div className="font-body text-muted-foreground text-sm md:text-base leading-relaxed space-y-6">
            <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта.</p>
            <h2 className="font-display text-lg sm:text-xl text-foreground mt-8">1. Сбор информации</h2>
            <p>Мы собираем информацию, которую вы предоставляете при заполнении форм на сайте: имя, контактные данные, информацию о мероприятии.</p>
            <h2 className="font-display text-lg sm:text-xl text-foreground mt-8">2. Использование информации</h2>
            <p>Полученная информация используется исключительно для связи с вами и подготовки персонального предложения.</p>
            <h2 className="font-display text-lg sm:text-xl text-foreground mt-8">3. Защита данных</h2>
            <p>Мы принимаем все необходимые меры для защиты ваших персональных данных от несанкционированного доступа.</p>
            <h2 className="font-display text-lg sm:text-xl text-foreground mt-8">4. Контакты</h2>
            <p>По вопросам обработки персональных данных вы можете связаться с нами через форму на сайте.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Privacy;