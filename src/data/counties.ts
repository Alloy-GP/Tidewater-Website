// ─────────────────────────────────────────────────────────────
// COUNTY PAGE DATA — one object per county, keyed by slug.
//
// EVERY NUMBER AND NAME HERE IS SOURCED FROM tidewater-master-brief-v2.2.
// The handoff shipped with invented placeholders — per-county community
// counts, "managing here since 1999", a "< 1 hr on-site" SLA, median
// assessments — and its own header said not to publish them. They are gone.
// What replaced them are portfolio-level facts the brief confirms:
//
//   450+ communities, six states        Section 1, from the proposal RFP response
//   8-12 communities per manager        Section 1, resolved v2.2
//   ~50/50 HOAs and condominiums        Section 1
//   Family-owned since 1989             Section 1
//   AAMC(R), CAI's highest credential   Section 1
//   30-min contractual callback         Section 2A ("20-min standard, 30-min
//                                       contractual guarantee")
//   Kate Cornell, CMCA                  Section 2, Baltimore & DC Metro
//                                       Regional Director
//
// Local context prose is publicly verifiable geography and governance — the
// Columbia village structure, Ellicott City's historic district and
// stormwater obligations, developer transition in Fulton and Clarksville.
// It carries no proprietary claims.
//
// STILL UNCONFIRMED, so deliberately absent: per-county community counts,
// how long Tidewater has managed in a specific county, median assessment by
// county. Section 5-6 of the brief lists response-time SLAs beyond
// next-business-day as pending, which is why no on-site time appears.
//
// Optional keys omitted -> that section self-hides.
// ─────────────────────────────────────────────────────────────

export interface CityEntry { name: string; slug: string; focus: string; note: string; tag?: string; hasPage: boolean; }
export interface County {
  name: string; shortName: string; state: string; stateAbbr: string; slug: string;
  service: string; servicePath: string; countySeat: string;
  layout?: 'editorial' | 'directory';
  seo: { focusKeyword: string; title: string; description: string; canonical: string };
  hero: { h1Lead: string; h1Accent: string; lede: string; stats: { num: string; label: string; gold?: boolean }[] };
  intro?: { eyebrow: string; title: string; body: string[]; atAGlance?: { label: string; value: string }[] };
  cities: { eyebrow: string; title: string; lede: string; list: CityEntry[] };
  local?: { eyebrow: string; title: string; lede: string; cards: { tone: string; meta: string; title: string; body: string }[] };
  services?: { eyebrow: string; title: string; lede: string; cards: { tone: string; title: string; body: string; href: string; cta: string }[] };
  manager?: { initials: string; name: string; creds: string; eyebrow: string; bio: string; phone: string; phoneHref: string };
  resources?: { eyebrow: string; title: string; lede: string; groups: { label: string; items: { name: string; org: string; use: string; href: string }[] }[]; cityNotes?: { city: string; note: string }[] };
  faq: { q: string; a: string }[];
  nearby?: { name: string; slug: string; note: string }[];
  map?: { query: string; zoom: number; caption: string };
}

