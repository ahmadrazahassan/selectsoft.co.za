import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../components/editorial";
import { PageShell } from "../../components/site-chrome";
import { authors, guides } from "../../lib/data";

export function generateStaticParams() {
  return Object.keys(authors).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = authors[slug as keyof typeof authors];
  return author ? {
    title: `${author.name}, ${author.role}`,
    description: author.bio,
    openGraph: { title: author.name, description: author.bio, images: [] },
    twitter: { title: author.name, description: author.bio, images: [] },
  } : {};
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = authors[slug as keyof typeof authors];
  if (!author) notFound();
  const work = guides.filter((guide) => guide.author === author.name);
  return (
    <PageShell>
      <section className="authorHero siteShell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Authors" }, { label: author.name }]} />
        <div className="authorMonogram" aria-hidden="true">{author.name.split(" ").map((part) => part[0]).join("")}</div>
        <div><p className="eyebrow">{author.role}</p><h1>{author.name}</h1><p>{author.bio}</p><ul>{author.expertise.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>
      <section className="siteShell authorWork"><p className="eyebrow">Recent work</p><h2>Guides by {author.name}</h2><div className="textLinkList">{work.map((guide) => <Link href={`/guides/${guide.slug}`} key={guide.slug}>{guide.title}</Link>)}</div></section>
    </PageShell>
  );
}
