"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPricing, type Product } from "../lib/data";
import { PriceBadges, PriceTag, ProductMark } from "./editorial";

export function DirectoryClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const categories = ["All categories", ...Array.from(new Set(products.map((product) => product.shortCategory)))];
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "All categories" || product.shortCategory === category;
      const matchesQuery = !term || `${product.name} ${product.vendor} ${product.verdict}`.toLowerCase().includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [products, query, category]);

  return (
    <div className="directoryTool">
      <div className="directoryControls">
        <label>
          <span>Search software</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Product or vendor" type="search" />
        </label>
        <label>
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <p className="resultCount" role="status">{visible.length} products</p>
      {visible.length ? (
        <div className="softwareList">
          {visible.map((product) => (
            <article className="softwareRow" key={product.slug}>
              <ProductMark product={product} />
              <div>
                <p className="cardMeta">{product.shortCategory}</p>
                <h2><Link href={`/reviews/${product.slug}`}>{product.name}</Link></h2>
                <p>{product.verdict}</p>
                <span>Best for {product.bestFor}</span>
              </div>
              {(() => {
                const price = getPricing(product.slug);
                return price ? (
                  <div className="softwarePrice">
                    <PriceTag price={price} />
                    <PriceBadges price={price} />
                  </div>
                ) : null;
              })()}
              <div className="softwareActions">
                <Link className="btn btnSecondary btnCompact" href={`/reviews/${product.slug}`}>
                  Read review
                </Link>
                <a
                  className="btn btnPrimary btnCompact"
                  href={getPricing(product.slug)?.pricingUrl ?? product.sourceUrl}
                  rel="nofollow sponsored noopener noreferrer"
                  target="_blank"
                >
                  <span>Visit site</span>
                  <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="emptyState">
          <h2>No close match yet</h2>
          <p>Try a broader product name or show every category.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("All categories"); }}>Clear the search</button>
        </div>
      )}
    </div>
  );
}
