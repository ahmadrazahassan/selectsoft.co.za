import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "../admin-shell";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const title = section.charAt(0).toUpperCase() + section.slice(1);
  return <AdminShell title={title}><section className="adminPanel adminContentList"><div><div><p className="eyebrow">Content library</p><h2>Manage {title.toLowerCase()}</h2></div><Link className="button buttonSmall" href={`/admin/${section}/new`}>Create new</Link></div><div className="adminTable"><div><strong>Title</strong><strong>Status</strong><strong>Updated</strong></div>{["Current editorial record", "Research draft", "Scheduled update", "Archive record"].map((item, index) => <Link href={`/admin/${section}/${index + 1}`} key={item}><span>{item}</span><em>{index === 1 ? "In review" : index === 3 ? "Archived" : "Published"}</em><span>{index + 12} August 2026</span></Link>)}</div></section></AdminShell>;
}
