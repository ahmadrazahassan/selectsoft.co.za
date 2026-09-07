import type { MetadataRoute } from "next";
import { comparisons, getPricing, guides, liveCategories, products } from "./lib/data";
import { categoryPairs, hasCheckedPrice, hasScoredDimensions } from "./lib/compare";
import { siteConfig } from "./config/site";

/**
 * Only pages that exist and carry content are submitted. Empty categories are
 * excluded because `liveCategories` already excludes them, and lastModified is
 * taken from the editorial or pricing date we actually published rather than
 * being stamped with today, which would tell a crawler the whole site changed
 * every time it is built.
 */
const asDate = (value: string | undefined) => {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPages: { path: string; priority: number; frequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, frequency: "weekly" },
    { path: "/reviews", priority: 0.9, frequency: "weekly" },
    { path: "/software", priority: 0.9, frequency: "weekly" },
    { path: "/guides", priority: 0.9, frequency: "weekly" },
    { path: "/compare", priority: 0.8, frequency: "monthly" },
    { path: "/search", priority: 0.4, frequency: "yearly" },
    { path: "/about", priority: 0.6, frequency: "yearly" },
    { path: "/methodology", priority: 0.7, frequency: "yearly" },
    { path: "/editorial-policy", priority: 0.5, frequency: "yearly" },
    { path: "/affiliate-disclosure", priority: 0.5, frequency: "yearly" },
    { path: "/contact", priority: 0.5, frequency: "yearly" },
    { path: "/authors/khadija-bibi", priority: 0.6, frequency: "monthly" },
    { path: "/privacy", priority: 0.3, frequency: "yearly" },
    { path: "/terms", priority: 0.3, frequency: "yearly" },
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${base}${page.path}`,
      changeFrequency: page.frequency,
      priority: page.priority,
    })),
    ...liveCategories.map((item) => ({
      url: `${base}/software/${item.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((item) => ({
      url: `${base}/reviews/${item.slug}`,
      lastModified: asDate(getPricing(item.slug)?.checkedOn ?? item.reviewed),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...guides.map((item) => ({
      url: `${base}/guides/${item.slug}`,
      lastModified: asDate(item.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Every same category pair is a real page. A pair with a written verdict
    // keeps that slug, so nothing is listed twice. Pairs where both sides have
    // been scored and priced rank above the thinner ones.
    ...categoryPairs().map((pair) => {
      const deep =
        hasScoredDimensions(pair.a.slug) &&
        hasScoredDimensions(pair.b.slug) &&
        hasCheckedPrice(pair.a.slug) &&
        hasCheckedPrice(pair.b.slug);
      const isWritten = comparisons.some((item) => item.slug === pair.slug);
      return {
        url: `${base}/compare/${pair.slug}`,
        changeFrequency: "monthly" as const,
        priority: isWritten ? 0.8 : deep ? 0.7 : 0.5,
      };
    }),
  ];
}
