import { useEffect, useState } from "react";
import { useLocale } from "../context/LocaleContext";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useShareHintEligible } from "../hooks/useShareHintEligible";
import LanguageToggle from "./LanguageToggle";
import ShareModal from "./ShareModal";
import ThemeToggle from "./ThemeToggle";

const NAV_IDS = ["about", "experience", "projects", "talks", "contact"] as const;

export default function Header() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { showHint, dismissHint } = useShareHintEligible();
  const activeSection = useScrollSpy(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openShare = () => {
    setMenuOpen(false);
    dismissHint();
    setShareOpen(true);
  };

  const hintVisible = showHint && !menuOpen;

  return (
    <>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="container header__inner">
          <button className="logo" onClick={() => scrollTo("hero")} aria-label="Home">
            IC<span className="logo__dot">.</span>
          </button>

          <nav className={`nav ${menuOpen ? "nav--open" : ""}`} aria-label="Main">
            {NAV_IDS.map((id) => (
              <button
                key={id}
                className={`nav__link${activeSection === id ? " nav__link--active" : ""}`}
                onClick={() => scrollTo(id)}
                aria-current={activeSection === id ? "true" : undefined}
              >
                {t.nav[id]}
              </button>
            ))}
          </nav>

          <div className="header__actions">
            <div className="share-btn-wrap">
              {hintVisible && (
                <div className="share-hint" role="status">
                  <p>{t.share.scrollHint}</p>
                  <button
                    type="button"
                    className="share-hint__dismiss"
                    onClick={dismissHint}
                    aria-label={t.share.dismissHint}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              )}
              <button
                type="button"
                className={`icon-btn icon-btn--share${hintVisible ? " icon-btn--share-pulse" : ""}`}
                onClick={openShare}
                aria-label={t.share.buttonLabel}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>
            </div>
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

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </>
  );
}
