import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  FileText,
  Flag,
  LayoutGrid,
  ListChecks,
  MapPin,
  Wallet,
  Scale,
  HelpCircle,
  Layers,
  TrendingUp,
  Users,
  Wrench,
  Check,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs, ProductMark, ProsCons, ReviewCard } from "../../components/editorial";
import { ReviewToc } from "../../components/review-toc";
import {
  DimensionBars,
  HeadToHead,
  ScoreRadar,
} from "../../components/review-charts";
import { CostCurve, PriceRanking } from "../../components/cost-charts";
import { PageShell } from "../../components/site-chrome";
import { EDITOR, getPricing, getProduct, pricedOn, products } from "../../lib/data";
import { hasRatings } from "../../lib/ratings";
import { siteConfig } from "../../config/site";
import { RatingCitations } from "../../components/ratings";
import { reviewDetail } from "../../lib/reviews";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const url = `${siteConfig.url}/reviews/${product.slug}`;
  return {
    title: `${product.name} review for South African businesses`,
    description: product.verdict,
    alternates: { canonical: `/reviews/${product.slug}` },
    openGraph: {
      type: "article",
      title: `${product.name} review`,
      description: product.verdict,
      url,
    },
    twitter: { card: "summary_large_image", title: `${product.name} review`, description: product.verdict },
  };
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);
  const price = getPricing(product.slug);
  const detail = reviewDetail[product.slug];
  const peers = products.filter((item) => item.category === product.category);
  const ranked = peers
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => b.score - a.score);

  const reviewUrl = `${siteConfig.url}/reviews/${product.slug}`;
  /* Our own editorial score, expressed as a Review of a Product. The offer is
     only declared where the vendor publishes a rand figure we have verified. */
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        description: product.verdict,
        brand: { "@type": "Brand", name: product.vendor },
        category: product.category,
        ...(price?.monthlyZar
          ? {
              offers: {
                "@type": "Offer",
                price: price.monthlyZar,
                priceCurrency: "ZAR",
                url: price.pricingUrl,
                availability: "https://schema.org/InStock",
              },
            }
          : {}),
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: product.score,
            bestRating: 10,
            worstRating: 0,
          },
          author: { "@type": "Person", name: EDITOR.name },
          publisher: { "@type": "Organization", name: siteConfig.name },
          datePublished: product.reviewed,
          reviewBody: detail?.finalView ?? product.verdict,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Reviews", item: `${siteConfig.url}/reviews` },
          { "@type": "ListItem", position: 3, name: product.name, item: reviewUrl },
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
        <header className="reviewHero siteShell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews", href: "/reviews" }, { label: product.name }]} />
          <div className="reviewHeroCore">
            <ProductMark product={product} size="large" />
            <h1>
              {product.name}
              <span className="reviewCategoryTag">{product.shortCategory}</span>
            </h1>
            <p className="reviewTagline">{product.bestFor}</p>
            <div className="reviewRating">
              <strong>{product.score.toFixed(1)}</strong>
              <span>out of 10</span>
              <a href="#score">See how we scored it</a>
            </div>
            <a
              className="btn btnPrimary btnLarge"
              href={price?.pricingUrl ?? product.sourceUrl}
              rel="nofollow sponsored noopener noreferrer"
              target="_blank"
            >
              <span>Visit {product.name}</span>
              <span className="btnIcon" aria-hidden="true">
                <ArrowUpRight size={18} strokeWidth={2} />
              </span>
            </a>
            <p className="reviewByline">
              Reviewed {product.reviewed} by <Link href="/authors/khadija-bibi">{EDITOR.name}</Link>. Prices checked {pricedOn(product.slug)}.
            </p>
          </div>
        </header>

        <div className="siteShell reviewBodyLayout">
          <ReviewToc
            items={[
              { id: "overview", label: "Overview" },
              { id: "strengths", label: "Strengths and limits" },
              { id: "features", label: "Capability" },
              { id: "setup", label: "Setup and support" },
              { id: "pricing", label: "What it costs" },
              { id: "local", label: "South African view" },
              { id: "score", label: "How we scored it" },
              ...(hasRatings(product.slug)
                ? [{ id: "ratings", label: "What other buyers rate it" }]
                : []),
              { id: "benchmark", label: "Against the category" },
              { id: "cost", label: "Cost over time" },
              { id: "versus", label: "Head to head" },
              { id: "alternatives", label: "Alternatives" },
              { id: "faq", label: "Common questions" },
              { id: "verdict", label: "Final view" },
            ]}
          />
          <div className="reviewProse">
            <section id="overview">
              <p className="sectionChip"><FileText size={15} strokeWidth={2} aria-hidden="true" />The assessment</p>
              <h2>What {product.name} is, honestly</h2>
              {detail.overview.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
            </section>
            <section id="strengths">
              <p className="sectionChip"><ListChecks size={15} strokeWidth={2} aria-hidden="true" />The balance</p>
              <h2>Where it is strong, and where it is not</h2>
              <ProsCons product={product} />
            </section>
            <section id="features">
              <p className="sectionChip"><LayoutGrid size={15} strokeWidth={2} aria-hidden="true" />Capability</p>
              <h2>What it does better than most</h2>
              <div className="featureList">
                {detail.capabilities.map((capability, index) => (
                  <div key={capability.name}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{capability.name}</strong>
                    <p>{capability.detail}</p>
                  </div>
                ))}
              </div>
            </section>
            <section id="setup">
              <p className="sectionChip"><Wrench size={15} strokeWidth={2} aria-hidden="true" />Setup and support</p>
              <h2>Getting it running, and getting help</h2>
              <div className="splitProse">
                <div>
                  <h3>What implementation actually involves</h3>
                  <p>{detail.implementation}</p>
                </div>
                <div>
                  <h3>What happens when something breaks</h3>
                  <p>{detail.support}</p>
                </div>
              </div>
            </section>
            <section id="pricing">
              <p className="sectionChip"><Wallet size={15} strokeWidth={2} aria-hidden="true" />What it costs</p>
              <h2>How the money actually works</h2>
              <p>{detail.pricingView}</p>
              {price?.plans ? (
                <div className="planSection">
                  <div className="planGrid">
                    {price.plans.map((plan, index) => {
                      const lead = price.plans!.length > 1 && index === 1;
                      return (
                        <article
                          className={lead ? "planCard planCardLead" : "planCard"}
                          key={plan.name}
                        >
                          <h3>{plan.name}</h3>
                          <p className="planSummary">{plan.summary}</p>
                          <p className="planPriceRow">
                            <span className="planCurrency">R</span>
                            <span className="planFigure">{plan.price.replace(/^R/, "")}</span>
                            <span className="planUnit">{plan.unit}</span>
                          </p>
                          <a
                            className={lead ? "btn btnPrimary planCta" : "btn btnSecondary planCta"}
                            href={price.pricingUrl}
                            rel="nofollow sponsored noopener noreferrer"
                            target="_blank"
                          >
                            Get {plan.name}
                          </a>
                          <ul className="planFeatures">
                            {plan.features.map((feature) => (
                              <li key={feature}>
                                <Check size={14} strokeWidth={2.6} aria-hidden="true" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </article>
                      );
                    })}
                  </div>
                  <p className="chartNote">
                    Read off the vendor pricing page on {pricedOn(product.slug)}. Vendors
                    change prices and run promotions without notice, so confirm the
                    current figure before you buy.
                  </p>
                </div>
              ) : null}
              <aside className="buyPanel">
                <div>
                  <p className="buyPanelLabel">Starting price</p>
                  <p className="buyPanelPrice">{price ? price.entry : "On request"}</p>
                  <p className="buyPanelUnit">{price ? price.unit : "quoted by the vendor"}</p>
                </div>
                <dl className="buyPanelFacts">
                  {product.facts
                    .filter((fact) => fact.label !== "Pricing")
                    .map((fact) => (
                      <div key={fact.label}>
                        <dt>{fact.label}</dt>
                        <dd>{fact.value}</dd>
                      </div>
                    ))}
                  <div>
                    <dt>Free trial</dt>
                    <dd>
                      {price?.trialDays
                        ? `${price.trialDays} days`
                        : price?.trialNote
                          ? "Yes, length not published"
                          : "Not offered"}
                    </dd>
                  </div>
                  <div>
                    <dt>Product demo</dt>
                    <dd>{price?.demo ? "On request" : "Not advertised"}</dd>
                  </div>
                </dl>
                <div className="buyPanelAction">
                  <a
                    className="btn btnPrimary"
                    href={price?.pricingUrl ?? product.sourceUrl}
                    rel="nofollow sponsored noopener noreferrer"
                    target="_blank"
                  >
                    <span>Visit {product.name}</span>
                    <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                  </a>
                  <p className="buyPanelDisclosure">
                    We may earn a commission if you subscribe through this link, at
                    no extra cost to you. It never affects a score or a ranking.{" "}
                    <Link href="/affiliate-disclosure">How we make money</Link>
                  </p>
                </div>
              </aside>
            </section>
            <section id="local" className="localReviewNote">
              <p className="sectionChip"><MapPin size={15} strokeWidth={2} aria-hidden="true" />Local view</p>
              <h2>What changes in South Africa</h2>
              <p>{product.localView}</p>
            </section>
            <section id="score">
              <p className="sectionChip"><BarChart3 size={15} strokeWidth={2} aria-hidden="true" />How we scored it</p>
              <h2>Where the number comes from</h2>
              <div className="scoreBars">
                {detail.scores.map((row) => (
                  <div key={row.name}>
                    <span>{row.name}</span>
                    <div><i style={{ width: `${row.value * 10}%` }} /></div>
                    <strong>{row.value.toFixed(1)}</strong>
                    <p>{row.note}</p>
                  </div>
                ))}
              </div>
              <ScoreRadar product={product} peers={peers} />
              <p className="scoreMethod">
                The headline score is the mean of these five. Each number is a
                judgement, not a measurement, and the reason for it is written
                beside it so you can disagree with it.
              </p>
            </section>
            {hasRatings(product.slug) ? (
              <section id="ratings">
                <p className="sectionChip">
                  <Users size={15} strokeWidth={2} aria-hidden="true" />
                  What other buyers rate it
                </p>
                <h2>How {product.name} scores elsewhere</h2>
                <RatingCitations slug={product.slug} name={product.name} />
              </section>
            ) : null}
            <section id="benchmark">
              <p className="sectionChip"><Layers size={15} strokeWidth={2} aria-hidden="true" />Against the category</p>
              <h2>How it compares with its peers</h2>
              <DimensionBars product={product} peers={peers} />
              <PriceRanking product={product} peers={peers} />
            </section>
            <section id="cost">
              <p className="sectionChip"><TrendingUp size={15} strokeWidth={2} aria-hidden="true" />Cost over time</p>
              <h2>What it really costs over three years</h2>
              <CostCurve product={product} peers={peers} />
            </section>
            <section id="versus">
              <p className="sectionChip"><Scale size={15} strokeWidth={2} aria-hidden="true" />Head to head</p>
              <h2>Against its closest rival</h2>
              <HeadToHead product={product} peers={peers} />
            </section>
            <section id="alternatives">
              <p className="sectionChip"><Layers size={15} strokeWidth={2} aria-hidden="true" />Alternatives</p>
              <h2>What to look at instead</h2>
              <ol className="altList">
                {ranked.slice(0, 4).map((item, index) => {
                  const altPrice = getPricing(item.slug);
                  return (
                    <li key={item.slug}>
                      <span className="altRank">{index + 1}</span>
                      <ProductMark product={item} />
                      <div className="altBody">
                        <h3>
                          <Link href={`/reviews/${item.slug}`}>{item.name}</Link>
                        </h3>
                        <p>{item.bestFor}</p>
                      </div>
                      <div className="altMeta">
                        <strong>{item.score.toFixed(1)}</strong>
                        <span>{altPrice ? altPrice.entry : "On request"}</span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
            <section id="faq">
              <p className="sectionChip"><HelpCircle size={15} strokeWidth={2} aria-hidden="true" />Common questions</p>
              <h2>What buyers always ask</h2>
              <div className="faqList">
                {[
                  {
                    q: `How much does ${product.name} cost in South Africa?`,
                    a: price
                      ? `${price.entry} ${price.unit}. ${price.planNote}.${price.fxNote ? ` ${price.fxNote}.` : ""}`
                      : "The vendor publishes no rate card, so the figure arrives as a quote.",
                  },
                  {
                    q: `Does ${product.name} offer a free trial?`,
                    a: price?.trialDays
                      ? `Yes, ${price.trialDays} days.${price.freeTier ? ` There is also a free tier: ${price.freeTier.toLowerCase()}.` : ""}`
                      : price?.trialNote
                        ? `A trial is offered but the length is not published, so ask when you sign up.`
                        : price?.freeTier
                          ? `There is no timed trial, but there is a free tier: ${price.freeTier.toLowerCase()}.`
                          : "No free trial is advertised. A demonstration is the usual route.",
                  },
                  {
                    q: `Can you book a demonstration of ${product.name}?`,
                    a: price?.demo
                      ? "Yes. The vendor offers a demonstration on request, which is the normal route for a quoted product."
                      : "No demonstration is advertised. The trial is the way to evaluate it.",
                  },
                  {
                    q: `Is ${product.name} a good fit for a South African business?`,
                    a: product.localView,
                  },
                  {
                    q: `Who is ${product.name} best suited to?`,
                    a: `${product.bestFor}. ${detail.finalView}`,
                  },
                ].map((item, index) => (
                  <details key={item.q}>
                    <summary>
                      <span className="faqIndex">{String(index + 1).padStart(2, "0")}</span>
                      <span className="faqQuestion">{item.q}</span>
                      <span className="faqToggle" aria-hidden="true" />
                    </summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
              <p className="chartNote">
                Answered from this product record, so these can never drift from the
                figures above.
              </p>
              <p className="faqContact">
                Still deciding? <Link href="/contact">Ask us directly</Link>
              </p>
            </section>
            <section id="verdict">
              <p className="sectionChip"><Flag size={15} strokeWidth={2} aria-hidden="true" />Final view</p>
              <h2>Should it make the shortlist?</h2>
              <p>{detail.finalView}</p>
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
