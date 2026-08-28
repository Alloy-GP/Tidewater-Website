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
  'howard-county': {
    name: 'Howard County', shortName: 'Howard', state: 'Maryland', stateAbbr: 'MD', slug: 'howard-county',
    service: 'HOA Management', servicePath: 'hoa-management', countySeat: 'Ellicott City',
    layout: 'editorial',
    seo: {
      focusKeyword: 'hoa management howard county maryland',
      title: 'HOA Management Howard County MD — Columbia, Ellicott City | Tidewater',
      description: 'AAMC-accredited HOA & condo association management across Howard County — Columbia, Ellicott City, Elkridge, Fulton, Clarksville. AAMC-accredited, family-owned since 1989.',
      canonical: 'https://tidewaterproperty.com/hoa-management/maryland/howard-county',
    },
    hero: {
      h1Lead: 'HOA management in', h1Accent: 'Howard County.',
      lede: 'From Columbia’s village associations to Ellicott City’s historic-district condos to new Fulton and Clarksville developments — Howard County is four HOA markets, not one. Family-owned since 1989, AAMC-accredited, and capped at 8–12 communities per manager so yours is known rather than numbered.',
      stats: [
        { num: '450+', label: 'Communities managed across six states' },
        { num: 'AAMC®', label: 'CAI’s highest company accreditation · PCAM on staff', gold: true },
        { num: '8–12', label: 'Communities per manager — portfolios capped on purpose' },
      ],
    },
    intro: {
      eyebrow: 'Local Context',
      title: 'Howard County isn’t one HOA market. <em>It’s four.</em>',
      body: [
        'Columbia is the county’s largest planned community, and its village-association structure &mdash; layered under the Columbia Association &mdash; creates a governance model that exists almost nowhere else in Maryland. Boards there manage a sub-association budget and CA assessments at the same time.',
        'North of Route 40, Ellicott City brings historic-district architectural review and post-flood stormwater obligations that materially change a reserve plan. West, Clarksville and Fulton are the county’s newest construction — associations still in developer transition, where the fight is warranty claims and turnover audits, not deferred maintenance. And Elkridge and Jessup townhome HOAs sit closest to the BWI corridor, with the highest rental-tenant ratios in the county.',
        'A manager who only knows one of those four does not really know Howard County. Portfolios here are capped at 8&ndash;12 communities, which is what makes it possible to know the difference.',
      ],
      atAGlance: [
        { label: 'County seat', value: 'Ellicott City' },
        { label: 'Communities per manager', value: '8–12' },
        { label: 'After-hours callback', value: '30-min guarantee' },
        { label: 'Family-owned since', value: '1989' },
      ],
    },
    cities: {
      eyebrow: 'Cities & Towns We Serve',
      title: 'Howard County coverage, <em>town by town.</em>',
      lede: 'We cover the whole county. Each town below has its own association mix — village sub-associations, historic-district condos, new-build HOAs still in developer transition.',
      list: [
        { name: 'Columbia', slug: 'columbia', focus: 'Village associations · Condo', note: 'Village associations, CA-layered governance, mid-rise condos', tag: 'Largest market', hasPage: false },
        { name: 'Ellicott City', slug: 'ellicott-city', focus: 'Single-family · Condo', note: 'Historic-district review, stormwater reserve planning', tag: 'County seat', hasPage: false },
        { name: 'Elkridge', slug: 'elkridge', focus: 'Townhome HOA', note: 'Townhome HOAs, high tenant ratio, BWI corridor', hasPage: false },
        { name: 'Fulton', slug: 'fulton', focus: 'Master-planned · New build', note: 'New construction, developer transition & warranty claims', tag: 'Growing', hasPage: false },
        { name: 'Clarksville', slug: 'clarksville', focus: 'Single-family HOA', note: 'Large-lot single-family, private-road maintenance', hasPage: false },
        { name: 'Jessup', slug: 'jessup', focus: 'Townhome · Garden condo', note: 'Townhome & garden condo, mixed-use adjacency', hasPage: false },
        { name: 'Laurel', slug: 'laurel', focus: 'Garden-style condo', note: 'Shared PG County line, garden-style condo', hasPage: false },
        { name: 'Savage', slug: 'savage', focus: 'Small association', note: 'Historic mill district, small-association scale', hasPage: false },
        { name: 'Glenelg', slug: 'glenelg', focus: 'Rural HOA', note: 'Rural HOA, well & septic coordination', hasPage: false },
      ],
    },
    local: {
      eyebrow: 'What’s Different Here',
      title: 'Three Howard County rules <em>that change how a board operates.</em>',
      lede: 'County-specific obligations most management companies find out about after the deadline.',
      cards: [
        { tone: '', meta: 'Columbia Association', title: 'Layered CA assessments', body: 'Columbia village associations bill their own assessment <strong>on top of</strong> the Columbia Association annual charge. Budgets, delinquency, and lien priority all have to be modelled against both. We reconcile CA charges into every Columbia community’s monthly statement.' },
        { tone: 'gold', meta: 'Ellicott City Historic District', title: 'Architectural review overlay', body: 'Associations inside the historic district route exterior changes through <strong>county Historic Preservation Commission review</strong> before ARC approval means anything. We track both calendars so owners aren’t told yes twice.' },
        { tone: 'sage', meta: 'MD Code Real Prop. §11B', title: 'Reserve study cadence', body: 'Maryland law now requires associations to fund reserves against a reserve study, and the county’s newer associations are working through it for the first time. We were pushing our communities to fund at that level <strong>before the requirement existed</strong>, and reserve study coordination sits inside every budget cycle rather than being a separate project.' },
      ],
    },
    services: {
      eyebrow: 'Services in Howard County',
      title: 'Three service tiers, <em>same local team.</em>',
      lede: 'Pick the level your board needs — the manager, the response time, and the accreditation stay the same.',
      cards: [
        { tone: '', title: 'Full HOA Management', body: 'AAMC-accredited service for single-family, townhome, and village associations. Financials, vendor management, covenant enforcement, board meetings, 24/7 emergency response.', href: '/hoa-management', cta: 'Full-service details' },
        { tone: 'gold', title: 'Condo Association Management', body: 'For Columbia and Ellicott City mid-rise and garden-style condo buildings. Master-policy insurance, reserve studies, life-safety compliance, mechanical systems.', href: '/condo-management', cta: 'Condo services' },
        { tone: 'sage', title: 'Financial Management Only', body: 'For self-managed Howard County boards that want CPA-led books without giving up operational control. Monthly statements, A/R, audit support, reserve refresh.', href: '/hoa-management/hoa-financial-management', cta: 'Financial-only tier' },
      ],
    },
    manager: {
      initials: 'KC', name: 'Kate Cornell', creds: 'CMCA®', eyebrow: 'Baltimore &amp; DC Metro Regional Director',
      bio: 'Kate oversees the direction and professional development of the Community Association Management team out of the Owings Mills office, and co-leads the developer management program &mdash; the team that runs developer-controlled communities through to homeowner turnover. <strong>15+ years</strong> in the industry.',
      phone: '(443) 548-0191', phoneHref: 'tel:+14435480191',
    },
    faq: [
      { q: 'How is HOA management different in Howard County than elsewhere in Maryland?', a: 'Three things: <strong>Columbia’s village structure</strong> layers a sub-association budget under the Columbia Association assessment, which no other Maryland market does at scale. <strong>Ellicott City’s historic district</strong> adds a county preservation review on top of normal architectural approval. And <strong>west-county new construction</strong> (Fulton, Clarksville) means a high share of associations still in developer transition, where warranty claims and turnover audits matter more than deferred maintenance.' },
      { q: 'Do you serve all of Howard County?', a: 'Yes — Columbia, Ellicott City, Elkridge, Jessup, Savage, Laurel, Fulton, Clarksville, Glenelg, and the rural west county. Portfolios are capped at 8&ndash;12 communities per manager so site visits are scheduled around your community rather than squeezed in.' },
      { q: 'How quickly can you take over our Howard County community?', a: 'The controlling factor is the notice period in your current management agreement, not us. Once notice is served we work to a <strong>30/60/90-day</strong> transition plan covering records, bank accounts, vendor assignment and the first reporting cycle. See the <a href="/solutions/switching-hoa-management-company">full transition timeline</a>.' },
      { q: 'What does HOA management cost in Howard County?', a: 'It depends on community size, vendor count, meeting cadence and complexity, so we quote per association rather than publishing a rate card. <a href="/request-a-proposal">Request a proposal</a> and you will get a line-item number for your community. Boards that want professional books without full service can start at our <a href="/hoa-management/hoa-financial-management">financial-only tier</a>.' },
      { q: 'Can we speak with other Howard County boards first?', a: 'Always. We’ll connect you with 3–5 board presidents from comparable Howard County communities — same size, similar stage, similar issues. You call them, no script.' },
      { q: 'Which office covers Howard County?', a: 'Our headquarters is in Owings Mills, and we also hold an office on Columbia Pike &mdash; four insured office locations in total across the region. Main line: <strong>(443) 548-0191</strong>, with a <strong>30-minute contractual callback guarantee</strong> after hours, answered by Tidewater managers rather than an answering service.' },
    ],
    resources: {
      eyebrow: 'Local Resources',
      title: 'The Howard County offices <em>your board actually deals with.</em>',
      lede: 'Every association here runs into the same handful of county offices — usually at a deadline. These are the ones we work with weekly, and what each is actually for.',
      groups: [
        { label: 'Permits, inspections & enforcement', items: [
          { name: 'Dept. of Inspections, Licenses & Permits', org: 'Howard County DILP', use: 'Common-area construction permits, pool and playground licensing, and contractor verification before a board signs a capital-project contract.', href: 'https://www.howardcountymd.gov/inspections-licenses-permits' },
          { name: 'Code Enforcement', org: 'Howard County DILP', use: 'Property-maintenance and zoning violations on the far side of the association line — where the covenant stops and county code starts.', href: 'https://www.howardcountymd.gov/code-enforcement' },
          { name: 'Stormwater Management', org: 'Howard County Bureau of Environmental Services', use: 'SWM facility inspection cycles and recorded maintenance agreements. The most commonly missed obligation in the county.', href: 'https://www.howardcountymd.gov/public-works/stormwater-management' },
        ]},
        { label: 'Records, filings & liens', items: [
          { name: 'Land Records', org: 'Circuit Court for Howard County', use: 'Recording covenant amendments, bylaw restatements, and HOA liens. Where a governing-document chain of title gets rebuilt during a transition.', href: 'https://www.mdcourts.gov/clerks/howard/landrecords' },
          { name: 'Business Entity & Charter Filings', org: 'Maryland SDAT', use: 'Annual corporate filings and good-standing status. An association in forfeiture cannot enforce a lien — we check this first at every takeover.', href: 'https://dat.maryland.gov' },
          { name: 'Maryland Homeowners Association Act', org: 'MD Code, Real Property § 11B', use: 'The statute behind disclosure packets, resale certificates, open-meeting rules, and the reserve-study cycle.', href: 'https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=grp&section=11b-101' },
        ]},
        { label: 'Utilities & county services', items: [
          { name: 'Bureau of Utilities', org: 'Howard County DPW', use: 'Water and sewer accounts for common-area meters, and irrigation account setup.', href: 'https://www.howardcountymd.gov/public-works/bureau-utilities' },
          { name: 'Curbside Collection & Recycling', org: 'Howard County Bureau of Environmental Services', use: 'Eligibility rules — many private-road communities are excluded and must contract privately. Worth confirming before a board budgets for it.', href: 'https://www.howardcountymd.gov/bureau-environmental-services' },
          { name: 'Snow Removal & Road Status', org: 'Howard County Bureau of Highways', use: 'Which roads the county plows and which the association owns. Settles the busiest resident complaint of the winter.', href: 'https://www.howardcountymd.gov/public-works/snow-removal' },
        ]},
        { label: 'Governance & industry', items: [
          { name: 'CAI Chesapeake Chapter', org: 'Community Associations Institute', use: 'Board member education, Maryland legislative tracking, and credentialed-manager standards. Two of our leaders have served as chapter president.', href: 'https://www.caimdches.org' },
          { name: 'Consumer Protection Division', org: 'Maryland Attorney General', use: 'Where owner complaints about association governance land, and the mediation path before litigation.', href: 'https://www.marylandattorneygeneral.gov/Pages/CPD/default.aspx' },
        ]},
      ],
      cityNotes: [
        { city: 'Columbia', note: 'Village associations sit under the <strong>Columbia Association</strong>, which levies its own annual charge and maintains most open space. Budget, lien priority, and architectural jurisdiction all have to be read against CA covenants as well as the village’s.' },
        { city: 'Ellicott City', note: 'Associations inside the <strong>Ellicott City Historic District</strong> route exterior changes through the county <strong>Historic Preservation Commission</strong> before an ARC approval means anything. Post-2016/2018 flood stormwater obligations also run heavier here than anywhere else in the county.' },
        { city: 'Laurel', note: 'The city line splits Howard and Prince George’s County. Confirm which jurisdiction a parcel sits in before filing anything — recording, permits, and trash service all follow the county, not the mailing address.' },
        { city: 'Clarksville & Glenelg', note: 'Largely outside public water and sewer. Associations with <strong>shared wells or community septic</strong> carry MDE-regulated obligations and a reserve line most boards discover late.' },
      ],
    },
    nearby: [
      { name: 'Anne Arundel County', slug: 'anne-arundel-county', note: 'Annapolis · Severna Park · Glen Burnie' },
      { name: 'Baltimore County', slug: 'baltimore-county', note: 'Towson · Owings Mills · Catonsville' },
      { name: 'Montgomery County', slug: 'montgomery-county', note: 'Rockville · Silver Spring · Germantown' },
      { name: 'Carroll County', slug: 'carroll-county', note: 'Westminster · Eldersburg · Sykesville' },
    ],
    map: { query: 'Howard County, Maryland', zoom: 10, caption: 'Howard County, Maryland — Columbia, Ellicott City, Elkridge, Fulton, Clarksville' },
  },

  'carroll-county': {
    name: 'Carroll County', shortName: 'Carroll', state: 'Maryland', stateAbbr: 'MD', slug: 'carroll-county',
    service: 'HOA Management', servicePath: 'hoa-management', countySeat: 'Westminster',
    layout: 'directory',
    seo: {
      focusKeyword: 'hoa management carroll county maryland',
      title: 'HOA Management Carroll County MD — Westminster, Eldersburg | Tidewater',
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
};
