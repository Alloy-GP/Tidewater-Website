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

import { SITE } from '../config/site';

// ── Organization ─────────────────────────────────────────────────────────────
// Already rendered by BaseLayout on every page. Import only when you need
// to reference the org object inside another schema (e.g. Article publisher).

export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': SITE.org.type,
    name: SITE.name,
    url: SITE.url,
    logo: SITE.org.logo,
    telephone: SITE.org.telephone,
    email: SITE.org.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.org.addressLocality,
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

export function faqSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
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

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;   // ISO 8601: '2026-05-14'
  dateModified?: string;
  image?: string;
  about?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
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
// Use on the About or Contact page for the full local business card.

export function localBusinessSchema(opts?: { description?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    url: SITE.url,
    logo: SITE.org.logo,
    telephone: SITE.org.telephone,
    email: SITE.org.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.org.addressLocality,
      addressRegion: SITE.org.addressRegion,
      addressCountry: SITE.org.addressCountry,
    },
    areaServed: SITE.org.areaServed,
    priceRange: SITE.org.priceRange,
    ...(opts?.description ? { description: opts.description } : {}),
  };
}

/**
 * WebSite + SearchAction. Emitted once, on the homepage only — Google expects a
 * single WebSite node per site, on the root. Points at the FAQ hub, which is
 * the site's only real search surface.
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url + '/',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/faq?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
