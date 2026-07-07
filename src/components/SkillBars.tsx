import { proficiencyBarWidth } from "../lib/skillProficiency";
import type { SkillCategory, SkillProficiency } from "../types/locale";

interface SkillBarsProps {
  categories: SkillCategory[];
  proficiencyLabels: Record<SkillProficiency, string>;
  animate: boolean;
}

const LEGEND_ORDER: SkillProficiency[] = ["beginner", "intermediate", "advanced"];

export default function SkillBars({ categories, proficiencyLabels, animate }: SkillBarsProps) {
  let delayIndex = 0;

  return (
    <div className="skill-bars">
      <div className="skill-bars__legend" aria-hidden="true">
        {LEGEND_ORDER.map((level) => (
          <span key={level} className={`skill-bars__legend-item skill-bars__legend-item--${level}`}>
            <span className="skill-bars__legend-dot" />
            {proficiencyLabels[level]}
          </span>
        ))}
      </div>

      {categories.map((category) => (
        <div key={category.id} className="skill-category" data-category={category.id}>
          <h4 className="skill-category__label">{category.label}</h4>
          <ul className="skill-category__list">
            {category.skills.map((skill) => {
              const delay = delayIndex++ * 0.055;
              const barWidth = proficiencyBarWidth(skill.proficiency);

              return (
                <li
                  key={skill.name}
                  className="skill-bar"
                  style={
                    {
                      "--level": barWidth,
                      "--delay": `${delay}s`,
                    } as React.CSSProperties
                  }
                >
                  <div className="skill-bar__header">
                    <span className="skill-bar__name">{skill.name}</span>
                    <span className={`skill-bar__level skill-bar__level--${skill.proficiency}`}>
                      {proficiencyLabels[skill.proficiency]}
                    </span>
                  </div>
                  <div className="skill-bar__track">
                    <div className={`skill-bar__fill${animate ? " skill-bar__fill--animated" : ""}`} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
