import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/forms";
import { Breadcrumbs } from "../components/editorial";
import { PageShell } from "../components/site-chrome";
import { contactRoutes, publisher } from "../config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact the editorial team",
  description:
    "Send a correction, a product detail, a privacy request or a commercial enquiry. Every route reaches a named person.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <section className="contactPage siteShell">
        <div className="contactIntro">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <p className="eyebrow">Contact the editorial desk</p>
          <h1>Tell us what needs attention.</h1>
          <p>
            Send a correction, a product detail or a question about our work.
            Useful evidence is always welcome, and a confirmed error is fixed in
            public with the date on the page.
          </p>

          {/* Role addresses rather than one inbox, so a message reaches the
              right person and so the commercial route is visibly separate from
              the editorial one. */}
          <ul className="contactRoutes">
            {contactRoutes.map((route) => (
              <li key={route.address}>
                <p className="contactRoutePurpose">{route.purpose}</p>
                <a className="contactRouteAddress" href={`mailto:${route.address}`}>
                  {route.address}
                </a>
                <p className="contactRouteDetail">{route.detail}</p>
              </li>
            ))}
          </ul>

          {/* The publisher, stated plainly. A reader, a vendor or a commercial
              partner should never have to guess who stands behind the work. */}
          <dl className="publisherCard">
            <div>
              <dt>Published by</dt>
              <dd>{publisher.legalName}</dd>
            </div>
            <div>
              <dt>Trading as</dt>
              <dd>{publisher.tradingAs}</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{publisher.location}</dd>
            </div>
            <div>
              <dt>Editor</dt>
              <dd>
                <Link href="/authors/khadija-bibi">{publisher.legalName}</Link>
              </dd>
            </div>
            <div>
              <dt>Information Officer</dt>
              <dd>{publisher.informationOfficer}</dd>
            </div>
          </dl>

          <p className="contactAside">
            Email reaches us directly and is always the fastest route. Privacy
            requests under POPIA are covered in our{" "}
            <Link href="/privacy">privacy policy</Link>, and how commercial
            links work is set out in our{" "}
            <Link href="/affiliate-disclosure">commercial disclosure</Link>.
          </p>
        </div>
        <ContactForm />
      </section>
    </PageShell>
  );
}
