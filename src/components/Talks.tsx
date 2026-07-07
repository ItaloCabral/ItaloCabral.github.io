import { useState } from "react";
import { useLocale } from "../context/LocaleContext";
import { useInView } from "../hooks/useInView";
import type { InquiryType } from "../types/locale";
import InquiryModal from "./InquiryModal";
import SectionHeading from "./SectionHeading";

export default function Talks() {
  const { t } = useLocale();
  const { ref, visible } = useInView();
  const [inquiryType, setInquiryType] = useState<InquiryType | null>(null);

  return (
    <section
      id="talks"
      ref={ref}
      className={`section talks ${visible ? "is-visible" : ""}`}
    >
      <div className="container">
        <SectionHeading
          number={t.sections.talks}
          title={t.talks.title}
          subtitle={t.talks.subtitle}
        />

        <div className="talks__topics reveal reveal--delay-2">
          <h3>{t.talks.topicsTitle}</h3>
          <div className="talks__topics-grid">
            {t.talks.topics.map((topic) => (
              <article key={topic.title} className="topic-card">
                <h4>{topic.title}</h4>
                <p>{topic.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="talks__cta-grid">
          <article className="cta-card reveal reveal--delay-1">
            <div className="cta-card__icon" aria-hidden="true">🎯</div>
            <h3>{t.talks.mentorship.title}</h3>
            <p>{t.talks.mentorship.description}</p>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setInquiryType("mentorship")}
            >
              {t.talks.mentorship.cta}
            </button>
          </article>
          <article className="cta-card reveal reveal--delay-2">
            <div className="cta-card__icon" aria-hidden="true">🎤</div>
            <h3>{t.talks.workshops.title}</h3>
            <p>{t.talks.workshops.description}</p>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setInquiryType("workshop")}
            >
              {t.talks.workshops.cta}
            </button>
          </article>
        </div>
      </div>

      <InquiryModal type={inquiryType} onClose={() => setInquiryType(null)} />
    </section>
  );
}
