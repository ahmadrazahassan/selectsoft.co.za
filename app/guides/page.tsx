import type { Metadata } from "next";
import { Breadcrumbs, GuideCard } from "../components/editorial";
import { PageShell } from "../components/site-chrome";
import { guides } from "../lib/data";

export const metadata: Metadata = {
  title: "Software buying guides",
  description: "Practical guidance for South African teams choosing business software.",
};

export default function GuidesPage() {
  return (
    <PageShell>
      <section className="pageHero siteShell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />
        <p className="eyebrow">Guides and analysis</p>
        <h1>Good questions before a big decision.</h1>
        <p>Clear explanations for the people comparing, approving and living with business software.</p>
      </section>
      <section className="siteShell guidesIndex">
        <GuideCard guide={guides[0]} lead />
        <div className="guideIndexGrid">{guides.slice(1).map((guide) => <GuideCard guide={guide} lead key={guide.slug} />)}</div>
      </section>
    </PageShell>
  );
}
