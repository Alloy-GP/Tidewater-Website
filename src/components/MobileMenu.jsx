// Tidewater — Mobile Navigation (drill-down push menu + live search)
// Recreated from the design handoff (drill-down · regular density · Dark Tide accent).
// Opened by the header hamburger via a `tw-open-menu` window event.
import { useState, useEffect, useMemo } from 'react';

// ── Icons (Lucide-style, 2px stroke) ──────────────────────────────
const I = {
  about:    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.5" r="0.6" fill="currentColor" stroke="none"/></svg>,
  mgmt:     <svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="1.2"/><path d="M9 8h0M15 8h0M9 12h0M15 12h0M10 17h4"/></svg>,
  wrench:   <svg viewBox="0 0 24 24"><path d="M14.5 5.5a3.5 3.5 0 0 0-4.6 4.3L4 15.7V20h4.3l5.9-5.9a3.5 3.5 0 0 0 4.3-4.6l-2.3 2.3-2-2 2.3-2.3z"/></svg>,
  home:     <svg viewBox="0 0 24 24"><path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/></svg>,
  book:     <svg viewBox="0 0 24 24"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M19 17H8a3 3 0 0 0-3 3"/></svg>,
  chevron:  <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>,
  back:     <svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>,
  search:   <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  close:    <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  community:<svg viewBox="0 0 24 24"><path d="M4 11l8-6 8 6"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/></svg>,
  rentals:  <svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>,
  arrow:    <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
};

// ── Site map (real routes) ────────────────────────────────────────
const NAV = [
  { id: 'about', label: 'About', icon: 'about', groups: [
    { label: 'Company', items: [
      { label: 'Our Story', href: '/about' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'Careers', href: '/careers' },
      { label: 'Testimonials', href: '/testimonials' },
    ]},
  ]},
  { id: 'management', label: 'Management', icon: 'mgmt', groups: [
    { label: 'Solutions', items: [
      { label: 'Switching Companies', href: '/solutions/switching-hoa-management-company' },
      { label: 'Self-Managed Transition', href: '/solutions/self-managed-hoa-transition' },
    ]},
    { label: 'HOA Management', items: [
      { label: 'HOA Management', href: '/hoa-management' },
      { label: 'Townhome & Planned Communities', href: '/hoa-management/townhome-community-management' },
      { label: 'HOA Financial Management', href: '/hoa-management/hoa-financial-management' },
      { label: 'Covenant Enforcement', href: '/hoa-management/covenant-enforcement' },
    ]},
    { label: 'Condo Management', items: [
      { label: 'Condo Association Management', href: '/condo-management' },
      { label: 'Commercial Associations', href: '/hoa-management/commercial-association-management' },
    ]},
    { label: 'Rental Management', items: [
      { label: 'Rental Property Management', href: '/rental-management' },
      { label: 'Available Rentals', href: '/rental-listings' },
    ]},
  ]},
  { id: 'maintenance', label: 'Maintenance', icon: 'wrench', href: '/maintenance-services' },
  { id: 'realty', label: 'Real Estate', icon: 'home', href: '/real-estate' },
  { id: 'resources', label: 'Resources', icon: 'book', groups: [
    { label: 'Resources', items: [
      { label: 'HOA News & Blog', href: '/blog' },
      { label: 'All Resources', href: '/resources' },
    ]},
    { label: 'Top Posts', items: [
      { label: 'How to Switch HOA Management Companies', href: '/blog/how-to-switch-hoa-management-companies' },
    ]},
  ]},
];

const ACCOUNTS = [
  { label: 'Community Login', icon: 'community', href: 'https://tidewater.cincwebaxis.com' },
  { label: 'Rentals Login', icon: 'rentals', href: 'https://account.appfolio.com/realms/foliospace/protocol/openid-connect/auth?activation_state&client_id=client-aa200e11a2d03f6365c1d339b05d19bf63850b9d&portfolio_uuid&redirect_uri=https%3A%2F%2Ftidewater.appfolio.com%2Fconnect%2Fusers%2Foauth%2Fcallback&response_type=code&scope=openid&session_timed_out=false&state' },
];

const norm = (p) => (p || '').replace(/\/+$/, '') || '/';

function allLeaves() {
  const out = [];
  NAV.forEach((s) => {
    if (s.href) out.push({ label: s.label, href: s.href, crumb: '' });
    (s.groups || []).forEach((g) => g.items.forEach((it) =>
      out.push({ label: it.label, href: it.href, crumb: `${s.label} · ${g.label}` })));
  });
  return out;
}

function Icon({ name }) { return <span className="tw-mm-ic">{I[name]}</span>; }

function Highlight({ text, q }) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (<>{text.slice(0, i)}<mark>{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>);
}

