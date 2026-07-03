import { useLocale } from "../context/LocaleContext";

const CV_PATH = "/italo-cabral-cv.pdf";

export default function Hero() {
  const { t } = useLocale();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero section">
      <div className="container hero__grid">
        <div className="hero__content fade-in">
          <p className="hero__greeting">{t.hero.greeting}</p>
          <h1 className="hero__name">{t.hero.name}</h1>
          <p className="hero__role">{t.hero.role}</p>
          <p className="hero__summary">{t.hero.summary}</p>

          <ul className="hero__highlights">
            {t.hero.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="hero__actions">
            <button className="btn btn--primary" onClick={() => scrollTo("projects")}>
              {t.hero.ctaProjects}
            </button>
            <button className="btn btn--secondary" onClick={() => scrollTo("contact")}>
              {t.hero.ctaContact}
            </button>
            <a className="btn btn--cv" href={CV_PATH} download="Italo-Cabral-CV.pdf">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t.hero.downloadCv}
            </a>
          </div>
        </div>

        <div className="hero__visual fade-in fade-in--delay" aria-hidden="true">
          <div className="hero__orb" />
          <div className="hero__card">
            <div className="hero__card-line hero__card-line--short" />
            <div className="hero__card-line" />
            <div className="hero__card-line" />
            <div className="hero__card-tags">
              <span>AI</span>
              <span>TS</span>
              <span>RAG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
