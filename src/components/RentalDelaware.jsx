// Delaware Rental Management Hub — /rental-management/delaware
// State-level hub for the Sussex County coastal market.
// Tidewater DE office: 20375 John J Williams Hwy, Lewes/Rehoboth corridor.
// Regional Director: Don Gentry, CMCA AMS PCAM.

import { useState } from 'react';

function RentalDelawareHero() {
  return (
    <section className="tw-geo-hero">
      <div className="tw-geo-hero-bg"></div>
      <div className="tw-geo-hero-paper"></div>
      <div className="tw-geo-hero-grid">
        <div className="tw-geo-hero-copy">
          <h1 className="tw-geo-hero-title">
            Rental management across <em>coastal Delaware.</em>
          </h1>
          <p className="tw-geo-hero-lede">
            Lewes, Rehoboth, Cape Henlopen, and the Route 1 corridor. Single-family, condo, and townhome rentals in Sussex County&rsquo;s coastal communities. Our Delaware office on John J Williams Highway serves second-home owners and coastal investors — same operating standard as our Maryland portfolio, tuned to the coastal rhythm.
          </p>
          <div className="tw-geo-hero-actions">
            <a href="/request-a-proposal" className="tw-btn tw-btn-primary tw-btn-lg">Get a free rental analysis &rarr;</a>
            <a href="#cities" className="tw-btn tw-btn-ghost">Find your area &rarr;</a>
          </div>
          <div className="tw-geo-hero-stats">
            <div>
              <div className="tw-geo-hero-stat-num">No sales tax</div>
              <div className="tw-geo-hero-stat-label">Delaware advantage on maintenance &amp; capital improvements</div>
            </div>
          </div>
        </div>
        <aside className="tw-geo-hero-side">
          <div className="tw-geo-hero-side-eyebrow">Where we manage</div>
          <h3>Sussex County coastal corridor</h3>
          <RentalDelawareMap />
          <div className="tw-geo-map-legend">
            <div className="tw-geo-map-legend-row">
              <span className="tw-geo-map-legend-swatch served"></span>
              Areas we serve
            </div>
            <div className="tw-geo-map-legend-row">
              <span className="tw-geo-map-legend-swatch hq"></span>
              Delaware office &middot; Lewes/Rehoboth corridor
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function RentalDelawareMap() {
  const regions = [
    { id: 'new-castle', served: false, d: 'M180 25 L290 25 L300 110 L185 115 Z' },
    { id: 'kent',       served: false, d: 'M185 115 L300 110 L310 175 L195 180 Z' },
    { id: 'sussex',     served: true,  d: 'M195 180 L310 175 L335 245 L320 285 L210 280 L165 230 Z' },
  ];
  return (
    <svg viewBox="0 0 360 310" className="tw-geo-map" xmlns="http://www.w3.org/2000/svg" aria-label="Map of Delaware with Sussex County coastal corridor highlighted">
      <path d="M310 175 Q330 215 335 245 L360 245 L360 25 L300 25 L290 110 L300 175 Z" fill="rgba(58,146,166,0.15)"/>
      <path d="M165 230 L120 250 L100 290 L210 280 Z" fill="rgba(58,146,166,0.05)"/>
      {regions.map(r => (
        <path key={r.id} d={r.d} className={`tw-geo-map-county ${r.served ? 'served' : ''}`} />
      ))}
      <circle className="tw-geo-map-dot-pulse" cx="300" cy="235" r="6"/>
      <circle cx="300" cy="235" r="5" fill="var(--tw-gold)" stroke="var(--tw-cream)" strokeWidth="2"/>
      <text x="220" y="238" fill="var(--tw-gold)" fontFamily="var(--tw-font-heading)" fontWeight="800" fontSize="10" letterSpacing="0.04em">LEWES</text>
      <text x="200" y="60"  fill="rgba(254,252,248,0.55)" fontFamily="var(--tw-font-heading)" fontWeight="700" fontSize="9" letterSpacing="0.06em">NEW CASTLE</text>
      <text x="220" y="150" fill="rgba(254,252,248,0.55)" fontFamily="var(--tw-font-heading)" fontWeight="700" fontSize="9" letterSpacing="0.06em">KENT</text>
      <text x="240" y="220" fill="rgba(254,252,248,0.85)" fontFamily="var(--tw-font-heading)" fontWeight="800" fontSize="11" letterSpacing="0.04em">SUSSEX</text>
    </svg>
  );
}

function RentalDelawareWhy() {
  const items = [
    {
      tone: '', meta: 'Owner profile',
      title: 'Second-home heavy',
      body: 'A large share of Lewes&ndash;Rehoboth rental owners live elsewhere &mdash; mostly DC, NoVA, Philadelphia, NJ. We&rsquo;re built for remote-owner operations: DocuSign agreements, AppFolio owner portal, monthly statements with photos, named manager who walks the property in person.',
      foot: 'Same model as our deployed-military Anne Arundel portfolio',
    },
    {
      tone: 'gold', meta: 'Market rhythm',
      title: 'Seasonal demand curve',
      body: 'Coastal Delaware rentals don&rsquo;t lease on a Mid-Atlantic timeline. Summer-season demand from Memorial Day to Labor Day drives weekly &amp; monthly leases. Year-round long-term leases run a different cadence.',
      foot: 'Different operating model than mainland MD',
    },
    {
      tone: 'sage', meta: 'Regulatory',
      title: 'Landlord-friendlier than Maryland',
      body: 'Delaware has faster eviction timelines, no state-level rent control, no statewide rental license, and no state sales tax. Sussex County communities have local HOA rules &mdash; rental caps, minimum-term requirements, architectural review &mdash; that are often more restrictive than anything the state imposes. We track them per association.',
      foot: 'Math works differently than across the state line',
    },
  ];
  return (
    <section className="tw-geo-section linen">
      <div className="tw-container-wide">
        <div className="tw-section-head-left" style={{ maxWidth: 760, margin: '0 0 12px' }}>
          <div className="tw-eyebrow">Why Coastal Delaware Is Different</div>
          <h2 className="tw-section-title" style={{ margin: '10px 0 14px' }}>Lewes &amp; the Sussex coast, <em>operationally.</em></h2>
          <p className="tw-section-lede">Three things owners coming from a Maryland portfolio need to know before listing a Delaware property.</p>
        </div>
        <div className="tw-geo-law-grid">
          {items.map((it, i) => (
            <div key={i} className={`tw-geo-law-card ${it.tone}`}>
              <div className="tw-geo-law-meta">{it.meta}</div>
              <h3>{it.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: it.body }} />
              <div className="tw-geo-law-foot">{it.foot}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RentalDelawareCities() {
  const cities = [
    {
      slug: 'lewes', name: 'Lewes',
      meta: '40+ rentals · Sussex coastal',
      featured: true,
      body: 'Sussex County&rsquo;s &ldquo;first town&rdquo; &mdash; Old Town Lewes, Pilottown, Cape Henlopen, Henlopen Acres. Mix of year-round single-family, second-home condos, and seasonal coastal rentals.',
      cities: ['Old Town Lewes', 'Cape Henlopen', 'Pilottown', 'Henlopen Acres', 'Milton'],
      href: '/rental-management/delaware/lewes',
    },
    {
      slug: 'rehoboth', name: 'Rehoboth Beach',
      meta: 'Adjacent market',
      body: 'Boardwalk and downtown Rehoboth rentals. Heavy summer-season demand; some year-round long-term in surrounding neighborhoods.',
      cities: ['Downtown Rehoboth', 'North Shores', 'Pines'],
      href: '#',
    },
    {
      slug: 'bethany', name: 'Bethany Beach',
      meta: 'Coastal community',
      body: 'Family-oriented coastal community south of Rehoboth. Single-family, condo, and townhome inventory.',
      cities: ['Bethany Beach', 'South Bethany', 'Sea Colony'],
      href: '#',
    },
    {
      slug: 'fenwick', name: 'Fenwick Island',
      meta: 'Coastal community',
      body: "Delaware\'s southernmost beach community, adjoining Ocean City, MD. Mixed inventory.",
      cities: ['Fenwick Island', 'Selbyville'],
      href: '#',
    },
    {
      slug: 'inland', name: 'Sussex Inland',
      meta: 'Year-round market',
      body: 'Milton, Millsboro, Long Neck, Frankford, Dagsboro. Year-round single-family rental market for the workforce supporting the coastal economy.',
      cities: ['Milton', 'Millsboro', 'Long Neck', 'Frankford'],
      href: '#',
    },
  ];
  return (
    <section id="cities" className="tw-geo-section cream">
      <div className="tw-container-wide">
        <div className="tw-section-head" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <div className="tw-eyebrow">By Area</div>
          <h2 className="tw-section-title">Delaware rental management, <em>by where your property is.</em></h2>
          <p className="tw-section-lede">Lewes is our anchor; the rest of the Sussex coastal corridor is in active service rotation. We&rsquo;ll be honest on the first call about which areas we can serve well today.</p>
        </div>
        <div className="tw-geo-counties">
          {cities.map((c, i) => (
            <a key={i} href={c.href} className={`tw-geo-county-card ${c.featured ? 'featured' : ''}`}>
              {c.featured && <span className="tw-geo-county-flag">Live page</span>}
              <div className="tw-geo-county-head">
                <h3 className="tw-geo-county-name">{c.name}</h3>
              </div>
              <div className="tw-geo-county-meta" style={{ fontFamily: 'var(--tw-font-mono)', fontSize: 11, color: 'var(--tw-fg-subtle)', letterSpacing: '0.04em' }}>{c.meta}</div>
              <p className="tw-geo-county-body" dangerouslySetInnerHTML={{ __html: c.body }} />
              <div className="tw-geo-county-cities">
                {c.cities.map((city, j) => <span key={j} className="tw-geo-county-city">{city}</span>)}
              </div>
              <div className="tw-geo-county-cta">
                {c.featured ? 'View area page' : 'Page coming soon'} <span className="tw-geo-county-cta-arrow">&rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function RentalDelawareAudiences() {
  const groups = [
    {
      tone: '', eyebrow: 'Audience 01', title: 'Second-home owners',
      body: 'You bought the Lewes condo or the Bethany single-family for your own use, then realized renting it out 30 weeks a year more than covers the mortgage. We run it on your behalf without touching your peak personal weeks.',
      pills: ['Personal-use weeks honored', 'Monthly statements + photos', 'DocuSign agreements', '24/7 emergency line'],
    },
    {
      tone: 'gold', eyebrow: 'Audience 02', title: 'DC / Philly remote owners',
      body: "You live in NoVA, the District, or the Philly suburbs. You took the coastal property as an investment, an inheritance, or a future-retirement play. You don\'t want the call when the HVAC dies on July 4th weekend. That call comes to us.",
      pills: ['Vetted DE vendor network', 'Storm-season inspections', 'Owner portal access', 'Property walks documented'],
    },
    {
      tone: 'sage', eyebrow: 'Audience 03', title: 'Coastal investors',
      body: "You own one property today or several. Single-family, condo, small-multi. We won\'t take on apartment buildings or operate as a vacation-rental booking shop — if that\'s the goal, we\'ll point you somewhere reputable. For long-term and seasonal lease management, the math works.",
      pills: ['Multi-property portal', 'Cap-rate & rent-comp data', 'Annual portfolio review', 'No tenant-placement fee'],
    },
    {
      tone: 'clay', eyebrow: 'Audience 04', title: 'Accidental coastal landlords',
      body: "You inherited Mom\'s Lewes condo. You bought during the 2020s and the math changed. We do a free rent-vs-sell analysis and lay out the math both ways.",
      pills: ['Rent-vs-sell analysis', 'Compliance handled', 'Lease drafting', 'Realty referral available'],
    },
  ];
  return (
    <section className="tw-geo-section linen">
      <div className="tw-container-wide">
        <div className="tw-section-head" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <div className="tw-eyebrow">Who We Manage For</div>
          <h2 className="tw-section-title">Four owner profiles, <em>one operating standard.</em></h2>
          <p className="tw-section-lede">Coastal Delaware&rsquo;s rental owner base is mostly out-of-state. We&rsquo;re built for remote operations.</p>
        </div>
        <div className="tw-mgrid-2" style={{ gap: 20, marginTop: 48 }}>
          {groups.map((g, i) => (
            <div key={i} style={{
              background: 'var(--tw-cream)',
              border: '1px solid var(--tw-border)',
              borderRadius: 14,
              padding: '30px 32px 26px',
              borderLeft: '3px solid ' + (g.tone === 'gold' ? 'var(--tw-gold)' : g.tone === 'sage' ? 'var(--tw-sage)' : g.tone === 'clay' ? 'var(--tw-clay)' : 'var(--tw-teal)'),
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{ fontFamily: 'var(--tw-font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: g.tone === 'gold' ? '#8a7a3d' : g.tone === 'sage' ? 'var(--tw-sage)' : g.tone === 'clay' ? '#9a5a3a' : 'var(--tw-teal)' }}>{g.eyebrow}</div>
              <h3 style={{ fontFamily: 'var(--tw-font-heading)', fontWeight: 800, fontSize: 20, lineHeight: 1.25, color: 'var(--tw-dark)', margin: 0, letterSpacing: '-0.01em' }}>{g.title}</h3>
              <p style={{ fontFamily: 'var(--tw-font-body)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--tw-fg-muted)', margin: 0 }}>{g.body}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                {g.pills.map((p, j) => (
                  <span key={j} style={{
                    fontFamily: 'var(--tw-font-heading)', fontWeight: 600, fontSize: 11.5,
                    padding: '4px 10px', borderRadius: 999,
                    background: 'var(--tw-warm-100)', color: 'var(--tw-fg-muted)',
                    border: '1px solid var(--tw-border)',
                  }} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RentalDelaware() {
  return (
    <>
      <RentalDelawareHero />
      <RentalDelawareCities />
      <RentalDelawareWhy />
      <RentalDelawareAudiences />
    </>
  );
}