export default function MobileMenu({ currentPath = '', logoSrc = '/assets/logo-main.svg', logoAlt = 'Tidewater' }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [q, setQ] = useState('');
  const searching = q.trim().length > 0;
  const LEAVES = useMemo(allLeaves, []);
  const here = norm(currentPath);

  // current top-level section (for the accent highlight)
  const currentId = useMemo(() => {
    for (const s of NAV) {
      if (s.href && norm(s.href) === here) return s.id;
      if (s.groups) for (const g of s.groups) for (const it of g.items)
        if (norm(it.href) === here) return s.id;
    }
    return null;
  }, [here]);

  // open from the header hamburger
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('tw-open-menu', onOpen);
    return () => window.removeEventListener('tw-open-menu', onOpen);
  }, []);

  // lock background scroll while open; reset drill/search on close
  useEffect(() => {
    document.body.classList.toggle('tw-menu-open', open);
    if (!open) { setActive(null); setQ(''); }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    if (open) window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); };
  }, [open]);

  const close = () => setOpen(false);
  const results = searching ? LEAVES.filter((l) => l.label.toLowerCase().includes(q.trim().toLowerCase())) : [];

  return (
    <div className={'tw-mm-overlay' + (open ? ' is-open' : '')} aria-hidden={!open}>
      <div className="tw-mm">
        <header className="tw-mm-head">
          <a href="/" className="tw-mm-logo"><img src={logoSrc} alt={logoAlt}  loading="lazy" decoding="async" /></a>
          <button className="tw-mm-iconbtn" onClick={close} aria-label="Close menu"><Icon name="close" /></button>
        </header>

        <div className="tw-mm-ctxbar">
          {active && !searching ? (
            <button className="tw-mm-back" onClick={() => setActive(null)}>
              <Icon name="back" /> All sections
            </button>
          ) : (
            <div className="tw-mm-search">
              <Icon name="search" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the site…" aria-label="Search the site" />
              {q && <button className="tw-mm-clear" onClick={() => setQ('')} aria-label="Clear search"><Icon name="close" /></button>}
            </div>
          )}
        </div>

        <div className="tw-mm-scroll">
          {searching ? (
            results.length ? (
              <div className="tw-mm-results">
                {results.map((r, i) => (
                  <a className="tw-mm-result" href={r.href} key={i}>
                    <span className="tw-mm-result-label"><Highlight text={r.label} q={q.trim()} /></span>
                    {r.crumb && <span className="tw-mm-result-crumb">{r.crumb}</span>}
                  </a>
                ))}
              </div>
            ) : (
              <div className="tw-mm-noresult">No pages match “{q.trim()}”.</div>
            )
          ) : (
            <div className="tw-mm-stage">
              <div className={'tw-mm-panel tw-mm-panel-root' + (active ? ' is-pushed' : '')}>
                <div className="tw-mm-rootlist">
                  {NAV.map((s) => {
                    if (s.href) {
                      return (
                        <a className={'tw-mm-row' + (s.id === currentId ? ' is-current' : '')} href={s.href} key={s.id}>
                          <Icon name={s.icon} /><span className="tw-mm-row-label">{s.label}</span>
                        </a>
                      );
                    }
                    const count = s.groups.reduce((n, g) => n + g.items.length, 0);
                    return (
                      <button className={'tw-mm-row' + (s.id === currentId ? ' is-current' : '')} key={s.id} onClick={() => setActive(s)}>
                        <Icon name={s.icon} /><span className="tw-mm-row-label">{s.label}</span>
                        <span className="tw-mm-row-count">{count}</span>
                        <Icon name="chevron" />
                      </button>
                    );
                  })}
                  <div className="tw-mm-account">
                    <div className="tw-mm-account-label">My Account</div>
                    <div className="tw-mm-account-btns">
                      {ACCOUNTS.map((a) => (
                        <a className="tw-mm-loginbtn" href={a.href} target="_blank" rel="noopener noreferrer" key={a.label}>
                          <Icon name={a.icon} /> {a.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={'tw-mm-panel tw-mm-panel-sub' + (active ? ' is-in' : '')}>
                {active && (
                  <div className="tw-mm-sub">
                    <div className="tw-mm-sub-head">
                      <Icon name={active.icon} /><h2>{active.label}</h2>
                    </div>
                    <div className="tw-mm-groups">
                      {active.groups.map((g) => (
                        <div className="tw-mm-group" key={g.label}>
                          <div className="tw-mm-eyebrow">{g.label}</div>
                          <div className="tw-mm-leaflist">
                            {g.items.map((it) => (
                              <a className={'tw-mm-leaf' + (norm(it.href) === here ? ' is-current' : '')} href={it.href} key={it.label}>
                                <span>{it.label}</span><Icon name="arrow" />
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="tw-mm-cta-wrap">
          <a className="tw-mm-cta" href="/request-a-proposal">Request Proposal / Contact</a>
        </div>
      </div>
    </div>
  );
}
