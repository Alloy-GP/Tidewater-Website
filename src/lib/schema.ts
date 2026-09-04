// src/lib/schema.ts
// ─────────────────────────────────────────────────────────────────────────────
// Reusable JSON-LD schema builder functions.
//
// Usage in a .astro page:
//
//   import { breadcrumbSchema, serviceSchema } from '../lib/schema';
//   import { SITE } from '../config/site';
//
//   const schemas = [
//     serviceSchema({ name: 'HOA Management', description: '…', url: SITE.url + '/hoa-management' }),
//     breadcrumbSchema([
//       { name: 'Home', url: SITE.url + '/' },
//       { name: 'HOA Management', url: SITE.url + '/hoa-management' },
//     ]),
//   ];
//
//   Then pass to BaseLayout:
//   <BaseLayout pageSchema={schemas} ...>
// ─────────────────────────────────────────────────────────────────────────────

import { SITE, type OfficeKey } from '../config/site';

// ── Organization ─────────────────────────────────────────────────────────────
// Already rendered by BaseLayout on every page. Import only when you need
// to reference the org object inside another schema (e.g. Article publisher).

export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': SITE.org.type,
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: SITE.org.logo,
    telephone: SITE.org.telephone,
    email: SITE.org.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.org.streetAddress,
      addressLocality: SITE.org.addressLocality,
      postalCode: SITE.org.postalCode,
      addressRegion: SITE.org.addressRegion,
      addressCountry: SITE.org.addressCountry,
    },
    areaServed: SITE.org.areaServed,
    priceRange: SITE.org.priceRange,
    sameAs: SITE.org.sameAs,
  };
}

// ── BreadcrumbList ────────────────────────────────────────────────────────────
// items: ordered array from Home → current page.

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── FAQPage ───────────────────────────────────────────────────────────────────
// Keep answers identical to on-page text — Google penalises mismatches.

// Answers may be a string or an array of paragraphs (the FaqAccordion shape).
// HTML is stripped and entities decoded so the schema text matches what a
// reader sees, minus markup.

const stripHtml = (html: string) =>
  String(html)
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&rsquo;|&#39;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”')
    .replace(/&ldquo;/g, '“')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

export function faqSchema(faqs: Array<{ q: string; a: string | string[] }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: stripHtml(f.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: (Array.isArray(f.a) ? f.a : [f.a]).map(stripHtml).join(' '),
      },
    })),
  };
}

// ── Service ───────────────────────────────────────────────────────────────────

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  image?: string;
  areaServed?: string | string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    // Organization (not LocalBusiness) — a LocalBusiness provider would require
    // address/image and trips Google's rich-results validation; Organization
    // only needs name. Keep it minimal + valid.
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: opts.areaServed ?? SITE.org.areaServed,
    ...(opts.image ? { image: opts.image } : {}),
  };
}

// ── Article ───────────────────────────────────────────────────────────────────
// Use for blog posts, resource articles, guides. ogType="article" on the route.

export interface ArticleAuthor {
  name: string;
  /** e.g. 'Senior Community Manager, Tidewater' */
  jobTitle?: string;
  /** e.g. 'PCAM®' or 'CMCA · AMS · PCAM' — emitted as honorificSuffix */
  credentials?: string;
  /** Profile URL. Defaults to the leadership page. */
  url?: string;
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;   // ISO 8601: '2026-05-14'
  dateModified?: string;
  image?: string;
  about?: string[];
  /** Named author. Omit to fall back to the Organization. */
  author?: ArticleAuthor;
}) {
  const author = opts.author
    ? {
        '@type': 'Person',
        name: opts.author.name,
        url: opts.author.url ?? `${SITE.url}/about/leadership`,
        ...(opts.author.jobTitle ? { jobTitle: opts.author.jobTitle } : {}),
        ...(opts.author.credentials ? { honorificSuffix: opts.author.credentials } : {}),
        worksFor: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      }
    : { '@type': 'Organization', name: SITE.name, url: SITE.url };
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: SITE.org.logo },
    },
    mainEntityOfPage: opts.url,
    inLanguage: 'en-US',
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.about
      ? { about: opts.about.map((name) => ({ '@type': 'Thing', name })) }
      : {}),
  };
}

// ── LocalBusiness ─────────────────────────────────────────────────────────────
// One node per physical office, scoped to the area a location page covers.
// Use on every county / city / state landing page:
//
//   localBusinessSchema({
//     office: 'hq',                       // key of SITE.offices (default 'hq')
//     url: pageUrl,                       // the location page
//     areaServed: { name: 'Howard County', type: 'AdministrativeArea', containedIn: 'Maryland' },
//     description: '…',
//   })
//
// The site-wide Organization node (BaseLayout) is the parent; this node links
// back to it via parentOrganization so Google sees one business, many offices.

export interface AreaServed {
  name: string;
  /** 'AdministrativeArea' for counties/states, 'City' for cities/towns. */
  type?: 'AdministrativeArea' | 'City' | 'State';
  /** Parent region, e.g. 'Maryland'. */
  containedIn?: string;
}

export function localBusinessSchema(opts: {
  office?: OfficeKey;
  url: string;
  areaServed: AreaServed | AreaServed[] | string | string[];
  description?: string;
  /** Override the displayed business name (defaults to SITE.localBusinessName). */
  name?: string;
}) {
  const office = SITE.offices[opts.office ?? 'hq'];
  const toArea = (a: AreaServed | string) =>
    typeof a === 'string'
      ? { '@type': 'AdministrativeArea', name: a }
      : {
          '@type': a.type ?? 'AdministrativeArea',
          name: a.name,
          ...(a.containedIn ? { containedInPlace: { '@type': 'State', name: a.containedIn } } : {}),
        };
  const areas = (Array.isArray(opts.areaServed) ? opts.areaServed : [opts.areaServed]).map(toArea);
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE.url}/#office-${office.id}`,
    name: opts.name ?? SITE.localBusinessName,
    alternateName: SITE.name,
    url: opts.url,
    image: SITE.org.logo,
    logo: SITE.org.logo,
    telephone: office.telephone,
    email: SITE.org.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.streetAddress,
      addressLocality: office.addressLocality,
      addressRegion: office.addressRegion,
      ...('postalCode' in office && office.postalCode ? { postalCode: office.postalCode } : {}),
      addressCountry: 'US',
    },
    areaServed: areas.length === 1 ? areas[0] : areas,
    priceRange: SITE.org.priceRange,
    sameAs: SITE.org.sameAs,
    parentOrganization: { '@type': 'Organization', '@id': `${SITE.url}/#organization`, name: SITE.name, url: SITE.url },
    ...(opts.description ? { description: opts.description } : {}),
  };
}
