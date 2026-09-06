/* ---------------------------------------------------------------------------
 * Guide bodies.
 *
 * Every guide on this site used to render the same hardcoded article, which
 * meant several URLs served identical text. That is duplicate content and it
 * helps nobody, least of all a reader who clicked a specific headline. Each
 * guide now carries its own body, its own questions and its own links.
 *
 * House style applies here as it does in reviews.ts: no hyphens and no dashes
 * in prose. Where a figure set by SARS changes from year to year we explain the
 * mechanism and tell the reader to confirm the current number, rather than
 * publishing an amount that quietly goes stale.
 * ------------------------------------------------------------------------ */

export type GuideSection = { heading: string; paragraphs: string[] };
export type GuideFaq = { question: string; answer: string };

export type GuideBody = {
  /** The standfirst paragraph, set larger at the top of the article. */
  lead: string;
  /** Specific to this guide. Never generic buying advice. */
  takeaways: string[];
  sections: GuideSection[];
  /** Answered on the page, and marked up as FAQPage for search engines. */
  faqs: GuideFaq[];
  /** Product slugs. Rendered as links, which is also our internal linking. */
  relatedProducts: string[];
  relatedGuides: string[];
};

export const guideContent: Record<string, GuideBody> = {
  "choose-accounting-software-south-africa": {
    lead: "Most accounting software comparisons start with a feature table. That is the wrong end. Start with the work your business actually does every week, then find the ledger that makes that work shorter.",
    takeaways: [
      "Test bank feeds for your own accounts during the trial, because coverage varies by bank and account type",
      "No cloud ledger sold here ships a South African payroll, so budget for a second product",
      "Compare the standing price, not the introductory discount, because the discount never repeats",
    ],
    sections: [
      {
        heading: "Start with the week, not the feature list",
        paragraphs: [
          "Write down what actually happens in your finance week. Someone captures supplier invoices. Someone chases debtors. Someone reconciles a bank account. Someone produces a number that a manager uses to make a decision. Those four jobs are where your time goes, and they are what you are buying software to shorten.",
          "A feature comparison will tell you that every product does invoicing, reporting and bank reconciliation. All of them do. The difference is how many clicks each one takes for the work you repeat two hundred times a year, and you can only discover that by putting your own transactions through a trial.",
        ],
      },
      {
        heading: "Bank feeds decide more than any other single thing",
        paragraphs: [
          "A bank feed pulls your transactions into the ledger automatically so reconciliation becomes a review rather than a capture exercise. When it works, a month of reconciliation collapses into an afternoon. When it does not, you are back to importing statements by hand and you have paid a subscription for the privilege.",
          "Coverage in South Africa varies by bank and by account type. A feed that works for a current account at one bank may not cover a credit card or a second account at the same bank. This is the single most common unpleasant surprise in the first month, and it is entirely avoidable by connecting your own accounts during a free trial before you pay for anything.",
        ],
      },
      {
        heading: "Payroll is a separate purchase and a separate budget line",
        paragraphs: [
          "None of the cloud ledgers sold into this market ship a South African payroll that handles PAYE, UIF, SDL and the SARS submissions. Sage sells payroll as a separate product. Xero and QuickBooks expect you to pair them with something local such as SimplePay.",
          "That means the real monthly figure is the ledger plus the payroll plus, quite often, a document capture tool. A business comparing a R240 ledger against a R450 ledger while ignoring a R235 payroll on top of both is comparing the wrong numbers.",
        ],
      },
      {
        heading: "Ask your accountant before you decide, not after",
        paragraphs: [
          "Your accountant will work in this file every year. If they already know one product well, the cost of you choosing a different one shows up as their time, billed to you. It also shows up as friction every time something needs fixing.",
          "This is not a reason to hand the decision over. It is a reason to ask one question early. Which of these can you work in comfortably, and what changes for your fees if I choose the other one.",
        ],
      },
      {
        heading: "Price the second year",
        paragraphs: [
          "Introductory discounts in this market are large. Xero has run eighty percent off for three months and QuickBooks seventy percent off for six. Those offers make the first invoice a poor guide to what you will actually pay.",
          "Take the standing price, multiply by twelve, add the payroll, add any add on you know you will need, and compare that number. Then check the plan limits. Entry plans usually cap invoices or bills, and moving up a tier is the most common unplanned cost in year two.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which accounting software is most used by South African small businesses?",
        answer: "Sage and Xero dominate the cloud end, with QuickBooks Online a strong third and Zoho Books competitive on price. Sage Pastel remains very widely installed in established businesses, particularly where an accountant has worked in it for years.",
      },
      {
        question: "Do I need accounting software if my accountant does my books?",
        answer: "Usually yes, because the software is how the two of you share the same record. What changes is who does the daily capture. Ask your accountant whether they want you capturing invoices or simply sending documents, because the answer changes which plan you need.",
      },
      {
        question: "Can I change accounting software later?",
        answer: "Yes, but it costs time and it is easier at a year end than in the middle of a VAT period. Most products import contacts and a chart of accounts from CSV. Transaction history is the harder part and is often left in the old system in read only form.",
      },
    ],
    relatedProducts: ["sage-accounting", "xero", "quickbooks-online", "zoho-books"],
    relatedGuides: ["bank-feeds-south-africa", "sage-vs-xero-vs-quickbooks-south-africa", "what-your-accountant-needs"],
  },

  "questions-before-switching-payroll": {
    lead: "Payroll is the one system where a mistake is visible to every employee on the same day. Before you move, get straight answers to the questions that decide whether the first live run goes quietly.",
    takeaways: [
      "Ask who updates the software when legislation changes, and how quickly it has happened before",
      "Run at least one parallel payroll against your old system before you cut over",
      "Confirm the provider handles your bargaining council, if your industry has one",
    ],
    sections: [
      {
        heading: "Who keeps it legal when the rules change",
        paragraphs: [
          "Payroll software has one obligation above all others. When SARS changes a tax table, a UIF ceiling or a submission format, the software has to reflect that before your next run. Ask the provider directly how they handle it, and ask for an example from the last two years.",
          "The answer distinguishes a payroll product from a general HR tool with a payroll module attached. A local provider whose whole business is South African payroll has no choice but to keep up. An international product with a payroll feature may not treat a South African change as urgent.",
        ],
      },
      {
        heading: "What actually has to move",
        paragraphs: [
          "Employee master data, year to date figures, leave balances and any loan or savings deductions all have to arrive intact. Year to date figures matter most, because they drive the tax calculation for the rest of the year and the certificates at the end of it.",
          "Moving at the start of a tax year removes most of this problem, which is why March is the busiest month for payroll migrations in this country. If you must move mid year, confirm in writing that year to date balances can be imported rather than recaptured by hand.",
        ],
      },
      {
        heading: "Run it in parallel before you trust it",
        paragraphs: [
          "For at least one month, run the new payroll alongside the old one and compare every line for every employee. Not the totals, the lines. A difference of a few rand on one employee usually means a setting is wrong somewhere, and it will not stay a few rand.",
          "This is unglamorous and it is the single most effective thing you can do. Most payroll disasters are not caused by the software. They are caused by a setup assumption nobody checked before the first live run.",
        ],
      },
      {
        heading: "Ask about the awkward parts of your payroll",
        paragraphs: [
          "Every payroll has something unusual. Commission structures, shift allowances, travel allowances with a company car, medical aid tax credits for a large family, garnishee orders, or contributions to a bargaining council fund.",
          "Do not ask whether the product supports these in general. Ask the vendor to show you your own awkward case in a demonstration. A product that cannot demonstrate your commission structure will not learn to do it after you have paid.",
        ],
      },
      {
        heading: "Who answers when a run will not process",
        paragraphs: [
          "Payroll support is judged on one day of the month. Ask what the support hours are, whether they extend at month end, and how you reach a person rather than a ticket queue when a run has to go out this afternoon.",
          "Ask also whether support is provided by the vendor or by a reseller, because the two experiences can be very different and the answer is often not obvious from the website.",
        ],
      },
    ],
    faqs: [
      {
        question: "When is the best time to change payroll software?",
        answer: "The start of the tax year in March, because year to date figures start from zero and the migration is far simpler. The second best time is the start of a month after a full parallel run.",
      },
      {
        question: "Should a small business use payroll software or a bureau?",
        answer: "Below roughly five employees a bureau is often cheaper and removes the compliance burden. Above that, software usually wins on cost and on control, particularly if your payroll changes every month with overtime or commission.",
      },
      {
        question: "What happens to my IRP5 certificates if I switch mid year?",
        answer: "They are produced from year to date figures, so those must be complete in whichever system generates them. Confirm before you move whether the new provider will produce certificates covering the full year or only the part you ran in their system.",
      },
    ],
    relatedProducts: ["simplepay", "sage-business-cloud-payroll", "payspace", "sage-pastel-payroll"],
    relatedGuides: ["paye-uif-sdl-explained", "emp201-emp501-payroll-software", "bargaining-council-payroll"],
  },

  "crm-pricing-explained": {
    lead: "A CRM quote looks simple until you count what sits outside the per seat figure. Contact tiers, onboarding, automation limits and the cost of keeping the data clean are where the real number lives.",
    takeaways: [
      "Count every seat you will actually need, including managers who only read reports",
      "Check what the free tier stops doing, because that is what you will be upgrading for",
      "Annual billing is the norm at the advertised price, so the real commitment is a year",
    ],
    sections: [
      {
        heading: "The seat count is bigger than you think",
        paragraphs: [
          "Per seat pricing sounds easy to model until you list who needs access. Salespeople obviously. Then the sales manager, then whoever does quotes, then the person in finance who checks what has been invoiced, then the director who wants the pipeline report.",
          "Most teams end up with roughly a third more seats than the original estimate. Do that count honestly before comparing products, because a difference of two hundred rand a seat becomes meaningful at ten seats and trivial at three.",
        ],
      },
      {
        heading: "Free tiers are real, and they are a funnel",
        paragraphs: [
          "HubSpot and Zoho both offer genuinely usable free CRM tiers, and for a small team those can run for a long time. They are not charity. They are designed so that the thing you eventually need sits one tier up.",
          "Find out what that thing is before you build your process on the free tier. It is usually automation, reporting depth, or the number of contacts you can store. Knowing which one it is tells you what your real cost will be in a year.",
        ],
      },
      {
        heading: "Automation is the tier that matters",
        paragraphs: [
          "The single feature that changes whether a CRM saves time is workflow automation. Automatic follow up tasks, emails triggered by a stage change, and reminders that appear without anyone remembering to set them.",
          "Check which tier that lands on, because it varies a lot. Pipedrive puts automation on its second tier. Others reserve it for the third. That difference can be more than double the per seat cost.",
        ],
      },
      {
        heading: "Dollar billing moves your budget",
        paragraphs: [
          "Most CRM products sold here bill in United States dollars. HubSpot, Zoho and Pipedrive all do. Your rand cost therefore moves with the exchange rate, and a budget set in March can be materially wrong by October without anyone making a decision.",
          "Model your seats at a rate you would be uncomfortable with rather than the current one. If the number still works, the purchase is safe.",
        ],
      },
      {
        heading: "The cost nobody quotes is data quality",
        paragraphs: [
          "A CRM with stale data is worse than a spreadsheet, because people trust it. Keeping it clean is someone's job, whether or not it appears in a job description, and that time is a real cost of the system.",
          "Budget an hour a week for someone to merge duplicates, close dead deals and fix owners. Systems that skip this quietly stop being used within a year, which makes the subscription a total loss rather than an expensive one.",
        ],
      },
      {
        heading: "Migration and onboarding are quoted separately",
        paragraphs: [
          "Getting existing contacts, deals and email history into a CRM is work, and above a certain size vendors sell onboarding as a paid service. That figure rarely appears next to the per seat price.",
          "Ask what onboarding costs, whether it is optional, and what happens if you decline it. For a small team importing a clean spreadsheet the answer is usually that you do not need it, which is worth knowing before it is added to a quote.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does a CRM cost in South Africa?",
        answer: "Entry tiers run from free to around R224 a seat a month, with the automation tiers most teams need landing between R380 and R800 a seat. Almost all of it is billed in dollars, so the rand figure moves.",
      },
      {
        question: "Is a free CRM enough for a small business?",
        answer: "Often yes for the first year. HubSpot and Zoho both have free tiers that handle contacts and a pipeline. You will outgrow them at automation or reporting rather than at contact limits.",
      },
      {
        question: "Why is CRM billed annually?",
        answer: "The advertised per seat price almost always assumes annual billing, with monthly billing charged at a premium. Treat the commitment as a year and use the trial accordingly.",
      },
    ],
    relatedProducts: ["hubspot-crm", "zoho-crm", "pipedrive", "skynamo"],
    relatedGuides: ["crm-your-team-will-update", "software-billed-in-dollars", "total-cost-of-ownership-software"],
  },

  "erp-or-accounting-software": {
    lead: "The honest answer for most South African businesses asking this question is that they need better accounting software, not an ERP. Here is how to tell which side of the line you are on.",
    takeaways: [
      "If the pain is reporting and reconciliation, better accounting software will fix it for a fraction of the cost",
      "If the pain is stock, production or multiple entities, that is where ERP starts to earn its price",
      "ERP cost is mostly implementation and internal time, not licence",
    ],
    sections: [
      {
        heading: "The question behind the question",
        paragraphs: [
          "Businesses usually start looking at ERP because something hurts. Stock counts never match the ledger. Nobody can say what a job actually cost. Three systems hold different versions of the same customer. Month end takes two weeks.",
          "Each of those has a cheap answer and an expensive answer. The skill is telling which one your problem needs, and the cost difference between the two is very large.",
        ],
      },
      {
        heading: "Signs you need better accounting, not ERP",
        paragraphs: [
          "If your complaint is that reporting is slow, reconciliation is manual, or you cannot see cash position without a spreadsheet, that is an accounting software problem. A modern cloud ledger with working bank feeds fixes most of it for a few hundred rand a month.",
          "The same is true if the real issue is that nobody has closed the books properly in six months. No ERP fixes a process problem. It makes the process problem more expensive and more visible.",
        ],
      },
      {
        heading: "Signs you have genuinely outgrown it",
        paragraphs: [
          "Manufacturing is the clearest signal. If you convert raw materials into finished goods and need to know what each run cost, accounting software with a stock module will not carry you. Bills of material, routings and work in progress are ERP territory.",
          "Multiple entities that consolidate monthly is the second signal, and multi warehouse stock with lot or serial traceability is the third. If a recall would require you to trace a batch through your supply chain, you need a system built for it.",
        ],
      },
      {
        heading: "What an ERP actually costs here",
        paragraphs: [
          "None of the ERP products sold in South Africa publish a rate card. Sage 200 Evolution, Sage X3, SYSPRO and SAP Business One are all quoted through partners, and the licence is routinely the smaller half of the first year.",
          "The larger half is implementation, data migration and the time of your own people. That last item never appears in a quote and is frequently the biggest line in the real total, because the only people who can tell an implementer how your operation works are the people already running it.",
        ],
      },
      {
        heading: "The middle option most people miss",
        paragraphs: [
          "Between a cloud ledger and a full ERP sits a group of products that do accounting with serious stock control. Sage 200 Evolution, Palladium and Omni Accounts all live here, as does Odoo if you are comfortable with its model.",
          "For a distributor or a small manufacturer, this middle tier solves the actual problem at a fraction of ERP cost. It is worth a proper look before accepting that you have outgrown everything below enterprise.",
        ],
      },
      {
        heading: "Fix the process before you buy the system",
        paragraphs: [
          "If goods arrive without paperwork, or jobs are quoted from memory, no software will produce reliable numbers. It will produce unreliable numbers faster and with more authority, which is worse.",
          "Spend a month tightening the process on paper first. Some businesses discover at the end of it that the problem was never the software, which is the cheapest possible outcome of an ERP evaluation.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between accounting software and an ERP?",
        answer: "Accounting software records what happened financially. An ERP runs the operation that produces those figures, including stock, production, purchasing and sometimes people, with the ledger as one part of a larger system.",
      },
      {
        question: "How much does ERP cost in South Africa?",
        answer: "There is no public pricing for the main products. Expect a partner quote covering licence, modules and implementation, and expect implementation to equal or exceed the first year of licence. Add your own team's time on top.",
      },
      {
        question: "Can Odoo replace an ERP?",
        answer: "It genuinely can for many mid sized businesses, and it publishes pricing, which almost nothing else in this bracket does. The trade is that you take on more configuration responsibility yourself or pay a partner for it.",
      },
    ],
    relatedProducts: ["sage-evolution", "odoo", "syspro", "sage-x3", "palladium-accounting"],
    relatedGuides: ["stock-control-when-spreadsheets-stop-working", "total-cost-of-ownership-software", "software-implementation-checklist"],
  },

  "popia-software-buying-checklist": {
    lead: "POPIA does not tell you which software to buy. It does tell you that you remain responsible for personal information after you hand it to a provider, which makes a few questions worth asking before you sign.",
    takeaways: [
      "You stay responsible for personal information even when an overseas provider processes it",
      "Ask where data is stored and get the answer in writing before you sign",
      "Know how to get your data out, because that is also a POPIA obligation",
    ],
    sections: [
      {
        heading: "What POPIA actually asks of a buyer",
        paragraphs: [
          "The Protection of Personal Information Act 4 of 2013 makes the business that decides why and how personal information is processed the responsible party. Your software provider is usually an operator acting on your instructions. Choosing an operator does not transfer your responsibility to them.",
          "In practice that means you need to know what personal information the system will hold, why it is there, who can see it, where it lives and how long it is kept. Those are all answerable before you buy, and they are much harder to fix afterwards.",
        ],
      },
      {
        heading: "Ask where the data physically sits",
        paragraphs: [
          "Most cloud software sold here stores data outside South Africa. That is lawful. Section 72 permits cross border transfer where the recipient is subject to comparable protection, usually through the provider's contractual terms.",
          "What you cannot do is not know. Ask which region hosts your data, ask for it in writing, and keep the answer with your records. If a provider cannot tell you, that is itself the answer.",
        ],
      },
      {
        heading: "Access, roles and who can see a salary",
        paragraphs: [
          "Payroll and HR systems hold some of the most sensitive information a business has. Check what role based access the product supports and whether you can restrict salary visibility to the two people who need it rather than everyone in the finance team.",
          "Ask also whether administrator actions are logged. If somebody exports the whole employee database, you should be able to tell that it happened and who did it.",
        ],
      },
      {
        heading: "Retention and deletion",
        paragraphs: [
          "POPIA says personal information should not be kept longer than necessary for the purpose it was collected for, subject to other laws that require you to keep records. Payroll records have their own retention requirements, so this is a balance rather than a rule to delete everything quickly.",
          "The practical question for software is whether the product lets you delete a record when you decide to, or whether everything is retained indefinitely because that was easier to build.",
        ],
      },
      {
        heading: "Getting your data out",
        paragraphs: [
          "Ask what happens at the end of the contract. Can you export everything in a usable format, how long do you have to do it, and what does the provider do with what remains.",
          "This matters for POPIA and it matters commercially. A provider whose export is a PDF has made switching expensive, and that is a fact worth knowing before you commit rather than three years later.",
        ],
      },
      {
        heading: "Remove access when people leave",
        paragraphs: [
          "The most common real world breach in a small business is not a hacked provider. It is a former employee or a former bookkeeper whose login still works months after they stopped working for you.",
          "Make removing access part of the leaving process, alongside the laptop and the keys. Check quarterly who has access to payroll and to the accounting file, because that list grows quietly.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does POPIA allow South African businesses to use overseas cloud software?",
        answer: "Yes. Section 72 permits transferring personal information outside the country where the recipient is bound by comparable protection, which is normally handled through the provider's contract terms. You must know it is happening and be able to explain it.",
      },
      {
        question: "Who is the Information Officer for a small business?",
        answer: "By default the head of the business, though the role can be delegated. It must be registered with the Information Regulator. For a sole proprietor it is simply the owner.",
      },
      {
        question: "Does POPIA require me to keep data in South Africa?",
        answer: "No. There is no data residency requirement in POPIA. What it requires is a lawful basis for the transfer and an appropriate level of protection at the destination.",
      },
    ],
    relatedProducts: ["simplepay", "sage-hr", "payspace", "sage-300-people"],
    relatedGuides: ["popia-cloud-software-outside-south-africa", "what-your-accountant-needs", "software-implementation-checklist"],
  },
  "vat-registration-accounting-software": {
    lead: "VAT registration changes what your accounting software has to do. The threshold is the easy part. The settings that decide whether your VAT201 comes out right are where businesses lose weeks.",
    takeaways: [
      "Registration is compulsory once taxable supplies pass R1 million in any twelve month period",
      "Voluntary registration is possible from R50 000, and is not always a good idea",
      "Set your VAT periods and tax codes correctly at the start, because fixing them later means reworking history",
    ],
    sections: [
      {
        heading: "When you have to register",
        paragraphs: [
          "Registration becomes compulsory once the value of taxable supplies exceeds R1 million in any consecutive twelve month period, or where you have a written contract that will take you past it. That is a rolling test, not a financial year test, which catches people who only look at it once a year.",
          "You can register voluntarily from R50 000 of taxable supplies. Whether you should is a separate question. Registering means charging fifteen percent to customers, submitting returns, and keeping records that support every claim. If most of your customers are not VAT registered, adding fifteen percent to your price is a real competitive cost.",
        ],
      },
      {
        heading: "What changes in your software on day one",
        paragraphs: [
          "Three settings matter. Your VAT registration number goes onto every tax invoice, because an invoice without it is not a valid tax invoice and your customer cannot claim on it. Your VAT periods have to match what SARS allocated you, which for most businesses is every two months. And every item and account needs the right tax code.",
          "That last one causes the most trouble. Standard rated, zero rated and exempt are not interchangeable, and neither is a supplier who is not registered. If the codes are wrong, the return is wrong, and the correction is a reworking of history rather than a setting change.",
        ],
      },
      {
        heading: "The invoice basis and payment basis question",
        paragraphs: [
          "Most businesses account for VAT on the invoice basis, meaning output tax is declared when you issue the invoice rather than when you are paid. That is a cash flow consideration, because you can owe SARS output tax on an invoice a customer has not paid.",
          "The payments basis is available to certain smaller businesses. If you qualify and cash flow is tight, it is worth asking your accountant about, and worth confirming that your software supports the basis you are on rather than assuming.",
        ],
      },
      {
        heading: "Producing a VAT201 you can defend",
        paragraphs: [
          "The return itself is submitted on eFiling. What your software should give you is a VAT report that agrees to the ledger and can be broken down transaction by transaction, so that when a figure looks odd you can find the invoice behind it in under a minute.",
          "Reconcile the VAT control account every period rather than at year end. A difference found in the same month is a small correction. The same difference found eleven months later is a forensic exercise.",
        ],
      },
      {
        heading: "Keeping documents that support the claim",
        paragraphs: [
          "Input tax claims need valid tax invoices behind them. SARS can and does ask. Software that attaches the supplier document to the transaction turns a verification request into an afternoon rather than a fortnight of digging through email.",
          "This is the practical argument for document capture tools such as the receipt capture built into Sage Accounting or a connected app on the other ledgers. The subscription cost is small next to a disallowed claim.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the VAT registration threshold in South Africa?",
        answer: "Compulsory registration applies once taxable supplies exceed R1 million in any consecutive twelve month period. Voluntary registration is available from R50 000. Confirm the current thresholds with SARS, as they are set by legislation and can change.",
      },
      {
        question: "How often do I submit a VAT201?",
        answer: "Most businesses are on a two monthly cycle allocated by SARS. Larger vendors submit monthly. Your software should be set to the same period SARS allocated you, not a period you chose.",
      },
      {
        question: "Does accounting software submit my VAT return to SARS?",
        answer: "Generally no. The products sold here produce the figures and the supporting report. Submission happens on eFiling. Treat any claim of automatic submission with care and confirm exactly what is automated.",
      },
      {
        question: "Should a small business register for VAT voluntarily?",
        answer: "Only if your customers are mostly VAT registered businesses who can claim the input tax, or if you carry significant input VAT on purchases. If you sell to consumers, adding fifteen percent to your price is a real cost with no offsetting benefit.",
      },
    ],
    relatedProducts: ["sage-accounting", "xero", "quickbooks-online", "zoho-books"],
    relatedGuides: ["choose-accounting-software-south-africa", "what-your-accountant-needs", "bank-feeds-south-africa"],
  },

  "sage-vs-xero-vs-quickbooks-south-africa": {
    lead: "Three cloud ledgers dominate the South African small business market. They are closer than the marketing suggests, and the right answer usually turns on your accountant and your bank rather than on features.",
    takeaways: [
      "Sage Accounting is the cheapest at R240 and has the deepest local support network",
      "Xero has the best reconciliation experience and the largest app marketplace",
      "QuickBooks sits between them, and all three need a separate South African payroll",
    ],
    sections: [
      {
        heading: "What each one costs, honestly",
        paragraphs: [
          "Sage Accounting starts at R240 a month including VAT for the Start plan, with Standard at R435. Xero runs R450, R795 and R1 095 across three tiers. QuickBooks Online starts at R322 and goes to R508 and R708.",
          "All three run aggressive introductory offers. Xero has offered eighty percent off for three months and QuickBooks seventy percent off for six. Those discounts never repeat, so compare the standing prices. On that basis Sage is the cheapest entry, Xero the most expensive, and QuickBooks in between.",
        ],
      },
      {
        heading: "Where Sage genuinely wins",
        paragraphs: [
          "Local depth. Sage has been in South Africa for decades, the support is local, and the number of accountants and bookkeepers who work in Sage products every day is larger than for anything else. If something goes wrong at year end, the pool of people who can help is deepest here.",
          "It is also the cheapest of the three at entry, and the Start plan is genuinely usable for a small service business rather than a crippled tier designed to push you upward.",
        ],
      },
      {
        heading: "Where Xero genuinely wins",
        paragraphs: [
          "The reconciliation screen. Once bank rules are trained, Xero turns a month of capture into an afternoon more effectively than either rival. For a business with high transaction volume that difference compounds every single month.",
          "The app marketplace is the second advantage. Several hundred integrations mean an awkward requirement usually has an answer somebody has already built, including the South African payroll Xero does not ship itself.",
        ],
      },
      {
        heading: "Where QuickBooks fits",
        paragraphs: [
          "QuickBooks is a capable middle option with reporting many owners find more approachable than Xero's. Its position in South Africa is weaker than in the United States or United Kingdom, which shows in the size of the local adviser community.",
          "Its introductory discount is the most generous of the three, which also makes it the easiest to misjudge on cost. Seventy percent off for six months is a very different number from the standing price.",
        ],
      },
      {
        heading: "The two things that decide it",
        paragraphs: [
          "First, your accountant. All three are competent. The one your accountant already works in will cost you less in billed hours and less friction, and that difference is usually larger than the price gap between the products.",
          "Second, your bank feeds. Coverage varies by bank and by account type across all three. Connect your own accounts during a trial before you pay for anything, because a missing feed removes most of the value of any of them.",
        ],
      },
      {
        heading: "The document capture question",
        paragraphs: [
          "All three expect you to get supplier invoices into the system somehow. Sage includes receipt capture through AutoEntry, while Xero and QuickBooks are commonly paired with a capture tool that carries its own subscription.",
          "For a business processing more than a handful of supplier invoices a month this is a real line in the comparison, and it is one most feature tables leave out entirely.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Xero better than Sage in South Africa?",
        answer: "Xero has the better reconciliation experience and a larger app marketplace. Sage has deeper local support and costs less. For most small South African businesses the deciding factor is which one their accountant works in.",
      },
      {
        question: "Which is cheapest, Sage, Xero or QuickBooks?",
        answer: "Sage Accounting at R240 a month including VAT is the cheapest entry plan. QuickBooks is R322 and Xero R450. Add a South African payroll to all three, because none of them include one.",
      },
      {
        question: "Do any of them include South African payroll?",
        answer: "No. Sage sells payroll separately. Xero and QuickBooks expect you to pair them with a local product such as SimplePay. Budget for the ledger and the payroll together.",
      },
    ],
    relatedProducts: ["sage-accounting", "xero", "quickbooks-online", "simplepay"],
    relatedGuides: ["choose-accounting-software-south-africa", "bank-feeds-south-africa", "total-cost-of-ownership-software"],
  },

  "bank-feeds-south-africa": {
    lead: "A bank feed is the single feature that decides whether cloud accounting saves you time or just moves your typing to a browser. Coverage in South Africa is uneven, and you can test it before you pay.",
    takeaways: [
      "Feed coverage varies by bank and by account type, not just by bank",
      "Test your own accounts during the free trial, not the demo company",
      "A missing feed removes most of the reason to pay for cloud accounting",
    ],
    sections: [
      {
        heading: "What a feed actually does",
        paragraphs: [
          "A bank feed delivers your transactions into the ledger automatically, usually daily. Reconciliation then becomes a matter of confirming matches the software has proposed rather than capturing lines from a statement.",
          "With rules trained on your recurring transactions, most lines match themselves. The work that remains is the exceptions, which is where a bookkeeper should be spending time anyway.",
        ],
      },
      {
        heading: "Why coverage is uneven here",
        paragraphs: [
          "Feeds depend on an arrangement between the software vendor and each bank, and those arrangements are negotiated bank by bank and product by product. A vendor may have a direct feed for a current account at one of the large banks and nothing for a credit card at the same bank.",
          "Business accounts, credit cards, foreign currency accounts and accounts at smaller banks are the usual gaps. None of this is visible on a pricing page, and the marketing list of supported banks rarely distinguishes account types.",
        ],
      },
      {
        heading: "How to test it properly in a trial",
        paragraphs: [
          "Do not evaluate feeds inside the demo company that ships with the product. Start a free trial, then connect every account your business actually uses. Every current account, every credit card, every savings account you post to.",
          "Then wait. A feed that connects is not the same as a feed that delivers. Give it two or three days and confirm transactions are arriving daily, complete, with usable descriptions. Thirty day trials exist precisely so you can do this.",
        ],
      },
      {
        heading: "What to do when there is no feed",
        paragraphs: [
          "The fallback is importing a statement file, usually OFX, QIF or CSV, downloaded from your online banking. It works and it is not terrible, but it is a manual step somebody has to remember every week.",
          "Price that honestly. If two of your five accounts need manual import, the time saving that justified the subscription is materially smaller, and a cheaper product may make more sense.",
        ],
      },
      {
        heading: "Security questions worth asking",
        paragraphs: [
          "Ask how the feed is authorised. A direct arrangement with your bank, where you approve the connection through the bank's own process, is preferable to anything that asks for your online banking credentials.",
          "If a product asks you to hand over your banking username and password so it can log in as you, understand what you are agreeing to and check what your bank's terms say about sharing credentials.",
        ],
      },
      {
        heading: "Rules are what make a feed pay for itself",
        paragraphs: [
          "A feed on its own only delivers transactions. What turns that into a saving is bank rules, which tell the software that a payment to a particular supplier is always coded to a particular account, so the line arrives already matched.",
          "Expect to spend two or three reconciliation cycles training those rules before the speed arrives. Businesses that judge a product in the first week usually conclude that reconciliation is no faster, because at that point it genuinely is not.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which South African banks support bank feeds?",
        answer: "The major banks are generally supported by the main cloud ledgers, but coverage differs by account type and by software vendor. The only reliable test is connecting your own accounts during a free trial.",
      },
      {
        question: "Do bank feeds cost extra?",
        answer: "Usually not on the mainstream cloud products, where feeds are included in the subscription. Some products limit the number of connected accounts by plan tier, so check that against how many accounts you actually run.",
      },
      {
        question: "What if my bank is not supported?",
        answer: "You import statement files manually, typically OFX or CSV from online banking. It works, but it is a recurring manual task and it reduces the time saving that justified buying cloud accounting.",
      },
    ],
    relatedProducts: ["xero", "sage-accounting", "quickbooks-online", "zoho-books"],
    relatedGuides: ["choose-accounting-software-south-africa", "free-trial-testing-software", "sage-vs-xero-vs-quickbooks-south-africa"],
  },

  "switching-accounting-software-mid-year": {
    lead: "Changing ledgers is not difficult so much as unforgiving. What you plan before the move decides whether your history stays usable and whether your accountant can still sign off the year.",
    takeaways: [
      "Move at a year end if you can, and at a VAT period end if you cannot",
      "Opening balances and the trial balance matter more than transaction history",
      "Keep read only access to the old system for at least a full year",
    ],
    sections: [
      {
        heading: "Pick the date before you pick the product",
        paragraphs: [
          "A year end is the cleanest moment to move. Balances are agreed, the prior year is closed and the new system starts from a trial balance your accountant has already signed off.",
          "If you cannot wait, move at the end of a VAT period. Switching in the middle of one means your VAT201 has to be assembled from two systems, which is exactly the kind of avoidable complication that produces a query later.",
        ],
      },
      {
        heading: "What has to come across",
        paragraphs: [
          "Opening balances first. A trial balance as at the switch date, agreed with your accountant, is the foundation of everything that follows. Then the master data, meaning customers, suppliers, the chart of accounts and your items.",
          "Open items next. Unpaid customer invoices and unpaid supplier bills have to be entered individually rather than as a single debtors total, otherwise you cannot age them or allocate payments against them.",
        ],
      },
      {
        heading: "What you can leave behind",
        paragraphs: [
          "Detailed transaction history usually stays in the old system. Migrating years of transactions is expensive, error prone, and rarely worth it. What matters is that you can still look it up.",
          "Keep read only access to the old system, or a full backup and the ability to restore it, for at least a year and ideally through your next audit. Cancel the subscription only once you are certain you can retrieve history when SARS or an auditor asks.",
        ],
      },
      {
        heading: "Chart of accounts is an opportunity",
        paragraphs: [
          "Most charts of accounts grow badly over a decade, accumulating accounts created for one transaction and never used again. A migration is the natural moment to tidy that up.",
          "Resist the temptation to go further and encode department or project into account codes. If you need that analysis, use the tracking or dimension feature in the new product rather than multiplying accounts.",
        ],
      },
      {
        heading: "Run both for a month",
        paragraphs: [
          "Capture at least one month in both systems and compare the trial balance, the bank balance and the VAT figures. It is duplicated work for four weeks and it is the cheapest insurance available.",
          "Only stop the old system once a full period reconciles in the new one. Businesses that skip this step usually discover the problem at year end, when fixing it is far more expensive than the month of double capture would have been.",
        ],
      },
      {
        heading: "Tell the people who depend on your numbers",
        paragraphs: [
          "Your accountant, your bank if you provide management accounts, and anyone who receives a regular report all need to know the switch is happening and when. Reports will look different afterwards, and an unexplained change in format invites questions about the numbers themselves.",
          "Send a short note with the switch date and a sample of the new report layout. It costs ten minutes and prevents the awkward conversation where somebody assumes the figures changed rather than the formatting.",
        ],
      },
    ],
    faqs: [
      {
        question: "When is the best time to change accounting software?",
        answer: "At a financial year end, because balances are agreed and the new system starts from a signed off trial balance. Failing that, at the end of a VAT period so that one return does not span two systems.",
      },
      {
        question: "Can I import my transaction history into new accounting software?",
        answer: "Master data such as customers, suppliers and the chart of accounts imports readily from CSV. Full transaction history usually does not, and is normally left in the old system with read only access retained.",
      },
      {
        question: "How long should I keep the old accounting system?",
        answer: "At least a year, and through your next audit. SARS record keeping obligations run for several years, so make sure you can still produce the underlying detail before you cancel anything.",
      },
    ],
    relatedProducts: ["sage-accounting", "xero", "quickbooks-online", "sage-pastel-accounting"],
    relatedGuides: ["what-your-accountant-needs", "software-implementation-checklist", "choose-accounting-software-south-africa"],
  },

  "what-your-accountant-needs": {
    lead: "Your accountant works in your file every year and sometimes every month. What they need from your software is short, specific, and almost never on the marketing page.",
    takeaways: [
      "A free adviser login is standard, and paying for your accountant's seat is a red flag",
      "The audit trail has to be intact and unalterable, or year end gets expensive",
      "Ask your accountant which products they work in before you decide",
    ],
    sections: [
      {
        heading: "Adviser access, and it should be free",
        paragraphs: [
          "Every serious cloud ledger gives your accountant their own login at no cost. That is the standard, and it exists because vendors want accountants recommending them.",
          "If a product wants you to buy a seat for your accountant, or expects you to share your own login, treat that as a meaningful cost and a security problem rather than a detail.",
        ],
      },
      {
        heading: "A trial balance that can be exported",
        paragraphs: [
          "The first thing an accountant does is pull a trial balance. It needs to export cleanly, balance, and tie to the general ledger without manual adjustment.",
          "Ask to see a trial balance export during your trial. It sounds basic. Products that make it awkward create a cost that lands in your fee note every year.",
        ],
      },
      {
        heading: "An audit trail nobody can quietly edit",
        paragraphs: [
          "Posted transactions should not be silently editable. Where a correction is needed there should be a reversal or a journal that leaves a trace, with a record of who did it and when.",
          "This matters most in the products that came from a desktop tradition where editing history was normal. If a figure can change after a period is closed and nothing records it, your accountant cannot rely on last month's work.",
        ],
      },
      {
        heading: "Journals, lock dates and period close",
        paragraphs: [
          "Your accountant will post year end journals for depreciation, accruals and provisions. Check that journal entry exists, that it can be dated into a prior period where appropriate, and that periods can be locked afterwards.",
          "A lock date is what stops somebody capturing an invoice into a year that has already been signed off. Without one, the numbers your accountant reported can change after the fact, which is how a clean year end becomes a reopened one.",
        ],
      },
      {
        heading: "Ask them first, not afterwards",
        paragraphs: [
          "One question early saves money. Which products do you work in comfortably, and does my choice change your fee.",
          "You are not obliged to follow the answer. But an accountant working in an unfamiliar product bills the learning time to you, and every awkward question takes longer to resolve. That gap is usually larger than the price difference between the products.",
        ],
      },
      {
        heading: "Attachments, and why they end an audit query quickly",
        paragraphs: [
          "Your accountant will be asked to support figures, whether at year end or when SARS verifies a VAT claim. Software that keeps the supplier invoice attached to the transaction turns that request into an afternoon instead of a fortnight in an email archive.",
          "Ask what the storage limits are and what happens to attachments if you leave. A document store you cannot export is a liability rather than a feature.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I let my accountant choose my accounting software?",
        answer: "Ask for their preference and take it seriously, because their familiarity affects your fees and your year end. Make the final decision yourself, since you are the one using it every day.",
      },
      {
        question: "Do accountants get free access to cloud accounting software?",
        answer: "Yes, adviser access is free on the mainstream products. If a product expects you to pay for your accountant's login, factor that in as a real cost.",
      },
      {
        question: "What is a lock date and why does it matter?",
        answer: "It prevents transactions being posted into a period that has been closed and reported. Without one, figures your accountant already signed off can change afterwards, which reopens work you have already paid for.",
      },
    ],
    relatedProducts: ["xero", "sage-accounting", "caseware", "sage-pastel-accounting"],
    relatedGuides: ["switching-accounting-software-mid-year", "choose-accounting-software-south-africa", "vat-registration-accounting-software"],
  },
  "paye-uif-sdl-explained": {
    lead: "Three deductions sit on almost every South African payslip. Knowing what each one is, who pays it and when it is due tells you most of what your payroll software has to get right.",
    takeaways: [
      "PAYE comes off the employee. UIF is paid by both. SDL is paid by the employer only",
      "EMP201 is due by the seventh of the following month",
      "SDL applies once your annual payroll exceeds R500 000",
    ],
    sections: [
      {
        heading: "PAYE, the tax the employee pays",
        paragraphs: [
          "Pay As You Earn is income tax deducted from the employee and paid over to SARS on their behalf. The amount comes from tax tables published each year, applied to the employee's taxable remuneration after allowable deductions such as retirement fund contributions and medical aid tax credits.",
          "Your payroll must apply the current tables, handle the medical scheme fees tax credit correctly for the employee and their dependants, and cope with the fact that a bonus or a commission month should not be taxed as though every month will look like that. Getting the last part wrong is what produces an employee who receives a much smaller payslip than expected and comes to ask why.",
        ],
      },
      {
        heading: "UIF, which both sides contribute to",
        paragraphs: [
          "Unemployment Insurance Fund contributions are one percent from the employee and one percent from the employer, calculated on remuneration up to a monthly ceiling set in legislation. The ceiling is adjusted from time to time, so confirm the current figure rather than relying on a number in an old spreadsheet.",
          "There are two obligations, not one. The contribution is paid over with your monthly declaration, and separately the Department of Employment and Labour needs employee information declared so that a worker can actually claim. Payroll software that produces the contribution but not the employee declaration has done half the job.",
        ],
      },
      {
        heading: "SDL, which only the employer pays",
        paragraphs: [
          "The Skills Development Levy is one percent of total payroll, paid entirely by the employer. It becomes payable once your annual payroll exceeds R500 000, which means a very small employer may be exempt and then become liable as they grow without anybody noticing.",
          "Your payroll should tell you when you cross that line. If you are registered for SDL, part of the levy can be recovered through your Sector Education and Training Authority if you submit the required training reports, which is money most small employers leave on the table.",
        ],
      },
      {
        heading: "The monthly rhythm",
        paragraphs: [
          "All three are declared together on an EMP201 and paid over to SARS by the seventh of the following month. Where the seventh falls on a weekend or public holiday, the deadline moves to the last business day before it.",
          "Late payment attracts a penalty and interest, and the penalty is charged on the amount rather than being a flat fee. This is the deadline that matters most in a small business payroll calendar, and it is worth a standing diary entry rather than trusting anyone's memory.",
        ],
      },
      {
        heading: "What else lands on the employer",
        paragraphs: [
          "Beyond the three deductions, most employers must register with the Compensation Fund under COIDA and submit an annual Return of Earnings. Payroll that produces the earnings figure for that return saves an afternoon of reconstruction every year.",
          "If your industry falls under a bargaining council there will be further contributions and reporting on top, in formats the council specifies. Very little general payroll software handles those natively, which is worth establishing before you buy rather than after.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between PAYE, UIF and SDL?",
        answer: "PAYE is the employee's income tax, deducted from their pay. UIF is one percent from the employee and one percent from the employer up to a ceiling. SDL is one percent of payroll paid only by the employer, once annual payroll exceeds R500 000.",
      },
      {
        question: "When is EMP201 due?",
        answer: "By the seventh of the month following the payroll month. If the seventh falls on a weekend or public holiday it moves to the last business day before. Late payment attracts a penalty and interest.",
      },
      {
        question: "Do I have to pay SDL as a small employer?",
        answer: "Only once your total annual payroll exceeds R500 000. Below that you are generally exempt, but you must monitor it because the obligation begins when you cross the threshold.",
      },
      {
        question: "Does payroll software submit EMP201 to SARS for me?",
        answer: "Most South African payroll products produce the EMP201 figures and many can generate the file for eFiling. Confirm exactly what is automated with your provider, because producing a number and submitting a return are different things.",
      },
    ],
    relatedProducts: ["simplepay", "sage-business-cloud-payroll", "payspace", "sage-pastel-payroll"],
    relatedGuides: ["emp201-emp501-payroll-software", "first-employee-payroll", "employment-tax-incentive-payroll"],
  },

  "emp201-emp501-payroll-software": {
    lead: "Monthly declarations and twice yearly reconciliations are where payroll software either saves you a week or costs you one. What matters is whether the numbers agree without anyone rebuilding them by hand.",
    takeaways: [
      "EMP201 is monthly by the seventh. EMP501 reconciles those declarations twice a year",
      "Reconciliation fails when monthly declarations were corrected but payroll was not",
      "Check certificates during the year, not in filing season",
    ],
    sections: [
      {
        heading: "What the EMP201 is",
        paragraphs: [
          "The EMP201 is a monthly declaration of the PAYE, UIF and SDL you owe for that payroll month, together with any Employment Tax Incentive you are claiming. It is submitted and paid by the seventh of the following month.",
          "It is a declaration rather than a detailed return. You are telling SARS a total for each category, not listing employees. That simplicity is why the reconciliation later exists.",
        ],
      },
      {
        heading: "What the EMP501 reconciliation does",
        paragraphs: [
          "Twice a year, the employer reconciliation ties three things together. The declarations you submitted on your EMP201s, the payments you actually made, and the certificates showing what each employee earned and had deducted.",
          "There is an interim reconciliation covering the first half of the tax year and an annual one covering the full year. If those three sets of figures do not agree, SARS will not accept the submission, and the certificates cannot be issued.",
        ],
      },
      {
        heading: "Why reconciliations fail",
        paragraphs: [
          "The most common cause is a correction made in one place and not the other. A payroll is reopened and an employee's pay adjusted after the EMP201 was submitted, and nobody amended the declaration. Twelve months later the totals differ and nobody remembers why.",
          "The second most common cause is an employee record with missing or invalid details. A wrong tax number, a missing identity number or an incomplete address will block a certificate, and you will be chasing that employee in filing season rather than in the quiet month when it happened.",
        ],
      },
      {
        heading: "What good payroll software does here",
        paragraphs: [
          "It produces the EMP201 figures directly from the payroll run so the declaration cannot drift from the underlying pay. It generates the reconciliation file in the format SARS expects. And it validates employee records continuously, flagging a missing tax number in March rather than in August.",
          "Ask a vendor to show you the validation report during a demonstration. A product that can list every employee with incomplete details in one click will save you a genuinely miserable fortnight later.",
        ],
      },
      {
        heading: "The habit that removes filing season stress",
        paragraphs: [
          "Reconcile monthly. After each EMP201, check that what you declared equals what your payroll produced and equals what you paid. Three numbers, five minutes.",
          "A difference found in the same month is a correction. The same difference found in the annual reconciliation is an investigation across twelve payrolls, usually conducted by somebody who was not there when it happened.",
        ],
      },
      {
        heading: "Keep the payment proof with the declaration",
        paragraphs: [
          "SARS reconciles what you declared against what you paid. If a payment was made from the wrong account, allocated to the wrong period, or made in two parts, the reconciliation will not balance even though the payroll was right.",
          "File the payment confirmation alongside the declaration each month. It takes a minute and it is what lets you answer a query with evidence instead of a search through bank statements a year later.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between EMP201 and EMP501?",
        answer: "The EMP201 is a monthly declaration of PAYE, UIF and SDL owed. The EMP501 is a reconciliation submitted twice a year that ties those monthly declarations to your actual payments and to the employee tax certificates.",
      },
      {
        question: "How often is the EMP501 submitted?",
        answer: "Twice in a tax year. An interim reconciliation covering the first six months and an annual reconciliation covering the full year. SARS announces the filing periods each year.",
      },
      {
        question: "What are IRP5 and IT3(a) certificates?",
        answer: "Employee tax certificates produced from the annual reconciliation. An IRP5 is issued where tax was deducted and an IT3(a) where it was not. They feed the employee's own income tax return.",
      },
    ],
    relatedProducts: ["simplepay", "sage-business-cloud-payroll", "sage-pastel-payroll", "sage-300-people"],
    relatedGuides: ["paye-uif-sdl-explained", "questions-before-switching-payroll", "employment-tax-incentive-payroll"],
  },

  "employment-tax-incentive-payroll": {
    lead: "The Employment Tax Incentive reduces the PAYE an employer pays over when they employ younger workers. Claiming it correctly is almost entirely a question of whether your payroll software calculates it properly.",
    takeaways: [
      "ETI reduces the PAYE you pay over, it is not a refund of the employee's tax",
      "Eligibility depends on age, on when the employee started and on what they earn",
      "The amounts and thresholds change, so confirm the current values with SARS",
    ],
    sections: [
      {
        heading: "What the incentive actually is",
        paragraphs: [
          "The Employment Tax Incentive was introduced to encourage employers to take on young workers with little experience. It works by reducing the total PAYE the employer pays over to SARS, not by changing what the employee is taxed.",
          "That distinction matters. The employee's payslip and tax certificate are unaffected. The benefit sits entirely with the employer, and it is claimed on the monthly EMP201.",
        ],
      },
      {
        heading: "Who qualifies",
        paragraphs: [
          "Eligibility turns on the employee's age, on holding a valid South African identity document or an asylum seeker or refugee permit, on when they were first employed by you, and on their monthly remuneration falling below a threshold.",
          "There is also a floor. An employee paid below the applicable minimum wage generally does not qualify, which prevents the incentive being used to justify underpayment. The specific ages, amounts and thresholds are set in legislation and are adjusted, so confirm the current values with SARS rather than working from an older summary.",
        ],
      },
      {
        heading: "Why the calculation is easy to get wrong",
        paragraphs: [
          "The value of the claim changes with the employee's remuneration and with how long you have been claiming for them, and it steps down after the first twelve qualifying months. A part month, a mid month start or an employee who moves above the remuneration threshold all change the figure.",
          "That is why this is a software question rather than a spreadsheet question. Payroll that calculates ETI natively tracks the qualifying months per employee and applies the correct band automatically. A manual calculation across twenty employees will drift, and the drift shows up in the reconciliation.",
        ],
      },
      {
        heading: "What to ask a payroll provider",
        paragraphs: [
          "Ask whether ETI is calculated automatically and whether the payroll shows its working for each employee, so you can see why a particular figure was claimed. Ask what happens when an employee crosses the remuneration threshold mid year.",
          "Then ask how the value reaches the EMP201, and whether the software produces a report you could hand to SARS if the claim were queried. A claim you cannot explain line by line is a claim you should not be making.",
        ],
      },
      {
        heading: "Unclaimed value and the reconciliation",
        paragraphs: [
          "If your PAYE liability in a month is smaller than the incentive you are entitled to, the excess is not simply lost, but the rules around carrying it and about claiming in the reconciliation are specific. Your payroll should handle that rather than leaving you to work it out.",
          "Employers who claim manually often either under claim because it is fiddly, or over claim and have it reversed later with interest. Both are expensive. This is one of the clearest cases where the right software pays for itself.",
        ],
      },
      {
        heading: "Keep the evidence of eligibility",
        paragraphs: [
          "A claim rests on the employee's age, their identity document or permit, their start date and their remuneration. Keep those records with the payroll rather than in a personnel file somebody else controls.",
          "If a claim is queried you will be asked to prove eligibility employee by employee. Payroll that stores the supporting detail alongside the calculation makes that answerable rather than alarming.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the Employment Tax Incentive?",
        answer: "A reduction in the PAYE an employer pays over to SARS for employing qualifying younger workers. It is claimed on the monthly EMP201 and does not change what the employee is taxed.",
      },
      {
        question: "Who qualifies for ETI?",
        answer: "Broadly, employees within a defined age band who hold a valid South African identity document or qualifying permit, who were first employed by you after the scheme began, and whose monthly remuneration falls below a threshold. Confirm the current ages and amounts with SARS.",
      },
      {
        question: "Does payroll software calculate ETI automatically?",
        answer: "The established South African payroll products do, and they track qualifying months per employee. Confirm this specifically before buying, because a general international payroll product will usually have no concept of ETI at all.",
      },
    ],
    relatedProducts: ["simplepay", "sage-business-cloud-payroll", "payspace", "sage-pastel-payroll"],
    relatedGuides: ["paye-uif-sdl-explained", "emp201-emp501-payroll-software", "first-employee-payroll"],
  },

  "first-employee-payroll": {
    lead: "Hiring your first employee turns a business into an employer, and that brings registrations, deadlines and a payslip that has to comply. None of it is difficult. All of it has a date attached.",
    takeaways: [
      "Register as an employer with SARS before the first payday, not after",
      "A payslip has legally required contents under the Basic Conditions of Employment Act",
      "For one or two employees a bureau is often cheaper than software",
    ],
    sections: [
      {
        heading: "The registrations you now need",
        paragraphs: [
          "Register as an employer with SARS for PAYE, and for SDL if your payroll will exceed the threshold. Register with the Unemployment Insurance Fund, and register with the Compensation Fund under COIDA.",
          "Do this before the first payday. Registering afterwards means your first EMP201 is late by definition, and the penalty is calculated on the amount owing rather than being nominal.",
        ],
      },
      {
        heading: "What has to be on a payslip",
        paragraphs: [
          "The Basic Conditions of Employment Act sets out what a payslip must contain. Employer and employee details, the period it covers, the remuneration, every deduction listed separately, and the actual amount paid.",
          "This is why a payment reference on a bank statement is not a payslip. Any real payroll product produces a compliant one automatically. A spreadsheet will not unless you build it carefully, and it will not update when requirements change.",
        ],
      },
      {
        heading: "Software or a bureau",
        paragraphs: [
          "For one or two employees, a payroll bureau is often genuinely cheaper than software and removes the compliance burden entirely. You send the hours and the changes, they produce payslips and tell you what to pay SARS.",
          "Software wins once the payroll changes every month, once you have several employees, or once you want the data connected to your accounting. SimplePay starts around R235 a month for ten employees, and Sage Payroll starts at R97 a month for one or two, which is the point at which doing it yourself starts to make sense.",
        ],
      },
      {
        heading: "The contract and the records",
        paragraphs: [
          "An employee is entitled to written particulars of employment. Get the contract right at the start, because the terms you set now become very hard to change later without agreement.",
          "Keep payroll records properly. You need them for the twice yearly reconciliation, for the annual Return of Earnings, and for the retention periods the law requires. A shoebox of payslips is not a record system, and this is exactly the sort of thing that becomes urgent at the worst moment.",
        ],
      },
      {
        heading: "The calendar you now live by",
        paragraphs: [
          "EMP201 and payment by the seventh of the following month, every month. Employer reconciliation twice a year. Return of Earnings annually. Leave accruing from the first day, whether or not anybody is tracking it.",
          "Put all of these in a calendar the day you hire. The most common first employer mistake is not a calculation error. It is a deadline that passed while somebody was busy running the business.",
        ],
      },
      {
        heading: "Leave starts accruing on day one",
        paragraphs: [
          "Annual leave, sick leave and family responsibility leave all begin accruing from the first day of employment under the Basic Conditions of Employment Act. Nobody notices in month one and everybody notices when the employee resigns.",
          "Untaken annual leave has to be paid out on termination, so an untracked balance becomes a bill you did not budget for. Track it from the start, even if you only have one employee and a spreadsheet.",
        ],
      },
    ],
    faqs: [
      {
        question: "What do I need to register for when I hire my first employee?",
        answer: "PAYE with SARS, the Unemployment Insurance Fund, the Compensation Fund under COIDA, and SDL once your annual payroll exceeds R500 000. Register before the first payday.",
      },
      {
        question: "Do I need payroll software for one employee?",
        answer: "Not necessarily. A bureau is often cheaper and removes the compliance burden. Software becomes worthwhile at several employees, or sooner if pay changes monthly or you want it linked to your accounting.",
      },
      {
        question: "What must a South African payslip include?",
        answer: "Employer and employee details, the period covered, remuneration, each deduction shown separately and the net amount paid, as set out in the Basic Conditions of Employment Act.",
      },
    ],
    relatedProducts: ["simplepay", "sage-business-cloud-payroll", "sage-hr", "payspace"],
    relatedGuides: ["paye-uif-sdl-explained", "emp201-emp501-payroll-software", "bargaining-council-payroll"],
  },

  "bargaining-council-payroll": {
    lead: "If your industry falls under a bargaining council, its contributions and reporting are not optional and they are not something most payroll software handles. This is the requirement that quietly rules products out.",
    takeaways: [
      "Council agreements can be extended to non parties, so membership is not the test",
      "Contributions and reporting formats are set by the council, not by SARS",
      "Ask a vendor about your specific council by name before buying",
    ],
    sections: [
      {
        heading: "What a bargaining council is",
        paragraphs: [
          "Bargaining councils are established under the Labour Relations Act for a particular industry and area. They negotiate collective agreements covering wages, conditions and benefit funds, and the Minister can extend those agreements to employers who were never party to the negotiation.",
          "That last point catches people. You do not have to have joined anything. If your business falls within the registered scope of a council and an agreement has been extended, it applies to you.",
        ],
      },
      {
        heading: "What it means for payroll",
        paragraphs: [
          "Typically there are contributions to a provident or pension fund, a sick pay or benefit fund, a council levy, and often a holiday or leave enhancement pay arrangement. Some are employee deductions, some are employer contributions, and many are calculated on a base that is not simply gross pay.",
          "There will also be prescribed minimum wages by job grade, and those are enforced. A payroll that pays below the applicable rate is not just a commercial problem, it is a compliance one.",
        ],
      },
      {
        heading: "The reporting is the hard part",
        paragraphs: [
          "Councils require returns in their own formats and on their own schedules, entirely separate from anything SARS wants. Some accept a spreadsheet, others require a specific file layout, and the layout is not always well documented.",
          "This is where general payroll software falls down. It will calculate a custom deduction happily enough. It will not produce the council's return, which means somebody rebuilds it by hand every month.",
        ],
      },
      {
        heading: "How to ask the question properly",
        paragraphs: [
          "Do not ask a vendor whether they support bargaining councils. Almost everyone says yes, meaning they support custom deductions. Ask whether they support your council by name, and ask them to show you the return it produces.",
          "The established South African payroll providers are considerably better at this than international products, for the obvious reason that no international vendor is going to build a return for a South African industry council.",
        ],
      },
      {
        heading: "If your software cannot do it",
        paragraphs: [
          "You have three options. Use a payroll product that handles your council natively. Use a bureau that specialises in your industry. Or accept a manual monthly process and make sure one named person owns it.",
          "The third option is the most common and the most fragile, because it usually depends on one person and an undocumented spreadsheet. If that is where you land, at least write down how it works.",
        ],
      },
      {
        heading: "Backdated increases are the expensive surprise",
        paragraphs: [
          "Council wage increases are often agreed after the effective date, which means an increase announced in September may apply from July. You then owe arrears for every affected employee, and the council will expect them.",
          "Ask a payroll provider how it handles a backdated increase across multiple employees and multiple months. Recalculating that by hand is where errors enter, and the council checks the arithmetic.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which industries have bargaining councils in South Africa?",
        answer: "Many, including motor, metal and engineering, building and construction, road freight, hairdressing, contract cleaning and others. Scope is defined by industry and area, so check the registered scope rather than assuming.",
      },
      {
        question: "Do I have to comply if I never joined a bargaining council?",
        answer: "Often yes. Collective agreements can be extended by the Minister to non parties within the council's registered scope, which makes them binding on employers who took no part in the negotiation.",
      },
      {
        question: "Does payroll software handle bargaining council contributions?",
        answer: "Most will calculate custom deductions. Far fewer produce the council's own return in the required format. Ask about your specific council by name and ask to see the output before you buy.",
      },
    ],
    relatedProducts: ["simplepay", "sage-pastel-payroll", "payspace", "sage-300-people"],
    relatedGuides: ["questions-before-switching-payroll", "paye-uif-sdl-explained", "first-employee-payroll"],
  },
  "card-machine-fees-compared": {
    lead: "The rate on a card machine advertisement is the best case, for one card type, at a turnover most small merchants never reach. Here is how to work out what you will actually pay.",
    takeaways: [
      "Headline low rates usually apply to local debit cards only, not credit",
      "A monthly plan fee only pays for itself above a turnover you can calculate",
      "Almost every rate in this market is quoted excluding VAT",
    ],
    sections: [
      {
        heading: "Four numbers, not one",
        paragraphs: [
          "A card machine costs you four things. The hardware, whether bought or rented. Any monthly plan fee. The transaction rate. And the payout fee, if there is one.",
          "Advertising focuses on the third of those, and usually on the lowest version of it. Work out all four against your own turnover and the ranking changes more often than you would expect.",
        ],
      },
      {
        heading: "Debit and credit are priced differently",
        paragraphs: [
          "This is the detail that catches most merchants. The very low rates in this market apply to local debit cards. Credit card rates are higher and, on at least one major provider, they do not fall as your turnover grows at all.",
          "So a business whose customers mostly pay by credit card cannot use the debit headline rate to compare anything. Pull a month of settlement reports and find out what your actual split is before you choose. It is the single most useful hour you can spend on this decision.",
        ],
      },
      {
        heading: "When a monthly plan fee makes sense",
        paragraphs: [
          "Providers offering tiered plans charge a monthly fee for a lower rate. The arithmetic is simple. Divide the monthly fee by the rate saving, and that is the turnover you must exceed for the plan to pay.",
          "Take a plan costing R249 a month that saves you one tenth of a percentage point. R249 divided by 0.001 is R249 000 of monthly card turnover before you break even. If you are turning over R60 000, the cheaper plan with the higher rate is the better deal, whatever the sales page implies.",
        ],
      },
      {
        heading: "Rent or buy the hardware",
        paragraphs: [
          "Rented terminals carry a monthly cost forever. Bought terminals are a single outlay from about R699. Over three years buying is almost always cheaper, and it means a quiet month costs you nothing.",
          "The counter argument is cash flow and replacement. A rented machine is usually replaced by the provider when it fails. A bought machine outside its guarantee period is your problem. Neither is wrong, but know which model you are agreeing to.",
        ],
      },
      {
        heading: "VAT and settlement timing",
        paragraphs: [
          "Rates in this market are quoted excluding VAT, which is the industry convention. Add fifteen percent to compare against anything quoted the other way, and remember that if you are VAT registered you can claim it.",
          "Then check settlement. Next business day is common, same day is available from some providers depending on which bank you use, and slower settlement is a real cost to a business managing cash weekly even though it never appears in a rate table.",
        ],
      },
      {
        heading: "Ask what happens on a disputed transaction",
        paragraphs: [
          "Chargebacks are uncommon and unpleasant. A cardholder disputes a payment, the amount is reversed while it is investigated, and you provide evidence that the sale was genuine.",
          "Find out the process and any administration fee before you sign, and keep the paperwork that supports a sale. Providers differ considerably in how much help they give a small merchant here.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is a good card machine rate in South Africa?",
        answer: "For a small merchant, anything from around 2.3 to 2.95 percent excluding VAT on local cards is normal. Rates below two percent generally apply to local debit cards at higher monthly turnover, not to every transaction.",
      },
      {
        question: "Are card machine fees quoted including VAT?",
        answer: "Almost always excluding VAT, which is the industry convention here. Add fifteen percent when comparing against a figure quoted the other way.",
      },
      {
        question: "Is it cheaper to buy or rent a card machine?",
        answer: "Over three years, buying is usually cheaper and means no fixed monthly cost. Renting shifts replacement risk to the provider. Machines start around R699 to buy in this market.",
      },
    ],
    relatedProducts: ["yoco", "ikhokha", "snapscan", "shopify"],
    relatedGuides: ["yoco-vs-ikhokha-vs-snapscan", "accepting-online-payments-south-africa", "total-cost-of-ownership-software"],
  },

  "yoco-vs-ikhokha-vs-snapscan": {
    lead: "Three South African ways to be paid, priced against each other at the turnover levels small businesses actually trade at. The answer changes depending on how your customers pay, not on which brand you prefer.",
    takeaways: [
      "At low turnover on debit cards, Yoco Core is the cheapest of the three",
      "Yoco's low rates are debit only, and its credit rate does not fall with volume",
      "iKhokha wins on hardware cost and on 24 hour support, SnapScan on having no hardware at all",
    ],
    sections: [
      {
        heading: "What each one charges",
        paragraphs: [
          "Yoco has three plans. Core is free monthly and charges 2.30 percent on local debit up to R50 000 of monthly turnover, dropping to 1.35 percent between R50 000 and R200 000. Plus is R249 a month and Pro R499, each buying slightly lower rates.",
          "iKhokha charges no monthly rental on any machine. Its in person local card rate starts at 2.75 percent and steps down to 2.65, 2.55 and 2.5 percent as monthly turnover passes R40 000, R60 000 and R80 000. SnapScan charges no monthly fee and a standard 2.95 percent, falling as turnover grows. Every one of those figures excludes VAT.",
        ],
      },
      {
        heading: "The debit and credit trap",
        paragraphs: [
          "Yoco's headline rates apply to local debit cards. Its credit card rate is 2.30 percent on Core and stays at 2.30 percent whether you turn over R10 000 or R190 000. It does not improve with volume the way the debit rate does.",
          "iKhokha's tiered rate applies to local cards without that split. So a merchant whose customers pay mostly by credit card is comparing 2.30 percent against 2.75 to 2.5 percent, which is a much closer contest than the debit comparison suggests. Get your own debit and credit split from a settlement report before deciding.",
        ],
      },
      {
        heading: "Worked example at R30 000 a month",
        paragraphs: [
          "On mostly debit card turnover of R30 000, Yoco Core costs 2.30 percent, or R690, with no monthly fee. iKhokha costs 2.75 percent, or R825. SnapScan costs 2.95 percent, or R885. Yoco is cheapest by about R135 a month.",
          "Now add hardware. If iKhokha's R699 machine replaces a more expensive one, that gap closes over the first year. And if a meaningful share of that R30 000 is credit rather than debit, the difference narrows again.",
        ],
      },
      {
        heading: "Where the paid plans stop making sense",
        paragraphs: [
          "Yoco Plus costs R249 a month and saves about two tenths of a percentage point on debit at low volume. That needs roughly R125 000 of monthly debit turnover before the fee pays for itself. Pro at R499 needs more still.",
          "Below those levels, Yoco Core is the better Yoco. Buy the paid plans for the features, meaning loyalty, multiple locations or table management, rather than for the rate, unless your turnover genuinely justifies it.",
        ],
      },
      {
        heading: "What separates them beyond price",
        paragraphs: [
          "iKhokha runs support 24 hours a day on phone and WhatsApp, which nobody else at this end of the market does, and its machines start at R699 with no rental. Settlement is next business day with FNB and Absa and twice daily with Nedbank.",
          "SnapScan has no hardware at all, which makes it the cheapest way to start and the easiest to run at a market stall, but the customer needs a smartphone and data. Yoco has the broadest business tooling of the three and the strongest point of sale features on its paid plans.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Yoco or iKhokha cheaper?",
        answer: "On local debit cards at low turnover, Yoco Core at 2.30 percent is cheaper than iKhokha at 2.75 percent, both excluding VAT. iKhokha has cheaper hardware from R699 and no monthly rental at any tier. On credit cards the two are much closer.",
      },
      {
        question: "Which card machine has no monthly fee?",
        answer: "Yoco Core, all iKhokha machines and SnapScan all have no monthly fee. Yoco Plus at R249 and Pro at R499 do, and those only pay for themselves at high monthly turnover.",
      },
      {
        question: "Is SnapScan cheaper than a card machine?",
        answer: "Usually not on rate, at 2.95 percent excluding VAT. It is cheaper to start with, because there is no hardware to buy, which makes it attractive for irregular or low volume trading.",
      },
    ],
    relatedProducts: ["yoco", "ikhokha", "snapscan"],
    relatedGuides: ["card-machine-fees-compared", "accepting-online-payments-south-africa"],
  },

  "accepting-online-payments-south-africa": {
    lead: "Online checkout in South Africa is not just about cards. Instant EFT carries a meaningful share of local ecommerce, and the method you leave out is the sale you quietly lose.",
    takeaways: [
      "Instant EFT matters here in a way it does not in most markets",
      "Online card rates run higher than in person rates",
      "Check settlement timing and refund handling before you choose a gateway",
    ],
    sections: [
      {
        heading: "The methods that matter locally",
        paragraphs: [
          "Cards are the baseline. Beyond that, instant EFT, where the customer pays directly from their bank account and the merchant gets immediate confirmation, carries a real share of South African online payments and is preferred by customers who will not put a card number into a website.",
          "QR payment is the third method, and it works better than you would expect for invoicing and for service businesses because the customer is already familiar with the app.",
        ],
      },
      {
        heading: "What online payment costs",
        paragraphs: [
          "Online card rates are higher than in person rates because the risk is higher. iKhokha charges 2.85 percent excluding VAT for online local cards against 2.75 percent in person, and 2 percent for instant EFT, which is notably cheaper than card.",
          "That difference is worth designing for. If instant EFT costs you a percentage point less than a card and your customers are willing to use it, offering it prominently is a direct margin improvement rather than a convenience feature.",
        ],
      },
      {
        heading: "Gateway or platform",
        paragraphs: [
          "If you are running a Shopify store, payment is largely handled for you and the decision is which provider to connect. If you are taking payment from your own website or from invoices, you are choosing a gateway and thinking about how it integrates with your accounting.",
          "The integration matters more than it sounds. A payment that arrives in your bank account as a lump settlement of forty transactions, with fees netted off, is a reconciliation problem every single day unless something automates it.",
        ],
      },
      {
        heading: "Settlement, refunds and chargebacks",
        paragraphs: [
          "Ask three questions of any provider. When does money actually reach my account. What happens when I need to refund a customer, and does the fee come back. And what is the process when a cardholder disputes a transaction.",
          "Chargebacks are rare and expensive when they happen. Knowing the process in advance, and knowing what evidence you need to keep, is the difference between a resolved dispute and an unexplained deduction.",
        ],
      },
      {
        heading: "Do not make the customer work",
        paragraphs: [
          "The most common cause of an abandoned checkout is friction rather than price. Forced account creation, too many fields, and a payment method the customer does not trust all cost more than a tenth of a percentage point on your rate ever will.",
          "Offer the methods your customers already use, keep the form short, and show the total including delivery and VAT before you ask for payment details.",
        ],
      },
      {
        heading: "Reconciliation is the hidden running cost",
        paragraphs: [
          "Online payment providers settle in batches with fees netted off, so forty orders arrive as one deposit that matches no single invoice. Somebody has to break that down every day or the bank account stops reconciling.",
          "Ask whether the provider integrates with your accounting package and what it posts. A provider that writes the settlement, the fee and the individual sales correctly saves more time than a small rate difference will ever save you money.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does it cost to accept online payments in South Africa?",
        answer: "Online local card rates run around 2.85 percent excluding VAT for a small merchant, with instant EFT cheaper at around 2 percent. Rates fall with monthly turnover on most providers.",
      },
      {
        question: "Is instant EFT worth offering?",
        answer: "In South Africa, generally yes. It costs less than card on most providers and a meaningful group of customers prefer it to entering card details, so leaving it out costs you sales as well as margin.",
      },
      {
        question: "How quickly do online payments settle?",
        answer: "It varies by provider and by your bank, from same day to a few business days. Ask specifically, because settlement timing affects your working capital more than a small rate difference does.",
      },
    ],
    relatedProducts: ["shopify", "ikhokha", "snapscan", "yoco"],
    relatedGuides: ["card-machine-fees-compared", "yoco-vs-ikhokha-vs-snapscan", "total-cost-of-ownership-software"],
  },

  "popia-cloud-software-outside-south-africa": {
    lead: "Almost every cloud product a South African business buys stores data abroad. POPIA permits that. What it does not permit is not knowing, and not being able to explain it when somebody asks.",
    takeaways: [
      "Section 72 permits cross border transfer under specified conditions",
      "There is no data residency requirement in POPIA",
      "You remain the responsible party even when an overseas operator holds the data",
    ],
    sections: [
      {
        heading: "What section 72 actually says",
        paragraphs: [
          "Section 72 of the Protection of Personal Information Act 4 of 2013 governs sending personal information outside the Republic. It permits the transfer where the recipient is subject to a law, binding corporate rules or a binding agreement providing an adequate level of protection, or where the data subject consents, or where the transfer is necessary for performance of a contract.",
          "In practice, for a business buying cloud software, the route is almost always the binding agreement. The provider's data processing terms commit them to a standard of protection, and those terms are what you rely on.",
        ],
      },
      {
        heading: "There is no residency requirement",
        paragraphs: [
          "POPIA does not require personal information to be stored in South Africa. This is a common misunderstanding, sometimes encouraged by vendors selling local hosting.",
          "Local hosting can be a good thing for latency or for a specific contractual requirement, but it is not a legal obligation under POPIA. Do not pay a premium for it believing you have to.",
        ],
      },
      {
        heading: "What you actually have to do",
        paragraphs: [
          "Know where the data goes. Get the provider to tell you which region hosts your data and keep the answer. Read the data processing terms, or at least confirm they exist and that they bind the provider to a protection standard.",
          "Then reflect it in your own privacy notice. If you tell customers their information stays in South Africa when your payroll runs on infrastructure abroad, the problem is not the transfer, it is the statement you made about it.",
        ],
      },
      {
        heading: "The questions worth putting to a vendor",
        paragraphs: [
          "Which region stores our data, and can you confirm that in writing. Do you have data processing terms and where are they published. Do you use subprocessors, and are they listed. What is your breach notification commitment and how quickly would we hear.",
          "A provider serving business customers will answer all of these quickly because they are asked constantly. A provider that cannot answer them has told you something useful.",
        ],
      },
      {
        heading: "Where the real risk usually sits",
        paragraphs: [
          "In most small businesses the cross border question is the least of it. The greater exposure is a spreadsheet of employee salaries on somebody's laptop, a shared login to the payroll, or a former employee whose access was never removed.",
          "Cloud providers generally have better security than the business buying from them. Spend your attention on access control, on removing leavers promptly, and on who in your organisation can export the whole employee database.",
        ],
      },
      {
        heading: "Keep a short record of what you decided",
        paragraphs: [
          "Write down, in a page, which systems hold personal information, where each one processes it, and what you relied on to permit the transfer. That is your answer if the Information Regulator ever asks, and it takes an hour to produce.",
          "Review it when you add a system. Most compliance failures here are not decisions taken badly, they are systems adopted by one team that nobody else knew about.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does POPIA require data to be stored in South Africa?",
        answer: "No. There is no data residency requirement. Section 72 permits cross border transfer where an adequate level of protection applies, which for cloud software is usually established through the provider's data processing terms.",
      },
      {
        question: "Can I use Xero or QuickBooks under POPIA?",
        answer: "Yes. Both store data outside South Africa and both publish data processing terms. Your obligation is to know where the data goes, rely on those terms, and describe it accurately in your own privacy notice.",
      },
      {
        question: "Who is responsible if my cloud provider has a breach?",
        answer: "You remain the responsible party towards the people whose information it is. The provider is your operator and is bound by your agreement with them, but the duty to notify the Information Regulator and affected people sits with you.",
      },
    ],
    relatedProducts: ["xero", "simplepay", "sage-hr", "payspace"],
    relatedGuides: ["popia-software-buying-checklist", "software-implementation-checklist", "what-your-accountant-needs"],
  },
  "software-billed-in-dollars": {
    lead: "A large share of the software a South African business runs on is priced in United States dollars. That means part of your operating cost is set by a currency market rather than by any decision you make.",
    takeaways: [
      "Budget at a rand rate worse than today, not at today's rate",
      "Annual billing fixes the dollar amount, not the rand amount",
      "A rand priced local alternative is worth pricing even if it is nominally dearer",
    ],
    sections: [
      {
        heading: "Which of your tools are dollar priced",
        paragraphs: [
          "HubSpot, Zoho, Pipedrive, Odoo, Microsoft and Shopify all publish in dollars. Sage, SimplePay, Yoco, iKhokha and most of the locally built products publish in rand. Xero and QuickBooks publish rand prices for this market.",
          "Make the list for your own stack. Most businesses are surprised by how much of the monthly total is exposed once they add it up, because each individual subscription looks small.",
        ],
      },
      {
        heading: "What a moving rand does to a budget",
        paragraphs: [
          "Take ten CRM seats at fourteen dollars. At sixteen rand to the dollar that is R2 240 a month. At eighteen it is R2 520, and at twenty it is R2 800. Nobody made a decision and the cost rose by a quarter.",
          "Multiply that across every dollar priced subscription and the exposure becomes a real line in your planning. It also arrives without warning, which is worse than a large but predictable cost.",
        ],
      },
      {
        heading: "How to budget for it honestly",
        paragraphs: [
          "Do not budget at today's rate. Pick a rate meaningfully worse than the current one and check that the purchase still makes sense there. If it only works at a favourable rate, you have bought an option on the currency rather than a piece of software.",
          "For anything material, model three scenarios. This is not sophisticated financial engineering. It is a spreadsheet with three columns, and it takes ten minutes.",
        ],
      },
      {
        heading: "What annual billing does and does not fix",
        paragraphs: [
          "Paying annually fixes the dollar amount for the year and usually earns a discount. It does not fix the rand amount unless you pay the whole year up front, at which point you have converted at one known rate and removed the uncertainty for twelve months.",
          "That is a genuine benefit and it is rarely mentioned. If cash flow allows and you are confident about the product, paying a year up front removes both the currency risk and the monthly price premium at once.",
        ],
      },
      {
        heading: "When the local option wins",
        paragraphs: [
          "A rand priced product that looks slightly more expensive today can be the cheaper choice over three years, because its price only changes when the vendor decides to change it.",
          "This is one of the strongest practical arguments for the locally built products in payroll and payments. Predictability has a value that a feature comparison never captures.",
        ],
      },
      {
        heading: "Check whether you are charged in dollars or in rand",
        paragraphs: [
          "There is a difference between a vendor who bills you in dollars, where your bank converts and adds a fee, and one who publishes a dollar price but charges a rand amount. The second removes the card conversion fee and makes the cost predictable within the month.",
          "Ask which one applies, and check a recent card statement. Foreign transaction fees on business cards are typically a few percent, which is a quiet addition to every subscription you pay in dollars.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which business software is priced in rand in South Africa?",
        answer: "Sage, SimplePay, Yoco, iKhokha, SnapScan, Palladium and most locally built products. Xero and QuickBooks also publish rand prices here. HubSpot, Zoho, Pipedrive, Odoo, Microsoft and Shopify bill in dollars.",
      },
      {
        question: "Does paying annually protect me from the exchange rate?",
        answer: "It fixes the dollar amount for the year. It only fixes the rand amount if you pay the full year up front, which converts once at a known rate and removes the uncertainty entirely.",
      },
      {
        question: "How should I budget for dollar priced software?",
        answer: "Model it at a rand rate materially worse than today's. If the purchase still makes sense at that rate it is safe. If it only works at a favourable rate, reconsider or choose a rand priced alternative.",
      },
    ],
    relatedProducts: ["hubspot-crm", "zoho-crm", "pipedrive", "business-central"],
    relatedGuides: ["total-cost-of-ownership-software", "crm-pricing-explained", "choose-accounting-software-south-africa"],
  },

  "total-cost-of-ownership-software": {
    lead: "The monthly price is the smallest number in a software decision. Everything else is implementation, migration, training, add ons and the time of your own people, and almost none of it appears in a quote.",
    takeaways: [
      "Build a three year total, not a monthly comparison",
      "Internal time is usually the largest unbudgeted line",
      "Check what the next tier costs before you buy the current one",
    ],
    sections: [
      {
        heading: "The lines a quote contains",
        paragraphs: [
          "Subscription or licence, number of seats, and any modules priced separately. That is usually the whole quote, and it is genuinely useful for comparing like with like at the entry point.",
          "It is also where the comparison usually stops, which is why businesses are surprised in year two rather than in month one.",
        ],
      },
      {
        heading: "The lines it does not",
        paragraphs: [
          "Implementation or setup, data migration from whatever you run now, training for the people who will use it, integrations to the other systems it must talk to, and any add on that fills a gap the core product leaves.",
          "Then the ongoing ones. Support beyond what is included, the annual uplift most vendors apply, and the cost of moving up a tier when you outgrow a limit on invoices, contacts or users.",
        ],
      },
      {
        heading: "The line nobody budgets",
        paragraphs: [
          "Your own people. The person who knows how your stock actually moves, or how your commission is really calculated, is the only one who can tell an implementer what the system must do, and they already have a full time job.",
          "On an ERP project this is frequently the single largest cost in the true total and it never appears in a proposal. Estimate the days honestly and cost them at what those people are worth. A business case that ignores this is not a business case.",
        ],
      },
      {
        heading: "A method that takes an hour",
        paragraphs: [
          "Build three columns for three years. Year one carries subscription plus implementation plus migration plus training. Years two and three carry subscription plus an assumed uplift plus the tier increase you expect as you grow.",
          "Add the add ons you know you will need. For accounting that usually means payroll and document capture. For CRM it usually means the automation tier. Then compare products on the three year total rather than on the monthly price.",
        ],
      },
      {
        heading: "Ask what leaving costs",
        paragraphs: [
          "Before you sign, ask what happens if you leave. Can you export everything in a usable format, how long do you have, and what does the provider keep.",
          "A product with a poor export has a switching cost built into it, and that cost is real even if you never pay it. It belongs in the comparison alongside the price.",
        ],
      },
      {
        heading: "Watch the annual uplift clause",
        paragraphs: [
          "Most subscription agreements allow the vendor to raise the price each year, often by a stated percentage or by an inflation measure. Over three years that compounds into a meaningful difference between two products that looked identical on day one.",
          "Ask what the uplift has been for the last two years rather than what the contract permits. The permitted ceiling and the actual behaviour are usually different, and the second one is what you will pay.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is total cost of ownership for business software?",
        answer: "Everything you spend over the life of the system. Subscription or licence, implementation, migration, training, integrations, add ons, support, price increases and the internal time your own staff spend on it.",
      },
      {
        question: "How much should I budget for implementation?",
        answer: "For cloud accounting or payroll, often little beyond your own time. For an ERP, implementation commonly equals or exceeds the first year of licence, and internal time is usually larger again.",
      },
      {
        question: "How far ahead should I model software cost?",
        answer: "Three years. It is long enough to capture tier increases and annual uplifts and short enough that your assumptions about the business are still credible.",
      },
    ],
    relatedProducts: ["sage-evolution", "odoo", "xero", "syspro"],
    relatedGuides: ["software-implementation-checklist", "software-billed-in-dollars", "erp-or-accounting-software"],
  },

  "software-implementation-checklist": {
    lead: "Small software projects fail for large reasons, and almost always the same ones. Nobody owned it, the data was worse than anyone admitted, and there was no agreed moment when the old system stopped.",
    takeaways: [
      "Name one owner with authority, not a committee",
      "Clean the data before it moves, not after",
      "Agree in advance what has to be true before you switch off the old system",
    ],
    sections: [
      {
        heading: "Name the owner first",
        paragraphs: [
          "One person owns the outcome. They do not have to be technical, but they need enough authority to make decisions about process, to insist on data quality, and to escalate when the vendor goes quiet.",
          "Projects run by a committee drift, because every open question waits for a meeting. Projects run by nobody fail quietly and get blamed on the software.",
        ],
      },
      {
        heading: "Decide what actually moves",
        paragraphs: [
          "List every category of data and decide, explicitly, whether it moves, is archived, or is abandoned. Customers, suppliers, the chart of accounts, opening balances, open invoices, stock items, employee records.",
          "The honest answer for historical transactions is usually that they stay in the old system with read only access retained. That is fine, provided somebody has confirmed you can still retrieve them when SARS or an auditor asks.",
        ],
      },
      {
        heading: "Clean before you migrate",
        paragraphs: [
          "Every dataset is worse than its owner believes. Duplicate customers, suppliers who ceased trading years ago, stock items with no cost, employees with missing tax numbers.",
          "Clean it in the old system before it moves. Migrating rubbish gives you a new system full of the same rubbish, plus a general suspicion that the new system is unreliable.",
        ],
      },
      {
        heading: "Run in parallel and define the exit",
        paragraphs: [
          "Run both systems for at least one full cycle, whether that is a month of accounting, a payroll run, or a stock count. Compare properly, at line level rather than totals.",
          "Then agree in advance what has to be true before the old system goes off. A reconciled trial balance, a payroll that matched to the cent, a stock count that agrees. Write those conditions down before you start, because deciding them under pressure produces optimism rather than judgement.",
        ],
      },
      {
        heading: "Train the people who will actually use it",
        paragraphs: [
          "Training the manager who chose it is not training. The people who capture invoices, run payroll or pick stock need time in the system before go live, on their own work rather than a demonstration dataset.",
          "Budget the hours and protect them. Every hour skipped here comes back as an error in the first month, at a much worse moment.",
        ],
      },
      {
        heading: "Agree what happens when it goes wrong",
        paragraphs: [
          "Before go live, decide who you call, in what order, and what the fallback is if the new system cannot process something urgent. For payroll that means knowing you can still pay people. For accounting it means knowing you can still invoice.",
          "Write it down and tell the team. A plan that lives in one person's head fails on the day that person is on leave, which is reliably the day it is needed.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does a software implementation take?",
        answer: "Cloud accounting or payroll can be days to a few weeks including a parallel run. An ERP is months. The variable is rarely the software and almost always data quality and the availability of your own people.",
      },
      {
        question: "Should I run old and new systems in parallel?",
        answer: "Yes, for at least one full cycle. It is duplicated work and it is the cheapest insurance available, because it finds setup errors before they reach an employee or a customer.",
      },
      {
        question: "Who should own a software implementation?",
        answer: "One named person with enough authority to decide on process and data, and to escalate to the vendor. Committees drift and unowned projects fail quietly.",
      },
    ],
    relatedProducts: ["sage-evolution", "simplepay", "xero", "odoo"],
    relatedGuides: ["total-cost-of-ownership-software", "switching-accounting-software-mid-year", "questions-before-switching-payroll"],
  },

  "free-trial-testing-software": {
    lead: "Most free trials are wasted clicking around a demonstration company full of somebody else's invoices. Use your own awkward records instead and you will learn more in one day than in a month of browsing.",
    takeaways: [
      "Never evaluate inside the demo company that ships with the product",
      "Connect your own bank accounts and put through your own worst transaction",
      "Give the trial a defined task and a defined deadline",
    ],
    sections: [
      {
        heading: "Delete the demo data",
        paragraphs: [
          "Every product ships with a sample company designed to make it look good. Every workflow is smooth because the data was built to make it smooth.",
          "Start a clean file and put your own information in. Ten of your customers, ten of your suppliers, your actual chart of accounts. It takes an hour and it is the difference between a demonstration and a test.",
        ],
      },
      {
        heading: "Bring the awkward case",
        paragraphs: [
          "Every business has a transaction that is difficult. A part payment against three invoices. A credit note that crosses a VAT period. A foreign supplier. An employee with a commission structure nobody can explain.",
          "Put that through the trial. The smooth path works in every product on the market. What separates them is what happens at the edge, and the edge is where your time actually goes.",
        ],
      },
      {
        heading: "Connect the things it has to connect to",
        paragraphs: [
          "For accounting, connect your real bank accounts and wait two or three days to confirm transactions actually arrive, complete and daily. A feed that connects is not the same as a feed that delivers.",
          "For anything else, test the integration you are relying on. If the plan depends on the CRM talking to the accounting package, build that link during the trial rather than assuming a logo on a website means it works.",
        ],
      },
      {
        heading: "Give it a task and a deadline",
        paragraphs: [
          "An open ended trial gets nowhere because nobody has time. Instead set a specific task. Reconcile last month. Run last month's payroll in parallel. Load the current pipeline and produce a forecast.",
          "Book two hours in a diary, and pick the day. A trial without a booked appointment expires unused, and you end up choosing on the sales page after all.",
        ],
      },
      {
        heading: "Involve whoever will actually use it",
        paragraphs: [
          "The person who will capture invoices every day should be in the trial. Their opinion about how many clicks something takes is worth more than any feature comparison, because they are the one who will repeat it two hundred times a year.",
          "It is also the cheapest way to get adoption. People who chose a system defend it. People who had one imposed on them find reasons it does not work.",
        ],
      },
      {
        heading: "Test support while you are still a prospect",
        paragraphs: [
          "During the trial, send a real question to support and time the reply. You will never have more leverage than as an unconverted prospect, so the answer you get now is the best case rather than the average.",
          "Ask something specific to South Africa. A question about VAT treatment, a bargaining council or a local bank feed tells you far more about whether the vendor understands this market than a question about a general feature.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long are software free trials in South Africa?",
        answer: "Thirty days is common for accounting and payroll, including Sage, Xero, QuickBooks and Business Central. Fourteen days is typical for CRM. Shopify offers three days. Some vendors offer a trial without publishing a length.",
      },
      {
        question: "Do free trials need a credit card?",
        answer: "Often not. Xero, QuickBooks and Pipedrive all start without card details. Check before you begin, and if a card is required, diarise the cancellation date immediately.",
      },
      {
        question: "What should I test in a free trial?",
        answer: "Your own data, your most awkward transaction, your real bank feeds, and any integration the plan depends on. Testing the smooth path tells you nothing, because every product handles that well.",
      },
    ],
    relatedProducts: ["xero", "sage-accounting", "quickbooks-online", "business-central"],
    relatedGuides: ["bank-feeds-south-africa", "choose-accounting-software-south-africa", "software-implementation-checklist"],
  },

  "crm-your-team-will-update": {
    lead: "Every failed CRM has the same cause, and it is never the feature list. A CRM nobody updates is a database of stale information that people trust more than they should.",
    takeaways: [
      "Adoption is a design and management problem before it is a software problem",
      "Fewer required fields beats more complete data that nobody enters",
      "If the pipeline is not used in the sales meeting, it will not be maintained",
    ],
    sections: [
      {
        heading: "Why CRM projects die",
        paragraphs: [
          "They die because updating the system is work that benefits somebody else. The salesperson does the typing and the manager gets the report. Unless that imbalance is addressed, entries become sparse, then stale, then wrong.",
          "The failure is rarely dramatic. Six months later the pipeline is nonsense, everybody has gone back to their own spreadsheet, and the subscription is still being paid.",
        ],
      },
      {
        heading: "Make the CRM useful to the person typing",
        paragraphs: [
          "The fix is to make the system give the salesperson something back. The next action on every deal, so they open it each morning to see what to do. Email tracking so they know a quote was read. Automated follow ups so nothing is forgotten.",
          "When the CRM is the thing that tells you what to do today, it gets updated. When it is a reporting obligation, it does not.",
        ],
      },
      {
        heading: "Fewer fields, not more",
        paragraphs: [
          "There is a strong temptation to capture everything. Industry, source, competitor, decision maker, budget confirmed, and fifteen more. Every required field is friction on every deal, and friction is what kills adoption.",
          "Start with the minimum that makes the pipeline meaningful. Value, stage, next action, owner and expected close. Add a field only when somebody can say what decision it will change.",
        ],
      },
      {
        heading: "Use it in the meeting or lose it",
        paragraphs: [
          "The single most effective adoption tactic costs nothing. Run the weekly sales meeting from the pipeline on screen. Do not accept a verbal update on a deal that is not in the system.",
          "This changes behaviour within two weeks, because the cost of not updating becomes immediate and visible. No amount of training achieves the same thing.",
        ],
      },
      {
        heading: "Choose for simplicity at the point of entry",
        paragraphs: [
          "When comparing products, weight the daily experience of the salesperson above the reporting capability of the manager. A drag and drop pipeline that takes four seconds to update beats a more capable system that takes forty.",
          "This is why Pipedrive does well with small sales teams despite being lighter on marketing and service than the suites. The thing it optimises for is the thing that determines whether any of it works.",
        ],
      },
      {
        heading: "Start with one pipeline, not five",
        paragraphs: [
          "The instinct on setup is to model every process the business has. Separate pipelines for new business, renewals, upsells and partner deals, each with their own stages.",
          "Start with one. A single pipeline that everybody understands produces a forecast you can trust. Five pipelines built in the first fortnight produce five sets of half maintained data and an argument about which report is right.",
        ],
      },
      {
        heading: "Decide what a closed lost deal means",
        paragraphs: [
          "Pipelines rot at the bottom. Deals that will never close sit open for months because nobody wants to mark them lost, and the forecast becomes an aspiration rather than a number.",
          "Set a rule. A deal with no activity for a defined period is closed lost automatically, and can be reopened if it revives. It costs nothing and it is the difference between a pipeline and a graveyard.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why do CRM implementations fail?",
        answer: "Almost always adoption. The person entering data gets less from it than the person reading the reports, so entries become sparse and then unreliable. It is a design and management problem rather than a software one.",
      },
      {
        question: "How do I get my sales team to use the CRM?",
        answer: "Run the sales meeting from the pipeline on screen and refuse verbal updates on deals that are not in it. Reduce required fields to the minimum. Make sure the system tells the salesperson what to do next.",
      },
      {
        question: "Which CRM is easiest for a small team?",
        answer: "Pipedrive is the simplest to adopt for a pure sales pipeline. Zoho and HubSpot offer more breadth including marketing and service, with free tiers, at the cost of a little more setup.",
      },
    ],
    relatedProducts: ["pipedrive", "hubspot-crm", "zoho-crm", "skynamo"],
    relatedGuides: ["crm-pricing-explained", "free-trial-testing-software", "software-implementation-checklist"],
  },

  "stock-control-when-spreadsheets-stop-working": {
    lead: "A spreadsheet handles stock perfectly well until it does not, and the moment it stops usually announces itself as a count that will not reconcile no matter how many times you do it.",
    takeaways: [
      "The signal is not volume, it is how many people touch stock",
      "Accounting software with stock is a real middle option before ERP",
      "Costing method matters more than most buyers realise",
    ],
    sections: [
      {
        heading: "The signs you have outgrown it",
        paragraphs: [
          "More than one person updating the same file. A count that does not reconcile and nobody can explain why. Selling something you do not have. Not knowing what a job or a product actually cost.",
          "Notice that none of those is about the number of items. A business with two hundred lines and three people touching them has outgrown a spreadsheet. A business with two thousand lines and one careful person may not have.",
        ],
      },
      {
        heading: "What accounting software with stock gives you",
        paragraphs: [
          "Most of the cloud ledgers handle basic stock. Items, quantities, a cost, and a link to invoicing so selling something reduces the count automatically. For a business buying and reselling finished goods, this is frequently enough.",
          "What it generally does not give you is multiple warehouses, lot or serial traceability, or any concept of manufacturing. If you need those, you are looking at the next tier rather than at the entry level cloud products.",
        ],
      },
      {
        heading: "The middle tier most buyers skip",
        paragraphs: [
          "Between a cloud ledger and a full ERP sits a group of products doing serious stock control without enterprise cost. Sage 200 Evolution, Palladium and Omni Accounts all live here, and all are established in the South African market.",
          "For a distributor or a small manufacturer this tier usually solves the actual problem. It is worth a proper look before accepting a quote for something considerably larger.",
        ],
      },
      {
        heading: "Ask about costing method",
        paragraphs: [
          "How the system values stock changes your reported profit. Weighted average, first in first out and standard costing all produce different numbers from the same transactions.",
          "Ask which methods a product supports and which your accountant expects. This is a question buyers almost never ask and one that becomes awkward at year end when the stock valuation does not look like last year's.",
        ],
      },
      {
        heading: "The process matters more than the software",
        paragraphs: [
          "Stock systems fail for the same reason spreadsheets do. Goods arrive and nobody records them. Items go out on a promise. Adjustments are made without a reason recorded.",
          "Before buying anything, fix who is allowed to move stock and what has to be captured when they do. A system without that discipline produces wrong numbers faster and with more authority than a spreadsheet did.",
        ],
      },
      {
        heading: "Count before you migrate, not after",
        paragraphs: [
          "Do a full physical count immediately before opening balances go into a new system. Loading quantities you already suspect are wrong guarantees that every variance for the next year is arguable.",
          "It is unpopular and it usually means closing for a day. It is also the only moment when your recorded stock and your actual stock are known to agree, and every number that follows depends on that.",
        ],
      },
    ],
    faqs: [
      {
        question: "When should a business move from spreadsheets to stock software?",
        answer: "When more than one person updates stock, when counts stop reconciling, or when you cannot say what a product or job actually cost. It is driven by how many people touch stock rather than by the number of items.",
      },
      {
        question: "Can accounting software handle stock control?",
        answer: "For buying and reselling finished goods, usually yes. For multiple warehouses, batch or serial traceability, or manufacturing, you need the middle tier products or an ERP.",
      },
      {
        question: "What stock software is used in South Africa?",
        answer: "Sage 200 Evolution, Palladium and Omni Accounts are well established in the middle tier. Above that sit SYSPRO, Sage X3 and SAP Business One for manufacturers and distributors.",
      },
    ],
    relatedProducts: ["sage-evolution", "palladium-accounting", "omni-accounts", "syspro"],
    relatedGuides: ["erp-or-accounting-software", "total-cost-of-ownership-software", "software-implementation-checklist"],
  },
};
