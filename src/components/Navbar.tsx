import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Главная", to: "/" },
  { label: "Ведущий", to: "/host" },
  { label: "Агентство", to: "/agency" },
];

interface NavbarProps {
  /** CTA button config — if provided, shows a CTA on the right */
  cta?: { label: string; onClick: () => void };
  /** Accent color variant */
  accent?: "default" | "host" | "agency";
}

const accentStyles = {
  default: "bg-gradient-emerald text-primary-foreground",
  host: "bg-gradient-emerald text-primary-foreground",
  agency: "bg-gradient-wine text-secondary-foreground",
};

const Navbar = ({ cta, accent = "default" }: NavbarProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong border-b border-border/30 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo / Home link */}
        <Link
          to="/"
          className="font-display text-lg sm:text-xl font-bold text-foreground hover:text-primary transition-colors interactive"
        >
          VB
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`relative px-4 py-2 rounded-full font-body text-sm font-medium transition-colors interactive ${
                isActive(item.to)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              {isActive(item.to) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-primary/8 border border-primary/15"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {cta && (
            <button
              onClick={cta.onClick}
              className={`hidden sm:inline-flex px-5 py-2 rounded-full font-body text-xs sm:text-sm font-medium interactive hover:opacity-90 transition-opacity ${accentStyles[accent]}`}
            >
              {cta.label}
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted/50 transition-colors interactive"
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden glass-strong border-t border-border/20"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block px-4 py-3 rounded-xl font-body text-sm font-medium transition-colors ${
                    isActive(item.to)
                      ? "text-foreground bg-primary/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {cta && (
                <button
                  onClick={() => {
                    cta.onClick();
                    setMobileOpen(false);
                  }}
                  className={`w-full mt-2 px-4 py-3 rounded-xl font-body text-sm font-medium text-center interactive ${accentStyles[accent]}`}
                >
                  {cta.label}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
