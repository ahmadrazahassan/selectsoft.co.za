export const siteConfig = {
  name: "Select Soft",
  shortName: "Select Soft",
  description:
    "Independent software reviews and comparisons for South African businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://selectsoft.co.za",
  email: "editor@selectsoft.co.za",
  location: "South Africa",
} as const;

/* ---------------------------------------------------------------------------
 * Who publishes this.
 *
 * A reader, a vendor and a commercial partner should all be able to find out
 * who stands behind the work and who to hold to it. These details appear in
 * the footer, on the contact page and in the privacy policy, from one place,
 * so they cannot fall out of step with each other.
 * ------------------------------------------------------------------------ */
export const publisher = {
  legalName: "Khadija Bibi",
  tradingAs: "Select Soft",
  location: "Cape Town, South Africa",
  country: "South Africa",
  email: "editor@selectsoft.co.za",
  /** POPIA section 55 requires a named Information Officer. */
  informationOfficer: "Khadija Bibi",
  /** The date the current privacy and terms text took effect. */
  policiesEffective: "3 September 2026",
} as const;
