import { useCallback, useState } from "react";
import { useLocale } from "../context/LocaleContext";
import { useInView } from "../hooks/useInView";
import type { ProjectItem } from "../types/locale";

function ProjectMedia({
  project,
  hint,
}: {
  project: ProjectItem;
  hint: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [gifKey, setGifKey] = useState(0);

  const handleEnter = () => {
    setGifKey((k) => k + 1);
    setPlaying(true);
  };

  const handleLeave = () => setPlaying(false);

  return (
    <div
      className="project-card__media"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <img
        className="project-card__poster"
        src={project.poster}
        alt=""
        aria-hidden="true"
        draggable={false}
      />
      {playing && (
        <img
          key={gifKey}
          className="project-card__gif"
          src={project.gif}
          alt={`${project.name} preview`}
          draggable={false}
        />
      )}
      {!playing && (
        <span className="project-card__media-hint">{hint}</span>
      )}
    </div>
  );
}

function ProjectSlide({
  project,
  hint,
  featuredLabel,
  placeholderLabel,
  viewCodeLabel,
  liveDemoLabel,
}: {
  project: ProjectItem;
  hint: string;
  featuredLabel: string;
  placeholderLabel: string;
  viewCodeLabel: string;
  liveDemoLabel: string;
}) {
  return (
    <article
      className={`project-card ${project.isPlaceholder ? "project-card--placeholder" : ""}`}
    >
      <ProjectMedia project={project} hint={hint} />

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

        <p>{project.description}</p>

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
  const [index, setIndex] = useState(0);
  const total = t.projects.items.length;

  const goTo = useCallback(
    (next: number) => setIndex((next + total) % total),
    [total]
  );

  return (
    <section
      id="projects"
      ref={ref}
      className={`section projects ${visible ? "is-visible" : ""}`}
    >
      <div className="container">
        <h2 className="section__title reveal">{t.projects.title}</h2>
        <p className="section__subtitle reveal reveal--delay-1">{t.projects.subtitle}</p>

        <div className="projects-carousel reveal reveal--delay-2">
          <button
            type="button"
            className="projects-carousel__nav projects-carousel__nav--prev"
            onClick={() => goTo(index - 1)}
            aria-label={t.projects.prev}
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
              {t.projects.items.map((project) => (
                <div key={project.name} className="projects-carousel__slide">
                  <ProjectSlide
                    project={project}
                    hint={t.projects.previewHint}
                    featuredLabel={t.projects.featured}
                    placeholderLabel={t.projects.placeholder}
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
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="projects-carousel__dots" role="tablist" aria-label={t.projects.title}>
            {t.projects.items.map((project, i) => (
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
        </div>
      </div>
    </section>
  );
}
