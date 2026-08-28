// src/data/states.ts
//
// State-level HOA hubs for the five markets outside Maryland. Maryland has its
// own hand-built hub at /hoa-management/maryland/index.astro.
//
// SOURCING. Every figure comes from tidewater-master-brief-v2.2:
//   Markets Served — HOA   MD, Washington DC, Virginia, Pennsylvania,
//                          Delaware, West Virginia          (Section 1)
//   450+ communities, six states                            (Section 1)
//   8–12 communities per manager                            (Section 1, v2.2)
//   AAMC(R), family-owned since 1989                        (Section 1)
//   30-min contractual after-hours callback                 (Section 2A)
//   Four insured offices                                    (Section 1)
//   Kate Cornell   Baltimore & DC Metro Regional Director   (Section 2)
//   Don Gentry     Delmarva Regional Director — Eastern
//                  Shore, Ocean City and Delaware           (Section 2)
//
// DELIBERATELY ABSENT: per-state community counts and per-state tenure. The
// brief confirms neither. Pennsylvania is described as a served market in
// Section 1 but Section 5-3 records the PA client count as still pending, so
// its page claims coverage and credentials, never scale.

export interface StateHub {
  slug: string;
  name: string;
  abbr: string;
  seo: { title: string; description: string };
  h1Lead: string;
  h1Accent: string;
  lede: string;
  intro: { title: string; body: string[] };
  regions: { name: string; note: string }[];
  manager?: { name: string; creds: string; initials: string; role: string; bio: string };
  faq: { q: string; a: string }[];
}

/** Shared, brief-sourced. Identical on every state hub by design. */
export const TRUST_STATS = [
  { num: '450+',  label: 'Communities managed across six states' },
  { num: 'AAMC®', label: 'CAI’s highest company accreditation', gold: true },
  { num: '8–12',  label: 'Communities per manager — portfolios capped on purpose' },
];

const SHARED_FAQ = [
  { q: 'Are you accredited?',
    a: 'Yes. Tidewater holds the <strong>Accredited Association Management Company (AAMC®)</strong> designation, CAI’s highest company-level credential, and our managers hold CMCA, AMS and PCAM designations. Tidewater pays credentialing costs up front for staff who pursue them.' },
  { q: 'What happens after hours?',
    a: 'Our emergency line is answered by Tidewater community managers on a rotating on-call schedule, not a third-party answering service. The callback standard is 20 minutes, <strong>contractually guaranteed at 30</strong>.' },
  { q: 'How many communities will our manager be handling?',
    a: 'Portfolios are capped at <strong>8–12 communities per manager</strong>. That cap is the reason a board gets a manager who knows its documents rather than one juggling thirty accounts.' },
];

