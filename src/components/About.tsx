import { useLocale } from "../context/LocaleContext";
import { useInView } from "../hooks/useInView";
import SkillBars from "./SkillBars";

export default function About() {
  const { t } = useLocale();
  const { ref, visible } = useInView();

  return (
    <section
      id="about"
      ref={ref}
      className={`section about ${visible ? "is-visible" : ""}`}
    >
      <div className="container">
        <h2 className="section__title reveal">{t.about.title}</h2>
        <div className="about__grid">
          <div className="about__text reveal reveal--delay-1">
            {t.about.paragraphs.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
          </div>
          <div className="about__skills reveal reveal--delay-2">
            <h3>{t.about.skillsTitle}</h3>
            <SkillBars
              categories={t.about.skillCategories}
              proficiencyLabels={t.about.proficiencyLevels}
              animate={visible}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
