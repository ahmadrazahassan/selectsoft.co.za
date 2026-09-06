import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, ReviewCard } from "../../components/editorial";
import { PageShell } from "../../components/site-chrome";
import { getCategory, getCategoryProducts, guides, liveCategories } from "../../lib/data";

export function generateStaticParams() {
  return liveCategories.map((category) => ({ categorySlug: category.slug }));
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
  // A category with nothing in it is not published. Better a clean 404 than a
  // page that advertises a number and then admits it has no reviews.
  const categoryProducts = getCategoryProducts(categorySlug);
  if (!categoryProducts.length) notFound();
  const relevantGuides = guides.filter((guide) => guide.topic === category.shortName || category.name.includes(guide.topic));

  return (
    <PageShell>
      <section className="pageHero siteShell categoryHero">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Software", href: "/software" }, { label: category.name }]} />
        <p className="eyebrow">{categoryProducts.length} {categoryProducts.length === 1 ? "review" : "reviews"}</p>
        <h1>{category.name} software</h1>
        <p>{category.longDescription}</p>
        <div className="updatedNote"><span>Reviewed by our editorial desk</span><span>Updated 19 August 2026</span></div>
      </section>

      <section className="siteShell categoryProducts">
        <div className="sectionHeaderRow compactHeader">
          <div><p className="eyebrow">Current selection</p><h2>Products worth comparing</h2></div>
          <p>Scores reflect the needs of the category and are never influenced by commercial relationships.</p>
        </div>
        <div className="reviewGrid">
          {categoryProducts.map((product) => <ReviewCard product={product} key={product.slug} />)}
        </div>
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
