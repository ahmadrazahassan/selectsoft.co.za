export type Category = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  longDescription: string;
  icon: "calculator" | "users" | "contact" | "boxes" | "clipboard" | "store" | "messages";
};

export type Product = {
  slug: string;
  name: string;
  vendor: string;
  category: string;
  shortCategory: string;
  score: number;
  verdict: string;
  bestFor: string;
  initials: string;
  tone: "blue" | "stone" | "paper" | "ink";
  reviewed: string;
  facts: { label: string; value: string }[];
  pros: string[];
  cons: string[];
  features: string[];
  localView: string;
  sourceUrl: string;
};

export type Guide = {
  slug: string;
  topic: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  art: "ledger" | "people" | "pipeline" | "operations" | "privacy";
};

export type Comparison = {
  slug: string;
  productA: string;
  productB: string;
  title: string;
  summary: string;
  verdict: string;
  criteria: { name: string; a: string; b: string; view: string }[];
};

export const categories: Category[] = [
  {
    slug: "accounting-finance",
    name: "Accounting and Finance",
    shortName: "Accounting",
    summary: "Invoicing, bookkeeping, reporting and cash flow tools for South African teams.",
    longDescription:
      "Good accounting software should make routine finance work calmer, give owners a reliable view of cash and make collaboration with an accountant easier. We look closely at reporting, bank feeds, tax workflows, support and the true cost of running each product.",
    icon: "calculator",
  },
  {
    slug: "payroll-hr",
    name: "Payroll and HR",
    shortName: "Payroll",
    summary: "Payroll, leave, HR records and workforce tools with local requirements in view.",
    longDescription:
      "Payroll software carries real operational weight. Our reviews consider everyday payroll work, statutory updates, employee access, reporting, support and how clearly a provider explains responsibility when legislation changes.",
    icon: "users",
  },
  {
    slug: "crm-sales",
    name: "CRM and Sales",
    shortName: "CRM",
    summary: "Manage leads, customer relationships, pipelines and sales activity.",
    longDescription:
      "A useful CRM fits the habits of the people who update it. We consider contact management, pipeline clarity, automation, reporting, implementation effort and the cost of adding a growing team.",
    icon: "contact",
  },
  {
    slug: "erp-operations",
    name: "ERP and Operations",
    shortName: "ERP",
    summary: "Connect finance, inventory, procurement and operational workflows.",
    longDescription:
      "ERP choices have long consequences. We focus on implementation reality, partner support, reporting, integrations, data ownership and how well each system can grow with a more complex operation.",
    icon: "boxes",
  },
  {
    slug: "project-management",
    name: "Project Management",
    shortName: "Projects",
    summary: "Plan work, coordinate teams and keep delivery visible.",
    longDescription:
      "Project tools should remove uncertainty without adding administration. We assess planning, collaboration, reporting, permissions and the learning curve for teams that need to start quickly.",
    icon: "clipboard",
  },
  {
    slug: "commerce-pos",
    name: "Commerce and Point of Sale",
    shortName: "Commerce",
    summary: "Sell online or in person, accept payments and manage stock.",
    longDescription:
      "Commerce software must work at the counter and behind the scenes. We review payment options, inventory, reporting, hardware, ecommerce connections and the support available when trading cannot stop.",
    icon: "store",
  },
  {
    slug: "marketing-support",
    name: "Marketing and Support",
    shortName: "Marketing",
    summary: "Reach customers, manage campaigns and deliver better service.",
    longDescription:
      "Marketing and support systems should help a team respond with context. We examine contact limits, automation, reporting, service workflows, permissions and the effort required to maintain good customer data.",
    icon: "messages",
  },
];

