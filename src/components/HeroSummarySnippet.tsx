import { useLocale } from "../context/LocaleContext";
import { useTypingEffect } from "../hooks/useTypingEffect";

function BashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

export default function HeroSummarySnippet() {
  const { t } = useLocale();
  const { displayed, isComplete } = useTypingEffect(t.hero.summary);

  return (
    <div className="hero__snippet" aria-label={t.hero.summary}>
      <div className="hero__snippet-header">
        <span className="hero__snippet-icon">
          <BashIcon />
        </span>
        <span className="hero__snippet-title">bash</span>
        <span className="hero__snippet-filename">summary.sh</span>
      </div>
      <div className="hero__snippet-body">
        <span className="hero__snippet-prompt" aria-hidden="true">
          ${" "}
        </span>
        <span className="hero__snippet-text">{displayed}</span>
        <span className={`hero__snippet-cursor${isComplete ? " hero__snippet-cursor--done" : ""}`} aria-hidden="true">
          ▌
        </span>
      </div>
    </div>
  );
}
