// src/data/newsletters.ts
//
// The Board Brief issue index. The newest LIVE entry is treated as the current
// issue and drives the archive page's spotlight.
//
// ADDING NEXT MONTH
//   1. Generate the cover art:
//        python3 scripts/make-newsletter-cover.py --month 11 --year 2026 --issue 3 \
//          --title "The issue's headline."
//   2. Add an entry here (order does not matter; everything sorts by dateIso).
//   3. Add src/components/newsletter/issues/<slug>.astro for the issue itself —
//      copy the latest one. The route src/pages/resources/newsletter/[slug].astro
//      picks it up by file name.
// Nothing else changes: the spotlight, the archive grid, the year filter and the
// year grouping all derive from this array.
//
// SCHEDULING
//   An issue can be merged ahead of its send date. On the production build
//   (PUBLIC_ENV=production, the same switch BaseLayout uses for GA and robots)
//   only issues whose dateIso has arrived, Eastern time, are built: the page
//   404s, the archive does not list it, the sitemap does not include it. Every
//   other build — local dev, Vercel preview deployments — shows everything, so a
//   scheduled issue can be reviewed on its preview URL (those builds are noindex).
//   The daily workflow in .github/workflows/publish-scheduled-newsletter.yml
//   triggers a production rebuild on each issue's send date.

export interface NewsletterIssue {
  /** Issue number. Displayed zero-padded ("No. 01"). */
  no: number;
  month: string;
  year: number;
  /** Send date, ISO 8601. Used for <time>, for sorting, and as the go-live gate. */
  dateIso: string;
  /** URL slug: {month-name}-{year}, lowercase. */
  slug: string;
  /** Title Case, ends in a period. */
  title: string;
  /** The email's lede paragraph, 1–2 sentences. */
  dek: string;
  /** The email's "In This Issue" lines, in order. */
  topics: string[];
  /** Cover art from scripts/make-newsletter-cover.py. */
  image: string;
  imageAlt: string;
  /** 1200x630 social card from the same script. */
  ogImage: string;
  readTime: number;
}

export const ISSUES: NewsletterIssue[] = [
  {
    no: 2,
    month: 'October',
    year: 2026,
    dateIso: '2026-10-06',
    slug: 'october-2026',
    title: 'This Is the Month the Plan Becomes a Vote.',
    dek: 'Budgets get adopted, annual meetings get noticed, and the first hard freeze arrives before the last leaf is down. Here’s what belongs on your agenda before the year closes.',
    topics: [
      'Expo recap — and the Delmarva Expo ahead',
      'Adopting the 2027 budget — the notice window',
      'Winterize before the first freeze — five things',
      'Annual meeting season and the year-end close',
      'Five new community managers',
    ],
    image: '/assets/newsletter-october-2026.jpg',
    imageAlt: 'The Board Brief, Issue No. 02, October 2026 — “This is the month the plan becomes a vote.”',
    ogImage: '/assets/og-newsletter-october-2026.jpg',
    readTime: 7,
  },
  {
    no: 1,
    month: 'August',
    year: 2026,
    dateIso: '2026-08-04',
    slug: 'august-2026',
    title: 'August Is Where Next Year Gets Decided.',
    dek: 'Budget season, contract renewals, and the worst of storm season all land inside the same eight weeks — and the boards that get ahead of them in August aren’t the ones scrambling in November.',
    topics: [
      'CAI Chesapeake Symposium & Expo — registration open',
      'Why your board should join CAI',
      '2027 budgets & service contracts — the August-to-December pace',
      'Storm season prep — five things to confirm',
      'Pool close-out & fall landscaping contracts',
    ],
    image: '/assets/newsletter-august-2026.jpg',
    imageAlt: 'The Board Brief, Issue No. 01, August 2026 — “August is where next year gets decided.”',
    ogImage: '/assets/og-newsletter-august-2026.jpg',
    readTime: 6,
  },
];

// Today's date in Eastern time as YYYY-MM-DD, evaluated once per build.
const TODAY_ET = new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
const IS_PRODUCTION = import.meta.env.PUBLIC_ENV === 'production';

/** True once the issue's send date has arrived — or on any non-production build. */
export const isLive = (issue: NewsletterIssue) => !IS_PRODUCTION || issue.dateIso <= TODAY_ET;

/** The issues this build publishes. Everything below derives from this. */
export const LIVE = ISSUES.filter(isLive);

/** Newest first. */
export const SORTED = [...LIVE].sort((a, b) => b.dateIso.localeCompare(a.dateIso));

/** The issue the archive page spotlights. */
export const CURRENT = SORTED[0];

/** The oldest issue — "Monthly since …" on the archive page. */
export const FIRST = SORTED[SORTED.length - 1];

/** Everything below the spotlight. */
export const PAST = SORTED.slice(1);

export const href = (issue: NewsletterIssue) => `/resources/newsletter/${issue.slug}`;

export const issueLabel = (issue: NewsletterIssue) => `No. ${String(issue.no).padStart(2, '0')}`;

export const YEARS = [...new Set(PAST.map((i) => i.year))].sort((a, b) => b - a);