export const products: Product[] = [
  {
    slug: "sage-accounting",
    name: "Sage Accounting",
    vendor: "Sage",
    category: "Accounting and Finance",
    shortCategory: "Accounting",
    score: 8.3,
    verdict:
      "A dependable accounting choice for small businesses that want familiar workflows and access to a broad local partner network.",
    bestFor: "Established small businesses that value familiar local support",
    initials: "SA",
    tone: "ink",
    reviewed: "19 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small business" },
      { label: "Pricing", value: "From R240 per month incl. VAT" },
      { label: "Support", value: "Online and partner support" },
    ],
    pros: [
      "VAT is tracked per transaction and reports out in a shape that maps onto a VAT201",
      "Your accountant gets their own login, so month end is collaboration rather than an export",
      "More South African bookkeepers know Sage than any other cloud ledger, which lowers your monthly processing cost",
    ],
    cons: [
      "Advanced inventory, debtors management and time tracking are each billed on top of the plan",
      "Standard covers two users and one company, so a third user or a second entity changes the price",
      "Stock across more than one warehouse pushes you towards Evolution sooner than the sales conversation suggests",
    ],
    features: ["Invoicing", "Banking", "Reporting", "Expense capture", "Customer and supplier records"],
    localView:
      "Sage has been selling accounting software in South Africa for decades and the consequence is a labour market rather than a feature. You can hire a bookkeeper who already knows it, and you can change accountants without changing systems. The VAT201 handling and the local bank feeds are built for this market rather than localised afterwards. Two things to confirm before you sign. Check that your specific bank and account type has a working feed, because coverage is not uniform across the local banks. Then price the add on modules you will actually need, because the R240 headline covers one user and very little else.",
    sourceUrl: "https://www.sage.com/en-za/sage-business-cloud/accounting/",
  },
  {
    slug: "xero",
    name: "Xero",
    vendor: "Xero",
    category: "Accounting and Finance",
    shortCategory: "Accounting",
    score: 8.4,
    verdict:
      "Polished cloud accounting with strong collaboration and an extensive app ecosystem, especially appealing when an adviser already works in Xero.",
    bestFor: "Growing service businesses working closely with an accountant",
    initials: "XO",
    tone: "blue",
    reviewed: "18 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small and growing business" },
      { label: "Pricing", value: "From R450 per month" },
      { label: "Support", value: "Online support" },
    ],
    pros: [
      "The reconciliation screen is the fastest of the cloud ledgers once bank rules are trained",
      "Report layouts are editable, so a management pack can be built once and reused every month",
      "A very large local adviser community, which makes finding a Xero literate accountant easy",
    ],
    cons: [
      "There is no South African payroll, so you will run and pay for a second product alongside it",
      "The 80 percent introductory discount makes the first three months a poor guide to the real cost",
      "Starter plan limits on invoices and bills are tight enough that most businesses move up within a year",
    ],
    features: ["Bank reconciliation", "Invoicing", "Reporting", "Bills", "Project tracking"],
    localView:
      "Xero works well here but it is not a South African product and the gaps show in two places. It ships no local payroll, so budget for SimplePay or a bureau on top from day one. Bank feed coverage varies by bank and by account type, and a missing feed removes most of the reason to buy Xero, so test your own accounts during the trial rather than trusting the marketing list. The adviser community is genuinely deep locally, which is the strongest practical argument for it. Price the whole stack, because Xero plus payroll plus document capture is the real monthly number.",
    sourceUrl: "https://www.xero.com/za/",
  },
  {
    slug: "quickbooks-online",
    name: "QuickBooks Online",
    vendor: "Intuit",
    category: "Accounting and Finance",
    shortCategory: "Accounting",
    score: 8.0,
    verdict:
      "A practical cloud accounting product with accessible reporting and a familiar workflow for owners who want to stay close to the numbers.",
    bestFor: "Owner managed businesses that want accessible financial reporting",
    initials: "QB",
    tone: "paper",
    reviewed: "15 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small business" },
      { label: "Pricing", value: "From R322 per month" },
      { label: "Support", value: "Online support" },
    ],
    pros: [
      "The clearest owner facing dashboard of the cloud ledgers, readable without any training",
      "A dedicated accountant seat sits outside your paid user count on every plan",
      "Automated invoice reminders chase debtors without anyone remembering to do it",
    ],
    cons: [
      "Simple Start covers one user only, so a bookkeeper and an owner already means Essentials",
      "Multi currency is not available until Essentials, which matters if you import",
      "A smaller pool of South African bookkeepers work in it than in Sage or Xero",
    ],
    features: ["Invoicing", "Expenses", "Reporting", "Banking", "Cash flow view"],
    localView:
      "Intuit sells and prices QuickBooks in rand for South Africa and the VAT handling is localised properly, which puts it ahead of most global products that simply become available here. The weaker point is the local ecosystem. Fewer accountants work in it day to day than in Sage or Xero, so check that your accountant is comfortable before you commit, because the cost of them learning your system usually lands on your invoice. The 70 percent introductory discount runs for six months and then the standing price applies, so budget against R322 rather than the promotional figure.",
    sourceUrl: "https://quickbooks.intuit.com/za/",
  },
  {
    slug: "zoho-books",
    name: "Zoho Books",
    vendor: "Zoho",
    category: "Accounting and Finance",
    shortCategory: "Accounting",
    score: 8.3,
    verdict:
      "Good value accounting with a broad feature set, particularly attractive for teams already invested in the wider Zoho suite.",
    bestFor: "Cost conscious teams using other Zoho products",
    initials: "ZB",
    tone: "stone",
    reviewed: "12 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small and medium business" },
      { label: "Pricing", value: "Free plan, then from R99 per month" },
      { label: "Support", value: "Online support" },
    ],
    pros: [
      "The free plan under one million rand of annual revenue is a working ledger, not a limited trial",
      "Priced per organisation rather than per user, so adding a bookkeeper does not raise the bill",
      "Real ZAR pricing and local VAT handling, which most global products at this price do not offer",
    ],
    cons: [
      "Very few South African bookkeepers work in it, so you may end up training your accountant",
      "The interface assumes some accounting vocabulary and is less forgiving than Xero for a first time user",
      "Most of the value appears once you adopt the wider Zoho suite, which is a larger commitment",
    ],
    features: ["Invoicing", "Purchases", "Automation", "Inventory", "Reporting"],
    localView:
      "Zoho is unusual among global vendors in publishing genuine rand pricing for Books rather than billing in dollars, and the VAT treatment is properly localised. For a young South African business the free plan under one million rand of revenue is the most generous offer in this market by a wide margin. The practical obstacle is your accountant. Most local practices work in Pastel, Sage or Xero, and handing them a Zoho file may meet resistance or an extra fee. Ask your accountant before you commit, because the answer decides whether the saving is real.",
    sourceUrl: "https://www.zoho.com/za/books/",
  },
  {
    slug: "simplepay",
    name: "SimplePay",
    vendor: "SimplePay",
    category: "Payroll and HR",
    shortCategory: "Payroll",
    score: 9.0,
    verdict:
      "Focused South African payroll software that keeps routine processing straightforward while covering the local detail payroll teams need.",
    bestFor: "South African small and medium employers",
    initials: "SP",
    tone: "blue",
    reviewed: "17 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small and medium employer" },
      { label: "Pricing", value: "About R23.55 per employee per month" },
      { label: "Support", value: "Local support" },
    ],
    pros: [
      "IRP5 and IT3(a) certificates export in the format e@syFile expects, which shortens reconciliation season",
      "Priced per employee with no licence fee, so the cost follows the size of your payroll",
      "Employee self service removes the most common interruption in a payroll administrator month",
    ],
    cons: [
      "It is payroll and leave, not an HR system, so performance and recruitment need another tool",
      "A free trial is offered but the length is not published, so you have to ask",
      "Above five hundred employees or as a payroll bureau you need a separate quote",
    ],
    features: ["Payroll processing", "Leave", "Employee self service", "Statutory reports", "Payroll reports"],
    localView:
      "This is a South African product built for South African statutory reality rather than a global payroll with a local module bolted on, and the difference shows every February when the tax year changes. PAYE, UIF and SDL are maintained for you, the e@syFile export works, and the support team understands what you are asking without a translation layer. It posts the payroll journal into Xero and QuickBooks directly, which removes the monthly manual journal that causes most payroll to ledger differences. For most South African small employers this is the sensible default.",
    sourceUrl: "https://www.simplepay.co.za/",
  },
  {
    slug: "payspace",
    name: "PaySpace",
    vendor: "PaySpace",
    category: "Payroll and HR",
    shortCategory: "Payroll",
    score: 8.6,
    verdict:
      "Serious cloud payroll and workforce management for organisations that need more scale, structure and regional reach.",
    bestFor: "Larger employers and regional payroll operations",
    initials: "PS",
    tone: "ink",
    reviewed: "10 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Medium and large employer" },
      { label: "Pricing", value: "On request, priced per employee" },
      { label: "Support", value: "Implementation and support" },
    ],
    pros: [
      "Statutory rules maintained for a long list of African countries in a single platform",
      "Several legal entities in one instance with consolidated reporting, without separate payrolls",
      "Payroll and human resources sit on the same employee record rather than in two systems",
    ],
    cons: [
      "No public rate card, so budgeting requires a scoping conversation first",
      "The Deel acquisition means the roadmap and support structure now sit with a global parent",
      "Considerably heavier than a small employer needs, both to implement and to run",
    ],
    features: ["Payroll", "Employee records", "Workflow", "Analytics", "Regional processing"],
    localView:
      "PaySpace has a long and genuinely good record in South African payroll, particularly for groups that operate in several African countries and want one platform maintaining the statutory rules for each. It is now sold as Deel Local Payroll after the acquisition, and that is the thing to probe. Ask which support team you will actually reach, whether your quoted rate holds for the contract term, and what happens at renewal. Get those answers in writing. The payroll engine is not the risk here. The commercial packaging is what has changed.",
    sourceUrl: "https://www.payspace.com/southafrica",
  },
  {
    slug: "hubspot-crm",
    name: "HubSpot CRM",
    vendor: "HubSpot",
    category: "CRM and Sales",
    shortCategory: "CRM",
    score: 8.1,
    verdict:
      "An approachable CRM with an easy starting point and a broad growth path, though costs need watching as more hubs and seats are added.",
    bestFor: "Growing marketing and sales teams that want one connected platform",
    initials: "HS",
    tone: "stone",
    reviewed: "14 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small and growing business" },
      { label: "Pricing", value: "Free CRM, then about R112 per seat" },
      { label: "Support", value: "Plan dependent" },
    ],
    pros: [
      "The free tier is a genuine CRM with unlimited contacts and a working pipeline, not a trial",
      "Sales people actually update it, which is the only measure of a CRM that matters",
      "The meeting booking link removes the scheduling exchange and measurably lifts conversion",
    ],
    cons: [
      "The step from Starter to Professional is many times the price and arrives sooner than expected",
      "Billed in dollars with no rand pricing, so every invoice carries a bank conversion cost",
      "Marketing contact tiers increase the bill as your database grows, whether or not you email them",
    ],
    features: ["Contact management", "Pipeline", "Email tools", "Reporting", "Automation"],
    localView:
      "HubSpot has no South African billing entity, so you are charged in dollars and your bank adds a conversion fee on every invoice. At the free tier that does not matter. At Professional it becomes a real and variable line in your budget that moves with the exchange rate. There is a good local partner community for implementation. The advice for a South African business is to start free, stay free while it serves you, and model the Professional pricing at a conservative exchange rate before you build your whole revenue process on it.",
    sourceUrl: "https://www.hubspot.com/products/crm",
  },
  {
    slug: "zoho-crm",
    name: "Zoho CRM",
    vendor: "Zoho",
    category: "CRM and Sales",
    shortCategory: "CRM",
    score: 8.2,
    verdict:
      "A flexible CRM with broad automation and strong value, best for teams willing to spend time shaping it around a defined sales process.",
    bestFor: "Value conscious sales teams that need flexible automation",
    initials: "ZC",
    tone: "paper",
    reviewed: "11 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small and medium business" },
      { label: "Pricing", value: "Free for 3 users, then about R224 per user" },
      { label: "Support", value: "Online support" },
    ],
    pros: [
      "Free forever for three users, with leads, deals, workflows and reporting included",
      "Automation and custom modules go far beyond what the price bracket normally offers",
      "Connects to Books, Desk and Campaigns, so the suite becomes coherent rather than stitched together",
    ],
    cons: [
      "It rewards a defined sales process and will not impose one, so setup effort is real",
      "Billed in dollars with local taxes added, so there is no rand price to budget against",
      "Fewer local implementation partners than HubSpot or Salesforce if you want help",
    ],
    features: ["Leads", "Pipeline", "Workflow", "Analytics", "Sales forecasting"],
    localView:
      "Zoho bills South African customers in dollars for CRM even though it publishes rand pricing for Books, so expect a conversion cost on each invoice and local taxes on top. The free edition for three users is a fair way for a small South African sales team to start without a procurement conversation. The honest warning is about effort. Zoho gives you a great deal of capability for the money and expects you to configure it. If nobody in the business will own that setup, the licence saving disappears into a CRM nobody trusts.",
    sourceUrl: "https://www.zoho.com/crm/",
  },
  {
    slug: "odoo",
    name: "Odoo",
    vendor: "Odoo",
    category: "ERP and Operations",
    shortCategory: "ERP",
    score: 8.0,
    verdict:
      "A broad modular business platform that can deliver excellent value when scope, implementation and customisation are kept under control.",
    bestFor: "Growing operations that want a modular system",
    initials: "OD",
    tone: "stone",
    reviewed: "09 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud or managed setup" },
      { label: "Ideal team", value: "Growing and medium business" },
      { label: "Pricing", value: "One app free, then about R116 per user" },
      { label: "Support", value: "Vendor and partner options" },
    ],
    pros: [
      "One app free for unlimited users, permanently, which is unmatched if your need is narrow",
      "Accounting through manufacturing and ecommerce share one database, removing integration work",
      "Manufacturing depth at a price far below traditional manufacturing ERP",
    ],
    cons: [
      "The economics change completely the moment you need a second app",
      "South African localisation is community maintained rather than vendor guaranteed",
      "Odoo Studio makes customisation easy and upgrades harder, which is a trap for the unwary",
    ],
    features: ["Accounting", "Inventory", "Sales", "Manufacturing", "Commerce"],
    localView:
      "The important South African caveat is localisation. Odoo VAT and payroll handling for this country is maintained by the community and by partners rather than guaranteed by the vendor the way Sage guarantees a Pastel tax update. That is a meaningful difference in risk, and it is the question to put to any partner in writing before you sign. Get a named person who is responsible for keeping your VAT treatment correct. The product itself is capable and good value. The support model for local compliance is where the exposure sits.",
    sourceUrl: "https://www.odoo.com/",
  },
  {
    slug: "business-central",
    name: "Dynamics 365 Business Central",
    vendor: "Microsoft",
    category: "ERP and Operations",
    shortCategory: "ERP",
    score: 8.2,
    verdict:
      "A capable business management platform for organisations already comfortable with Microsoft, provided implementation scope is treated seriously.",
    bestFor: "Established businesses invested in Microsoft tools",
    initials: "BC",
    tone: "blue",
    reviewed: "08 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Medium business" },
      { label: "Pricing", value: "About R1 280 per user per month" },
      { label: "Support", value: "Partner led" },
    ],
    pros: [
      "Copilot is included in the licence rather than sold as a separate AI add on",
      "Work against live data inside Outlook and Excel, which removes a lot of copying between systems",
      "Team Members licences give read and approve access cheaply, which controls the total cost",
    ],
    cons: [
      "Billed in dollars per user per year, so the rand cost moves with the exchange rate",
      "Partner implementation is usually a larger number than the licence itself",
      "Heavier than a South African mid market product for a single company with simple needs",
    ],
    features: ["Finance", "Sales", "Inventory", "Projects", "Reporting"],
    localView:
      "Business Central is properly localised for South African VAT and is well supported by a deep local Microsoft partner channel, so finding help is not difficult. The cost is the consideration. Microsoft charges in dollars per user per year, so your rand cost drifts with the exchange rate in a way that a locally priced product does not. Use Team Members licences aggressively for anyone who only needs to read or approve, because full licences for casual users is the most common way this becomes expensive. Get the implementation quoted separately from the licence.",
    sourceUrl: "https://www.microsoft.com/en-za/dynamics-365/products/business-central",
  },
  {
    slug: "shopify",
    name: "Shopify",
    vendor: "Shopify",
    category: "Commerce and Point of Sale",
    shortCategory: "Commerce",
    score: 8.2,
    verdict:
      "A polished commerce platform that makes it easier to launch and operate a serious online shop, with extra attention needed for local payments and app costs.",
    bestFor: "Brands that want a reliable hosted online store",
    initials: "SH",
    tone: "ink",
    reviewed: "07 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small and growing retailer" },
      { label: "Pricing", value: "About R400 per month" },
      { label: "Support", value: "Online support" },
    ],
    pros: [
      "A credible store live in a day, run by someone who is not technical",
      "One of the highest converting checkouts available, which is the feature most worth paying for",
      "Sell through social and marketplaces from the same inventory, which prevents overselling",
    ],
    cons: [
      "Shopify Payments is unavailable in South Africa, so an extra transaction fee applies on top of your gateway fee",
      "The trial is only three days, which is not enough to build and test a real store",
      "App subscriptions turn a low monthly plan into a considerably higher one",
    ],
    features: ["Online store", "Orders", "Inventory", "Themes", "Apps"],
    localView:
      "The single most important South African fact about Shopify is that Shopify Payments is not available here. You will use a local gateway such as Payfast, Yoco or Peach, and Shopify charges an additional transaction fee on top of what that gateway already takes. Model both fees together against your expected turnover, because at volume this is a larger number than the subscription. Local shipping and courier apps are available and well supported, and there is a strong local agency community. Just do the payment arithmetic honestly before you commit.",
    sourceUrl: "https://www.shopify.com/za",
  },
  {
    slug: "yoco",
    name: "Yoco",
    vendor: "Yoco",
    category: "Commerce and Point of Sale",
    shortCategory: "Commerce",
    score: 8.8,
    verdict:
      "A confident local payment and point of sale option that is easy for smaller merchants to understand and put to work.",
    bestFor: "South African small retailers and service businesses",
    initials: "YO",
    tone: "paper",
    reviewed: "06 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud and payment hardware" },
      { label: "Ideal team", value: "Small merchant" },
      { label: "Pricing", value: "R0 per month on Core, card fees apply" },
      { label: "Support", value: "Local support" },
    ],
    pros: [
      "Card machines from R699 and no monthly fee on Core, so a small trader can start immediately",
      "Rates fall as monthly volume rises, from around 2.30 percent to 1.20 percent in person",
      "Next day settlement, which matters a great deal to a business managing cash week to week",
    ],
    cons: [
      "Deliberately narrow, so it is card acceptance rather than a full point of sale",
      "Paying R499 for the Pro rate only pays for itself above a certain monthly turnover",
      "Large merchants will get a better rate negotiating directly with a bank acquirer",
    ],
    features: ["Card payments", "Point of sale", "Payment links", "Sales reporting", "Online payments"],
    localView:
      "Yoco exists because traditional South African acquirers would not onboard small merchants without a trading history, and it solved that. Onboarding is quick, the hardware is affordable, and settlement is fast. The decision is arithmetic rather than features. Work out your blended rate at your actual monthly card turnover across the three plans, because the plan fee only makes sense above a certain volume. Once your monthly card turnover becomes substantial, get a quote from a bank acquirer and compare properly, because at that point the rate difference outweighs the convenience.",
    sourceUrl: "https://www.yoco.com/za/",
  },
  {
    slug: "sage-pastel-accounting",
    name: "Sage Pastel Partner",
    vendor: "Sage",
    category: "Accounting and Finance",
    shortCategory: "Accounting",
    score: 8.3,
    verdict:
      "The desktop accounting package that a very large share of South African bookkeepers already know by heart, still capable and still sold through a reseller network rather than a checkout page.",
    bestFor: "Established businesses with an accountant who already works in Pastel",
    initials: "SP",
    tone: "ink",
    reviewed: "22 August 2026",
    facts: [
      { label: "Deployment", value: "Desktop with optional online access" },
      { label: "Ideal team", value: "Small and medium business" },
      { label: "Pricing", value: "On request through a Sage business partner" },
      { label: "Support", value: "Partner led, first year support usually included" },
    ],
    pros: [
      "An enormous pool of South African bookkeepers who already know the product",
      "Deep multi currency, inventory and job costing without moving up to an ERP",
      "Data stays on your own machine or server if that matters to your board",
    ],
    cons: [
      "You buy through a partner, so the real cost only appears after a quote",
      "The interface shows its age next to browser based rivals",
      "Remote and multi site working needs hosting or a terminal server on top",
    ],
    features: [
      "General ledger and cashbook",
      "Inventory and multi warehouse",
      "Job costing",
      "Multi currency processing",
      "VAT201 ready reporting",
    ],
    localView:
      "Pastel is the closest thing this market has to a default. Almost every accounting practice in the country can open a Pastel backup without asking questions, which quietly lowers the cost of monthly work and of changing accountants. Confirm the annual licence renewal, the cost of extra users and whether your partner charges separately for the yearly tax update before you commit.",
    sourceUrl: "https://www.sage.com/en-za/products/sage-pastel-accounting/",
  },
  {
    slug: "sage-business-cloud-payroll",
    name: "Sage Payroll",
    vendor: "Sage",
    category: "Payroll and HR",
    shortCategory: "Payroll",
    score: 8.6,
    verdict:
      "Sage cloud payroll priced by headcount band, with the statutory work handled for you and a clean path into Sage Accounting for the payroll journal.",
    bestFor: "Small South African employers who want statutory updates handled for them",
    initials: "SY",
    tone: "blue",
    reviewed: "22 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "1 to 200 employees" },
      { label: "Pricing", value: "From R97 per month incl. VAT for 1 to 2 employees" },
      { label: "Support", value: "Online and telephonic" },
    ],
    pros: [
      "Priced in clear headcount bands, so the monthly figure is easy to predict",
      "PAYE, UIF and SDL calculations and the statutory updates are handled for you",
      "Unlimited companies and unlimited users on every band",
    ],
    cons: [
      "Crossing a headcount band raises the monthly fee in a step, not gradually",
      "HR depth is thin next to a full people system",
      "Very large or complex payrolls will outgrow it and land on Sage 300 People",
    ],
    features: [
      "PAYE, UIF and SDL calculations",
      "Email payslips",
      "Leave management",
      "ACB bank payment files",
      "Sage Accounting integration",
    ],
    localView:
      "This is built for South African statutory reality rather than adapted to it, which shows in the UIF declaration and the ACB payment file. The band pricing is honest but watch the step when you hire past a threshold. If you run several small companies the unlimited company allowance makes it very good value for a bookkeeping practice.",
    sourceUrl: "https://www.sage.com/en-za/sage-business-cloud/payroll/",
  },
  {
    slug: "sage-pastel-payroll",
    name: "Sage Pastel Payroll",
    vendor: "Sage",
    category: "Payroll and HR",
    shortCategory: "Payroll",
    score: 8.4,
    verdict:
      "The desktop payroll that a great many South African payroll administrators trained on, strong on statutory compliance and sold through partners rather than online.",
    bestFor: "Payroll administrators who want proven local compliance on their own server",
    initials: "PP",
    tone: "stone",
    reviewed: "21 August 2026",
    facts: [
      { label: "Deployment", value: "Desktop with optional online modules" },
      { label: "Ideal team", value: "Small and medium employers" },
      { label: "Pricing", value: "On request through a Sage business partner" },
      { label: "Support", value: "First year support usually bundled" },
    ],
    pros: [
      "Long track record with SARS submissions and annual tax year changes",
      "Optional modules for employee self service and human resources",
      "Skills are widely available in the local job market",
    ],
    cons: [
      "No public price, so budgeting means getting a quote first",
      "Desktop deployment adds backup and remote access work for you",
      "Annual update cycle has to be planned around the tax year",
    ],
    features: [
      "Statutory PAYE, UIF and SDL",
      "IRP5 and IT3(a) generation",
      "Bulk payslip email",
      "Leave and loan tracking",
      "Sage Pastel Partner integration",
    ],
    localView:
      "The reason this product persists is the annual tax year change. Sage ships the update, the payroll administrator applies it and the submission season works. That reliability is worth a lot in a country where the rules move every year. Ask your partner in writing what the yearly renewal covers and whether the tax update is included or billed separately.",
    sourceUrl: "https://www.sage.com/en-za/products/sage-pastel-payroll/",
  },
  {
    slug: "sage-300-people",
    name: "Sage 300 People",
    vendor: "Sage",
    category: "Payroll and HR",
    shortCategory: "Payroll",
    score: 8.4,
    verdict:
      "The step up for South African employers who have outgrown small business payroll and need real workflow, multi company structures and human resources in one system.",
    bestFor: "Medium and large employers with complex pay structures and HR needs",
    initials: "3P",
    tone: "ink",
    reviewed: "21 August 2026",
    facts: [
      { label: "Deployment", value: "On premise or hosted" },
      { label: "Ideal team", value: "Medium and large employers" },
      { label: "Pricing", value: "On request, scoped by module and headcount" },
      { label: "Support", value: "Partner and Sage professional services" },
    ],
    pros: [
      "Handles complex earnings, shift and bargaining council structures",
      "Human resources, self service and payroll sit in one database",
      "Reporting depth that finance and HR can both work from",
    ],
    cons: [
      "Implementation is a project with real consulting cost, not a signup",
      "Overkill for an employer under roughly fifty people",
      "Total cost depends heavily on which modules you licence",
    ],
    features: [
      "Complex earnings and deductions",
      "Employment equity reporting",
      "Employee self service",
      "Workflow approvals",
      "Multi company and multi currency payroll",
    ],
    localView:
      "This is the product local groups move to when bargaining councils, shift allowances, employment equity reporting and multiple entities stop fitting a small payroll. Budget for the implementation properly. The licence is rarely the expensive part. Insist on a scoped statement of work and a named consultant before you sign.",
    sourceUrl: "https://www.sage.com/en-za/products/sage-300-people/",
  },
  {
    slug: "sage-hr",
    name: "Sage HR",
    vendor: "Sage",
    category: "Payroll and HR",
    shortCategory: "Payroll",
    score: 7.8,
    verdict:
      "A tidy cloud people system for leave, performance and employee records, useful alongside a payroll rather than instead of one.",
    bestFor: "Growing teams that need leave and HR records out of spreadsheets",
    initials: "SH",
    tone: "paper",
    reviewed: "20 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Growing small and medium business" },
      { label: "Pricing", value: "On request, priced per employee by module" },
      { label: "Support", value: "Online support" },
    ],
    pros: [
      "Clean self service that employees actually use",
      "Modular, so you can start with leave and add performance later",
      "Mobile app suits teams that are not at a desk",
    ],
    cons: [
      "It is not a South African payroll engine, so you still need one",
      "Module pricing adds up once you switch several on",
      "Reporting is lighter than a full HR information system",
    ],
    features: [
      "Leave management",
      "Employee database and documents",
      "Performance reviews",
      "Shift scheduling",
      "Expense claims",
    ],
    localView:
      "Treat this as the HR layer, not the payroll. It pairs sensibly with Sage Payroll or a local payroll bureau. Before buying, check how leave balances flow into your payroll run, because a manual re key every month removes most of the benefit you are paying for.",
    sourceUrl: "https://www.sage.com/en-za/products/sage-hr/",
  },
  {
    slug: "sage-evolution",
    name: "Sage 200 Evolution",
    vendor: "Sage",
    category: "ERP and Operations",
    shortCategory: "ERP",
    score: 8.2,
    verdict:
      "The mid market step between Pastel and a full ERP, widely implemented in South Africa and usually shaped around your business by a local partner.",
    bestFor: "Growing distributors and manufacturers outgrowing small business accounting",
    initials: "EV",
    tone: "blue",
    reviewed: "20 August 2026",
    facts: [
      { label: "Deployment", value: "On premise or hosted" },
      { label: "Ideal team", value: "Medium business" },
      { label: "Pricing", value: "On request through a Sage business partner" },
      { label: "Support", value: "Partner led" },
    ],
    pros: [
      "Strong inventory, pricing and warehouse control for distribution",
      "A deep local partner and add on ecosystem",
      "Grows with modules rather than forcing a replatform",
    ],
    cons: [
      "The quality of the outcome depends heavily on which partner you pick",
      "Customisation can make later upgrades harder",
      "No public pricing, so comparison shopping takes effort",
    ],
    features: [
      "Inventory and warehouse management",
      "Advanced pricing and discount matrices",
      "Manufacturing and bill of materials",
      "Multi branch and multi currency",
      "Business intelligence reporting",
    ],
    localView:
      "Evolution is genuinely common in South African distribution and light manufacturing, and the local skills pool is deep. The single biggest variable is your implementation partner. Ask for three reference sites in your own industry, phone all three, and make sure the quote separates licence, implementation, data migration and annual cover.",
    sourceUrl: "https://www.sage.com/en-za/products/sage-200-evolution/",
  },
  {
    slug: "palladium-accounting",
    name: "Palladium Accounting",
    vendor: "Palladium Software",
    category: "Accounting and Finance",
    shortCategory: "Accounting",
    score: 8.0,
    verdict:
      "A South African built accounting and business package with unusually strong inventory and manufacturing depth for its price, and one of the few local vendors that publishes a rate card.",
    bestFor: "Local distributors and manufacturers who want depth without ERP pricing",
    initials: "PA",
    tone: "stone",
    reviewed: "19 August 2026",
    facts: [
      { label: "Deployment", value: "On premise or hosted" },
      { label: "Ideal team", value: "Small and medium business" },
      { label: "Pricing", value: "From R4 049 ex VAT per user per year" },
      { label: "Support", value: "Vendor and partner support" },
    ],
    pros: [
      "Published tiered pricing, which is rare in this part of the market",
      "Serious inventory, bill of materials and multi warehouse control",
      "Buy outright or subscribe, depending on how you prefer to spend",
    ],
    cons: [
      "Smaller community than Pastel, so fewer bookkeepers know it already",
      "Interface is functional rather than modern",
      "Per user pricing gets noticeable once the team grows",
    ],
    features: [
      "Multi warehouse inventory",
      "Bill of materials and manufacturing",
      "Point of sale",
      "Multi currency and multi company",
      "Landed cost tracking",
    ],
    localView:
      "Built in South Africa for South African trading conditions, which shows in landed cost handling for importers and in the VAT treatment. The published tier pricing is a genuine advantage when you are comparing quotes. Note that the price falls as you add users, so ask which tier your headcount lands in before you budget.",
    sourceUrl: "https://www.palladium.co.za/",
  },
  {
    slug: "omni-accounts",
    name: "Omni Accounts",
    vendor: "Omni Accounts",
    category: "Accounting and Finance",
    shortCategory: "Accounting",
    score: 7.8,
    verdict:
      "A Durban built accounting and business system sold in modular bundles, strong for stock heavy trading businesses that want to switch capability on as they grow.",
    bestFor: "Stock heavy trading businesses that want to add capability in steps",
    initials: "OA",
    tone: "paper",
    reviewed: "19 August 2026",
    facts: [
      { label: "Deployment", value: "On premise or hosted" },
      { label: "Ideal team", value: "Small and medium business" },
      { label: "Pricing", value: "On request, modular bundles" },
      { label: "Support", value: "Vendor and reseller support" },
    ],
    pros: [
      "Modular, so you pay for the capability you actually switch on",
      "Genuinely local vendor with local support hours",
      "Good stock, pricing and point of sale handling for traders",
    ],
    cons: [
      "The module model makes total cost hard to work out without a quote",
      "Smaller pool of bookkeepers who know it",
      "Less polished than the cloud accounting products it competes with",
    ],
    features: [
      "Inventory and stock control",
      "Point of sale",
      "Debtors and creditors",
      "Manufacturing module",
      "Customer relationship module",
    ],
    localView:
      "Omni has a loyal following among South African wholesalers and retailers, and being able to phone a local team during local hours matters when trading stops. Because pricing is modular, ask for a written quote that lists every module you will need on day one and the ones you are likely to add in year two.",
    sourceUrl: "https://www.omniaccounts.co.za/",
  },
  {
    slug: "caseware",
    name: "CaseWare Working Papers",
    vendor: "CaseWare Africa",
    category: "Accounting and Finance",
    shortCategory: "Accounting",
    score: 8.7,
    verdict:
      "The working papers and financial statement engine that dominates South African accounting practices, built around local standards and the annual compilation cycle.",
    bestFor: "Accounting practices producing annual financial statements at volume",
    initials: "CW",
    tone: "ink",
    reviewed: "18 August 2026",
    facts: [
      { label: "Deployment", value: "Desktop with cloud collaboration" },
      { label: "Ideal team", value: "Accounting and audit practices" },
      { label: "Pricing", value: "On request, licensed per user" },
      { label: "Support", value: "CaseWare Africa support and training" },
    ],
    pros: [
      "Financial statement templates maintained against local reporting standards",
      "Enormous time saving on annual compilation work at volume",
      "Deep integration with the ledgers South African practices actually use",
    ],
    cons: [
      "Priced and scoped for practices, not for a single business",
      "There is a real learning curve for a new reviewer",
      "You are tied to the annual template update cycle",
    ],
    features: [
      "Working papers and review notes",
      "Annual financial statement templates",
      "Trial balance import from local ledgers",
      "Consolidations",
      "Audit and assurance modules",
    ],
    localView:
      "If you run a practice in South Africa this is close to unavoidable, and that is mostly a compliment. The value sits in templates kept current with local reporting frameworks so that a compilation does not become a formatting exercise. Cost only makes sense per financial statement produced, so work it out on your actual annual volume.",
    sourceUrl: "https://www.casewareafrica.com/",
  },
  {
    slug: "syspro",
    name: "SYSPRO",
    vendor: "SYSPRO",
    category: "ERP and Operations",
    shortCategory: "ERP",
    score: 8.6,
    verdict:
      "A South African founded ERP built for manufacturers and distributors, unusually deep on production and inventory for its bracket and supported locally at a senior level.",
    bestFor: "Manufacturers and distributors that need real production control",
    initials: "SY",
    tone: "blue",
    reviewed: "18 August 2026",
    facts: [
      { label: "Deployment", value: "On premise, private cloud or hosted" },
      { label: "Ideal team", value: "Medium and large operations" },
      { label: "Pricing", value: "On request, scoped per implementation" },
      { label: "Support", value: "Vendor and partner, local offices" },
    ],
    pros: [
      "Manufacturing depth that general purpose ERP products do not match",
      "Founded and headquartered locally, with senior local support",
      "Works on premise for operations that will not put production data offshore",
    ],
    cons: [
      "An implementation is a serious multi month project",
      "Cost is meaningful and only appears through a scoping exercise",
      "Wrong fit for a business that is not making or moving physical goods",
    ],
    features: [
      "Material requirements planning",
      "Shop floor and work order control",
      "Lot traceability and serial tracking",
      "Warehouse and distribution management",
      "Costing and factory scheduling",
    ],
    localView:
      "SYSPRO started in South Africa and still runs a substantial local operation, which means senior help is in the same time zone when a production line is waiting. That is a genuine differentiator against imported ERP. Scope carefully, insist on a phased plan, and budget for internal time as well as consulting fees.",
    sourceUrl: "https://za.syspro.com/",
  },
  {
    slug: "sap-business-one",
    name: "SAP Business One",
    vendor: "SAP",
    category: "ERP and Operations",
    shortCategory: "ERP",
    score: 7.9,
    verdict:
      "SAP for smaller companies, delivered entirely through partners, strong when a group already runs SAP or when international reporting expectations apply.",
    bestFor: "Subsidiaries and groups that need SAP alignment at a smaller scale",
    initials: "B1",
    tone: "stone",
    reviewed: "17 August 2026",
    facts: [
      { label: "Deployment", value: "On premise or cloud through a partner" },
      { label: "Ideal team", value: "Medium business and subsidiaries" },
      { label: "Pricing", value: "On request through an SAP partner" },
      { label: "Support", value: "Partner led with SAP maintenance" },
    ],
    pros: [
      "Fits neatly when a parent company already reports in SAP",
      "Solid financial control, audit trail and multi entity consolidation",
      "Large partner network with sector specific add ons",
    ],
    cons: [
      "Everything runs through a partner, including price and support quality",
      "Heavier than a local mid market product for a single company",
      "Add ons are often needed to complete the picture, and they cost extra",
    ],
    features: [
      "Financial management and consolidation",
      "Inventory and distribution",
      "Production planning",
      "Service management",
      "Analytics and reporting",
    ],
    localView:
      "In South Africa this is usually chosen for group alignment rather than on features alone. If a parent abroad reports in SAP, the reporting fit can justify the cost on its own. Choose the partner with as much care as the software, and get the annual maintenance percentage in writing before signing.",
    sourceUrl: "https://www.sap.com/africa/products/erp/business-one.html",
  },
  {
    slug: "skynamo",
    name: "Skynamo",
    vendor: "Skynamo",
    category: "CRM and Sales",
    shortCategory: "CRM",
    score: 8.3,
    verdict:
      "A South African built field sales system for reps who sell in person, combining route planning, in field ordering and live visibility for sales managers.",
    bestFor: "Field sales teams taking orders on the road",
    initials: "SK",
    tone: "paper",
    reviewed: "17 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud with mobile app" },
      { label: "Ideal team", value: "Outbound and field sales teams" },
      { label: "Pricing", value: "On request, priced per user" },
      { label: "Support", value: "Local support and onboarding" },
    ],
    pros: [
      "Built for reps in the field rather than adapted from an office CRM",
      "Works offline, which matters on South African roads and rural routes",
      "Integrates with local ledgers so orders reach invoicing cleanly",
    ],
    cons: [
      "Narrow by design, so it is not a general purpose CRM",
      "Per user pricing only appears after a conversation",
      "Value depends on reps actually using it every visit",
    ],
    features: [
      "Field order capture",
      "Route and visit planning",
      "Offline mobile working",
      "Customer visit history",
      "Accounting and ERP integration",
    ],
    localView:
      "Skynamo understands a market where a rep drives a route, signal drops and the order still has to reach the office. The offline handling is the reason to look at it. If your sales happen over email and video calls, a conventional CRM will serve you better and cost less.",
    sourceUrl: "https://skynamo.com/",
  },
  {
    slug: "ikhokha",
    name: "iKhokha",
    vendor: "iKhokha",
    category: "Commerce and Point of Sale",
    shortCategory: "Commerce",
    score: 8.7,
    verdict:
      "A Durban built card acceptance business that competes on cheap hardware, no monthly rental and support that actually answers at night.",
    bestFor: "Small South African traders who want a card machine without a monthly fee",
    initials: "IK",
    tone: "paper",
    reviewed: "05 September 2026",
    facts: [
      { label: "Deployment", value: "Payment hardware and mobile app" },
      { label: "Ideal team", value: "Small merchant" },
      { label: "Pricing", value: "No monthly rental, card machines from R699" },
      { label: "Support", value: "24 hour local support" },
    ],
    pros: [
      "No monthly rental on any machine, so a quiet trading month costs you nothing at all",
      "Card machines are bought outright from R699, and iK Tap on Phone needs no hardware whatsoever",
      "Support runs 24 hours a day on phone and WhatsApp, which is unusual at this end of the market",
      "Rates step down automatically as monthly turnover grows, without renegotiating anything",
    ],
    cons: [
      "The entry rate of 2.75 percent excluding VAT is higher than the cheapest rival at low volume",
      "You buy the hardware up front rather than renting, which is a real cost for a new trader",
      "Card acceptance and simple invoicing only, so it is not a stock or table management system",
      "Unlimited data on the machine is a separate R75 each month if you want it",
    ],
    features: ["Card payments", "Tap on Phone", "Payment links", "Digital invoices", "Prepaid vouchers"],
    localView:
      "iKhokha was built in Durban for the same merchants the banks would not onboard, and the local detail shows. FICA verification happens in the app, delivery is three to four working days anywhere in the country, and settlement timing depends on who you bank with. If you bank with FNB or Absa the money lands the next business day, and with Nedbank or the iK debit card you are paid twice a day. Support answering at ten at night matters more to a trader than a feature list does. The rate is the thing to model, because 2.75 percent excluding VAT at low volume is not the cheapest in this market, and only falls to 2.5 percent once you are turning over R80 000 a month.",
    sourceUrl: "https://www.ikhokha.com/",
  },
  {
    slug: "snapscan",
    name: "SnapScan",
    vendor: "SnapScan",
    category: "Commerce and Point of Sale",
    shortCategory: "Commerce",
    score: 8.0,
    verdict:
      "The South African QR payment that customers already have on their phones, with nothing to buy and nothing to rent.",
    bestFor: "Traders, markets and service businesses that want to take payment without hardware",
    initials: "SS",
    tone: "paper",
    reviewed: "05 September 2026",
    facts: [
      { label: "Deployment", value: "QR code and online checkout" },
      { label: "Ideal team", value: "Small merchant or practice" },
      { label: "Pricing", value: "No monthly fee, 2.95% excluding VAT per transaction" },
      { label: "Support", value: "Local support" },
    ],
    pros: [
      "Nothing to buy and nothing to rent, because the payment instrument is a printed QR code",
      "South African customers already recognise the code, which removes the explaining at the counter",
      "The rate falls as monthly turnover grows rather than staying fixed at the headline number",
      "Integrates with Sage Accounting and a long list of local point of sale systems",
    ],
    cons: [
      "At 2.95 percent excluding VAT it is dearer than a card machine rate for most merchants",
      "The customer needs a smartphone and a working data connection to pay you at all",
      "No card machine, so a customer wanting to tap a physical card cannot be served",
      "Narrow by design, offering payment acceptance rather than any kind of business management",
    ],
    features: ["QR payments", "Online payments", "Payment links", "Point of sale integrations", "Billing integrations"],
    localView:
      "SnapScan is one of the few payment products where the South African consumer side is already solved, because the app has been in circulation here for years and people know the code on sight. That familiarity is the whole argument for it. Signing up is free, there is no monthly fee and no hardware to finance, so a market trader or a small practice can take payment tomorrow. The published integration list is unusually local, covering Sage Accounting for billing and point of sale systems such as TallOrder, Pilot POS and EasiPOS that you actually meet in South African retail. Weigh the 2.95 percent excluding VAT against a card machine rate honestly, because on volume it is the more expensive way to be paid.",
    sourceUrl: "https://www.snapscan.co.za/merchant",
  },
  {
    slug: "pipedrive",
    name: "Pipedrive",
    vendor: "Pipedrive",
    category: "CRM and Sales",
    shortCategory: "CRM",
    score: 7.8,
    verdict:
      "The most straightforward pipeline CRM on this list, and the one a sales team is most likely to keep updating.",
    bestFor: "Small sales teams that want a pipeline their people will actually maintain",
    initials: "PD",
    tone: "blue",
    reviewed: "05 September 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small sales team" },
      { label: "Pricing", value: "About R224 per seat, per month" },
      { label: "Support", value: "Online support" },
    ],
    pros: [
      "The pipeline view is the clearest in this category, and salespeople update it without being chased",
      "Setup is genuinely quick, with a usable pipeline running in an afternoon rather than a project",
      "Automation of follow up emails and activities arrives on the second tier rather than the top one",
      "A fourteen day trial that needs no card details, so you can test it with real deals",
    ],
    cons: [
      "Billed in United States dollars, so your monthly cost moves with the rand exchange rate",
      "Marketing and customer service tools are thin next to HubSpot or the wider Zoho suite",
      "No meaningful South African partner network, so implementation help is harder to find here",
      "Per seat pricing on annual billing means the real commitment is a year, not a month",
    ],
    features: ["Sales pipeline", "Activity tracking", "Email automation", "Sales reporting", "AI assistant"],
    localView:
      "Pipedrive is used widely by South African sales teams and it works here without any local adaptation, which is both the attraction and the limitation. There is no rand billing, no local support hours and nothing that understands VAT or a local accounting package without a connector doing the work. What you get instead is a pipeline that people keep current, which is the single hardest thing about any CRM. Budget in dollars and accept that the rand cost will move. If you need the CRM to sit beside local accounting, payroll and support systems in one suite, Zoho gives you more for the money in this market. If you only need sales to be visible, this is the easier product to live with.",
    sourceUrl: "https://www.pipedrive.com/",
  },
  {
    slug: "sage-intacct",
    name: "Sage Intacct",
    vendor: "Sage",
    category: "Accounting and Finance",
    shortCategory: "Accounting",
    score: 8.0,
    verdict:
      "The serious cloud finance system in the Sage range, aimed at multi entity groups that have outgrown a small business ledger.",
    bestFor: "Multi entity groups and finance teams that consolidate every month",
    initials: "SI",
    tone: "ink",
    reviewed: "05 September 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Finance team in a group" },
      { label: "Pricing", value: "Quoted by Sage or a partner" },
      { label: "Support", value: "Sage and partner support" },
    ],
    pros: [
      "Multi entity consolidation is native rather than a spreadsheet exercise at the end of each month",
      "Dimensional reporting lets you slice results by entity, department or project without new accounts",
      "Built for a finance function rather than a bookkeeper, with real close and control workflows",
      "Sits inside the Sage range, so a group already on Sage has a supported path upward",
    ],
    cons: [
      "No public rate card at all, so the first real number arrives only after a sales conversation",
      "Considerably more system than a single company South African business will ever need",
      "Implementation is a project with partner cost attached, not an afternoon of setup",
      "The local installed base is far smaller than Pastel or Evolution, so skills are scarcer here",
    ],
    features: ["Multi entity consolidation", "Dimensional reporting", "Accounts payable", "Revenue recognition", "Finance automation"],
    localView:
      "Sage Intacct is sold in South Africa through Sage and its partners, but the local installed base is nothing like the size of Pastel or Evolution, and that is the practical consideration. Finding an accountant who knows Intacct here is harder than finding one who knows Pastel, and that shows up in implementation cost and in what happens when you need help at year end. It earns its place when a group runs several entities and consolidation is genuinely painful, because that is the problem it solves properly. For a single South African company with one set of books this is more system than the work requires, and Sage Accounting or Sage 200 Evolution will be the better fit at a fraction of the cost.",
    sourceUrl: "https://www.sage.com/en-za/sage-business-cloud/intacct/",
  },
  {
    slug: "sage-x3",
    name: "Sage X3",
    vendor: "Sage",
    category: "ERP and Operations",
    shortCategory: "ERP",
    score: 8.0,
    verdict:
      "The enterprise ERP at the top of the Sage range, built for manufacturers and distributors and quoted per implementation.",
    bestFor: "Manufacturers and distributors that have outgrown a mid market ERP",
    initials: "X3",
    tone: "ink",
    reviewed: "05 September 2026",
    facts: [
      { label: "Deployment", value: "Cloud or on premise" },
      { label: "Ideal team", value: "Manufacturer or distributor" },
      { label: "Pricing", value: "Quoted by a Sage business partner" },
      { label: "Support", value: "Partner support" },
    ],
    pros: [
      "Manufacturing and distribution depth that the mid market Sage products do not attempt to match",
      "Finance, supply chain and production sit in one system rather than three that must be reconciled",
      "Handles multiple companies, currencies and legislations, which suits a group trading across borders",
      "An established South African partner channel with real implementation experience behind it",
    ],
    cons: [
      "No published pricing whatsoever, and the licence is the smaller half of the true cost",
      "Implementation runs in months and needs internal people released from their day jobs",
      "Far too much system for a business that simply needs better accounting and stock control",
      "Changing partner later is difficult, so the choice of implementer matters as much as the software",
    ],
    features: ["Manufacturing", "Distribution and stock", "Financial management", "Multi company", "Supply chain"],
    localView:
      "Sage X3 sits at the top of the Sage range in South Africa and it is sold and implemented almost entirely through partners, so the partner you choose determines the outcome more than the software does. Ask for South African references in your own industry and speak to them directly about what the project actually cost against the original quote. The local channel has genuine manufacturing and distribution experience, which is the strongest argument for it over an international ERP with no presence here. Budget for licence, implementation, data migration and the internal time of the people who know how your operation runs, because that last item is the one most often left out of the business case.",
    sourceUrl: "https://www.sage.com/en-za/sage-business-cloud/sage-x3/",
  },
];

