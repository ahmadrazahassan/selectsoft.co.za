"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Comparison, Product } from "../lib/data";

export function CompareBuilder({
  products,
  comparisons,
  compact = false,
}: {
  products: Product[];
  comparisons: Comparison[];
  compact?: boolean;
}) {
  const router = useRouter();
  const [first, setFirst] = useState(products[0]?.slug ?? "");
  const [second, setSecond] = useState(products[1]?.slug ?? "");
  const [error, setError] = useState("");

  function build() {
    if (!first || !second) {
      setError("Choose two products to continue.");
      return;
    }
    if (first === second) {
      setError("Choose two different products.");
      return;
    }
    const published = comparisons.find(
      (comparison) =>
        (comparison.productA === first && comparison.productB === second) ||
        (comparison.productA === second && comparison.productB === first),
    );
    setError("");
    if (published) {
      router.push(`/compare/${published.slug}`);
      return;
    }
    router.push(`/compare?first=${first}&second=${second}&view=data`);
  }

  return (
    <div className={compact ? "compareBuilder compareBuilderCompact" : "compareBuilder"}>
      <label>
        <span>First product</span>
        <select value={first} onChange={(event) => setFirst(event.target.value)}>
          {products.map((product) => <option value={product.slug} key={product.slug}>{product.name}</option>)}
        </select>
      </label>
      <span className="versus">versus</span>
      <label>
        <span>Second product</span>
        <select value={second} onChange={(event) => setSecond(event.target.value)}>
          {products.map((product) => <option value={product.slug} key={product.slug}>{product.name}</option>)}
        </select>
      </label>
      <button type="button" onClick={build}>Build comparison</button>
      {error && <p className="compareError" role="alert">{error}</p>}
    </div>
  );
}
