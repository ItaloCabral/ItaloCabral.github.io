import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "../context/LocaleContext";
import { buildInquirySubject } from "../lib/buildInquirySubject";
import { submitInquiry } from "../lib/web3forms";
import type { InquiryType } from "../types/locale";

type SubmitStatus = "idle" | "sending" | "success" | "error";

interface InquiryModalProps {
  type: InquiryType | null;
  onClose: () => void;
}

export default function InquiryModal({ type, onClose }: InquiryModalProps) {
  const { t } = useLocale();
  const titleId = useId();
  const descId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  useEffect(() => {
    if (!type) {
      setStatus("idle");
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && status !== "sending") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    formRef.current?.querySelector<HTMLElement>("input, textarea")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [type, onClose, status]);

  if (!type) return null;

  const copy = t.inquiry[type];
  const isSending = status === "sending";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    setStatus("sending");

    try {
      await submitInquiry({
        subject: buildInquirySubject(type, name, organization, t.inquiry.subjects),
        name,
        email,
        message: bodyLines.join("\n"),
        inquiryType: type,
        organization: type === "workshop" ? organization : undefined,
      });
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="modal-overlay" onClick={isSending ? undefined : onClose} role="presentation">
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
              {status === "success" ? t.inquiry.successTitle : copy.title}
            </h2>
            <p id={descId} className="modal__desc">
              {status === "success" ? t.inquiry.successDesc : copy.description}
            </p>
          </div>
          <button
            type="button"
            className="modal__close icon-btn"
            onClick={onClose}
            disabled={isSending}
            aria-label={t.inquiry.close}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        {status === "success" ? (
          <div className="modal__status modal__status--success">
            <button type="button" className="btn btn--primary" onClick={onClose}>
              {t.inquiry.close}
            </button>
          </div>
        ) : (
          <form ref={formRef} key={type} className="modal__form" onSubmit={handleSubmit}>
            <input
              type="checkbox"
              name="botcheck"
              className="modal__honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <label className="modal__field">
              <span>{t.inquiry.fields.name}</span>
              <input
                name="name"
                type="text"
                required
                disabled={isSending}
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
                disabled={isSending}
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
                  disabled={isSending}
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
                disabled={isSending}
                placeholder={
                  type === "mentorship"
                    ? t.inquiry.placeholders.messageMentorship
                    : t.inquiry.placeholders.messageWorkshop
                }
              />
            </label>

            {status === "error" && (
              <p className="modal__feedback modal__feedback--error" role="alert">
                {t.inquiry.error}
              </p>
            )}

            <p className="modal__note">{t.inquiry.note}</p>

            <div className="modal__actions">
              <button type="button" className="btn btn--secondary" onClick={onClose} disabled={isSending}>
                {t.inquiry.cancel}
              </button>
              <button type="submit" className="btn btn--primary" disabled={isSending}>
                {isSending ? t.inquiry.sending : t.inquiry.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