/* ---------------------------------------------------------------------------
 * Vendor pricing
 *
 * Every figure below was read off the vendor's own pricing page on the date in
 * PRICING_CHECKED_ON. Nothing here is estimated or converted: if a vendor bills
 * South African customers in dollars we say so, and if a vendor does not
 * publish a price we record that instead of inventing one.
 *
 * Re-check the whole table when PRICING_CHECKED_ON is more than a quarter old.
 * ------------------------------------------------------------------------- */

export const PRICING_CHECKED_ON = "25 August 2026";

/** Several vendors bill South African customers in dollars. We show rand as the
 *  headline everywhere, converted at this rate, and always name the dollar
 *  figure the vendor will actually charge. Cross-checked on the stamp date
 *  against frankfurter.dev (15.99) and open.er-api.com (16.02). */
export const USD_ZAR_RATE = 16;
export const USD_ZAR_LABEL = "R16.00 = US$1";

export type Pricing = {
  /** Headline figure in rand, already formatted. */
  entry: string;
  /** What the headline figure buys, e.g. "per month". */
  unit: string;
  /** The plan the headline figure refers to, plus any VAT qualifier. */
  planNote: string;
  /** Set when the vendor charges in dollars, so the buyer sees the real charge. */
  fxNote: string | null;
  /** Set when a genuinely free tier exists, not merely a trial. */
  freeTier: string | null;
  /** Published trial length. Null when a trial exists but no length is given. */
  trialDays: number | null;
  /** Used when trialDays is null but a trial is still offered. */
  trialNote: string | null;
  /** A bookable demo, distinct from a self-serve trial. */
  demo: boolean;
  /** Named AI capability, or null when the vendor advertises none. */
  ai: string | null;
  /** Deep link to the page these figures came from. */
  pricingUrl: string;
  /** Verified plan tiers. Null where the vendor publishes no rate card. */
  plans: {
    name: string;
    price: string;
    unit: string;
    summary: string;
    features: string[];
  }[] | null;
  /** Standing monthly cost in rand for one comparable seat or company, so total
   *  cost of ownership can be plotted. Null for quoted products. */
  monthlyZar: number | null;
  /** Length of the vendor's introductory offer, and what it costs per month. */
  introMonths: number | null;
  introMonthly: number | null;
  /** Exactly what the monthly figure buys, so the curve is not misread. */
  costBasis: string | null;
  /** When this product's figures were last read off the vendor page, if that
   *  differs from the site wide check date. Never claim a check that did not
   *  happen on the day it says. */
  checkedOn?: string;
  /** True only when the monthly figure is a genuine monthly subscription for a
   *  comparable unit. A per user annual rate spread across twelve months is not
   *  comparable and must never be ranked beside a per company monthly price. */
  costComparable: boolean;
};

