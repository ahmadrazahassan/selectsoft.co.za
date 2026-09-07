import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { publisher, siteConfig, siteVerification } from "./config/site";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : siteConfig.url;
  return {
    metadataBase: new URL(origin),
    title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
    description: siteConfig.description,
    icons: {
      // The mark itself, on transparency. The SVG carries a light and a dark
      // copy so the tab icon stays visible on either browser chrome.
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      title: siteConfig.name,
      description: siteConfig.description,
      url: origin,
      locale: "en_ZA",
      images: [{ url: `${origin}/og.png`, width: 1728, height: 909, alt: "Select Soft, choose software with a clear head" }],
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
      <head>
        {/* Impact checks ownership by reading `value`, not `content`, so this
            tag is written exactly as their console specifies. It sits in the
            root layout rather than the homepage alone, so a re-verification
            against any URL on the site still passes. */}
        <meta name="impact-site-verification" value={siteVerification.impact} />
        {/* next/font emits no CSS under vinext, so the families are linked
            directly and the custom properties are declared in globals.css. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- root layout, applies site wide */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300..700&family=Inter+Tight:wght@400..700&family=Nunito+Sans:opsz,wght@6..12,300..800&display=swap"
        />
        {/* Publisher identity and site search, declared once for the whole site. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteConfig.url}#organization`,
                  name: siteConfig.name,
                  url: siteConfig.url,
                  email: publisher.email,
                  logo: `${siteConfig.url}/favicon-512.png`,
                  founder: { "@type": "Person", name: publisher.legalName },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Cape Town",
                    addressCountry: "ZA",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteConfig.url}#website`,
                  name: siteConfig.name,
                  url: siteConfig.url,
                  publisher: { "@id": `${siteConfig.url}#organization` },
                  inLanguage: "en-ZA",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${siteConfig.url}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <a className="skipLink" href="#mainContent">
          Skip to content
        </a>
        <div id="mainContent">{children}</div>
      </body>
    </html>
  );
}
