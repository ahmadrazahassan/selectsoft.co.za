import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = {
  alternates: { canonical: "/methodology" }, title: "Review methodology" };

export default function MethodologyPage() {
  return <InfoPage eyebrow="Our method" title="How we evaluate software." intro="A score is only useful when the thinking behind it is visible. Our method starts with the work a product is supposed to improve." sections={[
    { title: "Choose the right frame", paragraphs: ["We define the category, the likely buyer and the working problem before assessing a product. Accounting software is not judged by the same priorities as a CRM or a point of sale system."] },
    { title: "Gather dependable evidence", paragraphs: ["Research begins with official product information, current help material, security and privacy documentation, public pricing and local partner information. When we complete a structured trial or interview, the review says so directly."] },
    { title: "Assess the daily work", paragraphs: ["Our core criteria are everyday use, useful features, value, support and South African fit. Each category adds specific questions, such as statutory payroll work, bank feeds, inventory control or implementation depth."] },
    { title: "Write the verdict before the score", paragraphs: ["The verdict explains who should consider the product and where caution is sensible. The score summarises that judgement. It does not replace it and it is never changed because of an affiliate or commercial relationship."] },
    { title: "Keep the work current", paragraphs: ["Important reviews are checked when pricing, ownership, local availability or major product capability changes. Every review displays its most recent editorial date and links to a correction route."] },
  ]} />;
}