export const pricing: Record<string, Pricing> = {
  "sage-accounting": {
    entry: "R240",
    unit: "per month",
    planNote: "Accounting Start, incl. VAT, 1 user",
    fxNote: null,
    freeTier: null,
    trialDays: 30,
    trialNote: null,
    demo: true,
    ai: "AutoEntry receipt capture",
    monthlyZar: 240,
    introMonths: null,
    introMonthly: null,
    costComparable: true,
    costBasis: "Accounting Start, one user, incl. VAT",
    plans: [
      { name: "Accounting Start", price: "R240", unit: "per month incl. VAT", summary: "One user. Invoicing, banking and VAT for a sole trader or micro business.", features: ["Unlimited invoices and quotes", "VAT201 reporting", "Bank feeds for the major local banks", "Free accountant login", "Supports one user"] },
      { name: "Accounting Standard", price: "R435", unit: "per month incl. VAT", summary: "Two users and one company. Adds inventory, multi currency and full reporting.", features: ["Everything in Start", "Two users and one company", "Automatic bank reconciliation", "Multi currency invoicing", "Full financial reporting"] },
    ],
    pricingUrl: "https://www.sage.com/en-za/sage-business-cloud/accounting/pricing/",
  },
  xero: {
    entry: "R450",
    unit: "per month",
    planNote: "Starter plan; 80% off for the first 3 months",
    fxNote: null,
    freeTier: null,
    trialDays: 30,
    trialNote: null,
    demo: false,
    ai: "Just Ask Xero (JAX)",
    monthlyZar: 450,
    introMonths: 3,
    introMonthly: 90,
    costComparable: true,
    costBasis: "Starter, with 80 percent off for three months",
    plans: [
      { name: "Starter", price: "R450", unit: "per month", summary: "Entry plan with capped invoices and bills. Suits a sole trader.", features: ["Capped invoices and quotes each month", "Bank reconciliation", "Short term cash flow view", "Free accountant login"] },
      { name: "Standard", price: "R795", unit: "per month", summary: "Unlimited invoices and bills. The plan most growing businesses land on.", features: ["Everything in Starter", "Unlimited invoices and bills", "Bulk reconcile transactions", "Custom report layouts"] },
      { name: "Premium", price: "R1 095", unit: "per month", summary: "Adds multi currency and project tracking for established businesses.", features: ["Everything in Standard", "Multi currency", "Project tracking", "Expense claims"] },
    ],
    pricingUrl: "https://www.xero.com/za/pricing-plans/",
  },
  "quickbooks-online": {
    entry: "R322",
    unit: "per month",
    planNote: "Simple Start; 70% off for the first 6 months",
    fxNote: null,
    freeTier: null,
    trialDays: 30,
    trialNote: null,
    demo: false,
    ai: "Intuit Intelligence (beta)",
    monthlyZar: 322,
    introMonths: 6,
    introMonthly: 96.6,
    costComparable: true,
    costBasis: "Simple Start, with 70 percent off for six months",
    plans: [
      { name: "Simple Start", price: "R322", unit: "per month", summary: "One user plus your accountant. Income, expenses and VAT.", features: ["One user plus your accountant", "Income and expense tracking", "VAT tracking and reporting", "Invoicing and quotes", "Intuit Intelligence in beta"] },
      { name: "Essentials", price: "R508", unit: "per month", summary: "Three users. Adds bill management and multi currency.", features: ["Everything in Simple Start", "Three users", "Bill management", "Multi currency", "Time tracking"] },
      { name: "Plus", price: "R708", unit: "per month", summary: "Five users. Adds stock tracking and project profitability.", features: ["Everything in Essentials", "Five users", "Stock tracking", "Project profitability", "Budgeting"] },
    ],
    pricingUrl: "https://quickbooks.intuit.com/za/pricing/",
  },
  "zoho-books": {
    entry: "R99",
    unit: "per organisation, per month",
    planNote: "Standard plan, excl. taxes",
    fxNote: null,
    freeTier: "Free plan under R1m annual revenue",
    trialDays: 14,
    trialNote: null,
    demo: false,
    ai: "Zia assistant",
    monthlyZar: 99,
    introMonths: null,
    introMonthly: null,
    costComparable: true,
    costBasis: "Standard, per organisation, excl. taxes",
    plans: [
      { name: "Free", price: "R0", unit: "per month", summary: "Free indefinitely while annual revenue stays under one million rand.", features: ["Free while revenue stays under R1m", "Invoices and expenses", "Client portal", "Automatic payment reminders"] },
      { name: "Standard", price: "R99", unit: "per organisation per month", summary: "Priced per organisation rather than per user, so extra staff are free.", features: ["Everything in Free", "Priced per organisation, not per user", "Recurring bills", "Bulk updates", "Custom reports"] },
      { name: "Professional", price: "R199", unit: "per organisation per month", summary: "Adds purchase orders, stock and project billing.", features: ["Everything in Standard", "Purchase orders", "Stock tracking", "Project billing", "Vendor portal"] },
      { name: "Premium", price: "R299", unit: "per organisation per month", summary: "Adds a custom domain, vendor portal and deeper workflow.", features: ["Everything in Professional", "Custom domain", "Deeper workflow rules", "Budgeting", "Custom buttons"] },
    ],
    pricingUrl: "https://www.zoho.com/za/books/pricing/",
  },
  simplepay: {
    entry: "R235.50",
    unit: "per month for 10 employees",
    planNote: "One plan, excl. VAT, about R23.55 per employee",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: "Free trial, length not published",
    demo: false,
    ai: null,
    monthlyZar: 235.5,
    introMonths: null,
    introMonthly: null,
    costComparable: true,
    costBasis: "Ten employees, excl. VAT",
    plans: null,
    pricingUrl: "https://www.simplepay.co.za/pricing",
  },
  payspace: {
    entry: "On request",
    unit: "priced per employee, per month",
    planNote: "No public rate card; now sold as Deel Local Payroll",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: null,
    demo: true,
    ai: null,
    monthlyZar: null,
    introMonths: null,
    introMonthly: null,
    costBasis: null,
    costComparable: false,
    plans: null,
    pricingUrl: "https://www.payspace.com/southafrica",
  },
  "hubspot-crm": {
    entry: "Free",
    unit: "then about R112 per seat, per month",
    planNote: "Starter, billed annually",
    fxNote: "HubSpot charges US$7 per seat; converted at R16.00 = US$1",
    freeTier: "Free CRM, no card required",
    trialDays: null,
    trialNote: null,
    demo: true,
    ai: "Breeze AI",
    monthlyZar: 112,
    introMonths: null,
    introMonthly: null,
    costComparable: true,
    costBasis: "Starter, one seat, billed annually",
    plans: [
      { name: "Free", price: "R0", unit: "per month", summary: "Unlimited contacts and a working pipeline. No card required.", features: ["Unlimited contacts", "Deal pipeline", "Meeting booking link", "Email templates", "No card required"] },
      { name: "Starter", price: "R112", unit: "per seat per month", summary: "HubSpot charges US$7 per seat billed annually, or US$20 monthly.", features: ["Everything in Free", "Removes HubSpot branding", "Simple automation", "Repeating tasks", "Billed in dollars"] },
    ],
    pricingUrl: "https://www.hubspot.com/pricing/crm",
  },
  "zoho-crm": {
    entry: "Free",
    unit: "then about R224 per user, per month",
    planNote: "Standard edition",
    fxNote: "Zoho charges US$14 per user; converted at R16.00 = US$1",
    freeTier: "Free forever for 3 users",
    trialDays: null,
    trialNote: null,
    demo: true,
    ai: "Zia and AI agents",
    monthlyZar: 224,
    introMonths: null,
    introMonthly: null,
    costComparable: true,
    costBasis: "Standard, one user",
    plans: [
      { name: "Free", price: "R0", unit: "per month", summary: "Free forever for up to three users.", features: ["Up to three users", "Leads, deals and contacts", "Workflow rules", "Mobile app"] },
      { name: "Standard", price: "R224", unit: "per user per month", summary: "Zoho charges US$14 per user.", features: ["Everything in Free", "Sales forecasting", "Custom fields and modules", "Email insights"] },
      { name: "Professional", price: "R368", unit: "per user per month", summary: "Zoho charges US$23 per user. Adds automation and AI.", features: ["Everything in Standard", "Zia AI assistant", "Inventory management", "Validation rules"] },
      { name: "Enterprise", price: "R640", unit: "per user per month", summary: "Zoho charges US$40 per user. Deep customisation.", features: ["Everything in Professional", "Deep customisation", "Multi user portals", "Advanced approval workflow"] },
    ],
    pricingUrl: "https://www.zoho.com/crm/zohocrm-pricing.html",
  },
  odoo: {
    entry: "Free",
    unit: "then about R116 per user, per month",
    planNote: "One App Free for unlimited users; Standard billed yearly",
    fxNote: "Odoo charges US$7.25 per user; converted at R16.00 = US$1",
    freeTier: "One app free, unlimited users",
    trialDays: null,
    trialNote: "Free trial, length not published",
    demo: true,
    ai: "Odoo AI",
    monthlyZar: 116,
    introMonths: null,
    introMonthly: null,
    costComparable: true,
    costBasis: "Standard, one user",
    plans: [
      { name: "One App Free", price: "R0", unit: "per month", summary: "A single application, free for unlimited users, permanently.", features: ["One application only", "Unlimited users", "Hosted by Odoo", "No time limit"] },
      { name: "Standard", price: "R116", unit: "per user per month", summary: "Odoo charges US$7.25 per user. All applications included.", features: ["Every application included", "Priced per user, not per app", "Odoo Studio for customisation", "Hosted or on premise"] },
    ],
    pricingUrl: "https://www.odoo.com/pricing",
  },
  "business-central": {
    entry: "R1 280",
    unit: "per user, per month",
    planNote: "Essentials, billed yearly, excl. VAT",
    fxNote: "Microsoft charges US$80 per user; converted at R16.00 = US$1",
    freeTier: null,
    trialDays: 30,
    trialNote: null,
    demo: true,
    ai: "Microsoft Copilot included",
    monthlyZar: 1280,
    introMonths: null,
    introMonthly: null,
    costComparable: true,
    costBasis: "Essentials, one user, excl. VAT",
    plans: [
      { name: "Team Members", price: "R128", unit: "per user per month", summary: "Read and approve access. Microsoft charges US$8 per user.", features: ["Read across the system", "Approve tasks assigned to you", "Update your own records", "Run reports"] },
      { name: "Essentials", price: "R1 280", unit: "per user per month", summary: "Full finance and supply chain. Microsoft charges US$80 per user.", features: ["Full finance and general ledger", "Supply chain and purchasing", "Microsoft Copilot included", "Works inside Outlook and Excel"] },
      { name: "Premium", price: "R1 760", unit: "per user per month", summary: "Adds service and manufacturing. Microsoft charges US$110 per user.", features: ["Everything in Essentials", "Service management", "Manufacturing", "Production planning"] },
    ],
    pricingUrl:
      "https://www.microsoft.com/en-za/dynamics-365/products/business-central/pricing",
  },
  shopify: {
    entry: "R400",
    unit: "per month",
    planNote: "Basic; about R304 billed yearly, with a R16/month intro for 3 months",
    fxNote: "Shopify charges US$25 per month; converted at R16.00 = US$1",
    freeTier: null,
    trialDays: 3,
    trialNote: null,
    demo: false,
    ai: "Sidekick AI",
    monthlyZar: 400,
    introMonths: 3,
    introMonthly: 16,
    costComparable: true,
    costBasis: "Basic, with the one dollar introductory offer",
    plans: [
      { name: "Basic", price: "R400", unit: "per month", summary: "Shopify charges US$25. About R304 a month on annual billing.", features: ["Online store and themes", "High converting checkout", "Sell on social and marketplaces", "Sidekick AI", "Local gateway needed, extra fee applies"] },
    ],
    pricingUrl: "https://www.shopify.com/za/pricing",
  },
  "sage-pastel-accounting": {
    entry: "On request",
    unit: "quoted by a Sage business partner",
    planNote: "Annual licence plus optional modules; no public rate card",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: null,
    demo: true,
    ai: null,
    monthlyZar: null,
    introMonths: null,
    introMonthly: null,
    costBasis: null,
    costComparable: false,
    plans: null,
    pricingUrl: "https://www.sage.com/en-za/products/sage-pastel-accounting/",
  },
  "sage-business-cloud-payroll": {
    entry: "R97",
    unit: "per month",
    planNote: "1 to 2 employees, incl. VAT; banded up to 200 plus",
    fxNote: null,
    freeTier: null,
    trialDays: 30,
    trialNote: null,
    demo: true,
    ai: null,
    monthlyZar: 97,
    introMonths: null,
    introMonthly: null,
    costComparable: true,
    costBasis: "One to two employees, incl. VAT",
    plans: [
      { name: "1 to 2 employees", price: "R97", unit: "per month incl. VAT", summary: "Entry band. Unlimited companies and unlimited users included.", features: ["PAYE, UIF and SDL calculations", "Unlimited companies", "Unlimited users", "Email payslips", "ACB bank payment file"] },
      { name: "Banded upward", price: "Rising", unit: "by employee count", summary: "Around fifteen further bands run up to two hundred plus employees.", features: ["Everything in the entry band", "Bands run to 200 plus employees", "Leave management", "Statutory and payroll reports", "Sage Accounting integration"] },
    ],
    pricingUrl: "https://www.sage.com/en-za/sage-business-cloud/payroll/pricing/",
  },
  "sage-pastel-payroll": {
    entry: "On request",
    unit: "quoted by a Sage business partner",
    planNote: "Annual licence banded by employee count; no public rate card",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: null,
    demo: true,
    ai: null,
    monthlyZar: null,
    introMonths: null,
    introMonthly: null,
    costBasis: null,
    costComparable: false,
    plans: null,
    pricingUrl: "https://www.sage.com/en-za/products/sage-pastel-payroll/",
  },
  "sage-300-people": {
    entry: "On request",
    unit: "scoped by module and headcount",
    planNote: "Licence plus implementation; quoted per project",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: null,
    demo: true,
    ai: null,
    monthlyZar: null,
    introMonths: null,
    introMonthly: null,
    costBasis: null,
    costComparable: false,
    plans: null,
    pricingUrl: "https://www.sage.com/en-za/products/sage-300-people/",
  },
  "sage-hr": {
    entry: "On request",
    unit: "priced per employee, per module",
    planNote: "Leave, performance and scheduling are licensed separately",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: "Free trial offered, length not published",
    demo: true,
    ai: null,
    monthlyZar: null,
    introMonths: null,
    introMonthly: null,
    costBasis: null,
    costComparable: false,
    plans: null,
    pricingUrl: "https://www.sage.com/en-za/products/sage-hr/",
  },
  "sage-evolution": {
    entry: "On request",
    unit: "quoted by a Sage business partner",
    planNote: "Licence, modules and implementation quoted together",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: null,
    demo: true,
    ai: null,
    monthlyZar: null,
    introMonths: null,
    introMonthly: null,
    costBasis: null,
    costComparable: false,
    plans: null,
    pricingUrl: "https://www.sage.com/en-za/products/sage-200-evolution/",
  },
  "palladium-accounting": {
    entry: "R4 049",
    unit: "ex VAT per user, per year",
    planNote: "Enterprise tier 2 subscription; R7 139 ex VAT per user to buy outright",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: "Demonstration mode for testing and training",
    demo: true,
    ai: null,
    monthlyZar: 337.42,
    introMonths: null,
    introMonthly: null,
    costComparable: false,
    costBasis: "Enterprise tier two, one user, annual rate spread monthly",
    plans: [
      { name: "Enterprise subscription", price: "R4 049", unit: "ex VAT per user per year", summary: "Tier two rate. The per user rate falls as licence count rises.", features: ["Multi warehouse inventory", "Bill of materials", "Landed cost tracking", "Rate falls as licences rise"] },
      { name: "Enterprise perpetual", price: "R7 139", unit: "ex VAT per user once off", summary: "Buy outright instead of subscribing. Tier two rate.", features: ["The same capability, bought outright", "No recurring licence fee", "Annual cover priced separately", "Rate falls as licences rise"] },
    ],
    pricingUrl: "https://www.palladium.co.za/pricing",
  },
  "omni-accounts": {
    entry: "On request",
    unit: "quoted by module bundle",
    planNote: "Trader through to Premium bundles; no public rate card",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: null,
    demo: true,
    ai: null,
    monthlyZar: null,
    introMonths: null,
    introMonthly: null,
    costBasis: null,
    costComparable: false,
    plans: null,
    pricingUrl: "https://www.omniaccounts.co.za/",
  },
  caseware: {
    entry: "On request",
    unit: "licensed per user, per year",
    planNote: "Practice licensing quoted by CaseWare Africa",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: null,
    demo: true,
    ai: null,
    monthlyZar: null,
    introMonths: null,
    introMonthly: null,
    costBasis: null,
    costComparable: false,
    plans: null,
    pricingUrl: "https://www.casewareafrica.com/",
  },
  syspro: {
    entry: "On request",
    unit: "scoped per implementation",
    planNote: "Licence plus implementation, quoted after a scoping exercise",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: null,
    demo: true,
    ai: null,
    monthlyZar: null,
    introMonths: null,
    introMonthly: null,
    costBasis: null,
    costComparable: false,
    plans: null,
    pricingUrl: "https://za.syspro.com/",
  },
  "sap-business-one": {
    entry: "On request",
    unit: "quoted by an SAP partner",
    planNote: "Licence plus annual maintenance and partner implementation",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: null,
    demo: true,
    ai: null,
    monthlyZar: null,
    introMonths: null,
    introMonthly: null,
    costBasis: null,
    costComparable: false,
    plans: null,
    pricingUrl: "https://www.sap.com/africa/products/erp/business-one.html",
  },
  skynamo: {
    entry: "On request",
    unit: "priced per user, per month",
    planNote: "Quoted after a demonstration; no public rate card",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: null,
    demo: true,
    ai: null,
    monthlyZar: null,
    introMonths: null,
    introMonthly: null,
    costBasis: null,
    costComparable: false,
    plans: null,
    pricingUrl: "https://skynamo.com/",
  },
  yoco: {
    entry: "R0",
    unit: "per month on Core",
    planNote: "Plus R249, Pro R499; card fees from 1.20% in person",
    fxNote: null,
    freeTier: "Core plan, no monthly fee",
    trialDays: 30,
    trialNote: null,
    demo: false,
    ai: null,
    monthlyZar: 0,
    introMonths: null,
    introMonthly: null,
    costComparable: true,
    costBasis: "Core, no monthly fee, card fees apply separately",
    plans: [
      { name: "Core", price: "R0", unit: "per month", summary: "No monthly fee. Card rates from 2.30 percent in person.", features: ["No monthly fee", "Card rates from 2.30 percent in person", "Next day settlement", "Sales reporting"] },
      { name: "Plus", price: "R249", unit: "per month", summary: "Lower card rates from 2.10 percent and added business tools.", features: ["Everything in Core", "Card rates from 2.10 percent", "Staff accounts", "Basic stock tools"] },
      { name: "Pro", price: "R499", unit: "per month", summary: "Lowest rates from 1.95 percent, falling to 1.20 percent at volume.", features: ["Everything in Plus", "Card rates from 1.95 percent, to 1.20 percent at volume", "Priority support", "Advanced reporting"] },
    ],
    pricingUrl: "https://www.yoco.com/za/pricing/",
  },
  ikhokha: {
    entry: "R0",
    unit: "per month, machines from R699",
    planNote: "No monthly rental; in person rates from 2.75% excl VAT, falling to 2.5%",
    fxNote: null,
    freeTier: "iK Tap on Phone, no card machine needed",
    trialDays: null,
    trialNote: "30 day money back guarantee on hardware",
    demo: false,
    ai: null,
    monthlyZar: 0,
    introMonths: null,
    introMonthly: null,
    costComparable: true,
    costBasis: "No monthly rental; hardware is bought once and card fees are charged per transaction",
    checkedOn: "5 September 2026",
    plans: [
      { name: "iK Tap on Phone", price: "R0", unit: "no hardware", summary: "Turns an Android phone into the card machine. Nothing to buy.", features: ["Accept tap to pay on your phone", "Digital receipts", "Pay links and invoices", "No monthly rental"] },
      { name: "iK Flyer Lite", price: "R699", unit: "once off", summary: "Portable machine with digital receipts. Reduced from R999.", features: ["Tap and insert", "Dual SIM connectivity", "All day battery", "Prepaid vouchers", "No monthly rental"] },
      { name: "iK Flyer", price: "R1 499", unit: "once off", summary: "Adds a built in printer and swipe for counter trading.", features: ["Prints paper receipts", "Tap, insert and swipe", "Dual SIM connectivity", "Sell and print vouchers", "No monthly rental"] },
    ],
    pricingUrl: "https://www.ikhokha.com/pricing",
  },
  snapscan: {
    entry: "R0",
    unit: "per month",
    planNote: "No monthly fee; 2.95% excl VAT per transaction, falling with turnover",
    fxNote: null,
    freeTier: "Free to sign up, no monthly fee",
    trialDays: null,
    trialNote: null,
    demo: false,
    ai: null,
    monthlyZar: 0,
    introMonths: null,
    introMonthly: null,
    costComparable: true,
    costBasis: "No monthly fee; charged only as a percentage of each transaction",
    checkedOn: "5 September 2026",
    plans: null,
    pricingUrl: "https://www.snapscan.co.za/merchant",
  },
  pipedrive: {
    entry: "R224",
    unit: "per seat, per month",
    planNote: "Lite plan, billed annually",
    fxNote: "Pipedrive charges US$14 per seat; converted at R16.00 = US$1",
    freeTier: null,
    trialDays: 14,
    trialNote: null,
    demo: false,
    ai: "AI assistant included on every plan",
    monthlyZar: 224,
    introMonths: null,
    introMonthly: null,
    costComparable: true,
    costBasis: "Lite, per seat, billed annually",
    checkedOn: "5 September 2026",
    plans: [
      { name: "Lite", price: "R224", unit: "per seat, per month", summary: "One simple workspace for organising sales activity.", features: ["Visual sales pipeline", "Contact and deal management", "Email inbox", "AI assistant"] },
      { name: "Growth", price: "R384", unit: "per seat, per month", summary: "Adds automation of follow up email and activities.", features: ["Everything in Lite", "Workflow automation", "Email templates and scheduling", "Group emailing"] },
      { name: "Premium", price: "R784", unit: "per seat, per month", summary: "Full cycle sales tools for a team working many deals.", features: ["Everything in Growth", "Project management", "Team and revenue forecasting", "Advanced permissions"] },
      { name: "Ultimate", price: "R1 104", unit: "per seat, per month", summary: "The complete suite with the strongest reporting and controls.", features: ["Everything in Premium", "Full reporting suite", "Security and access controls", "Priority support"] },
    ],
    pricingUrl: "https://www.pipedrive.com/en/pricing",
  },
  "sage-intacct": {
    entry: "On request",
    unit: "quoted by Sage or a partner",
    planNote: "Subscription priced by modules, entities and users; no public rate card",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: null,
    demo: true,
    ai: "Finance AI for faster close",
    monthlyZar: null,
    introMonths: null,
    introMonthly: null,
    costComparable: false,
    costBasis: "Quoted per configuration, so it cannot be set beside a published monthly price",
    checkedOn: "5 September 2026",
    plans: null,
    pricingUrl: "https://www.sage.com/en-za/sage-business-cloud/intacct/",
  },
  "sage-x3": {
    entry: "On request",
    unit: "quoted by a Sage business partner",
    planNote: "Licence, modules and implementation quoted together; no public rate card",
    fxNote: null,
    freeTier: null,
    trialDays: null,
    trialNote: null,
    demo: true,
    ai: "Sage X3 with AI",
    monthlyZar: null,
    introMonths: null,
    introMonthly: null,
    costComparable: false,
    costBasis: "Quoted per implementation, so it cannot be set beside a published monthly price",
    checkedOn: "5 September 2026",
    plans: null,
    pricingUrl: "https://www.sage.com/en-za/sage-business-cloud/sage-x3/",
  },
};

