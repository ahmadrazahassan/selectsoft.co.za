import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { categories } from "../lib/data";
import { siteConfig } from "../config/site";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label={`${siteConfig.name} home`}>
      <span className="brandMark" aria-hidden="true">
        <span />
        <span />
      </span>
      <span>{siteConfig.name}</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <>
      <div className="disclosureBar">
        <div className="siteShell disclosureInner">
          <p>Independent reviews. Commercial links never affect our verdicts.</p>
          <Link href="/affiliate-disclosure">Read our disclosure</Link>
        </div>
      </div>
      <header className="siteHeader">
        <div className="siteShell headerInner">
          <Brand />
          <nav className="desktopNav" aria-label="Main navigation">
            <Link href="/reviews">Software reviews</Link>
            <Link href="/compare">Comparisons</Link>
            <Link href="/software">Categories</Link>
            <Link href="/guides">Guides</Link>
          </nav>
          <div className="headerActions">
            <Link className="iconTextLink" href="/search" aria-label="Search the site">
              <Search size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>Search</span>
            </Link>
            <Link className="button buttonSmall" href="/compare">
              Compare software
            </Link>
            <details className="mobileMenu">
              <summary aria-label="Open navigation">
                <Menu size={22} strokeWidth={1.7} aria-hidden="true" />
              </summary>
              <nav aria-label="Mobile navigation">
                <Link href="/reviews">Software reviews</Link>
                <Link href="/compare">Comparisons</Link>
                <Link href="/software">All categories</Link>
                <Link href="/guides">Guides</Link>
                <Link href="/search">Search</Link>
                <div className="mobileCategoryLinks">
                  {categories.map((category) => (
                    <Link href={`/software/${category.slug}`} key={category.slug}>
                      {category.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="siteShell footerTop">
        <div className="footerStatement">
          <Brand />
          <p>Independent software research for South African businesses.</p>
        </div>
        <FooterColumn
          title="Explore"
          links={[
            ["Software reviews", "/reviews"],
            ["Comparisons", "/compare"],
            ["Guides", "/guides"],
            ["Search", "/search"],
          ]}
        />
        <FooterColumn
          title="Categories"
          links={categories.slice(0, 5).map((category) => [
            category.shortName,
            `/software/${category.slug}`,
          ])}
        />
        <FooterColumn
          title="About"
          links={[
            ["Our publication", "/about"],
            ["Methodology", "/methodology"],
            ["Editorial policy", "/editorial-policy"],
            ["Contact", "/contact"],
          ]}
        />
        <FooterColumn
          title="Legal"
          links={[
            ["Affiliate disclosure", "/affiliate-disclosure"],
            ["Privacy", "/privacy"],
            ["Terms", "/terms"],
          ]}
        />
      </div>
      <div className="siteShell footerBottom">
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        <p>Made for better software decisions in South Africa.</p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[][];
}) {
  return (
    <div className="footerColumn">
      <h2>{title}</h2>
      {links.map(([label, href]) => (
        <Link href={href} key={href}>
          {label}
        </Link>
      ))}
    </div>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
