import { useLocale } from "../context/LocaleContext";
import { CV_FILENAME, CV_PATH, NAV_SECTION_IDS, SOCIAL } from "../constants/site";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

export default function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#${id}`,
    );
  };

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <button type="button" className="footer__logo" onClick={() => scrollTo("hero")}>
            IC<span className="logo__dot">.</span>
          </button>
          <p className="footer__built">{t.footer.built}</p>
        </div>

        <nav className="footer__nav" aria-label={t.footer.navTitle}>
          <p className="footer__label">{t.footer.navTitle}</p>
          {NAV_SECTION_IDS.map((id) => (
            <button key={id} type="button" className="footer__link" onClick={() => scrollTo(id)}>
              {t.nav[id]}
            </button>
          ))}
        </nav>

        <div className="footer__social">
          <p className="footer__label">{t.footer.socialTitle}</p>
          <div className="footer__social-links">
            <a
              className="footer__link"
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="footer__link"
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a className="footer__link" href={CV_PATH} download={CV_FILENAME}>
              {t.footer.cv}
            </a>
          </div>
        </div>

        <div className="footer__actions">
          <button type="button" className="btn btn--secondary btn--sm" onClick={() => scrollTo("contact")}>
            {t.footer.contactCta}
          </button>
          <div className="footer__toggles">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {year} Italo Cabral. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
