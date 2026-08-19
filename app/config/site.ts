export const siteConfig = {
  name: "Software Select ZA",
  shortName: "Select ZA",
  description:
    "Independent software reviews and comparisons for South African businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://softwareselectza.co.za",
  email: "editor@softwareselectza.co.za",
  location: "South Africa",
} as const;
