import type { MetadataRoute } from "next";
import { categories, comparisons, guides, products } from "./lib/data";
import { siteConfig } from "./config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/software", "/reviews", "/compare", "/guides", "/about", "/methodology", "/editorial-policy", "/affiliate-disclosure", "/contact", "/privacy", "/terms"];
  return [
    ...paths.map((path) => ({ url: `${siteConfig.url}${path}`, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.7 })),
    ...categories.map((item) => ({ url: `${siteConfig.url}/software/${item.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...products.map((item) => ({ url: `${siteConfig.url}/reviews/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...comparisons.map((item) => ({ url: `${siteConfig.url}/compare/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...guides.map((item) => ({ url: `${siteConfig.url}/guides/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
