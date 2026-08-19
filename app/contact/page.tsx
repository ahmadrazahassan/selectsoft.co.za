import type { Metadata } from "next";
import { ContactForm } from "../components/forms";
import { Breadcrumbs } from "../components/editorial";
import { PageShell } from "../components/site-chrome";
import { siteConfig } from "../config/site";

export const metadata: Metadata = { title: "Contact the editorial team" };

export default function ContactPage() {
  return <PageShell><section className="contactPage siteShell"><div className="contactIntro"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} /><p className="eyebrow">Contact the editorial desk</p><h1>Tell us what needs attention.</h1><p>Send a correction, a product detail or a question about our work. Useful evidence is always welcome.</p><div><span>General enquiries</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div></div><ContactForm /></section></PageShell>;
}
