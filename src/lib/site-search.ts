// Site search — matching and ranking, shared by the header search panel
// (SiteSearch.jsx) and the mobile menu (MobileMenu.jsx). The index itself is
// built at build time (src/data/search-index.ts) and served as
// /search-index.json, so the islands stay small and fetch it on first use.

export interface SearchEntry {
  /** Title shown in results. Plain text, no HTML. */
  t: string;
  /** Route, no trailing slash. */
  h: string;
  /** Section the result is grouped under ("Articles & Guides", "Locations"…). */
  s: string;
  /** Breadcrumb-style context under the title ("HOA Management · Maryland"). */
  c?: string;
  /** One-line description. */
  d?: string;
  /** Extra match terms not in the title (city names, synonyms). Space-separated. */
  k?: string;
}

export interface SearchHit extends SearchEntry { score: number }

const fold = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’'`]/g, '');

const tokens = (s: string) => fold(s).split(/[^a-z0-9&]+/).filter((w) => w.length > 1);

/** Rank `entries` against `query`. Empty query → no hits (callers show quick links). */
export function searchIndex(entries: SearchEntry[], query: string, limit = 12): SearchHit[] {
  const q = fold(query.trim());
  if (!q) return [];
  const words = tokens(q);
  if (!words.length) return [];

  const hits: SearchHit[] = [];
  for (const e of entries) {
    const title = fold(e.t);
    const crumb = fold(e.c || '');
    const desc = fold(e.d || '');
    const keys = fold(e.k || '');
    const section = fold(e.s);
    let score = 0;

    if (title === q) score += 160;
    else if (title.startsWith(q)) score += 120;
    else if (title.includes(q)) score += 90;
    else if (keys.includes(q)) score += 70;
    else if (crumb.includes(q)) score += 40;

    let matched = 0;
    for (const w of words) {
      let hit = 0;
      if (title.includes(w)) hit = 28;
      else if (keys.includes(w)) hit = 20;
      else if (crumb.includes(w)) hit = 12;
      else if (section.includes(w)) hit = 8;
      else if (desc.includes(w)) hit = 6;
      if (hit) { score += hit; matched++; }
    }
    // Every word has to land somewhere, or the hit is noise.
    if (matched < words.length) continue;
    if (score <= 0) continue;
    // Shorter titles win ties (a hub page over a long article title).
    score += Math.max(0, 20 - title.length / 4);
    hits.push({ ...e, score });
  }
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit);
}

/** Group ranked hits by section, keeping section order by best hit. */
export function groupHits(hits: SearchHit[]): { section: string; items: SearchHit[] }[] {
  const groups: { section: string; items: SearchHit[] }[] = [];
  for (const h of hits) {
    let g = groups.find((x) => x.section === h.s);
    if (!g) { g = { section: h.s, items: [] }; groups.push(g); }
    g.items.push(h);
  }
  return groups;
}

/** Split `text` around the first case-insensitive occurrence of `q` for <mark>. */
export function splitMatch(text: string, q: string): [string, string, string] | null {
  const needle = q.trim().toLowerCase();
  if (!needle) return null;
  const i = text.toLowerCase().indexOf(needle);
  if (i < 0) return null;
  return [text.slice(0, i), text.slice(i, i + needle.length), text.slice(i + needle.length)];
}
