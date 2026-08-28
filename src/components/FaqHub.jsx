import { useState } from 'react';
import FaqAccordion from './FaqAccordion.jsx';

const FAQ_CATEGORIES = [
  {
    id: 'basics',
    label: 'HOA Management Basics',
    icon: 'shield',
    iconTone: '',
    eyebrow: 'Category 01',
    title: "What HOA management <em>is</em>, and isn\'t.",
    sub: 'The foundational questions every new board member asks. Useful for residents who want to understand why their association exists.',
    audience: 'considering',
    qs: [
      {
        q: 'What does an HOA management company actually do?',
        a: [
          'A professional HOA management company handles the <strong>operational and financial machinery</strong> of running an association so the volunteer board can focus on governance and decision-making. Day-to-day, that breaks down into three areas:',
          '<strong>Financial:</strong> monthly bookkeeping, assessment collection, vendor payments, annual budget, reserve study refresh, audit support. <strong>Operational:</strong> vendor sourcing &amp; oversight, maintenance ticket workflow, covenant enforcement, ARC review, resident communication. <strong>Administrative:</strong> board meeting prep, minutes, election support, insurance &amp; compliance filings, document library, owner portal.',
          'The board still sets policy &mdash; the budget, the rules, who gets hired. The management company executes.',
        ],
      },
      {
        q: "What\'s the difference between an HOA and a condo association?",
        a: 'Legally and structurally similar, with one key difference: an HOA typically manages <strong>common areas around individual homes</strong> (clubhouse, pool, streets, landscaping), while a condo association manages <strong>shared building structure</strong> (roof, exterior walls, hallways, elevators, mechanical systems). Condos require more specialized expertise around life-safety, reserve studies, and master insurance &mdash; which is why Tidewater has separate practice areas for each.',
      },
      {
        q: "What\'s an AAMC, and why does it matter?",
        a: [
          'The <strong>Accredited Association Management Company</strong> (AAMC) designation is awarded by the Community Associations Institute (CAI). Fewer than 1% of management companies hold it. To qualify, a company must employ multiple PCAM-credentialed managers, maintain specific financial controls, carry adequate fidelity insurance, and pass a thorough operational audit.',
          "For boards, it\'s a baseline credential: it doesn\'t guarantee good service, but it means a company has cleared the industry\'s highest professional bar. <strong>Tidewater is AAMC-accredited.</strong>",
        ],
      },
      {
        q: 'Do small communities (under 50 homes) need a management company?',
        a: 'Most don\'t &mdash; until they do. The threshold most boards hit is around <strong>30&ndash;50 doors</strong>, when assessment volume, vendor count, and resident requests exceed what one volunteer treasurer can responsibly manage on weekends. We work with small associations through our <a href="/hoa-management/hoa-financial-management">financial-only service tier</a> &mdash; books, A/R, audit support &mdash; without the cost of full management.',
      },
    ],
  },
  {
    id: 'tidewater',
    label: 'What to Expect from Tidewater',
    icon: 'company',
    iconTone: 'gold',
    eyebrow: 'Category 02',
    title: 'How <em>we</em> work, specifically.',
    sub: 'The questions boards ask during proposal calls. Everything here is how Tidewater operates today &mdash; not industry generalities.',
    audience: 'considering',
    qs: [
      {
        q: 'How long has Tidewater been around?',
        a: 'Family-owned since <strong>1989</strong>. We manage 450+ communities across the Mid-Atlantic (Maryland, DC, Virginia, Pennsylvania, Delaware, West Virginia). Four offices: Owings Mills (HQ), Columbia Pike, Ocean City, and Delaware.',
      },
      {
        q: 'Do we get a dedicated manager?',
        a: [
          'Yes &mdash; a <strong>named Community Association Manager</strong> who attends meetings as contracted, knows your vendors, and remembers your residents. They sit inside a regional pod of 4&ndash;6 communities, never a rotating pool.',
          'Manager turnover at Tidewater averages 6.4 years tenure &mdash; rare in the industry. When transitions do happen, we hand off in person at a board meeting, and the board approves the replacement.',
        ],
      },
      {
        q: "What\'s your typical response time?",
        a: 'Same business day, 95% of the time, on board email. Documented monthly and reported quarterly. After-hours emergencies (water, fire, storm damage, mechanical failure) get a manager callback within 30 minutes via our 24/7 line at <strong>(443) 548-0191</strong>.',
      },
      {
        q: 'Are your contracts long-term lock-ins?',
        a: "<strong>No.</strong> Our standard agreement is a 12-month initial term with <strong>30-day termination, no penalty</strong>, after that. Some companies bury 36-month auto-renewals with five-figure exit fees. We don\'t. Our 12-month retention rate is 97%, which we\'d rather have speak for itself than trap anyone.",
      },
      {
        q: 'What does Tidewater management cost?',
        a: [
          'For full-service management of an 80&ndash;250 door HOA in Maryland, fees typically run <strong>$28&ndash;$42 per unit per month</strong>. Variables: community complexity, vendor count, meeting cadence, governing-document state. We quote line-item &mdash; no setup fees, no hidden surcharges, no transition fees.',
          'Financial-only management runs roughly 35&ndash;55% of full-service for a comparable community.',
        ],
      },
      {
        q: "What\'s the proposal process like?",
        a: [
          '<strong>Step 1:</strong> Submit the form on our <a href="/request-a-proposal">contact page</a>. A manager &mdash; not a sales rep &mdash; reads every submission. <strong>Step 2:</strong> A 30-minute discovery call, usually within one business day. <strong>Step 3:</strong> We tour your community (free, no obligation). <strong>Step 4:</strong> Apples-to-apples proposal vs. your current company, line-by-line, with our standard agreement attached.',
          'No deck. No pressure. We never follow up more than twice after a no.',
        ],
      },
    ],
  },
  {
    id: 'portal',
    label: 'Owner Portal & Tech',
    icon: 'desktop',
    iconTone: 'sage',
    eyebrow: 'Category 03',
    title: 'The owner portal, payments, and tech.',
    sub: "Here\'s how Tidewater\'s owner portal and management technology works for residents and boards.",
    audience: 'residents',
    qs: [
      {
        q: 'How do I log into the Owner Portal?',
        a: "Go to <strong>portal.tidewaterproperty.com</strong> and use the email address your community has on file. If you\'re a new owner or never set up access, click &ldquo;First-time login&rdquo; and enter your property address &mdash; we\'ll email you an invitation link. Most accounts activate within 5 minutes.",
      },
      {
        q: 'I forgot my password — how do I reset it?',
        a: 'On the portal login page, click <strong>&ldquo;Forgot password?&rdquo;</strong> and enter the email associated with your account. You&rsquo;ll get a reset link within 60 seconds. Still not working after 5 minutes? Email <a href="mailto:portal@tidewaterproperty.com">portal@tidewaterproperty.com</a> with your address and we\'ll fix it manually within one business day.',
      },
      {
        q: 'How do I pay my assessment online?',
        a: [
          'Log into the portal, click <strong>&ldquo;Make a Payment.&rdquo;</strong> You can pay by ACH (free) or credit card (small convenience fee). You can also set up <strong>auto-pay</strong> for monthly or quarterly assessments &mdash; it&rsquo;s the easiest way to avoid late fees.',
          'You can also mail a check to the lockbox address printed on your statement. Always include your account number; checks without account numbers can be delayed.',
        ],
      },
      {
        q: 'How do I submit a maintenance request?',
        a: "Use the <strong>Maintenance Request</strong> tab in the portal. Add photos if relevant &mdash; they help us dispatch the right vendor faster. You\'ll get an email confirmation, and your community manager can see the ticket the moment you submit it. Average response time on non-emergency tickets is 4 business hours.",
      },
      {
        q: 'How do I submit an architectural change (ARC) request?',
        a: "Click <strong>&ldquo;Architectural Request&rdquo;</strong> in the portal. Upload your plans, photos, or contractor details. The ARC committee receives it immediately; standard review takes 14&ndash;30 days depending on your community\'s declarations. You can track the status in the portal at any time &mdash; no need to email asking where things stand.",
      },
      {
        q: 'Where do I find my governing documents?',
        a: 'The portal has a full <strong>Document Library</strong> with your declarations, bylaws, rules &amp; regulations, ARC standards, recent meeting minutes, and annual budgets. Everything is searchable. If something looks missing, your manager can upload it within one business day.',
      },
    ],
  },
  {
    id: 'roles',
    label: 'Board vs. Resident Responsibilities',
    icon: 'split',
    iconTone: 'clay',
    eyebrow: 'Category 04',
    title: 'Who handles what.',
    sub: 'Clarifying what the board owns, what residents own, and what management handles &mdash; one of the most frequent sources of friction.',
    audience: 'boards',
    qs: [
      {
        q: 'Who decides what my monthly assessment goes toward?',
        a: 'Your <strong>board of directors</strong>, through the annual budget. The budget is voted on each fall (or per your bylaws), and the assessment rate is set based on operating costs + reserve contributions. Tidewater drafts the proposed budget, the board reviews, amends, and approves it.',
      },
      {
        q: 'Can the board fine me for a violation?',
        a: "<strong>Yes</strong>, if your governing documents authorize it. Most do. Standard process: (1) a written notice of violation with a cure period, (2) escalation notice if not remedied, (3) fine schedule per your community\'s policy. Tidewater documents every step with photos and timestamps &mdash; the goal is consistency, not surprise. You always have the right to a hearing before fines escalate.",
      },
      {
        q: 'Who is responsible for the exterior of my unit?',
        a: [
          '<strong>In an HOA:</strong> typically the homeowner, with the association responsible for common-area landscaping, streets, lighting, and shared amenities. Your specific declaration will spell out edge cases (mailboxes, fencing, sheds).',
          '<strong>In a condo:</strong> the association is typically responsible for the exterior shell (roof, siding, exterior walls, windows in some cases) and the homeowner is responsible for the interior. Master policy / unit owner policy split varies by association.',
        ],
      },
      {
        q: 'Can I attend board meetings as a homeowner?',
        a: 'In Maryland, <strong>yes</strong> &mdash; open meetings are required by statute for most HOAs and condo associations. There&rsquo;s typically an open-forum portion where residents can speak, followed by board discussion. Executive sessions (legal matters, personnel, delinquencies by name) are closed; that&rsquo;s also required. Meeting dates are posted in the portal at least 7 days in advance.',
      },
      {
        q: "What happens if I\'m behind on assessments?",
        a: [
          'Most communities follow a staged collection policy: a courtesy reminder at 30 days, a formal late notice at 60 days, a demand letter at 90 days, and attorney referral at 120&ndash;150 days. Your board sets the policy &mdash; Tidewater executes it consistently.',
          'If you&rsquo;re struggling, <strong>call us before the demand letter</strong>. Most boards approve payment plans without question; the worst outcome is silence on both sides.',
        ],
      },
    ],
  },
  {
    id: 'proposal',
    label: 'Proposals & Switching',
    icon: 'switch',
    iconTone: 'dark',
    eyebrow: 'Category 05',
    title: 'For boards considering a change.',
    sub: 'The most-asked questions from boards in proposal stage. For deeper walkthroughs see <a href="/solutions/switching-hoa-management-company">Switching HOA Management</a> and <a href="/solutions/self-managed-hoa-transition">Self-Managed Transition</a>.',
    audience: 'boards',
    qs: [
      {
        q: 'How long does the transition from another company take?',
        a: 'Typically <strong>7 weeks</strong> from signed proposal to first managed board meeting. Self-managed communities transition in <strong>4&ndash;5 weeks</strong>. We run the transition on your behalf; the board reviews, doesn\'t lift. See the <a href="/solutions/switching-hoa-management-company#timeline">week-by-week timeline</a>.',
      },
      {
        q: 'What does the transition cost?',
        a: '<strong>$1,000</strong> one-time transition fee. Some companies charge $2,500&ndash;$8,000 to onboard a new community. Your ongoing cost is your normal monthly management fee, beginning the month after your old contract ends.',
      },
      {
        q: 'Can you walk us through your proposal before we commit?',
        a: 'Yes &mdash; we present it in person, line by line, with your current management agreement open beside it for comparison. Most boards take 2&ndash;3 weeks to review and decide. We never push for a same-day signature.',
      },
      {
        q: 'How do you handle delinquencies during a transition?',
        a: 'We accept the existing A/R balance and continue collection from where the previous company stopped. Nothing falls off the radar. If past collection was lax, we tighten <em>with board approval</em>, not unilaterally.',
      },
      {
        q: 'Can we talk to other boards before we sign?',
        a: '<strong>Always.</strong> We&rsquo;ll connect you with 3&ndash;5 board presidents whose communities are similar in size and stage to yours &mdash; you call them, no script. Most boards say this conversation is the moment they decided.',
      },
    ],
  },
];

