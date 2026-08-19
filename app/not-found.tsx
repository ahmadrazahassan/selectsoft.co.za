import Link from "next/link";
import { PageShell } from "./components/site-chrome";

export default function NotFound() {
  return <PageShell><section className="pageHero siteShell"><p className="eyebrow">Page not found</p><h1>This page is not in our current index.</h1><p>The address may have changed, or the editorial record may no longer be published.</p><Link className="button" href="/">Return home</Link></section></PageShell>;
}
