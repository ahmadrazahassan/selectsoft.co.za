import type { Metadata } from "next";
import { DirectoryClient } from "../components/directory-client";
import { Breadcrumbs } from "../components/editorial";
import { PageShell } from "../components/site-chrome";
import { getPublishedProducts } from "../lib/content-repository";

export const metadata: Metadata = {
  title: "Business software directory",
  description: "Browse reviewed accounting, payroll, CRM, ERP and commerce software for South African businesses.",
};

export default async function SoftwareDirectoryPage() {
  const products = await getPublishedProducts();
  return (
    <PageShell>
      <section className="pageHero siteShell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Software" }]} />
        <p className="eyebrow">Software directory</p>
        <h1>Find software that fits the work.</h1>
        <p>Browse our current review set, then narrow it by product, vendor or category.</p>
      </section>
      <section className="siteShell directorySection">
        <DirectoryClient products={products} />
      </section>
    </PageShell>
  );
}
