import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "../context/LocaleContext";
import { useInView } from "../hooks/useInView";
import { useTouchDevice } from "../hooks/useTouchDevice";
import type { ProjectItem } from "../types/locale";
import ProjectMedia from "./ProjectMedia";
import SectionHeading from "./SectionHeading";

type ProjectFilter = "all" | "featured";

function ProjectSlide({
  project,
  hoverHint,
  touchHint,
  isTouch,
  featuredLabel,
  placeholderLabel,
  outcomeLabel,
  viewCodeLabel,
  liveDemoLabel,
}: {
  project: ProjectItem;
  hoverHint: string;
  touchHint: string;
  isTouch: boolean;
  featuredLabel: string;
  placeholderLabel: string;
  outcomeLabel: string;
  viewCodeLabel: string;
  liveDemoLabel: string;
}) {
  return (
    <article
      className={`project-card${project.featured ? " project-card--featured" : ""} ${project.isPlaceholder ? "project-card--placeholder" : ""}`}
    >
      <ProjectMedia
        project={project}
        hoverHint={hoverHint}
        touchHint={touchHint}
        isTouch={isTouch}
      />

      <div className="project-card__body">
        <div className="project-card__header">
          <div className="project-card__titles">
            <h3>{project.name}</h3>
            {project.tagline && <p className="project-card__tagline">{project.tagline}</p>}
          </div>
          <div className="project-card__badges">
            {project.featured && (
              <span className="project-card__badge">{featuredLabel}</span>
            )}
            {project.isPlaceholder && (
              <span className="project-card__badge project-card__badge--muted">
                {placeholderLabel}
              </span>
            )}
          </div>
        </div>

        {project.outcome && (
          <div className="project-card__outcome">
            <span className="project-card__outcome-label">{outcomeLabel}</span>
            <p className="project-card__outcome-text">{project.outcome}</p>
          </div>
        )}

        <p className="project-card__description prose">{project.description}</p>

        <ul className="tech-tags">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="project-card__links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              {viewCodeLabel} →
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              {liveDemoLabel} →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { t } = useLocale();
  const { ref, visible } = useInView();
  const isTouch = useTouchDevice();
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const featuredStart = useMemo(
    () => Math.max(0, t.projects.items.findIndex((item) => item.featured)),
    [t.projects.items],
  );

  const [index, setIndex] = useState(featuredStart);

  const filteredItems = useMemo(
    () =>
      filter === "featured"
        ? t.projects.items.filter((item) => item.featured)
        : t.projects.items,
    [filter, t.projects.items],
  );

  useEffect(() => {
    setIndex(filter === "all" ? featuredStart : 0);
  }, [filter, featuredStart]);

  const total = filteredItems.length;

  const goTo = useCallback(
    (next: number) => setIndex((next + total) % total),
    [total],
  );

  return (
    <section
      id="projects"
      ref={ref}
      className={`section section--alt projects ${visible ? "is-visible" : ""}`}
    >
      <div className="container">
        <SectionHeading
          number={t.sections.projects}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        <div className="projects-filter reveal reveal--delay-1" role="tablist" aria-label={t.projects.title}>
          <button
            type="button"
            role="tab"
            className={`projects-filter__btn${filter === "all" ? " projects-filter__btn--active" : ""}`}
            aria-selected={filter === "all"}
            onClick={() => setFilter("all")}
          >
            {t.projects.filterAll}
          </button>
          <button
            type="button"
            role="tab"
            className={`projects-filter__btn${filter === "featured" ? " projects-filter__btn--active" : ""}`}
            aria-selected={filter === "featured"}
            onClick={() => setFilter("featured")}
          >
            {t.projects.filterFeatured}
          </button>
        </div>

        <div className="projects-carousel reveal reveal--delay-2">
          <button
            type="button"
            className="projects-carousel__nav projects-carousel__nav--prev"
            onClick={() => goTo(index - 1)}
            aria-label={t.projects.prev}
            disabled={total <= 1}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="projects-carousel__viewport">
            <div
              className="projects-carousel__track"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {filteredItems.map((project) => (
                <div key={project.name} className="projects-carousel__slide">
                  <ProjectSlide
                    project={project}
                    hoverHint={t.projects.previewHint}
                    touchHint={t.projects.previewHintTouch}
                    isTouch={isTouch}
                    featuredLabel={t.projects.featured}
                    placeholderLabel={t.projects.placeholder}
                    outcomeLabel={t.projects.outcomeLabel}
                    viewCodeLabel={t.projects.viewCode}
                    liveDemoLabel={t.projects.liveDemo}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="projects-carousel__nav projects-carousel__nav--next"
            onClick={() => goTo(index + 1)}
            aria-label={t.projects.next}
            disabled={total <= 1}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {total > 1 && (
            <div className="projects-carousel__dots" role="tablist" aria-label={t.projects.title}>
              {filteredItems.map((project, i) => (
                <button
                  key={project.name}
                  type="button"
                  role="tab"
                  className={`projects-carousel__dot ${i === index ? "active" : ""}`}
                  aria-selected={i === index}
                  aria-label={project.name}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
