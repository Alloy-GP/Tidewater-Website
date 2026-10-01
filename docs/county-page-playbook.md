# County / State Location-Page Playbook (HOA)

How to build or revamp a `/hoa-management/<state>/<county>` page so it's
optimized, on-brand, and factually defensible. Derived from the Claude SEO
brief (Howard County handoff) + `tidewater-master-brief-v2.2`. Howard County
(`src/pages/hoa-management/maryland/howard-county.astro`) is the reference
implementation — mirror its structure.

## Hard rules (never break)

- **URL stays `/hoa-management/…`.** Never use `/association-management/…` — the
  sitemap is wrong on that. `/association-management/*` already 301-redirects to
  `/hoa-management/*` in `vercel.json`; if a new one appears, redirect it, don't
  create a page there.
- **Never fabricate numbers.** No per-county community counts, tenure ("managing
  here since YYYY"), on-site SLAs ("< 1 hr"), median assessments, or named sample
  communities with unit/client-since figures — the Master Brief confirms none of
  these. Use only portfolio-level facts: 450+ communities across six states,
  8–12 per manager, AAMC®, family-owned since 1989, 30-min after-hours callback.
  (The older Anne Arundel page violates this — do not copy its stats.)
- **No dollar figures** in cost copy — pricing is sensitive/excluded. Use process
  language: "line-item quote, no hidden setup or transition fees."
- **Self-canonical** to the HOA URL. Never canonical to the rental page.
- **Service tiers are Full / Flex / Financial Only** (Master Brief §2A-2.1).
  Condo management is a *separate service line*, not a tier — mention it only as
  a community type, never as a fourth tier.
  - Full Service — financial + full property management, incl. HR for assoc. staff
  - Flex Service — governance, risk, maintenance coordination, contracting, full
    financials; meetings/inspections/on-site à la carte at a set hourly rate
  - Financial Only — strictly financial (budgets, reserves, collections, GAAP books)
- **Credentials must match the brief exactly.** If the brief lists none for a
  person, add none. (Kate Cornell has NO post-nominals in the brief.)

## Anti-cannibalization (one owner per query)

- HOA county page owns: `<county> hoa management`, `hoa management <county>`,
  `<city> md association management`.
- Rental county page owns the rental geo terms.
- Generic "property management <place>" terms → assign to ONE page only (lean
  rental + GBP). Never target the generic term on both.
- A single wrong-audience cross-link to the rental page is fine (disambiguation,
  not a shared-keyword target). A cross-*canonical* is not.

## Regional leadership lookup (who to feature)

Pull the lead from the Master Brief leadership section. Never invent a name,
title, territory, or credential.

| Territory | HOA lead (Master Brief) | Example counties |
|---|---|---|
| Baltimore metro + DC / Capital | **Kate Cornell** — Baltimore & DC Metro Regional Director (no post-nominals; co-leads developer-management program) | Baltimore, Baltimore City, Howard, Anne Arundel, Carroll, Harford, Montgomery, Prince George's; Washington DC |
| Delmarva (Eastern Shore + Delaware) | **Don Gentry, CMCA, AMS, PCAM** — Delmarva Regional Director | Worcester, Wicomico, Talbot, Queen Anne's, Dorchester, Caroline, Kent, Somerset; Delaware counties |
| Virginia / Pennsylvania / West Virginia | **No named lead in the brief — do not guess** | all VA/PA/WV counties |
| Any rental page | **Cody Bishop, Broker** — Director of Rental Management | — |

- **Framing (critical):** a regional director is an *oversight* role. Present them
  as "your regional director, backing the local team." NEVER promise "the same
  person at every board meeting / the same person residents email" — that
  describes a dedicated line CAM. Use: "a dedicated CAM as your day-to-day point
  of contact, backed by the regional director and support team (administration,
  client services, QA, leadership)." Only name a specific CAM if the client
  supplies one.
- **VA/PA/WV:** omit the named-manager module and use company-level framing, or
  flag "territory lead unconfirmed — confirm with client." Do not default to Kate
  or Don.
- **Disambiguation:** the "Columbia Pike" office is in **Silver Spring
  (Montgomery County)**, NOT Columbia, Howard County.
- Function leaders (not a local face): Marc Greenberg (President), Gail Windisch
  (Sr. Director of Operations; MD/DC proposals), Joe Jordan (QA), Jessica Ogle
  (Assoc. Financial Mgmt), Rick Bowling (Controller), Reesa Szikman (Collections),
  Matthew Merckel (Business Development), Stacey Schaffer (HR). Gail & Joe are both
  former CAI Chesapeake Chapter President (use for chapter-leadership proof).

## Duplicate-content hygiene (matters at scale)

- Don't re-explain statewide MD law (reserve-study cadence, §11B) on every county
  page — one sentence + link up to the Maryland hub / a blog spoke.
- Don't spawn thin town stub pages. Keep town links as in-page anchors or the hub;
  build a town page only where there's genuinely unique substance.
- Don't repeat the same town list across three sections on one page.
- Cite local-authority claims (county DILP, Historic Preservation Commission,
  SDAT, the statute) rather than asserting them, and avoid unsourced superlatives
  ("highest," "most," "exists almost nowhere") unless cited.

## Schema

LocalBusiness/Service + AreaServed + BreadcrumbList + FAQPage, self-canonical.
The `serviceSchema`/`breadcrumbSchema`/`faqSchema` helpers in `src/lib/schema.ts`
already emit this — see Howard County for the pattern.
