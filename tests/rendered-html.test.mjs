import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";

/** Rendered copy, with tags and entities removed, so that inline
 *  markup inside a heading does not break a content assertion. */
function textOf(html) {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");
}

/** SimplePay publishes no square mark above 80px: simplepay.co.za offers only
 *  this favicon and wide white-on-transparent wordmarks, which are invisible on
 *  our light cards. Re-check if they ever ship a larger icon. Nothing else may
 *  be added here without the same kind of justification. */
const LOW_RES_ALLOWED = new Set(["/logos/simplepay.png"]);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the complete publication homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = textOf(html);
  assert.match(text, /Choose software with a clear head/);
  assert.match(text, /Start with the work you want to improve/);
  assert.match(text, /Popular comparisons, side by side/);
  assert.match(text, /Software you can trial free/);
  assert.match(html, /SimplePay logo/);
  // the closing footer carries the newsletter and, more importantly for an
  // independent publication, the standing links a reader can check us against
  assert.match(text, /Editorial policy/);
  assert.match(text, /Affiliate disclosure/);
  assert.match(text, /Methodology/);
  assert.match(text, /Select Soft/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);

  // Section order on the homepage is a deliberate product decision.
  const order = [...html.matchAll(/<section class="(\w+)"/g)].map((m) => m[1]);
  assert.deepEqual(order.slice(0, 5), [
    "hero",
    "selectedReviews",
    "comparisonSection",
    "trialSection",
    "categorySection",
  ]);
});

test("renders a product review with editorial detail", async () => {
  const response = await render("/reviews/simplepay");
  assert.equal(response.status, 200);
  const text = textOf(await response.text());
  assert.match(text, /SimplePay review/);
  assert.match(text, /What changes in South Africa/);
  assert.match(text, /Where the number comes from/);
  // the buy rail must carry the price and the affiliate disclosure
  assert.match(text, /Starting price/);
  assert.match(text, /How we make money/);
});

test("renders a published comparison", async () => {
  const response = await render("/compare/xero-vs-quickbooks-online");
  assert.equal(response.status, 200);
  const text = textOf(await response.text());
  assert.match(text, /Xero compared with QuickBooks Online/);
  assert.match(text, /Where each product stands/);
});

test("any pair of products produces a real comparison", async () => {
  // The whole point of the rebuild: picking two products must never land on an
  // apology. This pair has no written verdict, so it exercises the generator.
  const response = await render("/compare/quickbooks-online-vs-zoho-books");
  assert.equal(response.status, 200);
  const text = textOf(await response.text());

  assert.match(text, /QuickBooks Online vs Zoho Books/);
  // the four sections that make it a comparison rather than two summaries
  assert.match(text, /What the record adds up to/);
  assert.match(text, /Where the difference actually sits/);
  assert.match(text, /What each vendor commits to/);
  assert.match(text, /How each one behaves in South Africa/);
  // scores are stated, not implied
  assert.match(text, /8\.0/);
  assert.match(text, /8\.3/);
  // and the page says where the figures come from
  assert.match(text, /assembled from our two reviews/);
  assert.doesNotMatch(text, /no published editorial verdict/);
});

test("a pair only ever answers on one url", async () => {
  // Both orders would otherwise be indexable copies of the same page.
  const forward = await render("/compare/quickbooks-online-vs-zoho-books");
  const reversed = await render("/compare/zoho-books-vs-quickbooks-online");
  assert.equal(forward.status, 200);
  assert.equal(reversed.status, 404);

  // A written verdict keeps its own slug and gains no alphabetical twin.
  assert.equal((await render("/compare/sage-accounting-vs-xero")).status, 200);
  assert.equal((await render("/compare/xero-vs-sage-accounting")).status, 404);

  // Nonsense and self comparisons are not pages.
  assert.equal((await render("/compare/xero-vs-xero")).status, 404);
  assert.equal((await render("/compare/not-a-product-vs-xero")).status, 404);

  const html = await forward.text();
  assert.match(html, /rel="canonical" href="[^"]*\/compare\/quickbooks-online-vs-zoho-books"/);
});

test("a comparison never prints a number it has not verified", async () => {
  // Omni Accounts is quoted rather than published on a comparable basis, so
  // the engine must refuse to subtract instead of inventing a gap.
  const text = textOf(await (await render("/compare/omni-accounts-vs-sage-accounting")).text());
  assert.match(text, /cannot be subtracted honestly/);
  assert.doesNotMatch(text, /the gap is about R0/);

  // A comparable pair does state the three year gap, so the guard above is
  // proving a real branch rather than passing because nothing ever prints.
  const priced = textOf(await (await render("/compare/quickbooks-online-vs-zoho-books")).text());
  assert.match(priced, /over three years at the standing rate the gap is about R/);

  // No dimension may render as a zero, which is what a missing score would be.
  assert.doesNotMatch(priced, /Everyday use[^<]*0\.0/);
});

