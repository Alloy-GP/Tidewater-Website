// Tidewater — site search. A full-width panel that drops from the header when
// the search icon next to "Resources" is clicked (or on "/" and Cmd/Ctrl+K).
// Opened by the header via a `tw-open-search` window event; the index is
// fetched from /search-index.json on first open (src/data/search-index.ts).
// Matching/ranking lives in src/lib/site-search.ts, shared with the mobile menu.
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { searchIndex, groupHits, splitMatch } from '../lib/site-search';

const I = {
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  close:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  arrow:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
};

// Shown before anyone types. Routes only — no copy to drift.
const QUICK_POPULAR = [
  { t: 'Request a Proposal / Contact', h: '/request-a-proposal' },
  { t: 'HOA Management', h: '/hoa-management' },
  { t: 'Condo Association Management', h: '/condo-management' },
  { t: 'Rental Property Management', h: '/rental-management' },
  { t: 'Available Rentals', h: '/rental-listings' },
  { t: 'Switching HOA Management Companies', h: '/solutions/switching-hoa-management-company' },
  { t: 'FAQ', h: '/faq' },
];
const QUICK_LOCATIONS = [
  { t: 'Service Areas — six states', h: '/service-areas' },
  { t: 'Maryland counties', h: '/hoa-management/maryland' },
  { t: 'Delaware', h: '/hoa-management/delaware' },
  { t: 'Washington, DC', h: '/hoa-management/washington-dc' },
  { t: 'Owings Mills HQ', h: '/locations/maryland/owings-mills' },
  { t: 'Ocean City office', h: '/locations/maryland/ocean-city' },
  { t: 'Lewes office', h: '/locations/delaware/lewes' },
];

let indexPromise = null;
function loadIndex() {
  if (!indexPromise) {
    indexPromise = fetch('/search-index.json')
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => []);
  }
  return indexPromise;
}

function Mark({ text, q }) {
  const parts = splitMatch(text, q);
  if (!parts) return text;
  return (<>{parts[0]}<mark>{parts[1]}</mark>{parts[2]}</>);
}

