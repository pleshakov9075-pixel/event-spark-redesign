import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-center text-foreground">
      <div>
        <h1 className="font-display text-7xl tracking-[0.08em] text-[#f3e3c3] sm:text-8xl">404</h1>
        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#b2b4c1]">Страница не найдена</p>
        <Link
          to="/"
          className="interactive mt-7 inline-flex rounded-full border border-[#d6b57a80] bg-[#d6b57a1f] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#f5e7cb] transition-colors hover:bg-[#d6b57a33]"
        >
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