test("every comparison carries the full depth, and both product marks", async () => {
  // One pair from each live category, so a thin page cannot hide in a corner
  // of the catalogue.
  const pairs = [
    "/compare/quickbooks-online-vs-zoho-books",
    "/compare/sage-hr-vs-simplepay",
    "/compare/hubspot-crm-vs-pipedrive",
    "/compare/sage-x3-vs-syspro",
    "/compare/ikhokha-vs-shopify",
  ];

  const required = [
    "What the record adds up to",
    "What each vendor commits to",
    "What each one actually does",
    "Setup, and who answers when it breaks",
    "Where each one gives ground",
    "How each one behaves in South Africa",
    "What we said about each one",
    "Where these figures come from",
  ];

  for (const path of pairs) {
    const response = await render(path);
    assert.equal(response.status, 200, `${path} does not render`);
    const html = await response.text();
    const text = textOf(html);

    for (const heading of required) {
      assert.ok(text.includes(heading), `${path} is missing the "${heading}" section`);
    }

    // The capability blocks are the written detail, not a tick grid, so they
    // have to carry real sentences from each review.
    const capabilities = [...html.matchAll(/<dt>/g)].length;
    assert.ok(capabilities >= 6, `${path} lists only ${capabilities} capabilities`);

    // Both products are named by their mark wherever a column or block
    // belongs to one of them, not by text alone.
    const marks = [...html.matchAll(/alt="[^"]* logo"/g)].length;
    assert.ok(marks >= 10, `${path} renders only ${marks} product marks`);

    // A mark must never sit in a tinted box: the logo is the whole graphic.
    assert.ok(html.includes("productMarkLogo"), `${path} renders no logo marks at all`);
  }
});

test("the compare index offers every pair, grouped by category", async () => {
  const response = await render("/compare");
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = textOf(html);

  const links = new Set([...html.matchAll(/\/compare\/([a-z0-9-]+)"/g)].map((m) => m[1]));
  // 29 products across five live categories: 36 + 15 + 15 + 6 + 6 pairs.
  assert.equal(links.size, 78, `expected 78 pairs, found ${links.size}`);
  assert.ok(links.has("sage-accounting-vs-xero"), "a written verdict is missing from the index");
  assert.match(text, /78 comparisons ready across 5 categories/);

  // The picker must not offer a route that does not exist.
  for (const slug of ["sage-accounting-vs-xero", "sage-hr-vs-simplepay"]) {
    assert.equal((await render(`/compare/${slug}`)).status, 200, `${slug} is linked but does not render`);
  }
});

test("every product carries a verified price and an outbound link", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  // The cards lead on price, so a missing figure is a content bug, not a style one.
  assert.match(textOf(html), /Prices checked/);
  assert.match(html, /rel="nofollow sponsored noopener noreferrer"/);

  const source = await readFile(new URL("../app/lib/data.ts", import.meta.url), "utf8");
  const productSlugs = [
    ...source
      .slice(source.indexOf("export const products"), source.indexOf("export const PRICING_CHECKED_ON"))
      .matchAll(/^ {4}slug: "([^"]+)"/gm),
  ].map((match) => match[1]);
  const pricingBlock = source.slice(
    source.indexOf("export const pricing"),
    source.indexOf("export function getPricing"),
  );
  const pricedSlugs = [...pricingBlock.matchAll(/^ {2}"?([a-z0-9-]+)"?:\s*\{/gm)].map((m) => m[1]);

  assert.ok(productSlugs.length > 0, "expected products to be defined");
  for (const slug of productSlugs) {
    assert.ok(pricedSlugs.includes(slug), `${slug} has no entry in the pricing table`);
  }
  for (const slug of pricedSlugs) {
    assert.ok(productSlugs.includes(slug), `pricing entry ${slug} has no matching product`);
  }
  for (const [, url] of pricingBlock.matchAll(/pricingUrl:\s*\n?\s*"([^"]+)"/g)) {
    assert.match(url, /^https:\/\//, `pricingUrl must be absolute https: ${url}`);
  }
  // Rand is the headline currency site wide. A dollar figure may only appear
  // in fxNote, where it names what the vendor actually charges.
  for (const [, entry] of pricingBlock.matchAll(/^ {4}entry: "([^"]+)"/gm)) {
    assert.doesNotMatch(entry, /\$/, `entry must be in rand, got "${entry}"`);
  }

  // Every product needs a real vendor logo, never a lettered placeholder.
  const logoBlock = source.slice(
    source.indexOf("export const productLogos"),
    source.indexOf("export function getLogo"),
  );
  const logoPairs = [...logoBlock.matchAll(/^ {2}"?([a-z0-9-]+)"?: "([^"]+)"/gm)];
  for (const slug of productSlugs) {
    assert.ok(
      logoPairs.some(([, key]) => key === slug),
      `${slug} has no logo in productLogos`,
    );
  }
  for (const [, , path] of logoPairs) {
    const file = new URL(`../public${path}`, import.meta.url);
    assert.ok(existsSync(file), `logo file missing on disk: public${path}`);
    // Marks render at 62px CSS, so a raster source under 124px is soft on a
    // 2x display. Vectors are exempt.
    if (path.endsWith(".png") && !LOW_RES_ALLOWED.has(path)) {
      const buf = readFileSync(file);
      assert.equal(buf.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", `not a PNG: ${path}`);
      const width = buf.readUInt32BE(16);
      assert.ok(width >= 124, `${path} is ${width}px wide; needs >=124px for a 62px mark`);
    }
  }
  // Rand is the only currency a reader is quoted in. A dollar figure may appear
  // only as disclosure, naming what the vendor actually charges: in fxNote, or
  // in a plan summary. Never in a headline figure.
  source.split("\n").forEach((line, i) => {
    if (!line.includes("$")) return;
    if (/USD_ZAR_LABEL|USD_ZAR_RATE|\$\{/.test(line)) return;
    const isDisclosure = /fxNote:/.test(line) || /summary: "/.test(line);
    assert.ok(
      isDisclosure,
      `data.ts:${i + 1} shows a dollar figure outside a disclosure: ${line.trim()}`,
    );
  });

  // Headline figures are rand only, with no exception.
  for (const [, field, value] of source.matchAll(/(entry|price): "([^"]*)"/g)) {
    assert.doesNotMatch(value, /\$/, `${field} must be quoted in rand, got "${value}"`);
  }
});

test("every product has written review detail, and no templated filler", async () => {
  const source = await readFile(new URL("../app/lib/data.ts", import.meta.url), "utf8");
  const reviews = await readFile(new URL("../app/lib/reviews.ts", import.meta.url), "utf8");
  const page = await readFile(
    new URL("../app/reviews/[slug]/page.tsx", import.meta.url),
    "utf8",
  );

  const productSlugs = [
    ...source
      .slice(source.indexOf("export const products"), source.indexOf("export const PRICING_CHECKED_ON"))
      .matchAll(/^ {4}slug: "([^"]+)"/gm),
  ].map((m) => m[1]);
  const reviewed = [...reviews.matchAll(/^ {2}"?([a-z0-9-]+)"?: \{$/gm)].map((m) => m[1]);

  for (const slug of productSlugs) {
    assert.ok(reviewed.includes(slug), `${slug} has no entry in reviews.ts`);
  }
  for (const slug of reviewed) {
    assert.ok(productSlugs.includes(slug), `review entry ${slug} has no matching product`);
  }

  // The review body must not interpolate a product name into a stock sentence.
  for (const phrase of [
    "A practical part of the daily workflow",
    "is at its best when the team",
    "Keep the final buying session",
  ]) {
    assert.ok(!page.includes(phrase), `templated filler is back in the review page: ${phrase}`);
  }
});

test("review prose uses no hyphens or dashes", async () => {
  const reviews = await readFile(new URL("../app/lib/reviews.ts", import.meta.url), "utf8");
  // Strip the file header comment, which documents the rule and names the characters.
  const body = reviews.slice(reviews.indexOf("export const reviewDetail"));
  const offenders = [];
  body.split("\n").forEach((line, i) => {
    const quoted = [...line.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
    for (const text of quoted) {
      // Property names such as "sage-pastel-payroll" are keys, not prose.
      if (/^[a-z0-9-]+$/.test(text)) continue;
      const bad = text.match(/[‐-―−]|(?<=\w)-(?=\w)/);
      if (bad) offenders.push(`reviews.ts:${i + 1} "${text.slice(0, 70)}" contains ${bad[0]}`);
    }
  });
  assert.deepEqual(offenders, []);

  // The comparison records live in data.ts and carry the same rule.
  const data = await readFile(new URL("../app/lib/data.ts", import.meta.url), "utf8");
  const comparisonBody = data.slice(data.indexOf("export const comparisons"));
  const dataOffenders = [];
  comparisonBody.split(/\r?\n/).forEach((line, i) => {
    for (const text of [...line.matchAll(/"([^"]*)"/g)].map((m) => m[1])) {
      if (/^[a-z0-9-]+$/.test(text)) continue;
      const bad = text.match(/[‐-―−]|(?<=\w)-(?=\w)/);
      if (bad) dataOffenders.push(`data.ts comparisons line ${i + 1}: "${text.slice(0, 70)}"`);
    }
  });
  assert.deepEqual(dataOffenders, []);

  // And the rule has to survive into what a reader actually sees, including
  // the sentences the comparison engine assembles at render time.
  for (const path of [
    "/compare",
    "/compare/yoco-vs-ikhokha",
    "/compare/quickbooks-online-vs-zoho-books",
    "/compare/omni-accounts-vs-sage-accounting",
  ]) {
    const text = textOf(await (await render(path)).text());
    const bad = text.match(/[‐-―−]/);
    assert.equal(bad, null, `${path} renders ${bad && bad[0]} in its prose`);
  }
});

test("headline scores are the mean of a written breakdown", async () => {
  const source = await readFile(new URL("../app/lib/data.ts", import.meta.url), "utf8");
  const reviews = await readFile(new URL("../app/lib/reviews.ts", import.meta.url), "utf8");
  const page = await readFile(
    new URL("../app/reviews/[slug]/page.tsx", import.meta.url),
    "utf8",
  );

  // The breakdown used to be arithmetic on the headline score. It must not return.
  assert.ok(
    !/product\.score\s*[-+]\s*0\./.test(page),
    "score breakdown is being derived from the headline score again",
  );

  const products = source.slice(
    source.indexOf("export const products"),
    source.indexOf("export const PRICING_CHECKED_ON"),
  );
  const headline = new Map(
    [...products.matchAll(/slug: "([^"]+)",[\s\S]{0,220}?score: ([\d.]+),/g)].map((m) => [
      m[1],
      Number(m[2]),
    ]),
  );

  const entries = reviews.split(/^ {2}"?[a-z0-9-]+"?: \{$/m);
  const slugs = [...reviews.matchAll(/^ {2}"?([a-z0-9-]+)"?: \{$/gm)].map((m) => m[1]);
  assert.ok(slugs.length > 0, "no review entries found");

  slugs.forEach((slug, i) => {
    const body = entries[i + 1];
    const rows = [...body.matchAll(/\{ name: "([^"]+)", value: ([\d.]+), note: "([^"]+)" \}/g)];
    assert.equal(rows.length, 5, `${slug} should have five scored dimensions`);
    for (const [, name, , note] of rows) {
      assert.ok(note.length > 25, `${slug} dimension "${name}" has no real reason written`);
    }
    const mean =
      Math.round((rows.reduce((sum, r) => sum + Number(r[2]), 0) / rows.length) * 10) / 10;
    assert.equal(
      headline.get(slug),
      mean,
      `${slug} headline score ${headline.get(slug)} does not match its breakdown mean ${mean}`,
    );
  });
});

test("pros, cons and local view are written, not placeholder bullets", async () => {
  const source = await readFile(new URL("../app/lib/data.ts", import.meta.url), "utf8");
  const products = source.slice(
    source.indexOf("export const products"),
    source.indexOf("export const PRICING_CHECKED_ON"),
  );

  const entries = [
    ...products.matchAll(
      /slug: "([^"]+)",[\s\S]*?pros: \[([\s\S]*?)\][\s\S]*?cons: \[([\s\S]*?)\][\s\S]*?localView:\s*\n?\s*"([^"]*)"/g,
    ),
  ];
  assert.ok(entries.length >= 24, `expected at least 24 products, found ${entries.length}`);

  for (const [, slug, prosRaw, consRaw, localView] of entries) {
    const quoted = (block) => [...block.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
    for (const [field, items] of [
      ["pros", quoted(prosRaw)],
      ["cons", quoted(consRaw)],
    ]) {
      assert.ok(items.length >= 2, `${slug} has too few ${field}`);
      for (const item of items) {
        const words = item.trim().split(/\s+/).length;
        // "Useful automation" style bullets say nothing. Six words is the floor.
        assert.ok(words >= 6, `${slug} ${field} bullet is placeholder grade: "${item}"`);
      }
    }
    const localWords = localView.trim().split(/\s+/).length;
    assert.ok(
      localWords >= 40,
      `${slug} localView is only ${localWords} words, which is not a real local view`,
    );
  }
});

/* ---------------------------------------------------------------------------
 * Trust guards.
 *
 * Each of these locks in a fix for something that failed an affiliate review:
 * inventory numbers that did not match the library, categories advertised while
 * empty, unfinished legal pages, invented bylines and a missing publisher.
 * ------------------------------------------------------------------------ */

test("every advertised count matches the library behind it", async () => {
  const { products, categories, categoryCount, liveCategories } = await import(
    new URL("../app/lib/data.ts", import.meta.url).href
  );

  // No category may carry a hand typed size.
  for (const category of categories) {
    assert.equal(
      Object.hasOwn(category, "count"),
      false,
      `${category.slug} carries a hardcoded count; derive it from products`,
    );
  }

  // A live category has products; an empty one is not live.
  for (const category of categories) {
    const n = categoryCount(category.slug);
    const isLive = liveCategories.some((item) => item.slug === category.slug);
    assert.equal(n > 0, isLive, `${category.slug}: ${n} products but live=${isLive}`);
  }

  const text = textOf(await (await render()).text());
  // textOf strips tags without inserting a space, so compare with whitespace
  // removed rather than guessing where the gaps fall.
  const dense = text.replace(/\s+/g, "");
  assert.ok(dense.includes(`${products.length}Productsreviewed`), "headline product count is wrong");
  assert.ok(dense.includes(`${liveCategories.length}Businesscategories`), "headline category count is wrong");
  assert.ok(dense.includes(`${products.length}productsacrosseverycategory`), "index count is wrong");

  // Each category card states its true size. Anchored on the category name so
  // a number belonging to a different card cannot satisfy the assertion.
  for (const category of liveCategories) {
    const n = categoryCount(category.slug);
    // the summary appears only on the card; the name also appears in the nav
    const at = text.indexOf(category.summary);
    assert.ok(at > -1, `${category.slug} is missing from the homepage`);
    assert.ok(
      text.slice(at, at + 400).includes(`${n} review`),
      `${category.slug} card should advertise ${n} reviews`,
    );
  }
});

test("an empty category is never linked, listed or served", async () => {
  const { categories, categoryCount } = await import(
    new URL("../app/lib/data.ts", import.meta.url).href
  );
  const empty = categories.filter((c) => categoryCount(c.slug) === 0);
  assert.ok(empty.length > 0, "this guard needs at least one empty category to be meaningful");

  const home = await (await render()).text();
  const sitemap = await (await render("/sitemap.xml")).text();

  for (const category of empty) {
    assert.doesNotMatch(home, new RegExp(`/software/${category.slug}`), `${category.slug} is linked from the homepage`);
    assert.doesNotMatch(sitemap, new RegExp(category.slug), `${category.slug} is in the sitemap`);
    const response = await render(`/software/${category.slug}`);
    assert.equal(response.status, 404, `/software/${category.slug} should 404 while empty`);
  }
});

test("legal pages are finished, not drafts", async () => {
  const privacy = textOf(await (await render("/privacy")).text());
  const terms = textOf(await (await render("/terms")).text());

  for (const [name, text] of [["privacy", privacy], ["terms", terms]]) {
    assert.doesNotMatch(text, /before (public )?launch|to be confirmed|placeholder|TODO/i,
      `${name} still contains drafting notes`);
    assert.match(text, /In effect from \d/, `${name} has no effective date`);
  }

  // POPIA needs these to be present and specific.
  assert.match(privacy, /Information Officer/);
  assert.match(privacy, /Khadija Bibi/);
  assert.match(privacy, /Information Regulator/);
  assert.match(privacy, /section 72 of POPIA/);
  assert.match(privacy, /24 months/, "retention must be a stated period, not a vague promise");
  assert.match(privacy, /Cloudflare/);
  assert.match(privacy, /Supabase/);
  assert.match(privacy, /Google Fonts/);
  assert.match(terms, /Consumer Protection Act 68 of 2008/);
});

test("the publisher is named, and every byline resolves to a real person", async () => {
  const { authors, guides } = await import(new URL("../app/lib/data.ts", import.meta.url).href);
  const names = Object.values(authors).map((a) => a.name);

  for (const guide of guides) {
    assert.ok(names.includes(guide.author), `${guide.slug} is bylined to an unknown author`);
  }
  for (const author of Object.values(authors)) {
    for (const field of ["name", "role", "location", "bio", "method", "email"]) {
      assert.ok(author[field]?.length > 0, `an author record is missing ${field}`);
    }
  }

  // The two personas the site used to publish under must be gone everywhere.
  for (const path of ["/", "/guides/crm-pricing-explained", "/reviews/sage-accounting", "/compare/sage-accounting-vs-xero"]) {
    const text = textOf(await (await render(path)).text());
    assert.doesNotMatch(text, /Nomsa Dlamini|Pieter Jacobs/, `${path} still carries a retired byline`);
  }

  // The imprint appears on every page, because it sits in the footer.
  for (const path of ["/", "/privacy", "/contact", "/reviews/xero"]) {
    const text = textOf(await (await render(path)).text());
    assert.match(text, /Published by Khadija Bibi, Cape Town, South Africa/, `${path} has no imprint`);
  }
});

test("a form that cannot reach its store still gives the reader a route", async () => {
  for (const [path, body] of [
    ["/api/newsletter", { email: "reader@example.co.za" }],
    ["/api/contact", {
      name: "Reader", email: "reader@example.co.za", topic: "Editorial question",
      message: "A message long enough to pass validation on the contact route.", consent: "yes",
    }],
  ]) {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
    const { default: worker } = await import(workerUrl.href);
    const response = await worker.fetch(
      new Request(`http://localhost${path}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    const { message } = await response.json();
    if (response.status === 200) continue; // configured and working
    assert.match(message, /editor@selectsoft\.co\.za/,
      `${path} fails without telling the reader where to write instead`);
  }
});

test("a third party rating is never published without a checkable source", async () => {
  const { allRatings, getRatings, MIN_REVIEWS, RATINGS_CHECKED_ON } = await import(
    new URL("../app/lib/ratings.ts", import.meta.url).href
  );
  const { products } = await import(new URL("../app/lib/data.ts", import.meta.url).href);
  const slugs = new Set(products.map((p) => p.slug));

  assert.match(RATINGS_CHECKED_ON, /^\d{1,2} \w+ \d{4}$/);

  for (const [slug, list] of Object.entries(allRatings)) {
    assert.ok(slugs.has(slug), `ratings recorded for unknown product ${slug}`);
    for (const rating of list) {
      assert.ok(["G2", "Trustpilot"].includes(rating.source), `${slug}: unknown source`);
      assert.ok(rating.score > 0 && rating.score <= 5, `${slug}: ${rating.source} score out of range`);
      assert.ok(Number.isInteger(rating.count) && rating.count > 0, `${slug}: bad review count`);
      // every published figure must link back to the page it was read from
      assert.match(rating.url, /^https:\/\//, `${slug}: ${rating.source} has no source link`);
      const host = rating.source === "G2" ? "g2.com" : "trustpilot.com";
      assert.ok(rating.url.includes(host), `${slug}: ${rating.source} link does not point at ${host}`);
    }
    // a thin sample is held back rather than averaged into something meaningless
    for (const rating of getRatings(slug)) {
      assert.ok(rating.count >= MIN_REVIEWS, `${slug}: ${rating.source} published below the threshold`);
    }
  }

  // and the page must show the source, the count and the date, never a bare star
  // en-ZA groups thousands with a space, not a comma, which is right for this
  // audience; compare with the separators removed rather than assuming one.
  const flat = (t) => t.replace(/[\s,]/g, "");
  const text = textOf(await (await render("/reviews/xero")).text());
  const xeroFlat = flat(text);
  assert.match(text, /4\.4/);
  assert.ok(xeroFlat.includes("1833reviewsonG2"), "G2 count and source missing");
  assert.ok(xeroFlat.includes("11304reviewsonTrustpilot"), "Trustpilot count and source missing");
  assert.match(text, new RegExp(RATINGS_CHECKED_ON));
  assert.match(text, /These are not our reviews and we did not collect them/);

  // an unflattering figure stays on the page
  const shopify = textOf(await (await render("/reviews/shopify")).text());
  assert.match(shopify, /1\.3/, "a low third party rating must not be quietly dropped");
  assert.ok(flat(shopify).includes("5074reviewsonTrustpilot"));
});

test("a price carries the date it was actually verified", async () => {
  const { products, getPricing, pricedOn, PRICING_CHECKED_ON } = await import(
    new URL("../app/lib/data.ts", import.meta.url).href
  );

  for (const product of products) {
    const price = getPricing(product.slug);
    assert.ok(price, `${product.slug} has no pricing record`);
    // a product checked on its own day must say so rather than borrowing the
    // site wide date, which would claim a check that never happened
    if (price.checkedOn) {
      assert.match(price.checkedOn, /^\d{1,2} \w+ \d{4}$/, `${product.slug} has a malformed check date`);
      assert.equal(pricedOn(product.slug), price.checkedOn);
    } else {
      assert.equal(pricedOn(product.slug), PRICING_CHECKED_ON);
    }
  }

  // the newer products state their own date on the page
  const text = textOf(await (await render("/reviews/ikhokha")).text());
  assert.match(text, /Prices checked 5 September 2026/);
  assert.doesNotMatch(text, /Prices checked 25 August 2026/);

  // and an older one still states the site wide date
  const xero = textOf(await (await render("/reviews/xero")).text());
  assert.match(xero, /Prices checked 25 August 2026/);
});

/* ---------------------------------------------------------------------------
 * Search guards. A wrong canonical or a duplicated article body does more
 * damage than having neither, so both are tested rather than assumed.
 * ------------------------------------------------------------------------ */

test("every guide has its own body, not a shared template", async () => {
  const { guides } = await import(new URL("../app/lib/data.ts", import.meta.url).href);
  const { guideContent } = await import(new URL("../app/lib/guide-content.ts", import.meta.url).href);

  assert.ok(guides.length >= 25, `expected at least 25 guides, found ${guides.length}`);

  const leads = new Set();
  for (const guide of guides) {
    const body = guideContent[guide.slug];
    assert.ok(body, `${guide.slug} has no written body`);
    assert.ok(body.sections.length >= 4, `${guide.slug} has only ${body.sections.length} sections`);
    assert.ok(body.faqs.length >= 3, `${guide.slug} has too few questions`);
    assert.ok(body.takeaways.length >= 3, `${guide.slug} has too few takeaways`);
    assert.ok(body.relatedProducts.length > 0, `${guide.slug} links to no products`);

    const words = [body.lead, ...body.sections.flatMap((s) => s.paragraphs)].join(" ").split(/\s+/).length;
    assert.ok(words >= 400, `${guide.slug} body is only ${words} words`);

    // the duplicate content failure this replaced
    assert.equal(leads.has(body.lead), false, `${guide.slug} repeats another guide's opening`);
    leads.add(body.lead);
  }

  // house style, the same rule reviews.ts is held to
  const source = await readFile(new URL("../app/lib/guide-content.ts", import.meta.url), "utf8");
  const body = source.slice(source.indexOf("export const guideContent"));
  const offenders = [];
  for (const [, text] of body.matchAll(/"([^"]*)"/g)) {
    if (/^[a-z0-9-]+$/.test(text)) continue;
    const bad = text.match(/[‐-―−]|(?<=\w)-(?=\w)/);
    if (bad) offenders.push(`"${text.slice(0, 60)}" contains ${bad[0]}`);
  }
  assert.deepEqual(offenders, []);

  // and two guide pages must not serve the same rendered article
  const a = textOf(await (await render("/guides/paye-uif-sdl-explained")).text());
  const b = textOf(await (await render("/guides/card-machine-fees-compared")).text());
  assert.notEqual(a, b, "two guide pages served identical text");
  assert.match(a, /PAYE, UIF and SDL/);
  assert.match(b, /card machine/i);
});

test("every public page canonicalises to itself", async () => {
  const paths = [
    "/", "/about", "/methodology", "/editorial-policy", "/affiliate-disclosure",
    "/contact", "/privacy", "/terms", "/reviews", "/guides", "/software", "/compare",
    "/reviews/xero", "/guides/paye-uif-sdl-explained",
  ];
  for (const path of paths) {
    const html = await (await render(path)).text();
    const found = html.match(/rel="canonical" href="([^"]+)"/);
    assert.ok(found, `${path} has no canonical`);
    const expected = path === "/" ? "" : path;
    assert.ok(
      found[1].endsWith(expected),
      `${path} canonicalises to ${found[1]}, which is not itself`,
    );
  }
});

test("structured data describes the page it sits on", async () => {
  const parse = (html) =>
    [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .flatMap((m) => {
        const parsed = JSON.parse(m[1]);
        return parsed["@graph"] ?? [parsed];
      });

  const home = parse(await (await render("/")).text()).map((n) => n["@type"]);
  assert.ok(home.includes("Organization"), "no Organization schema");
  assert.ok(home.includes("WebSite"), "no WebSite schema");

  const review = parse(await (await render("/reviews/sage-accounting")).text());
  const product = review.find((n) => n["@type"] === "Product");
  assert.ok(product, "review page has no Product schema");
  assert.equal(product.review.reviewRating.ratingValue, 8.3);
  assert.equal(product.review.reviewRating.bestRating, 10);
  assert.equal(product.offers.priceCurrency, "ZAR");
  assert.equal(product.offers.price, 240);
  assert.ok(review.some((n) => n["@type"] === "BreadcrumbList"));

  const guide = parse(await (await render("/guides/vat-registration-accounting-software")).text());
  const faq = guide.find((n) => n["@type"] === "FAQPage");
  assert.ok(faq, "guide has no FAQPage schema");
  assert.ok(faq.mainEntity.length >= 3);
  const article = guide.find((n) => n["@type"] === "Article");
  assert.equal(article.author.name, "Khadija Bibi");

  // a quoted product must not advertise a price it does not have
  const quoted = parse(await (await render("/reviews/sage-x3")).text());
  const quotedProduct = quoted.find((n) => n["@type"] === "Product");
  assert.equal(quotedProduct.offers, undefined, "a quoted product must not declare an offer");
});

test("the newsletter strip is quiet, and on every page", async () => {
  for (const path of ["/", "/about", "/reviews/xero", "/guides/paye-uif-sdl-explained"]) {
    const html = await (await render(path)).text();
    const strip = html.indexOf('class="newsletterStrip"');
    const footer = html.indexOf('class="siteFooter"');
    assert.ok(strip > -1, `${path} has no newsletter strip`);
    assert.ok(footer > -1, `${path} has no footer`);
    assert.ok(strip < footer, `${path} renders the newsletter after the footer`);

    // the heavy treatment is gone for good
    for (const gone of ["newsletterBand", "newsletterPanel", "newsletterCard", "newsletterArt", "newsletter-1"]) {
      assert.equal(html.includes(gone), false, `${path} still carries ${gone}`);
    }

    const text = textOf(html);
    assert.match(text, /One useful email a month/);
    assert.match(text, /Published by Khadija Bibi, Cape Town, South Africa/);
    for (const label of ["Navigation", "Legal", "Publication", "Contact"]) {
      assert.match(text, new RegExp(label), `${path} footer is missing ${label}`);
    }
  }

  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  // the footer artwork stays; the strip has none of its own
  assert.ok(existsSync(new URL("../public/new-footer.png", import.meta.url)));
  assert.match(css, /url\("\/new-footer\.png"\)/);

  const stripRule = css.slice(css.indexOf(".newsletterStrip {"), css.indexOf(".newsletterStrip {") + 400);
  assert.doesNotMatch(stripRule, /gradient|background-image|box-shadow/, "the strip should stay flat");

  // exactly one footer rule, so an old one cannot override the current one
  const footerBlocks = (css.match(/^\.siteFooter \{/gm) ?? []).length;
  assert.equal(footerBlocks, 1, `expected one .siteFooter rule, found ${footerBlocks}`);
  assert.doesNotMatch(css.slice(css.indexOf(".siteFooter {"), css.indexOf(".siteFooter {") + 500), /margin-top/);
});

test("the publication name and address are consistent everywhere", async () => {
  const { siteConfig, publisher } = await import(new URL("../app/config/site.ts", import.meta.url).href);

  assert.equal(siteConfig.name, "Select Soft");
  assert.equal(publisher.tradingAs, siteConfig.name);
  assert.equal(publisher.email, siteConfig.email);
  assert.match(siteConfig.email, /@selectsoft\.co\.za$/);
  assert.match(siteConfig.url, /selectsoft\.co\.za$/);

  // nothing may still carry the previous name or address
  const files = [
    "app/config/site.ts", "app/layout.tsx", "app/about/page.tsx",
    "app/privacy/page.tsx", "app/terms/page.tsx", "app/lib/data.ts",
    "app/components/site-chrome.tsx", "docs/forms-setup.md",
  ];
  for (const file of files) {
    const source = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
    for (const stale of ["Software Select ZA", "softwareselectza", "select za"]) {
      assert.equal(
        source.toLowerCase().includes(stale.toLowerCase()),
        false,
        `${file} still contains "${stale}"`,
      );
    }
  }

  // and nothing stale reaches a reader
  for (const path of ["/", "/about", "/privacy", "/terms", "/contact", "/reviews/xero"]) {
    const html = await (await render(path)).text();
    assert.equal(html.includes("softwareselectza"), false, `${path} serves the old address`);
    assert.equal(html.includes("Software Select ZA"), false, `${path} serves the old name`);
    assert.match(textOf(html), /Select Soft/, `${path} does not name the publication`);
  }

  // the new domain drives the sitemap and the publisher schema
  const sitemap = await (await render("/sitemap.xml")).text();
  assert.match(sitemap, /https:\/\/selectsoft\.co\.za/);
  assert.doesNotMatch(sitemap, /softwareselectza/);
});

test("contact routes are role based, real and consistent", async () => {
  const { contactRoutes, contactEmail, publisher, siteConfig } = await import(
    new URL("../app/config/site.ts", import.meta.url).href
  );

  assert.ok(contactRoutes.length >= 4, "expected at least four contact routes");
  const seen = new Set();
  for (const route of contactRoutes) {
    assert.match(route.address, /^[a-z]+@selectsoft\.co\.za$/, `${route.address} is not on the domain`);
    assert.equal(seen.has(route.address), false, `${route.address} is listed twice`);
    seen.add(route.address);
    assert.ok(route.purpose.length > 2, "a route has no purpose");
    assert.ok(route.detail.split(/\s+/).length >= 10, `${route.address} has no real explanation`);
  }

  // the general address must be one of the published routes
  assert.ok(seen.has(publisher.email), "the publisher email is not a published route");
  assert.equal(publisher.email, siteConfig.email);

  // editorial and commercial must be different inboxes, which is the whole point
  assert.notEqual(contactEmail.editorial, contactEmail.commercial);
  assert.notEqual(contactEmail.privacy, contactEmail.commercial);

  // the contact page lists every route with its purpose
  const contact = textOf(await (await render("/contact")).text());
  for (const route of contactRoutes) {
    assert.ok(contact.includes(route.address), `contact page omits ${route.address}`);
    assert.match(contact, new RegExp(route.purpose), `contact page omits the ${route.purpose} label`);
  }

  // the right address is quoted in the right policy
  const privacy = textOf(await (await render("/privacy")).text());
  assert.ok(privacy.includes(contactEmail.privacy));
  assert.match(privacy, /Information Officer/);

  const disclosure = textOf(await (await render("/affiliate-disclosure")).text());
  assert.ok(disclosure.includes(contactEmail.commercial));

  const policy = textOf(await (await render("/editorial-policy")).text());
  assert.ok(policy.includes(contactEmail.corrections));

  const about = textOf(await (await render("/about")).text());
  for (const address of Object.values(contactEmail)) {
    assert.ok(about.includes(address), `about page omits ${address}`);
  }

  // and the footer carries the routes a reader or vendor needs, on every page
  for (const path of ["/", "/reviews/xero"]) {
    const text = textOf(await (await render(path)).text());
    assert.ok(text.includes(contactEmail.editorial), `${path} footer omits the editorial address`);
    assert.ok(text.includes(contactEmail.corrections), `${path} footer omits the corrections address`);
    assert.ok(text.includes(contactEmail.commercial), `${path} footer omits the commercial address`);
  }
});
