-- Editorial seed records provide a complete local preview.
-- Verify every product fact, score, source and date before public launch.

insert into public.authors (slug, name, role_title, short_bio, long_bio, expertise)
values
  ('nomsa-dlamini', 'Nomsa Dlamini', 'Editor', 'Writes about finance, operations and customer systems.', 'Nomsa focuses on software decisions that can be explained clearly inside a working business.', array['Accounting software','CRM','Business operations']),
  ('pieter-jacobs', 'Pieter Jacobs', 'Research editor', 'Covers payroll, implementation and operations.', 'Pieter pays close attention to the work that begins after a product is purchased.', array['Payroll','Implementation','ERP'])
on conflict (slug) do nothing;

insert into public.categories (slug, name, short_description, long_description, icon_name, sort_order, is_featured)
values
  ('accounting-finance', 'Accounting and Finance', 'Invoicing, bookkeeping, reporting and cash flow tools.', 'Accounting software for South African teams that need clear daily work and dependable reporting.', 'calculator', 1, true),
  ('payroll-hr', 'Payroll and HR', 'Payroll, leave, HR records and workforce tools.', 'Payroll and people software assessed with local requirements and support in view.', 'users', 2, true),
  ('crm-sales', 'CRM and Sales', 'Manage leads, customer relationships and sales activity.', 'Customer and sales systems for teams that need a clear, usable pipeline.', 'contact', 3, true),
  ('erp-operations', 'ERP and Operations', 'Connect finance, inventory, procurement and operations.', 'Operational systems for growing organisations with more complex work.', 'boxes', 4, true),
  ('project-management', 'Project Management', 'Plan work, coordinate teams and keep delivery visible.', 'Project tools that remove uncertainty without adding unnecessary administration.', 'clipboard', 5, true),
  ('commerce-pos', 'Commerce and Point of Sale', 'Sell online or in person, accept payments and manage stock.', 'Commerce systems for the counter, online shop and the work behind both.', 'store', 6, true),
  ('marketing-support', 'Marketing and Support', 'Reach customers, manage campaigns and deliver better service.', 'Marketing and service software that helps a team respond with context.', 'messages', 7, true)
on conflict (slug) do nothing;

insert into public.software (slug, name, vendor_name, short_description, website_url, deployment, business_sizes, pricing_model, key_features, sa_availability_notes, status, published_at)
values
  ('sage-accounting', 'Sage Accounting', 'Sage', 'Cloud accounting with a broad local ecosystem.', 'https://www.sage.com/en-za/sage-business-cloud/accounting/', array['Cloud'], array['Small business'], array['Subscription'], array['Invoicing','Banking','Reporting'], 'Available to South African businesses.', 'published', now()),
  ('xero', 'Xero', 'Xero', 'Polished cloud accounting with strong adviser collaboration.', 'https://www.xero.com/za/', array['Cloud'], array['Small business','Growing business'], array['Subscription'], array['Bank reconciliation','Invoicing','Reporting'], 'Serves South African businesses.', 'published', now()),
  ('quickbooks-online', 'QuickBooks Online', 'Intuit', 'Accessible cloud accounting and reporting.', 'https://quickbooks.intuit.com/za/', array['Cloud'], array['Small business'], array['Subscription'], array['Invoicing','Expenses','Reporting'], 'Available to South African users.', 'published', now()),
  ('zoho-books', 'Zoho Books', 'Zoho', 'Feature rich accounting inside the Zoho suite.', 'https://www.zoho.com/za/books/', array['Cloud'], array['Small business','Medium business'], array['Subscription'], array['Invoicing','Purchases','Automation'], 'Available in South Africa.', 'published', now()),
  ('simplepay', 'SimplePay', 'SimplePay', 'Focused South African cloud payroll.', 'https://www.simplepay.co.za/', array['Cloud'], array['Small employer','Medium employer'], array['Subscription'], array['Payroll','Leave','Employee access'], 'Designed for South African payroll.', 'published', now()),
  ('payspace', 'PaySpace', 'PaySpace', 'Cloud payroll and workforce management for more complex employers.', 'https://www.payspace.com/', array['Cloud'], array['Medium employer','Large employer'], array['Quote'], array['Payroll','Workflow','Analytics'], 'Originated in South Africa.', 'published', now()),
  ('hubspot-crm', 'HubSpot CRM', 'HubSpot', 'Approachable CRM with a broad customer platform.', 'https://www.hubspot.com/products/crm', array['Cloud'], array['Small business','Growing business'], array['Free entry','Subscription'], array['Contacts','Pipeline','Reporting'], 'Available to South African teams.', 'published', now()),
  ('zoho-crm', 'Zoho CRM', 'Zoho', 'Flexible CRM with useful automation and strong value.', 'https://www.zoho.com/crm/', array['Cloud'], array['Small business','Medium business'], array['Subscription'], array['Leads','Workflow','Analytics'], 'Available in South Africa.', 'published', now()),
  ('odoo', 'Odoo', 'Odoo', 'Modular business management and ERP software.', 'https://www.odoo.com/', array['Cloud'], array['Growing business','Medium business'], array['Scope dependent'], array['Accounting','Inventory','Sales'], 'Served by South African partners.', 'published', now()),
  ('business-central', 'Dynamics 365 Business Central', 'Microsoft', 'Business management for established Microsoft teams.', 'https://www.microsoft.com/en-za/dynamics-365/products/business-central', array['Cloud'], array['Medium business'], array['Licence'], array['Finance','Inventory','Projects'], 'Served by South African partners.', 'published', now()),
  ('shopify', 'Shopify', 'Shopify', 'Hosted commerce for growing online brands.', 'https://www.shopify.com/za', array['Cloud'], array['Small retailer','Growing retailer'], array['Subscription'], array['Storefront','Orders','Inventory'], 'Available to South African merchants.', 'published', now()),
  ('yoco', 'Yoco', 'Yoco', 'Local payments and point of sale for smaller merchants.', 'https://www.yoco.com/za/', array['Cloud','Payment hardware'], array['Small merchant'], array['Hardware','Transaction fees'], array['Card payments','Point of sale','Reporting'], 'Built for South African merchants.', 'published', now())
on conflict (slug) do nothing;

insert into public.software_categories (software_id, category_id, is_primary)
select s.id, c.id, true
from public.software s
join public.categories c on c.slug = case
  when s.slug in ('sage-accounting','xero','quickbooks-online','zoho-books') then 'accounting-finance'
  when s.slug in ('simplepay','payspace') then 'payroll-hr'
  when s.slug in ('hubspot-crm','zoho-crm') then 'crm-sales'
  when s.slug in ('odoo','business-central') then 'erp-operations'
  else 'commerce-pos'
end
on conflict do nothing;

insert into public.site_settings (key, value)
values
  ('brand', '{"name":"Software Select ZA","tagline":"Independent software research for South African businesses"}'::jsonb),
  ('editorial_notice', '{"demo_content_requires_verification":true}'::jsonb)
on conflict (key) do nothing;
