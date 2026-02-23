import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-xl mb-4">Владимир Башмаков</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              Создаём события-произведения искусства для тех, кто ценит атмосферу, эстетику и смысл.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">Навигация</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm font-body interactive">Главная</Link>
              <Link to="/host" className="text-muted-foreground hover:text-primary transition-colors text-sm font-body interactive">Ведущий</Link>
              <Link to="/agency" className="text-muted-foreground hover:text-primary transition-colors text-sm font-body interactive">Art-Box Agency</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">Контакты</h4>
            <div className="flex flex-col gap-2 text-sm font-body">
              <a href="https://wa.me/" className="text-muted-foreground hover:text-primary transition-colors interactive">WhatsApp</a>
              <a href="https://t.me/" className="text-muted-foreground hover:text-primary transition-colors interactive">Telegram</a>
              <a href="https://vk.com/" className="text-muted-foreground hover:text-primary transition-colors interactive">ВКонтакте</a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs font-body">© 2026 Владимир Башмаков. Все права защищены.</p>
          <Link to="/privacy" className="text-muted-foreground hover:text-primary text-xs font-body transition-colors interactive">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
