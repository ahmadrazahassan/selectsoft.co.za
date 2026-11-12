import { bannerTrackingUrl, cleanPlacement, getBanner, redirect } from "../../../lib/affiliate";

/**
 * /go/banner/{adId}?p={placement}
 *
 * Banner clicks use the ad's own Impact link, so Impact reports them against
 * the creative and can pair them with the impression pixel. Only ad ids listed
 * in lib/affiliate.ts resolve.
 */
export async function GET(request: Request, { params }: { params: Promise<{ adId: string }> }) {
  const { adId } = await params;
  const placement = cleanPlacement(new URL(request.url).searchParams.get("p"));
  const banner = getBanner(adId);
  const tracked = bannerTrackingUrl(adId, placement);
  if (!banner || !tracked) return new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });
  return redirect(request, tracked, banner.landing);
}

export const HEAD = GET;
