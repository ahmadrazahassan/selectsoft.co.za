import { Breadcrumbs } from "./editorial";
import { PageShell } from "./site-chrome";

export function InfoPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; paragraphs: string[] }[];
}) {
  return (
    <PageShell>
      <section className="pageHero siteShell infoHero">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
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
      </article>
    </PageShell>
  );
}
