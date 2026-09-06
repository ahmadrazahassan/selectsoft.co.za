import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";
import { contactEmail } from "../config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/editorial-policy" }, title: "Editorial policy" };

export default function EditorialPolicyPage() {
  return <InfoPage eyebrow="Editorial standards" title="Useful work depends on trust." intro="Our editors decide what to cover, how to assess it and what the final verdict says. Commercial relationships do not enter that process." sections={[
    { title: "Independence", paragraphs: ["Vendors cannot buy a review, score, category position or preferred verdict. Commercial teams do not edit editorial conclusions."] },
    { title: "Sources and testing", paragraphs: ["We distinguish public research from structured trials and interviews. A review never claims direct testing when it has not happened. Product claims are checked against primary sources wherever possible."] },
    { title: "Corrections", paragraphs: [`Readers and vendors can report a factual error at ${contactEmail.corrections}, or through the contact page. We review the supporting evidence, correct confirmed errors and update the editorial date when the change is material.`, "A correction request is not an opportunity to revise a verdict. We will change a fact that is wrong and we will say that we changed it."] },
    { title: "Use of writing tools", paragraphs: ["Editors may use software to organise notes, check structure or identify gaps. A person remains responsible for every factual claim, judgement and published sentence."] },
  ]} />;
}
