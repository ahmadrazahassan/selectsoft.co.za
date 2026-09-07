import { comparisons, getPricing, getProduct, products, type Product } from "./data";
import { reviewDetail } from "./reviews";

/* ---------------------------------------------------------------------------
 * Head to head comparisons for any pair.
 *
 * Three pairs have a written editorial verdict. Every other pair is built here
 * from the records the reviews are built from, so a reader who picks any two
 * products gets a real page rather than an apology.
 *
 * Every product currently carries both a scored review and a checked price,
 * so every pair renders in full. The depth checks below are a guard for the
 * day a product is added ahead of its price check: a missing figure removes a
 * section rather than printing a zero or claiming the vendor quotes on
 * request.
 *
 * A price is only ever subtracted when both sides publish on the same basis.
 * `costComparable` is false for anything quoted, billed per year, or charged
 * per user against a per company price.
 * ------------------------------------------------------------------------ */

export const VS = "-vs-";

export const DIMENSIONS = [
  "Everyday use",
  "Depth of features",
  "Value for money",
  "Support and skills",
  "South African fit",
] as const;

export type DimensionRow = {
  name: string;
  a: number;
  b: number;
  aNote: string;
  bNote: string;
  /** "a", "b" or "tie". A tenth of a point is not a difference worth calling. */
  winner: "a" | "b" | "tie";
};

export type FactRow = { label: string; a: string; b: string };

export type PriceView = {
  /** True only when both figures can be set beside each other honestly. */
  comparable: boolean;
  /** Whether we hold a verified price record for each side at all. */
  aChecked: boolean;
  bChecked: boolean;
  /** Why the two cannot be subtracted, when they cannot. */
  reason: string | null;
  aEntry: string | null;
  bEntry: string | null;
  aUnit: string | null;
  bUnit: string | null;
  cheaper: "a" | "b" | "tie" | null;
  /** Rand difference over three years at the standing price. */
  threeYearGap: number | null;
};

export type GeneratedComparison = {
  a: Product;
  b: Product;
  slug: string;
  title: string;
  summary: string;
  sameCategory: boolean;
  /** "full" when both sides carry scored dimensions and a checked price. */
  depth: "full" | "partial";
  facts: FactRow[];
  dimensions: DimensionRow[];
  overall: { a: number; b: number; winner: "a" | "b" | "tie" };
  price: PriceView;
  trial: { a: string | null; b: string | null };
  demo: { a: string | null; b: string | null };
  /** Sentences assembled from the figures above, not written by hand. */
  takeaways: string[];
};

export function hasScoredDimensions(slug: string) {
  return Boolean(reviewDetail[slug]?.scores?.length);
}

export function hasCheckedPrice(slug: string) {
  return Boolean(getPricing(slug));
}

/** One canonical URL per pair, so a-vs-b and b-vs-a are never both indexed. */
export function pairSlug(a: string, b: string) {
  const written = comparisons.find(
    (item) =>
      (item.productA === a && item.productB === b) ||
      (item.productA === b && item.productB === a),
  );
  if (written) return written.slug;
  return [a, b].sort().join(VS);
}

export function parsePairSlug(slug: string): [Product, Product] | null {
  if (!slug.includes(VS)) return null;
  const index = slug.indexOf(VS);
  const a = getProduct(slug.slice(0, index));
  const b = getProduct(slug.slice(index + VS.length));
  if (!a || !b || a.slug === b.slug) return null;
  return [a, b];
}

const rand = (value: number) =>
  value >= 1000
    ? `R${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`
    : `R${Math.round(value)}`;

function priceView(a: Product, b: Product): PriceView {
  const pa = getPricing(a.slug);
  const pb = getPricing(b.slug);
  const base: PriceView = {
    comparable: false,
    aChecked: Boolean(pa),
    bChecked: Boolean(pb),
    reason: null,
    aEntry: pa?.entry ?? null,
    bEntry: pb?.entry ?? null,
    aUnit: pa?.unit ?? null,
    bUnit: pb?.unit ?? null,
    cheaper: null,
    threeYearGap: null,
  };

  // Never imply a vendor quotes on request when the truth is that we have not
  // yet read the rate card ourselves.
  if (!pa || !pb) {
    const pending = [!pa ? a.name : null, !pb ? b.name : null].filter(Boolean).join(" and ");
    const plural = pending.includes(" and ");
    return {
      ...base,
      reason: `${pending} ${plural ? "have" : "has"} not been through our price check yet, so we will not put a rand figure beside the other product. The pricing row above is what the vendor states publicly.`,
    };
  }

  if (!pa.costComparable || !pb.costComparable) {
    const quoted = [!pa.costComparable ? a.name : null, !pb.costComparable ? b.name : null]
      .filter(Boolean)
      .join(" and ");
    const plural = quoted.includes(" and ");
    return {
      ...base,
      reason: `${quoted} ${plural ? "are" : "is"} not published on a basis that can be set beside the other price, so the two cannot be subtracted honestly. Read the plan notes instead.`,
    };
  }

  const am = pa.monthlyZar;
  const bm = pb.monthlyZar;
  if (am === null || bm === null) {
    return { ...base, reason: "One of these products publishes no standing monthly rand figure." };
  }

  return {
    ...base,
    comparable: true,
    cheaper: am === bm ? "tie" : am < bm ? "a" : "b",
    threeYearGap: Math.abs(am - bm) * 36,
  };
}

function trialLabel(slug: string) {
  const price = getPricing(slug);
  if (!price) return null;
  if (price.trialDays) return `${price.trialDays} day free trial`;
  if (price.trialNote) return "Free trial, length not published";
  return "No free trial";
}

