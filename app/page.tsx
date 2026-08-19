import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { CategoryRow, GuideCard, ReviewCard } from "./components/editorial";
import { CompareBuilder } from "./components/compare-builder";
import { NewsletterForm } from "./components/forms";
import { SiteFooter, SiteHeader } from "./components/site-chrome";
import { categories, comparisons, guides } from "./lib/data";
import { getPublishedProducts } from "./lib/content-repository";

export const metadata: Metadata = {
  title: "Clear software choices for South Africa",
  description:
    "Independent software reviews, useful comparisons and practical buying guidance for South African businesses.",
};

export default async function Home() {
  const publishedProducts = await getPublishedProducts();
  const selectedProducts = [
    publishedProducts.find((product) => product.slug === "simplepay")!,
    publishedProducts.find((product) => product.slug === "sage-accounting")!,
    publishedProducts.find((product) => product.slug === "xero")!,
    publishedProducts.find((product) => product.slug === "yoco")!,
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero siteShell">
          <div className="heroCopy">
            <p className="eyebrow">Independent research for South African businesses</p>
            <h1>Choose software with a clear head.</h1>
            <p className="heroIntro">
              Thoughtful reviews, useful comparisons and local context for the tools
              that keep your business moving.
            </p>
            <div className="heroActions">
              <Link className="button" href="/software">Explore software</Link>
              <Link className="textButton" href="/compare">Compare two tools</Link>
            </div>
            <form className="heroSearch" action="/search">
              <label htmlFor="homeSearch">What are you looking for?</label>
              <div className="searchRow">
                <input
                  id="homeSearch"
                  name="q"
                  type="search"
                  placeholder="Search accounting, payroll, CRM and more"
                />
                <button type="submit">Search</button>
              </div>
            </form>
          </div>

          <div className="heroVisual" aria-label="A clear way to assess business software">
            <Image
              className="heroButterfly"
              src="/butterfly-mark.png"
              alt=""
              width={360}
              height={360}
              priority
              aria-hidden="true"
            />
            <div className="visualTopline">
              <span>Selection notes</span>
              <span>South Africa</span>
            </div>
            <div className="visualStatement">
              <p>Look past the feature list.</p>
              <strong>Buy for the way your team really works.</strong>
            </div>
            <div className="criteriaList">
              <div><span>01</span><p>Pricing in rand</p></div>
              <div><span>02</span><p>Useful local support</p></div>
              <div><span>03</span><p>Compliance context</p></div>
            </div>
            <div className="visualPaper" aria-hidden="true">
              <span /><span /><span />
            </div>
          </div>
        </section>

        <section className="categorySection">
          <div className="siteShell sectionSplitIntro">
            <div>
              <p className="eyebrow">Find the right category</p>
              <h2>Start with the work you want to improve.</h2>
            </div>
            <div className="introAside">
              <p>
                A good shortlist begins with the problem, the people who will use the
                software and the result the business needs to see.
              </p>
              <Link className="plainLink" href="/software">Explore all software</Link>
            </div>
          </div>
          <div className="siteShell categoryIndex">
            {categories.map((category, index) => (
              <CategoryRow category={category} index={index} key={category.slug} />
            ))}
          </div>
        </section>

        <section className="selectedReviews">
          <div className="siteShell sectionHeaderRow">
            <div>
              <p className="eyebrow">Editor selection</p>
              <h2>Strong choices, with the tradeoffs made clear.</h2>
            </div>
            <div>
              <p>Products worth understanding, selected for a distinct business need.</p>
              <Link className="plainLink" href="/reviews">View all reviews</Link>
            </div>
          </div>
          <div className="siteShell reviewsLayout">
            <ReviewCard product={selectedProducts[0]} lead />
            <div className="reviewStack">
              {selectedProducts.slice(1).map((product) => (
                <ReviewCard product={product} key={product.slug} />
              ))}
            </div>
          </div>
        </section>

        <section className="comparisonSection">
          <div className="siteShell comparisonInner">
            <div className="comparisonCopy">
              <p className="eyebrow">Compare software</p>
              <h2>Put two tools side by side.</h2>
              <p>
                Choose a pair and see the practical differences in cost, daily use,
                support and fit for a South African team.
              </p>
            </div>
            <CompareBuilder products={publishedProducts} comparisons={comparisons} compact />
            <div className="popularComparisons">
              <span>Useful comparisons</span>
              {comparisons.map((comparison) => (
                <Link href={`/compare/${comparison.slug}`} key={comparison.slug}>
                  {comparison.title}
                  <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="localContext">
          <div className="siteShell localContextGrid">
            <div className="contextDrawing" aria-hidden="true">
              <div className="building buildingOne"><span /><span /><span /></div>
              <div className="building buildingTwo"><span /><span /><span /><span /></div>
              <div className="streetLine" />
              <div className="bluePrintBlock" />
            </div>
            <div className="contextCopy">
              <p className="eyebrow">The local buying decision</p>
              <h2>What changes when you buy software in South Africa?</h2>
              <p className="contextIntro">
                Global features matter. So do the ordinary local details that decide
                whether a product works after it has been purchased.
              </p>
              <div className="contextCriteria">
                <div><span>01</span><h3>Pricing in rand</h3><p>Billing currency, VAT clarity and exposure to exchange rate changes.</p></div>
                <div><span>02</span><h3>Local compliance</h3><p>Relevant payroll, tax and privacy questions for the work at hand.</p></div>
                <div><span>03</span><h3>Support that overlaps</h3><p>People, partners and useful support hours when a team needs help.</p></div>
                <div><span>04</span><h3>Payments and connections</h3><p>Banks, payment services and the rest of the local business stack.</p></div>
              </div>
              <Link className="plainLink" href="/methodology">Read our evaluation method</Link>
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
            <div className="guideList">
              {guides.slice(1).map((guide) => <GuideCard guide={guide} key={guide.slug} />)}
            </div>
          </div>
        </section>

        <section className="newsletterSection">
          <div className="siteShell newsletterPanel">
            <div>
              <p className="eyebrow">A useful monthly note</p>
              <h2>Make a better software decision.</h2>
              <p>
                New reviews, comparisons and buying guidance for South African teams.
                Written by editors and checked before it reaches you.
              </p>
            </div>
            <NewsletterForm />
            <div className="trustLinks">
              <Link href="/methodology"><Check size={17} aria-hidden="true" />Our methodology</Link>
              <Link href="/editorial-policy"><Check size={17} aria-hidden="true" />Editorial policy</Link>
              <Link href="/affiliate-disclosure"><Check size={17} aria-hidden="true" />Commercial disclosure</Link>
              <Link href="/contact"><ExternalLink size={17} aria-hidden="true" />Corrections and contact</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
