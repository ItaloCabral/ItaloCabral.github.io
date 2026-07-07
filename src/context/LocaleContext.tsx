import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import pt from "../locales/pt.json";
import en from "../locales/en.json";
import type { Locale, LocaleStrings } from "../types/locale";

const locales: Record<Locale, LocaleStrings> = {
  pt: pt as LocaleStrings,
  en: en as LocaleStrings,
};

interface LocaleContextValue {
  locale: Locale;
  t: LocaleStrings;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "portfolio-locale";

function getInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored === "pt" || stored === "en") return stored;
  return navigator.language.startsWith("pt") ? "pt" : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    document.title = locales[locale].meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", locales[locale].meta.description);
  }, [locale]);

  const setLocale = (l: Locale) => setLocaleState(l);
  const toggleLocale = () => setLocaleState((l) => (l === "pt" ? "en" : "pt"));

  return (
    <LocaleContext.Provider value={{ locale, t: locales[locale], toggleLocale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
