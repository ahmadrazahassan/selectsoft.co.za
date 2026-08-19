import { guides, products } from "../lib/data";
import { siteConfig } from "../config/site";

function escape(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

export async function GET() {
  const items = [
    ...products.slice(0, 6).map((product) => ({ title: `${product.name} review`, description: product.verdict, url: `${siteConfig.url}/reviews/${product.slug}`, date: new Date("2026-08-19").toUTCString() })),
    ...guides.map((guide) => ({ title: guide.title, description: guide.excerpt, url: `${siteConfig.url}/guides/${guide.slug}`, date: new Date("2026-08-16").toUTCString() })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(siteConfig.name)}</title><link>${siteConfig.url}</link><description>${escape(siteConfig.description)}</description>${items.map((item) => `<item><title>${escape(item.title)}</title><link>${item.url}</link><guid>${item.url}</guid><pubDate>${item.date}</pubDate><description>${escape(item.description)}</description></item>`).join("")}</channel></rss>`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
