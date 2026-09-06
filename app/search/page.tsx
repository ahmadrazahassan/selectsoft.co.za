import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { Breadcrumbs, ProductMark } from "../components/editorial";
import { PageShell } from "../components/site-chrome";
import { guides, products } from "../lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/search" }, title: "Search" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const term = q.trim().toLowerCase();
  const productResults = term ? products.filter((product) => `${product.name} ${product.category} ${product.verdict}`.toLowerCase().includes(term)) : [];
  const guideResults = term ? guides.filter((guide) => `${guide.title} ${guide.topic} ${guide.excerpt}`.toLowerCase().includes(term)) : [];
  const total = productResults.length + guideResults.length;

  return (
    <PageShell>
      <section className="pageHero siteShell searchPageHero">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
        <p className="eyebrow">Search the publication</p>
        <h1>{term ? `Results for “${q}”` : "What are you looking for?"}</h1>
        <form className="siteSearchForm" action="/search">
          <Search size={24} strokeWidth={1.6} aria-hidden="true" />
          <label className="srOnly" htmlFor="siteSearch">Search</label>
          <input id="siteSearch" type="search" name="q" defaultValue={q} placeholder="Product, category or buying question" />
          <button type="submit">Search</button>
        </form>
      </section>
      <section className="siteShell searchResults">
        {term ? <p className="resultCount">{total} results</p> : <p>Try accounting, payroll, CRM, ERP or a product name.</p>}
        {term && total === 0 && <div className="emptyState"><h2>No close match yet</h2><p>Try a shorter product name or browse the software directory.</p><Link className="plainLink" href="/software">Browse all software</Link></div>}
        {productResults.map((product) => (
          <Link className="searchResult" href={`/reviews/${product.slug}`} key={product.slug}><ProductMark product={product} /><div><span>Software review</span><h2>{product.name}</h2><p>{product.verdict}</p></div></Link>
        ))}
        {guideResults.map((guide) => (
          <Link className="searchResult searchResultGuide" href={`/guides/${guide.slug}`} key={guide.slug}><span className="searchIndex">Guide</span><div><span>{guide.topic}</span><h2>{guide.title}</h2><p>{guide.excerpt}</p></div></Link>
        ))}
      </section>
    </PageShell>
  );
}
