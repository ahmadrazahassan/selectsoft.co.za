import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, ExternalLink } from "lucide-react";
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
  const selectedReviews = [
    { slug: "simplepay", logoSrc: "/logos/simplepay.png" },
    { slug: "sage-accounting", logoSrc: "/logos/sage-business-cloud-accounting.png" },
    { slug: "xero", logoSrc: "/logos/xero.png" },
    { slug: "quickbooks-online", logoSrc: "/logos/quickbooks-online.png" },
    { slug: "payspace", logoSrc: "/logos/payspace.png" },
    { slug: "hubspot-crm", logoSrc: "/logos/hubspot-crm.png" },
    { slug: "zoho-crm", logoSrc: "/logos/zoho-crm.png" },
    { slug: "business-central", logoSrc: "/logos/dynamics-365-business-central.png" },
  ].map(({ slug, logoSrc }) => ({
    product: publishedProducts.find((product) => product.slug === slug)!,
    logoSrc,
  }));

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <Image
            className="heroBackdrop"
            src="/hero-abstract-wave.png"
            alt=""
            fill
            sizes="(max-width: 620px) calc(100vw - 32px), 1280px"
            priority
            aria-hidden="true"
          />
          <div className="heroCopy">
            <p className="eyebrow">Independent research for South African businesses</p>
            <h1>Choose software with a clear head.</h1>
            <p className="heroIntro">
              Thoughtful reviews, useful comparisons and local context for the tools
              that keep your business moving.
            </p>
            <div className="heroActions">
              <Link className="heroPrimaryAction" href="/software">
                <span>Explore software</span>
                <span className="heroActionIcon" aria-hidden="true">
                  <ArrowUpRight size={22} strokeWidth={1.8} />
                </span>
              </Link>
              <Link className="heroSecondaryAction" href="/compare">
                Compare two tools
              </Link>
            </div>
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
            <Link className="plainLink" href="/software">Explore all software</Link>
          </div>
          <div className="siteShell categoryIndex">
            {categories.map((category, index) => (
              <CategoryRow category={category} index={index} key={category.slug} />
            ))}
          </div>
        </section>

        <section className="selectedReviews">
          <div className="siteShell sectionIntroCentered">
            <p className="eyebrow">Editor selection</p>
            <h2>Software worth a closer look.</h2>
            <p>
              Eight useful products, chosen for a clear business need and reviewed
              with local context.
            </p>
            <Link className="plainLink" href="/reviews">View all reviews</Link>
          </div>
          <div className="siteShell reviewsLayout">
            {selectedReviews.map(({ product, logoSrc }) => (
              <ReviewCard product={product} logoSrc={logoSrc} compact key={product.slug} />
            ))}
          </div>
        </section>

        <section className="comparisonSection">
          <div className="siteShell comparisonInner">
            <div className="comparisonCopy">
              <p className="eyebrow">Compare software</p>
              <h2>See the difference before you decide.</h2>
              <p>
                Select two products and compare cost, daily use, support and local
                fit in one clear view.
              </p>
            </div>
            <CompareBuilder products={publishedProducts} comparisons={comparisons} compact />
            <div className="popularComparisons">
              <span>Popular comparisons</span>
              <div>
                {comparisons.map((comparison) => (
                  <Link href={`/compare/${comparison.slug}`} key={comparison.slug}>
                    {comparison.title}
                    <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" />
                  </Link>
                ))}
              </div>
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
