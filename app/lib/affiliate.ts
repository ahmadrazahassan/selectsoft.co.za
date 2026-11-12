import { getPricing, getProduct, products, type Product } from "./data";

/* ---------------------------------------------------------------------------
 * Sage South Africa, on Impact.
 *
 * Every Sage link on the site leaves through one of two redirects on our own
 * domain, /go/{product} and /go/banner/{adId}. Nothing in a page links to
 * sage.com or to pxf.io directly. That gives one place to get the click right:
 *
 *  - It is a 302 with no-store, so the browser can never replay a cached
 *    answer and skip the Impact request. A 301 or 308 would be remembered
 *    and every repeat click after the first would go uncounted.
 *  - The Impact request is made by the reader's own browser, which is what
 *    Impact counts as a click. We never call it from the server.
 *  - The link carries our property's referrer, so the click is attributed to
 *    a site Impact has verified. `noreferrer` on the anchor would strip it.
 *  - subId1 and subId2 say what was clicked and where, so Impact's reports
 *    show which page and which button earns, not just a total.
 * ------------------------------------------------------------------------ */

export const impact = {
  /** The partner link issued in the Impact console. Product links are this
   *  URL plus a deep link, so programme, partner and property stay exactly as
   *  Impact issued them. */
  partnerLink: "https://sagesouthafrica.pxf.io/qWjLvn",
  /** Ad specific click and impression endpoints, from the Impact ads export.
   *  Using the ad's own link is what lets Impact report clicks per creative
   *  and pair them with the impression pixel for a click through rate. */
  clickBase: "https://sagesouthafrica.pxf.io/c/7649214",
  impressionBase: "https://sagesouthafrica.pxf.io/i/7649214",
  creativeBase: "https://a.impactradius-go.com/display-ad/34654",
  programId: "34654",
  /** Shown in Impact's reports as the shared id, to tell this site's traffic
   *  apart from any other property on the same account. */
  sharedId: "selectsoft",
} as const;

/** Products we hold an affiliate relationship for. Taken from the vendor field
 *  of the written reviews, so a new Sage product is covered the day it is
 *  added, and a database override of the vendor name cannot switch it off. */
const affiliateSlugs: ReadonlySet<string> = new Set(
  products.filter((product) => product.vendor === "Sage").map((product) => product.slug),
);

export function isAffiliateProduct(slug: string) {
  return affiliateSlugs.has(slug);
}

/** A placement names where on the site a link sits. It becomes subId2, and it
 *  arrives in a query string, so it is held to a plain slug shape. */
const PLACEMENT = /^[a-z0-9-]{1,64}$/;

export function cleanPlacement(value: string | null | undefined) {
  return value && PLACEMENT.test(value) ? value : "site";
}

/** The page on sage.com a product link should land on. The same rule the
 *  buttons used before the redirect existed: the pricing page when we have
 *  one, the product page otherwise. */
export function productDestination(slug: string): string | null {
  if (!isAffiliateProduct(slug)) return null;
  const product = getProduct(slug);
  if (!product) return null;
  return getPricing(slug)?.pricingUrl ?? product.sourceUrl;
}

export function productTrackingUrl(slug: string, placement: string): string | null {
  const destination = productDestination(slug);
  if (!destination) return null;
  const url = new URL(impact.partnerLink);
  url.searchParams.set("u", destination);
  url.searchParams.set("subId1", slug);
  url.searchParams.set("subId2", cleanPlacement(placement));
  url.searchParams.set("sharedid", impact.sharedId);
  return url.toString();
}

/* Banners ------------------------------------------------------------------ */

export type Banner = {
  adId: string;
  width: number;
  height: number;
  alt: string;
  /** Where the creative lands, as set on the ad in Impact. */
  landing: string;
};

const ACCOUNTING = "https://www.sage.com/en-za/sage-business-cloud/accounting/";
const CREATIVE_TEXT = "Sage gives you ultimate control of your numbers. Sign up now.";

/** Two sizes from the same campaign: a leaderboard for a wide column and a
 *  medium rectangle for a narrow one. The creative is hosted by Impact. */
export const banners = {
  leaderboard: { adId: "3067396", width: 728, height: 90, alt: CREATIVE_TEXT, landing: ACCOUNTING },
  rectangle: { adId: "3067401", width: 300, height: 250, alt: CREATIVE_TEXT, landing: ACCOUNTING },
} as const satisfies Record<string, Banner>;

const bannersById = new Map<string, Banner>(Object.values(banners).map((banner) => [banner.adId, banner]));

export function getBanner(adId: string) {
  return bannersById.get(adId);
}

export function bannerImageUrl(banner: Banner) {
  return `${impact.creativeBase}-${banner.adId}`;
}

export function bannerImpressionUrl(banner: Banner) {
  return `${impact.impressionBase}/${banner.adId}/${impact.programId}`;
}

export function bannerTrackingUrl(adId: string, placement: string): string | null {
  if (!bannersById.has(adId)) return null;
  const url = new URL(`${impact.clickBase}/${adId}/${impact.programId}`);
  url.searchParams.set("subId1", "banner");
  url.searchParams.set("subId2", cleanPlacement(placement));
  url.searchParams.set("sharedid", impact.sharedId);
  return url.toString();
}

/* Links in pages ----------------------------------------------------------- */

/** The href and rel for a vendor button. Sage goes through /go. Every other
 *  vendor keeps its direct link, because we hold no affiliate relationship
 *  there and the old behaviour was correct. */
export function vendorLink(
  product: Pick<Product, "slug" | "sourceUrl">,
  placement: string,
): { href: string; rel: string } {
  if (isAffiliateProduct(product.slug)) {
    return {
      href: `/go/${product.slug}?p=${cleanPlacement(placement)}`,
      // No `noreferrer`: it would strip the referrer Impact uses to attribute
      // the click to this site. `noopener` is kept, and still isolates the tab.
      rel: "nofollow sponsored noopener",
    };
  }
  return {
    href: getPricing(product.slug)?.pricingUrl ?? product.sourceUrl,
    rel: "nofollow sponsored noopener noreferrer",
  };
}

/* The redirect -------------------------------------------------------------- */

const BOT = /bot|crawl|spider|slurp|preview|fetch|monitor|headless|lighthouse|facebookexternalhit|curl|wget/i;

/**
 * Answers a click. Real readers get the Impact link. Crawlers and link
 * previewers that follow it anyway get the plain destination, so a robot never
 * generates an invalid click on the account. A browser that is only
 * prefetching gets nothing, because it has not been clicked yet.
 */
export function redirect(request: Request, tracked: string, plain: string): Response {
  const headers = new Headers({
    "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
    // Applies to the next hop, so Impact receives our origin as the referrer
    // whatever policy the page itself was served with.
    "Referrer-Policy": "origin",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  });

  const purpose = `${request.headers.get("sec-purpose") ?? ""} ${request.headers.get("purpose") ?? ""}`;
  if (/prefetch|prerender/i.test(purpose)) return new Response(null, { status: 204, headers });

  const isBot = BOT.test(request.headers.get("user-agent") ?? "");
  headers.set("Location", isBot ? plain : tracked);
  return new Response(null, { status: 302, headers });
}
