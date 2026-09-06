import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";
import { contactEmail, publisher } from "../config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy",
  description:
    "How Select Soft collects, uses, shares and retains personal information, and how to exercise your rights under POPIA.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Privacy"
      title="Your information should stay understandable."
      intro={`This policy explains what personal information ${publisher.tradingAs} collects, why, who it reaches and how long it is kept. It is written to the Protection of Personal Information Act 4 of 2013.`}
      effective={publisher.policiesEffective}
      footNote={`Questions about this policy, or a request to see, correct or delete your information, can be sent to ${publisher.informationOfficer} at ${contactEmail.privacy}.`}
      sections={[
        {
          title: "Who is responsible",
          paragraphs: [
            `${publisher.tradingAs} is published by ${publisher.legalName} from ${publisher.location}. ${publisher.legalName} is the responsible party for the personal information described here.`,
            `The Information Officer is ${publisher.informationOfficer}, contactable at ${contactEmail.privacy}. Please use that address for any privacy question, request or complaint so that it reaches the right person directly.`,
          ],
        },
        {
          title: "What we collect, and only that",
          paragraphs: [
            "If you subscribe to the newsletter we collect your email address, the date you consented and the fact that you consented through this website. Nothing else.",
            "If you write to us through the contact form we collect your name, email address, the topic you selected, the product or vendor you named if you named one, and the content of your message.",
            "Our hosting provider records ordinary server logs, which include IP addresses, for security and to keep the site available. We do not use those logs to build a profile of you.",
            "We do not ask for identity numbers, payment details or financial information anywhere on this site, and you should never send them to us.",
          ],
        },
        {
          title: "Why we use it, and on what basis",
          paragraphs: [
            "A newsletter address is used to send the monthly editorial note you asked for. The basis is your consent, and you may withdraw it at any time using the unsubscribe link in any issue or by writing to us.",
            "A contact message is used to answer your enquiry, act on a correction or follow up on a factual point. The basis is our legitimate interest in replying to someone who has written to us, and in keeping an accurate record of corrections to published work.",
            "We do not sell personal information, we do not rent it, and we do not share it for anyone else's marketing.",
          ],
        },
        {
          title: "Cookies and tracking, of which there is very little",
          paragraphs: [
            "This site sets no advertising cookies and runs no analytics, no tag manager, no advertising pixel and no session recording. You are not tracked across the web because you read a review here.",
            "The only cookies this site sets are the sign in cookies for the private editorial workspace, which apply to us and not to readers.",
            "When you click through to a vendor from one of our links, that vendor and its affiliate network may set their own cookies to record that the visit came from us. That is how a commission is attributed. Once you have left this site you are on the vendor's website and their privacy policy applies, not ours.",
          ],
        },
        {
          title: "Who else can see it",
          paragraphs: [
            "Cloudflare hosts and serves the site, and processes server logs on our behalf.",
            "Supabase stores newsletter subscriptions and contact messages on our behalf.",
            "Typefaces are loaded from Google Fonts, which means Google receives the IP address of your browser when a page loads. We use no other third party asset on our public pages.",
            "These providers act only on our instructions. Because they operate internationally, your information may be processed outside South Africa. Where that happens we rely on section 72 of POPIA and on the contractual terms these providers offer, which require a level of protection comparable to our own law.",
          ],
        },
        {
          title: "How long we keep it",
          paragraphs: [
            "Newsletter subscriptions are kept until you unsubscribe, and the record of your unsubscribe is kept afterwards so that we do not contact you again by mistake.",
            "Contact messages are kept for 24 months from your last message, and then deleted. Where a message led to a published correction, we keep the correction record for as long as the corrected article remains online, because a reader is entitled to see that the record was changed and why.",
            "Server logs are kept for the short period our hosting provider retains them for security purposes.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "Under POPIA you may ask what personal information we hold about you, ask us to correct or delete it, object to our use of it, and withdraw a consent you have given. Write to the Information Officer and we will respond.",
            "There is no charge for a reasonable request. We may need to confirm who you are before acting, so that we do not disclose your information to somebody else.",
            "If you are not satisfied with our answer you may complain to the Information Regulator of South Africa, whose contact details are published at inforegulator.org.za.",
          ],
        },
        {
          title: "Children and changes",
          paragraphs: [
            "This publication is written for people making business software decisions and is not directed at children. We do not knowingly collect information from anyone under 18.",
            "If this policy changes materially we will change the effective date above and, where the change affects how we use information you have already given us, tell newsletter subscribers directly.",
          ],
        },
      ]}
    />
  );
}
