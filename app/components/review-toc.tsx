"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/**
 * Sticky contents rail. Tracks which section is on screen so the reader always
 * knows where they are in a long review.
 */
export function ReviewToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The heading nearest the top of the viewport wins, so the rail does
        // not flicker between two sections that are both partly visible.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="reviewToc">
      <p>On this page</p>
      <nav aria-label="Sections of this review">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={item.id === activeId ? "reviewTocActive" : undefined}
            aria-current={item.id === activeId ? "true" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
