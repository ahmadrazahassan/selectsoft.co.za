import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CategoryRow, ComparisonCard, GuideCard, ReviewCard, TrialCard } from "./components/editorial";
import { SiteFooter, SiteHeader } from "./components/site-chrome";
import { PRICING_CHECKED_ON, comparisons, getPricing, guides, liveCategories } from "./lib/data";
import { getPublishedProducts } from "./lib/content-repository";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Clear software choices for South Africa",
  description:
    "Independent software reviews, useful comparisons and practical buying guidance for South African businesses.",
};

export default async function Home() {
  const publishedProducts = await getPublishedProducts();
  const selectedReviews = publishedProducts;

  // Anything a buyer can actually run before paying: a published trial length,
  // or a trial the vendor offers without naming a length. A free *plan* alone
  // does not qualify, so HubSpot and Zoho CRM are deliberately absent.
  const freeTrialProducts = publishedProducts
    .filter((product) => {
      const price = getPricing(product.slug);
      return Boolean(price && (price.trialDays || price.trialNote));
    })
    .sort((a, b) => (getPricing(b.slug)?.trialDays ?? 0) - (getPricing(a.slug)?.trialDays ?? 0));

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="siteShell heroCopy">
            <p className="heroBadge">
              <span className="heroBadgeFlag" aria-hidden="true">
                <Image src="/flags/za.svg" alt="" width={26} height={17} />
              </span>
              Independent research · South Africa
            </p>
            <h1>
              Choose software with a <span className="heroMark">clear head</span>.
            </h1>
            <p className="heroIntro">
              Reviews, comparisons and local context for the tools that keep your
              business moving. Priced in rand and judged on South African support,
              compliance and payments.
            </p>
            <div className="heroActions">
              <Link className="btn btnPrimary btnLarge" href="/software">
                <span>Explore software</span>
                <span className="btnIcon" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </span>
              </Link>
              <Link className="btn btnSecondary btnLarge" href="/compare">
                Compare two tools
              </Link>
            </div>
            <p className="heroAssurance">
              Free to browse. Every price is read off the vendor page and shown in rand.
            </p>
          </div>

          <div className="siteShell heroStage">
            <span className="heroSageBand" aria-hidden="true" />
            <figure className="heroFrame">
              <Image
                className="heroShot"
                src="/use-this-latest-image.png"
                alt="A South African leadership team working through a software decision together around a boardroom table."
                width={1672}
                height={941}
                sizes="(max-width: 620px) calc(100vw - 32px), (max-width: 1360px) calc(100vw - 48px), 1280px"
                priority
              />
            </figure>
          </div>

          <p className="siteShell heroCaption">
            The software decision happens in a room like this, in Johannesburg,
            Cape Town, Durban and everywhere between.
          </p>

          <div className="siteShell heroProof">
            <div>
              <strong>{liveCategories.length}</strong>
              <span>Business categories</span>
            </div>
            <div>
              <strong>{publishedProducts.length}</strong>
              <span>Products reviewed</span>
            </div>
            <div>
              <strong>ZAR</strong>
              <span>Rand pricing, VAT noted</span>
            </div>
            <div>
              <strong>POPIA</strong>
              <span>POPIA, SARS, payroll</span>
            </div>
          </div>
        </section>

        <section className="selectedReviews">
          <div className="siteShell sectionIntroCentered">
            <p className="eyebrow">Editor selection</p>
            <h2>Software worth a closer look.</h2>
            <p>
              Every product we have reviewed, with the current price read off the
              vendor&rsquo;s own pricing page.
            </p>
            <p className="priceStamp">Prices checked {PRICING_CHECKED_ON}</p>
            <Link className="plainLink" href="/reviews">View all reviews</Link>
          </div>
          <div className="siteShell reviewsLayout">
            {selectedReviews.map((product) => (
              <ReviewCard product={product} compact key={product.slug} />
            ))}
          </div>
        </section>

        <section className="comparisonSection">
          <div className="siteShell sectionIntroCentered">
            <p className="eyebrow">Head to head</p>
            <h2>
              Popular comparisons, <span className="heroMark">side by side</span>
            </h2>
            <p>
              The match ups South African buyers research most, judged on the same
              criteria and priced in rand.
            </p>
          </div>
          <div className="siteShell duelGrid">
            {/* three across, so the row stays a row as more verdicts are written */}
            {comparisons.slice(0, 3).map((comparison) => (
              <ComparisonCard comparison={comparison} key={comparison.slug} />
            ))}
          </div>
          <div className="siteShell duelFooter">
            <Link className="plainLink" href="/compare">
              Compare any two products
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="trialSection">
          <div className="siteShell sectionIntroCentered">
            <p className="eyebrow">Try before you buy</p>
            <h2>
              Software you can <span className="heroMark">trial free</span>.
            </h2>
            <p>
              Every product in our index that lets you run it properly before any
              card details are taken.
            </p>
            <p className="priceStamp">Trial lengths checked {PRICING_CHECKED_ON}</p>
          </div>
          <div className="siteShell trialGrid">
            {freeTrialProducts.map((product) => (
              <TrialCard product={product} key={product.slug} />
            ))}
          </div>
        </section>

        <section className="categorySection">
          <div className="siteShell sectionIntroCentered">
            <p className="eyebrow">Find the right category</p>
            <h2>Start with the work you want to improve.</h2>
            <p>
              Choose the business task first, then explore software selected for
              South African teams.
            </p>
          </div>
          <div className="siteShell categoryIndex">
            {liveCategories.map((category, index) => (
              <CategoryRow category={category} index={index} key={category.slug} />
            ))}
            <Link className="categoryAll" href="/software">
              <span className="categoryAllCount">{publishedProducts.length}</span>
              <span className="categoryAllLabel">products across every category</span>
              <span className="categoryAllCta">
                Browse the full index
                <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </section>

        <section className="localContext">
          <div className="siteShell localContextGrid">
            <div className="contextCopy">
              <p className="eyebrow">The local buying decision</p>
              <h2>What changes when you buy software in South Africa?</h2>
              <p className="contextIntro">
                Global features matter. So do the ordinary local details that decide
                whether a product works after it has been purchased.
              </p>
              <Link className="plainLink" href="/methodology">Read our evaluation method</Link>
            </div>
            <div className="contextCriteria">
              <div><span>01</span><h3>Pricing in rand</h3><p>Billing currency, VAT clarity and exposure to exchange rate changes.</p></div>
              <div><span>02</span><h3>Local compliance</h3><p>Relevant payroll, tax and privacy questions for the work at hand.</p></div>
              <div><span>03</span><h3>Support that overlaps</h3><p>People, partners and useful support hours when a team needs help.</p></div>
              <div><span>04</span><h3>Payments and connections</h3><p>Banks, payment services and the rest of the local business stack.</p></div>
            </div>
          </div>
        </section>

        <section className="latestGuides">
          <div className="siteShell sectionHeaderRow">
            <div>
              <p className="eyebrow">Guides and analysis</p>
              <h2>Practical guidance, without the sales pitch.</h2>
            </div>
            <div>
              <p>Careful explanations for the decisions that happen before the demo.</p>
              <Link className="plainLink" href="/guides">View all guides</Link>
            </div>
          </div>
          <div className="siteShell guideLayout">
            <GuideCard guide={guides[0]} lead />
            <div className="guideRow">
              {/* the homepage shows a curated few; /guides carries the full index */}
              {guides.slice(1, 5).map((guide) => <GuideCard guide={guide} key={guide.slug} />)}
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
