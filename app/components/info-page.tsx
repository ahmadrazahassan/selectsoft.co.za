import { Breadcrumbs } from "./editorial";
import { PageShell } from "./site-chrome";

export function InfoPage({
  eyebrow,
  title,
  intro,
  sections,
  effective,
  footNote,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; paragraphs: string[] }[];
  /** Shown on legal pages, where a reader needs to know which version applies. */
  effective?: string;
  footNote?: string;
}) {
  return (
    <PageShell>
      <section className="pageHero siteShell infoHero">
        {/* the short label, not the headline: a long title used to push the
            breadcrumb row past the viewport on a narrow screen */}
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: eyebrow }]} />
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
        {effective ? <p className="infoEffective">In effect from {effective}</p> : null}
      </section>
      <article className="siteShell infoArticle">
        {sections.map((section, index) => (
          <section key={section.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}
        {footNote ? <p className="infoFootNote">{footNote}</p> : null}
      </article>
    </PageShell>
  );
}
