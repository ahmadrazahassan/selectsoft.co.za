import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";
import { publisher } from "../config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms",
  description:
    "The terms on which Select Soft publishes independent software reviews, comparisons and buying guidance for South African businesses.",
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Terms"
      title="Using this publication."
      intro={`${publisher.tradingAs} publishes independent general information about business software. It is not accounting, legal, tax or implementation advice, and it is not a substitute for advice about your own business.`}
      effective={publisher.policiesEffective}
      footNote={`Published by ${publisher.legalName}, ${publisher.location}. Questions about these terms can be sent to ${publisher.email}.`}
      sections={[
        {
          title: "Who publishes this",
          paragraphs: [
            `This website is owned and published by ${publisher.legalName}, trading as ${publisher.tradingAs}, from ${publisher.location}. Correspondence of any kind can be sent to ${publisher.email}.`,
            "These terms are governed by the law of the Republic of South Africa.",
          ],
        },
        {
          title: "Editorial information changes",
          paragraphs: [
            "Software pricing, packaging, availability and features change without notice. Every price we publish carries the date we last read it off the vendor's own pricing page, and that date is displayed beside the figure so you can judge how current it is.",
            "Confirm current pricing, contract terms, VAT treatment and technical requirements directly with the vendor before you buy. We are not a party to any contract you enter into with a vendor.",
          ],
        },
        {
          title: "Scores and verdicts are opinion",
          paragraphs: [
            "A score is our editorial opinion, formed by the method published on our methodology page. It is honestly held, it is explained, and it is one input into your decision rather than a recommendation you should follow on its own.",
            "Every organisation remains responsible for its own evaluation, security review, compliance assessment, procurement process and contract.",
          ],
        },
        {
          title: "How we earn money",
          paragraphs: [
            "Some outbound links to vendors are affiliate links, and we may earn a commission if you subscribe or buy after following one. The price you pay is not affected.",
            "A commercial relationship cannot buy coverage, change a score, alter a verdict or remove a criticism. Our full statement is on the commercial disclosure page, and every commercial link is labelled near the point of action.",
          ],
        },
        {
          title: "Limits on our liability",
          paragraphs: [
            "We take care to be accurate, but we do not warrant that everything on this site is complete, current or free of error. To the extent the law allows, we are not liable for loss arising from a decision taken in reliance on this publication.",
            "Nothing in these terms limits any right you have under the Consumer Protection Act 68 of 2008 or other law that cannot be excluded by agreement.",
          ],
        },
        {
          title: "Corrections",
          paragraphs: [
            "If something here is wrong, tell us and send whatever evidence you have. We check it against the primary source, correct what is confirmed, and update the editorial date on the page when the change is material.",
            "Vendors are welcome to submit corrections of fact on the same basis as readers. A correction request is not an opportunity to revise a verdict.",
          ],
        },
        {
          title: "Using our work",
          paragraphs: [
            "You may read our work, quote it briefly with attribution and a link, and share links to it freely.",
            "Republishing substantial parts of our editorial work, scraping it in bulk, using it to train a model, interfering with the site or attempting unauthorised access to the editorial workspace is not permitted.",
            "Product names, logos and trade marks shown on this site belong to their owners and are used to identify the products under discussion. Their presence does not imply any endorsement of this publication by those owners.",
          ],
        },
      ]}
    />
  );
}
