import type { Metadata } from "next";
import { DM_Sans, Inter_Tight } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { siteConfig } from "./config/site";

const dmSans = DM_Sans({
  variable: "--fontBody",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--fontDisplay",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : siteConfig.url;
  return {
    metadataBase: new URL(origin),
    title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
    description: siteConfig.description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      type: "website",
      title: siteConfig.name,
      description: siteConfig.description,
      url: origin,
      locale: "en_ZA",
      images: [{ url: `${origin}/og.png`, width: 1728, height: 909, alt: "Software Select ZA, choose software with a clear head" }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA">
      <body className={`${dmSans.variable} ${interTight.variable}`}>
        <a className="skipLink" href="#mainContent">
          Skip to content
        </a>
        <div id="mainContent">{children}</div>
      </body>
    </html>
  );
}
