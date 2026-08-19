import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, ReviewCard } from "../../components/editorial";
import { PageShell } from "../../components/site-chrome";
import { categories, getCategory, guides, products } from "../../lib/data";

export function generateStaticParams() {
  return categories.map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};
  return {
    title: `${category.name} software reviews`,
    description: category.summary,
    openGraph: { title: `${category.name} software reviews`, description: category.summary, images: [] },
    twitter: { title: `${category.name} software reviews`, description: category.summary, images: [] },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();
  const categoryProducts = products.filter((product) => product.category === category.name);
  const relevantGuides = guides.filter((guide) => guide.topic === category.shortName || category.name.includes(guide.topic));

  return (
    <PageShell>
      <section className="pageHero siteShell categoryHero">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Software", href: "/software" }, { label: category.name }]} />
        <p className="eyebrow">{category.count} reviews and guides</p>
        <h1>{category.name} software</h1>
        <p>{category.longDescription}</p>
        <div className="updatedNote"><span>Reviewed by our editorial desk</span><span>Updated 19 August 2026</span></div>
      </section>

      <section className="siteShell categoryProducts">
        <div className="sectionHeaderRow compactHeader">
          <div><p className="eyebrow">Current selection</p><h2>Products worth comparing</h2></div>
          <p>Scores reflect the needs of the category and are never influenced by commercial relationships.</p>
        </div>
        {categoryProducts.length ? (
          <div className="reviewGrid">
            {categoryProducts.map((product) => <ReviewCard product={product} key={product.slug} />)}
          </div>
        ) : (
          <div className="emptyState"><h2>Research is in progress</h2><p>This category will receive its first full reviews soon.</p></div>
        )}
      </section>

      <section className="methodStrip">
        <div className="siteShell methodStripInner">
          <div><p className="eyebrow">How we assess this category</p><h2>Useful in the real working week.</h2></div>
          <ol>
            <li><span>01</span><p>Core work should be clear and dependable.</p></li>
            <li><span>02</span><p>Pricing should remain understandable as the team grows.</p></li>
            <li><span>03</span><p>Support and local context should match the risk of the work.</p></li>
          </ol>
          <Link className="plainLink" href="/methodology">Read the full method</Link>
        </div>
      </section>

      {relevantGuides.length > 0 && (
        <section className="siteShell relatedSection">
          <p className="eyebrow">Related reading</p>
          <h2>Make sense of the shortlist</h2>
          <div className="textLinkList">
            {relevantGuides.map((guide) => <Link href={`/guides/${guide.slug}`} key={guide.slug}>{guide.title}</Link>)}
          </div>
        </section>
      )}
    </PageShell>
  );
}
