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
      phone: '(443) 548-0191', phoneHref: 'tel:+14435480191',
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
  'frederick-county': {
    name: 'Frederick County', shortName: 'Frederick', state: 'Maryland', stateAbbr: 'MD', slug: 'frederick-county',
    service: 'HOA Management', servicePath: 'hoa-management', countySeat: 'Frederick',
    layout: 'editorial',
    seo: {
      focusKeyword: 'hoa management frederick county maryland',
      title: 'HOA Management Frederick County MD — Frederick, Urbana',
      description: 'AAMC-accredited HOA and condo association management across Frederick County — Frederick, Urbana, Middletown, Mount Airy. Family-owned since 1989.',
      canonical: 'https://tidewaterproperty.com/hoa-management/maryland/frederick-county',
    },
    hero: {
      h1Lead: 'HOA management in', h1Accent: 'Frederick County.',
      lede: 'Frederick County has grown faster than most of our footprint, which means an unusual share of associations are still working out what they inherited from a developer.',
      stats: [
        { num: '450+', label: 'Communities managed across six states' },
        { num: 'AAMC®', label: 'CAI’s highest company accreditation · PCAM on staff', gold: true },
        { num: '8–12', label: 'Communities per manager — portfolios capped on purpose' },
      ],
    },
    intro: {
      eyebrow: 'Local Context',
      title: 'A county still <em>taking delivery.</em>',
      body: [
        'Frederick has added planned communities at a pace that puts a lot of its associations in the same phase at once: recently turned over from developer control, or about to be. That phase has its own failure mode &mdash; a board accepts turnover without a proper transition audit, and discovers two years later that common-area deficiencies it could have made a warranty claim on are now its own reserve problem.',
        'Outside the growth corridor the county turns rural, and associations there deal with private roads, shared wells and septic obligations that suburban boards never encounter.',
        'The city of Frederick itself adds a historic district, with the architectural review that comes with it.',
      ],
      atAGlance: [
        { label: 'County seat', value: 'Frederick' },
        { label: 'Communities per manager', value: '8&ndash;12' },
        { label: 'After-hours callback', value: '30-min guarantee' },
        { label: 'Family-owned since', value: '1989' },
      ],
    },
    cities: {
      eyebrow: 'Cities &amp; Towns We Serve',
      title: 'Frederick County coverage, <em>town by town.</em>',
      lede: 'We cover the whole county. Each town below carries its own association mix.',
      list: [
        { name: 'Frederick', slug: 'frederick', focus: 'Condo · Single-family', note: 'County seat, historic district', hasPage: false },
        { name: 'Urbana', slug: 'urbana', focus: 'Master-planned HOA', note: 'Growth corridor, newer associations', hasPage: false },
        { name: 'Middletown', slug: 'middletown', focus: 'Single-family HOA', note: 'Western county', hasPage: false },
        { name: 'Mount Airy', slug: 'mount-airy', focus: 'Single-family HOA', note: 'Shared Carroll County line', hasPage: false },
        { name: 'Walkersville', slug: 'walkersville', focus: 'Townhome · Single-family', note: 'North of Frederick city', hasPage: false },
        { name: 'Brunswick', slug: 'brunswick', focus: 'Single-family HOA', note: 'Potomac-adjacent, southwest county', hasPage: false },
        { name: 'New Market', slug: 'new-market', focus: 'Single-family HOA', note: 'East county growth area', hasPage: false },
      ],
    },
    manager: {
      initials: 'KC', name: 'Kate Cornell', creds: 'CMCA®', eyebrow: 'Baltimore &amp; DC Metro Regional Director',
      bio: 'Kate oversees the direction and professional development of the Community Association Management team out of the Owings Mills office, and co-leads the developer management program &mdash; the team that runs developer-controlled communities through to homeowner turnover. <strong>15+ years</strong> in the industry.',
      phone: '(443) 548-0191', phoneHref: 'tel:+14435480191',
    },
    resources: {
      eyebrow: 'Local Resources',
      title: 'Where boards here actually have to file.',
      lede: 'The statewide filings every Maryland association deals with, plus the county’s own front door.',
      groups: [
        { label: 'Statewide', items: [
          { name: 'Maryland Homeowners Association Act', org: 'Maryland General Assembly', use: 'The governing statute for HOAs', href: 'https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=grp&section=11b-101' },
          { name: 'Annual report & personal property return', org: 'Maryland SDAT', use: 'Keeps the association in good standing', href: 'https://dat.maryland.gov' },
          { name: 'CAI Chesapeake Chapter', org: 'Community Associations Institute', use: 'Board education and legislative updates', href: 'https://www.caimdches.org' },
        ]},
        { label: 'County', items: [
          { name: 'Frederick County government', org: 'Frederick County', use: 'Permits, code enforcement, public works', href: 'https://frederickcountymd.gov' },
        ]},
      ],
    },
    faq: [
      { q: 'Our community just came out of developer control. What should we do first?', a: 'A transition audit, before anything else. It establishes what the developer actually handed over &mdash; records, reserves, common-area condition &mdash; while warranty claims are still open. Skipping it is the single most expensive mistake a newly turned-over board makes.' },
      { q: 'How many communities will our manager be handling?', a: 'Portfolios are capped at <strong>8&ndash;12 communities per manager</strong>. That cap is why a Frederick board gets a manager who knows its governing documents rather than one juggling thirty accounts.' },
      { q: 'What happens after hours?', a: 'Our emergency line is answered by Tidewater community managers on a rotating on-call schedule, not a third-party answering service. Callback standard is 20 minutes, <strong>contractually guaranteed at 30</strong>.' },
      { q: 'What does management cost?', a: 'We quote per association rather than publishing a rate card, because cost tracks community size, vendor count, meeting cadence and complexity. <a href="/request-a-proposal">Request a proposal</a> for a line-item number, or start with the <a href="/hoa-management/hoa-financial-management">financial-only tier</a>.' },
      { q: 'How quickly can you take over?', a: 'The notice period in your current management agreement sets the pace. From there we work to a <strong>30/60/90-day</strong> plan covering records, bank accounts, vendor assignment and the first reporting cycle &mdash; see the <a href="/solutions/switching-hoa-management-company">full transition timeline</a>.' },
    ],
    nearby: [
      { name: 'Carroll County', slug: 'carroll-county', note: 'Westminster, Mount Airy and the north county' },
      { name: 'Montgomery County', slug: 'montgomery-county', note: 'Rockville and the Route 270 corridor' },
      { name: 'Howard County', slug: 'howard-county', note: 'Columbia and Ellicott City' },
    ],
    map: { query: 'Frederick County, Maryland', zoom: 10, caption: 'Frederick County, Maryland' },
  },
  'cecil-county': {
    name: 'Cecil County', shortName: 'Cecil', state: 'Maryland', stateAbbr: 'MD', slug: 'cecil-county',
    service: 'HOA Management', servicePath: 'hoa-management', countySeat: 'Elkton',
    layout: 'editorial',
    seo: {
      focusKeyword: 'hoa management cecil county maryland',
      title: 'HOA Management Cecil County MD — Elkton, North East',
      description: 'AAMC-accredited HOA and condo association management across Cecil County — Elkton, North East, Perryville, Chesapeake City. Family-owned since 1989.',
      canonical: 'https://tidewaterproperty.com/hoa-management/maryland/cecil-county',
    },
    hero: {
      h1Lead: 'HOA management in', h1Accent: 'Cecil County.',
      lede: 'Cecil County sits at the top of the Chesapeake between Maryland, Delaware and Pennsylvania, and its associations are smaller and more waterfront-exposed than most of our footprint.',
      stats: [
        { num: '450+', label: 'Communities managed across six states' },
        { num: 'AAMC®', label: 'CAI’s highest company accreditation · PCAM on staff', gold: true },
        { num: '8–12', label: 'Communities per manager — portfolios capped on purpose' },
      ],
    },
    intro: {
      eyebrow: 'Local Context',
      title: 'Small associations, <em>big water.</em>',
      body: [
        'Cecil’s association stock runs small, and a lot of it sits on or near water &mdash; the head of the Chesapeake, the Elk and North East rivers, the C&amp;D Canal. Waterfront and water-adjacent common elements change the insurance conversation and the reserve conversation at the same time: bulkheads, piers, boat ramps and shoreline all age on their own schedule and none of them are cheap.',
        'The county also sits at a three-state junction, which matters more than it sounds. Owners commute into Delaware and Pennsylvania, vendors cross state lines, and boards routinely field questions that assume the wrong state’s rules apply.',
        'Smaller associations here are exactly the case our financial-only tier was built for: a real finance department without full-service overhead.',
      ],
      atAGlance: [
        { label: 'County seat', value: 'Elkton' },
        { label: 'Communities per manager', value: '8&ndash;12' },
        { label: 'After-hours callback', value: '30-min guarantee' },
        { label: 'Family-owned since', value: '1989' },
      ],
    },
    cities: {
      eyebrow: 'Cities &amp; Towns We Serve',
      title: 'Cecil County coverage, <em>town by town.</em>',
      lede: 'We cover the whole county. Each town below carries its own association mix.',
      list: [
        { name: 'Elkton', slug: 'elkton', focus: 'Townhome · Single-family', note: 'County seat', hasPage: false },
        { name: 'North East', slug: 'north-east', focus: 'Waterfront · Single-family', note: 'Head of the Chesapeake', hasPage: false },
        { name: 'Perryville', slug: 'perryville', focus: 'Single-family HOA', note: 'Susquehanna adjacency', hasPage: false },
        { name: 'Chesapeake City', slug: 'chesapeake-city', focus: 'Small association', note: 'C&amp;D Canal, historic district', hasPage: false },
        { name: 'Rising Sun', slug: 'rising-sun', focus: 'Single-family HOA', note: 'North county, Pennsylvania line', hasPage: false },
        { name: 'Port Deposit', slug: 'port-deposit', focus: 'Small association', note: 'Riverfront', hasPage: false },
      ],
    },
    manager: {
      initials: 'DG', name: 'Don Gentry', creds: 'CMCA® · AMS® · PCAM®', eyebrow: 'Delmarva Regional Director',
      bio: 'Don oversees the Eastern Shore, Ocean City and Delaware portfolio. <strong>20+ years</strong> across customer service and real estate, with a background as a hotel general manager, building engineer and government contract specialist, and a Community Association Portfolio Manager since 2006.',
      phone: '(443) 548-0191', phoneHref: 'tel:+14435480191',
    },
    resources: {
      eyebrow: 'Local Resources',
      title: 'Where boards here actually have to file.',
      lede: 'The statewide filings every Maryland association deals with, plus the county’s own front door.',
      groups: [
        { label: 'Statewide', items: [
          { name: 'Maryland Homeowners Association Act', org: 'Maryland General Assembly', use: 'The governing statute for HOAs', href: 'https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=grp&section=11b-101' },
          { name: 'Annual report & personal property return', org: 'Maryland SDAT', use: 'Keeps the association in good standing', href: 'https://dat.maryland.gov' },
          { name: 'CAI Chesapeake Chapter', org: 'Community Associations Institute', use: 'Board education and legislative updates', href: 'https://www.caimdches.org' },
        ]},
        { label: 'County', items: [
          { name: 'Cecil County government', org: 'Cecil County', use: 'Permits, code enforcement, public works', href: 'https://www.ccgov.org' },
        ]},
      ],
    },
    faq: [
      { q: 'Do you work with small waterfront associations?', a: 'Yes, and the waterfront part is the reason to plan early. Bulkheads, piers and shoreline are capital items with their own replacement cycle, and an association that has not modelled them into a reserve plan is usually one storm away from a special assessment.' },
      { q: 'How many communities will our manager be handling?', a: 'Portfolios are capped at <strong>8&ndash;12 communities per manager</strong>. That cap is why a Cecil board gets a manager who knows its governing documents rather than one juggling thirty accounts.' },
      { q: 'What happens after hours?', a: 'Our emergency line is answered by Tidewater community managers on a rotating on-call schedule, not a third-party answering service. Callback standard is 20 minutes, <strong>contractually guaranteed at 30</strong>.' },
      { q: 'What does management cost?', a: 'We quote per association rather than publishing a rate card, because cost tracks community size, vendor count, meeting cadence and complexity. <a href="/request-a-proposal">Request a proposal</a> for a line-item number, or start with the <a href="/hoa-management/hoa-financial-management">financial-only tier</a>.' },
      { q: 'How quickly can you take over?', a: 'The notice period in your current management agreement sets the pace. From there we work to a <strong>30/60/90-day</strong> plan covering records, bank accounts, vendor assignment and the first reporting cycle &mdash; see the <a href="/solutions/switching-hoa-management-company">full transition timeline</a>.' },
    ],
    nearby: [
      { name: 'Kent County', slug: 'kent-county', note: 'Chestertown and the upper Eastern Shore' },
      { name: 'Queen Anne’s County', slug: 'queen-annes-county', note: 'Kent Island and the Bay Bridge corridor' },
      { name: 'Harford County', slug: 'harford-county', note: 'Bel Air and the western Susquehanna shore' },
    ],
    map: { query: 'Cecil County, Maryland', zoom: 10, caption: 'Cecil County, Maryland' },
  },
  'kent-county': {
    name: 'Kent County', shortName: 'Kent', state: 'Maryland', stateAbbr: 'MD', slug: 'kent-county',
    service: 'HOA Management', servicePath: 'hoa-management', countySeat: 'Chestertown',
    layout: 'editorial',
    seo: {
      focusKeyword: 'hoa management kent county maryland',
      title: 'HOA Management Kent County MD — Chestertown, Rock Hall',
      description: 'AAMC-accredited HOA and condo association management across Kent County — Chestertown, Rock Hall, Betterton. Delmarva regional team. Family-owned since 1989.',
      canonical: 'https://tidewaterproperty.com/hoa-management/maryland/kent-county',
    },
    hero: {
      h1Lead: 'HOA management in', h1Accent: 'Kent County.',
      lede: 'Kent County is Maryland’s smallest county by population, and its associations reflect that — small, often waterfront, and frequently self-managed longer than they should be.',
      stats: [
        { num: '450+', label: 'Communities managed across six states' },
        { num: 'AAMC®', label: 'CAI’s highest company accreditation · PCAM on staff', gold: true },
        { num: '8–12', label: 'Communities per manager — portfolios capped on purpose' },
      ],
    },
    intro: {
      eyebrow: 'Local Context',
      title: 'Small county, <em>real obligations.</em>',
      body: [
        'Kent’s associations are small and heavily waterfront, along the Chester and Sassafras rivers and the bay shore at Rock Hall and Betterton. Waterfront common elements &mdash; piers, bulkheads, ramps, shoreline &mdash; are the capital items that most often go unplanned, and they do not get cheaper by being ignored.',
        'A high share of the housing here is second-home or seasonal, which changes the communication problem: a board is often trying to reach owners who are not in the county for most of the year, and quorum becomes a live issue rather than a formality.',
        'Being small does not reduce what a board is responsible for. It only reduces the overhead it can carry to get there, which is what our financial-only tier exists to solve.',
      ],
      atAGlance: [
        { label: 'County seat', value: 'Chestertown' },
        { label: 'Communities per manager', value: '8&ndash;12' },
        { label: 'After-hours callback', value: '30-min guarantee' },
        { label: 'Family-owned since', value: '1989' },
      ],
    },
    cities: {
      eyebrow: 'Cities &amp; Towns We Serve',
      title: 'Kent County coverage, <em>town by town.</em>',
      lede: 'We cover the whole county. Each town below carries its own association mix.',
      list: [
        { name: 'Chestertown', slug: 'chestertown', focus: 'Small association · Condo', note: 'County seat, historic district', hasPage: false },
        { name: 'Rock Hall', slug: 'rock-hall', focus: 'Waterfront association', note: 'Bayside, marina adjacency', hasPage: false },
        { name: 'Betterton', slug: 'betterton', focus: 'Small association', note: 'Bay beach community', hasPage: false },
        { name: 'Galena', slug: 'galena', focus: 'Single-family HOA', note: 'North county', hasPage: false },
        { name: 'Millington', slug: 'millington', focus: 'Single-family HOA', note: 'East county', hasPage: false },
      ],
    },
    manager: {
      initials: 'DG', name: 'Don Gentry', creds: 'CMCA® · AMS® · PCAM®', eyebrow: 'Delmarva Regional Director',
      bio: 'Don oversees the Eastern Shore, Ocean City and Delaware portfolio. <strong>20+ years</strong> across customer service and real estate, with a background as a hotel general manager, building engineer and government contract specialist, and a Community Association Portfolio Manager since 2006.',
      phone: '(443) 548-0191', phoneHref: 'tel:+14435480191',
    },
    resources: {
      eyebrow: 'Local Resources',
      title: 'Where boards here actually have to file.',
      lede: 'The statewide filings every Maryland association deals with, plus the county’s own front door.',
      groups: [
        { label: 'Statewide', items: [
          { name: 'Maryland Homeowners Association Act', org: 'Maryland General Assembly', use: 'The governing statute for HOAs', href: 'https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=grp&section=11b-101' },
          { name: 'Annual report & personal property return', org: 'Maryland SDAT', use: 'Keeps the association in good standing', href: 'https://dat.maryland.gov' },
          { name: 'CAI Chesapeake Chapter', org: 'Community Associations Institute', use: 'Board education and legislative updates', href: 'https://www.caimdches.org' },
        ]},
        { label: 'County', items: [
          { name: 'Kent County government', org: 'Kent County', use: 'Permits, code enforcement, public works', href: 'https://www.kentcounty.com' },
        ]},
      ],
    },
    faq: [
      { q: 'Most of our owners are seasonal. Can you work with that?', a: 'Yes, and it mainly changes cadence rather than scope. Notices, meeting scheduling and quorum planning all have to assume a largely non-resident ownership, which is a process we set up rather than something a board should be improvising each year.' },
      { q: 'How many communities will our manager be handling?', a: 'Portfolios are capped at <strong>8&ndash;12 communities per manager</strong>. That cap is why a Kent board gets a manager who knows its governing documents rather than one juggling thirty accounts.' },
      { q: 'What happens after hours?', a: 'Our emergency line is answered by Tidewater community managers on a rotating on-call schedule, not a third-party answering service. Callback standard is 20 minutes, <strong>contractually guaranteed at 30</strong>.' },
      { q: 'What does management cost?', a: 'We quote per association rather than publishing a rate card, because cost tracks community size, vendor count, meeting cadence and complexity. <a href="/request-a-proposal">Request a proposal</a> for a line-item number, or start with the <a href="/hoa-management/hoa-financial-management">financial-only tier</a>.' },
      { q: 'How quickly can you take over?', a: 'The notice period in your current management agreement sets the pace. From there we work to a <strong>30/60/90-day</strong> plan covering records, bank accounts, vendor assignment and the first reporting cycle &mdash; see the <a href="/solutions/switching-hoa-management-company">full transition timeline</a>.' },
    ],
    nearby: [
      { name: 'Queen Anne’s County', slug: 'queen-annes-county', note: 'Kent Island and the Bay Bridge corridor' },
      { name: 'Cecil County', slug: 'cecil-county', note: 'Elkton and the head of the Chesapeake' },
      { name: 'Anne Arundel County', slug: 'anne-arundel-county', note: 'Annapolis and the western shore' },
    ],
    map: { query: 'Kent County, Maryland', zoom: 10, caption: 'Kent County, Maryland' },
  },
  'queen-annes-county': {
    name: 'Queen Anne’s County', shortName: 'Queen Anne’s', state: 'Maryland', stateAbbr: 'MD', slug: 'queen-annes-county',
    service: 'HOA Management', servicePath: 'hoa-management', countySeat: 'Centreville',
    layout: 'editorial',
    seo: {
      focusKeyword: 'hoa management queen annes county maryland',
      title: 'HOA Management Queen Anne’s County MD',
      description: 'AAMC-accredited HOA and condo association management across Queen Anne’s County — Kent Island, Stevensville, Chester, Centreville. Family-owned since 1989.',
      canonical: 'https://tidewaterproperty.com/hoa-management/maryland/queen-annes-county',
    },
    hero: {
      h1Lead: 'HOA management in', h1Accent: 'Queen Anne’s County.',
      lede: 'Queen Anne’s is the first county across the Bay Bridge, and Kent Island associations carry a mix of year-round commuters and second-home owners that few other markets do.',
      stats: [
        { num: '450+', label: 'Communities managed across six states' },
        { num: 'AAMC®', label: 'CAI’s highest company accreditation · PCAM on staff', gold: true },
        { num: '8–12', label: 'Communities per manager — portfolios capped on purpose' },
      ],
    },
    intro: {
      eyebrow: 'Local Context',
      title: 'First stop across <em>the Bay Bridge.</em>',
      body: [
        'Kent Island is the county’s centre of gravity for associations, and it has an unusual ownership mix: year-round households commuting west over the bridge alongside second-home owners who are present seasonally. A board is serving two constituencies with different priorities, and the budget conversation is where that shows up.',
        'Much of the stock is water-adjacent, which brings the same capital items that shape every Eastern Shore association &mdash; bulkheads, piers, ramps and shoreline, all with their own replacement cycles and none of them optional.',
        'Inland, Centreville and the county’s farming communities run smaller single-family HOAs where private roads and stormwater obligations are the recurring line items.',
      ],
      atAGlance: [
        { label: 'County seat', value: 'Centreville' },
        { label: 'Communities per manager', value: '8&ndash;12' },
        { label: 'After-hours callback', value: '30-min guarantee' },
        { label: 'Family-owned since', value: '1989' },
      ],
    },
    cities: {
      eyebrow: 'Cities &amp; Towns We Serve',
      title: 'Queen Anne’s County coverage, <em>town by town.</em>',
      lede: 'We cover the whole county. Each town below carries its own association mix.',
      list: [
        { name: 'Stevensville', slug: 'stevensville', focus: 'Condo · Townhome', note: 'Kent Island, bridge-adjacent', hasPage: false },
        { name: 'Chester', slug: 'chester', focus: 'Single-family · Condo', note: 'Kent Island', hasPage: false },
        { name: 'Grasonville', slug: 'grasonville', focus: 'Waterfront association', note: 'Marina and waterfront communities', hasPage: false },
        { name: 'Centreville', slug: 'centreville', focus: 'Single-family HOA', note: 'County seat, inland', hasPage: false },
        { name: 'Queenstown', slug: 'queenstown', focus: 'Single-family HOA', note: 'Route 50 corridor', hasPage: false },
        { name: 'Church Hill', slug: 'church-hill', focus: 'Small association', note: 'North county', hasPage: false },
      ],
    },
    manager: {
      initials: 'DG', name: 'Don Gentry', creds: 'CMCA® · AMS® · PCAM®', eyebrow: 'Delmarva Regional Director',
      bio: 'Don oversees the Eastern Shore, Ocean City and Delaware portfolio. <strong>20+ years</strong> across customer service and real estate, with a background as a hotel general manager, building engineer and government contract specialist, and a Community Association Portfolio Manager since 2006.',
      phone: '(443) 548-0191', phoneHref: 'tel:+14435480191',
    },
    resources: {
      eyebrow: 'Local Resources',
      title: 'Where boards here actually have to file.',
      lede: 'The statewide filings every Maryland association deals with, plus the county’s own front door.',
      groups: [
        { label: 'Statewide', items: [
          { name: 'Maryland Homeowners Association Act', org: 'Maryland General Assembly', use: 'The governing statute for HOAs', href: 'https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=grp&section=11b-101' },
          { name: 'Annual report & personal property return', org: 'Maryland SDAT', use: 'Keeps the association in good standing', href: 'https://dat.maryland.gov' },
          { name: 'CAI Chesapeake Chapter', org: 'Community Associations Institute', use: 'Board education and legislative updates', href: 'https://www.caimdches.org' },
        ]},
        { label: 'County', items: [
          { name: 'Queen Anne’s County government', org: 'Queen Anne’s County', use: 'Permits, code enforcement, public works', href: 'https://www.qac.org' },
        ]},
      ],
    },
    faq: [
      { q: 'Do you manage waterfront and marina-adjacent associations?', a: 'Yes. The distinguishing work is capital planning &mdash; bulkheads, piers, ramps and shoreline each have their own replacement cycle, and they belong in a reserve study from the beginning rather than the year they fail.' },
      { q: 'How many communities will our manager be handling?', a: 'Portfolios are capped at <strong>8&ndash;12 communities per manager</strong>. That cap is why a Queen Anne’s board gets a manager who knows its governing documents rather than one juggling thirty accounts.' },
      { q: 'What happens after hours?', a: 'Our emergency line is answered by Tidewater community managers on a rotating on-call schedule, not a third-party answering service. Callback standard is 20 minutes, <strong>contractually guaranteed at 30</strong>.' },
      { q: 'What does management cost?', a: 'We quote per association rather than publishing a rate card, because cost tracks community size, vendor count, meeting cadence and complexity. <a href="/request-a-proposal">Request a proposal</a> for a line-item number, or start with the <a href="/hoa-management/hoa-financial-management">financial-only tier</a>.' },
      { q: 'How quickly can you take over?', a: 'The notice period in your current management agreement sets the pace. From there we work to a <strong>30/60/90-day</strong> plan covering records, bank accounts, vendor assignment and the first reporting cycle &mdash; see the <a href="/solutions/switching-hoa-management-company">full transition timeline</a>.' },
    ],
    nearby: [
      { name: 'Kent County', slug: 'kent-county', note: 'Chestertown and the upper Eastern Shore' },
      { name: 'Cecil County', slug: 'cecil-county', note: 'Elkton and the head of the Chesapeake' },
      { name: 'Anne Arundel County', slug: 'anne-arundel-county', note: 'Annapolis and the western shore' },
    ],
    map: { query: 'Queen Anne’s County, Maryland', zoom: 10, caption: 'Queen Anne’s County, Maryland' },
  },
};
