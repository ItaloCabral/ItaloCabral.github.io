import { useLocale } from "../context/LocaleContext";

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        className={`lang-btn ${locale === "pt" ? "active" : ""}`}
        onClick={() => setLocale("pt")}
        aria-pressed={locale === "pt"}
      >
        PT
      </button>
      <button
        className={`lang-btn ${locale === "en" ? "active" : ""}`}
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
