import Link from "next/link";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
import { liveCategories } from "../lib/data";
import { NewsletterForm } from "./forms";
import { contactEmail, publisher, siteConfig } from "../config/site";
import { ScrollHeaderShell } from "./scroll-header-shell";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label={`${siteConfig.name} home`}>
      <Image
        className="butterflyBrand"
        src="/butterfly-mark.png"
        alt=""
        width={30}
        height={30}
        aria-hidden="true"
      />
      <span className="brandFull">{siteConfig.name}</span>
      <span className="brandEditorial" aria-hidden="true">
        select soft
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <ScrollHeaderShell>
      <div className="siteShell headerRail">
        <div className="headerBar">
          <Brand />
          <nav className="desktopNav" aria-label="Main navigation">
            <Link href="/reviews">Reviews</Link>
            <Link href="/compare">Compare</Link>
            <Link href="/software">Software</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/about">About</Link>
          </nav>
          <div className="headerActions">
            <Link className="headerSearch" href="/search" aria-label="Search the site">
              <Search size={19} strokeWidth={1.9} aria-hidden="true" />
            </Link>
            <Link className="btn btnPrimary btnCompact headerCta" href="/software">
              Browse software
            </Link>
            <details className="mobileMenu">
              <summary aria-label="Open navigation">
                <Menu size={21} strokeWidth={1.8} aria-hidden="true" />
              </summary>
              <nav aria-label="Mobile navigation">
                <Link href="/reviews">Software reviews</Link>
                <Link href="/compare">Comparisons</Link>
                <Link href="/software">All categories</Link>
                <Link href="/guides">Guides</Link>
                <Link href="/methodology">Methodology</Link>
                <Link href="/search">Search</Link>
                <div className="mobileCategoryLinks">
                  {liveCategories.map((category) => (
                    <Link href={`/software/${category.slug}`} key={category.slug}>
                      {category.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </details>
          </div>
        </div>
      </div>
    </ScrollHeaderShell>
  );
}

/**
 * The monthly note. One line of ask, one field, a hairline above it and
 * nothing else: no plate, no artwork, no card. It should be easy to ignore and
 * easy to use, which is the whole brief for a newsletter on a reading site.
 */
export function NewsletterStrip() {
  return (
    <section className="newsletterStrip" aria-labelledby="newsletterStripTitle">
      <div className="siteShell newsletterStripInner">
        <div className="newsletterStripCopy">
          <h2 id="newsletterStripTitle">One useful email a month.</h2>
          <p>
            New reviews, verified rand pricing and buying guidance for South
            African teams. Leave whenever you like.
          </p>
        </div>
        <NewsletterForm compact />
      </div>
    </section>
  );
}

/** A navigation link set as an outlined pill, following the reference layout. */
function PillLinks({ area, title, links }: { area: string; title: string; links: string[][] }) {
  return (
    <div className={`footerPillGroup footerArea${area}`}>
      <p className="footerLabel">{title}</p>
      <ul>
        {links.map(([label, href]) => (
          <li key={href}>
            <Link className="footerPill" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The closing plate. A statement, the ways to reach us, the index, and the
 * wordmark set large enough to be the last thing a reader sees.
 */
export function SiteFooter() {
  return (
    <>
      <NewsletterStrip />
      <footer className="siteFooter">
        <div className="siteShell footerGrid">
          <div className="footerStatementBlock">
            <h2 className="footerStatement">
              Independent research
              <br />
              for South African
              <br />
              business.
            </h2>
          </div>

          <PillLinks
            area="Nav"
            title="Navigation"
            links={[
              ["Reviews", "/reviews"],
              ["Compare", "/compare"],
              ["Software", "/software"],
              ["Guides", "/guides"],
              ["About", "/about"],
            ]}
          />

          <div className="footerPlainGroup">
            <p className="footerLabel">Publication</p>
            <ul>
              <li>
                <Link href="/methodology">Methodology</Link>
              </li>
              <li>
                <Link href="/editorial-policy">Editorial policy</Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure">Affiliate disclosure</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footerContactBlock">
            <p className="footerLabel">Contact</p>
            <a className="footerEmail" href={`mailto:${contactEmail.editorial}`}>
              {contactEmail.editorial}
            </a>
            {/* the two a reader or a vendor is most likely to need */}
            <ul className="footerContactMore">
              <li>
                <span>Corrections</span>
                <a href={`mailto:${contactEmail.corrections}`}>{contactEmail.corrections}</a>
              </li>
              <li>
                <span>Commercial</span>
                <a href={`mailto:${contactEmail.commercial}`}>{contactEmail.commercial}</a>
              </li>
            </ul>
            <p className="footerPlace">{publisher.location}</p>
          </div>

          <PillLinks
            area="Legal"
            title="Legal"
            links={[
              ["Privacy Policy", "/privacy"],
              ["Terms", "/terms"],
            ]}
          />

          <Link className="footerWordmark" href="/" aria-label={`${siteConfig.name} home`}>
            <Image
              className="footerWordmarkMark"
              src="/butterfly-mark.png"
              alt=""
              width={220}
              height={220}
              aria-hidden="true"
            />
            <span aria-hidden="true">select soft</span>
            <span className="visuallyHidden">{siteConfig.name}</span>
          </Link>
        </div>

        <div className="siteShell footerBottom">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            <span className="footerImprint">
              Published by {publisher.legalName}, {publisher.location}
            </span>
          </p>
          <p className="footerBottomNote">Prices read off vendor pages, in rand</p>
        </div>
      </footer>
    </>
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
