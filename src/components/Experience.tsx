import { useLocale } from "../context/LocaleContext";
import { useInView } from "../hooks/useInView";

export default function Experience() {
  const { t } = useLocale();
  const { ref, visible } = useInView();

  return (
    <section
      id="experience"
      ref={ref}
      className={`section experience ${visible ? "is-visible" : ""}`}
    >
      <div className="container">
        <h2 className="section__title reveal">{t.experience.title}</h2>
        <p className="section__subtitle prose reveal reveal--delay-1">{t.experience.subtitle}</p>

        <div className="timeline">
          {t.experience.items.map((item, i) => (
            <article
              key={item.company}
              className={`timeline__item reveal reveal--delay-${Math.min(i + 1, 3)}`}
            >
              <div className="timeline__marker" />
              <div className="timeline__card">
                <div className="timeline__header">
                  <div>
                    <h3>{item.role}</h3>
                    <p className="timeline__company">{item.company}</p>
                  </div>
                  <span className="timeline__period">{item.period}</span>
                </div>
                <p className="timeline__desc prose">{item.description}</p>
                <p className="timeline__highlights-title">{t.experience.highlightsTitle}</p>
                <ul className="timeline__highlights">
                  {item.highlights.map((h) => (
                    <li key={h.slice(0, 40)}>{h}</li>
                  ))}
                </ul>
                <ul className="tech-tags">
                  {item.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
