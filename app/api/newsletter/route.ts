import { z } from "zod";
import { createServiceSupabaseClient } from "../../lib/supabase";

const schema = z.object({ email: z.string().trim().toLowerCase().email().max(254) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ message: "Enter a valid email address." }, { status: 400 });
  const client = createServiceSupabaseClient();
  if (!client) return Response.json({ message: "Subscriptions will open shortly." }, { status: 503 });
  const { error } = await client.from("newsletter_subscribers").upsert({
    email: parsed.data.email,
    status: "active",
    source: "website",
    consent_text: "Monthly editorial newsletter",
    consented_at: new Date().toISOString(),
  }, { onConflict: "email" });
  if (error) return Response.json({ message: "We could not save that address. Please try again." }, { status: 500 });
  return Response.json({ message: "You are on the list. Thank you." });
}
