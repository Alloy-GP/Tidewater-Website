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
    type:            'LocalBusiness' as const,
    logo:            'https://tidewaterproperty.com/assets/logo-main-white.svg',
    telephone:       '+18558765500',
    email:           'info@tidewaterproperty.com',
    addressLocality: 'Owings Mills',
    addressRegion:   'MD',
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
};
