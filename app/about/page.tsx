import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";
import { contactEmail, publisher } from "../config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/about" }, title: "About the publication" };

export default function AboutPage() {
  return <InfoPage eyebrow="About us" title="A calmer way to choose software." intro="Select Soft is an independent editorial publication for South African businesses. We turn complicated product information into a decision a working team can understand." sections={[
    { title: "Why we exist", paragraphs: ["Software decisions often begin with a long list of features and end with a question nobody has answered: will this work here, for this team, at this cost? We created the publication to keep that question in view.", "Our work is written for the person preparing a shortlist, the colleague approving the budget and the team expected to use the product every day."] },
    { title: "What we cover", paragraphs: ["We review accounting, payroll, CRM, ERP, project, commerce, marketing and customer support software. We also publish comparisons and practical guides about implementation, pricing, data and local context."] },
    { title: "How we remain useful", paragraphs: ["Editorial judgement is separate from commercial activity. A vendor may correct a factual error, but cannot approve a verdict or purchase a score. Every commercial link is disclosed clearly."] },
    { title: "How to reach us", paragraphs: [`${publisher.tradingAs} is published by ${publisher.legalName} from ${publisher.location}. Editorial questions go to ${contactEmail.editorial} and factual corrections to ${contactEmail.corrections}.`, `Commercial enquiries are handled separately at ${contactEmail.commercial}, and privacy requests under POPIA reach the Information Officer at ${contactEmail.privacy}.`] },
  ]} />;
}
