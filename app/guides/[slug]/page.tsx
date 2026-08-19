import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, GuideArt } from "../../components/editorial";
import { PageShell } from "../../components/site-chrome";
import { getGuide, guides } from "../../lib/data";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.excerpt,
    openGraph: { title: guide.title, description: guide.excerpt, images: [] },
    twitter: { title: guide.title, description: guide.excerpt, images: [] },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <PageShell>
      <article>
        <header className="articleHero siteShell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.title }]} />
          <p className="eyebrow">{guide.topic} guide</p>
          <h1>{guide.title}</h1>
          <p className="articleDeck">{guide.excerpt}</p>
          <div className="byline"><span>By {guide.author}</span><span>{guide.date}</span><span>{guide.readTime}</span></div>
        </header>
        <div className="siteShell articleArt"><GuideArt art={guide.art} /></div>
        <div className="siteShell articleLayout">
          <aside className="articleTakeaways">
            <p className="eyebrow">Keep in mind</p>
            <ul><li>Begin with the work, not the product category.</li><li>Use your own records during a trial.</li><li>Price the second year, not only the first month.</li></ul>
          </aside>
          <div className="articleProse">
            <p className="leadParagraph">The most useful software decision starts before anyone books a demo. It begins with a calm description of the work, the people involved and the result that needs to improve.</p>
            <h2>Write down the working problem</h2>
            <p>Ask the people closest to the work where time is lost, where information becomes unreliable and where customers or colleagues feel the delay. Keep the description specific. A phrase such as “we need better reporting” is too broad. Name the report, the person who needs it and the decision it should support.</p>
            <p>This step gives the buying team something stable to return to when product presentations become busy. It also reveals whether the real need is new software, a cleaner process or a better connection between tools already in place.</p>
            <h2>Use a small set of real examples</h2>
            <p>Prepare three or four ordinary examples from the business. Remove personal or confidential information, then ask each shortlisted vendor to show the complete workflow. Do not accept a slide when the answer should be visible in the product.</p>
            <blockquote>A useful demo follows your working week, not the vendor script.</blockquote>
            <p>Include one awkward example. It may be a refund, a late payroll change, a custom approval or a report that combines information from two teams. Edge cases often reveal more than the smooth path.</p>
            <h2>Understand the full cost</h2>
            <p>List subscriptions, seats, usage limits, implementation, migration, training, support and the applications required to fill a gap. Note which amounts are billed in rand and which may move with exchange rates. Confirm whether quoted figures include VAT.</p>
            <p>Then model the team you expect to have in two years. A low entry price can be sensible, but only when the next stage is still affordable and operationally manageable.</p>
            <h2>Ask who owns the result</h2>
            <p>Every system needs an internal owner. This person does not have to be technical. They do need enough authority to protect data quality, make small decisions and bring the vendor or implementation partner into the right conversations.</p>
            <h2>Make the final discussion concrete</h2>
            <p>Bring the shortlist back to the original problem. Compare what changed, what remains uncertain and what the team will need to do after purchase. A mature decision can include tradeoffs. The important point is that those tradeoffs are understood.</p>
            <div className="articleSources"><h2>Editorial note</h2><p>This guide is general buying guidance. Product details, privacy obligations and tax or payroll requirements should be confirmed for your organisation.</p></div>
          </div>
        </div>
        <section className="authorStrip"><div className="siteShell"><p className="eyebrow">About the author</p><h2>{guide.author}</h2><p>{guide.author === "Nomsa Dlamini" ? "Nomsa writes about finance, operations and customer systems, with a focus on decisions that can be explained clearly inside a real business." : "Pieter covers payroll, operations and implementation, with close attention to what happens after a product is purchased."}</p><Link className="plainLink" href={`/authors/${guide.author === "Nomsa Dlamini" ? "nomsa-dlamini" : "pieter-jacobs"}`}>View author profile</Link></div></section>
      </article>
    </PageShell>
  );
}
