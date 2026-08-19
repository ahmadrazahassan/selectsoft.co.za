import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createAuthServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server components cannot always write cookies. The auth callback handles the initial session.
        }
      },
    },
  });
}

export async function getEditorSession() {
  const client = await createAuthServerClient();
  if (!client) return { configured: false as const, user: null, profile: null };
  const { data } = await client.auth.getUser();
  if (!data.user) return { configured: true as const, user: null, profile: null };
  const { data: profile } = await client.from("profiles").select("full_name, role, is_active").eq("id", data.user.id).maybeSingle();
  const allowed = profile?.is_active && ["admin", "editor", "author"].includes(profile.role);
  return { configured: true as const, user: allowed ? data.user : null, profile: allowed ? profile : null };
}
