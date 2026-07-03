import { useLocale } from "../context/LocaleContext";

export default function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>{t.footer.built}</p>
        <p>© {year} Italo Cabral. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
