import { useEffect, useState } from "react";
import { useLocale } from "../context/LocaleContext";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

const NAV_IDS = ["about", "experience", "projects", "talks", "contact"] as const;

export default function Header() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="container header__inner">
        <button className="logo" onClick={() => scrollTo("hero")} aria-label="Home">
          IC<span className="logo__dot">.</span>
        </button>

        <nav className={`nav ${menuOpen ? "nav--open" : ""}`} aria-label="Main">
          {NAV_IDS.map((id) => (
            <button key={id} className="nav__link" onClick={() => scrollTo(id)}>
              {t.nav[id]}
            </button>
          ))}
        </nav>

        <div className="header__actions">
          <LanguageToggle />
          <ThemeToggle />
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