export const STATES: Record<string, StateHub> = {
  'washington-dc': {
    slug: 'washington-dc', name: 'Washington, DC', abbr: 'DC',
    seo: {
      title: 'HOA & Condo Management in Washington, DC | Tidewater',
      description: 'AAMC-accredited HOA and condominium association management in Washington, DC. Family-owned since 1989, portfolios capped at 8–12 communities per manager.',
    },
    h1Lead: 'HOA & condo management in', h1Accent: 'Washington, DC.',
    lede: 'District condominium boards carry obligations that differ from suburban Maryland in ways that matter — and we manage on both sides of the line. AAMC-accredited, family-owned since 1989.',
    intro: {
      title: 'A District condo board is not a suburban HOA.',
      body: [
        'The District’s housing stock skews heavily toward condominium and co-operative ownership rather than the single-family HOA structure common in the surrounding counties. That changes the work: shared building systems, a master insurance policy that has to line up precisely against unit-owner coverage, and reserve obligations tied to a building envelope rather than to roads and common grounds.',
        'DC also has its own condominium statute and its own regulatory bodies, separate from Maryland’s. A management company that treats a District condo the way it treats a Montgomery County HOA will get the compliance calendar wrong.',
        'Our DC Metro work runs out of the Columbia Pike office alongside Owings Mills — two of the four insured offices we operate.',
      ],
    },
    regions: [
      { name: 'Northwest', note: 'Mid-rise and high-rise condominium associations' },
      { name: 'Capitol Hill', note: 'Historic rowhouse conversions and small associations' },
      { name: 'Navy Yard & Southwest', note: 'Newer construction, developer transition' },
      { name: 'Northeast', note: 'Mixed condo and townhome associations' },
    ],
    manager: {
      name: 'Kate Cornell', creds: 'CMCA®', initials: 'KC',
      role: 'Baltimore & DC Metro Regional Director',
      bio: 'Kate oversees the direction and professional development of the Community Association Management team across the Owings Mills and Columbia Pike offices, and co-leads the developer management program. 15+ years in the industry.',
    },
    faq: [
      { q: 'Do you manage condominiums in the District?',
        a: 'Yes. Washington, DC is one of the six jurisdictions we serve, and roughly half our portfolio is condominium associations rather than single-family HOAs.' },
      ...SHARED_FAQ,
    ],
  },

  virginia: {
    slug: 'virginia', name: 'Virginia', abbr: 'VA',
    seo: {
      title: 'HOA & Condo Association Management in Virginia | Tidewater',
      description: 'AAMC-accredited HOA and condo association management in Virginia. Family-owned since 1989. Portfolios capped at 8–12 communities per manager.',
    },
    h1Lead: 'HOA & condo management in', h1Accent: 'Virginia.',
    lede: 'Virginia is one of the six jurisdictions we manage in. Same accreditation, same portfolio caps, same in-house accounting and collections — under Virginia’s own statutory framework.',
    intro: {
      title: 'Virginia has its own statute, and it is not Maryland’s.',
      body: [
        'Virginia governs property owners’ associations and condominiums under its own acts, with disclosure-packet obligations at resale that differ from Maryland’s resale certificate process in both content and timing. Boards that switch from a manager who works only in Maryland usually discover this at the worst possible moment — mid-transaction.',
        'The practical consequence for a board is that the compliance calendar, the resale process and the assessment-collection path all need to be run by someone who works in Virginia routinely rather than occasionally.',
      ],
    },
    regions: [
      { name: 'Northern Virginia', note: 'Condominium and townhome associations in the DC commuter ring' },
      { name: 'Single-family HOAs', note: 'Covenant enforcement, private roads, common grounds' },
      { name: 'Mixed-use associations', note: 'Commercial and residential components under one regime' },
    ],
    faq: [
      { q: 'Do you manage associations in Virginia?',
        a: 'Yes. Virginia is one of the six jurisdictions we serve for community association management.' },
      ...SHARED_FAQ,
    ],
  },

  pennsylvania: {
    slug: 'pennsylvania', name: 'Pennsylvania', abbr: 'PA',
    seo: {
      title: 'HOA & Condo Association Management in Pennsylvania | Tidewater',
      description: 'AAMC-accredited community association management serving Pennsylvania. Family-owned since 1989, portfolios capped at 8–12 communities per manager.',
    },
    h1Lead: 'HOA & condo management in', h1Accent: 'Pennsylvania.',
    lede: 'Pennsylvania is part of our six-jurisdiction footprint and an active area of growth. Boards here get the same AAMC-accredited operation, the same portfolio caps, and the same in-house accounting.',
    intro: {
      title: 'What a board should ask a manager crossing a state line.',
      body: [
        'Pennsylvania associations operate under their own planned community and condominium statutes. The questions worth asking any management company are the same everywhere, but the answers are state-specific: who handles the assessment-collection path, who holds the reserve accounts, and who is accountable when a filing deadline moves.',
        'Our answer does not change by state. Accounting is in-house rather than outsourced, collections run through our own Maryland-licensed division rather than a third-party agency, and portfolios stay capped at 8–12 communities per manager.',
      ],
    },
    regions: [
      { name: 'South-central PA', note: 'Planned communities and condominium associations' },
      { name: 'Townhome & single-family HOAs', note: 'Covenant enforcement and common-area maintenance' },
      { name: 'Developer transition', note: 'Turnover audits and warranty claims' },
    ],
    faq: [
      { q: 'Do you serve Pennsylvania?',
        a: 'Yes — Pennsylvania is one of the six jurisdictions in our footprint, and an active area of growth for us. The fastest way to find out what we would do for your association is to <a href="/request-a-proposal">request a proposal</a>.' },
      ...SHARED_FAQ,
    ],
  },

  delaware: {
    slug: 'delaware', name: 'Delaware', abbr: 'DE',
    seo: {
      title: 'HOA & Condo Association Management in Delaware | Tidewater',
      description: 'AAMC-accredited HOA and condo association management across Delaware, including the coastal communities. Local Delaware office. Family-owned since 1989.',
    },
    h1Lead: 'HOA & condo management in', h1Accent: 'Delaware.',
    lede: 'Coastal Delaware associations run on a different calendar to inland ones — seasonal population, weather exposure, and amenity seasons that compress the maintenance year. We staff Delaware from a Delaware office.',
    intro: {
      title: 'Coastal associations run on a seasonal clock.',
      body: [
        'A beach-adjacent association does most of its wear in fourteen weeks and most of its work in the other thirty-eight. Pool openings and closings, amenity turnover, storm exposure and an owner base that is substantially non-resident all change what good management looks like — and make communication cadence more important than it is inland.',
        'Delaware is covered by one of our four insured offices, under the Delmarva regional team that also runs the Maryland Eastern Shore and Ocean City portfolio.',
      ],
    },
    regions: [
      { name: 'Lewes & Rehoboth', note: 'Coastal condominium and single-family associations' },
      { name: 'Sussex County', note: 'Year-round and seasonal communities' },
      { name: 'Inland Delaware', note: 'Townhome and single-family HOAs' },
    ],
    manager: {
      name: 'Don Gentry', creds: 'CMCA® · AMS® · PCAM®', initials: 'DG',
      role: 'Delmarva Regional Director',
      bio: 'Don oversees the Eastern Shore, Ocean City and Delaware portfolio. 20+ years across customer service and real estate, with a background as a hotel general manager, building engineer and government contract specialist, and a Community Association Portfolio Manager since 2006.',
    },
    faq: [
      { q: 'Do you have a Delaware office?',
        a: 'Yes. Delaware is one of our four insured office locations, and the portfolio is run by our Delmarva regional team rather than remotely from Maryland.' },
      ...SHARED_FAQ,
    ],
  },

  'west-virginia': {
    slug: 'west-virginia', name: 'West Virginia', abbr: 'WV',
    seo: {
      title: 'HOA & Condo Association Management in West Virginia',
      description: 'AAMC-accredited community association management serving West Virginia. Family-owned since 1989, portfolios capped at 8–12 communities per manager.',
    },
    h1Lead: 'HOA & condo management in', h1Accent: 'West Virginia.',
    lede: 'West Virginia completes our six-jurisdiction footprint. The same AAMC-accredited operation, in-house accounting, and capped portfolios that our Maryland boards get.',
    intro: {
      title: 'Smaller associations, the same obligations.',
      body: [
        'Association size does not reduce what a board is responsible for. The books still have to reconcile, the reserve plan still has to hold up to scrutiny, and covenant enforcement still has to be even-handed enough to survive a challenge. What changes is how much overhead an association can carry to get there.',
        'That is the reason we run a financial-only tier as a first-class service rather than a stripped-down one: a board that wants to keep running its own operations can still have a real finance department behind it.',
      ],
    },
    regions: [
      { name: 'Eastern Panhandle', note: 'Planned communities in the DC commuter ring' },
      { name: 'Single-family HOAs', note: 'Common-area maintenance and covenant enforcement' },
      { name: 'Condominium associations', note: 'Shared building systems and master insurance' },
    ],
    faq: [
      { q: 'Do you serve West Virginia?',
        a: 'Yes — West Virginia is one of the six jurisdictions in our community association management footprint.' },
      ...SHARED_FAQ,
    ],
  },
};

export const STATE_LIST = Object.values(STATES);
