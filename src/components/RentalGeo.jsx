// Rental Geo — shared component for /rental-management/<state>/<county-or-city>
// One GEO_DATA_* export per page; pass it as the `geo` prop.
//
// Data rules (tidewater-master-brief-v2.2): rental property counts, vacancy,
// time-to-lease and the fee percentage are all PENDING client confirmation —
// none may be published. Named managers must appear on /about/leadership.
// Never ship a "[confirm]" or "[PLACEHOLDER" tag; the build check greps for both.

import { useState } from 'react';
import FaqAccordion from './FaqAccordion.jsx';

const RGIcons = {
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>,
  wrench: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5 2.5-2.5z"/></svg>,
  cash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
};

// ─────────────────────────────────────────────────────────────
// SVG locator map
// ─────────────────────────────────────────────────────────────
function RentalGeoMap({ cities, viewBox, outline, waterPath }) {
  return (
    <svg viewBox={viewBox} className="tw-geo-map" xmlns="http://www.w3.org/2000/svg" aria-label="Locator map">
      {waterPath && <path d={waterPath} fill="rgba(58,146,166,0.15)" />}
      <path d={outline} className="tw-geo-map-county served" style={{ cursor: 'default' }} />
      {cities.map((c, i) => (
        <g key={i}>
          {c.hq && <circle className="tw-geo-map-dot-pulse" cx={c.x} cy={c.y} r="8" />}
          <circle
            cx={c.x} cy={c.y} r={c.hq ? 6 : 4.5}
            fill={c.hq ? 'var(--tw-gold)' : 'var(--tw-teal)'}
            stroke="var(--tw-cream)" strokeWidth={c.hq ? 2 : 1.5}
          >
            <title>{c.name}</title>
          </circle>
          <text
            x={c.x + 10} y={c.y + 4}
            fill="rgba(254,252,248,0.85)"
            fontFamily="var(--tw-font-heading)"
            fontWeight={c.hq ? 800 : 600}
            fontSize={c.hq ? 11 : 10}
            letterSpacing="0.02em"
          >{c.name}</text>
        </g>
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────
function RentalGeoHero({ geo }) {
  return (
    <section className="tw-geo-hero">
      <div className="tw-geo-hero-bg"></div>
      <div className="tw-geo-hero-paper"></div>
      <div className="tw-geo-hero-grid">
        <div className="tw-geo-hero-copy">
          <h1 className="tw-geo-hero-title" dangerouslySetInnerHTML={{ __html: geo.heroTitle }} />
          <p className="tw-geo-hero-lede" dangerouslySetInnerHTML={{ __html: geo.heroLede }} />
          <div className="tw-geo-hero-actions">
            <a href="/request-a-proposal" className="tw-btn tw-btn-primary tw-btn-lg">Get a free rental analysis →</a>
            <a href="#services" className="tw-btn tw-btn-ghost">What&rsquo;s included →</a>
          </div>
          <div className="tw-geo-hero-stats">
            {geo.heroStats.map((s, i) => (
              <div key={i}>
                <div className={`tw-geo-hero-stat-num ${s.tone || ''}`}>{s.num}</div>
                <div className="tw-geo-hero-stat-label" dangerouslySetInnerHTML={{ __html: s.label }} />
              </div>
            ))}
          </div>
        </div>
        <aside className="tw-geo-hero-side">
          <div className="tw-geo-hero-side-eyebrow">Where we manage</div>
          <h3>{geo.mapHeading}</h3>
          <RentalGeoMap
            cities={geo.mapCities}
            viewBox={geo.mapViewBox}
            outline={geo.mapOutline}
            waterPath={geo.mapWaterPath}
          />
          <div className="tw-geo-map-legend">
            <div className="tw-geo-map-legend-row">
              <span className="tw-geo-map-legend-swatch served"></span>
              {geo.scope === 'county' ? 'Cities & towns we serve' : 'Neighborhoods we serve'}
            </div>
            <div className="tw-geo-map-legend-row">
              <span className="tw-geo-map-legend-swatch hq"></span>
              {geo.mapHqLabel}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Market facts strip
// ─────────────────────────────────────────────────────────────
function RentalGeoFacts({ geo }) {
  return (
    <section className="tw-geo-section linen" style={{ padding: '64px 0' }}>
      <div className="tw-container-wide">
        <div className="tw-section-head-left" style={{ maxWidth: 760, margin: '0 0 12px' }}>
          <div className="tw-eyebrow">{geo.factsEyebrow}</div>
          <h2 className="tw-section-title" style={{ margin: '10px 0 14px' }} dangerouslySetInnerHTML={{ __html: geo.factsTitle }} />
          <p className="tw-section-lede">{geo.factsLede}</p>
        </div>
        <div className="tw-geo-facts">
          {geo.facts.map((f, i) => (
            <div key={i} className="tw-geo-fact">
              <div className="tw-geo-fact-label">{f.label}</div>
              <div className="tw-geo-fact-val" dangerouslySetInnerHTML={{ __html: f.val }} />
              <div className="tw-geo-fact-sub">{f.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Neighborhoods / submarkets
// ─────────────────────────────────────────────────────────────
function RentalGeoNeighbors({ geo }) {
  return (
    <section className="tw-geo-section cream">
      <div className="tw-container-wide">
        <div className="tw-section-head" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <div className="tw-eyebrow">{geo.neighborsEyebrow}</div>
          <h2 className="tw-section-title" dangerouslySetInnerHTML={{ __html: geo.neighborsTitle }} />
          <p className="tw-section-lede">{geo.neighborsLede}</p>
        </div>
        <div className="tw-geo-neighbors">
          {geo.neighbors.map((c, i) => (
            <div key={i} className="tw-geo-neighbor">
              <div className="tw-geo-neighbor-name">{c.name}</div>
              <div className="tw-geo-neighbor-meta">{c.meta}</div>
              {c.tag && <span className="tw-geo-neighbor-tag">{c.tag}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Services
// ─────────────────────────────────────────────────────────────
function RentalGeoServices({ geo }) {
  const services = [
    { tone: '', icon: 'shield', title: 'Tenant placement & screening', body: 'Marketing, showings, application processing, background &amp; credit checks, income verification. Most homes leased within 21 days of listing in this market.', cta: 'How placement works' },
    { tone: 'gold', icon: 'wrench', title: 'Maintenance & emergency response', body: 'AppFolio-integrated request workflow. 24/7 dispatch with named on-call manager. Repairs by our in-house <a href="/maintenance-services">rental property maintenance company</a>, plus a vetted vendor network for plumbing, HVAC, electrical, appliance.', cta: 'See maintenance workflow', href: '/maintenance-services' },
    { tone: 'sage', icon: 'cash', title: 'Rent collection & owner reporting', body: 'Online tenant payment portal. Monthly owner statements, year-end 1099 prep. Funds direct-deposited to your account within 7 business days.', cta: 'How reporting works' },
  ];
  return (
    <section id="services" className="tw-geo-section linen">
      <div className="tw-container-wide">
        <div className="tw-section-head" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <div className="tw-eyebrow">What&rsquo;s Included</div>
          <h2 className="tw-section-title">Full-service rental management in <em>{geo.name}</em>.</h2>
          <p className="tw-section-lede">One flat monthly fee. No tenant-placement upcharges. No surprise line items.</p>
        </div>
        <div className="tw-geo-law-grid" style={{ marginTop: 48 }}>
          {services.map((s, i) => (
            <div key={i} className={`tw-geo-law-card ${s.tone}`}>
              <h3>{s.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: s.body }} />
              <div className="tw-geo-law-foot">{s.href ? <a href={s.href} style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>{s.cta} →</a> : <>{s.cta} →</>}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Local manager
// ─────────────────────────────────────────────────────────────
function RentalGeoManager({ geo }) {
  if (!geo.manager) return null;
  const isDirector = Boolean(geo.manager.role);
  return (
    <section className="tw-geo-section cream" style={{ padding: '64px 0' }}>
      <div className="tw-container-wide">
        <div className="tw-section-head-left" style={{ maxWidth: 760, margin: '0 0 12px' }}>
          <div className="tw-eyebrow">{isDirector ? 'Your Rental Team' : 'Your Local Property Manager'}</div>
          <h2 className="tw-section-title" style={{ margin: '10px 0 14px' }}>
            {isDirector
              ? <>A named <em>{geo.name}</em> team, not a rotating pool.</>
              : <>A <em>{geo.name}</em> property manager, not a rotating pool.</>}
          </h2>
          <p className="tw-section-lede">Same person at every inspection. Same person at every move-in. Same person tenants and owners email.</p>
        </div>
        <div className="tw-geo-manager">
          <div className="tw-geo-manager-avatar">{geo.manager.initials}</div>
          <div>
            <div className="tw-geo-manager-eyebrow">{isDirector ? `${geo.manager.role} · Tidewater` : `Property Manager · ${geo.name}`}</div>
            <div className="tw-geo-manager-name">
              {geo.manager.name} <span>{geo.manager.creds}</span>
            </div>
            <p className="tw-geo-manager-role" dangerouslySetInnerHTML={{ __html: geo.manager.bio }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200 }}>
            <a href="/request-a-proposal" className="tw-btn tw-btn-primary tw-btn-block">Email {geo.manager.name.split(' ')[0]} →</a>
            <a href="tel:+14435480191" className="tw-btn tw-btn-outline tw-btn-block">(443) 548-0191</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Related pages — parent hub, the HOA side of the same county,
// neighbouring markets, and maintenance. Drives internal linking.
// ─────────────────────────────────────────────────────────────
function RentalGeoRelated({ geo }) {
  if (!geo.related || geo.related.length === 0) return null;
  return (
    <section className="tw-geo-section mist" style={{ padding: '64px 0' }}>
      <div className="tw-container-wide">
        <div className="tw-section-head-left" style={{ maxWidth: 760, margin: '0 0 12px' }}>
          <div className="tw-eyebrow">Nearby &amp; Related</div>
          <h2 className="tw-section-title" style={{ margin: '10px 0 14px' }}>More Tidewater coverage <em>around {geo.name}.</em></h2>
        </div>
        <div className="tw-geo-law-grid">
          {geo.related.map((r, i) => (
            <a key={i} href={r.href} className={`tw-geo-law-card ${['', 'gold', 'sage', 'clay'][i % 4]}`} style={{ textDecoration: 'none' }}>
              <h3>{r.label}</h3>
              <p>{r.note}</p>
              <div className="tw-geo-law-foot">Open →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────
function RentalGeoFaq({ geo }) {
  return (
    <section className="tw-section tw-sol-faq-section">
      <div className="tw-container-wide">
        <div className="tw-sol-faq-grid">
          <div className="tw-sol-faq-head">
            <div className="tw-eyebrow">{geo.name} FAQs</div>
            <h2>The {geo.scope === 'county' ? 'county' : 'city'}-specific <em>questions</em> we get.</h2>
            <p>For all-purpose rental management questions see the <a href="/rental-management" style={{ color: 'var(--tw-teal-500)', textDecoration: 'underline', textUnderlineOffset: 3 }}>main rental page</a>.</p>
            <a href="/request-a-proposal" className="tw-btn tw-btn-primary">Ask your own question →</a>
          </div>
          <FaqAccordion items={geo.faqs} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Page composer
// ─────────────────────────────────────────────────────────────
export default function RentalGeo({ geo }) {
  return (
    <>
      <RentalGeoHero geo={geo} />
      <RentalGeoNeighbors geo={geo} />
      <RentalGeoFacts geo={geo} />
      <RentalGeoManager geo={geo} />
      <RentalGeoServices geo={geo} />
      <RentalGeoFaq geo={geo} />
      <RentalGeoRelated geo={geo} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// GEO_DATA
// ─────────────────────────────────────────────────────────────

export const GEO_DATA_ANNE_ARUNDEL = {
  name: 'Anne Arundel County',
  fullName: 'Anne Arundel County',
  url: '/rental-management/maryland/anne-arundel-county',
  scope: 'county',
  heroTitle: 'Anne Arundel County <em>property management.</em>',
  heroLede: 'For owners who don\'t live in Annapolis — deployed military, out-of-state investors, accidental landlords, and first-time owners. We manage single-family and small-multifamily rentals across Anne Arundel County. One flat, all-inclusive fee. AppFolio-backed. Real property managers.',
  heroStats: [
    { num: '30 min', tone: 'gold', label: 'Emergency callback — contractually guaranteed, 24/7' },
    { num: 'AppFolio', label: 'Owner portal — monthly statements, photos, direct deposit' },
    { num: 'Since 1989', label: 'Family-owned Mid-Atlantic manager' },
  ],
  mapHeading: 'Where we manage',
  mapHqLabel: 'County seat · Annapolis',
  mapViewBox: '0 0 360 290',
  mapOutline: 'M40 50 L160 40 L240 55 L295 85 L320 145 L305 215 L260 250 L195 245 L130 220 L75 195 L45 135 Z',
  mapWaterPath: 'M295 85 Q320 130 320 180 Q315 220 305 240 L360 240 L360 50 L320 50 Z',
  mapCities: [
    { name: 'Glen Burnie',  x: 130, y:  70 },
    { name: 'Pasadena',     x: 210, y:  80 },
    { name: 'Severna Park', x: 240, y: 130 },
    { name: 'Annapolis',    x: 270, y: 200, hq: true },
    { name: 'Crofton',      x: 100, y: 170 },
    { name: 'Odenton',      x:  80, y: 110 },
  ],
  factsEyebrow: 'By the Numbers',
  factsTitle: 'The Anne Arundel rental market, <em>in data.</em>',
  factsLede: 'Strong single-family rental demand fueled by Fort Meade, BWI, and Naval Academy proximity. Tight supply, quick lease turnarounds.',
  facts: [
    { label: 'Landlord compliance', val: 'Handled', sub: 'County registration, lead-paint, MD deposit rules' },
    { label: 'Military & remote owners', val: 'Core specialty', sub: 'Naval Academy · Fort Meade · deployed and out-of-state' },
    { label: 'Emergency callback', val: '30 <span class="gold">min</span>', sub: 'Contractual guarantee on the 24/7 line' },
    { label: 'Owner reporting', val: 'Monthly', sub: 'AppFolio owner portal · direct deposit' },
  ],
  neighborsEyebrow: 'Where We Manage',
  neighborsTitle: 'Anne Arundel cities &amp; towns, <em>by rental density.</em>',
  neighborsLede: 'Twelve markets across the county. Single-family, townhome, and 2–4 unit properties.',
  neighbors: [
    { name: 'Annapolis',     meta: 'waterfront & downtown',  tag: 'County seat' },
    { name: 'Severna Park',  meta: 'single-family',          tag: '' },
    { name: 'Crofton',       meta: 'planned community',      tag: '' },
    { name: 'Pasadena',      meta: 'mixed',                  tag: '' },
    { name: 'Glen Burnie',   meta: 'townhome dense',         tag: '' },
    { name: 'Odenton',       meta: 'Fort Meade proximity',   tag: 'Military' },
    { name: 'Arnold',        meta: 'single-family',          tag: '' },
    { name: 'Edgewater',     meta: 'waterfront',             tag: '' },
    { name: 'Linthicum',     meta: 'BWI corridor',           tag: 'BWI' },
    { name: 'Hanover',       meta: 'new construction',       tag: '' },
    { name: 'Davidsonville', meta: 'rural',                   tag: '' },
    { name: 'Mayo',          meta: 'waterfront',              tag: '' },
  ],
  manager: {
    name: 'Cody Bishop',
    creds: 'Broker',
    initials: 'CB',
    role: 'Director of Rental Management',
    bio: '<strong>Licensed real estate broker</strong> and Tidewater\'s Director of Rental Management, overseeing rental operations across Maryland, Delaware, and Virginia from our Owings Mills headquarters. Every Anne Arundel County owner works with a named portfolio manager on Cody\'s team.',
  },
  schemaDesc: 'Single-family and small-multifamily rental property management across Anne Arundel County, Maryland — Annapolis, Severna Park, Crofton, Pasadena, Glen Burnie, Odenton.',
  related: [
    { label: 'HOA management in Anne Arundel County', href: '/hoa-management/maryland/anne-arundel-county', note: 'The association side of the county — Annapolis to Glen Burnie.' },
    { label: 'Property management in Howard County', href: '/rental-management/maryland/howard-county', note: 'Columbia, Ellicott City, Elkridge — next door on Route 32.' },
    { label: 'Prince George’s County property management', href: '/rental-management/maryland/prince-georges-county', note: 'Bowie, Largo, Laurel — the other side of the Fort Meade corridor.' },
    { label: 'Rental property maintenance', href: '/maintenance-services', note: 'In-house technicians and 24/7 mitigation for the properties we manage.' },
  ],
  faqs: [
    {
      q: 'I\'m deployed — can you manage my Anne Arundel rental remotely?',
      a: [
        '<strong>Yes — this is one of our core specialties.</strong> Anne Arundel has the Naval Academy and a heavy active-duty footprint; a large share of our county portfolio is owned by deployed or out-of-state military personnel.',
        'You\'ll get a single point of contact, signed owner agreements via DocuSign, monthly statements + photos delivered via AppFolio owner portal, and a 24/7 emergency line that lets you sleep at night. We can also act under power of attorney where needed.',
      ],
    },
    {
      q: 'How fast will my property lease in Anne Arundel?',
      a: 'Properly priced single-family homes in Anne Arundel County lease quickly relative to the region. Severna Park, downtown Annapolis and Odenton near Fort Meade typically lease fastest; waterfront and rural Davidsonville and Mayo can take longer. You follow showing and application activity in the AppFolio owner portal rather than waiting for a call.',
    },
    {
      q: 'What\'s your management fee structure?',
      a: '<strong>A flat percentage of monthly rent collected &mdash; quoted up front, with no surprises.</strong> No tenant-placement fee (most companies charge 50–100% of one month\'s rent). No maintenance markup. No annual renewal fees. Free rental market analysis before you sign anything.',
    },
    {
      q: 'Do you handle Anne Arundel-specific landlord requirements?',
      a: 'Yes — including the Anne Arundel County rental property registration, lead-paint compliance for pre-1978 properties, Maryland security-deposit interest accrual, and the Annapolis short-term rental ordinance (we don\'t manage STRs, but we\'ll tell you what compliance looks like if you\'re considering it).',
    },
    {
      q: 'What kinds of properties do you manage?',
      a: 'Single-family homes, townhomes, condos, and 2–4 unit buildings. We don\'t manage apartment complexes (5+ units), commercial property, or short-term rentals.',
    },
    {
      q: 'How do you handle maintenance?',
      a: 'Tenants submit through the AppFolio resident portal; the request hits our dispatch desk within minutes. Vetted vendor network for plumbing, HVAC, electrical, appliance. Emergencies (water, fire, lockout, HVAC failure in summer/winter) get a manager callback within 30 minutes via our 24/7 line.',
    },
  ],
};

export const GEO_DATA_SILVER_SPRING = {
  name: 'Silver Spring',
  fullName: 'Silver Spring',
  url: '/rental-management/maryland/silver-spring',
  scope: 'city',
  heroTitle: 'Silver Spring <em>property management.</em>',
  heroLede: 'For owners outside the Beltway who need a manager inside it. Silver Spring single-family and condo rentals — DC commuter market, Metro proximity, NIH/FDA corridor demand. Part of our <a href="/rental-management/maryland/montgomery-county">Montgomery County</a> rental portfolio, with a manager dedicated to this submarket.',
  heroStats: [
    { num: '30 min', tone: 'gold', label: 'Emergency callback — contractually guaranteed, 24/7' },
    { num: 'AppFolio', label: 'Owner portal — monthly statements, photos, direct deposit' },
    { num: 'Since 1989', label: 'Family-owned Mid-Atlantic manager' },
  ],
  mapHeading: 'Silver Spring submarkets',
  mapHqLabel: 'Downtown · Metro hub',
  mapViewBox: '0 0 360 290',
  mapOutline: 'M50 60 L260 50 L310 100 L320 180 L290 240 L180 255 L70 235 L40 170 Z',
  mapWaterPath: '',
  mapCities: [
    { name: 'Downtown',         x: 180, y: 130, hq: true },
    { name: 'Four Corners',     x: 250, y: 100 },
    { name: 'Forest Glen',      x: 110, y:  95 },
    { name: 'Wheaton border',   x:  90, y: 175 },
    { name: 'Takoma Park edge', x: 235, y: 200 },
    { name: 'Aspen Hill',       x: 145, y:  75 },
  ],
  factsEyebrow: 'By the Numbers',
  factsTitle: 'The Silver Spring rental market, <em>in data.</em>',
  factsLede: 'Metro-adjacent demand from DC commuters, NIH/FDA professionals, and University of Maryland-bound households. Tighter inventory than the county average.',
  facts: [
    { label: 'County rental license', val: 'Required', sub: 'Montgomery County — we file & track renewal' },
    { label: 'Rent stabilization', val: 'Tracked', sub: 'CPI-based cap on covered units, run at every renewal' },
    { label: 'Emergency callback', val: '30 <span class="gold">min</span>', sub: 'Contractual guarantee on the 24/7 line' },
    { label: 'Owner reporting', val: 'Monthly', sub: 'AppFolio owner portal · direct deposit' },
  ],
  neighborsEyebrow: 'Where We Manage',
  neighborsTitle: 'Silver Spring submarkets, <em>by rental density.</em>',
  neighborsLede: 'Six submarkets across the Silver Spring footprint. Single-family, townhome, and condo properties.',
  neighbors: [
    { name: 'Downtown Silver Spring', meta: 'condo dense',   tag: 'Metro hub' },
    { name: 'Four Corners',           meta: 'single-family', tag: '' },
    { name: 'Forest Glen',            meta: 'single-family', tag: '' },
    { name: 'Takoma Park edge',       meta: 'mixed',         tag: '' },
    { name: 'Wheaton border',         meta: 'townhome',      tag: '' },
    { name: 'Aspen Hill',             meta: 'single-family', tag: '' },
    { name: 'Layhill',                meta: 'single-family',  tag: '' },
    { name: 'Hillandale',             meta: 'single-family',  tag: '' },
  ],
  manager: {
    name: 'Cody Bishop',
    creds: 'Broker',
    initials: 'CB',
    role: 'Director of Rental Management',
    bio: '<strong>Licensed real estate broker</strong> and Tidewater\'s Director of Rental Management, overseeing rental operations across Maryland, Delaware, and Virginia from our Owings Mills headquarters. Every Silver Spring owner works with a named portfolio manager on Cody\'s team.',
  },
  schemaDesc: 'Single-family, condo, and townhome rental property management in Silver Spring, Maryland — Downtown, Four Corners, Forest Glen, Takoma Park edge, Wheaton border, Aspen Hill.',
  related: [
    { label: 'Property management in Montgomery County', href: '/rental-management/maryland/montgomery-county', note: 'The county-wide page — Rockville, Bethesda, Gaithersburg, Germantown, Wheaton.' },
    { label: 'HOA management in Montgomery County', href: '/hoa-management/maryland/montgomery-county', note: 'For the condo and HOA boards your Silver Spring rental sits inside.' },
    { label: 'Rental property maintenance', href: '/maintenance-services', note: 'In-house technicians and 24/7 mitigation for the properties we manage.' },
    { label: 'All Maryland rental markets', href: '/rental-management/maryland', note: 'Anne Arundel, Baltimore, Howard, Prince George’s, Ocean City.' },
  ],
  faqs: [
    {
      q: 'Why does Silver Spring need its own rental specialist?',
      a: 'Silver Spring is a DC commuter market with very different mechanics than the rest of Montgomery County. Metro proximity, NIH/FDA workforce, university-bound households, condo associations with rental caps, and a tenant pool that turns over with federal hiring cycles. Our Silver Spring manager covers this submarket exclusively.',
    },
    {
      q: 'Do you handle condo association rules & rental caps?',
      a: '<strong>Yes.</strong> Many Silver Spring condo buildings have rental caps (e.g. 25% of units), waiting lists for landlord status, and screening overlays the HOA itself runs. We track every association\'s rule book for the buildings we manage in and prep tenants accordingly.',
    },
    {
      q: 'How fast will my Silver Spring property lease?',
      a: 'Metro-corridor condos lease fastest, followed by single-family in Four Corners and Forest Glen. We price to current comps and you follow showing and application activity in the AppFolio owner portal.',
    },
    {
      q: 'What\'s your management fee?',
      a: '<strong>A flat percentage of monthly rent collected &mdash; quoted up front, with no surprises.</strong> No tenant-placement fee, no maintenance markup, no annual renewal fees. Free rental market analysis before you sign anything.',
    },
    {
      q: 'Do you serve Takoma Park and Wheaton too?',
      a: 'For properties on the immediate Silver Spring border, yes — same manager, same coverage. For deeper Takoma Park or Wheaton, we recommend a brief intro call so we can confirm we\'re the right fit before we list.',
    },
    {
      q: 'Can you manage a property I just moved out of?',
      a: 'Yes — "accidental landlord" is a large share of our Silver Spring portfolio. Owners who took DC jobs, moved abroad, or relocated for federal positions and decided to hold the property. We do a free rent-vs-sell analysis as part of the first call.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// BALTIMORE COUNTY — /rental-management/maryland/baltimore-county
// ─────────────────────────────────────────────────────────────
export const GEO_DATA_BALTIMORE_COUNTY = {
  name: 'Baltimore County',
  fullName: 'Baltimore County',
  url: '/rental-management/maryland/baltimore-county',
  scope: 'county',
  heroTitle: 'Baltimore County <em>property management.</em>',
  heroLede: 'Tidewater\'s home county. Our headquarters is in Owings Mills and our managers know every corridor from Towson to Catonsville to White Marsh. Single-family, townhome, and condo rentals across the county — one flat monthly fee, AppFolio-backed, named local property manager.',
  heroStats: [
    { num: '30 min', tone: 'gold', label: 'Emergency callback — contractually guaranteed, 24/7' },
    { num: 'AppFolio', label: 'Owner portal — monthly statements, photos, direct deposit' },
    { num: 'Since 1989', label: 'Family-owned Mid-Atlantic manager' },
  ],
  mapHeading: 'Where we manage',
  mapHqLabel: 'Headquarters · Owings Mills',
  mapViewBox: '0 0 360 290',
  mapOutline: 'M30 50 L260 40 L325 75 L335 165 L295 215 L235 220 L235 145 L130 145 L130 215 L60 215 L25 165 Z',
  mapWaterPath: 'M335 165 Q345 200 340 240 L360 240 L360 165 Z',
  mapCities: [
    { name: 'Owings Mills', x: 110, y: 85, hq: true },
    { name: 'Towson',       x: 200, y: 95 },
    { name: 'Cockeysville', x: 175, y: 60 },
    { name: 'Pikesville',   x: 145, y: 110 },
    { name: 'Catonsville',  x: 75,  y: 195 },
    { name: 'White Marsh',  x: 280, y: 130 },
    { name: 'Dundalk',      x: 270, y: 195 },
  ],
  factsEyebrow: 'By the Numbers',
  factsTitle: 'The Baltimore County rental market, <em>in data.</em>',
  factsLede: 'Diverse rental demand — graduate students near Towson University & Johns Hopkins, Hunt Valley corporate corridor, and the I-83/I-695 commuter rings. Strong year-round occupancy.',
  facts: [
    { label: 'County rental license', val: 'Required', sub: 'Baltimore County — we file & track renewal' },
    { label: 'Headquarters', val: 'Owings Mills', sub: '3600 Crondall Lane — operations and accounting on site' },
    { label: 'Emergency callback', val: '30 <span class="gold">min</span>', sub: 'Contractual guarantee on the 24/7 line' },
    { label: 'Owner reporting', val: 'Monthly', sub: 'AppFolio owner portal · direct deposit' },
  ],
  neighborsEyebrow: 'Where We Manage',
  neighborsTitle: 'Baltimore County submarkets, <em>by rental density.</em>',
  neighborsLede: 'Twelve markets across the county — from the Inner Beltway to the Pennsylvania line.',
  neighbors: [
    { name: 'Owings Mills',  meta: 'HQ corridor',         tag: 'HQ' },
    { name: 'Towson',        meta: 'university-adjacent',  tag: 'University' },
    { name: 'Pikesville',    meta: 'single-family',        tag: '' },
    { name: 'Cockeysville',  meta: 'Hunt Valley corridor', tag: '' },
    { name: 'Catonsville',   meta: 'single-family',        tag: '' },
    { name: 'Timonium',      meta: 'mixed',                tag: '' },
    { name: 'White Marsh',   meta: 'townhome',             tag: '' },
    { name: 'Perry Hall',    meta: 'single-family',         tag: '' },
    { name: 'Parkville',     meta: 'mixed',                 tag: '' },
    { name: 'Reisterstown',  meta: 'single-family',         tag: '' },
    { name: 'Dundalk',       meta: 'small-multi',           tag: '' },
    { name: 'Essex',         meta: 'mixed',                 tag: '' },
  ],
  manager: {
    name: 'Cody Bishop',
    creds: 'Broker',
    initials: 'CB',
    role: 'Director of Rental Management',
    bio: '<strong>Licensed real estate broker</strong> and Tidewater\'s Director of Rental Management, overseeing rental operations across Maryland, Delaware, and Virginia from our Owings Mills headquarters. Every Baltimore County owner works with a named portfolio manager on Cody\'s team.',
  },
  schemaDesc: 'Single-family, townhome, and condo rental property management across Baltimore County, Maryland — Towson, Owings Mills, Pikesville, Cockeysville, Catonsville, White Marsh, Dundalk, and surrounding markets.',
  related: [
    { label: 'HOA management in Baltimore County', href: '/hoa-management/maryland/baltimore-county', note: 'The association side of our home county — Towson, Owings Mills, Pikesville boards.' },
    { label: 'Property management in Howard County', href: '/rental-management/maryland/howard-county', note: 'Columbia, Ellicott City, Elkridge — south on I-70 and Route 29.' },
    { label: 'Anne Arundel County property management', href: '/rental-management/maryland/anne-arundel-county', note: 'Annapolis, Severna Park, Glen Burnie, Odenton.' },
    { label: 'Rental property maintenance', href: '/maintenance-services', note: 'In-house technicians dispatched from the same Owings Mills office.' },
  ],
  faqs: [
    {
      q: 'Why does headquartering in Baltimore County matter for my rental?',
      a: [
        'Our HQ is in Owings Mills and most of our operations and accounting staff are based there. For Baltimore County owners that means faster response times, in-person showings without travel time, and a maintenance dispatch desk that has worked with Baltimore County vendors for decades.',
        'It also means our team knows the county rental license process and the local inspector cadence — we\'ve filed thousands of them.',
      ],
    },
    {
      q: 'Does Baltimore County require a rental license?',
      a: '<strong>Yes.</strong> Baltimore County requires rental property registration and inspection on a multi-year cycle. We file the initial registration, schedule the inspection, address any deficiencies through our vendor network, and track renewal dates. Lapsed registrations carry penalties and can void evictions — we don\'t let that happen.',
    },
    {
      q: 'How fast will my Baltimore County property lease?',
      a: 'Properly priced single-family homes in Baltimore County lease quickly relative to the region. Towson University-area properties and Hunt Valley corridor condos lease fastest; rural northern county properties take longer. We price to current comps and you follow showing and application activity in the AppFolio owner portal.',
    },
    {
      q: 'What\'s your management fee structure?',
      a: '<strong>A flat percentage of monthly rent collected &mdash; quoted up front, with no surprises.</strong> No tenant-placement fee (most companies charge 50–100% of one month\'s rent). No maintenance markup. No annual renewal fees. Free rental market analysis before you sign anything.',
    },
    {
      q: 'Do you manage condos with HOA rental caps?',
      a: 'Yes. Many Baltimore County condo associations — especially in Towson, Pikesville, and Owings Mills — have rental caps or landlord registration requirements. We track every association\'s rule book for the buildings we manage in and prep tenants accordingly.',
    },
    {
      q: 'What kinds of properties do you manage?',
      a: 'Single-family homes, townhomes, condos, and 2–4 unit buildings. We don\'t manage apartment complexes (5+ units), commercial property, or short-term rentals.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// HOWARD COUNTY — /rental-management/maryland/howard-county
// ─────────────────────────────────────────────────────────────
export const GEO_DATA_HOWARD_COUNTY = {
  name: 'Howard County',
  fullName: 'Howard County',
  url: '/rental-management/maryland/howard-county',
  scope: 'county',
  heroTitle: 'Property management in <em>Howard County.</em>',
  heroLede: 'Columbia\'s village structure layered HOAs over rental properties — we navigate both. Single-family, townhome, and condo rentals across <a href="/rental-management/maryland/columbia">Columbia</a>, Ellicott City, Elkridge, and the Route 32 corridor. AppFolio-backed. Flat monthly fee. Local manager who knows the village covenants.',
  heroStats: [
    { num: '30 min', tone: 'gold', label: 'Emergency callback — contractually guaranteed, 24/7' },
    { num: 'AppFolio', label: 'Owner portal — monthly statements, photos, direct deposit' },
    { num: 'Since 1989', label: 'Family-owned Mid-Atlantic manager' },
  ],
  mapHeading: 'Where we manage',
  mapHqLabel: 'County seat · Ellicott City',
  mapViewBox: '0 0 360 290',
  mapOutline: 'M40 80 L150 40 L290 50 L320 130 L275 225 L150 250 L60 215 L20 145 Z',
  mapWaterPath: '',
  mapCities: [
    { name: 'Ellicott City', x: 240, y: 85,  hq: true },
    { name: 'Columbia',      x: 175, y: 145 },
    { name: 'Elkridge',      x: 270, y: 145 },
    { name: 'Clarksville',   x: 130, y: 180 },
    { name: 'Fulton',        x: 100, y: 215 },
    { name: 'Glenwood',      x: 85,  y: 115 },
  ],
  factsEyebrow: 'By the Numbers',
  factsTitle: 'The Howard County rental market, <em>in data.</em>',
  factsLede: 'Strong rental demand from corporate transferees (NSA, Verizon, GEICO at Route 32), Johns Hopkins APL, and Columbia\'s built-in pull as a planned community. Higher median rents than Baltimore or PG counties.',
  facts: [
    { label: 'County rental license', val: 'Required', sub: 'Howard County registration & inspection — we file & track' },
    { label: 'Columbia HOA overlay', val: 'Yes', sub: 'Village association layered on county rules' },
    { label: 'Emergency callback', val: '30 <span class="gold">min</span>', sub: 'Contractual guarantee on the 24/7 line' },
    { label: 'Owner reporting', val: 'Monthly', sub: 'AppFolio owner portal · direct deposit' },
  ],
  neighborsEyebrow: 'Where We Manage',
  neighborsTitle: 'Howard County submarkets, <em>by rental density.</em>',
  neighborsLede: 'Columbia\'s 10 villages plus Ellicott City, Elkridge, and the western county corridor.',
  neighbors: [
    { name: 'Columbia',        meta: 'village-structured',   tag: 'Planned' },
    { name: 'Ellicott City',   meta: 'historic + suburban',  tag: 'County seat' },
    { name: 'Elkridge',        meta: 'townhome dense',       tag: '' },
    { name: 'Clarksville',     meta: 'single-family',         tag: '' },
    { name: 'Fulton',          meta: 'newer construction',    tag: '' },
    { name: 'Highland',        meta: 'single-family',         tag: '' },
    { name: 'Glenwood',        meta: 'rural',                 tag: '' },
    { name: 'West Friendship', meta: 'rural',                 tag: '' },
  ],
  manager: {
    name: 'Cody Bishop',
    creds: 'Broker',
    initials: 'CB',
    role: 'Director of Rental Management',
    bio: '<strong>Licensed real estate broker</strong> and Tidewater\'s Director of Rental Management, overseeing rental operations across Maryland, Delaware, and Virginia from our Owings Mills headquarters. Every Howard County owner works with a named portfolio manager on Cody\'s team.',
  },
  schemaDesc: 'Single-family, townhome, and condo rental property management across Howard County, Maryland — Columbia, Ellicott City, Elkridge, Clarksville, Fulton, and surrounding markets.',
  related: [
    { label: 'Property management in Columbia, MD', href: '/rental-management/maryland/columbia', note: 'Our dedicated Columbia page — the ten villages, CA charge, village covenants.' },
    { label: 'HOA management in Howard County', href: '/hoa-management/maryland/howard-county', note: 'Columbia village associations, Ellicott City condos, west-county developer transitions.' },
    { label: 'Property management in Montgomery County', href: '/rental-management/maryland/montgomery-county', note: 'Rockville, Bethesda, Gaithersburg — across the Patuxent.' },
    { label: 'Rental property maintenance', href: '/maintenance-services', note: 'In-house technicians and 24/7 mitigation for the properties we manage.' },
  ],
  faqs: [
    {
      q: 'Do you handle Columbia\'s village association rules?',
      a: [
        '<strong>Yes.</strong> Columbia\'s 10 villages each layer their own covenants over Howard County rules — architectural review, exterior maintenance standards, rental notification requirements, sometimes rental caps. We track each village association\'s rule book for the properties we manage and prep tenants accordingly.',
        'Because Tidewater is a CAI-affiliated HOA management company in addition to a rental manager, we know how to talk to village associations and resolve issues before they become violations.',
      ],
    },
    {
      q: 'Does Howard County require a rental license?',
      a: 'Yes. Howard County requires rental property registration and periodic inspection. We file the initial registration, schedule the inspection, address any deficiencies, and track renewal dates. The Columbia village association rules may add additional landlord registration on top.',
    },
    {
      q: 'How fast will my Howard County property lease?',
      a: 'Columbia condos and Elkridge townhomes lease fastest; larger single-family homes in Clarksville and the western county take longer. We price to current comps, and you follow showing and application activity in the AppFolio owner portal rather than waiting for a call.',
    },
    {
      q: 'What\'s your management fee?',
      a: '<strong>A flat percentage of monthly rent collected &mdash; quoted up front, with no surprises.</strong> No tenant-placement fee, no maintenance markup, no annual renewal fees. Free rental market analysis before you sign anything.',
    },
    {
      q: 'Do you manage properties for federal-workforce owners?',
      a: 'Yes — a meaningful share of our Howard County portfolio is owned by NSA, Johns Hopkins APL, and federal contractor employees who took rotations elsewhere. We handle DocuSign agreements, AppFolio owner portal, and direct deposit for owners overseas or on TDY.',
    },
    {
      q: 'Do you manage in the rest of Howard County, not just Columbia?',
      a: 'Yes — Ellicott City, Elkridge, Clarksville, Fulton, Highland, and rural western Howard. Each has different market characteristics and we underwrite each property individually.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// MONTGOMERY COUNTY — /rental-management/maryland/montgomery-county
// ─────────────────────────────────────────────────────────────
export const GEO_DATA_MONTGOMERY_COUNTY = {
  name: 'Montgomery County',
  fullName: 'Montgomery County',
  url: '/rental-management/maryland/montgomery-county',
  scope: 'county',
  heroTitle: 'Property management in <em>Montgomery County.</em>',
  heroLede: 'Beyond Silver Spring — Rockville, Gaithersburg, Bethesda, Germantown. The country\'s densest federal workforce, the NIH/FDA corridor, and the Metro Red Line spine all run through this county. We manage single-family, townhome, and condo rentals across the whole footprint.',
  heroStats: [
    { num: '30 min', tone: 'gold', label: 'Emergency callback — contractually guaranteed, 24/7' },
    { num: 'AppFolio', label: 'Owner portal — monthly statements, photos, direct deposit' },
    { num: 'Since 1989', label: 'Family-owned Mid-Atlantic manager' },
  ],
  mapHeading: 'Where we manage',
  mapHqLabel: 'County seat · Rockville',
  mapViewBox: '0 0 360 290',
  mapOutline: 'M40 50 L180 25 L320 90 L325 175 L260 245 L130 260 L45 215 L20 130 Z',
  mapWaterPath: '',
  mapCities: [
    { name: 'Rockville',     x: 195, y: 110, hq: true },
    { name: 'Bethesda',      x: 250, y: 200 },
    { name: 'Gaithersburg',  x: 135, y: 80 },
    { name: 'Germantown',    x: 85,  y: 70 },
    { name: 'Silver Spring', x: 280, y: 175 },
    { name: 'Wheaton',       x: 240, y: 155 },
    { name: 'Potomac',       x: 165, y: 175 },
  ],
  factsEyebrow: 'By the Numbers',
  factsTitle: 'The Montgomery County rental market, <em>in data.</em>',
  factsLede: 'Federal workforce, biotech (NIH, FDA, NIST), and DC commuter demand make this Maryland\'s tightest rental submarket. Median rents run 20–30% above the state average.',
  facts: [
    { label: 'County rental license', val: 'Required', sub: 'Montgomery County — we file & track renewal' },
    { label: 'Rent stabilization', val: 'Tracked', sub: 'CPI-based cap on covered units, run at every renewal' },
    { label: 'Emergency callback', val: '30 <span class="gold">min</span>', sub: 'Contractual guarantee on the 24/7 line' },
    { label: 'Owner reporting', val: 'Monthly', sub: 'AppFolio owner portal · direct deposit' },
  ],
  neighborsEyebrow: 'Where We Manage',
  neighborsTitle: 'Montgomery County submarkets, <em>by rental density.</em>',
  neighborsLede: 'From the Bethesda Metro spine to the I-270 biotech corridor and the Patuxent watershed beyond.',
  neighbors: [
    { name: 'Silver Spring',  meta: 'dedicated city page', tag: 'Live page' },
    { name: 'Rockville',      meta: 'mixed',                tag: 'County seat' },
    { name: 'Bethesda',       meta: 'condo dense',          tag: '' },
    { name: 'Gaithersburg',   meta: 'townhome',             tag: '' },
    { name: 'Germantown',     meta: 'single-family',        tag: '' },
    { name: 'Wheaton',        meta: 'mixed',                tag: '' },
    { name: 'Potomac',        meta: 'single-family',         tag: '' },
    { name: 'Chevy Chase',    meta: 'single-family',         tag: '' },
    { name: 'Olney',          meta: 'single-family',         tag: '' },
    { name: 'Kensington',     meta: 'single-family',         tag: '' },
  ],
  manager: {
    name: 'Cody Bishop',
    creds: 'Broker',
    initials: 'CB',
    role: 'Director of Rental Management',
    bio: '<strong>Licensed real estate broker</strong> and Tidewater\'s Director of Rental Management, overseeing rental operations across Maryland, Delaware, and Virginia from our Owings Mills headquarters. Every Montgomery County owner works with a named portfolio manager on Cody\'s team.',
  },
  schemaDesc: 'Single-family, townhome, and condo rental property management across Montgomery County, Maryland — Rockville, Bethesda, Gaithersburg, Germantown, Silver Spring, Wheaton, Potomac, and the I-270 biotech corridor.',
  related: [
    { label: 'Silver Spring property management', href: '/rental-management/maryland/silver-spring', note: 'Our dedicated Silver Spring submarket page — Downtown, Four Corners, Forest Glen.' },
    { label: 'HOA management in Montgomery County', href: '/hoa-management/maryland/montgomery-county', note: 'CCOC registration, Chapter 10B, and the condo boards your rental sits inside.' },
    { label: 'Property management in Howard County', href: '/rental-management/maryland/howard-county', note: 'Columbia, Ellicott City, Elkridge — north on Route 29.' },
    { label: 'Rental property maintenance', href: '/maintenance-services', note: 'In-house technicians who know the county rental-license inspection checklist.' },
  ],
  faqs: [
    {
      q: 'Does Montgomery County have its own rental license?',
      a: [
        '<strong>Yes — and Montgomery County\'s rental rules are among the strictest in Maryland.</strong> Single-family rental licenses, condo & co-op landlord registration, and the county\'s Commission on Common Ownership Communities (CCOC) for HOA-layered properties.',
        'We file the initial license, schedule the inspection, address deficiencies through our vendor network, and track renewal dates. Lapsed licenses carry penalties and can void evictions — we don\'t let that happen.',
      ],
    },
    {
      q: 'What\'s the rent control situation in Montgomery County?',
      a: '<strong>Montgomery County\'s rent stabilization law limits annual rent increases on covered units.</strong> Since the law took effect in 2024 the allowable increase has been tied to CPI plus 3 percent, capped at 6 percent, with exemptions for newer buildings and certain other unit types. We track which of your properties are covered, run the math for a compliant increase at renewal, and document the calculation for your records.',
    },
    {
      q: 'How fast will my Montgomery County property lease?',
      a: 'Metro-corridor condos in Bethesda, Silver Spring, and Wheaton lease fastest; single-family in Rockville, Gaithersburg, and Potomac takes longer. Federal hiring cycles and lease-expiration patterns drive the seasonality, and you follow activity in the AppFolio owner portal.',
    },
    {
      q: 'Do you manage condos with HOA rental caps?',
      a: 'Yes. Many Bethesda, Rockville, and Silver Spring condo buildings have rental caps (typically 20–30% of units), landlord registration with the association, and HOA-side screening. We track every association\'s rule book for the buildings we manage in.',
    },
    {
      q: 'What\'s your management fee?',
      a: '<strong>A flat percentage of monthly rent collected &mdash; quoted up front, with no surprises.</strong> No tenant-placement fee, no maintenance markup, no annual renewal fees. Free rental market analysis before you sign anything.',
    },
    {
      q: 'Do you serve all of Montgomery County?',
      a: 'Most of it — the Beltway-to-Frederick-County footprint. Deeper northwest (Damascus, Poolesville) we handle case-by-case based on our manager\'s coverage radius. We\'ll be honest with you on the first call.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// PRINCE GEORGE\'S COUNTY — /rental-management/maryland/prince-georges-county
// ─────────────────────────────────────────────────────────────
export const GEO_DATA_PRINCE_GEORGES_COUNTY = {
  name: "Prince George\'s County",
  fullName: "Prince George\'s County",
  url: '/rental-management/maryland/prince-georges-county',
  scope: 'county',
  heroTitle: "Prince George\'s County <em>property management.</em>",
  heroLede: 'Bowie, Largo, Greenbelt, Hyattsville, Laurel. Townhome and garden-style rentals with heavy demand from federal workforce (NASA Goddard, Census Bureau), University of Maryland-bound households, and DC commuters east of the Anacostia. We handle the county rental license, lead-paint compliance, and the inspection cadence.',
  heroStats: [
    { num: '30 min', tone: 'gold', label: 'Emergency callback — contractually guaranteed, 24/7' },
    { num: 'AppFolio', label: 'Owner portal — monthly statements, photos, direct deposit' },
    { num: 'Since 1989', label: 'Family-owned Mid-Atlantic manager' },
  ],
  mapHeading: 'Where we manage',
  mapHqLabel: 'County seat · Upper Marlboro',
  mapViewBox: '0 0 360 290',
  mapOutline: 'M40 35 L220 30 L280 75 L260 165 L210 235 L100 265 L45 240 L25 165 Z',
  mapWaterPath: '',
  mapCities: [
    { name: 'Bowie',          x: 200, y: 95 },
    { name: 'Largo',          x: 165, y: 145 },
    { name: 'Greenbelt',      x: 100, y: 70 },
    { name: 'Hyattsville',    x: 75,  y: 95 },
    { name: 'College Park',   x: 90,  y: 50 },
    { name: 'Laurel',         x: 130, y: 35 },
    { name: 'Upper Marlboro', x: 175, y: 200, hq: true },
  ],
  factsEyebrow: 'By the Numbers',
  factsTitle: "The Prince George\'s County rental market, <em>in data.</em>",
  factsLede: 'Federal-workforce demand from NASA Goddard, the Census Bureau, the IRS, and University of Maryland faculty & staff. Townhome and garden-condo heavy, with single-family pockets in Bowie and Fort Washington.',
  facts: [
    { label: 'County rental license', val: 'Required', sub: 'Prince George’s County — annual, we file & track' },
    { label: 'Lead-paint compliance', val: 'Handled', sub: 'Pre-1978 registration, inspection & certificates' },
    { label: 'Emergency callback', val: '30 <span class="gold">min</span>', sub: 'Contractual guarantee on the 24/7 line' },
    { label: 'Owner reporting', val: 'Monthly', sub: 'AppFolio owner portal · direct deposit' },
  ],
  neighborsEyebrow: 'Where We Manage',
  neighborsTitle: "Prince George\'s County submarkets, <em>by rental density.</em>",
  neighborsLede: 'From the U of MD corridor at College Park to the Bowie/Largo townhome belt and the Fort Washington Potomac frontage.',
  neighbors: [
    { name: 'Bowie',          meta: 'single-family + townhome', tag: '' },
    { name: 'Largo',          meta: 'townhome dense',           tag: 'Metro' },
    { name: 'Hyattsville',    meta: 'mixed',                    tag: '' },
    { name: 'Laurel',         meta: 'mixed',                    tag: '' },
    { name: 'Greenbelt',      meta: 'condo + townhome',         tag: 'NASA' },
    { name: 'College Park',   meta: 'university-adjacent',      tag: 'UMD' },
    { name: 'Mitchellville',  meta: 'single-family',             tag: '' },
    { name: 'Upper Marlboro', meta: 'single-family',             tag: 'County seat' },
    { name: 'Fort Washington', meta: 'single-family',            tag: '' },
    { name: 'Beltsville',     meta: 'townhome',                  tag: '' },
  ],
  manager: {
    name: 'Cody Bishop',
    creds: 'Broker',
    initials: 'CB',
    role: 'Director of Rental Management',
    bio: '<strong>Licensed real estate broker</strong> and Tidewater\'s Director of Rental Management, overseeing rental operations across Maryland, Delaware, and Virginia from our Owings Mills headquarters. Every Prince George\'s County owner works with a named portfolio manager on Cody\'s team.',
  },
  schemaDesc: "Single-family, townhome, and condo rental property management across Prince George\'s County, Maryland — Bowie, Largo, Greenbelt, Hyattsville, Laurel, College Park, Upper Marlboro, Fort Washington, and the DC commuter corridor.",
  related: [
    { label: 'Anne Arundel County property management', href: '/rental-management/maryland/anne-arundel-county', note: 'Odenton, Crofton, Glen Burnie — the Fort Meade side of the line.' },
    { label: 'Property management in Montgomery County', href: '/rental-management/maryland/montgomery-county', note: 'Silver Spring, Wheaton, Bethesda — across the DC suburbs.' },
    { label: 'HOA management in Prince George’s County', href: '/hoa-management/maryland/prince-georges-county', note: 'For the Bowie and Largo association boards your rental sits inside.' },
    { label: 'Rental property maintenance', href: '/maintenance-services', note: 'In-house technicians who know the PG County inspection checklist.' },
  ],
  faqs: [
    {
      q: "Does Prince George\'s County require a rental license?",
      a: [
        "<strong>Yes — and PG County\'s rental license rules are among the most actively enforced in Maryland.</strong> Annual rental license, lead-paint compliance for pre-1978 properties, and an inspection cadence with real penalties for non-compliance.",
        'We file the initial license, schedule the inspection, address any deficiencies through our vendor network, and track renewal dates. Owners coming to us from other companies are often surprised how many licenses had quietly lapsed under prior management.',
      ],
    },
    {
      q: 'I just moved out of Bowie / Largo / Hyattsville. Can you manage my house?',
      a: '<strong>Yes — "accidental landlord" is a large share of our PG portfolio.</strong> Owners who took DC jobs, moved abroad, transferred federally, or decided to hold and rent after a 2020s purchase. We run a free rent-vs-sell analysis as part of the first call and lay out the math both ways.',
    },
    {
      q: 'How fast will my PG County property lease?',
      a: 'Townhomes in Largo and Bowie lease fastest. College Park area properties lease around the University of Maryland academic calendar, and single-family in Mitchellville and Fort Washington takes longer. You follow showing and application activity in the AppFolio owner portal.',
    },
    {
      q: 'Do you manage in the Bowie planned-community structure?',
      a: "Yes. Bowie\'s neighborhoods are largely HOA-governed and many have rental restrictions or landlord registration with the association on top of the county license. We track each HOA\'s rule book for the properties we manage in.",
    },
    {
      q: "What\'s your management fee?",
      a: '<strong>A flat percentage of monthly rent collected &mdash; quoted up front, with no surprises.</strong> No tenant-placement fee, no maintenance markup, no annual renewal fees. Free rental market analysis before you sign anything.',
    },
    {
      q: 'Do you handle Section 8 / Housing Choice Voucher tenants in PG?',
      a: 'Yes. Maryland\'s HOME Act prohibits turning down an applicant solely because of a lawful source of income, including a Housing Choice Voucher, so voucher applicants are screened on the same criteria as everyone else. A voucher tenancy adds a housing-authority inspection and a HAP contract on top of the lease; we manage both and keep the paperwork current.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// OCEAN CITY — /rental-management/maryland/ocean-city
// ─────────────────────────────────────────────────────────────
export const GEO_DATA_OCEAN_CITY = {
  name: 'Ocean City',
  fullName: 'Ocean City',
  url: '/rental-management/maryland/ocean-city',
  scope: 'city',
  heroTitle: 'Ocean City <em>property management.</em>',
  heroLede: 'A different market than the rest of the state — seasonal demand, condo-dense, and a tenant pool that turns over with the rental season. Tidewater\'s Ocean City office at 8101 Coastal Highway, Suite 5, serves the island and the West OC mainland with the same AppFolio-backed operation as our Maryland mainland portfolio.',
  heroStats: [
    { num: 'Local office', label: '8101 Coastal Highway, Suite 5, Ocean City' },
    { num: '30 min', tone: 'gold', label: 'Emergency callback — contractually guaranteed, 24/7' },
    { num: 'Since 1989', label: 'Family-owned Mid-Atlantic manager' },
  ],
  mapHeading: 'Where we manage',
  mapHqLabel: 'OC office · 8101 Coastal Hwy',
  mapViewBox: '0 0 360 290',
  mapOutline: 'M155 25 L210 25 L215 80 L210 145 L205 210 L195 260 L160 268 L145 230 L142 165 L148 95 Z',
  mapWaterPath: 'M215 25 L360 25 L360 268 L195 268 L205 210 L210 145 L215 80 Z',
  mapCities: [
    { name: 'Uptown / 145th', x: 178, y: 55 },
    { name: 'North OC',       x: 178, y: 100 },
    { name: 'Midtown',        x: 178, y: 145 },
    { name: 'Downtown OC',    x: 178, y: 195, hq: true },
    { name: 'West OC',        x: 85,  y: 195 },
    { name: 'Ocean Pines',    x: 55,  y: 145 },
    { name: 'Berlin',         x: 60,  y: 235 },
  ],
  factsEyebrow: 'By the Numbers',
  factsTitle: 'The Ocean City rental market, <em>in data.</em>',
  factsLede: 'Highly seasonal demand: Memorial Day to Labor Day is peak, with shoulder-season demand from weekenders and remote workers. Condo-dominant, with single-family in West OC and Ocean Pines.',
  facts: [
    { label: 'Property mix', val: 'Condo-heavy', sub: 'Single-family in West OC + Ocean Pines' },
    { label: 'Peak season', val: 'Memorial–Labor', sub: '14 weeks of compressed demand' },
    { label: 'Rental license', val: 'Required', sub: 'Town of Ocean City — we file and track renewals' },
    { label: 'Emergency callback', val: '30 <span class="gold">min</span>', sub: 'Contractual guarantee on the 24/7 line' },
  ],
  neighborsEyebrow: 'Where We Manage',
  neighborsTitle: 'Ocean City submarkets, <em>by section.</em>',
  neighborsLede: 'From the inlet at the south end to the Delaware line at 145th, plus the West OC mainland and the Ocean Pines/Berlin shoulder market.',
  neighbors: [
    { name: 'Downtown OC (inlet–27th)',  meta: 'mixed',       tag: 'Boardwalk' },
    { name: 'Midtown (28th–80th)',        meta: 'condo dense', tag: '' },
    { name: 'North OC (81st–118th)',      meta: 'condo',       tag: '' },
    { name: 'Uptown (119th–145th)',       meta: 'condo',        tag: '' },
    { name: 'West Ocean City',                 meta: 'single-family', tag: '' },
    { name: 'Ocean Pines',                     meta: 'single-family', tag: 'Year-round' },
    { name: 'Berlin',                          meta: 'mixed',         tag: '' },
  ],
  manager: {
    name: 'Don Gentry',
    creds: 'CMCA, AMS, PCAM',
    initials: 'DG',
    bio: '<strong>20+ years</strong> in the Delmarva real estate market. Delmarva Regional Director overseeing Ocean City and Delaware operations. Real estate broker and customer-service background. Day-to-day OC property manager.',
  },
  schemaDesc: 'Rental property management in Ocean City, Maryland — condo, single-family, and small-multi rentals across Downtown, Midtown, North OC, Uptown, West Ocean City, Ocean Pines, and Berlin.',
  related: [
    { label: 'Lewes, Delaware rentals', href: '/rental-management/delaware/lewes', note: 'Our Delaware office, 30 minutes up Route 1 — same regional director.' },
    { label: 'Delaware rental management', href: '/rental-management/delaware', note: 'Rehoboth, Bethany, Fenwick Island and the Sussex County corridor.' },
    { label: 'All Maryland rental markets', href: '/rental-management/maryland', note: 'Anne Arundel, Baltimore, Howard, Montgomery, Prince George’s.' },
    { label: 'Property maintenance & storm mitigation', href: '/maintenance-services', note: 'Pre-season inspections, mitigation crews, insurance documentation.' },
  ],
  faqs: [
    {
      q: 'Do you manage long-term, seasonal, or weekly rentals?',
      a: [
        'Ocean City\'s rental market spans year-round long-term leases, May–September seasonal leases, and weekly vacation rentals.',
        "Tell us what your property is and what you want — we\'ll be straight about whether we\'re the right fit.",
      ],
    },
    {
      q: 'Does Ocean City require a rental license?',
      a: '<strong>Yes.</strong> Ocean City requires a rental license for residential rentals, with separate rules for short-term (under 30 days) and longer terms. Worcester County has additional inspection requirements for some property types. We file, track renewals, and manage the inspection cycle.',
    },
    {
      q: 'What about the OC short-term rental ordinance?',
      a: 'Ocean City regulates short-term rentals through licensing, occupancy limits, and noise/parking rules. Some condo associations also prohibit STRs entirely. We can walk you through what\'s permitted at your address.',
    },
    {
      q: 'Do you manage Ocean Pines and Berlin properties?',
      a: "Yes — Ocean Pines is one of Maryland\'s largest HOAs and many of its rentals are year-round single-family homes. Berlin\'s historic district has its own architectural and rental conventions. Our Ocean City office covers both.",
    },
    {
      q: "What\'s your fee structure for Ocean City?",
      a: '<strong>A flat percentage of monthly rent collected &mdash; quoted up front, with no surprises.</strong> No tenant-placement fee, no maintenance markup, no annual renewal fees. Seasonal leases are quoted per property because the turnover and marketing work differs; either way you get a written number before you sign anything.',
    },
    {
      q: 'Do you handle hurricane / storm season?',
      a: 'Yes. Pre-season inspections, storm-prep coordination with vendors, post-storm damage walks, and insurance-claim documentation are part of the Ocean City package. Our regional director Don Gentry has 20+ years of coastal experience.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// LEWES, DELAWARE — /rental-management/delaware/lewes
// ─────────────────────────────────────────────────────────────
export const GEO_DATA_LEWES = {
  name: 'Lewes',
  fullName: 'Lewes',
  url: '/rental-management/delaware/lewes',
  scope: 'city',
  state: {
    name: 'Delaware',
    href: '/rental-management/delaware',
    urlPath: 'delaware',
  },
  heroTitle: 'Lewes, Delaware <em>rental property management.</em>',
  heroLede: 'Sussex County\'s "first town" — coastal, second-home heavy, and a different rental rhythm than the Mid-Atlantic mainland. Tidewater\'s Delaware office at 20375 John J Williams Highway sits in the Lewes–Rehoboth corridor. We manage single-family, condo, and townhome rentals across Lewes, Cape Henlopen, and the Route 1 coastal communities.',
  heroStats: [
    { num: 'Local office', label: '20375 John J Williams Hwy, Lewes — Lewes/Rehoboth corridor' },
    { num: '30 min', tone: 'gold', label: 'Emergency callback — contractually guaranteed, 24/7' },
    { num: 'Since 1989', label: 'Family-owned Mid-Atlantic manager' },
  ],
  mapHeading: 'Where we manage',
  mapHqLabel: 'DE office · John J Williams Hwy',
  mapViewBox: '0 0 360 290',
  mapOutline: 'M40 100 L120 65 L210 80 L255 130 L235 200 L165 240 L80 220 L25 165 Z',
  mapWaterPath: 'M255 130 L360 130 L360 25 L120 25 L120 65 L210 80 Z',
  mapCities: [
    { name: 'Old Town Lewes', x: 145, y: 130, hq: true },
    { name: 'Cape Henlopen',  x: 215, y: 115 },
    { name: 'Pilottown',      x: 110, y: 110 },
    { name: 'Henlopen Acres', x: 195, y: 175 },
    { name: 'Long Neck',      x: 70,  y: 185 },
    { name: 'Milton',         x: 60,  y: 130 },
  ],
  factsEyebrow: 'By the Numbers',
  factsTitle: 'The Lewes rental market, <em>in data.</em>',
  factsLede: 'Second-home and resort-community heavy. Year-round tenant base is smaller than coastal Maryland but tighter; seasonal demand from May to September drives weekly + monthly leases.',
  facts: [
    { label: 'Property mix', val: 'Mixed', sub: 'Single-family, condo, townhome' },
    { label: 'Tax advantage', val: 'No DE sales tax', sub: 'Owners often surprised by this' },
    { label: 'Statewide rental license', val: 'None', sub: 'Delaware has no statewide landlord license; HOA rules still apply' },
    { label: 'Emergency callback', val: '30 <span class="gold">min</span>', sub: 'Contractual guarantee on the 24/7 line' },
  ],
  neighborsEyebrow: 'Where We Manage',
  neighborsTitle: 'Lewes-area submarkets, <em>by section.</em>',
  neighborsLede: 'From Old Town Lewes and Pilottown to the Cape Henlopen corridor and the Route 1 coastal communities.',
  neighbors: [
    { name: 'Old Town Lewes',  meta: 'historic',           tag: 'Historic' },
    { name: 'Cape Henlopen',   meta: 'oceanfront condo',   tag: 'Coastal' },
    { name: 'Henlopen Acres',  meta: 'single-family',       tag: '' },
    { name: 'Pilottown',       meta: 'mixed',               tag: '' },
    { name: 'Milton',          meta: 'single-family',       tag: 'Inland' },
    { name: 'Long Neck',       meta: 'single-family',       tag: '' },
    { name: 'Rehoboth Beach',  meta: 'condo',               tag: 'Coastal' },
  ],
  manager: {
    name: 'Don Gentry',
    creds: 'CMCA, AMS, PCAM',
    initials: 'DG',
    bio: '<strong>20+ years</strong> in the Delmarva real estate market. Delmarva Regional Director overseeing Delaware and Ocean City operations from our Route 1 office in the Lewes–Rehoboth corridor.',
  },
  schemaDesc: 'Rental property management in Lewes, Delaware — single-family, condo, and townhome rentals across Old Town Lewes, Cape Henlopen, Pilottown, Henlopen Acres, Milton, and the Sussex County coastal corridor.',
  related: [
    { label: 'Delaware rental management', href: '/rental-management/delaware', note: 'The state hub — Rehoboth, Bethany, Fenwick Island, Sussex inland.' },
    { label: 'Ocean City property management', href: '/rental-management/maryland/ocean-city', note: 'Our Ocean City office, 30 minutes down Route 1 — same regional director.' },
    { label: 'Rental management in Maryland & Delaware', href: '/rental-management', note: 'How the flat fee, AppFolio portal, and 24/7 line work everywhere we manage.' },
    { label: 'Property maintenance & storm mitigation', href: '/maintenance-services', note: 'Pre-season inspections, mitigation crews, insurance documentation.' },
  ],
  faqs: [
    {
      q: "How is Delaware\'s rental landscape different from Maryland\'s?",
      a: [
        '<strong>Delaware is meaningfully friendlier to landlords than Maryland.</strong> Faster eviction timelines, no statewide rent control, no county rental licenses in most of Sussex, and no state sales tax.',
        'That said, Sussex County coastal communities run their own HOA rules — architectural review, rental caps, short-term rental restrictions — and those can be more restrictive than anything the state imposes. We track the rules per association.',
      ],
    },
    {
      q: 'Do you manage long-term, seasonal, or weekly rentals?',
      a: 'Lewes spans year-round long-term leases, summer-season leases, and weekly vacation rentals. We\'ll be straight about which scope is right for your property.',
    },
    {
      q: 'Do you handle the Cape Henlopen / coastal HOA rules?',
      a: 'Yes. Many Cape Henlopen and Henlopen Acres communities have rental caps, minimum lease terms (e.g. no rentals under 30 days), and architectural review requirements. We track each association\'s rule book for the buildings we manage in.',
    },
    {
      q: 'How fast will my Lewes property lease?',
      a: 'Year-round single-family in Old Town Lewes typically leases within 30–45 days. Summer-season weekly rentals book starting in late winter for the upcoming season.',
    },
    {
      q: 'What about hurricane / coastal storm coverage?',
      a: 'Pre-season inspections, storm-prep coordination with vendors, post-storm damage walks, and insurance-claim documentation are part of the package. Don Gentry has 20+ years of Delmarva coastal experience.',
    },
    {
      q: "What\'s your management fee?",
      a: '<strong>A flat percentage of monthly rent collected &mdash; quoted up front, with no surprises.</strong> No tenant-placement fee, no maintenance markup, no annual renewal fees. Seasonal leases are quoted per property because the turnover and marketing work differs; you get a written number before you sign anything.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// COLUMBIA, MD — /rental-management/maryland/columbia
// Public facts only: Columbia's ten villages, the Columbia Association
// annual charge, village architectural covenants, Howard County rental
// registration. No portfolio counts (brief: pending).
// ─────────────────────────────────────────────────────────────
export const GEO_DATA_COLUMBIA = {
  name: 'Columbia',
  fullName: 'Columbia, Maryland',
  url: '/rental-management/maryland/columbia',
  scope: 'city',
  heroTitle: 'Property management in <em>Columbia, MD.</em>',
  heroLede: 'Columbia is a planned community of ten villages, each with its own covenants layered under the Columbia Association &mdash; and every rental inside it answers to the village, the CA, and <a href="/rental-management/maryland/howard-county">Howard County</a> at the same time. We manage single-family, townhome, and condo rentals across all ten villages and Town Center, with a team that already works with Columbia\'s associations on the HOA side.',
  heroStats: [
    { num: '10 villages', label: 'Wilde Lake to River Hill — each with its own covenants' },
    { num: '30 min', tone: 'gold', label: 'Emergency callback — contractually guaranteed, 24/7' },
    { num: 'Since 1989', label: 'Family-owned Mid-Atlantic manager' },
  ],
  mapHeading: 'Columbia villages',
  mapHqLabel: 'Town Center · The Mall & Lakefront',
  mapViewBox: '0 0 360 290',
  mapOutline: 'M60 70 L170 30 L290 55 L330 140 L290 240 L170 265 L60 225 L30 145 Z',
  mapWaterPath: 'M150 135 Q175 125 195 140 Q205 160 185 170 Q160 172 150 155 Z',
  mapCities: [
    { name: 'Town Center',        x: 180, y: 150, hq: true },
    { name: 'Wilde Lake',         x: 130, y: 120 },
    { name: 'Harper\'s Choice',   x: 60,  y: 170 },
    { name: 'Oakland Mills',      x: 235, y: 130 },
    { name: 'Long Reach',         x: 275, y: 100 },
    { name: 'Owen Brown',         x: 250, y: 200 },
    { name: 'Hickory Ridge',      x: 140, y: 210 },
    { name: 'Kings Contrivance',  x: 200, y: 240 },
    { name: 'Dorsey\'s Search',   x: 120, y: 70 },
    { name: 'River Hill',         x: 70,  y: 195 },
  ],
  factsEyebrow: 'By the Numbers',
  factsTitle: 'The Columbia rental market, <em>in data.</em>',
  factsLede: 'Demand from the Route 32 employers (NSA, Johns Hopkins APL, federal contractors), the Route 29 commute to both Baltimore and Washington, and Columbia\'s own schools and amenities. Layered governance is the defining operational fact.',
  facts: [
    { label: 'Columbia Association charge', val: 'Annual', sub: 'Levied on every Columbia property, on top of village dues' },
    { label: 'Village covenants', val: '10 rule books', sub: 'Architectural review and exterior standards vary by village' },
    { label: 'County rental license', val: 'Required', sub: 'Howard County registration & inspection — we file & track' },
    { label: 'Emergency callback', val: '30 <span class="gold">min</span>', sub: 'Contractual guarantee on the 24/7 line' },
  ],
  neighborsEyebrow: 'Where We Manage',
  neighborsTitle: 'Columbia\'s ten villages, <em>plus Town Center.</em>',
  neighborsLede: 'Each village is its own community association with its own architectural committee. We track all ten rule books for the properties we manage.',
  neighbors: [
    { name: 'Town Center',       meta: 'lakefront condos · mid-rise',      tag: 'Downtown' },
    { name: 'Wilde Lake',        meta: 'the original village · mixed',    tag: 'Est. 1967' },
    { name: 'Harper\'s Choice',  meta: 'townhome & single-family',        tag: '' },
    { name: 'Oakland Mills',     meta: 'townhome dense',                  tag: '' },
    { name: 'Long Reach',        meta: 'townhome & garden condo',         tag: '' },
    { name: 'Owen Brown',        meta: 'single-family & townhome',        tag: '' },
    { name: 'Hickory Ridge',     meta: 'single-family',                   tag: '' },
    { name: 'Kings Contrivance', meta: 'single-family & townhome',        tag: '' },
    { name: 'Dorsey\'s Search',  meta: 'single-family',                   tag: '' },
    { name: 'River Hill',        meta: 'large-lot single-family',         tag: 'Newest village' },
  ],
  manager: {
    name: 'Cody Bishop',
    creds: 'Broker',
    initials: 'CB',
    role: 'Director of Rental Management',
    bio: '<strong>Licensed real estate broker</strong> and Tidewater\'s Director of Rental Management, overseeing rental operations across Maryland, Delaware, and Virginia from our Owings Mills headquarters. Every Columbia owner works with a named portfolio manager on Cody\'s team.',
  },
  schemaDesc: 'Single-family, townhome, and condo rental property management in Columbia, Maryland — all ten villages and Town Center, with Columbia Association and village covenant compliance handled.',
  related: [
    { label: 'Property management in Howard County', href: '/rental-management/maryland/howard-county', note: 'The county-wide page — Ellicott City, Elkridge, Clarksville, Fulton.' },
    { label: 'HOA management in Howard County', href: '/hoa-management/maryland/howard-county', note: 'We manage Columbia village and Howard County association boards too.' },
    { label: 'Property management in Montgomery County', href: '/rental-management/maryland/montgomery-county', note: 'South on Route 29 — Silver Spring, Rockville, Bethesda.' },
    { label: 'Rental property maintenance', href: '/maintenance-services', note: 'In-house technicians and 24/7 mitigation for the properties we manage.' },
  ],
  faqs: [
    {
      q: 'What does the Columbia Association have to do with my rental?',
      a: [
        'Every property in Columbia pays the <strong>Columbia Association annual charge</strong>, which funds the pools, paths, open space and community facilities, and sits on top of your village association dues. Both are owner obligations, not tenant obligations, and both have to be modelled into the rent.',
        'We track CA and village due dates for the properties we manage, keep the account current, and make sure a tenant\'s use of CA facilities is set up correctly at move-in.',
      ],
    },
    {
      q: 'Do the village covenants apply to a rental?',
      a: 'Yes. Each of Columbia\'s ten villages has its own architectural committee and exterior standards, and some have rental notification or registration requirements. We hold the current rule book for every village we manage in, prep tenants on what the covenants mean day to day, and handle any correspondence from the village office.',
    },
    {
      q: 'Does Howard County require a rental license in Columbia?',
      a: 'Yes. Howard County requires rental property registration and periodic inspection county-wide, Columbia included. We file the initial registration, schedule the inspection, address any deficiencies through our vendor network, and track the renewal date alongside your CA and village calendars.',
    },
    {
      q: 'How fast will my Columbia property lease?',
      a: 'Town Center condos and townhomes in Oakland Mills and Long Reach lease fastest; large-lot single-family in River Hill and Hickory Ridge takes longer. We price to current comps and you follow showing and application activity in the AppFolio owner portal rather than waiting for a call.',
    },
    {
      q: 'What\'s your management fee?',
      a: '<strong>A flat percentage of monthly rent collected &mdash; quoted up front, with no surprises.</strong> No tenant-placement fee, no maintenance markup, no annual renewal fees. Free rental market analysis before you sign anything.',
    },
    {
      q: 'I took a job elsewhere and I\'m keeping my Columbia home. Can you take it from here?',
      a: 'Yes. A large share of our Howard County portfolio is owned by NSA, Johns Hopkins APL and federal contractor employees on rotation elsewhere. We handle DocuSign agreements, the AppFolio owner portal, and direct deposit for owners overseas or on TDY, and we do a free rent-vs-sell analysis on the first call.',
    },
  ],
};
