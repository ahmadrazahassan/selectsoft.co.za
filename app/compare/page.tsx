import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../components/editorial";
import { CompareBuilder } from "../components/compare-builder";
import { PageShell } from "../components/site-chrome";
import { siteConfig } from "../config/site";
import { categories, comparisons, getProduct } from "../lib/data";
import { getPublishedProducts } from "../lib/content-repository";
import { VS, categoryPairs } from "../lib/compare";

export const metadata: Metadata = {
  alternates: { canonical: "/compare" },
  title: "Compare business software in South Africa",
  description:
    "Put any two reviewed products side by side and see the scores, the checked rand prices and the differences that actually change the decision.",
  openGraph: {
    title: "Compare business software in South Africa",
    description:
      "Put any two reviewed products side by side and see the scores, the checked rand prices and the differences that actually change the decision.",
    url: "/compare",
  },
};

export default async function ComparePage() {
  const products = await getPublishedProducts();

  // The same key shape pairSlug uses, so the picker and the server agree on
  // which URL a pair belongs at.
  const writtenSlugs: Record<string, string> = {};
  for (const item of comparisons) {
    writtenSlugs[[item.productA, item.productB].sort().join(VS)] = item.slug;
  }

  const pairs = categoryPairs();
  const byCategory = categories
    .map((category) => ({
      category,
      pairs: pairs.filter((pair) => pair.a.category === category.name),
    }))
    .filter((group) => group.pairs.length > 0);

  const written = comparisons
    .map((item) => ({
      item,
      a: getProduct(item.productA),
      b: getProduct(item.productB),
    }))
    .filter((entry) => entry.a && entry.b);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Compare business software in South Africa",
    url: `${siteConfig.url}/compare`,
    hasPart: pairs.map((pair) => ({
      "@type": "WebPage",
      name: `${pair.a.name} vs ${pair.b.name}`,
      url: `${siteConfig.url}/compare/${pair.slug}`,
    })),
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="pageHero siteShell compareHero">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
        <p className="eyebrow">Software comparison</p>
        <h1>Put two products side by side.</h1>
        <p>
          Pick any two of the {products.length} products we have reviewed. Every
          pair gets the same treatment: the scores we published, the prices we
          read off the vendor page ourselves and the places each one gives
          ground.
        </p>
      </section>

      <section className="compareWorkbench">
        <div className="siteShell">
          <CompareBuilder products={products} writtenSlugs={writtenSlugs} />
          <p className="compareCount">
            {pairs.length} comparisons ready across {byCategory.length} categories.
          </p>
        </div>
      </section>

      <section className="siteShell publishedComparisons">
        <div className="sectionHeaderRow compactHeader">
          <div>
            <p className="eyebrow">Written verdicts</p>
            <h2>Start with a researched pair</h2>
          </div>
          <p>
            {written.length} pairs carry a written verdict on top of the shared data.
          </p>
        </div>
        <div className="comparisonCards">
          {written.map((entry, index) => (
            <Link href={`/compare/${entry.item.slug}`} key={entry.item.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{entry.item.title}</h3>
              <p>{entry.item.summary}</p>
              <strong>Read comparison</strong>
            </Link>
          ))}
        </div>
      </section>

      {byCategory.map((group) => (
        <section className="siteShell comparePairSection" key={group.category.slug}>
          <div className="sectionHeaderRow compactHeader">
            <div>
              <p className="eyebrow">{group.category.shortName}</p>
              <h2>{group.category.name}</h2>
            </div>
            <p>
              {group.pairs.length} pairs. <Link href={`/software/${group.category.slug}`}>See the category</Link>
            </p>
          </div>
          <ul className="comparePairList">
            {group.pairs.map((pair) => (
              <li key={pair.slug}>
                <Link href={`/compare/${pair.slug}`}>
                  <span className="comparePairNames">
                    {pair.a.name} <em>vs</em> {pair.b.name}
                  </span>
                  <span className="comparePairMeta">
                    {pair.a.score.toFixed(1)} against {pair.b.score.toFixed(1)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PageShell>
  );
}