/** Every product carries a real vendor logo. Kept beside the pricing table so a
 *  new product cannot ship with a lettered placeholder. */
export const productLogos: Record<string, string> = {
  "sage-accounting": "/logos/sage-business-cloud-accounting.png",
  xero: "/logos/xero.png",
  "quickbooks-online": "/logos/quickbooks-online.png",
  "zoho-books": "/logos/zoho-books-app.png",
  simplepay: "/logos/simplepay.png",
  payspace: "/logos/payspace.png",
  "hubspot-crm": "/logos/hubspot-crm.png",
  "zoho-crm": "/logos/zoho-crm-app.png",
  odoo: "/logos/odoo-app.png",
  "business-central": "/logos/dynamics-365-business-central.png",
  shopify: "/logos/shopify.svg",
  yoco: "/logos/yoco.png",
  "sage-pastel-accounting": "/logos/sage-pastel-accounting.png",
  "sage-business-cloud-payroll": "/logos/sage-business-cloud-payroll.png",
  "sage-pastel-payroll": "/logos/sage-pastel-payroll.png",
  "sage-300-people": "/logos/sage-300-people.png",
  "sage-hr": "/logos/sage-hr.png",
  "sage-evolution": "/logos/sage-evolution.png",
  "palladium-accounting": "/logos/palladium-accounting.png",
  "omni-accounts": "/logos/omni-accounts.png",
  caseware: "/logos/caseware.png",
  syspro: "/logos/syspro.png",
  "sap-business-one": "/logos/sap-business-one.png",
  skynamo: "/logos/skynamo.png",
  ikhokha: "/logos/ikhokha.png",
  snapscan: "/logos/snapscan.png",
  pipedrive: "/logos/pipedrive.png",
  "sage-intacct": "/logos/sage-intacct.png",
  "sage-x3": "/logos/sage-x3.png",
};

