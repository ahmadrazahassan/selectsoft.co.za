import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = { title: "Affiliate disclosure" };

export default function AffiliateDisclosurePage() {
  return <InfoPage eyebrow="Commercial disclosure" title="How commercial links work." intro="Some links may earn the publication a commission when a reader chooses to visit or buy from a vendor. The price paid by the reader does not change." sections={[
    { title: "Editorial comes first", paragraphs: ["A commercial relationship cannot secure coverage, change a score, influence a verdict or remove a criticism. Products without a commercial relationship are assessed in the same way."] },
    { title: "Clear labelling", paragraphs: ["Commercial links are identified near the action. A normal source link remains a source link and is not treated as an affiliate relationship."] },
    { title: "A simple test", paragraphs: ["If we would not recommend a product without a commission, we do not recommend it because a commission exists."] },
  ]} />;
}
