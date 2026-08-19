import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "./admin-shell";

export const metadata: Metadata = { title: "Editorial dashboard", robots: { index: false, follow: false } };

export default function AdminPage() {
  return <AdminShell title="Good morning."><section className="adminStats"><div><span>Published reviews</span><strong>12</strong><p>Four checked this month</p></div><div><span>Drafts in review</span><strong>6</strong><p>Two need an editor</p></div><div><span>Pricing checks due</span><strong>3</strong><p>Complete before Friday</p></div><div><span>New messages</span><strong>8</strong><p>Three corrections</p></div></section><section className="adminPanel"><div><h2>Editorial priorities</h2><Link className="plainLink" href="/admin/reviews">Open review queue</Link></div><ol><li><span>01</span><div><strong>Verify accounting plan changes</strong><p>Sage Accounting and Xero records are due for a source check.</p></div><em>Today</em></li><li><span>02</span><div><strong>Edit payroll comparison</strong><p>The first complete draft is ready for editorial review.</p></div><em>This week</em></li><li><span>03</span><div><strong>Reply to correction notes</strong><p>Three reader messages include supporting product links.</p></div><em>This week</em></li></ol></section></AdminShell>;
}
