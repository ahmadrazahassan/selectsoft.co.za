/* ---------------------------------------------------------------------------
 * Written review detail
 *
 * The review page used to interpolate a product name into a stock sentence and
 * print the same line under every feature. This file replaces that with copy
 * written per product. Every entry is written by hand. If a product has no
 * entry here the build test fails, which is deliberate: a thin review is worse
 * than no review.
 *
 * House style: no hyphens and no dashes in prose. Write "cloud based" as
 * "cloud based", "day to day" as "day to day", and split a clause into two
 * sentences instead of reaching for an em dash.
 * ------------------------------------------------------------------------- */

export type ReviewDetail = {
  /** What it is actually like to run. Two or three real paragraphs. */
  overview: string[];
  /** Each capability with a written explanation, not a stock line. */
  capabilities: { name: string; detail: string }[];
  /** How the money really works, including the parts vendors leave out. */
  pricingView: string;
  /** The closing judgement. */
  finalView: string;
  /** Five judged dimensions, each with a reason. The headline score in
   *  data.ts is the mean of these, so the number can be defended. */
  scores: { name: string; value: number; note: string }[];
  /** What it takes to get the product running. */
  implementation: string;
  /** What happens when something breaks. */
  support: string;
};

export const reviewDetail: Record<string, ReviewDetail> = {
  "sage-accounting": {
    implementation:
      "Setup is a day for a clean start and a week if you are migrating. Sage imports a customer, supplier and chart of accounts list from CSV, and most bookkeepers do the opening balances by journal rather than importing history. The part that takes longest is the bank feed, because each account is authorised separately through your bank and one of them will usually need a phone call.",
    support:
      "You get online support and a partner network, and the partner network is the real answer. Because so many local practices work in Sage, the fastest fix is often your own accountant rather than a support ticket. Telephone support exists on the paid plans. Check which support route your specific plan includes, because it is not uniform.",
    scores: [
      { name: "Everyday use", value: 8.6, note: "Laid out around the monthly bookkeeping rhythm rather than a dashboard." },
      { name: "Depth of features", value: 7.4, note: "Runs out of room quickly on inventory, job costing and manufacturing." },
      { name: "Value for money", value: 7.8, note: "Honest headline, but extra users, companies and modules are all billed on top." },
      { name: "Support and skills", value: 8.8, note: "The largest pool of South African bookkeepers and partners of any cloud ledger." },
      { name: "South African fit", value: 9.0, note: "VAT201 reporting and local bank feeds are native rather than adapted." },
    ],
    overview: [
      "Sage Accounting is the cloud product Sage points South African small businesses towards, and it behaves like software written by people who have watched a bookkeeper work. Invoicing, bank reconciliation and VAT sit close to the surface. The monthly rhythm of capture, reconcile, review and submit is what the interface is organised around, rather than a dashboard nobody opens twice.",
      "The trade off is depth. Once you need serious inventory, job costing or manufacturing you are being nudged towards another Sage product, and that conversation tends to arrive sooner than buyers expect. For a service business billing time and expenses it is comfortable for years. For a distributor holding stock across two warehouses it will feel tight inside twelve months.",
    ],
    capabilities: [
      { name: "Invoicing and quotes", detail: "Quotes convert to invoices without re keying, and recurring invoices handle retainer billing. Layouts are configurable enough to carry your VAT number and banking details correctly." },
      { name: "Bank reconciliation", detail: "Feeds from the major local banks reduce reconciliation to reviewing suggested matches. Check your specific bank and account type during the trial, because feed coverage is not uniform." },
      { name: "VAT reporting", detail: "VAT is tracked per transaction and reported in a format that maps onto a VAT201 without a spreadsheet in the middle. Confirm your VAT category is handled before your first submission." },
      { name: "AutoEntry capture", detail: "Photographs of supplier invoices and slips are read and posted, which removes most manual capture. It is billed as a separate credit bundle, so factor that in." },
      { name: "Adviser access", detail: "Your accountant gets their own login rather than sharing yours. That single detail is what makes month end collaboration workable instead of a monthly export." },
    ],
    pricingView:
      "Start is R240 a month including VAT for one user and Standard is R435 including VAT for two users and one company. The headline is honest, but the add on list is where budgets move. Extra users, extra companies, advanced inventory, debtors management and time tracking are each billed on top, and several are things a growing business assumes are included. Price the configuration you will run in month twelve, not the one you sign up for in month one.",
    finalView:
      "A sound choice for a South African service business that wants clean books, a real bank feed and an accountant who can log in. Look elsewhere if stock, manufacturing or job costing are central to how you make money.",
  },

  xero: {
    implementation:
      "A straightforward migration if you are coming from another cloud ledger, and a longer one from desktop. Xero imports contacts and the chart of accounts from CSV and offers conversion tooling for common products. Budget the real time for bank rules rather than the import, because reconciliation only becomes fast once the rules are trained, and that is two or three cycles.",
    support:
      "Support is online only. There is no telephone number, and for some finance teams that is a genuine objection. In practice the documentation is very good and the adviser community fills the gap, so the practical experience is better than the policy sounds. If you want somebody to phone, budget for a Xero partner.",
    scores: [
      { name: "Everyday use", value: 9.2, note: "The best reconciliation screen in this bracket, and the rules learn fast." },
      { name: "Depth of features", value: 8.4, note: "Broad, though several gaps are filled by paid apps rather than natively." },
      { name: "Value for money", value: 7.9, note: "Standing price is high once the introductory discount ends and apps are added." },
      { name: "Support and skills", value: 8.6, note: "Large adviser community locally, but support is online only." },
      { name: "South African fit", value: 7.8, note: "No local payroll, and bank feed coverage varies by bank and account type." },
    ],
    overview: [
      "Xero is the most comfortable of the cloud ledgers to work in every day. Reconciliation is fast, the mobile app is genuinely usable, and the app marketplace means most awkward requirements have an answer someone else has already built. For a business that works closely with an accountant it removes a great deal of friction.",
      "In South Africa there are two things to check before committing. The first is bank feeds, which vary by bank and account type. The second is payroll, because Xero does not ship a South African payroll, so you will pair it with SimplePay or similar and pay for both.",
    ],
    capabilities: [
      { name: "Bank reconciliation", detail: "The reconciliation screen is the best in this bracket. Rules learn your recurring transactions quickly, and a month of capture collapses into an afternoon once they are set." },
      { name: "Invoicing and quotes", detail: "Online invoices show the client when they were viewed and take card payment if you connect a gateway, which measurably shortens debtor days." },
      { name: "Reporting", detail: "Reports are built from a flexible layout editor rather than fixed templates, so management packs can be shaped once and reused every month." },
      { name: "App marketplace", detail: "Several hundred integrations, including local payroll and payment tools. This is the practical reason Xero survives requirements it does not meet natively." },
      { name: "Just Ask Xero", detail: "The assistant drafts invoices and answers questions about your ledger in plain language. Useful for quick lookups, not a substitute for knowing your numbers." },
    ],
    pricingView:
      "Starter is R450 a month, Standard R795 and Premium R1 095, with 80 percent off for the first three months. The introductory discount is generous enough to distort a trial decision, so plan against the standing price. The bigger number to model is the total stack. Xero plus a South African payroll plus a document capture tool is a realistic monthly cost, and the plan limits on Starter are tight enough that most growing businesses move up.",
    finalView:
      "The strongest everyday experience of the cloud ledgers, and an easy recommendation when your accountant already works in it. Budget for the connected apps, because Xero on its own is not the whole system.",
  },

  "quickbooks-online": {
    implementation:
      "Among the quickest to start. The setup wizard asks a short series of questions and produces a usable chart of accounts, and imports run from CSV or from a competitor file. A small business can be invoicing the same afternoon. Historical data is the part people underestimate, so decide early whether you are bringing history across or starting from a trial balance.",
    support:
      "Telephone and chat support are included, which puts Intuit ahead of Xero on paper. The local adviser base is thinner than Sage or Xero, so finding a QuickBooks literate accountant in South Africa takes more effort. Ask your accountant before you commit, because their familiarity is worth more than the support line.",
    scores: [
      { name: "Everyday use", value: 8.7, note: "Clearest owner dashboard of the cloud ledgers, readable without training." },
      { name: "Depth of features", value: 7.9, note: "Solid ledger, though multi currency and stock sit behind higher plans." },
      { name: "Value for money", value: 7.6, note: "Tight user counts push you up a plan for one extra login." },
      { name: "Support and skills", value: 7.8, note: "Smaller local adviser base than Sage or Xero." },
      { name: "South African fit", value: 8.0, note: "Localised for VAT, but the product is not shaped around this market." },
    ],
    overview: [
      "QuickBooks Online is built around the owner who wants to see how the business is doing without asking anyone. The dashboard leads with cash and profit, reports are readable without training, and the whole product is aimed at someone who is running a business rather than keeping books full time.",
      "Intuit is pushing AI features hard, and several are still marked beta. They are pleasant when they work. Treat them as convenience rather than as a reason to buy, and judge the product on the ledger underneath, which is solid.",
    ],
    capabilities: [
      { name: "Owner dashboard", detail: "Cash position, profit and outstanding invoices lead the screen. It is the clearest answer to the question most owners actually ask on a Monday morning." },
      { name: "Invoicing and quotes", detail: "Fast to raise, with reminders that chase debtors automatically. Payment links can be attached where a gateway is connected." },
      { name: "Intuit Intelligence", detail: "Categorises transactions and answers questions about the books. Query limits apply on lower plans, and the feature is in beta, so verify anything it tells you." },
      { name: "Multi currency", detail: "Available from the Essentials plan up, which matters if you import. Confirm the revaluation treatment suits your auditor before relying on it." },
      { name: "Accountant access", detail: "A dedicated accountant seat sits outside your paid user count on every plan, which keeps month end collaboration cheap." },
    ],
    pricingView:
      "Simple Start is R322 a month, Essentials R508 and Plus R708, with 70 percent off for six months at the time of checking. The user counts are the thing to watch. Simple Start covers one user, Essentials three, and moving up a plan for one extra login is a common and irritating cost. Work out your real user count including anyone who only needs to raise invoices before you choose a plan.",
    finalView:
      "The right pick for an owner who wants to stay close to the numbers without becoming a bookkeeper. Read the plan limits carefully, because the gap between Simple Start and Essentials catches people out.",
  },

  "zoho-books": {
    implementation:
      "Quick to start and slower to finish. Creating an organisation and issuing an invoice takes minutes. Shaping the workflow, tax rules and templates around your business takes real thought, because Zoho gives you a great many settings and no strong opinion about which to use. Budget a proper afternoon rather than ten minutes.",
    support:
      "Email and chat support are included and response quality is generally good, though time zones show. The bigger gap is local. Very few South African practices work in Zoho Books, so your accountant may be learning alongside you. That is manageable for a simple business and a real risk for a complicated one.",
    scores: [
      { name: "Everyday use", value: 8.2, note: "Clean and quick, though the interface assumes some accounting vocabulary." },
      { name: "Depth of features", value: 8.4, note: "Strong for the price, with stock, projects and multi currency included." },
      { name: "Value for money", value: 9.6, note: "Free under one million rand of revenue, then priced per organisation not per user." },
      { name: "Support and skills", value: 7.2, note: "Few local bookkeepers work in it, so you may train your accountant." },
      { name: "South African fit", value: 8.1, note: "Real ZAR pricing and VAT handling, which most global rivals do not offer." },
    ],
    overview: [
      "Zoho Books is the best value proper accounting product available to South African businesses, and the free plan under one million rand of annual revenue is not a crippled demonstration. It is a working ledger. For a young business that is a genuinely useful offer.",
      "The catch is the same as everywhere in the Zoho range. Books is at its best when the rest of your business also runs on Zoho. Standing alone it is very capable. Combined with Zoho CRM, Inventory and Projects it becomes a coherent system at a price that no rival matches.",
    ],
    capabilities: [
      { name: "Free plan", detail: "Free indefinitely while annual revenue stays under one million rand. A real ledger with invoicing, expenses and reporting, not a time limited trial." },
      { name: "Invoicing and payments", detail: "Client portal, recurring invoices and automated reminders. Customers can view statements themselves, which cuts down on account queries." },
      { name: "Zia assistant", detail: "Answers questions about the books and flags anomalies. More useful for spotting an odd number than for doing the work for you." },
      { name: "Inventory", detail: "Basic stock tracking is included, with Zoho Inventory available when you outgrow it. The upgrade path is clean rather than a migration." },
      { name: "Multi currency", detail: "Handled properly with automatic rate updates, which matters more than it sounds when you buy stock abroad in dollars." },
    ],
    pricingView:
      "Zero on the free plan, then Standard at R99 a month, Professional R199, Premium R299 and higher tiers above that, all excluding taxes and priced per organisation rather than per user. Per organisation pricing is the quiet advantage. Adding a bookkeeper does not raise the bill the way it does on rivals. Watch the transaction and user caps on each tier rather than the feature list.",
    finalView:
      "The strongest value in South African cloud accounting, and the free plan makes it very hard to argue against for a business that is still finding its feet. Best of all if you are willing to live inside the wider Zoho suite.",
  },

  simplepay: {
    implementation:
      "One of the easiest payroll migrations in this market. You capture employees, opening year to date figures and leave balances, and the product checks the arithmetic as you go. A small payroll is live in an afternoon. Do the first run in parallel with your old system for one cycle, which is standard practice and catches the leave balance errors that always appear.",
    support:
      "Support is the reason many bookkeepers stay. It is local, it is staffed by people who understand South African payroll, and the answers are specific rather than scripted. Free online training is included. For a payroll product that matters more than any feature, because the questions arrive at month end and cannot wait.",
    scores: [
      { name: "Everyday use", value: 9.1, note: "Plain and fast. A payroll run is genuinely a short task." },
      { name: "Depth of features", value: 8.2, note: "Focused on payroll and leave. It does not try to be an HR system." },
      { name: "Value for money", value: 9.0, note: "Per employee with no licence fee, so cost tracks the size of the payroll." },
      { name: "Support and skills", value: 9.2, note: "Support has a strong local reputation and it is earned." },
      { name: "South African fit", value: 9.6, note: "Built for SARS and the local tax year rather than localised afterwards." },
    ],
    overview: [
      "SimplePay does one thing and does it with unusual clarity. It runs South African payroll, keeps up with the annual tax year changes, and produces the submissions SARS expects without turning the process into a project. The interface is plain in the way good tools often are.",
      "It is priced per employee with no licence fee, which suits businesses with fluctuating headcount and suits bookkeeping practices running several client payrolls. Support has a reputation locally that is genuinely earned, and for payroll that reputation matters more than feature lists.",
    ],
    capabilities: [
      { name: "PAYE, UIF and SDL", detail: "Statutory calculations maintained against the current tax year, including the mid year changes that catch out spreadsheet payrolls." },
      { name: "SARS e@syFile integration", detail: "IRP5 and IT3(a) certificates export in the format e@syFile expects, which turns reconciliation season into an afternoon rather than a week." },
      { name: "Employee self service", detail: "Staff retrieve their own payslips, submit leave and update banking details for approval. That removes the most common interruption in a payroll administrator's month." },
      { name: "Leave management", detail: "Annual, sick and family responsibility leave are configured to South African statutory minimums out of the box, with room for your own policy on top." },
      { name: "Accounting integration", detail: "Posts the payroll journal into Xero and QuickBooks directly, which removes the monthly manual journal and the errors that come with it." },
    ],
    pricingView:
      "About R235.50 a month excluding VAT for ten employees, which works out near R23.55 per employee. The rate falls as headcount rises and there is no licence fee, so the cost tracks the size of your payroll rather than a plan you have to guess at in advance. A free trial is offered but the length is not published, so ask when you sign up. Practices running client payrolls should request a bureau quote rather than paying per company.",
    finalView:
      "The default recommendation for South African small business payroll, and the one most local bookkeepers reach for first. Nothing about it is flashy, which is exactly right for payroll.",
  },

  payspace: {
    implementation:
      "This is an implementation, not a signup. Multi entity structures, earning definitions and approval workflow are configured by a consultant against your rules, and the timeline runs to weeks rather than days. Insist on a parallel run before cutover, and get the data migration approach in writing including which historical years come across.",
    support:
      "Support runs through the implementation partner and the vendor, and since the Deel acquisition the structure has changed. Ask directly which team you will reach, what the response times are, and whether your named consultant stays after go live. Those answers should be in the contract rather than in an email.",
    scores: [
      { name: "Everyday use", value: 8.2, note: "Capable but heavier, and configuration is a project rather than a signup." },
      { name: "Depth of features", value: 9.2, note: "Multi entity, multi country payroll with a real HR module behind it." },
      { name: "Value for money", value: 7.9, note: "No public rate card, and the Deel acquisition adds renewal uncertainty." },
      { name: "Support and skills", value: 8.4, note: "Established local implementation base, now inside a global parent." },
      { name: "South African fit", value: 9.3, note: "Long local track record plus statutory rules for much of the continent." },
    ],
    overview: [
      "PaySpace is the enterprise end of South African cloud payroll, built for organisations running multiple entities, often across several African countries, with the compliance rules for each maintained by the vendor. It is now sold as Deel Local Payroll following the acquisition.",
      "That acquisition is the main thing to weigh. The underlying payroll engine has a long and good local track record. The commercial packaging, the roadmap and the support structure are all now shaped by a global parent, and buyers should ask direct questions about what that means for their contract.",
    ],
    capabilities: [
      { name: "Multi country payroll", detail: "Statutory rules maintained for a long list of African countries in one platform, which is the reason groups with operations outside South Africa choose it." },
      { name: "Multi entity structures", detail: "Several legal entities in one instance with consolidated reporting, without running separate payrolls that have to be manually combined." },
      { name: "Employee self service", detail: "Full self service for payslips, leave and personal detail changes, with approval workflow behind it rather than email requests." },
      { name: "Human resources module", detail: "Recruitment, performance and organisational structure sit alongside payroll on the same employee record instead of in a separate system." },
      { name: "Reporting and analytics", detail: "Report builder aimed at HR and finance rather than developers, with employment equity and statutory reporting included." },
    ],
    pricingView:
      "There is no public rate card. Pricing is per employee per month, quoted after a scoping conversation, and it scales down as headcount rises. Because the product is now sold as Deel Local Payroll, ask specifically what happens at renewal, whether the quoted rate is held for the contract term, and which support team you will actually reach. Get the answer in writing.",
    finalView:
      "Well suited to groups running payroll across several entities or several African countries. Smaller single entity employers will find it heavier and more expensive than they need.",
  },

  "hubspot-crm": {
    implementation:
      "You can be using the free tier in ten minutes, which is the point. The work is not installation, it is deciding your pipeline stages and required fields before the team starts entering deals. Import contacts from CSV or connect Gmail or Outlook. Doing the pipeline design properly first is what separates a CRM people use from one they abandon.",
    support:
      "The free tier gets community support and documentation, which is extensive and genuinely good. Paid tiers add email and chat, and higher hubs add a phone line. There is a competent local partner community for implementation. Because billing is in dollars, support escalation follows a global process rather than a local one.",
    scores: [
      { name: "Everyday use", value: 9.0, note: "Sales people update it without being chased, which is the only real test." },
      { name: "Depth of features", value: 8.6, note: "Very broad, though the useful reporting sits in the higher hubs." },
      { name: "Value for money", value: 7.3, note: "Free tier is genuine, but the step to Professional is steep and dollar billed." },
      { name: "Support and skills", value: 8.5, note: "Enormous documentation and a wide partner network." },
      { name: "South African fit", value: 7.2, note: "No local billing, no ZAR pricing, and forex on every invoice." },
    ],
    overview: [
      "HubSpot earns its position through the free tier, which is a real CRM rather than a demonstration. Contacts, deals, pipelines and basic email all work without payment, and for a small sales team that can be enough for a surprisingly long time.",
      "The commercial model is the thing to understand. HubSpot is designed so that growth pushes you into paid seats and higher hubs, and the step from Starter to Professional is steep. That is not a criticism of the software, which is excellent, but it does mean the cost curve needs modelling before you build your whole revenue process on it.",
    ],
    capabilities: [
      { name: "Free CRM", detail: "Unlimited contacts and a working deal pipeline at no cost with no card required. Genuinely usable rather than a trial with the features removed." },
      { name: "Deal pipelines", detail: "Visual pipelines that sales people update without being chased, which is the only measure of a CRM that matters in practice." },
      { name: "Email and meeting tools", detail: "Templates, sequences and a booking link that removes the scheduling exchange. The booking link alone converts a surprising number of prospects." },
      { name: "Breeze AI", detail: "Drafts outreach and summarises records. Helpful for a first draft, and it still needs a human who knows the customer before anything is sent." },
      { name: "Reporting", detail: "Dashboards are strong even on lower tiers, although the most useful attribution reporting sits behind the higher hubs." },
    ],
    pricingView:
      "Free to start, then about R112 per seat per month on Starter. HubSpot charges seven dollars per seat billed annually, converted here at sixteen rand to the dollar, so your card is debited in dollars and your bank adds a conversion fee on top. Monthly billing costs closer to twenty dollars per seat. The real budgeting risk is not Starter. It is the jump to Professional, which is many times the price, and the marketing contact tiers that increase as your database grows.",
    finalView:
      "Start free, stay free as long as it serves you, and model the Professional pricing carefully before you make it the centre of your sales operation.",
  },

  "zoho-crm": {
    implementation:
      "Expect to spend real time here. Zoho rewards a defined sales process and will not impose one, so the configuration work is the implementation. Map your stages, fields and automation on paper first, then build. Businesses that skip that step end up with a CRM full of half filled records that nobody trusts.",
    support:
      "Email, chat and telephone support are included depending on edition, and the documentation is thorough. Local implementation partners exist but are thinner on the ground than for HubSpot or Salesforce. If nobody internally will own the configuration, budget for a partner from the start rather than after the first failed attempt.",
    scores: [
      { name: "Everyday use", value: 8.0, note: "Rewards a defined sales process. It will not impose one for you." },
      { name: "Depth of features", value: 9.1, note: "Automation and customisation well beyond the price bracket." },
      { name: "Value for money", value: 9.0, note: "Free for three users, then among the cheapest capable CRMs available." },
      { name: "Support and skills", value: 7.6, note: "Configuration effort is real and local Zoho partners are thinner on the ground." },
      { name: "South African fit", value: 7.4, note: "Billed in dollars with local taxes added on top." },
    ],
    overview: [
      "Zoho CRM gives you a great deal of capability for the money, and the free edition for three users is a fair starting point for a small sales team. Automation, custom modules and reporting go deeper than the price suggests.",
      "The cost is configuration effort. Zoho rewards teams willing to shape it around a defined sales process and punishes teams hoping it will impose one. Budget time or a partner for setup, and the outcome is usually very good value.",
    ],
    capabilities: [
      { name: "Free for three users", detail: "Leads, deals, workflows, reports and a mobile app at no cost for up to three users, with no time limit attached." },
      { name: "Workflow automation", detail: "Rules, assignment and escalation that go well beyond the price bracket. This is where the product earns its reputation." },
      { name: "Zia and AI agents", detail: "Prediction, anomaly detection and agents that can be pointed at repetitive work across Zoho apps. Useful once your data is clean." },
      { name: "Customisation", detail: "Custom modules and fields without developer help, which is why it fits unusual sales processes that packaged CRMs reject." },
      { name: "Zoho suite integration", detail: "Connects to Books, Desk, Campaigns and the rest. The suite is where the value compounds and where the lock in also begins." },
    ],
    pricingView:
      "Free for three users, then about R224 per user per month on Standard, rising through Professional, Enterprise and Ultimate. Zoho charges fourteen dollars per user on Standard, converted at sixteen rand to the dollar, so you are billed in dollars with a bank conversion cost on top. Local taxes are added. A one hour demonstration is offered, which is worth taking because the product rewards a considered configuration.",
    finalView:
      "The best capability per rand in CRM, provided someone will own the configuration. Teams wanting to be led by the software rather than lead it should look at HubSpot instead.",
  },

  odoo: {
    implementation:
      "The One App Free tier installs in minutes. A multi app rollout is an ERP project and should be planned as one, with a partner, a scope and a phased go live. The specific South African question to resolve early is VAT and payroll localisation, which is maintained by the community rather than guaranteed by the vendor.",
    support:
      "Odoo offers support with a paid subscription and the community forum is active. In practice your partner is your support line, so the partner selection decides the experience. Get a named contact, a response time and an escalation path in writing before signing, because a community forum is no help when invoicing is down.",
    scores: [
      { name: "Everyday use", value: 7.6, note: "Powerful but the breadth makes it busy, and Studio invites over building." },
      { name: "Depth of features", value: 9.3, note: "Accounting through manufacturing and ecommerce on one database." },
      { name: "Value for money", value: 8.8, note: "One app free for unlimited users, then priced per user rather than per app." },
      { name: "Support and skills", value: 7.4, note: "Outcome depends heavily on the partner, and good ones are in demand." },
      { name: "South African fit", value: 7.1, note: "Local VAT and payroll localisation is community maintained, not vendor guaranteed." },
    ],
    overview: [
      "Odoo is a modular business suite that reaches from accounting through inventory, manufacturing, CRM and ecommerce. The One App Free offer for unlimited users is unusual and genuinely useful if your need is narrow.",
      "The moment you need two apps the economics change and you are on a per user subscription across the whole platform. That is the decision point. As a single app it is remarkable value. As a full suite it is a real ERP commitment with an implementation to match, and South African localisation is community supported rather than vendor guaranteed.",
    ],
    capabilities: [
      { name: "One App Free", detail: "A single application free for unlimited users, permanently. For a business that only needs, say, inventory, this is an unusually good offer." },
      { name: "Modular apps", detail: "Accounting, inventory, manufacturing, CRM, ecommerce and more share one database, which removes most integration work between them." },
      { name: "Manufacturing", detail: "Bills of material, work orders and routing at a price far below traditional manufacturing ERP. Depth is real but expect configuration." },
      { name: "Odoo Studio", detail: "Build custom screens and fields without code. Powerful and also the fastest way to create an upgrade problem if used carelessly." },
      { name: "Open source core", detail: "The community edition can be self hosted, which suits businesses that want control over their data and have technical capacity." },
    ],
    pricingView:
      "One app free for unlimited users, then about R116 per user per month on Standard. Odoo charges seven dollars twenty five per user, converted at sixteen rand to the dollar, billed in dollars. The per user model means the cost is driven by headcount rather than by how many apps you switch on, which is generous once you use several. Implementation is the real budget line. South African VAT and payroll localisation should be confirmed with your partner before signing.",
    finalView:
      "Excellent value and genuinely broad. Treat a multi app rollout as an ERP project with a partner, and confirm local tax handling early rather than late.",
  },

  "business-central": {
    implementation:
      "A partner led implementation measured in weeks or months depending on scope. Data migration, chart of accounts design, dimension structure and approval workflow are all decisions taken during the project, and they are difficult to change afterwards. Budget internal time as well as consulting fees, because your own people are needed throughout.",
    support:
      "Support runs through your Microsoft partner, with Microsoft behind them. The local partner channel is deep, which makes finding help straightforward and makes quality variable. Ask for the support agreement separately from the implementation quote, and confirm what response time you are actually buying.",
    scores: [
      { name: "Everyday use", value: 8.1, note: "Familiar to anyone living in Microsoft 365, less so to everyone else." },
      { name: "Depth of features", value: 9.0, note: "Genuine ERP breadth with Copilot included rather than sold separately." },
      { name: "Value for money", value: 7.6, note: "Dollar billed per user, and partner implementation is the larger cost." },
      { name: "Support and skills", value: 8.6, note: "Deep local Microsoft partner channel." },
      { name: "South African fit", value: 7.9, note: "Localisation is solid, but nothing about it is designed for this market." },
    ],
    overview: [
      "Business Central is Microsoft's ERP for companies that have outgrown small business accounting, and its strongest argument is the environment it sits in. If your business already runs on Microsoft 365, the shared identity, the Excel integration and the Power Platform reporting are worth real money.",
      "It is a proper ERP, which means an implementation partner, a scoping exercise and a project rather than a signup. The functionality is broad and the Copilot features are included rather than sold separately, which is a more honest position than several rivals take.",
    ],
    capabilities: [
      { name: "Financial management", detail: "Multi entity, multi currency general ledger with consolidation and dimensional reporting that finance teams can actually use for analysis." },
      { name: "Microsoft Copilot", detail: "Included in the licence rather than charged as an add on. Drafts descriptions, reconciles and summarises, with the usual need to verify." },
      { name: "Supply chain", detail: "Purchasing, inventory, warehousing and planning in one place, with the demand forecasting that distributors need to hold less stock." },
      { name: "Microsoft 365 integration", detail: "Work inside Outlook and Excel against live data. For a business already on Microsoft this removes a great deal of copying between systems." },
      { name: "Power BI reporting", detail: "Reporting through Power BI rather than a limited built in tool, which is a significant advantage for anyone with analytics ambitions." },
    ],
    pricingView:
      "About R1 280 per user per month on Essentials. Microsoft charges eighty dollars per user billed yearly and excluding VAT, converted at sixteen rand to the dollar, so the bill arrives in dollars. Premium is one hundred and ten dollars and Team Members licences are eight dollars for read and approve access, which is how you keep the total down. The licence is rarely the largest number. Partner implementation usually is, so get that quoted before you compare the per user rate to anything else.",
    finalView:
      "A strong choice for a Microsoft centred business ready for real ERP. Use Team Members licences aggressively and treat implementation as the main cost.",
  },

  shopify: {
    implementation:
      "A store can be live in a day and trading properly in a week. Theme selection, product import and shipping rules are the bulk of the work. The South African specific task is payments, because you must connect a local gateway and confirm the total fee before launch rather than after your first busy weekend.",
    support:
      "Support is 24 hours a day through chat and email and is genuinely responsive. There is a large local agency and freelancer community if you want build help. App support is separate, which matters, because a problem in a third party app is not something Shopify will fix for you.",
    scores: [
      { name: "Everyday use", value: 9.3, note: "A credible store live in a day, run by someone who is not technical." },
      { name: "Depth of features", value: 8.8, note: "Best converting checkout available, plus a very deep app ecosystem." },
      { name: "Value for money", value: 7.4, note: "Dollar billed, three day trial, and the app spend adds up quietly." },
      { name: "Support and skills", value: 8.7, note: "Large local agency and developer community." },
      { name: "South African fit", value: 6.9, note: "Shopify Payments is unavailable here, so an extra transaction fee applies." },
    ],
    overview: [
      "Shopify remains the fastest way to put a credible online store in front of South African customers. Hosting, security, checkout and payments are handled, the theme ecosystem is mature, and the admin is genuinely usable by someone who is not technical.",
      "The two local considerations are payments and cost. Shopify Payments is not available in South Africa, so you will use a local gateway such as Payfast or Yoco and pay Shopify a transaction fee on top of the gateway fee. Second, the app store is where budgets quietly expand.",
    ],
    capabilities: [
      { name: "Storefront and themes", detail: "A professional store live in a day. Themes are configurable without code, and the paid ones are usually worth the once off cost." },
      { name: "Checkout", detail: "One of the highest converting checkouts available, which is the single feature most worth paying for in ecommerce." },
      { name: "Sidekick AI", detail: "Assists with product descriptions, store edits and analytics questions. Useful for volume catalogue work, still needs editing." },
      { name: "App ecosystem", detail: "Thousands of apps covering local shipping, accounting and marketing. Also the main way a low monthly plan becomes an expensive one." },
      { name: "Multi channel selling", detail: "Sell through social channels and marketplaces from the same inventory, which prevents the overselling that kills small retailers." },
    ],
    pricingView:
      "About R400 a month on Basic. Shopify charges twenty five dollars per month, converted at sixteen rand to the dollar, and bills in dollars. Annual billing brings it to roughly R304 a month and there is a one dollar per month introductory offer for three months. The trial is only three days, which is short. The real cost is the additional transaction fee that applies because Shopify Payments is unavailable locally, plus your gateway fee, plus apps. Model all three together.",
    finalView:
      "Still the best ecommerce platform for most South African retailers, provided you go in with clear eyes about the local transaction fee and the app spend.",
  },

  yoco: {
    implementation:
      "About as simple as business software gets. You order a machine, verify your identity, connect a bank account and start taking cards, usually within days. There is no implementation. The only real decision is which plan, and that depends on your monthly card turnover rather than on features.",
    support:
      "Local support with local hours, and replacement hardware if a machine fails. For a small merchant that combination is the product. If your turnover grows to the point where the rate matters more than the convenience, get a bank acquirer quote and compare, because at that level the relationship changes.",
    scores: [
      { name: "Everyday use", value: 9.2, note: "Onboarding is quick and the hardware just works at a counter." },
      { name: "Depth of features", value: 7.6, note: "Deliberately narrow. It is card acceptance, not a full point of sale." },
      { name: "Value for money", value: 8.9, note: "No monthly fee on Core, and rates fall as volume rises." },
      { name: "Support and skills", value: 8.6, note: "Local support and local hardware replacement." },
      { name: "South African fit", value: 9.8, note: "Built here for merchants the traditional acquirers would not take on." },
    ],
    overview: [
      "Yoco built its reputation by making card acceptance available to South African businesses that traditional acquirers would not bother with. The hardware is affordable, onboarding is quick, and there is no monthly fee on the entry plan, which is why it spread through small retail and services so quickly.",
      "The economics are the whole story. Yoco is not competing on features against a full point of sale. It competes on the total cost of taking a card payment, and for a small merchant that calculation usually favours it until volumes get large enough to negotiate directly with a bank.",
    ],
    capabilities: [
      { name: "Card machines", detail: "Handheld readers from R699 and the Yoco Counter at R2 999. Low enough that a small trader can start accepting cards without financing hardware." },
      { name: "Tiered transaction rates", detail: "Rates fall as monthly volume rises, from around 2.30 percent down to 1.20 percent in person on the Pro plan for local debit." },
      { name: "No monthly fee on Core", detail: "The entry plan costs nothing per month, so a seasonal or low volume business pays only when it actually takes money." },
      { name: "Business tools", detail: "Sales reporting, staff accounts and basic stock on the paid plans, enough for a small shop that does not need a full point of sale." },
      { name: "Next day settlement", detail: "Funds reach your account quickly, which matters a great deal to a small business managing cash week to week." },
    ],
    pricingView:
      "Core costs nothing per month, Plus is R249 and Pro is R499, with a thirty day free trial on the paid plans. The monthly fee is the small number. The transaction rate is where the money is. Work out your blended rate at your actual monthly card turnover before choosing a plan, because paying R499 to drop from 2.30 percent to 1.20 percent only pays for itself above a certain volume. Do that arithmetic on your own numbers.",
    finalView:
      "The sensible default for small South African merchants taking cards. Once monthly card turnover becomes substantial, get a quote from a bank acquirer and compare properly.",
  },

  "sage-pastel-accounting": {
    implementation:
      "A desktop installation, which means a server or a hosted environment, backups and a restore plan that somebody has actually tested. Migration from another package is usually done by a partner. Multi site or remote working needs terminal services or hosting on top, and that decision belongs at the start of the project rather than six months in.",
    support:
      "The first year of telephone and email support is usually bundled with a new licence, and after that it follows your annual renewal. The practical support network is the enormous pool of Pastel literate bookkeepers, which is faster than a ticket for most everyday questions. Confirm what your renewal includes.",
    scores: [
      { name: "Everyday use", value: 7.0, note: "Capable but dated, and remote working needs hosting on top." },
      { name: "Depth of features", value: 8.6, note: "Inventory, job costing and multi currency beyond what cloud ledgers offer." },
      { name: "Value for money", value: 7.4, note: "No public price, and the annual renewal is the number that catches people." },
      { name: "Support and skills", value: 9.4, note: "Almost every bookkeeper in the country can already use it." },
      { name: "South African fit", value: 9.1, note: "VAT201 reporting and an annual tax update that arrives on time." },
    ],
    overview: [
      "Sage Pastel Partner is the desktop accounting package that shaped how a generation of South African bookkeepers thinks about a ledger. It is still capable software. Multi currency, inventory, job costing and a properly structured general ledger are all there, and the annual tax update arrives on time every year.",
      "What you are really buying is the labour market around it. Almost any bookkeeper in the country can sit down at a Pastel file and work without training, and almost any practice can open your backup. That lowers the cost of monthly processing and of changing accountants, and it is the honest reason the product persists in a market that has otherwise moved to the browser.",
      "The cost is modernity. Remote working needs hosting or a terminal server, the interface is dated, and there is no checkout page. You buy through a reseller and the real number appears in a quote.",
    ],
    capabilities: [
      { name: "General ledger and cashbook", detail: "A properly structured ledger with the account and sub account depth a reviewing accountant expects, rather than the flattened chart that cloud products often impose." },
      { name: "Inventory and multi warehouse", detail: "Stock across multiple locations with cost tracking, which is the main reason trading businesses stay on Pastel rather than moving to a cloud ledger." },
      { name: "Job costing", detail: "Costs and revenue tracked against a job, useful for contractors and workshops that need to know which work actually made money." },
      { name: "Multi currency processing", detail: "Foreign supplier invoices with realised and unrealised gain handling, which matters to importers and is often thin in cheaper products." },
      { name: "VAT201 ready reporting", detail: "VAT reporting laid out to match the submission rather than requiring a spreadsheet in the middle, maintained through the annual update." },
    ],
    pricingView:
      "There is no published rate card. Pastel is sold through Sage business partners and the price arrives as a quote covering the licence, the number of users, any modules and the annual renewal. Three questions decide whether the quote is good. What does the annual renewal cost in year two, is the yearly tax update included or billed separately, and what does an additional user cost. Ask all three in writing, because the answers vary between partners.",
    finalView:
      "Still a rational choice for an established business whose accountant works in Pastel and whose stock or job costing needs defeat a cloud ledger. If you are starting fresh with no Pastel history, the cloud products will serve you better.",
  },

  "sage-business-cloud-payroll": {
    implementation:
      "Straightforward. Capture the company, the employees and their year to date figures, and the statutory calculations follow. A small payroll is live in an afternoon. Run one cycle in parallel with whatever you are leaving, because opening leave balances and loan balances are where migrations go wrong.",
    support:
      "Online and telephone support from Sage, plus the partner network. Because the product is aimed at small employers, the support questions tend to be routine and the documentation covers most of them. Statutory updates arrive without you doing anything, which is the support that matters most in payroll.",
    scores: [
      { name: "Everyday use", value: 8.6, note: "Simple enough that an owner can run payroll without a payroll background." },
      { name: "Depth of features", value: 7.6, note: "Payroll and leave are solid. HR depth is thin." },
      { name: "Value for money", value: 8.8, note: "Unlimited companies and users on every band is unusually generous." },
      { name: "Support and skills", value: 8.4, note: "Sage support plus a wide local partner base." },
      { name: "South African fit", value: 9.4, note: "UIF declaration and ACB payment file are native, not adapted." },
    ],
    overview: [
      "Sage Payroll is the cloud payroll Sage sells directly to South African small employers, and its best quality is predictability. You pick the band your headcount falls into and you know the monthly cost. PAYE, UIF and SDL are calculated for you and the statutory updates arrive without you doing anything.",
      "The allowance that makes it interesting is unlimited companies and unlimited users on every band. For a bookkeeping practice running payroll for a number of small clients, that changes the economics considerably compared with paying per company elsewhere.",
    ],
    capabilities: [
      { name: "PAYE, UIF and SDL calculations", detail: "Statutory deductions maintained against the current tax year, including the changes that arrive mid year and break spreadsheet payrolls." },
      { name: "Email payslips", detail: "Payslips sent directly to employees rather than printed and handed out, which removes the most tedious hour of a payroll month." },
      { name: "Leave management", detail: "Leave tracked against South African statutory minimums with balances visible to employees, so the annual leave argument happens less often." },
      { name: "ACB payment files", detail: "Produces the bank payment file South African banks expect, so the salary run is a file upload rather than manual capture of every account." },
      { name: "Sage Accounting integration", detail: "Posts the payroll journal straight into Sage Accounting, removing the monthly manual journal and the mistakes that come with re keying it." },
    ],
    pricingView:
      "From R97 a month including VAT for one to two employees, banded upwards through roughly fifteen steps to two hundred plus employees. A thirty day free trial with a demonstration company is offered and no card is required. The thing to model is the band step. Hiring one person can move you into the next band and raise the monthly fee, so check where the thresholds fall relative to your hiring plan rather than only looking at the entry price.",
    finalView:
      "A straightforward and fairly priced payroll for a small South African employer, and unusually good value for a bookkeeping practice thanks to the unlimited company allowance.",
  },

  "sage-pastel-payroll": {
    implementation:
      "Desktop installation with an annual update cycle that has to be planned around the tax year. Migration is normally done by a partner and includes employee masterfile, year to date figures and leave. The critical scheduling point is that you do not want to migrate mid tax year unless you have to.",
    support:
      "First year support is typically bundled, then it follows the renewal. The deeper safety net is the size of the trained administrator pool, which means cover during leave and a replacement who already knows the product if your payroll person resigns. That is a real operational benefit.",
    scores: [
      { name: "Everyday use", value: 7.6, note: "Functional rather than pleasant, and administrators are trained on it." },
      { name: "Depth of features", value: 8.4, note: "Statutory depth with optional HR and self service modules." },
      { name: "Value for money", value: 7.5, note: "Annual licence with no public price and a renewal to negotiate." },
      { name: "Support and skills", value: 9.0, note: "A very large pool of trained South African payroll administrators." },
      { name: "South African fit", value: 9.5, note: "The annual tax update and IRP5 season are why it persists." },
    ],
    overview: [
      "Sage Pastel Payroll is the desktop payroll that a very large number of South African payroll administrators trained on, and it remains a serious compliance tool. Its reputation rests on one thing above all. Every year the tax rules change, Sage ships the update, and the submission season works.",
      "That reliability is worth more than it sounds in a country where the payroll rules move annually and the penalties for getting them wrong land on the employer. The product is not exciting and does not try to be. It is a compliance engine with a long track record.",
    ],
    capabilities: [
      { name: "Statutory PAYE, UIF and SDL", detail: "Calculations maintained through the annual update cycle, with mid year adjustments handled rather than left for the administrator to work out." },
      { name: "IRP5 and IT3(a) generation", detail: "Produces the certificates in the format required for reconciliation season, which is the single busiest week in a payroll administrator year." },
      { name: "Bulk payslip email", detail: "Sends payslips to the whole payroll in one action with password protection, replacing the printing and folding that used to consume a full day." },
      { name: "Leave and loan tracking", detail: "Employee loans, garnishee orders and leave balances tracked against the payroll rather than in a side spreadsheet that nobody reconciles." },
      { name: "Sage Pastel Partner integration", detail: "Posts the payroll journal into Pastel accounting directly, keeping the ledger and the payroll in agreement without manual capture." },
    ],
    pricingView:
      "No public price. It is sold through Sage business partners as an annual licence banded by employee count, usually with the first year of telephone and email support included. The questions that matter are what the renewal costs in year two, whether the annual tax update is part of the renewal or a separate charge, and what happens to your licence if you skip a year of cover. Get those answers before you buy, not at renewal.",
    finalView:
      "A dependable compliance tool for employers who want payroll on their own server and value a product their administrator already knows. New employers with no Pastel history should look at cloud payroll first.",
  },

  "sage-300-people": {
    implementation:
      "A project with a consultant, a scope and a timeline measured in months for a large employer. Earning and deduction definitions, bargaining council rules, approval workflow and organisational structure are all configured to your business. Insist on a written statement of work, a named consultant and a parallel run before cutover.",
    support:
      "Support comes through the implementation partner and Sage professional services. Because the configuration is specific to you, the person who built it is the person who can fix it, so continuity of consultant matters more here than with a packaged product. Get that continuity addressed in the contract.",
    scores: [
      { name: "Everyday use", value: 7.4, note: "Powerful, and correspondingly heavy to learn and to administer." },
      { name: "Depth of features", value: 9.4, note: "Bargaining councils, shifts, equity reporting and workflow in one place." },
      { name: "Value for money", value: 7.2, note: "Licence plus implementation. Only sensible above roughly fifty employees." },
      { name: "Support and skills", value: 8.5, note: "Established consultant network, though good ones are booked out." },
      { name: "South African fit", value: 9.6, note: "Employment equity and council rules are core, not an add on." },
    ],
    overview: [
      "Sage 300 People is where South African employers land when small business payroll stops fitting. Bargaining council rules, shift allowances, multiple legal entities, employment equity reporting and real approval workflow are the requirements that push a company here, and they are requirements a small payroll simply cannot meet.",
      "It combines payroll and human resources on one employee record, which removes the reconciliation problem that appears whenever HR and payroll run separately. The price of that is an implementation. This is a project with a consultant, a scope and a timeline, not a subscription you switch on.",
    ],
    capabilities: [
      { name: "Complex earnings and deductions", detail: "Handles shift differentials, bargaining council contributions, allowances and the layered deduction rules that defeat simpler payrolls." },
      { name: "Employment equity reporting", detail: "Produces the reporting South African employers are obliged to file, built into the employee record rather than assembled from exports each year." },
      { name: "Employee self service", detail: "Staff manage leave, payslips and personal details themselves, with proper approval routing rather than email requests to the payroll office." },
      { name: "Workflow approvals", detail: "Configurable approval chains for leave, changes and terminations, which is what turns payroll from a personal process into a controlled one." },
      { name: "Multi company and multi currency payroll", detail: "Several entities in one system with consolidated reporting, so a group sees the whole picture without combining spreadsheets." },
    ],
    pricingView:
      "Quoted per project. The licence is scoped by module and headcount, and the implementation is quoted separately. The licence is rarely the expensive part. Insist on a written statement of work that names the consultant, lists the modules, states the data migration approach and gives a go live date. Ask what the annual support cost will be in year two, because that is the number you will pay for a long time.",
    finalView:
      "The right answer for a medium or large South African employer with genuinely complex pay structures. Substantial overkill for an employer under about fifty people, who should stay on cloud payroll.",
  },

  "sage-hr": {
    implementation:
      "Quick for leave, longer for the rest. Importing employees and configuring leave policies takes a day. Performance cycles and shift scheduling take longer because they encode how you actually manage people, which usually needs a decision rather than a setting. The integration to your payroll should be tested before you rely on it.",
    support:
      "Online support and documentation, at a global rather than local level. There is no South African payroll behind it, so questions about PAYE go to whichever payroll you run alongside. That split is worth understanding before you buy, because it decides who you call when leave and pay disagree.",
    scores: [
      { name: "Everyday use", value: 8.6, note: "Self service that staff actually open, which is the point of an HR tool." },
      { name: "Depth of features", value: 7.8, note: "Good for leave and reviews, lighter than a full HR information system." },
      { name: "Value for money", value: 7.4, note: "Per employee, per module. Switching several on multiplies the bill." },
      { name: "Support and skills", value: 8.0, note: "Sage channel support, though it is a global rather than local product." },
      { name: "South African fit", value: 7.2, note: "Not a South African payroll engine, so you still need one alongside." },
    ],
    overview: [
      "Sage HR handles the people admin that payroll does not. Leave, employee records, documents, performance reviews and shift scheduling live here, with a self service app that staff will actually open. It is modular, so you can start with leave and add the rest later.",
      "The important point for South African buyers is what it is not. Sage HR is not a South African payroll engine. It does not calculate PAYE. You will run it alongside Sage Payroll, SimplePay or a bureau, and the quality of that pairing determines whether it saves time or creates a second place to update the same information.",
    ],
    capabilities: [
      { name: "Leave management", detail: "Requests, approvals and balances with a shared calendar, which ends the recurring argument about who is off and how many days remain." },
      { name: "Employee database and documents", detail: "Contracts, identity documents and qualifications stored against the employee record with expiry reminders, which helps considerably at audit time." },
      { name: "Performance reviews", detail: "Structured review cycles with goals and feedback, aimed at businesses running their first formal performance process rather than at large enterprises." },
      { name: "Shift scheduling", detail: "Rosters and shift planning for teams that are not desk based, with the schedule visible to staff on their phones." },
      { name: "Expense claims", detail: "Claims submitted with a photograph of the slip and routed for approval, replacing the envelope of receipts that arrives at month end." },
    ],
    pricingView:
      "Priced per employee per month, with leave, performance and scheduling licensed as separate modules. A free trial is offered but the length is not published. Two things drive the real cost. Switching on several modules multiplies the per employee rate, and the per employee model means the bill grows with hiring. Price the module combination you will run in a year, and confirm exactly how leave balances reach your payroll before you buy.",
    finalView:
      "A tidy HR layer for a growing team that has outgrown leave spreadsheets. Only worth buying if the integration with your actual payroll is clean, so test that before committing.",
  },

  "sage-evolution": {
    implementation:
      "A partner led implementation of several weeks or more depending on modules. Inventory structure, pricing matrices and branch configuration are the substantial decisions. Data migration from Pastel is common and well trodden, which lowers the risk if you are moving up from that product rather than arriving from elsewhere.",
    support:
      "Partner led, and the partner is the whole experience. The local ecosystem is deep, so help is available, but quality varies widely between resellers. Take references in your own industry, ask what the annual cover costs in year two, and confirm who supports the customisations they sell you.",
    scores: [
      { name: "Everyday use", value: 7.6, note: "Mid market ERP. Competent rather than delightful, and it needs training." },
      { name: "Depth of features", value: 8.8, note: "Strong inventory, pricing matrices and light manufacturing." },
      { name: "Value for money", value: 7.5, note: "Quoted through a partner, and customisation raises the long term cost." },
      { name: "Support and skills", value: 8.8, note: "One of the deepest partner ecosystems in South African mid market ERP." },
      { name: "South African fit", value: 8.4, note: "Widely implemented locally with sector specific add ons available." },
    ],
    overview: [
      "Sage 200 Evolution occupies the space between small business accounting and full ERP, and in South Africa it is genuinely common in distribution and light manufacturing. Inventory control, pricing matrices, multi branch operation and manufacturing modules go well beyond what a cloud ledger offers.",
      "The variable that decides your outcome is the implementation partner, not the software. The same product delivered by two different partners produces two very different experiences. The local partner ecosystem is deep, which is an advantage, but it also means quality varies and you have to do the diligence yourself.",
    ],
    capabilities: [
      { name: "Inventory and warehouse management", detail: "Multi warehouse stock with serial and lot tracking, bin locations and stock takes, which is the core reason distributors move here from Pastel." },
      { name: "Advanced pricing and discount matrices", detail: "Customer specific pricing, volume breaks and promotions handled by rules rather than by a sales clerk remembering what each customer pays." },
      { name: "Manufacturing and bill of materials", detail: "Multi level bills of material with work orders and production costing, enough for light manufacturing without a dedicated manufacturing ERP." },
      { name: "Multi branch and multi currency", detail: "Several branches and currencies in one system with consolidated reporting, which suits groups that grew by opening locations." },
      { name: "Business intelligence reporting", detail: "Reporting built for finance rather than for developers, with the drill down that makes a monthly management pack defensible." },
    ],
    pricingView:
      "Quoted by a Sage business partner. The quote combines licence, modules, implementation, data migration and annual cover, and those components are worth separating before you compare anything. Ask for three reference customers in your own industry and phone all three. Ask specifically about the annual cover cost in year two and about what customisation you are being sold, because heavy customisation is what makes later upgrades painful and expensive.",
    finalView:
      "A sound mid market choice for South African distributors and light manufacturers. Choose the partner at least as carefully as the software, because the partner determines the result.",
  },

  "palladium-accounting": {
    implementation:
      "Faster than an ERP and slower than a cloud ledger. Installation is on premise or hosted, and the setup work is mostly inventory structure and pricing. Importers should give the landed cost configuration proper attention during setup, because that is the feature they are buying and it needs the freight and duty accounts defined correctly.",
    support:
      "Vendor and partner support, with a smaller community than Sage. The upside is direct access to a local vendor. The downside is that fewer external bookkeepers already know the product, so cover during leave and succession planning need thought. Ask what support the licence includes before renewal, not after.",
    scores: [
      { name: "Everyday use", value: 7.4, note: "Functional interface. It prioritises capability over polish." },
      { name: "Depth of features", value: 8.8, note: "Landed costing, bills of material and multi warehouse at a low price." },
      { name: "Value for money", value: 8.6, note: "Published tiers, and the per user rate falls as you add licences." },
      { name: "Support and skills", value: 6.8, note: "A much smaller pool of bookkeepers who already know it." },
      { name: "South African fit", value: 8.6, note: "Built locally, and landed cost handling matters to South African importers." },
    ],
    overview: [
      "Palladium is South African built accounting software with considerably more inventory and manufacturing depth than its price suggests. Multi warehouse stock, bills of material, landed costing and point of sale are all present in a package that sits well below ERP pricing.",
      "It is also one of the very few vendors in this part of the market that publishes a rate card at all, which is worth acknowledging. In a segment where almost everything is quoted privately through resellers, being able to see tier pricing before you speak to anyone is a real advantage when comparing options.",
    ],
    capabilities: [
      { name: "Multi warehouse inventory", detail: "Stock across several locations with transfers and bin control, at a price point where competitors usually offer a single stock location." },
      { name: "Bill of materials and manufacturing", detail: "Assemblies and production with component costing, suitable for a business that builds or packs product rather than only reselling it." },
      { name: "Point of sale", detail: "Retail point of sale connected to the same inventory as the back office, so counter sales and stock stay in agreement without a nightly import." },
      { name: "Multi currency and multi company", detail: "Foreign currency purchasing with gain and loss handling, and several companies in one installation for groups." },
      { name: "Landed cost tracking", detail: "Freight, duty and clearing costs allocated across an imported shipment so true unit cost is known. Genuinely important for South African importers." },
    ],
    pricingView:
      "Published tiered pricing, which is unusual here. As an example, eight Enterprise licences land in tier two at R7 139 excluding VAT per user to buy outright, or R4 049 excluding VAT per user per year on subscription. The rate per user falls as you buy more, so the tier your headcount lands in matters more than the headline. A demonstration mode is available for testing and training without purchase. Confirm your tier before budgeting.",
    finalView:
      "Strong value for a South African importer, distributor or small manufacturer, particularly given the landed cost handling. The smaller bookkeeping community around it is the main practical drawback.",
  },

  "omni-accounts": {
    implementation:
      "Module dependent, which is the whole model. A basic trading setup is quick. Adding manufacturing or point of sale later is a further configuration exercise. The practical advice is to scope every module you expect to need within two years at the outset, so the structure is built once rather than repeatedly.",
    support:
      "Local support during local hours from a Durban team, and its customers rate it highly. That is the main reason South African wholesalers choose it over a larger competitor. Confirm the support hours and the escalation path in writing, because the value here is availability rather than scale.",
    scores: [
      { name: "Everyday use", value: 7.2, note: "Serviceable, and clearly designed by people who know trading businesses." },
      { name: "Depth of features", value: 8.2, note: "Stock, point of sale and manufacturing available as modules." },
      { name: "Value for money", value: 7.6, note: "Modular pricing makes the total genuinely hard to work out in advance." },
      { name: "Support and skills", value: 7.6, note: "Local team on local hours, which its customers rate highly." },
      { name: "South African fit", value: 8.6, note: "A Durban vendor building for South African wholesale and retail." },
    ],
    overview: [
      "Omni Accounts is built in Durban and sold in modular bundles that run from a basic trading package up to a full business system. The design intent is that you switch capability on as the business needs it rather than paying for an edition full of features you will never open.",
      "It has a loyal following among South African wholesalers and retailers, and the reason usually given is support. Being able to phone a local team during local business hours, and reach someone who understands the product, matters a great deal when trading has stopped and stock will not post.",
    ],
    capabilities: [
      { name: "Inventory and stock control", detail: "Serious stock handling with multiple pricing levels and stock takes, aimed at traders who live or die by whether the stock figure is right." },
      { name: "Point of sale", detail: "Counter sales tied to the same stock and debtors as the back office, so a retail floor and an accounts office see the same numbers." },
      { name: "Debtors and creditors", detail: "Full customer and supplier ledgers with ageing and statements, including the credit control tools a trading business needs to get paid." },
      { name: "Manufacturing module", detail: "Assembly and production for businesses that build or pack, available as an additional module rather than bundled into a higher edition." },
      { name: "Customer relationship module", detail: "Basic contact and opportunity tracking inside the accounting system, which avoids a separate CRM for smaller sales teams." },
    ],
    pricingView:
      "No public rate card. Omni is quoted by module bundle, from the entry trading package through to the full business system, and third party sites quoting dollar figures should not be trusted for South African pricing. The modular model makes total cost genuinely hard to estimate without a quote, so ask for a written breakdown listing every module you need at go live and the ones you expect to add within two years.",
    finalView:
      "Worth a look for a South African trading business that values a local vendor and local support hours. Get the module list priced properly, because the bundle structure is where the cost hides.",
  },

  caseware: {
    implementation:
      "Practice software, so the implementation is a firm wide decision. Templates are installed, the trial balance import is mapped to your ledgers, and reviewers are trained on the file structure. Expect a learning curve for a new reviewer and plan the rollout around your busy season rather than through it.",
    support:
      "CaseWare Africa provides support and structured training, and the annual template update is the critical dependency. Confirm what the update costs and when it ships, because a compilation season without the current templates is not a workable position for a practice.",
    scores: [
      { name: "Everyday use", value: 7.8, note: "There is a real learning curve before a new reviewer is productive." },
      { name: "Depth of features", value: 9.2, note: "Working papers, consolidations and assurance methodology in one file." },
      { name: "Value for money", value: 8.2, note: "Only makes sense measured per set of statements produced, and then it does." },
      { name: "Support and skills", value: 8.8, note: "Widely known in local practices, with structured training available." },
      { name: "South African fit", value: 9.6, note: "Templates maintained against local reporting frameworks." },
    ],
    overview: [
      "CaseWare Working Papers is the engine most South African accounting practices use to turn a trial balance into a signed set of annual financial statements. It is practice software rather than business software, and it is close to a standard in this market.",
      "The value is concentrated in the templates. CaseWare Africa maintains financial statement templates against local reporting frameworks, so a compilation becomes a review exercise rather than a formatting exercise. At volume that saves an enormous amount of senior time, which is the only reason the licence makes sense.",
    ],
    capabilities: [
      { name: "Working papers and review notes", detail: "A structured file with review notes, sign off and a proper audit trail, which is what makes a file defensible when it is inspected." },
      { name: "Annual financial statement templates", detail: "Statement templates maintained against local reporting frameworks and updated as those frameworks change, which is the core of the value." },
      { name: "Trial balance import from local ledgers", detail: "Imports directly from the ledgers South African practices actually encounter, including Pastel and the cloud products, without manual capture." },
      { name: "Consolidations", detail: "Group consolidation with elimination entries handled inside the file rather than in a spreadsheet that nobody can review properly." },
      { name: "Audit and assurance modules", detail: "Methodology aligned working papers for practices doing assurance work, sold alongside the compilation product." },
    ],
    pricingView:
      "Quoted per user per year by CaseWare Africa, with practice licensing scaled to the size of the firm. The only sensible way to judge it is cost per set of annual financial statements produced. Work that out on your actual annual volume rather than on the licence figure. Also confirm what the annual template update costs and whether it is included, because the templates are the reason you are buying.",
    finalView:
      "Effectively unavoidable for a South African accounting practice producing statements at volume, and mostly deservedly so. It makes no sense at all for a single business keeping its own books.",
  },

  syspro: {
    implementation:
      "A serious multi month ERP project. Scoping, data migration, process design, testing and training all sit inside it, and internal time is as large a cost as consulting fees. Insist on a phased plan with defined go live stages rather than a single large cutover, and resist customisation that you cannot justify in writing.",
    support:
      "Local offices and senior local support, which is the differentiator against imported ERP. When a production line is waiting, being able to escalate to somebody in the same time zone is the difference between an afternoon and a week. Confirm the maintenance percentage and what it entitles you to.",
    scores: [
      { name: "Everyday use", value: 7.6, note: "Serious ERP. Expect training and a change management effort." },
      { name: "Depth of features", value: 9.4, note: "Manufacturing planning, traceability and scheduling that rivals do not match." },
      { name: "Value for money", value: 7.8, note: "Quoted per implementation. Real cost only appears after scoping." },
      { name: "Support and skills", value: 8.8, note: "Local head office and senior support in your own time zone." },
      { name: "South African fit", value: 9.2, note: "Founded here and still substantially operated here." },
    ],
    overview: [
      "SYSPRO was founded in South Africa and still runs a substantial local operation, which is the first thing to understand about it. For a manufacturer, having senior support in your own time zone when a production line is waiting is not a soft benefit. It is the difference between an afternoon and a week.",
      "The product itself is a manufacturing and distribution ERP with genuine depth. Material requirements planning, shop floor control, lot traceability and factory scheduling go well beyond general purpose ERP, and it is deliberately narrow. If you are not making or moving physical goods, this is the wrong product.",
    ],
    capabilities: [
      { name: "Material requirements planning", detail: "Demand driven planning across bills of material and lead times, which is the function that stops a factory running out mid production." },
      { name: "Shop floor and work order control", detail: "Work orders tracked through operations with labour and machine time captured, so production cost is known rather than estimated at month end." },
      { name: "Lot traceability and serial tracking", detail: "Full forward and backward traceability, a regulatory requirement in food and pharmaceutical manufacturing rather than a nice extra." },
      { name: "Warehouse and distribution management", detail: "Bin level control, picking strategies and dispatch, aimed at operations where warehouse efficiency is a real cost line." },
      { name: "Costing and factory scheduling", detail: "Standard and actual costing with finite capacity scheduling, so a promised delivery date is based on capacity rather than optimism." },
    ],
    pricingView:
      "Quoted after a scoping exercise. Licence, implementation, data migration and annual maintenance are separate components and should be separated in the quote. Budget realistically for internal time as well as consulting fees, because an ERP implementation consumes a great deal of your own people. Ask for a phased plan with defined go live stages rather than a single large cutover, and get the annual maintenance percentage in writing.",
    finalView:
      "A serious and well supported choice for South African manufacturers and distributors, with local senior support as its clearest advantage. Not a general purpose business system and it does not pretend to be.",
  },

  "sap-business-one": {
    implementation:
      "Partner delivered, and the timeline depends entirely on scope and on which add ons are included. Group implementations often follow a template from the parent company, which shortens the project considerably. Where there is no template, treat it as a full ERP implementation with the budget that implies.",
    support:
      "Support runs through the partner with SAP maintenance behind it. The partner network is large and quality varies, so choose with the same rigour as the software. Get the annual maintenance percentage in writing along with what happens to it at renewal, because that figure recurs for as long as you own the system.",
    scores: [
      { name: "Everyday use", value: 7.4, note: "Structured and controlled, which also means heavier day to day." },
      { name: "Depth of features", value: 8.8, note: "Broad, though add ons are often needed to complete the picture." },
      { name: "Value for money", value: 7.2, note: "Licence, maintenance and partner implementation, with add ons on top." },
      { name: "Support and skills", value: 8.4, note: "Large partner network, but quality varies considerably between them." },
      { name: "South African fit", value: 7.6, note: "Localised and available, though chosen for group alignment not local fit." },
    ],
    overview: [
      "SAP Business One is SAP packaged for smaller companies, and in South Africa it is almost always chosen for a structural reason rather than a functional one. A parent company reports in SAP, or a group wants consistent reporting across subsidiaries, and Business One is how a smaller entity joins that picture.",
      "Judged purely on features against local mid market products it is heavier and usually more expensive. Judged on group reporting alignment and on the discipline of the financial controls, it can be the correct answer. Everything is delivered through a partner, so the partner choice carries as much weight as the software choice.",
    ],
    capabilities: [
      { name: "Financial management and consolidation", detail: "Multi entity accounting with intercompany handling and consolidation, which is the main reason a group brings a subsidiary onto it." },
      { name: "Inventory and distribution", detail: "Stock, purchasing and sales with the audit trail and approval controls a group internal audit function expects to find." },
      { name: "Production planning", detail: "Bills of material and production orders for light manufacturing, with heavier requirements usually met by a partner add on." },
      { name: "Service management", detail: "Service contracts, call handling and warranty tracking, which suits businesses that sell equipment and then maintain it." },
      { name: "Analytics and reporting", detail: "Reporting aligned to the wider SAP reporting language, which is precisely what makes group consolidation straightforward." },
    ],
    pricingView:
      "Quoted through an SAP partner, comprising licence, annual maintenance and implementation. Add on products are common and frequently necessary to complete the picture, so ask what is being included beyond the base licence. Get the annual maintenance percentage stated in writing, confirm what happens to that figure at renewal, and treat the partner selection with the same rigour as the software selection.",
    finalView:
      "The right call when group alignment with SAP genuinely matters. If it does not, local mid market ERP will usually give a South African business more for less.",
  },

  skynamo: {
    implementation:
      "Quick by field sales standards. Representatives are set up with the customer list and the price file, and the integration to your ledger or ERP is the substantive piece of work. Pilot with one route before rolling out, because the value depends on representatives using it at every visit rather than on the configuration.",
    support:
      "Local support and onboarding, which matters when your users are in cars rather than at desks and cannot troubleshoot for themselves. Ask what training is included for new representatives, because sales teams turn over and the product only works if the next person is trained properly.",
    scores: [
      { name: "Everyday use", value: 8.8, note: "Built for a representative in a car, not for an office CRM user." },
      { name: "Depth of features", value: 7.4, note: "Deliberately narrow. It is field sales, not a general purpose CRM." },
      { name: "Value for money", value: 7.8, note: "Per user and quoted privately. Judge it on orders captured per day." },
      { name: "Support and skills", value: 8.2, note: "Local onboarding and local support." },
      { name: "South African fit", value: 9.4, note: "Offline working is designed around South African coverage realities." },
    ],
    overview: [
      "Skynamo is South African built software for sales representatives who sell in person. Route planning, in field order capture, visit history and live visibility for the sales manager are the whole product, and it is deliberately narrow.",
      "The design decision that matters is offline working. A representative driving a route through areas with unreliable coverage still has to capture the order, and Skynamo assumes that will happen rather than treating it as an edge case. That single assumption is why it beats a general purpose CRM for field teams and why it is a poor fit for anyone selling from a desk.",
    ],
    capabilities: [
      { name: "Field order capture", detail: "Representatives take orders on a tablet at the customer, with current pricing and stock, so the order reaches the office without a phone call or a paper form." },
      { name: "Route and visit planning", detail: "Plans which customers to see and in what order, which lifts the number of productive calls a representative makes in a day." },
      { name: "Offline mobile working", detail: "Captures orders and visit notes without signal and syncs when coverage returns. This is the feature that makes it work on South African routes." },
      { name: "Customer visit history", detail: "Every visit, order and note against the customer record, so a new representative taking over a route is not starting blind." },
      { name: "Accounting and ERP integration", detail: "Pushes orders into the ledger or ERP so invoicing follows automatically instead of being re captured by an administrator." },
    ],
    pricingView:
      "Priced per user per month and quoted after a demonstration. There is no public rate card. The number worth calculating is not the subscription but the change in orders captured per representative per day, because that is where the product either pays for itself quickly or does not pay at all. Ask for reference customers with field teams of a similar size and ask them that question directly.",
    finalView:
      "An excellent fit for a South African field sales team taking orders on the road, and clearly built by people who understand that market. If your selling happens over email and video calls, a conventional CRM will cost less and serve you better.",
  },
  ikhokha: {
    implementation:
      "There is no implementation in the software sense. You choose a machine, create an account in the app, upload your business documents for FICA verification and connect a bank account. Delivery is three to four working days anywhere in the country and the machine works out of the box. The only decision worth thinking about beforehand is which machine, and that turns on whether you need to hand a customer a printed slip. If you do, the iK Flyer with its built in printer is the one. If digital receipts are acceptable, the Flyer Lite is half the price. Tap on Phone needs nothing at all beyond a compatible Android handset, which makes it a sensible way to test whether card acceptance changes your takings before spending anything.",
    support:
      "Support runs 24 hours a day, on the phone and on WhatsApp, and that is genuinely unusual at this end of the market. A trader whose machine stops working at seven on a Friday evening is losing money by the hour, and being able to reach a person then is worth more than most features. Hardware is covered by a 30 day money back guarantee, so a machine that turns out to be wrong for your counter can go back. Because you own the machine rather than renting it, a failure outside that window is a replacement you pay for, which is the trade you accept for having no monthly rental.",
    scores: [
      { name: "Everyday use", value: 8.8, note: "The app is clear and a machine is trading within days of ordering." },
      { name: "Depth of features", value: 7.8, note: "Payments, invoices, pay links and vouchers, but no stock or table management." },
      { name: "Value for money", value: 8.4, note: "No monthly rental at all, though the entry rate is higher than the cheapest rival." },
      { name: "Support and skills", value: 9.0, note: "24 hour phone and WhatsApp support, which almost nobody else offers here." },
      { name: "South African fit", value: 9.6, note: "Built in Durban, FICA in the app, settlement timed around local banks." },
    ],
    overview: [
      "iKhokha sells card acceptance to South African businesses that a bank acquirer would not have taken on, and it competes on two things rather than on features. The first is that you never pay a monthly rental. The second is that the hardware is cheap enough to buy outright, starting at R699 for the Flyer Lite and nothing at all if you use your own phone with iK Tap on Phone.",
      "That structure suits an uneven trading year. A market stall that is busy in December and quiet in February pays nothing in February, which is not true of a rented terminal. What you give up is the headline transaction rate, because at low volume iKhokha charges 2.75 percent excluding VAT while the closest rival starts lower. The arithmetic changes as you grow, and the rate steps down automatically without you having to renegotiate anything.",
    ],
    capabilities: [
      { name: "Card machines you own", detail: "The iK Flyer Lite is R699 and the iK Flyer with a built in printer is R1 499, both bought outright. There is no rental on either, so a quiet month costs nothing." },
      { name: "iK Tap on Phone", detail: "Turns a compatible Android phone into the terminal at no cost, which is the cheapest way in this market to find out whether accepting cards changes your takings." },
      { name: "Rates that step down", detail: "In person local cards run at 2.75 percent excluding VAT up to R40 000 a month, then 2.65, 2.55 and 2.5 percent as turnover rises, with custom rates above R100 000." },
      { name: "Settlement timed to your bank", detail: "FNB and Absa customers are paid the next business day. Nedbank customers and iK debit card holders are paid twice a day, same day, which is a real cash flow difference." },
      { name: "Invoices, pay links and vouchers", detail: "Send an invoice or a payment link from the app, record cash sales, and sell prepaid airtime and gaming vouchers, which for many small shops is a second income line." },
    ],
    pricingView:
      "The monthly figure is zero, and that is the point. You buy a machine once, from R699, or you use your phone for nothing, and after that you only pay when money moves. Optional unlimited data on the machine is R75 a month if you want the machine to have its own connection. The real cost is the transaction rate, which starts at 2.75 percent excluding VAT and only reaches 2.5 percent once you turn over R80 000 in a month. Model that against your actual card turnover before choosing, because at low volume a rival with a lower entry rate can cost you less overall even though iKhokha looks cheaper on the sticker. Above R100 000 a month ask for the custom rate, and hold them to the promise to match or beat a competitor quote.",
    finalView:
      "The right answer for a small South African trader with uneven months, who wants no fixed cost and a person on the phone at night. If your card turnover is steady and substantial, compare the blended rate against the alternatives before you commit, because the rate rather than the rental is where the money goes.",
  },
  snapscan: {
    implementation:
      "Signing up is free and done online, after which you print the QR code and put it on the counter. There is nothing to install and nothing to configure for the simplest use. Where implementation does exist is in the connections. SnapScan publishes integrations with a long list of point of sale systems used in South African retail and hospitality, and with billing systems including Sage Accounting, so a payment can land against the right invoice rather than needing a manual match. Setting those up is a short piece of work with your point of sale supplier rather than a project, but do it before you go live, because reconciling QR payments by hand every day is how the saving disappears.",
    support:
      "Support is local and reachable, and the merchant portal covers the day to day questions about payouts and reconciliation without needing to speak to anyone. Because there is no hardware, the failure modes are narrower than with a card machine. What goes wrong is usually a customer with no data or a payment that needs matching to an invoice, and both are handled in the portal. The thing to establish before committing is who supports the connection between SnapScan and your point of sale, because that link is usually owned by the point of sale supplier rather than by SnapScan.",
    scores: [
      { name: "Everyday use", value: 8.6, note: "A printed code on the counter is the simplest payment method to run." },
      { name: "Depth of features", value: 6.8, note: "Payment acceptance only. No card machine and no business management." },
      { name: "Value for money", value: 7.6, note: "No fixed cost at all, but 2.95 percent is dear next to a card rate." },
      { name: "Support and skills", value: 7.8, note: "Local support, and the failure modes are few because there is no hardware." },
      { name: "South African fit", value: 9.4, note: "The app is already on local phones and the integration list is local." },
    ],
    overview: [
      "SnapScan solves the part of payments that is usually hardest, which is getting the customer to use it. The app has been in circulation in South Africa for years, so a printed code on a counter needs no explaining. For a market trader, a small practice or a charity collection, that familiarity is the entire argument, and it comes with no hardware to buy and no monthly fee.",
      "The cost of that simplicity is the rate. At 2.95 percent excluding VAT on the standard tier, SnapScan is more expensive per transaction than a card machine, and it falls only as your turnover grows. It is also narrow. This is payment acceptance and nothing else, so a business that needs stock control or table management is buying that elsewhere.",
    ],
    capabilities: [
      { name: "QR payments with no hardware", detail: "The payment instrument is a printed code, so there is nothing to buy, nothing to rent and nothing to fail at the counter." },
      { name: "Online checkout", detail: "The same account covers ecommerce payments on your website, which keeps one merchant relationship and one settlement stream rather than two." },
      { name: "Local point of sale integrations", detail: "Published connections to TallOrder, Pilot POS, EasiPOS, HumbleTill, Lightspeed and others, which are systems you actually meet in South African retail." },
      { name: "Billing integrations", detail: "Full integrations with Sage Accounting and with Healthbridge and Nexion for medical practices, so a payment can settle against the right invoice." },
      { name: "Rates that fall with turnover", detail: "The standard rate is 2.95 percent excluding VAT and reduces as monthly turnover grows, with custom rates available for larger merchants." },
    ],
    pricingView:
      "There is no monthly fee and no sign up cost, so the only number that matters is the transaction rate. That starts at 2.95 percent excluding VAT and decreases as your monthly SnapScan turnover rises. Compare that honestly against a card machine, because most card rates in this market start lower even before you account for the machine paying for itself. Where SnapScan wins on cost is at low and irregular volume, since there is nothing to buy and nothing to pay in a month when you take no money. Where it loses is on steady volume, where a percentage point of difference on every sale outweighs the hardware you avoided buying.",
    finalView:
      "Excellent as a second way to be paid, and often the only one a market trader or a small practice needs. If cards are the main way your customers pay you, price a card machine properly before settling on this as the primary method.",
  },
  pipedrive: {
    implementation:
      "This is the quickest CRM on our list to get running. You define the stages of your pipeline, import contacts from a spreadsheet and connect a mailbox, and a small team can be working real deals the same afternoon. The work that matters is not technical. It is agreeing what each pipeline stage actually means and what has to be true for a deal to move, because a pipeline where everyone interprets the stages differently produces a forecast nobody trusts. Do that before you import anything. Budget a fortnight of light discipline after go live to make updating the pipeline a habit rather than a monthly scramble.",
    support:
      "Support is online, through the knowledge base and a support team reachable in the product. There is no South African partner channel of any size, so if you want somebody local to configure automation or build a reporting pack, you will be looking for an independent consultant rather than an accredited implementer. For most small sales teams that is not a problem, because the product is simple enough to administer yourself. It becomes a problem if you need a complex integration into local accounting or want somebody accountable for the setup, which is the point at which a suite with a local channel starts to look better.",
    scores: [
      { name: "Everyday use", value: 9.0, note: "The clearest pipeline in this category, and people actually keep it current." },
      { name: "Depth of features", value: 7.8, note: "Strong on sales, thin on marketing and service next to the suites." },
      { name: "Value for money", value: 8.0, note: "Fair per seat, though billed annually in dollars rather than rand." },
      { name: "Support and skills", value: 7.6, note: "Good documentation, but no local partner network to call on." },
      { name: "South African fit", value: 6.8, note: "No rand billing, no local hours and nothing that knows about VAT." },
    ],
    overview: [
      "Pipedrive does one job and does it more clearly than anything else here. It shows a sales team where every deal is and what has to happen next, in a view that a salesperson will actually keep up to date. That last part is the whole game with a CRM, because the most capable system in the world is useless if the pipeline in it is three weeks stale.",
      "The limits follow from the same focus. Marketing automation and customer service are thin next to HubSpot or Zoho, and there is no local adaptation for a South African business at all. You are billed in dollars, supported in another time zone and left to connect it to your accounting yourself. For a team that just needs sales to be visible, that is a fair trade.",
    ],
    capabilities: [
      { name: "The pipeline view", detail: "Deals sit in columns by stage and move by dragging. It sounds trivial and it is the reason people keep the data current, which no other feature can compensate for." },
      { name: "Activity tracking", detail: "Every deal carries the next scheduled action, so the question at a sales meeting becomes what is overdue rather than what is happening." },
      { name: "Workflow automation", detail: "Follow up emails, task creation and stage changes can be automated from the Growth plan upward, which is the second tier rather than the most expensive one." },
      { name: "Forecasting and reporting", detail: "Revenue forecasting and team performance reporting arrive on Premium, which is where a sales manager rather than a salesperson starts getting value." },
      { name: "AI assistant", detail: "An assistant is included on every plan, drafting follow ups and summarising deal history. Useful for the admin around selling rather than for the selling itself." },
    ],
    pricingView:
      "Pipedrive charges in United States dollars per seat, billed annually. Lite is US$14 a seat a month, which converts to about R224 at R16.00 to the dollar, and the tiers run up through Growth, Premium and Ultimate at US$24, US$49 and US$69. Two things follow from that. Your cost moves with the rand, so a weak month on the exchange rate raises your software bill without anyone deciding anything. And annual billing means the real commitment is a year, not a month, so use the fourteen day trial properly and put real deals through it before you sign. Automation on Growth is the tier most small teams end up on, which is roughly R384 a seat, and five seats there is around R23 000 a year before any exchange rate movement.",
    finalView:
      "The right choice when the problem is that nobody knows where the deals are and previous CRM attempts died of neglect. If you need marketing, service and accounting in the same suite, or you want to be billed in rand, look at Zoho before committing.",
  },
  "sage-intacct": {
    implementation:
      "This is a finance system implementation, not a signup. Expect a partner, a scoping exercise, a chart of accounts and dimension design, data migration and a parallel run over at least one close. The design work is where the value is won or lost, particularly the dimensions, because getting entity, department, project and location right at the start is what makes the reporting work later and what is painful to change afterwards. Plan for months rather than weeks, and for your own finance people to be substantially occupied during it. The organisations that do this well treat it as a chance to fix a chart of accounts that grew badly over a decade, rather than lifting the old structure across unchanged.",
    support:
      "Support comes from Sage and from the implementing partner, and in practice the partner is who you call. That makes the choice of partner the most consequential decision in the project, more than any feature comparison. Ask specifically about South African experience, because the local Intacct base is much smaller than the Pastel and Evolution base and the depth of skills reflects that. Establish before signing who answers a question at year end, what the response times are and whether the people who implement you are the people who will support you afterwards, because those are frequently different teams.",
    scores: [
      { name: "Everyday use", value: 8.2, note: "Built for a finance team, so it assumes accounting knowledge rather than hiding it." },
      { name: "Depth of features", value: 9.2, note: "Multi entity consolidation and dimensional reporting are genuinely strong." },
      { name: "Value for money", value: 7.0, note: "Quoted, and expensive enough that the business case has to be real." },
      { name: "Support and skills", value: 8.0, note: "Sage and partner support, but a thinner local skills pool than Pastel." },
      { name: "South African fit", value: 7.4, note: "Sold and supported here, though the local installed base is small." },
    ],
    overview: [
      "Sage Intacct is the product Sage points at a finance function rather than a bookkeeper. Where Sage Accounting keeps the books of one company, Intacct is built for a group that runs several entities, consolidates them every month and wants to report across dimensions such as department, project and location without inventing a new account code for every combination.",
      "That is a real problem and Intacct solves it properly. It is also a much bigger commitment than anything else in our accounting category. There is no public price, implementation is a partner project, and the South African installed base is small enough that skills are harder to find than for Pastel or Evolution. It earns its place on a shortlist when consolidation is genuinely painful, and not before.",
    ],
    capabilities: [
      { name: "Multi entity consolidation", detail: "Consolidating several companies is native rather than a monthly spreadsheet, including inter company transactions and multiple currencies. This is the main reason groups move to it." },
      { name: "Dimensional reporting", detail: "Instead of encoding department and project into the account code, transactions carry dimensions and reports slice by them. It keeps the chart of accounts small and the reporting flexible." },
      { name: "Close and control", detail: "Workflows built around the monthly close, with approvals and audit trail designed for a finance team that has to defend its numbers." },
      { name: "Accounts payable automation", detail: "Capture, approval routing and payment run management, which is where most of the manual hours in a group finance function actually sit." },
      { name: "A path within Sage", detail: "For a group already on Sage products, this is the supported route upward rather than a migration to a competitor, which matters for continuity of relationships." },
    ],
    pricingView:
      "There is no public rate card. Sage asks you to request pricing, and the quote depends on modules, the number of entities and the number of users, so two businesses of similar size can be quoted very differently. Treat the licence as the smaller half of the number. Implementation, data migration, dimension design and the time of your own finance people are the rest of it, and the partner cost is frequently comparable to the first year of subscription. Ask for the quote broken into licence, implementation and annual support separately, and ask what a second entity costs to add, because that is the number that moves as a group grows.",
    finalView:
      "The right answer for a South African group that consolidates several entities every month and has outgrown a small business ledger. For a single company with one set of books it is more system than the work requires, and Sage Accounting or Sage 200 Evolution will serve better for far less.",
  },
  "sage-x3": {
    implementation:
      "Sage X3 is implemented by a partner over months, not weeks, and the shape of the project depends heavily on how much manufacturing complexity you carry. Expect process design, data migration for items, bills of material and routings, integration to whatever sits around it, and a parallel run before you cut over. The heaviest cost is rarely the software. It is the time of the people who understand how your operation actually works, because they are the only ones who can tell the implementer what the system needs to do, and they still have their day jobs. Businesses that under budget that internal time are the ones whose go live dates move.",
    support:
      "Support runs through the Sage partner channel, so the partner relationship is the product as far as your operations team is concerned. That makes partner selection more important than the feature comparison. Ask for references from South African manufacturers or distributors in your own industry, and phone them rather than reading a case study. Ask what the project cost against the original quote and what support has been like two years in. Establish who is accountable when a production run cannot be posted, and confirm whether the consultants who implement you will still be the ones supporting you, because switching partner later is difficult and expensive.",
    scores: [
      { name: "Everyday use", value: 7.4, note: "Capable rather than comfortable. Users need training and process discipline." },
      { name: "Depth of features", value: 9.0, note: "Real manufacturing and distribution depth, well beyond the mid market Sage products." },
      { name: "Value for money", value: 7.0, note: "Quoted, and the licence is the smaller part of the true cost." },
      { name: "Support and skills", value: 8.2, note: "An established local partner channel with genuine implementation experience." },
      { name: "South African fit", value: 8.4, note: "Sage has a real presence here and the partner network knows local manufacturing." },
    ],
    overview: [
      "Sage X3 sits at the top of the Sage range and is aimed squarely at manufacturers and distributors. It puts finance, supply chain and production into one system, handles multiple companies, currencies and legislations, and is built for an operation complex enough that running stock and accounting separately has stopped working.",
      "It is not bought casually and should not be. There is no published price, implementation is measured in months and the partner doing the work has more influence on the outcome than the software does. For a South African manufacturer that has outgrown a mid market system and wants a vendor with a real local channel, it is a serious candidate. For anyone whose problem is better accounting, it is the wrong tool entirely.",
    ],
    capabilities: [
      { name: "Manufacturing", detail: "Bills of material, routings, work orders and production planning at a depth the mid market Sage products do not attempt, which is the main reason manufacturers look at it." },
      { name: "Distribution and stock", detail: "Multi warehouse stock, lot and serial traceability and replenishment logic, which matters when a recall or an expiry date has to be traced through the chain." },
      { name: "One financial and operational system", detail: "Finance and operations share the same data, so stock movements and production costs reach the ledger without a nightly reconciliation between systems." },
      { name: "Multi company and multi legislation", detail: "Several companies, currencies and tax regimes in one deployment, which suits a South African group trading into the rest of the continent." },
      { name: "Cloud or on premise", detail: "It can be run in the cloud or on your own infrastructure, which still matters to manufacturers with connectivity constraints at a plant." },
    ],
    pricingView:
      "Nothing is published. Sage asks you to request pricing and the quote comes through a business partner, covering licence, modules and implementation together. Insist on those being separated in writing, because the licence is routinely the smaller half of the first year and the implementation estimate is the number most likely to move. Ask what is included in the implementation figure and what is charged as change, because scope movement is where these projects overrun. Then add the internal cost of your own people, which no quote will contain and which is often the largest single line in the real total. A business case built only on licence cost is not a business case.",
    finalView:
      "A credible choice for a South African manufacturer or distributor that has genuinely outgrown a mid market ERP, provided you choose the partner as carefully as the software. If the underlying problem is accounting rather than production, Sage 200 Evolution will cost a fraction of this and fit better.",
  },
};
