import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, DuelSide } from "../../components/editorial";
import { PageShell } from "../../components/site-chrome";
import { EDITOR, comparisons, getComparison, getProduct } from "../../lib/data";

export function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return {};
  return {
    title: comparison.title,
    description: comparison.summary,
    openGraph: { title: comparison.title, description: comparison.summary, images: [] },
    twitter: { title: comparison.title, description: comparison.summary, images: [] },
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();
  const a = getProduct(comparison.productA);
  const b = getProduct(comparison.productB);
  if (!a || !b) notFound();

  return (
    <PageShell>
      <article>
        <header className="comparisonDetailHero siteShell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }, { label: comparison.title }]} />
          <p className="eyebrow">Independent comparison</p>
          <h1>{comparison.title}</h1>
          <p>{comparison.summary}</p>
          <div className="byline"><span>By <Link href="/authors/khadija-bibi">{EDITOR.name}</Link></span><span>Reviewed 19 August 2026</span><span>Fact checked</span></div>
        </header>

        <section className="siteShell productDuel" aria-label="Products being compared">
          <DuelSide product={a} />
          <span>versus</span>
          <DuelSide product={b} />
        </section>

        <section className="siteShell glanceVerdict">
          <p className="eyebrow">At a glance</p>
          <h2>The decision in plain language</h2>
          <p>{comparison.verdict}</p>
        </section>

        <section className="siteShell comparisonTableSection">
          <div className="sectionHeaderRow compactHeader"><div><p className="eyebrow">Criterion by criterion</p><h2>Where each product stands</h2></div><p>A difference is only useful when it changes the buying decision.</p></div>
          <table className="comparisonTable">
            <caption>{a.name} and {b.name} comparison</caption>
            <thead><tr><th>Criterion</th><th>{a.name}</th><th>{b.name}</th><th>Editorial view</th></tr></thead>
            <tbody>{comparison.criteria.map((row) => (
              <tr key={row.name}><th scope="row">{row.name}</th><td>{row.a}</td><td>{row.b}</td><td>{row.view}</td></tr>
            ))}</tbody>
          </table>
        </section>

        <div className="siteShell comparisonNarrative">
          <section>
            <p className="eyebrow">Choose {a.name}</p>
            <h2>When {a.bestFor.toLowerCase()} describes the team</h2>
            <p>{a.verdict}</p><p>{a.localView}</p>
            <Link className="plainLink" href={`/reviews/${a.slug}`}>Read the {a.name} review</Link>
          </section>
          <section>
            <p className="eyebrow">Choose {b.name}</p>
            <h2>When {b.bestFor.toLowerCase()} describes the team</h2>
            <p>{b.verdict}</p><p>{b.localView}</p>
            <Link className="plainLink" href={`/reviews/${b.slug}`}>Read the {b.name} review</Link>
          </section>
        </div>

        <section className="comparisonFinal">
          <div className="siteShell">
            <p className="eyebrow">Final recommendation</p>
            <h2>Let the working context decide.</h2>
            <p>{comparison.verdict}</p>
            <p>Before committing, repeat the comparison with your own records, reports, users and support questions.</p>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
