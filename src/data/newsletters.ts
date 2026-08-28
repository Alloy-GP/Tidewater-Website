// src/data/newsletters.ts
//
// The Board Brief issue index. Newest first — the first entry is treated as the
// current issue and drives the archive page's spotlight.
//
// ADDING NEXT MONTH
//   1. Generate the cover art:
//        python3 scripts/make-newsletter-cover.py --month 9 --year 2026 --issue 2 --day 1
//   2. Prepend an entry here.
//   3. Add src/pages/resources/newsletter/<slug>.astro for the issue itself.
// Nothing else changes: the spotlight, the archive grid, the year filter and the
// year grouping all derive from this array.

export interface NewsletterIssue {
  /** Issue number. Displayed zero-padded ("No. 01"). */
  no: number;
  month: string;
  year: number;
  /** Send date, ISO 8601. Used for <time> and for sorting. */
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
    imageAlt: 'August 2026 calendar with the fourth ringed in gold — the send date of Board Brief issue No. 01',
    ogImage: '/assets/og-newsletter-august-2026.jpg',
    readTime: 6,
  },
];

/** Newest first. */
export const SORTED = [...ISSUES].sort((a, b) => b.dateIso.localeCompare(a.dateIso));

/** The issue the archive page spotlights. */
export const CURRENT = SORTED[0];

/** Everything below the spotlight. */
export const PAST = SORTED.slice(1);

export const href = (issue: NewsletterIssue) => `/resources/newsletter/${issue.slug}`;

export const issueLabel = (issue: NewsletterIssue) => `No. ${String(issue.no).padStart(2, '0')}`;

export const YEARS = [...new Set(PAST.map((i) => i.year))].sort((a, b) => b - a);
