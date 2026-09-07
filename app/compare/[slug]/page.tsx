import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, ProductMark } from "../../components/editorial";
import { ComparisonBody, ComparisonHead, ComparisonNav } from "../../components/comparison-table";
import { PageShell } from "../../components/site-chrome";
import { siteConfig } from "../../config/site";
import {
  EDITOR,
  PRICING_CHECKED_ON,
  getComparison,
  getProduct,
  isoDate,
  type Product,
} from "../../lib/data";
import { buildComparison, categoryPairs, pairSlug, parsePairSlug } from "../../lib/compare";

/* Every same category pair is a page. Where an editorial verdict has been
 * written, pairSlug returns that slug, so the written and generated routes can
 * never collide or produce two URLs for one pair. */
export function generateStaticParams() {
  const slugs = new Set(categoryPairs().map((pair) => pair.slug));
  return [...slugs].map((slug) => ({ slug }));
}

function resolve(slug: string): { a: Product; b: Product } | null {
  const written = getComparison(slug);
  if (written) {
    const a = getProduct(written.productA);
    const b = getProduct(written.productB);
    return a && b ? { a, b } : null;
  }
  const pair = parsePairSlug(slug);
  return pair ? { a: pair[0], b: pair[1] } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolve(slug);
  if (!resolved) return {};
  const written = getComparison(slug);
  const built = buildComparison(resolved.a, resolved.b);
  const title = written ? written.title : `${built.a.name} vs ${built.b.name}`;
  const description = written ? written.summary : built.summary;
  const canonical = `/compare/${written ? written.slug : built.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolved = resolve(slug);
  if (!resolved) notFound();

  // Only ever serve a pair on its canonical slug, so b-vs-a never becomes a
  // second indexable copy of the same page.
  const written = getComparison(slug);
  const canonicalSlug = written ? written.slug : pairSlug(resolved.a.slug, resolved.b.slug);
  if (slug !== canonicalSlug) notFound();

  const comparison = buildComparison(resolved.a, resolved.b);
  const { a, b } = comparison;
  const heading = written ? written.title : `${a.name} vs ${b.name}`;
  const summary = written ? written.summary : comparison.summary;
  const url = `${siteConfig.url}/compare/${canonicalSlug}`;

  const alsoCompare = categoryPairs()
    .filter(
      (pair) =>
        pair.slug !== canonicalSlug &&
        (pair.a.slug === a.slug ||
          pair.b.slug === a.slug ||
          pair.a.slug === b.slug ||
          pair.b.slug === b.slug),
    )
    .slice(0, 6);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: heading,
        description: summary,
        mainEntityOfPage: url,
        author: { "@type": "Person", name: EDITOR.name },
        publisher: { "@type": "Organization", name: siteConfig.name },
        datePublished: isoDate(written ? written.reviewed : a.reviewed),
        about: [
          { "@type": "SoftwareApplication", name: a.name, applicationCategory: a.category },
          { "@type": "SoftwareApplication", name: b.name, applicationCategory: b.category },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Compare", item: `${siteConfig.url}/compare` },
          { "@type": "ListItem", position: 3, name: heading, item: url },
        ],
      },
    ],
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <article>
        <header className="duelHero siteShell">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Compare", href: "/compare" },
              { label: heading },
            ]}
          />
          <p className="eyebrow">
            {comparison.sameCategory ? comparison.a.shortCategory : "Across categories"}
          </p>
          <h1>{heading}</h1>
          <p className="duelLead">{summary}</p>
          <div className="byline">
            <span>
              By <Link href="/authors/khadija-bibi">{EDITOR.name}</Link>
            </span>
            <span>{written ? `Reviewed ${written.reviewed}` : `Prices checked ${PRICING_CHECKED_ON}`}</span>
            <span>No vendor sees this before it is published</span>
          </div>
        </header>

        <ComparisonHead comparison={comparison} />

        <ComparisonNav comparison={comparison} />

        {written && (
          <section className="siteShell duelSection duelEditorial">
            <p className="sectionChip">Editorial verdict</p>
            <h2>The decision in plain language</h2>
            <p>{written.verdict}</p>
          </section>
        )}

        <ComparisonBody comparison={comparison} />

        {written && written.criteria.length > 0 && (
          <section className="siteShell duelSection">
            <p className="sectionChip">Criterion by criterion</p>
            <h2>Where each product stands</h2>
            <div className="duelScrollWrap">
              <table className="duelTable duelTableFacts">
                <caption className="visuallyHidden">
                  {a.name} and {b.name} judged criterion by criterion
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Criterion</th>
                    <th scope="col">{a.name}</th>
                    <th scope="col">{b.name}</th>
                    <th scope="col">Editorial view</th>
                  </tr>
                </thead>
                <tbody>
                  {written.criteria.map((row) => (
                    <tr key={row.name}>
                      <th scope="row">{row.name}</th>
                      <td>{row.a}</td>
                      <td>{row.b}</td>
                      <td>{row.view}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="siteShell duelSection">
          <p className="sectionChip">How this page is put together</p>
          <h2>Where these figures come from</h2>
          <p className="duelMethod">
            {written
              ? "The verdict above was written after taking both products through our review process. The tables are drawn from the same records, so nothing on this page contradicts either full review."
              : "This page is assembled from our two reviews rather than written as a separate verdict. The scores, facts and prices are the ones published in each review, which is why they match. Where a figure has not been verified for both products we leave the row out instead of estimating it."}{" "}
            <Link href="/methodology">Read the methodology</Link>
          </p>
        </section>

        {alsoCompare.length > 0 && (
          <section className="siteShell duelSection duelAlso">
            <p className="sectionChip">Keep comparing</p>
            <h2>Other pairs worth a look</h2>
            <div className="duelAlsoGrid">
              {alsoCompare.map((pair) => (
                <Link key={pair.slug} href={`/compare/${pair.slug}`}>
                  <span className="duelAlsoMarks">
                    <ProductMark product={pair.a} />
                    <ProductMark product={pair.b} />
                  </span>
                  <strong>
                    {pair.a.name} vs {pair.b.name}
                  </strong>
                  <span className="duelAlsoMeta">{pair.a.shortCategory}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </PageShell>
  );
}
