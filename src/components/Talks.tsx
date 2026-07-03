import { useLocale } from "../context/LocaleContext";
import { useInView } from "../hooks/useInView";

const MENTORSHIP_EMAIL =
  "mailto:italo.bruno-dev@outlook.com?subject=Mentoria%20Profissional";
const WORKSHOP_EMAIL =
  "mailto:italo.bruno-dev@outlook.com?subject=Solicita%C3%A7%C3%A3o%20de%20Palestra%2FWorkshop";

export default function Talks() {
  const { t } = useLocale();
  const { ref, visible } = useInView();

  return (
    <section
      id="talks"
      ref={ref}
      className={`section talks ${visible ? "is-visible" : ""}`}
    >
      <div className="container">
        <h2 className="section__title reveal">{t.talks.title}</h2>
        <p className="section__subtitle reveal reveal--delay-1">{t.talks.subtitle}</p>

        <div className="talks__topics reveal reveal--delay-2">
          <h3>{t.talks.topicsTitle}</h3>
          <ul className="talks__list">
            {t.talks.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>

        <div className="talks__cta-grid">
          <div className="cta-card reveal reveal--delay-1">
            <div className="cta-card__icon" aria-hidden="true">🎯</div>
            <h3>{t.talks.mentorship.title}</h3>
            <p>{t.talks.mentorship.description}</p>
            <a className="btn btn--primary" href={MENTORSHIP_EMAIL}>
              {t.talks.mentorship.cta}
            </a>
          </div>
          <div className="cta-card reveal reveal--delay-2">
            <div className="cta-card__icon" aria-hidden="true">🎤</div>
            <h3>{t.talks.workshops.title}</h3>
            <p>{t.talks.workshops.description}</p>
            <a className="btn btn--primary" href={WORKSHOP_EMAIL}>
              {t.talks.workshops.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
