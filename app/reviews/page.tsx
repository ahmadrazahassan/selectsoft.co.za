import type { Metadata } from "next";
import { Breadcrumbs, ReviewCard } from "../components/editorial";
import { PageShell } from "../components/site-chrome";
import { getPublishedProducts } from "../lib/content-repository";

export const metadata: Metadata = {
  title: "Software reviews",
  description: "Independent reviews of business software used by South African teams.",
};

export default async function ReviewsPage() {
  const products = await getPublishedProducts();
  return (
    <PageShell>
      <section className="pageHero siteShell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Software reviews" }]} />
        <p className="eyebrow">Independent software reviews</p>
        <h1>Clear verdicts, useful context.</h1>
        <p>We explain what a product does well, where the tradeoffs sit and who should keep looking.</p>
      </section>
      <section className="siteShell reviewIndexSection">
        <div className="reviewGrid">
          {products.map((product) => <ReviewCard product={product} key={product.slug} />)}
        </div>
      </section>
    </PageShell>
  );
}
