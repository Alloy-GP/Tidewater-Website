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
  /** Cross-links outside the HOA county tree (e.g. the rental page for the same county). Rendered with `nearby`. */
  related?: { label: string; href: string; note: string }[];
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
    related: [
      { label: 'Property management in Howard County', href: '/rental-management/maryland/howard-county', note: 'Single-family, townhome & condo rentals — the owner side of the same communities.' },
    ],
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
    related: [
      { label: 'Rental management across Maryland', href: '/rental-management/maryland', note: 'For Carroll owners renting out a home inside an association we manage.' },
    ],
  },

  // ───────────────────────────────────────────────────────────
  // BALTIMORE COUNTY — Tidewater's home county (HQ: Owings Mills)
  // Local-context facts are public geography/governance: Baltimore County has
  // no incorporated municipalities; Towson is the county seat; the state
  // reserve-study requirement (Real Prop. §11B) applies statewide.
  // ───────────────────────────────────────────────────────────
  'baltimore-county': {
    name: 'Baltimore County', shortName: 'Baltimore County', state: 'Maryland', stateAbbr: 'MD', slug: 'baltimore-county',
    service: 'HOA Management', servicePath: 'hoa-management', countySeat: 'Towson',
    layout: 'editorial',
    seo: {
      focusKeyword: 'hoa management baltimore county maryland',
      title: 'HOA Management Baltimore County MD — Towson, Owings Mills | Tidewater',
      description: 'HOA & condo association management across Baltimore County — Towson, Owings Mills, Pikesville, Cockeysville, Catonsville, White Marsh. Tidewater’s home county since 1989. AAMC-accredited.',
      canonical: 'https://tidewaterproperty.com/hoa-management/maryland/baltimore-county',
    },
    hero: {
      h1Lead: 'HOA management in', h1Accent: 'Baltimore County.',
      lede: 'Our headquarters has been in Owings Mills since 1989, which makes Baltimore County the one market where your manager, the accounting team, and the after-hours line all sit a short drive from the community. Towson, Pikesville, Cockeysville, Catonsville, White Marsh — mature suburbs, ageing common elements, and reserve plans that have to be honest.',
      stats: [
        { num: '450+', label: 'Communities managed across six states' },
        { num: 'AAMC®', label: 'CAI’s highest company accreditation · PCAM on staff', gold: true },
        { num: '30-min', label: 'Contractual after-hours callback guarantee' },
      ],
    },
    intro: {
      eyebrow: 'Local Context',
      title: 'The home county. <em>Older stock, real reserves.</em>',
      body: [
        'Baltimore County has no incorporated towns or cities. Every permit, inspection, zoning question and code complaint runs through county government in Towson, which keeps jurisdiction simple but means one calendar and one set of offices for every association in the county — from Catonsville to the Pennsylvania line.',
        'Much of the county’s association housing dates from the 1970s-to-1990s build-out of Towson, Pikesville, Owings Mills and the Perry Hall–White Marsh corridor. Roofs, parking lots, elevators and boilers in those communities are on their second replacement cycle, and a reserve study that still reads like the developer’s original schedule is the most common problem we inherit at takeover.',
        'Proximity matters here in a way it cannot elsewhere. The operations and accounting teams that support every Tidewater community work from Owings Mills, so a Baltimore County board gets in-person meetings, same-day site visits and a manager who already knows the county inspector rather than a regional team travelling in.',
      ],
      atAGlance: [
        { label: 'County seat', value: 'Towson' },
        { label: 'Incorporated municipalities', value: 'None — county code governs' },
        { label: 'Communities per manager', value: '8–12' },
        { label: 'Headquarters', value: 'Owings Mills, since 1989' },
      ],
    },
    cities: {
      eyebrow: 'Cities & Towns We Serve',
      title: 'Baltimore County coverage, <em>town by town.</em>',
      lede: 'We cover the whole county from the Inner Beltway to the Pennsylvania line. Each area below has its own association mix — university-adjacent condos, Metro-corridor townhomes, older single-family HOAs and rural well-and-septic communities.',
      list: [
        { name: 'Towson', slug: 'towson', focus: 'Mid-rise condo · Single-family', note: 'County seat, university-adjacent condos, leasing restrictions matter', tag: 'County seat', hasPage: false },
        { name: 'Owings Mills', slug: 'owings-mills', focus: 'Townhome HOA · Garden condo', note: 'Metro-adjacent townhome and garden-condo communities from the 1980s–90s', tag: 'Tidewater HQ', hasPage: false },
        { name: 'Pikesville', slug: 'pikesville', focus: 'Condo · Townhome', note: 'Established condo and townhome associations, mature common elements', hasPage: false },
        { name: 'Cockeysville & Hunt Valley', slug: 'cockeysville', focus: 'Condo · Corporate corridor', note: 'I-83 corridor condos and townhomes near the Hunt Valley employment base', hasPage: false },
        { name: 'Catonsville', slug: 'catonsville', focus: 'Single-family HOA', note: 'Older single-family HOAs, some with private stormwater facilities', hasPage: false },
        { name: 'Perry Hall & White Marsh', slug: 'white-marsh', focus: 'Townhome HOA · Newer', note: 'Newer townhome and planned communities along the I-95 corridor', tag: 'Growing', hasPage: false },
        { name: 'Reisterstown', slug: 'reisterstown', focus: 'Single-family · North county', note: 'Single-family HOAs shading into well-and-septic north county', hasPage: false },
        { name: 'Dundalk & Essex', slug: 'dundalk', focus: 'Waterfront · Small association', note: 'Waterfront and small-association scale on the east side', hasPage: false },
      ],
    },
    local: {
      eyebrow: 'What’s Different Here',
      title: 'Three Baltimore County realities <em>that shape a board’s year.</em>',
      lede: 'None of these are secrets. All of them show up late if nobody is planning for them.',
      cards: [
        { tone: '', meta: 'No incorporated towns', title: 'One jurisdiction, one calendar', body: 'With no municipal layer, every association question &mdash; common-area permits, code complaints, stormwater inspections &mdash; goes to <strong>Baltimore County government</strong>. That simplifies who to call, and it means the county’s permit and code-enforcement offices are the only door. We work with them weekly.' },
        { tone: 'gold', meta: 'Ageing common elements', title: 'Second-cycle capital work', body: 'Much of the county’s association stock is 30 to 50 years old. Roofs, parking lots, elevators and boilers are on their <strong>second replacement cycle</strong>, and a reserve study that still tracks the developer’s original schedule understates the bill. We re-baseline reserves against actual condition at takeover.' },
        { tone: 'sage', meta: 'MD Code Real Prop. §11B', title: 'Reserve study funding is law', body: 'Maryland now requires associations to fund reserves against a current reserve study. For older Baltimore County communities that often means a catch-up plan rather than a single-year jump. We were pushing our communities to fund at that level <strong>before the requirement existed</strong>, and reserve coordination sits inside every budget cycle.' },
      ],
    },
    services: {
      eyebrow: 'Services in Baltimore County',
      title: 'Three service tiers, <em>from the home office.</em>',
      lede: 'Pick the level your board needs — the manager, the response time, and the accreditation stay the same.',
      cards: [
        { tone: '', title: 'Full HOA Management', body: 'AAMC-accredited service for single-family, townhome and planned communities. Financials, vendor management, covenant enforcement, board meetings, 24/7 emergency response.', href: '/hoa-management', cta: 'Full-service details' },
        { tone: 'gold', title: 'Condo Association Management', body: 'For Towson, Pikesville and Owings Mills mid-rise and garden-style condo buildings. Master-policy insurance, reserve studies, life-safety compliance, mechanical systems.', href: '/condo-management', cta: 'Condo services' },
        { tone: 'sage', title: 'Financial Management Only', body: 'For self-managed Baltimore County boards that want CPA-led books without giving up operational control. Monthly statements, A/R, audit support, reserve refresh.', href: '/hoa-management/hoa-financial-management', cta: 'Financial-only tier' },
      ],
    },
    manager: {
      initials: 'KC', name: 'Kate Cornell', creds: 'CMCA®', eyebrow: 'Baltimore &amp; DC Metro Regional Director',
      bio: 'Kate oversees the direction and professional development of the Community Association Management team out of the Owings Mills office, and co-leads the developer management program &mdash; the team that runs developer-controlled communities through to homeowner turnover. <strong>15+ years</strong> in the industry.',
      phone: '(443) 548-0191', phoneHref: 'tel:+14435480191',
    },
    faq: [
      { q: 'How is HOA management different in Baltimore County than elsewhere in Maryland?', a: 'Two things. <strong>No incorporated municipalities</strong> &mdash; every permit, inspection and code question runs through county government in Towson, so there is one calendar and one set of offices for every association. And <strong>older building stock</strong>: much of the county’s association housing was built between the 1970s and 1990s, so second-cycle roofs, parking lots and mechanical systems dominate the capital plan. Reserve honesty matters more here than almost anywhere else we manage.' },
      { q: 'Do you serve all of Baltimore County?', a: 'Yes &mdash; Towson, Owings Mills, Pikesville, Cockeysville, Hunt Valley, Catonsville, Perry Hall, White Marsh, Parkville, Reisterstown, Dundalk, Essex and the rural north county. It is our home county: portfolios are capped at 8&ndash;12 communities per manager and the whole support team works from Owings Mills.' },
      { q: 'How quickly can you take over our Baltimore County community?', a: 'The controlling factor is the notice period in your current management agreement, not us. Once notice is served we work to a <strong>30/60/90-day</strong> transition plan covering records, bank accounts, vendor assignment and the first reporting cycle. See the <a href="/solutions/switching-hoa-management-company">full transition timeline</a>.' },
      { q: 'What does HOA management cost in Baltimore County?', a: 'It depends on community size, vendor count, meeting cadence and complexity, so we quote per association rather than publishing a rate card. <a href="/request-a-proposal">Request a proposal</a> and you will get a line-item number for your community. Boards that want professional books without full service can start at our <a href="/hoa-management/hoa-financial-management">financial-only tier</a>.' },
      { q: 'Can we speak with other Baltimore County boards first?', a: 'Always. We’ll connect you with 3–5 board presidents from comparable Baltimore County communities — same size, similar stage, similar issues. You call them, no script.' },
      { q: 'Where is your Baltimore County office?', a: 'Our headquarters is at <strong>3600 Crondall Lane, Suite 100, Owings Mills, MD 21117</strong>. Main line: <strong>(443) 548-0191</strong>, with a <strong>30-minute contractual callback guarantee</strong> after hours, answered by Tidewater managers rather than an answering service.' },
    ],
    resources: {
      eyebrow: 'Local Resources',
      title: 'The Baltimore County offices <em>your board actually deals with.</em>',
      lede: 'With no town layer, these county offices are the whole list. We work with each of them weekly; here is what each one is actually for.',
      groups: [
        { label: 'Permits, inspections & enforcement', items: [
          { name: 'Permits, Approvals & Inspections', org: 'Baltimore County PAI', use: 'Common-area construction permits, pool and playground licensing, and contractor verification before a board signs a capital-project contract.', href: 'https://www.baltimorecountymd.gov/departments/permits' },
          { name: 'Code Enforcement', org: 'Baltimore County PAI', use: 'Property-maintenance and zoning violations beyond the association line — where the covenant stops and county code starts.', href: 'https://www.baltimorecountymd.gov/departments/permits/codeenforcement' },
          { name: 'Environmental Protection & Sustainability', org: 'Baltimore County EPS', use: 'Stormwater facility inspection cycles and recorded maintenance agreements — the most commonly missed association obligation in the county.', href: 'https://www.baltimorecountymd.gov/departments/environment' },
        ]},
        { label: 'Records, filings & liens', items: [
          { name: 'Land Records', org: 'Circuit Court for Baltimore County', use: 'Recording covenant amendments, bylaw restatements, and association liens. Where a governing-document chain of title gets rebuilt during a transition.', href: 'https://www.mdcourts.gov/clerks/baltimore' },
          { name: 'Business Entity & Charter Filings', org: 'Maryland SDAT', use: 'Annual corporate filings and good-standing status. An association in forfeiture cannot enforce a lien — we check this first at every takeover.', href: 'https://dat.maryland.gov' },
          { name: 'Maryland Homeowners Association Act', org: 'MD Code, Real Property § 11B', use: 'The statute behind disclosure packets, resale certificates, open-meeting rules, and the reserve-study cycle.', href: 'https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=grp&section=11b-101' },
        ]},
        { label: 'Utilities & county services', items: [
          { name: 'Public Works & Transportation', org: 'Baltimore County DPWT', use: 'Which roads the county maintains and plows versus what the association owns — the busiest winter complaint, settled in advance.', href: 'https://www.baltimorecountymd.gov/departments/publicworks' },
          { name: 'Water & Sewer Billing', org: 'Baltimore County / Baltimore City DPW', use: 'Common-area meter accounts. Much of the county is served by the Baltimore City water system, which changes who a board calls about a bill.', href: 'https://www.baltimorecountymd.gov/departments/publicworks/utilities' },
          { name: 'Recycling & Trash Collection', org: 'Baltimore County Bureau of Solid Waste', use: 'Eligibility rules for county collection. Many private-road and condo communities must contract privately — confirm before budgeting.', href: 'https://www.baltimorecountymd.gov/departments/publicworks/recycling' },
        ]},
        { label: 'Governance & industry', items: [
          { name: 'CAI Chesapeake Chapter', org: 'Community Associations Institute', use: 'Board member education, Maryland legislative tracking, and credentialed-manager standards. Two of our leaders have served as chapter president.', href: 'https://www.caimdches.org' },
          { name: 'Consumer Protection Division', org: 'Maryland Attorney General', use: 'Where owner complaints about association governance land, and the mediation path before litigation.', href: 'https://www.marylandattorneygeneral.gov/Pages/CPD/default.aspx' },
        ]},
      ],
      cityNotes: [
        { city: 'Towson', note: 'County seat and home to Towson University and Goucher College. Associations with <strong>student-adjacent rentals</strong> lean hard on leasing restrictions and occupancy rules — make sure yours are recorded and enforceable, not just in the handbook.' },
        { city: 'Owings Mills & Pikesville', note: 'Dense <strong>1980s–90s townhome and garden-condo</strong> stock around the Metro line. Roofs, siding and paving are on their second cycle; reserve studies here need current condition data, not the original developer schedule.' },
        { city: 'Perry Hall & White Marsh', note: 'The county’s <strong>newer planned communities</strong> along I-95. Expect recorded stormwater maintenance agreements and, in the newest phases, developer-transition and warranty work.' },
        { city: 'Reisterstown & the north county', note: 'Beyond the water-and-sewer line, associations often carry <strong>shared wells, community septic or private roads</strong> &mdash; MDE-regulated obligations and a reserve line most boards discover late.' },
      ],
    },
    nearby: [
      { name: 'Howard County', slug: 'howard-county', note: 'Columbia · Ellicott City · Elkridge' },
      { name: 'Carroll County', slug: 'carroll-county', note: 'Westminster · Eldersburg · Sykesville' },
      { name: 'Anne Arundel County', slug: 'anne-arundel-county', note: 'Annapolis · Severna Park · Glen Burnie' },
      { name: 'Montgomery County', slug: 'montgomery-county', note: 'Rockville · Bethesda · Silver Spring' },
    ],
    related: [
      { label: 'Baltimore County property management', href: '/rental-management/maryland/baltimore-county', note: 'Single-family, townhome & condo rentals — the owner side of the same communities.' },
    ],
    map: { query: 'Baltimore County, Maryland', zoom: 9, caption: 'Baltimore County, Maryland — Towson, Owings Mills, Pikesville, Cockeysville, Catonsville, White Marsh' },
  },

  // ───────────────────────────────────────────────────────────
  // MONTGOMERY COUNTY — the most regulated HOA market in Maryland
  // Public facts: Commission on Common Ownership Communities (CCOC) under the
  // county Office of Consumer Protection; County Code Chapter 10B; Rockville,
  // Gaithersburg and Takoma Park are incorporated; Bethesda, Silver Spring,
  // Wheaton and Germantown are not.
  // ───────────────────────────────────────────────────────────
  'montgomery-county': {
    name: 'Montgomery County', shortName: 'Montgomery', state: 'Maryland', stateAbbr: 'MD', slug: 'montgomery-county',
    service: 'HOA Management', servicePath: 'hoa-management', countySeat: 'Rockville',
    layout: 'editorial',
    seo: {
      focusKeyword: 'hoa management montgomery county maryland',
      title: 'HOA Management Montgomery County MD — Rockville, Bethesda | Tidewater',
      description: 'HOA & condo association management across Montgomery County — Rockville, Bethesda, Silver Spring, Gaithersburg, Germantown. CCOC registration handled. AAMC-accredited, family-owned since 1989.',
      canonical: 'https://tidewaterproperty.com/hoa-management/maryland/montgomery-county',
    },
    hero: {
      h1Lead: 'HOA management in', h1Accent: 'Montgomery County.',
      lede: 'Montgomery County regulates common ownership communities more closely than any other Maryland county — annual CCOC registration, County Code Chapter 10B, and incorporated cities with their own rulebooks. Rockville, Bethesda, Silver Spring, Gaithersburg, Germantown: we manage to the county’s standard, not a generic one.',
      stats: [
        { num: '450+', label: 'Communities managed across six states' },
        { num: 'AAMC®', label: 'CAI’s highest company accreditation · PCAM on staff', gold: true },
        { num: '30-min', label: 'Contractual after-hours callback guarantee' },
      ],
    },
    intro: {
      eyebrow: 'Local Context',
      title: 'The most regulated HOA market <em>in Maryland.</em>',
      body: [
        'Montgomery County has a body most Maryland counties do not: the <strong>Commission on Common Ownership Communities</strong>, part of the county’s Office of Consumer Protection. Every HOA, condominium and cooperative in the county registers with the CCOC annually and pays a per-unit fee, and for many owner–association disputes a CCOC filing is the required first stop before anyone can go to court. Boards that treat the registration as optional find out otherwise at the worst time.',
        'Then there is the municipal layer. Rockville, Gaithersburg and Takoma Park are incorporated cities with their own permitting, inspections and &mdash; in Takoma Park’s case &mdash; a separate rent stabilization law. Bethesda, Silver Spring, Wheaton and Germantown are unincorporated and answer to the county alone. Two associations a mile apart can face different filing calendars.',
        'The building stock is just as varied: Metro-corridor mid-rise and high-rise condominiums in Bethesda and Silver Spring, 1980s-to-2000s townhome HOAs across Germantown and Gaithersburg, and developer-controlled communities still turning over in Clarksburg. We staff each of those differently, because they are different jobs.',
      ],
      atAGlance: [
        { label: 'County seat', value: 'Rockville' },
        { label: 'CCOC registration', value: 'Annual — every association' },
        { label: 'Communities per manager', value: '8–12' },
        { label: 'Family-owned since', value: '1989' },
      ],
    },
    cities: {
      eyebrow: 'Cities & Towns We Serve',
      title: 'Montgomery County coverage, <em>town by town.</em>',
      lede: 'We cover the county from the DC line to the Frederick County line. Each area below has a different association mix and, in the incorporated cities, a different rulebook.',
      list: [
        { name: 'Rockville', slug: 'rockville', focus: 'Condo · Townhome · Incorporated', note: 'County seat, incorporated city with its own permitting and inspections', tag: 'County seat', hasPage: false },
        { name: 'Bethesda', slug: 'bethesda', focus: 'Mid-rise & high-rise condo', note: 'Metro-corridor condominiums, master-policy and life-safety heavy', tag: 'Largest condo market', hasPage: false },
        { name: 'Silver Spring', slug: 'silver-spring', focus: 'Condo · Townhome · DC border', note: 'Downtown condos, Four Corners and Forest Glen townhome HOAs', hasPage: false },
        { name: 'Gaithersburg', slug: 'gaithersburg', focus: 'Townhome HOA · Incorporated', note: 'Incorporated city; Kentlands-era planned communities and townhome HOAs', hasPage: false },
        { name: 'Germantown', slug: 'germantown', focus: 'Townhome HOA · Planned', note: 'Large planned-community structure, village-style sub-associations', hasPage: false },
        { name: 'Wheaton', slug: 'wheaton', focus: 'Garden condo · Townhome', note: 'Garden condos and townhomes near the Wheaton Metro core', hasPage: false },
        { name: 'Potomac', slug: 'potomac', focus: 'Single-family HOA · Large lot', note: 'Large-lot single-family HOAs, private-road and stormwater obligations', hasPage: false },
        { name: 'Clarksburg', slug: 'clarksburg', focus: 'New build · Developer transition', note: 'Newest development in the county; developer turnover and warranty work', tag: 'Growing', hasPage: false },
        { name: 'Olney', slug: 'olney', focus: 'Single-family HOA', note: 'Established single-family and townhome HOAs with shared amenities', hasPage: false },
      ],
    },
    local: {
      eyebrow: 'What’s Different Here',
      title: 'Three Montgomery County rules <em>that change how a board operates.</em>',
      lede: 'County-specific obligations most management companies find out about after the deadline.',
      cards: [
        { tone: '', meta: 'CCOC · County Code Ch. 10B', title: 'Annual registration is not optional', body: 'Every common ownership community in the county registers with the <strong>Commission on Common Ownership Communities</strong> each year and pays a per-unit fee. Late or missed registration exposes the board to county penalties and complicates enforcement. We put the CCOC deadline on the association calendar at takeover and file it every year.' },
        { tone: 'gold', meta: 'Municipal overlays', title: 'Three cities, three rulebooks', body: 'Rockville, Gaithersburg and Takoma Park run their own permitting, inspections and code enforcement inside city limits; Takoma Park adds its own <strong>rent stabilization</strong> law. Bethesda, Silver Spring and Wheaton answer to the county alone. We confirm the jurisdiction of every parcel before anything is filed.' },
        { tone: 'sage', meta: 'MD Code Real Prop. §11B', title: 'Reserve study cadence', body: 'Maryland law requires associations to fund reserves against a current reserve study. In Bethesda and Silver Spring high-rises that means elevators, façades and central plant on a defensible schedule; in Germantown townhome HOAs it means roads and roofs. Reserve coordination sits inside every budget cycle rather than being a separate project.' },
      ],
    },
    services: {
      eyebrow: 'Services in Montgomery County',
      title: 'Three service tiers, <em>same DC Metro team.</em>',
      lede: 'Pick the level your board needs — the manager, the response time, and the accreditation stay the same.',
      cards: [
        { tone: '', title: 'Full HOA Management', body: 'AAMC-accredited service for townhome, single-family and planned communities. Financials, vendor management, covenant enforcement, CCOC registration, board meetings, 24/7 emergency response.', href: '/hoa-management', cta: 'Full-service details' },
        { tone: 'gold', title: 'Condo Association Management', body: 'For Bethesda, Silver Spring and Rockville mid-rise and high-rise buildings. Master-policy insurance, reserve studies, life-safety and elevator compliance, mechanical systems.', href: '/condo-management', cta: 'Condo services' },
        { tone: 'sage', title: 'Financial Management Only', body: 'For self-managed Montgomery County boards that want CPA-led books without giving up operational control. Monthly statements, A/R, audit support, reserve refresh.', href: '/hoa-management/hoa-financial-management', cta: 'Financial-only tier' },
      ],
    },
    manager: {
      initials: 'KC', name: 'Kate Cornell', creds: 'CMCA®', eyebrow: 'Baltimore &amp; DC Metro Regional Director',
      bio: 'Kate oversees the direction and professional development of the Community Association Management team, and co-leads the developer management program &mdash; the team that runs developer-controlled communities through to homeowner turnover. <strong>15+ years</strong> in the industry.',
      phone: '(443) 548-0191', phoneHref: 'tel:+14435480191',
    },
    faq: [
      { q: 'How is HOA management different in Montgomery County than elsewhere in Maryland?', a: 'Three things. The <strong>CCOC</strong> &mdash; annual registration for every association and a required dispute-resolution step most other counties do not have. <strong>Incorporated cities</strong> &mdash; Rockville, Gaithersburg and Takoma Park run their own permitting and code enforcement, so the same work is filed differently a mile apart. And the <strong>Metro-corridor high-rise stock</strong> in Bethesda and Silver Spring, where life-safety, elevator and façade programs dominate the capital plan.' },
      { q: 'Do you handle the CCOC registration for us?', a: 'Yes. The annual Commission on Common Ownership Communities registration and per-unit fee go on the association calendar at takeover, and we file it every year. If a dispute reaches the CCOC, we prepare the association’s documentation and attend with the board.' },
      { q: 'Do you serve all of Montgomery County?', a: 'Yes &mdash; Rockville, Bethesda, Silver Spring, Gaithersburg, Germantown, Wheaton, Potomac, Olney, Clarksburg and the Takoma Park border. Portfolios are capped at 8&ndash;12 communities per manager so site visits are scheduled around your community rather than squeezed in.' },
      { q: 'How quickly can you take over our Montgomery County community?', a: 'The controlling factor is the notice period in your current management agreement, not us. Once notice is served we work to a <strong>30/60/90-day</strong> transition plan covering records, bank accounts, vendor assignment, the CCOC registration and the first reporting cycle. See the <a href="/solutions/switching-hoa-management-company">full transition timeline</a>.' },
      { q: 'What does HOA management cost in Montgomery County?', a: 'It depends on community size, building type, vendor count and meeting cadence, so we quote per association rather than publishing a rate card. <a href="/request-a-proposal">Request a proposal</a> and you will get a line-item number for your community. Boards that want professional books without full service can start at our <a href="/hoa-management/hoa-financial-management">financial-only tier</a>.' },
      { q: 'Can we speak with other Montgomery County boards first?', a: 'Always. We’ll connect you with 3–5 board presidents from comparable Montgomery County communities — same size, similar building type, similar issues. You call them, no script.' },
    ],
    resources: {
      eyebrow: 'Local Resources',
      title: 'The Montgomery County offices <em>your board actually deals with.</em>',
      lede: 'More offices than any other Maryland county, and more deadlines. These are the ones we work with weekly, and what each is actually for.',
      groups: [
        { label: 'Association regulation', items: [
          { name: 'Commission on Common Ownership Communities', org: 'Montgomery County Office of Consumer Protection', use: 'Annual association registration, board education, and the dispute-resolution process that precedes court for many owner–association disputes.', href: 'https://www.montgomerycountymd.gov/ccoc' },
          { name: 'Office of Consumer Protection', org: 'Montgomery County', use: 'The CCOC’s parent office; also where owner complaints about association governance are first directed.', href: 'https://www.montgomerycountymd.gov/ocp' },
          { name: 'Maryland Homeowners Association Act', org: 'MD Code, Real Property § 11B', use: 'The statute behind disclosure packets, resale certificates, open-meeting rules, and the reserve-study cycle.', href: 'https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=grp&section=11b-101' },
        ]},
        { label: 'Permits, inspections & enforcement', items: [
          { name: 'Department of Permitting Services', org: 'Montgomery County DPS', use: 'Common-area construction permits, pool licensing, and contractor verification before a board signs a capital-project contract — outside the incorporated cities.', href: 'https://www.montgomerycountymd.gov/dps' },
          { name: 'Housing Code Enforcement', org: 'Montgomery County DHCA', use: 'Property-maintenance and rental-housing code beyond the association line, and the county rental license that owners inside your community must hold.', href: 'https://www.montgomerycountymd.gov/dhca' },
          { name: 'Department of Environmental Protection', org: 'Montgomery County DEP', use: 'Stormwater facility inspection cycles and recorded maintenance agreements. The most commonly missed association obligation in the county.', href: 'https://www.montgomerycountymd.gov/dep' },
        ]},
        { label: 'Records, filings & utilities', items: [
          { name: 'Land Records', org: 'Circuit Court for Montgomery County · mdlandrec.net', use: 'Recording covenant amendments, bylaw restatements, and association liens. Recorded instruments for every Maryland county are searchable at mdlandrec.net.', href: 'https://mdlandrec.net' },
          { name: 'Business Entity & Charter Filings', org: 'Maryland SDAT', use: 'Annual corporate filings and good-standing status. An association in forfeiture cannot enforce a lien — we check this first at every takeover.', href: 'https://dat.maryland.gov' },
          { name: 'WSSC Water', org: 'Washington Suburban Sanitary Commission', use: 'Water and sewer accounts for common-area meters across Montgomery and Prince George’s counties.', href: 'https://www.wsscwater.com' },
        ]},
        { label: 'Governance & industry', items: [
          { name: 'CAI Chesapeake Chapter', org: 'Community Associations Institute', use: 'Board member education, Maryland legislative tracking, and credentialed-manager standards. Two of our leaders have served as chapter president.', href: 'https://www.caimdches.org' },
          { name: 'Consumer Protection Division', org: 'Maryland Attorney General', use: 'The state-level path for owner governance complaints, alongside the county CCOC.', href: 'https://www.marylandattorneygeneral.gov/Pages/CPD/default.aspx' },
        ]},
      ],
      cityNotes: [
        { city: 'Rockville & Gaithersburg', note: 'Incorporated cities with their own <strong>permitting, inspections and code enforcement</strong>. County DPS does not issue permits inside city limits — file with the city, and expect a different fee schedule and timeline.' },
        { city: 'Bethesda & Silver Spring', note: 'Unincorporated, county-only jurisdiction, and home to the county’s <strong>high-rise condominium</strong> stock. Elevator, fire-system and façade programs drive the reserve study; Metro-corridor density drives the leasing rules.' },
        { city: 'Takoma Park', note: 'Incorporated, with its own <strong>rent stabilization</strong> ordinance on top of the county’s. Associations with rental units inside city limits carry both sets of rules.' },
        { city: 'Clarksburg & Germantown', note: 'The county’s newest and largest planned communities. Expect <strong>developer transition</strong>, warranty claims and turnover audits in Clarksburg, and layered village sub-associations in Germantown.' },
      ],
    },
    nearby: [
      { name: 'Howard County', slug: 'howard-county', note: 'Columbia · Ellicott City · Elkridge' },
      { name: 'Frederick County', slug: 'frederick-county', note: 'Frederick · Urbana · Mount Airy' },
      { name: 'Baltimore County', slug: 'baltimore-county', note: 'Towson · Owings Mills · Catonsville' },
      { name: 'Anne Arundel County', slug: 'anne-arundel-county', note: 'Annapolis · Severna Park · Glen Burnie' },
    ],
    related: [
      { label: 'Property management in Montgomery County', href: '/rental-management/maryland/montgomery-county', note: 'Single-family, townhome & condo rentals — the owner side of the same communities.' },
      { label: 'Silver Spring property management', href: '/rental-management/maryland/silver-spring', note: 'Our dedicated Silver Spring rental page — Downtown, Four Corners, Forest Glen.' },
    ],
    map: { query: 'Montgomery County, Maryland', zoom: 10, caption: 'Montgomery County, Maryland — Rockville, Bethesda, Silver Spring, Gaithersburg, Germantown' },
  },

  // ───────────────────────────────────────────────────────────
  // FREDERICK COUNTY — developer transition is the story
  // Public facts: Frederick is the county seat and an incorporated city with
  // a Historic Preservation Commission; Frederick County has been a charter
  // county since 2014; Mount Airy straddles the Carroll line; Urbana,
  // Ballenger Creek and Brunswick Crossing are the major planned communities.
  // No named manager on file for Frederick — section self-hides.
  // ───────────────────────────────────────────────────────────
  'frederick-county': {
    name: 'Frederick County', shortName: 'Frederick', state: 'Maryland', stateAbbr: 'MD', slug: 'frederick-county',
    service: 'HOA Management', servicePath: 'hoa-management', countySeat: 'Frederick',
    layout: 'editorial',
    seo: {
      focusKeyword: 'hoa management frederick county maryland',
      title: 'HOA Management Frederick County MD — Frederick, Urbana | Tidewater',
      description: 'HOA & condo association management across Frederick County — Frederick, Urbana, Ballenger Creek, Mount Airy, Brunswick, Middletown. Developer transitions handled. AAMC-accredited, family-owned since 1989.',
      canonical: 'https://tidewaterproperty.com/hoa-management/maryland/frederick-county',
    },
    hero: {
      h1Lead: 'HOA management in', h1Accent: 'Frederick County.',
      lede: 'Frederick County is where Maryland’s newest master-planned communities are still being built out — Urbana, Ballenger Creek, Brunswick Crossing — alongside downtown Frederick’s historic-district condominiums. Two very different kinds of association work, one AAMC-accredited team, family-owned since 1989.',
      stats: [
        { num: '450+', label: 'Communities managed across six states' },
        { num: 'AAMC®', label: 'CAI’s highest company accreditation · PCAM on staff', gold: true },
        { num: '30-min', label: 'Contractual after-hours callback guarantee' },
      ],
    },
    intro: {
      eyebrow: 'Local Context',
      title: 'Developer transition is <em>the Frederick story.</em>',
      body: [
        'A large share of Frederick County’s association housing is less than twenty years old, and much of it is still working through the hand-off from developer control to a homeowner board. That is a different job from managing a mature community: the turnover audit, warranty claims, the first honest reserve baseline and the first real budget matter far more than deferred maintenance. Tidewater co-leads a dedicated developer management program for exactly this stage.',
        'The City of Frederick is its own jurisdiction &mdash; incorporated, with its own permitting and inspections and a Historic Preservation Commission that reviews exterior work in the downtown historic district before any association architectural approval means anything. Condominium conversions in older downtown buildings carry that overlay permanently.',
        'Beyond the city and the I-270 corridor, the county turns rural fast. Middletown, Thurmont, Emmitsburg and the north county are small-association territory: private roads, shared wells and community septic, and volunteer boards that need accurate books more than an on-site presence. Mount Airy straddles the Carroll line, so filings follow the parcel, not the mailing address.',
      ],
      atAGlance: [
        { label: 'County seat', value: 'Frederick' },
        { label: 'Government', value: 'Charter county since 2014' },
        { label: 'Communities per manager', value: '8–12' },
        { label: 'Family-owned since', value: '1989' },
      ],
    },
    cities: {
      eyebrow: 'Cities & Towns We Serve',
      title: 'Frederick County coverage, <em>town by town.</em>',
      lede: 'We cover the whole county. The areas below range from the state’s largest new master-planned communities to small rural associations, and the work is different in each.',
      list: [
        { name: 'Frederick', slug: 'frederick', focus: 'Historic-district condo · Incorporated', note: 'County seat; city permitting, Historic Preservation Commission review downtown', tag: 'County seat', hasPage: false },
        { name: 'Urbana', slug: 'urbana', focus: 'Master-planned · Developer transition', note: 'Villages of Urbana and surrounding phases; sub-association structure, turnover work', tag: 'Largest market', hasPage: false },
        { name: 'Ballenger Creek', slug: 'ballenger-creek', focus: 'Townhome HOA · Planned', note: 'Dense townhome and single-family HOAs southwest of the city', hasPage: false },
        { name: 'Brunswick', slug: 'brunswick', focus: 'New build · Incorporated', note: 'Brunswick Crossing and newer phases; incorporated city with its own ordinances', tag: 'Growing', hasPage: false },
        { name: 'Mount Airy', slug: 'mount-airy', focus: 'Split-county · New build', note: 'Straddles the Carroll line; filings follow the parcel’s county', hasPage: false },
        { name: 'New Market', slug: 'new-market', focus: 'Townhome · Incorporated', note: 'Incorporated town; newer townhome and single-family HOAs along I-70', hasPage: false },
        { name: 'Middletown', slug: 'middletown', focus: 'Single-family HOA · Incorporated', note: 'Small single-family HOAs, town ordinances above county code', hasPage: false },
        { name: 'Walkersville', slug: 'walkersville', focus: 'Single-family HOA', note: 'Established single-family HOAs with shared amenities', hasPage: false },
        { name: 'Thurmont & Emmitsburg', slug: 'thurmont', focus: 'Rural · Small association', note: 'Rural HOAs, well & septic, volunteer-heavy boards', hasPage: false },
      ],
    },
    local: {
      eyebrow: 'What’s Different Here',
      title: 'Three Frederick County realities <em>boards get caught by.</em>',
      lede: 'New communities have new problems. These are the three that show up most.',
      cards: [
        { tone: '', meta: 'Developer turnover', title: 'The transition audit', body: 'When control passes from developer to homeowners, the board is owed complete records, a reconciled operating account, reserve contributions actually made, and a punch list of common-element defects still under warranty. Boards that don’t get all four at turnover <strong>pay for it in the first reserve study</strong>. We run the transition as a project with a checklist, not a meeting.' },
        { tone: 'gold', meta: 'City of Frederick', title: 'Municipal permitting & historic review', body: 'Inside city limits, permits and inspections run through the <strong>City of Frederick</strong>, not the county. Associations in the downtown historic district route exterior changes through the <strong>Historic Preservation Commission</strong> before ARC approval means anything. We track both calendars so owners aren’t told yes twice.' },
        { tone: 'sage', meta: 'MD Code Real Prop. §11B', title: 'Reserve study applies to new communities too', body: 'Maryland law requires associations to fund reserves against a current reserve study, and a two-year-old community is not exempt. Developer budgets almost always underfund reserves; the first homeowner board inherits the gap. We commission the baseline study at turnover and build the catch-up into the first budget rather than the fifth.' },
      ],
    },
    services: {
      eyebrow: 'Services in Frederick County',
      title: 'Three service tiers, <em>from turnover onward.</em>',
      lede: 'Pick the level your board needs — the manager, the response time, and the accreditation stay the same.',
      cards: [
        { tone: '', title: 'Full HOA Management', body: 'AAMC-accredited service for single-family, townhome and master-planned communities, including developer-controlled associations through turnover. Financials, vendor management, covenant enforcement, board meetings, 24/7 emergency response.', href: '/hoa-management', cta: 'Full-service details' },
        { tone: 'gold', title: 'Condo Association Management', body: 'For downtown Frederick and Urbana mid-rise and garden-style condo buildings. Master-policy insurance, reserve studies, life-safety compliance, historic-district coordination.', href: '/condo-management', cta: 'Condo services' },
        { tone: 'sage', title: 'Financial Management Only', body: 'For self-managed Frederick County boards that want CPA-led books without giving up operational control. Monthly statements, A/R, audit support, reserve refresh.', href: '/hoa-management/hoa-financial-management', cta: 'Financial-only tier' },
      ],
    },
    faq: [
      { q: 'How is HOA management different in Frederick County than elsewhere in Maryland?', a: 'Two things. <strong>Age of the stock</strong> &mdash; a large share of Frederick associations are under twenty years old and many are still in or just past developer transition, so turnover audits, warranty claims and first reserve baselines dominate. And <strong>jurisdiction</strong> &mdash; the City of Frederick, Brunswick, Middletown, New Market, Thurmont and other incorporated towns run their own permitting above county code, and Mount Airy straddles the Carroll line.' },
      { q: 'Our community is still developer-controlled. Can you start now?', a: 'Yes, and it is the best time to start. Tidewater co-leads a developer management program that runs developer-controlled communities through to homeowner turnover &mdash; records, reserve contributions, warranty tracking and the transition audit are set up before the first homeowner board inherits them.' },
      { q: 'Do you serve all of Frederick County?', a: 'Yes &mdash; Frederick, Urbana, Ballenger Creek, Brunswick, Mount Airy, New Market, Middletown, Walkersville, Thurmont, Emmitsburg and the rural north and west county. Portfolios are capped at 8&ndash;12 communities per manager so site visits are scheduled around your community rather than squeezed in.' },
      { q: 'How quickly can you take over our Frederick County community?', a: 'The controlling factor is the notice period in your current management agreement, not us. Once notice is served we work to a <strong>30/60/90-day</strong> transition plan covering records, bank accounts, vendor assignment and the first reporting cycle. See the <a href="/solutions/switching-hoa-management-company">full transition timeline</a>.' },
      { q: 'What does HOA management cost in Frederick County?', a: 'It depends on community size, vendor count, meeting cadence and complexity, so we quote per association rather than publishing a rate card. <a href="/request-a-proposal">Request a proposal</a> and you will get a line-item number for your community. Smaller rural boards that want professional books without full service can start at our <a href="/hoa-management/hoa-financial-management">financial-only tier</a>.' },
      { q: 'Can we speak with other Frederick County boards first?', a: 'Always. We’ll connect you with 3–5 board presidents from comparable Frederick communities — same size, similar stage. You call them, no script.' },
    ],
    resources: {
      eyebrow: 'Local Resources',
      title: 'The Frederick County offices <em>your board actually deals with.</em>',
      lede: 'New communities meet these offices for the first time at turnover. These are the ones we work with, and what each is actually for.',
      groups: [
        { label: 'Permits, inspections & enforcement', items: [
          { name: 'Division of Planning & Permitting', org: 'Frederick County Government', use: 'Common-area construction permits, pool licensing, and development review outside the incorporated municipalities — including the plats that define what the association actually owns.', href: 'https://www.frederickcountymd.gov/planning' },
          { name: 'Planning & Permitting — City of Frederick', org: 'City of Frederick', use: 'Permits and inspections inside city limits, and the Historic Preservation Commission for the downtown historic district.', href: 'https://www.cityoffrederickmd.gov' },
          { name: 'Stormwater Management', org: 'Frederick County Division of Public Works', use: 'SWM facility inspection cycles and recorded maintenance agreements — standard in every post-2000 Frederick development.', href: 'https://www.frederickcountymd.gov/stormwater' },
        ]},
        { label: 'Records, filings & liens', items: [
          { name: 'Land Records', org: 'Circuit Court for Frederick County', use: 'Recording covenant amendments, bylaw restatements, and association liens. Where a governing-document chain of title gets rebuilt at developer turnover.', href: 'https://www.mdcourts.gov/clerks/frederick' },
          { name: 'Business Entity & Charter Filings', org: 'Maryland SDAT', use: 'Annual corporate filings and good-standing status. Developer-formed associations are frequently out of good standing by turnover — we check this first.', href: 'https://dat.maryland.gov' },
          { name: 'Maryland Homeowners Association Act', org: 'MD Code, Real Property § 11B', use: 'The statute behind disclosure packets, resale certificates, open-meeting rules, developer-transition obligations and the reserve-study cycle.', href: 'https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=grp&section=11b-101' },
        ]},
        { label: 'Utilities & county services', items: [
          { name: 'Division of Water & Sewer Utilities', org: 'Frederick County DWSU', use: 'Water and sewer accounts for common-area meters where public service exists; much of the rural county is on well and septic.', href: 'https://www.frederickcountymd.gov/dwsu' },
          { name: 'Solid Waste & Recycling', org: 'Frederick County Division of Public Works', use: 'Collection eligibility varies by municipality; many associations and towns contract privately. Confirm before budgeting.', href: 'https://www.frederickcountymd.gov/recycling' },
          { name: 'Frederick County Health Department', org: 'Environmental Health', use: 'Shared-well and community-septic obligations in the rural north and west county.', href: 'https://health.frederickcountymd.gov' },
        ]},
        { label: 'Governance & industry', items: [
          { name: 'CAI Chesapeake Chapter', org: 'Community Associations Institute', use: 'Board member education, Maryland legislative tracking, and credentialed-manager standards. Two of our leaders have served as chapter president.', href: 'https://www.caimdches.org' },
          { name: 'Consumer Protection Division', org: 'Maryland Attorney General', use: 'Where owner complaints about association governance land, and the mediation path before litigation.', href: 'https://www.marylandattorneygeneral.gov/Pages/CPD/default.aspx' },
        ]},
      ],
      cityNotes: [
        { city: 'Frederick', note: 'Incorporated city with its own <strong>permitting and inspections</strong>. Associations in the downtown historic district route exterior work through the <strong>Historic Preservation Commission</strong> before an ARC approval means anything.' },
        { city: 'Urbana & Ballenger Creek', note: 'The county’s largest <strong>master-planned communities</strong>. Expect layered sub-associations, recorded stormwater agreements, and in the newest phases, developer transition and warranty work.' },
        { city: 'Mount Airy', note: 'The town straddles the <strong>Frederick–Carroll county line</strong>. Recording, permits, and inspections follow the county the parcel sits in — confirm before filing.' },
        { city: 'Brunswick, Middletown & New Market', note: 'Incorporated towns with their own ordinances layered above county code. Brunswick Crossing adds developer-transition work; Middletown and the rural west are largely on <strong>well and septic</strong>.' },
      ],
    },
    nearby: [
      { name: 'Carroll County', slug: 'carroll-county', note: 'Westminster · Eldersburg · Mount Airy' },
      { name: 'Montgomery County', slug: 'montgomery-county', note: 'Rockville · Bethesda · Germantown' },
      { name: 'Howard County', slug: 'howard-county', note: 'Columbia · Ellicott City · Elkridge' },
      { name: 'Baltimore County', slug: 'baltimore-county', note: 'Towson · Owings Mills · Catonsville' },
    ],
    related: [
      { label: 'Rental management across Maryland', href: '/rental-management/maryland', note: 'For Frederick owners renting out a home inside an association we manage.' },
    ],
    map: { query: 'Frederick County, Maryland', zoom: 9, caption: 'Frederick County, Maryland — Frederick, Urbana, Ballenger Creek, Brunswick, Mount Airy' },
  },
};