const FAQ_ICONS = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  company: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="13" rx="1"/>
      <path d="M8 8V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
    </svg>
  ),
  desktop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  split: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"/>
      <circle cx="18" cy="6" r="3"/>
      <path d="M6 9v6a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9"/>
    </svg>
  ),
  switch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9"/>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/>
      <path d="M21 21l-4.3-4.3"/>
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────
// Hero with search
// ─────────────────────────────────────────────────────────────
function FaqHero({ query, onQuery, onSearch }) {
  const popular = ['Reset portal password', 'Pay my assessment', 'Submit ARC request', 'Switching costs', 'Manager response time'];
  return (
    <section className="tw-faq-hero">
      <div className="tw-faq-hero-inner">
        <div className="tw-faq-hero-crumb">
          <a href="/">Home</a>
          <span className="sep">›</span>
          <a href="/resources">Resources</a>
          <span className="sep">›</span>
          <span className="cur">FAQ</span>
        </div>
        <h1>Tidewater <em>answered.</em></h1>
        <p>The questions boards, homeowners, and residents ask us most. Start with a search, browse by category, or jump straight to the section that fits your role.</p>
        <form className="tw-faq-search" onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
          {FAQ_ICONS.search}
          <input
            type="text"
            placeholder="Search 30+ questions — payment, ARC, portal, switching…"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            aria-label="Search FAQs"
          />
          <button type="submit">Search</button>
        </form>
        <div className="tw-faq-popular">
          <span className="tw-faq-popular-label">Popular</span>
          {popular.map((p, i) => (
            <span key={i}>
              <button
                type="button"
                className="tw-faq-popular-link"
                onClick={() => { onQuery(p); onSearch(); }}
              >{p}</button>
              {i < popular.length - 1 && <span style={{color:'var(--tw-border-strong)'}}>·</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Category chips
// ─────────────────────────────────────────────────────────────
function CategoryChips({ active, onSelect }) {
  const items = [
    { id: 'all', label: 'All questions', count: FAQ_CATEGORIES.reduce((s, c) => s + c.qs.length, 0) },
    ...FAQ_CATEGORIES.map(c => ({ id: c.id, label: c.label, count: c.qs.length })),
  ];
  return (
    <section className="tw-faq-cats">
      <div className="tw-faq-cats-inner">
        {items.map(it => (
          <button
            key={it.id}
            className={`tw-faq-cat-chip ${active === it.id ? 'is-active' : ''}`}
            onClick={() => onSelect(it.id)}
          >
            <span>{it.label}</span>
            <span className="tw-faq-cat-chip-count">{it.count}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FAQ section renderer
// ─────────────────────────────────────────────────────────────
function FaqSection({ cat, defaultOpen }) {
  return (
    <div id={`faq-${cat.id}`} className="tw-faq-section">
      <div className="tw-faq-section-head">
        <div className={`tw-faq-section-icon ${cat.iconTone}`}>{FAQ_ICONS[cat.icon]}</div>
        <div>
          <div className="tw-faq-section-eyebrow">{cat.eyebrow}</div>
          <h2 dangerouslySetInnerHTML={{__html: cat.title}}/>
          <p dangerouslySetInnerHTML={{__html: cat.sub}}/>
        </div>
      </div>
      <FaqAccordion items={cat.qs} defaultOpen={defaultOpen}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Search filter
// ─────────────────────────────────────────────────────────────
function searchFilter(query) {
  if (!query.trim()) return null;
  const q = query.toLowerCase();
  const results = [];
  FAQ_CATEGORIES.forEach(cat => {
    cat.qs.forEach(item => {
      const aText = Array.isArray(item.a) ? item.a.join(' ') : item.a;
      if (item.q.toLowerCase().includes(q) || aText.toLowerCase().includes(q) || cat.label.toLowerCase().includes(q)) {
        results.push({ ...item, _cat: cat });
      }
    });
  });
  return results;
}

function SearchResults({ query, results, onClear }) {
  if (!results.length) {
    return (
      <div className="tw-faq-empty">
        <h3>No matches for &ldquo;{query}&rdquo;</h3>
        <p>Try a different word or two &mdash; or send us the question directly and we&rsquo;ll add it.</p>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={onClear} className="tw-btn tw-btn-outline">Clear search</button>
          <a href="/request-a-proposal" className="tw-btn tw-btn-primary">Ask the question →</a>
        </div>
      </div>
    );
  }
  return (
    <>
      <div style={{marginBottom:18,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
        <div style={{fontFamily:'var(--tw-font-body)',fontSize:14,color:'var(--tw-fg-muted)'}}>
          Found <strong style={{color:'var(--tw-dark)',fontWeight:700}}>{results.length}</strong> match{results.length === 1 ? '' : 'es'} for &ldquo;{query}&rdquo;
        </div>
        <button onClick={onClear} style={{background:'transparent',border:0,fontFamily:'var(--tw-font-heading)',fontWeight:700,fontSize:12,color:'var(--tw-teal)',cursor:'pointer',letterSpacing:'0.06em',textTransform:'uppercase'}}>Clear ×</button>
      </div>
      <FaqAccordion items={results.map(r => ({ q: r.q, a: r.a }))} defaultOpen={0}/>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Still have questions strip
// ─────────────────────────────────────────────────────────────
function StillHave() {
  return (
    <section className="tw-faq-still">
      <div className="tw-faq-still-inner">
        <div>
          <h2>Didn&rsquo;t find what you were <em>looking for?</em></h2>
          <p>Boards: send us your question through the contact form &mdash; we&rsquo;ll answer it and add it here. Residents: call the main line and we&rsquo;ll route you to your community manager.</p>
        </div>
        <div className="tw-faq-still-actions">
          <a href="/request-a-proposal" className="tw-btn tw-btn-primary tw-btn-lg">Ask a question →</a>
          <a href="tel:+14435480191" className="tw-btn tw-btn-outline-cream tw-btn-lg">(443) 548-0191</a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Main FaqHub component
// ─────────────────────────────────────────────────────────────
export default function FaqHub() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const [searching, setSearching] = useState(false);

  const onSearch = () => setSearching(true);
  const onClearSearch = () => { setSearching(false); setQuery(''); };

  const selectCat = (id) => {
    setActiveCat(id);
    setSearching(false);
    if (id !== 'all') {
      const el = document.getElementById(`faq-${id}`);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 160;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 320, behavior: 'smooth' });
    }
  };

  const searchResults = searching && query.trim() ? searchFilter(query) : null;

  const visibleSections = activeCat === 'all'
    ? FAQ_CATEGORIES
    : FAQ_CATEGORIES.filter(c => c.id === activeCat);

  return (
    <>
      <FaqHero
        query={query}
        onQuery={(v) => { setQuery(v); if (!v.trim()) setSearching(false); }}
        onSearch={onSearch}
      />

      {!searching && (
        <CategoryChips active={activeCat} onSelect={selectCat}/>
      )}

      <section className="tw-faq-body">
        <div className="tw-container-wide" style={{maxWidth:1080}}>
          {searching ? (
            <SearchResults query={query} results={searchResults || []} onClear={onClearSearch}/>
          ) : (
            visibleSections.map((cat, i) => (
              <FaqSection key={cat.id} cat={cat} defaultOpen={i === 0 ? 0 : -1}/>
            ))
          )}
        </div>
      </section>

      <StillHave/>
    </>
  );
}
