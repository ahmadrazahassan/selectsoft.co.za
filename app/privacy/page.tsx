import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return <InfoPage eyebrow="Privacy" title="Your information should stay understandable." intro="This page explains the information the publication expects to receive and how it is used. The final policy should be reviewed by South African counsel before public launch." sections={[
    { title: "Information you provide", paragraphs: ["We receive the information entered into newsletter and contact forms. This may include a name, email address, company context and the content of a message."] },
    { title: "Why it is used", paragraphs: ["Contact details are used to answer an enquiry or deliver a requested editorial newsletter. They are not sold. Access is limited to people who need it for that purpose."] },
    { title: "Retention and choices", paragraphs: ["Contact records should be kept only as long as required for the enquiry and legitimate publication records. Newsletter readers can unsubscribe at any time. Privacy requests can be sent through the contact page."] },
    { title: "Service providers", paragraphs: ["The site uses hosting and database providers to operate. Their final details, locations and processing terms must be recorded here before launch."] },
  ]} />;
}
