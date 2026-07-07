import { OG_IMAGE, SITE_URL, SOCIAL } from "../constants/site";
import type { Locale, LocaleStrings } from "../types/locale";

export function buildStructuredData(locale: Locale, strings: LocaleStrings) {
  const language = locale === "pt" ? "pt-BR" : "en";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: strings.meta.title,
        description: strings.meta.description,
        inLanguage: language,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: strings.hero.name,
        url: SITE_URL,
        jobTitle: strings.hero.role,
        description: strings.meta.description,
        image: OG_IMAGE,
        sameAs: [SOCIAL.github, SOCIAL.linkedin],
      },
    ],
  };
}
