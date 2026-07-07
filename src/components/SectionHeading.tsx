interface SectionHeadingProps {
  number?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ number, title, subtitle }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <h2 className="section__title reveal">
        {number && (
          <>
            <span className="section__number">{number}</span>
            <span className="section__number-sep" aria-hidden="true">
              {" · "}
            </span>
          </>
        )}
        {title}
      </h2>
      {subtitle && (
        <p className="section__subtitle prose reveal reveal--delay-1">{subtitle}</p>
      )}
    </header>
  );
}