const isTyping = (el) => {
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
};

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [index, setIndex] = useState(null);
  const [active, setActive] = useState(-1);
  const [top, setTop] = useState(80);
  const inputRef = useRef(null);
  const openerRef = useRef(null);

  // The panel hangs off the bottom edge of the sticky header.
  const place = useCallback(() => {
    const header = document.querySelector('.tw-header');
    setTop(header ? Math.max(0, Math.round(header.getBoundingClientRect().bottom)) : 0);
  }, []);

  const openSearch = useCallback(() => {
    window.__twSearchPending = false;
    openerRef.current = document.activeElement;
    place();
    setOpen(true);
    loadIndex().then(setIndex);
  }, [place]);
  const close = useCallback(() => setOpen(false), []);

  // Openers: the header icon (event), "/" anywhere outside a field, Cmd/Ctrl+K.
  useEffect(() => {
    const onOpen = () => openSearch();
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        open ? close() : openSearch();
        return;
      }
      if (e.key === '/' && !open && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping(e.target)) {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('tw-open-search', onOpen);
    window.addEventListener('keydown', onKey);
    // Clicked before this island hydrated? The header leaves a flag.
    if (window.__twSearchPending) openSearch();
    return () => {
      window.removeEventListener('tw-open-search', onOpen);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, openSearch, close]);

  // Open/close side effects: body scroll lock, button state, focus, Esc.
  useEffect(() => {
    const btn = document.getElementById('tw-nav-search');
    document.body.classList.toggle('tw-search-open', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (!open) {
      setQ('');
      setActive(-1);
      const o = openerRef.current;
      if (o && typeof o.focus === 'function' && document.contains(o) && o !== document.body) o.focus();
      return undefined;
    }
    const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 30);
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', place);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', place);
    };
  }, [open, close, place]);

  const searching = q.trim().length > 0;
  const hits = useMemo(() => (index && searching ? searchIndex(index, q, 12) : []), [index, q, searching]);
  const groups = useMemo(() => groupHits(hits), [hits]);
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const latest = useMemo(
    () => (index ? index.filter((e) => e.h.startsWith('/blog/') && !e.h.includes('/category/')).slice(0, 5) : []),
    [index],
  );

  useEffect(() => { setActive(-1); }, [q]);

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (flat.length) setActive((a) => (a + 1) % flat.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (flat.length) setActive((a) => (a <= 0 ? flat.length - 1 : a - 1)); }
    else if (e.key === 'Enter') {
      const target = flat[active] || flat[0];
      if (target) { e.preventDefault(); window.location.assign(target.h); }
    }
  };

  let bodyEl;
  if (!searching) {
    bodyEl = (
      <div className="tw-ss-groups tw-ss-quick">
        <div>
          <div className="tw-ss-group-label">Popular</div>
          {QUICK_POPULAR.map((l) => <a key={l.h} href={l.h} className="tw-ss-item tw-ss-link">{l.t}<span className="tw-ss-link-ic">{I.arrow}</span></a>)}
        </div>
        <div>
          <div className="tw-ss-group-label">Where we work</div>
          {QUICK_LOCATIONS.map((l) => <a key={l.h} href={l.h} className="tw-ss-item tw-ss-link">{l.t}<span className="tw-ss-link-ic">{I.arrow}</span></a>)}
        </div>
        <div>
          <div className="tw-ss-group-label">Latest articles</div>
          {latest.length
            ? latest.map((l) => <a key={l.h} href={l.h} className="tw-ss-item tw-ss-link">{l.t}<span className="tw-ss-link-ic">{I.arrow}</span></a>)
            : <a href="/blog" className="tw-ss-item tw-ss-link">Browse all articles<span className="tw-ss-link-ic">{I.arrow}</span></a>}
        </div>
      </div>
    );
  } else if (!index) {
    bodyEl = <div className="tw-ss-empty">Searching…</div>;
  } else if (!hits.length) {
    bodyEl = (
      <div className="tw-ss-empty">
        No pages match “{q.trim()}”. Try a county or town name, a service, or a topic — or <a href="/request-a-proposal">ask us directly</a>.
      </div>
    );
  } else {
    let i = -1;
    bodyEl = (
      <div className="tw-ss-groups" id="tw-ss-results" role="listbox" aria-label="Search results">
        {groups.map((g) => (
          <div key={g.section} role="group" aria-label={g.section}>
            <div className="tw-ss-group-label">{g.section}</div>
            {g.items.map((h) => {
              i += 1;
              const idx = i;
              return (
                <a
                  key={h.h}
                  id={`tw-ss-opt-${idx}`}
                  href={h.h}
                  role="option"
                  aria-selected={idx === active}
                  className={'tw-ss-item' + (idx === active ? ' is-active' : '')}
                  onMouseEnter={() => setActive(idx)}
                >
                  <div className="tw-ss-item-title"><Mark text={h.t} q={q} /></div>
                  {h.d && <div className="tw-ss-item-desc">{h.d}</div>}
                  {h.c && <div className="tw-ss-item-crumb">{h.c}</div>}
                </a>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={'tw-ss' + (open ? ' is-open' : '')} style={{ '--tw-ss-top': `${top}px` }} hidden={!open}>
      <div className="tw-ss-backdrop" onClick={close} aria-hidden="true" />
      <div className="tw-ss-panel" role="dialog" aria-modal="true" aria-label="Search the site">
        <div className="tw-ss-inner">
          <form className="tw-ss-form" role="search" onSubmit={(e) => e.preventDefault()}>
            <span className="tw-ss-ic" aria-hidden="true">{I.search}</span>
            <input
              ref={inputRef}
              className="tw-ss-input"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onInputKey}
              placeholder="Search pages, counties, towns, articles…"
              aria-label="Search the site"
              aria-controls="tw-ss-results"
              aria-activedescendant={active >= 0 ? `tw-ss-opt-${active}` : undefined}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            {q && (
              <button type="button" className="tw-ss-clear" onClick={() => { setQ(''); inputRef.current && inputRef.current.focus(); }} aria-label="Clear search">
                {I.close}
              </button>
            )}
            <kbd className="tw-ss-kbd" aria-hidden="true">Esc</kbd>
            <button type="button" className="tw-ss-close" onClick={close} aria-label="Close search">{I.close}</button>
          </form>
          <div className="tw-ss-body">{bodyEl}</div>
          <div className="tw-ss-foot">
            <span><kbd>↑</kbd><kbd>↓</kbd> to move &middot; <kbd>Enter</kbd> to open &middot; <kbd>Esc</kbd> to close</span>
            <a href="/request-a-proposal">Can&rsquo;t find it? Contact us &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  );
}
