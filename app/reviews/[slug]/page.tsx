import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs, EditorialScore, ProductMark, ProsCons, ReviewCard } from "../../components/editorial";
import { PageShell } from "../../components/site-chrome";
import { getProduct, products } from "../../lib/data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} review for South African businesses`,
    description: product.verdict,
    openGraph: { title: `${product.name} review`, description: product.verdict, images: [] },
    twitter: { title: `${product.name} review`, description: product.verdict, images: [] },
  };
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);

  return (
    <PageShell>
      <article>
        <header className="reviewHero siteShell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews", href: "/reviews" }, { label: product.name }]} />
          <div className="reviewHeroGrid">
            <div>
              <p className="eyebrow">{product.category}</p>
              <h1>{product.name} review</h1>
              <p className="reviewDeck">{product.verdict}</p>
              <div className="byline"><span>By Nomsa Dlamini</span><span>Reviewed {product.reviewed}</span><span>Fact checked</span></div>
            </div>
            <div className="reviewIdentity">
              <ProductMark product={product} />
              <EditorialScore score={product.score} />
            </div>
          </div>
        </header>

        <section className="siteShell verdictPanel">
          <div><p className="eyebrow">Our verdict</p><h2>{product.bestFor}</h2></div>
          <p>{product.verdict}</p>
          <a className="button" href={product.sourceUrl} rel="nofollow noopener noreferrer" target="_blank">
            Visit official site <ExternalLink size={17} strokeWidth={1.7} aria-hidden="true" />
          </a>
          <small>Product details can change. Confirm current plans with the vendor.</small>
        </section>

        <section className="siteShell factGrid" aria-label="Key product facts">
          {product.facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}
        </section>

        <div className="siteShell reviewBodyLayout">
          <aside className="reviewToc">
            <p>In this review</p>
            <a href="#overview">Overview</a>
            <a href="#strengths">Strengths and limits</a>
            <a href="#features">Key features</a>
            <a href="#local">South African view</a>
            <a href="#score">Score breakdown</a>
            <a href="#verdict">Final view</a>
          </aside>
          <div className="reviewProse">
            <section id="overview">
              <p className="eyebrow">Overview</p>
              <h2>What it is like to use</h2>
              <p>
                {product.name} is at its best when the team has a clear owner for the system and a defined routine for keeping information current. The product covers the central work expected in {product.category.toLowerCase()}, but the quality of the decision still depends on setup, support and the other tools already used by the business.
              </p>
              <p>
                We would put it on a serious shortlist for {product.bestFor.toLowerCase()}. Teams with unusual reporting, approval or integration needs should use a trial or structured vendor session to work through their own examples before signing a contract.
              </p>
            </section>
            <section id="strengths"><ProsCons product={product} /></section>
            <section id="features">
              <p className="eyebrow">Core capability</p>
              <h2>The features that matter</h2>
              <div className="featureList">
                {product.features.map((feature, index) => <div key={feature}><span>{String(index + 1).padStart(2, "0")}</span><strong>{feature}</strong><p>A practical part of the daily workflow, with depth that should be checked against your process.</p></div>)}
              </div>
            </section>
            <section id="local" className="localReviewNote">
              <p className="eyebrow">South African view</p>
              <h2>Local fit should be checked early.</h2>
              <p>{product.localView}</p>
            </section>
            <section id="score">
              <p className="eyebrow">Score breakdown</p>
              <h2>How the result was formed</h2>
              <div className="scoreBars">
                {[
                  ["Everyday use", product.score],
                  ["Features", Math.max(7.6, product.score - 0.2)],
                  ["Value", Math.max(7.4, product.score - 0.4)],
                  ["Support", Math.max(7.2, product.score - 0.5)],
                  ["South African fit", Math.min(9.4, product.score + (product.slug === "simplepay" || product.slug === "yoco" ? 0.4 : 0))],
                ].map(([label, value]) => (
                  <div key={String(label)}><span>{label}</span><div><i style={{ width: `${Number(value) * 10}%` }} /></div><strong>{Number(value).toFixed(1)}</strong></div>
                ))}
              </div>
            </section>
            <section id="verdict">
              <p className="eyebrow">Final view</p>
              <h2>Should it make the shortlist?</h2>
              <p>{product.verdict}</p>
              <p>
                Keep the final buying session grounded in your own records, reporting needs and support expectations. A confident choice is one the team can explain without relying on the sales presentation.
              </p>
            </section>
            <aside className="sourceNote">
              <h2>Research note</h2>
              <p>This review uses public product information and our category method. Pricing and product details should be confirmed on the official site before purchase.</p>
              <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer">View the primary product source</a>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="relatedReviews">
          <div className="siteShell"><p className="eyebrow">Also consider</p><h2>Other products in {product.category}</h2><div className="reviewGrid">{related.map((item) => <ReviewCard product={item} key={item.slug} />)}</div></div>
        </section>
      )}
    </PageShell>
  );
}
