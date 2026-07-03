import { useEffect, useId, useRef } from "react";
import { CONTACT_EMAIL } from "../constants/contact";
import { useLocale } from "../context/LocaleContext";
import type { InquiryType } from "../types/locale";

interface InquiryModalProps {
  type: InquiryType | null;
  onClose: () => void;
}

export default function InquiryModal({ type, onClose }: InquiryModalProps) {
  const { t } = useLocale();
  const titleId = useId();
  const descId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!type) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    formRef.current?.querySelector<HTMLElement>("input, textarea")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [type, onClose]);

  if (!type) return null;

  const copy = t.inquiry[type];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const organization = String(data.get("organization") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const bodyLines = [
      `${t.inquiry.fields.name}: ${name}`,
      `${t.inquiry.fields.email}: ${email}`,
    ];

    if (type === "workshop" && organization) {
      bodyLines.push(`${t.inquiry.fields.organization}: ${organization}`);
    }

    bodyLines.push("", message);

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
    form.reset();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal__header">
          <div>
            <h2 id={titleId} className="modal__title">
              {copy.title}
            </h2>
            <p id={descId} className="modal__desc">
              {copy.description}
            </p>
          </div>
          <button
            type="button"
            className="modal__close icon-btn"
            onClick={onClose}
            aria-label={t.inquiry.close}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <form ref={formRef} key={type} className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__field">
            <span>{t.inquiry.fields.name}</span>
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder={t.inquiry.placeholders.name}
            />
          </label>

          <label className="modal__field">
            <span>{t.inquiry.fields.email}</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={t.inquiry.placeholders.email}
            />
          </label>

          {type === "workshop" && (
            <label className="modal__field">
              <span>{t.inquiry.fields.organization}</span>
              <input
                name="organization"
                type="text"
                autoComplete="organization"
                placeholder={t.inquiry.placeholders.organization}
              />
            </label>
          )}

          <label className="modal__field">
            <span>{t.inquiry.fields.message}</span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder={
                type === "mentorship"
                  ? t.inquiry.placeholders.messageMentorship
                  : t.inquiry.placeholders.messageWorkshop
              }
            />
          </label>

          <p className="modal__note">{t.inquiry.note}</p>

          <div className="modal__actions">
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              {t.inquiry.cancel}
            </button>
            <button type="submit" className="btn btn--primary">
              {t.inquiry.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
