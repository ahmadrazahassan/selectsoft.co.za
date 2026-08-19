"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export function AdminLoginForm() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  async function submit(formData: FormData) {
    if (!url || !key) {
      setMessage("Add the Supabase environment values before signing in.");
      return;
    }
    setBusy(true);
    const client = createBrowserClient(url, key);
    const email = String(formData.get("email") ?? "").trim();
    const { error } = await client.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setBusy(false);
    setMessage(error ? "We could not send the sign in link." : "Check your email for a secure sign in link.");
  }

  return (
    <form className="adminLoginForm" action={submit}>
      <label><span>Editorial email</span><input name="email" type="email" autoComplete="email" required /></label>
      <button className="button" type="submit" disabled={busy}>{busy ? "Sending" : "Send sign in link"}</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
