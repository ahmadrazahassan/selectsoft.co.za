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
  /** The general address. Everything else routes to a named purpose below. */
  email: "editor@selectsoft.co.za",
  /** POPIA section 55 requires a named Information Officer. */
  informationOfficer: "Khadija Bibi",
  /** The date the current privacy and terms text took effect. */
  policiesEffective: "3 September 2026",
} as const;

/* ---------------------------------------------------------------------------
 * Where to write.
 *
 * Role addresses rather than one inbox, and commercial deliberately separated
 * from editorial. That separation is not decoration: the editorial policy says
 * commercial relationships cannot reach editorial decisions, and a reader or a
 * vendor should be able to see that in the addresses themselves.
 *
 * Every address here must exist as a real mailbox or alias on the domain
 * before launch. An address published on a contact page that bounces is worse
 * than not publishing it.
 * ------------------------------------------------------------------------ */
export type ContactRoute = {
  purpose: string;
  address: string;
  detail: string;
};

export const contactRoutes: readonly ContactRoute[] = [
  {
    purpose: "Editorial",
    address: "editor@selectsoft.co.za",
    detail:
      "Questions about our work, product information from vendors, and anything that does not fit below.",
  },
  {
    purpose: "Corrections",
    address: "corrections@selectsoft.co.za",
    detail:
      "A factual error in something we have published. Send the evidence and we will check it against the primary source.",
  },
  {
    purpose: "Commercial",
    address: "commercial@selectsoft.co.za",
    detail:
      "Affiliate programmes, advertising and partnership enquiries. This inbox has no influence on scores, verdicts or coverage.",
  },
  {
    purpose: "Privacy",
    address: "privacy@selectsoft.co.za",
    detail:
      "POPIA requests, including access, correction and deletion. Reaches the Information Officer directly.",
  },
] as const;

const route = (purpose: string) => {
  const found = contactRoutes.find((item) => item.purpose === purpose);
  if (!found) throw new Error(`Unknown contact route: ${purpose}`);
  return found.address;
};

export const contactEmail = {
  editorial: route("Editorial"),
  corrections: route("Corrections"),
  commercial: route("Commercial"),
  privacy: route("Privacy"),
} as const;