export function getLogo(slug: string): string | undefined {
  return productLogos[slug];
}

/** The date this product's figures were verified: its own, or the site wide one. */
export function pricedOn(slug: string) {
  return getPricing(slug)?.checkedOn ?? PRICING_CHECKED_ON;
}

export function getPricing(slug: string): Pricing | undefined {
  return pricing[slug];
}

export const guides: Guide[] = [
  {
    slug: "choose-accounting-software-south-africa",
    topic: "Accounting",
    title: "How to choose accounting software for a South African small business",
    excerpt:
      "A practical way to compare daily bookkeeping, adviser access, reporting, bank connections and the cost that appears after the first month.",
    date: "16 August 2026",
    readTime: "8 minute read",
    author: "Khadija Bibi",
    art: "ledger",
  },
  {
    slug: "questions-before-switching-payroll",
    topic: "Payroll",
    title: "The questions to ask before switching payroll software",
    excerpt:
      "Move beyond the feature list and examine migration, statutory updates, employee records, support and the first live payroll run.",
    date: "13 August 2026",
    readTime: "7 minute read",
    author: "Khadija Bibi",
    art: "people",
  },
  {
    slug: "crm-pricing-explained",
    topic: "CRM",
    title: "CRM pricing explained in plain language",
    excerpt:
      "Seats are only the beginning. We unpack contact limits, onboarding, automation, support and the cost of keeping clean data.",
    date: "10 August 2026",
    readTime: "6 minute read",
    author: "Khadija Bibi",
    art: "pipeline",
  },
  {
    slug: "erp-or-accounting-software",
    topic: "Operations",
    title: "ERP or accounting software? Where growing teams draw the line",
    excerpt:
      "A useful framework for deciding when better accounting is enough and when operations need a connected system.",
    date: "04 August 2026",
    readTime: "9 minute read",
    author: "Khadija Bibi",
    art: "operations",
  },
  {
    slug: "popia-software-buying-checklist",
    topic: "Privacy",
    title: "A practical POPIA checklist for business software buyers",
    excerpt:
      "The questions worth asking about personal information, access, providers, retention and what happens when a contract ends.",
    date: "29 July 2026",
    readTime: "7 minute read",
    author: "Khadija Bibi",
    art: "privacy",
  },
  {
    slug: "vat-registration-accounting-software",
    topic: "Accounting",
    title: "When to register for VAT in South Africa, and what it does to your accounting software",
    excerpt:
      "The R1 million threshold, the voluntary route at R50 000, and the software settings that decide whether your VAT201 comes out right.",
    date: "05 September 2026",
    readTime: "9 minute read",
    author: "Khadija Bibi",
    art: "ledger",
  },
  {
    slug: "sage-vs-xero-vs-quickbooks-south-africa",
    topic: "Accounting",
    title: "Sage, Xero and QuickBooks compared for a South African small business",
    excerpt:
      "Three cloud ledgers at R240, R450 and R322 a month. Where each one genuinely wins, and which local gaps you have to fill yourself.",
    date: "05 September 2026",
    readTime: "11 minute read",
    author: "Khadija Bibi",
    art: "ledger",
  },
  {
    slug: "bank-feeds-south-africa",
    topic: "Accounting",
    title: "Bank feeds in South Africa: the question to ask before you buy",
    excerpt:
      "A feed that does not cover your account removes most of the reason to pay for cloud accounting. How to test yours before committing.",
    date: "05 September 2026",
    readTime: "8 minute read",
    author: "Khadija Bibi",
    art: "ledger",
  },
  {
    slug: "switching-accounting-software-mid-year",
    topic: "Accounting",
    title: "Switching accounting software without losing your audit trail",
    excerpt:
      "What to migrate, what to leave behind, and why your accountant would rather you moved at year end than in the middle of a VAT period.",
    date: "05 September 2026",
    readTime: "9 minute read",
    author: "Khadija Bibi",
    art: "ledger",
  },
  {
    slug: "what-your-accountant-needs",
    topic: "Accounting",
    title: "What your accountant actually needs from your accounting software",
    excerpt:
      "Adviser access, a clean trial balance and a working audit trail matter more than any feature on the sales page. Ask before you choose.",
    date: "05 September 2026",
    readTime: "7 minute read",
    author: "Khadija Bibi",
    art: "ledger",
  },
  {
    slug: "paye-uif-sdl-explained",
    topic: "Payroll",
    title: "PAYE, UIF and SDL explained for a first time employer",
    excerpt:
      "The three deductions every South African employer deals with, what your payroll must calculate, and where small businesses get caught.",
    date: "05 September 2026",
    readTime: "10 minute read",
    author: "Khadija Bibi",
    art: "people",
  },
  {
    slug: "emp201-emp501-payroll-software",
    topic: "Payroll",
    title: "EMP201 and EMP501: what payroll software should do for you",
    excerpt:
      "Monthly declarations and twice yearly reconciliations are where payroll software earns its money. What to check before a filing season.",
    date: "05 September 2026",
    readTime: "9 minute read",
    author: "Khadija Bibi",
    art: "people",
  },
  {
    slug: "employment-tax-incentive-payroll",
    topic: "Payroll",
    title: "The Employment Tax Incentive, and whether your payroll handles it properly",
    excerpt:
      "ETI can reduce the PAYE you pay over for younger employees. Claiming it correctly depends almost entirely on your payroll software.",
    date: "05 September 2026",
    readTime: "8 minute read",
    author: "Khadija Bibi",
    art: "people",
  },
  {
    slug: "first-employee-payroll",
    topic: "Payroll",
    title: "Hiring your first employee: the payroll you suddenly need",
    excerpt:
      "Registering with SARS and the UIF, issuing a payslip that complies, and deciding between software and a bureau for one person.",
    date: "05 September 2026",
    readTime: "8 minute read",
    author: "Khadija Bibi",
    art: "people",
  },
  {
    slug: "bargaining-council-payroll",
    topic: "Payroll",
    title: "Bargaining council payroll: the requirement most software ignores",
    excerpt:
      "If your industry has a council, its contributions and reporting formats are not optional. Very few payroll products handle them natively.",
    date: "05 September 2026",
    readTime: "8 minute read",
    author: "Khadija Bibi",
    art: "people",
  },
  {
    slug: "card-machine-fees-compared",
    topic: "Commerce",
    title: "Card machine fees in South Africa, compared honestly",
    excerpt:
      "The rate on the sales page is rarely the rate you pay. How to work out your blended cost across the machines sold to small merchants here.",
    date: "05 September 2026",
    readTime: "9 minute read",
    author: "Khadija Bibi",
    art: "operations",
  },
  {
    slug: "yoco-vs-ikhokha-vs-snapscan",
    topic: "Commerce",
    title: "Yoco, iKhokha and SnapScan: which one actually costs you less",
    excerpt:
      "Three South African ways to take payment, priced against each other at the turnover levels a small business actually trades at.",
    date: "05 September 2026",
    readTime: "10 minute read",
    author: "Khadija Bibi",
    art: "operations",
  },
  {
    slug: "accepting-online-payments-south-africa",
    topic: "Commerce",
    title: "Accepting online payments in South Africa",
    excerpt:
      "Card, instant EFT and QR, what each costs, and why your checkout conversion depends on offering the method your customer already trusts.",
    date: "05 September 2026",
    readTime: "9 minute read",
    author: "Khadija Bibi",
    art: "operations",
  },
  {
    slug: "popia-cloud-software-outside-south-africa",
    topic: "Privacy",
    title: "POPIA and cloud software hosted outside South Africa",
    excerpt:
      "Section 72 does not stop you using an overseas provider. It does mean you have to know where your data goes and be able to say so.",
    date: "05 September 2026",
    readTime: "9 minute read",
    author: "Khadija Bibi",
    art: "privacy",
  },
  {
    slug: "software-billed-in-dollars",
    topic: "Operations",
    title: "Budgeting for software billed in dollars",
    excerpt:
      "Half the products a South African business buys are priced in dollars. What that does to a budget, and how to plan for it sensibly.",
    date: "05 September 2026",
    readTime: "8 minute read",
    author: "Khadija Bibi",
    art: "operations",
  },
  {
    slug: "total-cost-of-ownership-software",
    topic: "Operations",
    title: "The real cost of business software, well beyond the monthly price",
    excerpt:
      "Seats, add ons, implementation, migration, training and the internal time nobody budgets for. A method for costing it before you sign.",
    date: "05 September 2026",
    readTime: "10 minute read",
    author: "Khadija Bibi",
    art: "operations",
  },
  {
    slug: "software-implementation-checklist",
    topic: "Operations",
    title: "A software implementation checklist for a small South African team",
    excerpt:
      "Who owns it, what data moves, what runs in parallel and when you stop paying for the old system. The plan most small projects skip.",
    date: "05 September 2026",
    readTime: "9 minute read",
    author: "Khadija Bibi",
    art: "operations",
  },
  {
    slug: "free-trial-testing-software",
    topic: "Operations",
    title: "How to use a free trial so it tells you something useful",
    excerpt:
      "Most trials are wasted clicking around an empty demo company. Use your own awkward records and you will learn more in a day than a month.",
    date: "05 September 2026",
    readTime: "7 minute read",
    author: "Khadija Bibi",
    art: "operations",
  },
  {
    slug: "crm-your-team-will-update",
    topic: "CRM",
    title: "Choosing a CRM your sales team will actually update",
    excerpt:
      "Every failed CRM has the same cause. Adoption is a design question and a management question long before it is a software question.",
    date: "05 September 2026",
    readTime: "8 minute read",
    author: "Khadija Bibi",
    art: "pipeline",
  },
  {
    slug: "stock-control-when-spreadsheets-stop-working",
    topic: "Operations",
    title: "When spreadsheets stop working for stock control",
    excerpt:
      "The signs that your stock has outgrown a spreadsheet, and the honest gap between accounting software with stock and a real inventory system.",
    date: "05 September 2026",
    readTime: "9 minute read",
    author: "Khadija Bibi",
    art: "operations",
  },
];