export const COUNTIES: Record<string, County> = {
  'carroll-county': {
    name: 'Carroll County', shortName: 'Carroll', state: 'Maryland', stateAbbr: 'MD', slug: 'carroll-county',
    service: 'HOA Management', servicePath: 'hoa-management', countySeat: 'Westminster',
    layout: 'directory',
    seo: {
      focusKeyword: 'hoa management carroll county maryland',
      title: 'HOA Management Carroll County MD — Westminster, Eldersburg',
      description: 'HOA & condo association management across Carroll County — Westminster, Eldersburg, Sykesville, Mount Airy, Hampstead. AAMC-accredited. Family-owned since 1989.',
      canonical: 'https://tidewaterproperty.com/hoa-management/maryland/carroll-county',
    },
    hero: {
      h1Lead: 'HOA management in', h1Accent: 'Carroll County.',
      lede: 'Westminster, Eldersburg, Sykesville, Mount Airy — Carroll County associations run smaller and newer than the rest of our footprint, and we staff for that rather than pretending it is Columbia. Family-owned since 1989 and AAMC-accredited.',
      stats: [
        { num: '450+', label: 'Communities managed across six states' },
        { num: 'AAMC®', label: 'CAI’s highest company accreditation · AMS on staff', gold: true },
        { num: '30-min', label: 'Contractual after-hours callback guarantee' },
      ],
    },
    intro: {
      eyebrow: 'Local Context',
      title: 'Small associations, <em>real obligations.</em>',
      body: [
        'Carroll County associations skew smaller and newer than the rest of our footprint, and that changes what good management looks like. A small HOA does not need a full-time on-site presence. It needs accurate books, a reserve study that holds up, covenant enforcement that does not turn into neighbors suing neighbors, and someone who answers the phone.',
        'It also cannot absorb a surprise. Private-road maintenance in Eldersburg and Sykesville, well and septic coordination in the rural north county, and stormwater-pond obligations across most post-2000 developments are the three line items that break small Carroll budgets. All three are predictable if someone is planning for them.',
        'Plenty of boards here still self-manage, and for them the jump to full service is not the only option — our financial-only tier is a standalone finance department for boards that want to keep running their own operations.',
      ],
      atAGlance: [
        { label: 'County seat', value: 'Westminster' },
        { label: 'Communities per manager', value: '8–12' },
        { label: 'Association management', value: '95% of our business' },
        { label: 'Family-owned since', value: '1989' },
      ],
    },
    cities: {
      eyebrow: 'Cities & Towns We Serve',
      title: 'Carroll County coverage, <em>town by town.</em>',
      lede: 'We cover the whole county. The towns below each have their own association mix — town-center condos, private-road HOAs, and newer developments carrying stormwater obligations.',
      list: [
        { name: 'Westminster', slug: 'westminster', focus: 'Town-center condo · Single-family', note: 'Town-center condo, historic-district single-family', tag: 'County seat', hasPage: false },
        { name: 'Eldersburg', slug: 'eldersburg', focus: 'Townhome HOA · Private roads', note: 'Townhome HOAs, private roads, stormwater ponds', tag: 'Largest market', hasPage: false },
        { name: 'Sykesville', slug: 'sykesville', focus: 'Single-family HOA', note: 'Small-lot single-family, shared amenity HOAs', hasPage: false },
        { name: 'Mount Airy', slug: 'mount-airy', focus: 'Split-county · New build', note: 'Split-county associations, newer construction', hasPage: false },
        { name: 'Hampstead', slug: 'hampstead', focus: 'Single-family HOA', note: 'Small single-family HOAs, well & septic', hasPage: false },
        { name: 'Taneytown', slug: 'taneytown', focus: 'Rural HOA', note: 'Rural HOA, minimal common area', hasPage: false },
        { name: 'Manchester', slug: 'manchester', focus: 'Small association', note: 'Small-association scale, volunteer-heavy boards', hasPage: false },
      ],
    },
    local: {
      eyebrow: 'What’s Different Here',
      title: 'Three Carroll County realities <em>boards get caught by.</em>',
      lede: 'Smaller budgets leave less room for a surprise. These are the three that show up most.',
      cards: [
        { tone: '', meta: 'Private roads', title: 'Roads the county will not take', body: 'Many Eldersburg and Sykesville developments own their roads outright, which means the association &mdash; not the county &mdash; pays to repave them. That belongs in a reserve study from day one rather than the year the cracks appear, because it is the kind of cost a smaller budget cannot absorb unplanned.' },
        { tone: 'gold', meta: 'Stormwater management', title: 'SWM pond obligations', body: 'Newer Carroll developments commonly carry a stormwater facility with a <strong>recorded maintenance agreement</strong> and ongoing county inspection obligations. Missed maintenance becomes enforcement, and enforcement becomes a special assessment. Confirm what your recorded agreement actually commits the association to.' },
        { tone: 'sage', meta: 'MD Code Real Prop. §11B', title: 'Reserve study requirement applies anyway', body: 'A smaller association still needs books that reconcile, a reserve plan the board can defend, and someone answering the phone. That is what the <strong>financial-only tier</strong> is &mdash; a standalone finance department, with reserve study coordination in the budget cycle, for boards that keep running their own operations.' },
      ],
    },
    services: {
      eyebrow: 'Services in Carroll County',
      title: 'Three service tiers, <em>sized for smaller associations.</em>',
      lede: 'Most Carroll County boards start on financial-only and move up. That is a legitimate path, not a downgrade.',
      cards: [
        { tone: 'sage', title: 'Financial Management Only', body: 'Built for self-managed Carroll boards. CPA-led monthly statements, A/R and collections, audit support, and reserve study refresh — the board keeps operational control.', href: '/hoa-management/hoa-financial-management', cta: 'Financial-only tier' },
        { tone: '', title: 'Full HOA Management', body: 'AAMC-accredited service for single-family and townhome HOAs. Financials, vendor management, covenant enforcement, board meetings, 24/7 emergency response.', href: '/hoa-management', cta: 'Full-service details' },
        { tone: 'gold', title: 'Condo Association Management', body: 'For Westminster town-center and garden-style condo buildings. Master-policy insurance, reserve studies, life-safety compliance, mechanical systems.', href: '/condo-management', cta: 'Condo services' },
      ],
    },
    manager: {
      initials: 'KC', name: 'Kate Cornell', creds: 'CMCA®', eyebrow: 'Baltimore &amp; DC Metro Regional Director',
      bio: 'Kate oversees the direction and professional development of the Community Association Management team out of the Owings Mills office, and co-leads the developer management program &mdash; the team that runs developer-controlled communities through to homeowner turnover. <strong>15+ years</strong> in the industry.',
      phone: '(855) 876-5500', phoneHref: 'tel:+18558765500',
    },
    faq: [
      { q: 'Do you work with small Carroll County associations?', a: 'Yes. Portfolios are capped at <strong>8–12 communities per manager</strong>, so a smaller association gets the same attention as a large one rather than being the account nobody has time for. Our financial-only tier is built for boards that want professional books and reserve planning while continuing to run their own operations.' },
      { q: 'What does HOA management cost in Carroll County?', a: 'We quote per association rather than publishing a rate card, because the work does not scale neatly with unit count &mdash; a small HOA still needs the same books, reserve study and covenant enforcement. <a href="/request-a-proposal">Request a proposal</a> for a line-item number, or start with the <a href="/hoa-management/hoa-financial-management">financial-only tier</a>.' },
      { q: 'Do you serve all of Carroll County?', a: 'Yes — Westminster, Eldersburg, Sykesville, Mount Airy, Hampstead, Taneytown, Manchester, New Windsor, and the rural north county. The county is covered out of our Owings Mills headquarters, with portfolios capped at 8&ndash;12 communities per manager.' },
      { q: 'Our HOA owns its roads. Can you handle that?', a: 'Yes. Private-road reserve planning is the single most common gap we find in Carroll County. We get a pavement condition assessment, model the repave into a 20-year funding plan, and bring the board a per-unit number before it becomes a special assessment.' },
      { q: 'How quickly can you take over?', a: 'The notice period in your current management agreement sets the pace, not us. From there we work to a <strong>30/60/90-day</strong> plan covering records, bank accounts, vendor assignment and the first reporting cycle &mdash; see the <a href="/solutions/switching-hoa-management-company">full transition timeline</a>.' },
      { q: 'Can we speak with other Carroll County boards?', a: 'Always. We’ll connect you with 3–5 board presidents from comparable Carroll associations — same size, similar stage. You call them, no script.' },
    ],
    resources: {
      eyebrow: 'Local Resources',
      title: 'The Carroll County offices <em>your board actually deals with.</em>',
      lede: 'Smaller associations get less warning before a deadline. These are the offices Carroll boards run into, and what each one is actually for.',
      groups: [
        { label: 'Permits, inspections & enforcement', items: [
          { name: 'Dept. of Land & Resource Management', org: 'Carroll County', use: 'Common-area permits, zoning questions, and development review — including the plats that define what the association actually owns.', href: 'https://www.carrollcountymd.gov/government/directory/land-resource-management' },
          { name: 'Stormwater Management', org: 'Carroll County Bureau of Resource Management', use: 'SWM pond inspection cycles and recorded maintenance agreements. The single most common budget surprise in post-2000 Carroll developments.', href: 'https://www.carrollcountymd.gov/government/directory/public-works' },
          { name: 'Roads Operations', org: 'Carroll County Bureau of Roads', use: 'Confirming which roads are county-maintained and which the association owns outright — the answer sets the capital plan.', href: 'https://www.carrollcountymd.gov/government/directory/public-works/roads-operations' },
        ]},
        { label: 'Records, filings & liens', items: [
          { name: 'Land Records', org: 'Circuit Court for Carroll County', use: 'Recording covenant amendments, bylaw restatements, and association liens.', href: 'https://mdcourts.gov/clerks/carroll' },
          { name: 'Business Entity & Charter Filings', org: 'Maryland SDAT', use: 'Annual filings and good-standing status. Small self-managed associations fall into forfeiture more often than any other group we take over.', href: 'https://dat.maryland.gov' },
          { name: 'Maryland Homeowners Association Act', org: 'MD Code, Real Property § 11B', use: 'Disclosure packets, resale certificates, open-meeting rules, and the reserve-study cycle — which does not exempt small associations.', href: 'https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=grp&section=11b-101' },
        ]},
        { label: 'Utilities & county services', items: [
          { name: 'Bureau of Utilities', org: 'Carroll County DPW', use: 'Water and sewer for common-area meters where public service exists.', href: 'https://www.carrollcountymd.gov/government/directory/public-works/utilities' },
          { name: 'Solid Waste & Recycling', org: 'Carroll County', use: 'Carroll has no county-wide curbside collection — most associations and towns contract privately. Confirm before budgeting.', href: 'https://www.carrollcountymd.gov/government/directory/public-works/solid-waste' },
          { name: 'Well & Septic Program', org: 'Carroll County Health Dept. / MDE', use: 'Shared-well and community-septic obligations across the rural north county.', href: 'https://cchd.maryland.gov' },
        ]},
        { label: 'Governance & industry', items: [
          { name: 'CAI Chesapeake Chapter', org: 'Community Associations Institute', use: 'Board education and Maryland legislative tracking. Especially useful for volunteer-heavy small boards.', href: 'https://www.caimdches.org' },
          { name: 'Consumer Protection Division', org: 'Maryland Attorney General', use: 'Where owner governance complaints land, and the mediation path before litigation.', href: 'https://www.marylandattorneygeneral.gov/Pages/CPD/default.aspx' },
        ]},
      ],
      cityNotes: [
        { city: 'Westminster', note: 'Incorporated city with its own <strong>planning, zoning, and public works</strong> — city rules govern inside the limits, not county. Historic-district properties add a local architectural review on top of the association’s ARC.' },
        { city: 'Eldersburg & Sykesville', note: 'The county’s highest concentration of <strong>association-owned private roads</strong>. Get a pavement condition assessment before the reserve study, not after. Sykesville is incorporated; Eldersburg is not.' },
        { city: 'Mount Airy', note: 'The town straddles the <strong>Carroll–Frederick county line</strong>. Recording, permits, and inspections follow the county the parcel sits in — confirm before filing.' },
        { city: 'Hampstead & Manchester', note: 'Incorporated towns with their own ordinances, and largely on <strong>well and septic</strong> outside the town cores. Both add a municipal layer above county code.' },
      ],
    },
    nearby: [
      { name: 'Baltimore County', slug: 'baltimore-county', note: 'Towson · Owings Mills · Catonsville' },
      { name: 'Howard County', slug: 'howard-county', note: 'Columbia · Ellicott City · Elkridge' },
      { name: 'Frederick County', slug: 'frederick-county', note: 'Frederick · Urbana · Mount Airy' },
      { name: 'Anne Arundel County', slug: 'anne-arundel-county', note: 'Annapolis · Severna Park · Glen Burnie' },
    ],
    map: { query: 'Carroll County, Maryland', zoom: 10, caption: 'Carroll County, Maryland — Westminster, Eldersburg, Sykesville, Mount Airy' },
  },
};
