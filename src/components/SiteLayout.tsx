import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

interface SiteLayoutProps {
  branch: "host" | "agency";
  ctaLabel: string;
  ctaHref: string;
  children: ReactNode;
}

const branchUi = {
  host: {
    dot: "bg-[#d2b07a]",
    active: "text-[#f2dfbe]",
    button:
      "border-[#d2b07a80] bg-[#d2b07a22] text-[#f2dfbe] hover:bg-[#d2b07a33]",
  },
  agency: {
    dot: "bg-[#e6c48c]",
    active: "text-[#f4e3be]",
    button:
      "border-[#e6c48c99] bg-[#e6c48c22] text-[#f4e3be] hover:bg-[#e6c48c33]",
  },
};

const SiteLayout = ({ branch, ctaLabel, ctaHref, children }: SiteLayoutProps) => {
  const ui = branchUi[branch];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090a0fcb] backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="interactive flex items-center gap-3 uppercase tracking-[0.28em] text-xs text-[#f0ddbc]">
            <span className={cn("h-2 w-2 rounded-full", ui.dot)} />
            Владимир / Artbox
          </Link>

          <nav className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-[#bfbfc7] md:flex">
            <Link to="/host" className={cn("interactive transition-colors hover:text-[#efe0c3]", branch === "host" && ui.active)}>
              Host
            </Link>
            <Link to="/agency" className={cn("interactive transition-colors hover:text-[#efe0c3]", branch === "agency" && ui.active)}>
              Agency
            </Link>
            <Link to="/" className="interactive transition-colors hover:text-[#efe0c3]">
              Home
            </Link>
          </nav>

          <a
            href={ctaHref}
            className={cn(
              "interactive rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.16em] transition-colors sm:text-[11px]",
              ui.button,
            )}
          >
            {ctaLabel}
          </a>
        </div>
      </header>

      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
