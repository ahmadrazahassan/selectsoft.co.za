import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "../../admin-shell";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminEditorPage({ params }: { params: Promise<{ section: string; id: string }> }) {
  const { section, id } = await params;
  const isNew = id === "new";
  const label = section.charAt(0).toUpperCase() + section.slice(1);
  return <AdminShell title={isNew ? `New ${label.toLowerCase()}` : `Edit ${label.toLowerCase()}`}><form className="adminEditor"><div className="adminEditorTop"><Link className="plainLink" href={`/admin/${section}`}>Return to {label.toLowerCase()}</Link><div><button type="button" className="secondaryButton">Save draft</button><button type="submit" className="button buttonSmall">Send for review</button></div></div><div className="adminEditorGrid"><section><label><span>Title</span><input defaultValue={isNew ? "" : "Current editorial record"} /></label><label><span>Summary</span><textarea rows={4} /></label><label><span>Editorial body</span><textarea rows={18} placeholder="Write the complete editorial copy here" /></label></section><aside><label><span>Status</span><select defaultValue="draft"><option value="draft">Draft</option><option value="review">In review</option><option value="published">Published</option><option value="archived">Archived</option></select></label><label><span>Slug</span><input /></label><label><span>Search title</span><input /></label><label><span>Search description</span><textarea rows={5} /></label></aside></div></form></AdminShell>;
}
