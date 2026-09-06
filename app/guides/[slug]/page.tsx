import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../components/editorial";
import { PageShell } from "../../components/site-chrome";
import { EDITOR, getGuide, getProduct, guides } from "../../lib/data";
import { guideContent } from "../../lib/guide-content";
import { siteConfig } from "../../config/site";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const url = `${siteConfig.url}/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.excerpt,
      url,
      publishedTime: guide.date,
      authors: [EDITOR.name],
    },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.excerpt },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const body = guideContent[slug];
  if (!body) notFound();

  const url = `${siteConfig.url}/guides/${guide.slug}`;
  const related = body.relatedProducts.map(getProduct).filter((p) => p !== undefined);
  const furtherReading = body.relatedGuides.map(getGuide).filter((g) => g !== undefined);

  /* Article and FAQ markup, so a search engine can read the piece as an
     article by a named author and can surface the questions directly. */
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.excerpt,
        datePublished: guide.date,
        author: { "@type": "Person", name: EDITOR.name, url: `${siteConfig.url}/authors/khadija-bibi` },
        publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        mainEntityOfPage: url,
        articleSection: guide.topic,
      },
      {
        "@type": "FAQPage",
        mainEntity: body.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${siteConfig.url}/guides` },
          { "@type": "ListItem", position: 3, name: guide.title, item: url },
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
        <header className="articleHero siteShell">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.topic }]}
          />
          <p className="eyebrow">{guide.topic} guide</p>
          <h1>{guide.title}</h1>
          <p className="articleDeck">{guide.excerpt}</p>
          <div className="byline">
            <span>
              By <Link href="/authors/khadija-bibi">{guide.author}</Link>
            </span>
            <span>{guide.date}</span>
            <span>{guide.readTime}</span>
          </div>
        </header>

        <div className="siteShell articleLayout">
          <aside className="articleTakeaways">
            <p className="eyebrow">Keep in mind</p>
            <ul>
              {body.takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>

          <div className="articleProse">
            <p className="leadParagraph">{body.lead}</p>
            {body.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            <section className="articleFaq">
              <h2>Common questions</h2>
              <div className="faqList">
                {body.faqs.map((faq, index) => (
                  <details key={faq.question}>
                    <summary>
                      <span className="faqIndex">{String(index + 1).padStart(2, "0")}</span>
                      <span className="faqQuestion">{faq.question}</span>
                      <span className="faqToggle" aria-hidden="true" />
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <div className="articleSources">
              <h2>Editorial note</h2>
              <p>
                This guide is general buying guidance and not accounting, legal or tax
                advice. Amounts and deadlines set by SARS change, so confirm the current
                figures for your own business before you rely on them.
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="siteShell relatedSection">
            <p className="eyebrow">Products mentioned</p>
            <h2>Reviewed in full</h2>
            <div className="textLinkList">
              {related.map((product) => (
                <Link href={`/reviews/${product.slug}`} key={product.slug}>
                  {product.name} review
                </Link>
              ))}
            </div>
          </section>
        )}

        {furtherReading.length > 0 && (
          <section className="siteShell relatedSection">
            <p className="eyebrow">Related reading</p>
            <h2>Next in this series</h2>
            <div className="textLinkList">
              {furtherReading.map((item) => (
                <Link href={`/guides/${item.slug}`} key={item.slug}>
                  {item.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="authorStrip">
          <div className="siteShell">
            <p className="eyebrow">About the author</p>
            <h2>{EDITOR.name}</h2>
            <p>{EDITOR.bio}</p>
            <Link className="plainLink" href="/authors/khadija-bibi">
              View author profile
            </Link>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
