import { z } from "zod";
import { createServiceSupabaseClient } from "../../lib/supabase";
import { publisher } from "../../config/site";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(254),
  topic: z.string().trim().min(2).max(80),
  product: z.string().trim().max(120).optional(),
  message: z.string().trim().min(20).max(4000),
  consent: z.literal("yes"),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ message: "Check the required fields and try again." }, { status: 400 });
  const client = createServiceSupabaseClient();
  // The message store is unreachable. Never leave a reader with nowhere to go:
  // give them the address that always works.
  if (!client) {
    return Response.json(
      { message: `We could not save that message. Please email it to ${publisher.email} and it will reach the editor directly.` },
      { status: 503 },
    );
  }
  const { name, email, topic, product, message } = parsed.data;
  const { error } = await client.from("contact_messages").insert({ name, email, topic, product_or_vendor: product || null, message, consent: true, status: "new" });
  if (error) {
    return Response.json(
      { message: `Your note could not be sent. Please email ${publisher.email} instead.` },
      { status: 500 },
    );
  }
  return Response.json({ message: "Your note has reached the editorial desk." });
}
