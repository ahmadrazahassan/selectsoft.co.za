export type Category = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  longDescription: string;
  count: number;
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
    count: 18,
    icon: "calculator",
  },
  {
    slug: "payroll-hr",
    name: "Payroll and HR",
    shortName: "Payroll",
    summary: "Payroll, leave, HR records and workforce tools with local requirements in view.",
    longDescription:
      "Payroll software carries real operational weight. Our reviews consider everyday payroll work, statutory updates, employee access, reporting, support and how clearly a provider explains responsibility when legislation changes.",
    count: 12,
    icon: "users",
  },
  {
    slug: "crm-sales",
    name: "CRM and Sales",
    shortName: "CRM",
    summary: "Manage leads, customer relationships, pipelines and sales activity.",
    longDescription:
      "A useful CRM fits the habits of the people who update it. We consider contact management, pipeline clarity, automation, reporting, implementation effort and the cost of adding a growing team.",
    count: 16,
    icon: "contact",
  },
  {
    slug: "erp-operations",
    name: "ERP and Operations",
    shortName: "ERP",
    summary: "Connect finance, inventory, procurement and operational workflows.",
    longDescription:
      "ERP choices have long consequences. We focus on implementation reality, partner support, reporting, integrations, data ownership and how well each system can grow with a more complex operation.",
    count: 11,
    icon: "boxes",
  },
  {
    slug: "project-management",
    name: "Project Management",
    shortName: "Projects",
    summary: "Plan work, coordinate teams and keep delivery visible.",
    longDescription:
      "Project tools should remove uncertainty without adding administration. We assess planning, collaboration, reporting, permissions and the learning curve for teams that need to start quickly.",
    count: 14,
    icon: "clipboard",
  },
  {
    slug: "commerce-pos",
    name: "Commerce and Point of Sale",
    shortName: "Commerce",
    summary: "Sell online or in person, accept payments and manage stock.",
    longDescription:
      "Commerce software must work at the counter and behind the scenes. We review payment options, inventory, reporting, hardware, ecommerce connections and the support available when trading cannot stop.",
    count: 10,
    icon: "store",
  },
  {
    slug: "marketing-support",
    name: "Marketing and Support",
    shortName: "Marketing",
    summary: "Reach customers, manage campaigns and deliver better service.",
    longDescription:
      "Marketing and support systems should help a team respond with context. We examine contact limits, automation, reporting, service workflows, permissions and the effort required to maintain good customer data.",
    count: 15,
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
    score: 8.7,
    verdict:
      "A dependable accounting choice for small businesses that want familiar workflows and access to a broad local partner network.",
    bestFor: "Established small businesses that value familiar local support",
    initials: "SA",
    tone: "ink",
    reviewed: "19 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small business" },
      { label: "Pricing", value: "Check current plans" },
      { label: "Support", value: "Online and partner support" },
    ],
    pros: [
      "Clear day to day accounting workflow",
      "Useful local ecosystem",
      "Strong reporting for a growing small business",
    ],
    cons: [
      "Some advanced needs require another Sage product",
      "The best setup may still need adviser input",
    ],
    features: ["Invoicing", "Banking", "Reporting", "Expense capture", "Customer and supplier records"],
    localView:
      "Sage has a long standing presence in South Africa, which makes it easier to find accountants and implementation partners who already know the product. Buyers should still confirm the exact support route included in their chosen plan.",
    sourceUrl: "https://www.sage.com/en-za/sage-business-cloud/accounting/",
  },
  {
    slug: "xero",
    name: "Xero",
    vendor: "Xero",
    category: "Accounting and Finance",
    shortCategory: "Accounting",
    score: 8.6,
    verdict:
      "Polished cloud accounting with strong collaboration and an extensive app ecosystem, especially appealing when an adviser already works in Xero.",
    bestFor: "Growing service businesses working closely with an accountant",
    initials: "XO",
    tone: "blue",
    reviewed: "18 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small and growing business" },
      { label: "Pricing", value: "Check current plans" },
      { label: "Support", value: "Online support" },
    ],
    pros: [
      "Confident interface for everyday work",
      "Strong adviser collaboration",
      "Broad integration marketplace",
    ],
    cons: [
      "Plan limits need careful reading",
      "Support is mainly handled online",
    ],
    features: ["Bank reconciliation", "Invoicing", "Reporting", "Bills", "Project tracking"],
    localView:
      "Xero serves South African businesses and has a visible adviser community. Confirm bank feed availability, payroll needs and the total cost of connected apps before committing.",
    sourceUrl: "https://www.xero.com/za/",
  },
  {
    slug: "quickbooks-online",
    name: "QuickBooks Online",
    vendor: "Intuit",
    category: "Accounting and Finance",
    shortCategory: "Accounting",
    score: 8.2,
    verdict:
      "A practical cloud accounting product with accessible reporting and a familiar workflow for owners who want to stay close to the numbers.",
    bestFor: "Owner managed businesses that want accessible financial reporting",
    initials: "QB",
    tone: "paper",
    reviewed: "15 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small business" },
      { label: "Pricing", value: "Check current plans" },
      { label: "Support", value: "Online support" },
    ],
    pros: ["Approachable reporting", "Useful invoicing workflow", "Good day to day visibility"],
    cons: ["Plan differences can be easy to miss", "Local requirements should be checked carefully"],
    features: ["Invoicing", "Expenses", "Reporting", "Banking", "Cash flow view"],
    localView:
      "QuickBooks Online is available to South African users. Check local bank connections, tax workflow and support arrangements against the current South African product pages before purchase.",
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
      { label: "Pricing", value: "Check current plans" },
      { label: "Support", value: "Online support" },
    ],
    pros: ["Broad feature coverage", "Useful automation", "Works well inside the Zoho suite"],
    cons: ["Setup depth can feel dense", "Local adviser network is less visible than some rivals"],
    features: ["Invoicing", "Purchases", "Automation", "Inventory", "Reporting"],
    localView:
      "Zoho Books offers substantial functionality for the price. South African buyers should confirm tax settings, banking connections and local support expectations during a trial.",
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
      { label: "Pricing", value: "Check current plans" },
      { label: "Support", value: "Local support" },
    ],
    pros: ["Built around local payroll work", "Clean processing flow", "Helpful guidance"],
    cons: ["HR depth is lighter than a broad people platform", "Complex groups may need more reporting depth"],
    features: ["Payroll processing", "Leave", "Employee self service", "Statutory reports", "Payroll reports"],
    localView:
      "SimplePay is designed for South African payroll and keeps local statutory work central to the product. It is a strong shortlist option when payroll clarity matters more than a large global HR suite.",
    sourceUrl: "https://www.simplepay.co.za/",
  },
  {
    slug: "payspace",
    name: "PaySpace",
    vendor: "PaySpace",
    category: "Payroll and HR",
    shortCategory: "Payroll",
    score: 8.8,
    verdict:
      "Serious cloud payroll and workforce management for organisations that need more scale, structure and regional reach.",
    bestFor: "Larger employers and regional payroll operations",
    initials: "PS",
    tone: "ink",
    reviewed: "10 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Medium and large employer" },
      { label: "Pricing", value: "Request a quote" },
      { label: "Support", value: "Implementation and support" },
    ],
    pros: ["Strong payroll depth", "Suited to larger organisations", "Regional capability"],
    cons: ["Implementation needs careful planning", "More product than a very small employer may need"],
    features: ["Payroll", "Employee records", "Workflow", "Analytics", "Regional processing"],
    localView:
      "PaySpace began in South Africa and is relevant for local employers with more complex payroll structures. Procurement should include a clear implementation plan and named support responsibilities.",
    sourceUrl: "https://www.payspace.com/",
  },
  {
    slug: "hubspot-crm",
    name: "HubSpot CRM",
    vendor: "HubSpot",
    category: "CRM and Sales",
    shortCategory: "CRM",
    score: 8.4,
    verdict:
      "An approachable CRM with an easy starting point and a broad growth path, though costs need watching as more hubs and seats are added.",
    bestFor: "Growing marketing and sales teams that want one connected platform",
    initials: "HS",
    tone: "stone",
    reviewed: "14 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small and growing business" },
      { label: "Pricing", value: "Free entry with paid tiers" },
      { label: "Support", value: "Plan dependent" },
    ],
    pros: ["Easy to begin", "Good contact context", "Connected marketing and service options"],
    cons: ["Costs can rise with scale", "Advanced setup needs governance"],
    features: ["Contact management", "Pipeline", "Email tools", "Reporting", "Automation"],
    localView:
      "HubSpot can work well for South African teams that sell internationally or want marketing and sales in one system. Model the cost of future seats and paid hubs before standardising on it.",
    sourceUrl: "https://www.hubspot.com/products/crm",
  },
  {
    slug: "zoho-crm",
    name: "Zoho CRM",
    vendor: "Zoho",
    category: "CRM and Sales",
    shortCategory: "CRM",
    score: 8.5,
    verdict:
      "A flexible CRM with broad automation and strong value, best for teams willing to spend time shaping it around a defined sales process.",
    bestFor: "Value conscious sales teams that need flexible automation",
    initials: "ZC",
    tone: "paper",
    reviewed: "11 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small and medium business" },
      { label: "Pricing", value: "Check current plans" },
      { label: "Support", value: "Online support" },
    ],
    pros: ["Flexible automation", "Broad suite connections", "Competitive value"],
    cons: ["Configuration can feel busy", "A clear owner is needed for good adoption"],
    features: ["Leads", "Pipeline", "Workflow", "Analytics", "Sales forecasting"],
    localView:
      "Zoho CRM suits South African businesses that want capability without premium enterprise pricing. The decision is strongest when the team has someone responsible for configuration and data quality.",
    sourceUrl: "https://www.zoho.com/crm/",
  },
  {
    slug: "odoo",
    name: "Odoo",
    vendor: "Odoo",
    category: "ERP and Operations",
    shortCategory: "ERP",
    score: 8.2,
    verdict:
      "A broad modular business platform that can deliver excellent value when scope, implementation and customisation are kept under control.",
    bestFor: "Growing operations that want a modular system",
    initials: "OD",
    tone: "stone",
    reviewed: "09 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud or managed setup" },
      { label: "Ideal team", value: "Growing and medium business" },
      { label: "Pricing", value: "Scope dependent" },
      { label: "Support", value: "Vendor and partner options" },
    ],
    pros: ["Wide module choice", "Flexible workflows", "Strong value when carefully scoped"],
    cons: ["Implementation quality varies", "Customisation can create long term cost"],
    features: ["Accounting", "Inventory", "Sales", "Manufacturing", "Commerce"],
    localView:
      "Odoo has partners serving South African businesses. The product decision should include the implementation partner, upgrade approach and exact boundary between standard setup and custom work.",
    sourceUrl: "https://www.odoo.com/",
  },
  {
    slug: "business-central",
    name: "Dynamics 365 Business Central",
    vendor: "Microsoft",
    category: "ERP and Operations",
    shortCategory: "ERP",
    score: 8.6,
    verdict:
      "A capable business management platform for organisations already comfortable with Microsoft, provided implementation scope is treated seriously.",
    bestFor: "Established businesses invested in Microsoft tools",
    initials: "BC",
    tone: "blue",
    reviewed: "08 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Medium business" },
      { label: "Pricing", value: "Licence and partner costs" },
      { label: "Support", value: "Partner led" },
    ],
    pros: ["Broad operational coverage", "Strong Microsoft connection", "Mature partner ecosystem"],
    cons: ["Implementation can be substantial", "True cost extends beyond licences"],
    features: ["Finance", "Sales", "Inventory", "Projects", "Reporting"],
    localView:
      "Business Central has a meaningful South African partner market. The partner choice, implementation plan and ongoing support agreement are as important as the software licence.",
    sourceUrl: "https://www.microsoft.com/en-za/dynamics-365/products/business-central",
  },
  {
    slug: "shopify",
    name: "Shopify",
    vendor: "Shopify",
    category: "Commerce and Point of Sale",
    shortCategory: "Commerce",
    score: 8.7,
    verdict:
      "A polished commerce platform that makes it easier to launch and operate a serious online shop, with extra attention needed for local payments and app costs.",
    bestFor: "Brands that want a reliable hosted online store",
    initials: "SH",
    tone: "ink",
    reviewed: "07 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud" },
      { label: "Ideal team", value: "Small and growing retailer" },
      { label: "Pricing", value: "Subscription plus apps" },
      { label: "Support", value: "Online support" },
    ],
    pros: ["Strong storefront experience", "Reliable hosting", "Large app ecosystem"],
    cons: ["App costs can accumulate", "Local payment setup needs care"],
    features: ["Online store", "Orders", "Inventory", "Themes", "Apps"],
    localView:
      "Shopify is a strong option for South African brands, but payment gateways, shipping tools, currency handling and the monthly cost of essential apps should be mapped before launch.",
    sourceUrl: "https://www.shopify.com/za",
  },
  {
    slug: "yoco",
    name: "Yoco",
    vendor: "Yoco",
    category: "Commerce and Point of Sale",
    shortCategory: "Commerce",
    score: 8.9,
    verdict:
      "A confident local payment and point of sale option that is easy for smaller merchants to understand and put to work.",
    bestFor: "South African small retailers and service businesses",
    initials: "YO",
    tone: "paper",
    reviewed: "06 August 2026",
    facts: [
      { label: "Deployment", value: "Cloud and payment hardware" },
      { label: "Ideal team", value: "Small merchant" },
      { label: "Pricing", value: "Hardware and transaction fees" },
      { label: "Support", value: "Local support" },
    ],
    pros: ["Clear local proposition", "Easy daily use", "Useful merchant tools"],
    cons: ["Larger retail operations may need deeper stock control", "Total cost depends on transaction mix"],
    features: ["Card payments", "Point of sale", "Payment links", "Sales reporting", "Online payments"],
    localView:
      "Yoco is built around South African merchants and offers a straightforward route into card and online payments. Larger retailers should compare inventory and multi location needs in detail.",
    sourceUrl: "https://www.yoco.com/za/",
  },
];

export const guides: Guide[] = [
  {
    slug: "choose-accounting-software-south-africa",
    topic: "Accounting",
    title: "How to choose accounting software for a South African small business",
    excerpt:
      "A practical way to compare daily bookkeeping, adviser access, reporting, bank connections and the cost that appears after the first month.",
    date: "16 August 2026",
    readTime: "8 minute read",
    author: "Nomsa Dlamini",
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
    author: "Pieter Jacobs",
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
    author: "Nomsa Dlamini",
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
    author: "Pieter Jacobs",
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
    author: "Nomsa Dlamini",
    art: "privacy",
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

export const authors = {
  "nomsa-dlamini": {
    name: "Nomsa Dlamini",
    role: "Editor",
    bio: "Nomsa writes about the decisions that sit between finance, operations and customer work. Her focus is making complex software choices easier to discuss inside a real business.",
    expertise: ["Accounting software", "CRM", "Business operations"],
  },
  "pieter-jacobs": {
    name: "Pieter Jacobs",
    role: "Research editor",
    bio: "Pieter covers payroll, operations and implementation. He is interested in the details that determine whether a software change works after the sales presentation is over.",
    expertise: ["Payroll", "Implementation", "ERP"],
  },
};

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
