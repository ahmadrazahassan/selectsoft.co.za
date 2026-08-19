import Link from "next/link";
import { redirect } from "next/navigation";
import { Brand } from "../components/site-chrome";
import { getEditorSession } from "../lib/supabase-auth";

const sections = ["Software", "Reviews", "Comparisons", "Guides", "Categories", "Authors", "Media", "Newsletter", "Messages", "Settings"];

export async function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  const session = await getEditorSession();
  if (session.configured && !session.user) redirect("/admin/login");
  return (
    <main className="adminShell">
      <aside className="adminSidebar"><Brand /><nav>{sections.map((section) => <Link href={`/admin/${section.toLowerCase()}`} key={section}>{section}</Link>)}</nav><Link href="/">View publication</Link></aside>
      <div className="adminMain">
        <header><div><p className="eyebrow">Editorial workspace</p><h1>{title}</h1></div><div><span>{session.profile?.full_name ?? "Preview editor"}</span><small>{session.profile?.role ?? "Setup mode"}</small></div></header>
        {!session.configured && <div className="adminSetupNotice"><strong>Supabase setup is still required</strong><p>The content studio is shown in preview mode. Add the environment values and run the migration to activate secure editorial access.</p></div>}
        {children}
      </div>
    </main>
  );
}
