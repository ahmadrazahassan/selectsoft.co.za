import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return <InfoPage eyebrow="Terms" title="Using this publication." intro="The publication offers independent general information, not accounting, legal, tax or implementation advice. These terms require legal review before public launch." sections={[
    { title: "Editorial information", paragraphs: ["Product details can change after publication. Readers should confirm current pricing, availability, contract terms and technical requirements directly with a vendor before purchase."] },
    { title: "Your decision", paragraphs: ["Reviews and comparisons are one input into a software decision. Every organisation remains responsible for its own evaluation, security review, compliance work and contract."] },
    { title: "Acceptable use", paragraphs: ["You may read and share links to the publication. Republishing substantial editorial work, interfering with the site or attempting unauthorised access is not permitted."] },
  ]} />;
}
