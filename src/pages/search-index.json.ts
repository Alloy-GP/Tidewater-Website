// /search-index.json — the site search index, prerendered at build time.
// Fetched on first use by the header search (SiteSearch.jsx) and the mobile
// menu, so no page carries the index inline. Source: src/data/search-index.ts.
import type { APIRoute } from 'astro';
import { buildSearchIndex } from '../data/search-index';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(buildSearchIndex()), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
