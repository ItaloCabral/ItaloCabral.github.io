import { useEffect, useMemo } from "react";
import { useLocale } from "../context/LocaleContext";
import { buildStructuredData } from "../lib/buildStructuredData";

const SCRIPT_ID = "structured-data";

export default function StructuredData() {
  const { locale, t } = useLocale();
  const schema = useMemo(() => buildStructuredData(locale, t), [locale, t]);

  useEffect(() => {
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
  }, [schema]);

  return null;
}