export const comparisons: Comparison[] = [
  {
    slug: "xero-vs-quickbooks-online",
    productA: "xero",
    productB: "quickbooks-online",
    title: "Xero compared with QuickBooks Online",
    summary:
      "Two familiar cloud accounting choices, compared on the work that matters to a South African small business.",
    verdict:
      "Xero is the stronger fit for teams that value adviser collaboration and a broad app market. QuickBooks Online makes more sense for owners who prefer its reporting style and everyday workflow. The right answer often depends on the accountant already supporting the business.",
    criteria: [
      { name: "Everyday use", a: "Calm and consistent", b: "Approachable and direct", view: "Depends" },
      { name: "Adviser work", a: "A particular strength", b: "Well supported", view: "Xero" },
      { name: "Reporting", a: "Flexible", b: "Owner friendly", view: "Depends" },
      { name: "App connections", a: "Very broad", b: "Broad", view: "Xero" },
      { name: "Local decision", a: "Check adviser and bank fit", b: "Check bank and tax fit", view: "Depends" },
    ],
  },
  {
    slug: "sage-accounting-vs-xero",
    productA: "sage-accounting",
    productB: "xero",
    title: "Sage Accounting compared with Xero",
    summary:
      "A local stalwart and a polished cloud platform, assessed for support, reporting, collaboration and day to day fit.",
    verdict:
      "Sage Accounting is compelling for businesses that value a familiar local ecosystem. Xero stands out for collaboration and connected apps. Start with the adviser and workflow your team already trusts.",
    criteria: [
      { name: "Local ecosystem", a: "A clear strength", b: "Established adviser community", view: "Sage" },
      { name: "Interface", a: "Practical", b: "Polished", view: "Xero" },
      { name: "Reporting", a: "Strong small business range", b: "Flexible", view: "Depends" },
      { name: "Connections", a: "Good", b: "Very broad", view: "Xero" },
      { name: "Support path", a: "Vendor and partners", b: "Primarily online", view: "Sage" },
    ],
  },
  {
    slug: "hubspot-crm-vs-zoho-crm",
    productA: "hubspot-crm",
    productB: "zoho-crm",
    title: "HubSpot CRM compared with Zoho CRM",
    summary:
      "An easy starting point meets a flexible value choice in this practical CRM comparison.",
    verdict:
      "HubSpot offers the smoother start and a compelling connected customer platform. Zoho CRM offers deeper value for teams willing to shape the system. Model the cost at your expected team size before deciding.",
    criteria: [
      { name: "First setup", a: "Easy to begin", b: "Needs more configuration", view: "HubSpot" },
      { name: "Automation", a: "Strong in paid tiers", b: "Flexible", view: "Depends" },
      { name: "Value", a: "Good entry point", b: "Strong paid value", view: "Zoho" },
      { name: "Connected suite", a: "Marketing and service depth", b: "Broad business suite", view: "Depends" },
      { name: "Governance", a: "Needed as hubs grow", b: "Needed from setup", view: "Depends" },
    ],
  },
];

