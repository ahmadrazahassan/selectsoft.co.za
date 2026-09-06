/* ---------------------------------------------------------------------------
 * Third party ratings.
 *
 * These are other people's numbers, not ours. Every figure here was read off
 * the live source page by hand on the date below, the same discipline the
 * pricing table uses. Nothing is estimated, averaged or carried over from a
 * search result.
 *
 * We publish the unflattering ones too. Shopify sits at 1.3 on Trustpilot and
 * that stays on the page, because a table you can only trust when it is
 * complimentary is not a table anybody should trust.
 * ------------------------------------------------------------------------ */

export const RATINGS_CHECKED_ON = "4 September 2026";

/** Below this, an average says more about the sample than the product. */
export const MIN_REVIEWS = 25;

export type RatingSource = "G2" | "Trustpilot";

export type Rating = {
  source: RatingSource;
  /** Out of 5, as the source publishes it. */
  score: number;
  count: number;
  url: string;
};

/**
 * The two sources measure different things and routinely disagree by three
 * points. Saying which is which is the whole value of showing them.
 */
export const SOURCE_MEASURES: Record<RatingSource, string> = {
  G2: "Business users reviewing the software itself",
  Trustpilot: "Customers reviewing the company and its service",
};

const RAW: Record<string, Rating[]> = {
  "sage-accounting": [
    { source: "G2", score: 4.2, count: 76, url: "https://www.g2.com/products/sage-business-cloud-accounting/reviews" },
  ],
  xero: [
    { source: "G2", score: 4.4, count: 1833, url: "https://www.g2.com/products/xero/reviews" },
    { source: "Trustpilot", score: 4.1, count: 11304, url: "https://www.trustpilot.com/review/www.xero.com" },
  ],
  "quickbooks-online": [
    { source: "G2", score: 4.0, count: 3880, url: "https://www.g2.com/products/quickbooks-online/reviews" },
  ],
  "zoho-books": [
    { source: "G2", score: 4.4, count: 329, url: "https://www.g2.com/products/zoho-books/reviews" },
  ],
  "zoho-crm": [
    { source: "G2", score: 4.1, count: 2947, url: "https://www.g2.com/products/zoho-crm/reviews" },
  ],
  odoo: [
    { source: "Trustpilot", score: 3.1, count: 1247, url: "https://www.trustpilot.com/review/odoo.com" },
  ],
  shopify: [
    { source: "Trustpilot", score: 1.3, count: 5074, url: "https://www.trustpilot.com/review/shopify.com" },
  ],
  "hubspot-crm": [
    { source: "Trustpilot", score: 1.5, count: 1161, url: "https://www.trustpilot.com/review/hubspot.com" },
  ],

  /* Checked on the date above and deliberately not published:
   *   yoco       Trustpilot 1.8 from 19 reviews   below MIN_REVIEWS
   *   simplepay  Trustpilot 3.3 from 1 review     below MIN_REVIEWS
   *   payspace, skynamo                           no Trustpilot profile
   * Sage Pastel, Sage Payroll, Sage 300 People, Sage HR and Sage 200 Evolution
   * share sage.com on Trustpilot, so a company score cannot honestly be shown
   * against any one of those products. Palladium, Omni Accounts, CaseWare,
   * SYSPRO and SAP Business One are still to be checked. */
};

/** Only ratings with a large enough sample are published. */
export function getRatings(slug: string): Rating[] {
  return (RAW[slug] ?? []).filter((rating) => rating.count >= MIN_REVIEWS);
}

export function hasRatings(slug: string) {
  return getRatings(slug).length > 0;
}

/** Used by the guard that stops a figure being published without a source. */
export const allRatings = RAW;
