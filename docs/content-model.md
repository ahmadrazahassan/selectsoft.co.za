# Content model

The publication stores structured product data separately from editorial reviews. This makes comparisons reliable and lets an editor update a changed product fact without rewriting unrelated articles.

The main records are categories, software, reviews, comparisons, articles, authors and media assets. Reviews and articles keep their long form body in Markdown. Product facts, prices, score criteria and comparison rows remain structured JSON or typed columns so editors do not have to edit source code.

Public pages read only records with a published status. Drafts and review records are available only to authenticated editorial roles. The local fixture set keeps development and automated builds stable when a Supabase project is not connected.

Every price record should contain its currency, billing period, VAT state, source and checked date. Unknown values stay empty and appear as a request to check the current vendor plan.