export type Author = {
  name: string;
  role: string;
  location: string;
  bio: string;
  method: string;
  expertise: string[];
  email: string;
  /** A public profile, published only once there is one to link to. */
  profileUrl?: string;
};

/* ---------------------------------------------------------------------------
 * Bylines.
 *
 * This publication is written and edited by one named person who is
 * accountable for every sentence on it. Nothing is published under a persona,
 * and no qualification is claimed here that cannot be checked.
 * ------------------------------------------------------------------------ */
export const authors: Record<string, Author> = {
  "khadija-bibi": {
    name: "Khadija Bibi",
    role: "Editor and publisher",
    location: "Cape Town, South Africa",
    bio:
      "Khadija publishes Select Soft from Cape Town and is responsible for everything that appears on it. The work covers accounting, payroll, CRM, ERP and commerce software, and the ordinary local details that decide whether a product still works six months after it was bought.",
    method:
      "Research here is desk based and it says so. Every price on this site is read off the vendor's own pricing page rather than a search result or a press release, and the date of that check is published next to the figure. Where a review has not involved a structured trial or an interview, it does not claim one. Corrections are welcome and are made in public.",
    expertise: [
      "Accounting and bookkeeping software",
      "Payroll and HR systems",
      "CRM, ERP and commerce",
      "South African pricing, VAT and local support",
    ],
    email: "editor@selectsoft.co.za",
  },
};

export const EDITOR = authors["khadija-bibi"];

export function getAuthorByName(name: string) {
  return Object.entries(authors).find(([, author]) => author.name === name);
}


/* ---------------------------------------------------------------------------
 * Category size is derived, never declared.
 *
 * These numbers used to be typed by hand and they drifted badly: the site
 * advertised 96 products when it held 24, and two categories were promoted
 * with counts while containing nothing at all. Everything a reader sees about
 * how big a category is now comes from the products array, so the claim and
 * the library cannot disagree again.
 * ------------------------------------------------------------------------ */

export function getCategoryProducts(slug: string) {
  const category = categories.find((item) => item.slug === slug);
  return category ? products.filter((product) => product.category === category.name) : [];
}

export function categoryCount(slug: string) {
  return getCategoryProducts(slug).length;
}

/**
 * The categories a reader can actually reach. A category with nothing published
 * in it is not linked, listed, counted or submitted to search engines. It stays
 * in `categories` so that publishing the first review brings it back on its own.
 */
export const liveCategories = categories.filter((item) => categoryCount(item.slug) > 0);

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getComparison(slug: string) {
  return comparisons.find((comparison) => comparison.slug === slug);
}

export function getProductReviewSlug(product: Product) {
  return product.slug;
}
