"use client";

import { useEffect, useState, type ReactNode } from "react";

export function ScrollHeaderShell({ children }: { children: ReactNode }) {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let frame = 0;

    const updateHeader = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setIsAtTop(window.scrollY <= 12));
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeader);
    };
  }, []);

  return (
    <header className={`siteHeader${isAtTop ? "" : " siteHeaderFloat"}`}>
      {children}
    </header>
  );
}