function demoLabel(slug: string) {
  const price = getPricing(slug);
  if (!price) return null;
  return price.demo ? "On request" : "Not advertised";
}

function factRows(a: Product, b: Product): FactRow[] {
  return a.facts
    .map((fact) => {
      const match = b.facts.find((item) => item.label === fact.label);
      return match ? { label: fact.label, a: fact.value, b: match.value } : null;
    })
    .filter((row): row is FactRow => row !== null);
}

export function buildComparison(a: Product, b: Product): GeneratedComparison {
  const scored = hasScoredDimensions(a.slug) && hasScoredDimensions(b.slug);
  const da = reviewDetail[a.slug];
  const db = reviewDetail[b.slug];

  const dimensions: DimensionRow[] = scored
    ? DIMENSIONS.map((name) => {
        const av = da.scores.find((item) => item.name === name);
        const bv = db.scores.find((item) => item.name === name);
        const aScore = av?.value ?? 0;
        const bScore = bv?.value ?? 0;
        const gap = aScore - bScore;
        return {
          name,
          a: aScore,
          b: bScore,
          aNote: av?.note ?? "",
          bNote: bv?.note ?? "",
          // under two tenths is noise, not a difference a buyer should act on
          winner: (Math.abs(gap) < 0.2 ? "tie" : gap > 0 ? "a" : "b") as "a" | "b" | "tie",
        };
      }).filter((row) => row.a > 0 && row.b > 0)
    : [];

  const price = priceView(a, b);
  const overallGap = a.score - b.score;
  const overall = {
    a: a.score,
    b: b.score,
    winner: (Math.abs(overallGap) < 0.2 ? "tie" : overallGap > 0 ? "a" : "b") as "a" | "b" | "tie",
  };

  const aWins = dimensions.filter((row) => row.winner === "a");
  const bWins = dimensions.filter((row) => row.winner === "b");
  const list = (rows: DimensionRow[]) =>
    rows
      .map((row) => row.name.toLowerCase())
      .join(", ")
      .replace(/, ([^,]*)$/, " and $1");

  const takeaways: string[] = [];

  takeaways.push(
    overall.winner === "tie"
      ? `${a.name} scores ${a.score.toFixed(1)} and ${b.name} scores ${b.score.toFixed(1)}. That is close enough to be a tie, so the decision rests on the detail below rather than the headline.`
      : `${(overall.winner === "a" ? a : b).name} scores higher overall, ${Math.max(a.score, b.score).toFixed(1)} against ${Math.min(a.score, b.score).toFixed(1)}. The reason behind a point of difference matters more than the point itself.`,
  );

  if (dimensions.length) {
    if (aWins.length) takeaways.push(`${a.name} is ahead on ${list(aWins)}.`);
    if (bWins.length) takeaways.push(`${b.name} is ahead on ${list(bWins)}.`);
    if (!aWins.length && !bWins.length) {
      takeaways.push(
        "Neither product is meaningfully ahead on any dimension we judge, so price and local support should decide it.",
      );
    }
  }

  if (price.comparable && price.cheaper && price.cheaper !== "tie" && price.threeYearGap) {
    const cheap = price.cheaper === "a" ? a : b;
    takeaways.push(
      `${cheap.name} has the cheaper entry price, and over three years at the standing rate the gap is about ${rand(price.threeYearGap)} before VAT, add on modules or extra users.`,
    );
  } else if (price.reason) {
    takeaways.push(price.reason);
  }

  const local = dimensions.find((row) => row.name === "South African fit");
  if (local && local.winner !== "tie") {
    const winner = local.winner === "a" ? a : b;
    const note = local.winner === "a" ? local.aNote : local.bNote;
    takeaways.push(`On South African fit ${winner.name} is the stronger of the two. ${note}`);
  }

  const sameCategory = a.category === b.category;

  return {
    a,
    b,
    slug: pairSlug(a.slug, b.slug),
    title: `${a.name} vs ${b.name}`,
    summary: sameCategory
      ? `${a.name} and ${b.name} compared on what a South African buyer has to live with: what each one costs, what it is good at and where it gives ground.`
      : `${a.name} and ${b.name} sit in different categories. Here is what each one is built for, so you can see whether the choice is really between them.`,
    sameCategory,
    depth: scored && price.aChecked && price.bChecked ? "full" : "partial",
    facts: factRows(a, b),
    dimensions,
    overall,
    price,
    trial: { a: trialLabel(a.slug), b: trialLabel(b.slug) },
    demo: { a: demoLabel(a.slug), b: demoLabel(b.slug) },
    takeaways,
  };
}

/**
 * Every pair worth putting in front of a reader: same category only, because
 * comparing a payroll product with a point of sale answers nobody's question.
 */
export function categoryPairs(): { a: Product; b: Product; slug: string }[] {
  const out: { a: Product; b: Product; slug: string }[] = [];
  const byCategory = new Map<string, Product[]>();
  for (const product of products) {
    byCategory.set(product.category, [...(byCategory.get(product.category) ?? []), product]);
  }
  for (const group of byCategory.values()) {
    for (let i = 0; i < group.length; i += 1) {
      for (let j = i + 1; j < group.length; j += 1) {
        out.push({ a: group[i], b: group[j], slug: pairSlug(group[i].slug, group[j].slug) });
      }
    }
  }
  return out;
}

/** Pairs where both sides carry scored dimensions and a checked rand price. */
export function fullDepthPairs() {
  return categoryPairs().filter(
    (pair) =>
      hasScoredDimensions(pair.a.slug) &&
      hasScoredDimensions(pair.b.slug) &&
      hasCheckedPrice(pair.a.slug) &&
      hasCheckedPrice(pair.b.slug),
  );
}
