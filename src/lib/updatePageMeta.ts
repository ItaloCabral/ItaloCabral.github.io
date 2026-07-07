import { OG_IMAGE, SITE_URL } from "../constants/site";
import type { Locale, LocaleStrings } from "../types/locale";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let element = document.querySelector(`meta[${attr}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function ensureHreflangLinks() {
  const alternates: Array<{ lang: string; href: string }> = [
    { lang: "pt-BR", href: SITE_URL },
    { lang: "en", href: SITE_URL },
    { lang: "x-default", href: SITE_URL },
  ];

  alternates.forEach(({ lang, href }) => {
    const selector = `link[rel="alternate"][hreflang="${lang}"]`;
    let link = document.querySelector(selector) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lang;
      document.head.appendChild(link);
    }

    link.href = href;
  });
}

export function updatePageMeta(locale: Locale, strings: LocaleStrings) {
  const ogLocale = locale === "pt" ? "pt_BR" : "en_US";
  const ogLocaleAlternate = locale === "pt" ? "en_US" : "pt_BR";

  document.title = strings.meta.title;
  document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";

  setMeta("name", "description", strings.meta.description);
  setMeta("property", "og:title", strings.meta.title);
  setMeta("property", "og:description", strings.meta.description);
  setMeta("property", "og:url", SITE_URL);
  setMeta("property", "og:image", OG_IMAGE);
  setMeta("property", "og:image:alt", strings.meta.title);
  setMeta("property", "og:locale", ogLocale);
  setMeta("property", "og:locale:alternate", ogLocaleAlternate);
  setMeta("name", "twitter:title", strings.meta.title);
  setMeta("name", "twitter:description", strings.meta.description);
  setMeta("name", "twitter:image", OG_IMAGE);

  ensureHreflangLinks();
}
