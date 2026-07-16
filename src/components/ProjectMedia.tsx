import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  getProjectSlides,
  hasProjectGallery,
  resolveThemedSrc,
} from "../lib/projectMedia";
import type { ProjectItem } from "../types/locale";

const GALLERY_INTERVAL_MS = 2800;

function ProjectMedia({
  project,
  hoverHint,
  touchHint,
  isTouch,
}: {
  project: ProjectItem;
  hoverHint: string;
  touchHint: string;
  isTouch: boolean;
}) {
  const { theme } = useTheme();
  const slides = useMemo(() => getProjectSlides(project), [project]);
  const gallery = hasProjectGallery(project);
  const legacyPreview = !gallery && project.gif !== project.poster;

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [gifKey, setGifKey] = useState(0);

  useEffect(() => {
    setIndex(0);
    setPlaying(false);
  }, [project.name, theme]);

  useEffect(() => {
    if (!playing || !gallery) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, GALLERY_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [playing, gallery, slides.length]);

  const play = () => {
    if (gallery) {
      setPlaying(true);
      return;
    }

    if (legacyPreview) {
      setGifKey((key) => key + 1);
    }
    setPlaying(true);
  };

  const stop = () => {
    setPlaying(false);
    setIndex(0);
  };

  const togglePlay = () => {
    if (playing) stop();
    else play();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePlay();
    }
  };

  const posterSrc = resolveThemedSrc(project.poster, theme);
  const activeSlideSrc = resolveThemedSrc(slides[index] ?? project.poster, theme);
  const showGallerySlide = gallery && playing;
  const showLegacyOverlay = !gallery && legacyPreview && playing;

  return (
    <div
      className={`project-card__media${isTouch ? " project-card__media--touch" : ""}${gallery ? " project-card__media--gallery" : ""}`}
      onMouseEnter={isTouch ? undefined : play}
      onMouseLeave={isTouch ? undefined : stop}
      onClick={isTouch ? togglePlay : undefined}
      onKeyDown={isTouch ? handleKeyDown : undefined}
      role={isTouch ? "button" : undefined}
      tabIndex={isTouch ? 0 : undefined}
      aria-pressed={isTouch ? playing : undefined}
      aria-label={isTouch ? touchHint : undefined}
    >
      <img
        className="project-card__poster"
        src={showGallerySlide ? activeSlideSrc : posterSrc}
        alt=""
        aria-hidden="true"
        draggable={false}
        loading="lazy"
      />
      {showLegacyOverlay && (
        <img
          key={gifKey}
          className="project-card__gif"
          src={resolveThemedSrc(project.gif, theme)}
          alt={`${project.name} preview`}
          draggable={false}
          loading="lazy"
        />
      )}
      {gallery && slides.length > 1 && (
        <div className="project-card__media-dots" role="tablist" aria-label={project.name}>
          {slides.map((slide, slideIndex) => (
            <button
              key={slide}
              type="button"
              role="tab"
              className={`project-card__media-dot${slideIndex === index ? " active" : ""}`}
              aria-selected={slideIndex === index}
              aria-label={`${project.name} ${slideIndex + 1}`}
              onClick={(event) => {
                event.stopPropagation();
                setIndex(slideIndex);
                setPlaying(true);
              }}
            />
          ))}
        </div>
      )}
      {!playing && (
        <span
          className={`project-card__media-hint${isTouch ? " project-card__media-hint--touch" : ""}`}
        >
          {isTouch ? touchHint : hoverHint}
        </span>
      )}
    </div>
  );
}

export default ProjectMedia;
