// Maryland Rental Management Hub — /rental-management/maryland
// Audience: deployed military, out-of-state investors, accidental landlords, first-time owners.
// Stack: AppFolio. Flat 8.5% fee.

import LocationMap from './LocationMap.jsx';

const CheckSmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────
function RentalMarylandHero({ map }) {
  return (
    <section className="tw-geo-hero">
      <div className="tw-geo-hero-bg"></div>
      <div className="tw-geo-hero-paper"></div>
      <div className="tw-geo-hero-grid">
        <div className="tw-geo-hero-copy">
          <h1 className="tw-geo-hero-title">
            Rental management <em>across Maryland</em> &mdash; from the Bay to the Beltway.
          </h1>
          <p className="tw-geo-hero-lede">
            For owners who don&rsquo;t live where their rental does. Deployed military, out-of-state investors, accidental landlords, first-time owners. We manage 700+ single-family and small-multifamily rentals across the state &mdash; one flat fee, AppFolio-backed, named local property managers in every market.
          </p>
          <div className="tw-geo-hero-actions">
            <a href="/request-a-proposal" className="tw-btn tw-btn-primary tw-btn-lg">Get a free rental analysis →</a>
            <a href="#counties" className="tw-btn tw-btn-ghost">Find your county →</a>
          </div>
          <div className="tw-geo-hero-stats">
            <div>
              <div className="tw-geo-hero-stat-num">700+</div>
              <div className="tw-geo-hero-stat-label">Maryland single-family &amp; small-multi rentals managed</div>
            </div>
            <div>
              <div className="tw-geo-hero-stat-num gold">8.5%</div>
              <div className="tw-geo-hero-stat-label">Flat monthly fee &mdash; no tenant-placement upcharge</div>
            </div>
            <div>
              <div className="tw-geo-hero-stat-num">35 yrs</div>
              <div className="tw-geo-hero-stat-label">Managing Mid-Atlantic rentals, family-owned since 1989</div>
            </div>
          </div>
        </div>
        <aside className="tw-geo-hero-side">
          <div className="tw-geo-hero-side-eyebrow">Where we manage</div>
          <h3>10 counties + Baltimore City</h3>
          <LocationMap theme="dark" {...map} ariaLabel="Map of the Maryland counties where Tidewater manages rentals" height={320} />
          <div className="tw-geo-map-legend">
            <div className="tw-geo-map-legend-row">
              <span className="tw-geo-map-legend-swatch served"></span>
              Counties we currently serve
            </div>
            <div className="tw-geo-map-legend-row">
              <span className="tw-geo-map-legend-swatch hq"></span>
              Headquarters &middot; Owings Mills
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Counties directory
// ─────────────────────────────────────────────────────────────
function RentalMarylandCounties() {
  const counties = [
    {
      name: 'Anne Arundel County',
      meta: '420+ rentals · Naval Academy &amp; Fort Meade',
      featured: true,
      body: 'Highest density of single-family rentals in our Maryland portfolio. Strong demand from Naval Academy, Fort Meade, BWI corridor. Annapolis waterfront and Severna Park family homes lease in 14&ndash;21 days.',
      cities: ['Annapolis', 'Severna Park', 'Crofton', 'Pasadena', 'Glen Burnie', 'Odenton'],
      href: '/rental-management/maryland/anne-arundel-county',
    },
    {
      name: 'Silver Spring',
      meta: '180+ rentals · DC commuter market',
      featured: true,
      body: 'Metro-adjacent rental demand from DC commuters, NIH/FDA workforce, University of Maryland-bound households. Mix of single-family, downtown condo, and townhome.',
      cities: ['Downtown SS', 'Four Corners', 'Forest Glen', 'Aspen Hill', 'Wheaton border'],
      href: '/rental-management/maryland/silver-spring',
    },
    {
      name: 'Baltimore County',
      meta: 'HQ county · ~150 rentals',
      featured: true,
      body: "Tidewater\'s home county. Strong single-family and condo rental demand around Towson, Owings Mills, and the Hunt Valley corridor. County rental licensing handled.",
      cities: ['Towson', 'Cockeysville', 'Pikesville', 'Owings Mills'],
      href: '/rental-management/maryland/baltimore-county',
    },
    {
      name: 'Howard County',
      meta: 'Columbia &amp; Ellicott City',
      featured: true,
      body: "Columbia\'s village structure layered HOAs over rental properties &mdash; we navigate both. Strong demand in Ellicott City, Elkridge. Median rents above county average.",
      cities: ['Columbia', 'Ellicott City', 'Elkridge'],
      href: '/rental-management/maryland/howard-county',
    },
    {
      name: 'Montgomery County',
      meta: 'DC Metro · Rockville to Gaithersburg',
      featured: true,
      body: 'Beyond Silver Spring &mdash; Rockville, Gaithersburg, Bethesda condos and townhomes. Heavy federal-workforce rental demand. Montgomery County rental licensing handled.',
      cities: ['Rockville', 'Bethesda', 'Gaithersburg'],
      href: '/rental-management/maryland/montgomery-county',
    },
    {
      name: "Prince George\'s County",
      meta: 'DC Metro · Bowie &amp; Largo',
      featured: true,
      body: 'Townhome and garden-style rentals. Strong demand near Bowie State, NASA Goddard, and the Metro corridor. PG County rental license &amp; lead-paint compliance handled.',
      cities: ['Bowie', 'Largo', 'Greenbelt', 'Hyattsville'],
      href: '/rental-management/maryland/prince-georges-county',
    },
  ];
  return (
    <section id="counties" className="tw-geo-section cream">
      <div className="tw-container-wide">
        <div className="tw-section-head" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <div className="tw-eyebrow">By County</div>
          <h2 className="tw-section-title">Maryland rental management, <em>by where your property is.</em></h2>
          <p className="tw-section-lede">Each county has its own rental license, lead-paint rules, and security-deposit conventions. We track the requirements; you don&rsquo;t have to.</p>
        </div>
        <div className="tw-geo-counties">
          {counties.map((c, i) => (
            <a key={i} href={c.href} className={`tw-geo-county-card ${c.featured ? 'featured' : ''}`}>
              <div className="tw-geo-county-head">
                <h3 className="tw-geo-county-name">{c.name}</h3>
              </div>
              <div className="tw-geo-county-meta" dangerouslySetInnerHTML={{ __html: c.meta }} />
              <p className="tw-geo-county-body" dangerouslySetInnerHTML={{ __html: c.body }} />
              <div className="tw-geo-county-cities">
                {c.cities.map((city, j) => <span key={j} className="tw-geo-county-city">{city}</span>)}
              </div>
              <div className="tw-geo-county-cta">
                {c.featured ? 'View county page' : 'County page coming soon'} <span className="tw-geo-county-cta-arrow">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Owner audiences
// ─────────────────────────────────────────────────────────────
function RentalMarylandAudiences() {
  const groups = [
    {
      tone: '',
      eyebrow: 'Audience 01',
      title: 'Deployed military &amp; relocating service members',
      body: 'Anne Arundel, Charles, and Harford have heavy active-duty footprints &mdash; Naval Academy, Fort Meade, Aberdeen. Roughly a third of our county portfolio is owned by deployed or relocated military personnel.',
      pills: ['DocuSign owner agreements', 'AppFolio owner portal', 'Power-of-attorney capable', '24/7 emergency line'],
    },
    {
      tone: 'gold',
      eyebrow: 'Audience 02',
      title: 'Out-of-state &amp; relocated owners',
      body: "You took the DC job. The federal posting. The career move. The house didn\'t sell, or you decided to keep it. We run it on your behalf with the same operational discipline we\'d use on our own.",

      pills: ['Monthly statements + photos', 'Direct deposit within 7 days', 'Annual rent-vs-sell analysis', 'Tax-ready year-end reporting'],
    },
    {
      tone: 'sage',
      eyebrow: 'Audience 03',
      title: 'Accidental landlords',
      body: "You inherited the property. The market didn\'t cooperate. The kids moved out and the house is paid off. The first-time-landlord learning curve isn\'t worth the trouble &mdash; we handle the whole thing.",

      pills: ['Free rental market analysis', 'Lease drafting + execution', 'Compliance handled', 'Maintenance dispatch'],
    },
    {
      tone: 'clay',
      eyebrow: 'Audience 04',
      title: 'Investors &amp; buy-and-hold owners',
      body: "Single-family, townhome, condo, 2&ndash;4 unit. We won\'t touch apartment complexes or short-term rentals &mdash; if you have those, we\'ll point you somewhere reputable. For the rest, the math works.",

      pills: ['Multi-property owner portal', 'Annual portfolio review', 'Cap-rate &amp; rent-comp data', 'Local market expertise'],
    },
  ];
  const accentColor = (tone) => ({ gold: '#8a7a3d', sage: 'var(--tw-sage)', clay: '#9a5a3a' }[tone] || 'var(--tw-teal)');
  const borderColor = (tone) => ({ gold: 'var(--tw-gold)', sage: 'var(--tw-sage)', clay: 'var(--tw-clay)' }[tone] || 'var(--tw-teal)');

  return (
    <section className="tw-geo-section linen">
      <div className="tw-container-wide">
        <div className="tw-section-head" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <div className="tw-eyebrow">Who We Manage For</div>
          <h2 className="tw-section-title">Four owner profiles, <em>one operating standard.</em></h2>
          <p className="tw-section-lede">Maryland\'s rental owner base looks different from most states &mdash; heavy military, heavy federal, heavy out-of-state. We\'re built for that.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 48 }}>
          {groups.map((g, i) => (
            <div key={i} style={{ background: 'var(--tw-cream)', border: '1px solid var(--tw-border)', borderRadius: 14, padding: '30px 32px 26px', borderLeft: `3px solid ${borderColor(g.tone)}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontFamily: 'var(--tw-font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: accentColor(g.tone) }}>{g.eyebrow}</div>
              <h3 style={{ fontFamily: 'var(--tw-font-heading)', fontWeight: 800, fontSize: 20, lineHeight: 1.25, color: 'var(--tw-dark)', margin: 0, letterSpacing: '-0.01em' }} dangerouslySetInnerHTML={{ __html: g.title }} />
              <p style={{ fontFamily: 'var(--tw-font-body)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--tw-fg-muted)', margin: 0 }} dangerouslySetInnerHTML={{ __html: g.body }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                {g.pills.map((p, j) => (
                  <span key={j} dangerouslySetInnerHTML={{ __html: p }} style={{ fontFamily: 'var(--tw-font-heading)', fontWeight: 600, fontSize: 11.5, padding: '4px 10px', borderRadius: 999, background: 'var(--tw-warm-100)', color: 'var(--tw-fg-muted)', border: '1px solid var(--tw-border)' }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Fee comparison strip
// ─────────────────────────────────────────────────────────────
function RentalMarylandFee() {
  const bullets = [
    '<strong>No tenant-placement fee</strong> &mdash; even at re-lease',
    '<strong>No maintenance markup</strong> &mdash; you see every vendor invoice',
    '<strong>No annual renewal fee</strong>',
    '<strong>No lease-drafting fee</strong>',
    'Free rental market analysis before you sign',
  ];
  const rows = [
    { label: 'Tidewater', sub: '8.5% mgmt only', val: '$2,550', detail: 'in fees, year one', highlight: true },
    { label: 'Typical Maryland competitor', sub: '50% placement + 10% mgmt', val: '$4,250', detail: 'in fees, year one' },
    { label: 'Self-managed', sub: 'Your time at $50/hr · ~6 hrs/mo', val: '$3,600', detail: 'opportunity cost, year one' },
  ];
  return (
    <section style={{ background: 'var(--tw-dark)', color: 'var(--tw-cream)', padding: '56px 0' }}>
      <div className="tw-container-wide">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div className="tw-eyebrow tw-eyebrow-gold">One Flat Fee</div>
            <h2 style={{ fontFamily: 'var(--tw-font-heading)', fontWeight: 800, fontSize: 'clamp(28px, 2.8vw, 36px)', lineHeight: 1.15, letterSpacing: '-0.015em', color: 'var(--tw-cream)', margin: '10px 0 18px', textWrap: 'balance' }}>
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--tw-gold)' }}>8.5%</em> of monthly rent collected. That&rsquo;s it.
            </h2>
            <p style={{ fontFamily: 'var(--tw-font-body)', fontSize: 16, lineHeight: 1.65, color: 'rgba(254,252,248,0.78)', margin: '0 0 18px', maxWidth: 560 }}>
              Most Maryland competitors charge a tenant-placement fee equal to 50&ndash;100% of one month&rsquo;s rent, plus a monthly management fee on top, plus maintenance markups. We don&rsquo;t. One flat percentage, no surprises.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {bullets.map((line, i) => (
                <li key={i} style={{ fontFamily: 'var(--tw-font-body)', fontSize: 14.5, color: 'rgba(254,252,248,0.78)', display: 'grid', gridTemplateColumns: '22px 1fr', gap: 10 }}>
                  <span style={{ color: 'var(--tw-gold)', marginTop: 2 }}><CheckSmIcon /></span>
                  <span dangerouslySetInnerHTML={{ __html: line }} />
                </li>
              ))}
            </ul>
          </div>
          <aside style={{ background: 'rgba(254,252,248,0.04)', border: '1px solid rgba(254,252,248,0.12)', borderRadius: 14, padding: 32, backdropFilter: 'blur(8px)' }}>
            <div style={{ fontFamily: 'var(--tw-font-heading)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--tw-gold)', marginBottom: 18 }}>Cost comparison · sample 3BR home @ $2,500/mo</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {rows.map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14, padding: '14px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.10)' : 'none' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--tw-font-heading)', fontWeight: 700, fontSize: 14, color: row.highlight ? 'var(--tw-gold)' : 'var(--tw-cream)' }}>{row.label}</div>
                    <div style={{ fontFamily: 'var(--tw-font-body)', fontSize: 12, color: 'rgba(254,252,248,0.55)', marginTop: 2 }}>{row.sub}</div>
                  </div>
                  <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ fontFamily: 'var(--tw-font-heading)', fontWeight: 800, fontSize: 20, color: row.highlight ? 'var(--tw-gold)' : 'var(--tw-cream)', letterSpacing: '-0.01em' }}>{row.val}</div>
                    <div style={{ fontFamily: 'var(--tw-font-body)', fontSize: 11, color: 'rgba(254,252,248,0.55)', marginTop: 2 }}>{row.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: '10px 12px', background: 'rgba(191,172,95,0.10)', border: '1px solid rgba(191,172,95,0.30)', borderRadius: 8, fontFamily: 'var(--tw-font-body)', fontSize: 11.5, color: 'rgba(254,252,248,0.70)', lineHeight: 1.45, fontStyle: 'italic' }}>
              Sample math &mdash; actual fees depend on rent collected and re-lease frequency.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Maryland landlord law / compliance
// ─────────────────────────────────────────────────────────────
function RentalMarylandLaw() {
  const items = [
    {
      tone: '', meta: 'Md. Code · Real Property § 8',
      title: 'Maryland Landlord-Tenant Law',
      body: "Maryland\'s landlord-tenant framework: security deposits (max 1 month's rent + interest accrual), required disclosures, repair-and-deduct, eviction notice periods. We operate inside it by default.",

      foot: 'Compliance handled, not delegated',
    },
    {
      tone: 'gold', meta: 'County-level',
      title: 'County Rental Licensing',
      body: "Anne Arundel, Baltimore, Montgomery, Prince George\'s, and Howard each require separate rental licenses with their own inspection cadence, fees, and renewal schedules. We file, track, and renew on your behalf.",

      foot: 'No license lapses, ever',
    },
    {
      tone: 'sage', meta: 'Federal &amp; state',
      title: 'Lead-Paint Compliance',
      body: 'Pre-1978 Maryland rentals require lead-paint inspection &amp; tenant disclosure. We coordinate inspections, file the necessary certificates, and ensure every lease includes the required EPA disclosure.',
      foot: 'Critical for pre-1978 properties',
    },
  ];
  return (
    <section className="tw-geo-section linen">
      <div className="tw-container-wide">
        <div className="tw-section-head-left" style={{ maxWidth: 760, margin: '0 0 12px' }}>
          <div className="tw-eyebrow">Maryland Compliance</div>
          <h2 className="tw-section-title" style={{ margin: '10px 0 14px' }}>The statutes that govern <em>Maryland rentals.</em></h2>
          <p className="tw-section-lede">Maryland is among the more rigorous Mid-Atlantic states on landlord-tenant law. Owners outside the state are often surprised. We track every requirement &mdash; you don&rsquo;t have to.</p>
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

// ─────────────────────────────────────────────────────────────
// Page composer
// ─────────────────────────────────────────────────────────────
// `map` = RENTAL_MARYLAND_MAP (src/data/location-maps.ts), passed from the page.
export default function RentalMaryland({ map }) {
  return (
    <>
      <RentalMarylandHero map={map} />
      <RentalMarylandCounties />
      <RentalMarylandAudiences />
      <RentalMarylandFee />
      <RentalMarylandLaw />
    </>
  );
}
