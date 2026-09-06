import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../components/editorial";
import { CompareBuilder } from "../components/compare-builder";
import { PageShell } from "../components/site-chrome";
import { comparisons, getProduct } from "../lib/data";
import { getPublishedProducts } from "../lib/content-repository";

export const metadata: Metadata = {
  alternates: { canonical: "/compare" },
  title: "Compare business software",
  description: "Put two business software products side by side and focus on the differences that matter.",
};

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ first?: string; second?: string; view?: string }> }) {
  const query = await searchParams;
  const products = await getPublishedProducts();
  const first = query.first ? getProduct(query.first) : undefined;
  const second = query.second ? getProduct(query.second) : undefined;
  const showData = query.view === "data" && first && second && first.slug !== second.slug;

  return (
    <PageShell>
      <section className="pageHero siteShell compareHero">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
        <p className="eyebrow">Software comparison</p>
        <h1>Make the differences visible.</h1>
        <p>Choose two products and compare the questions that survive a good sales demo.</p>
      </section>
      <section className="compareWorkbench">
        <div className="siteShell"><CompareBuilder products={products} comparisons={comparisons} /></div>
      </section>

      {showData && (
        <section className="siteShell dataComparison">
          <div className="dataNotice"><strong>Product data view</strong><p>There is no published editorial verdict for this pair yet. The information below comes from the reviewed product records.</p></div>
          <h2>{first.name} and {second.name}</h2>
          <div className="dataCompareGrid">
            <div><span>Product</span><strong>{first.name}</strong><strong>{second.name}</strong></div>
            <div><span>Category</span><p>{first.category}</p><p>{second.category}</p></div>
            <div><span>Best for</span><p>{first.bestFor}</p><p>{second.bestFor}</p></div>
            <div><span>Deployment</span><p>{first.facts[0].value}</p><p>{second.facts[0].value}</p></div>
            <div><span>Pricing</span><p>{first.facts[2].value}</p><p>{second.facts[2].value}</p></div>
            <div><span>Local view</span><p>{first.localView}</p><p>{second.localView}</p></div>
          </div>
        </section>
      )}

      <section className="siteShell publishedComparisons">
        <div className="sectionHeaderRow compactHeader"><div><p className="eyebrow">Published comparisons</p><h2>Start with a researched pair</h2></div><p>Each verdict is written around the decision, not a long feature count.</p></div>
        <div className="comparisonCards">
          {comparisons.map((comparison, index) => (
            <Link href={`/compare/${comparison.slug}`} key={comparison.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{comparison.title}</h3>
              <p>{comparison.summary}</p>
              <strong>Read comparison</strong>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
