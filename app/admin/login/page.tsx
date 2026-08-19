import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "../../components/site-chrome";
import { AdminLoginForm } from "./login-form";

export const metadata: Metadata = { title: "Editorial sign in", robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return <main className="adminLoginPage"><div className="adminLoginCard"><Brand /><p className="eyebrow">Editorial workspace</p><h1>Sign in to manage the publication.</h1><p>Access is limited to approved editors and authors.</p><AdminLoginForm /><Link className="plainLink" href="/">Return to the publication</Link></div></main>;
}
