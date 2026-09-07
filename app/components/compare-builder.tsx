"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeftRight } from "lucide-react";
import type { Product } from "../lib/data";
import { VS } from "../lib/compare";

/* The picker builds the canonical pair URL itself, so any two products lead to
 * a real comparison page rather than a query string and an apology. Slugs are
 * sorted the same way pairSlug sorts them on the server. */
function slugFor(first: string, second: string, writtenSlugs: Record<string, string>) {
  const key = [first, second].sort().join(VS);
  return writtenSlugs[key] ?? key;
}

export function CompareBuilder({
  products,
  writtenSlugs = {},
  compact = false,
}: {
  products: Product[];
  /** Sorted pair key to the slug of a written comparison, where one exists. */
  writtenSlugs?: Record<string, string>;
  compact?: boolean;
}) {
  const router = useRouter();
  const [first, setFirst] = useState(products[0]?.slug ?? "");
  const [second, setSecond] = useState(products[1]?.slug ?? "");
  const [error, setError] = useState("");

  const grouped = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const product of products) {
      map.set(product.category, [...(map.get(product.category) ?? []), product]);
    }
    return [...map.entries()];
  }, [products]);

  const a = products.find((product) => product.slug === first);
  const b = products.find((product) => product.slug === second);
  const crossCategory = Boolean(a && b && a.category !== b.category);

  function build() {
    if (!first || !second) {
      setError("Choose two products to continue.");
      return;
    }
    if (first === second) {
      setError("Choose two different products.");
      return;
    }
    setError("");
    router.push(`/compare/${slugFor(first, second, writtenSlugs)}`);
  }

  function swap() {
    setFirst(second);
    setSecond(first);
  }

  const options = grouped.map(([category, list]) => (
    <optgroup label={category} key={category}>
      {list.map((product) => (
        <option value={product.slug} key={product.slug}>
          {product.name}
        </option>
      ))}
    </optgroup>
  ));

  return (
    <div className={compact ? "compareBuilder compareBuilderCompact" : "compareBuilder"}>
      <div className="compareBuilderRow">
        <label>
          <span>First product</span>
          <select value={first} onChange={(event) => setFirst(event.target.value)}>
            {options}
          </select>
        </label>

        <button
          type="button"
          className="compareSwap"
          onClick={swap}
          aria-label="Swap the two products"
          title="Swap"
        >
          <ArrowLeftRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>

        <label>
          <span>Second product</span>
          <select value={second} onChange={(event) => setSecond(event.target.value)}>
            {options}
          </select>
        </label>

        <button type="button" className="btn btnPrimary compareGo" onClick={build}>
          <span>Compare</span>
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      {error && (
        <p className="compareError" role="alert">
          {error}
        </p>
      )}

      {!error && crossCategory && a && b && (
        <p className="compareHint">
          {a.name} is {a.shortCategory.toLowerCase()} software and {b.name} is{" "}
          {b.shortCategory.toLowerCase()}. We will still set them side by side, but
          most teams end up buying both rather than choosing between them.
        </p>
      )}
    </div>
  );
}
