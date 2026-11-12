import { cleanPlacement, productDestination, productTrackingUrl, redirect } from "../../lib/affiliate";

/**
 * /go/{product}?p={placement}
 *
 * The one way a Sage vendor button leaves the site. See lib/affiliate.ts for
 * why it is a 302 and why it is never cached. A slug that is not an affiliate
 * product is a 404, not a redirect, so this can never become an open redirect.
 */
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const placement = cleanPlacement(new URL(request.url).searchParams.get("p"));
  const tracked = productTrackingUrl(slug, placement);
  const plain = productDestination(slug);
  if (!tracked || !plain) return new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });
  return redirect(request, tracked, plain);
}

export const HEAD = GET;
