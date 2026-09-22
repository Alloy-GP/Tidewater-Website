// src/config/site.ts
// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for all site-level config.
// BaseLayout pulls from here — never hardcode site name, URL, OG image,
// or org data in page files.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  // ── Identity ───────────────────────────────────────────────────────────────
  name:           'Tidewater Companies',
  url:            'https://tidewaterproperty.com',   // no trailing slash, non-www canonical

  // ── Default OG image ───────────────────────────────────────────────────────
  // 1200×630px PNG in /public/assets/. Per-page overrides via BaseLayout ogImage prop.
  defaultOgImage: '/assets/og.png',
  ogImageWidth:   '1200',
  ogImageHeight:  '630',

  // ── Locale / social ────────────────────────────────────────────────────────
  locale:         'en_US',
  twitterHandle:  '@TidewaterPM',

  // ── Organization schema (used on every page) ───────────────────────────────
  org: {
    // Site-wide node is the parent Organization. Location pages add their own
    // LocalBusiness node (see `offices` below + localBusinessSchema()).
    type:            'Organization' as const,
    logo:            'https://tidewaterproperty.com/assets/logo-main-white.svg',
    telephone:       '+14435480191',
    email:           'info@tidewaterproperty.com',
    streetAddress:   '3600 Crondall Lane, Suite 100',
    addressLocality: 'Owings Mills',
    addressRegion:   'MD',
    postalCode:      '21117',
    addressCountry:  'US',
    areaServed:      ['Maryland', 'Washington DC', 'Virginia', 'Delaware', 'Pennsylvania', 'West Virginia'],
    priceRange:      '$$',
    // Official social profiles — feeds both the footer links and the schema
    // `sameAs` (helps Google associate these profiles with the business).
    sameAs: [
      'https://www.facebook.com/TidewaterPMgmt/',
      'https://www.instagram.com/tidewaterpmgmt/',
      'https://www.linkedin.com/company/tidewater-property-management-inc./',
      'https://www.youtube.com/channel/UCigU8o0_uSOHUaT2oKzpljg',
    ],
  },

  // ── Physical offices (LocalBusiness nodes) ─────────────────────────────────
  // One entry per office with a street address we can verify from site copy.
  // Every location page emits a LocalBusiness for the office that serves it,
  // with `areaServed` set to that page's county/city. Addresses per the master
  // brief (Section 1 · Office Locations); Silver Spring units and ZIP verified
  // against the property listing for 10770 Columbia Pike.
  localBusinessName: 'Tidewater Property Management',
  offices: {
    hq: {
      id:              'owings-mills',
      label:           'Owings Mills Headquarters',
      streetAddress:   '3600 Crondall Lane, Suite 100',
      addressLocality: 'Owings Mills',
      addressRegion:   'MD',
      postalCode:      '21117',
      telephone:       '+14435480191',
    },
    silverSpring: {
      id:              'silver-spring',
      label:           'Silver Spring Office',
      streetAddress:   '10770 Columbia Pike, Units E-49 & E-51',
      addressLocality: 'Silver Spring',
      addressRegion:   'MD',
      postalCode:      '20901',
      telephone:       '+14435480191',
    },
    oceanCity: {
      id:              'ocean-city',
      label:           'Ocean City Office',
      streetAddress:   '8101 Coastal Highway, Suite 5',
      addressLocality: 'Ocean City',
      addressRegion:   'MD',
      postalCode:      '21842',
      telephone:       '+14435480191',
    },
    delaware: {
      id:              'lewes',
      label:           'Delaware Office',
      streetAddress:   '20375 John J Williams Highway',
      addressLocality: 'Lewes',
      addressRegion:   'DE',
      postalCode:      '19958',
      telephone:       '+14435480191',
    },
  },
};

export type OfficeKey = keyof typeof SITE.offices;
