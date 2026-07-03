export default function BackgroundDecor() {
  return (
    <div className="bg-decor" aria-hidden="true">
      <div className="bg-decor__grid" />
      <div className="bg-decor__orb bg-decor__orb--1" />
      <div className="bg-decor__orb bg-decor__orb--2" />
      <div className="bg-decor__orb bg-decor__orb--3" />
      <div className="bg-decor__orb bg-decor__orb--4" />
      <span className="bg-decor__glyph bg-decor__glyph--1">{"{ }"}</span>
      <span className="bg-decor__glyph bg-decor__glyph--2">{"< />"}</span>
      <span className="bg-decor__glyph bg-decor__glyph--3">AI</span>
      <span className="bg-decor__glyph bg-decor__glyph--4">RAG</span>
      <span className="bg-decor__glyph bg-decor__glyph--5">01</span>
      <span className="bg-decor__glyph bg-decor__glyph--6">λ</span>
    </div>
  );
}
