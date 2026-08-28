// Covenant Enforcement — Sub-service page
// URL: /hoa-management/covenant-enforcement
// Focus KW: hoa covenant enforcement maryland

import FaqAccordion from './FaqAccordion.jsx';

const CheckSmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// Hero side card — CINC Action Item List preview
// ─────────────────────────────────────────────────────────────
function CovenantHeroSide() {
  const items = [
    { code: 'VIO-241', topic: 'Fence height variance',      stage: '1st Notice Sent',       date: 'May 12', tone: 'teal' },
    { code: 'VIO-238', topic: 'Trash storage',              stage: 'Awaiting Cure (7d)',     date: 'May 09', tone: 'gold' },
    { code: 'VIO-234', topic: 'Unapproved exterior paint',  stage: 'Escalated to Counsel',   date: 'May 03', tone: 'clay' },
    { code: 'VIO-229', topic: 'Parking violation',          stage: 'Cured · Closed',         date: 'May 01', tone: 'sage' },
    { code: 'VIO-218', topic: 'Landscape neglect',          stage: 'Cured · Closed',         date: 'Apr 24', tone: 'sage' },
  ];
  const toneColor = (t) => ({ teal: 'var(--tw-teal)', gold: '#8a7a3d', clay: '#9a5a3a', sage: 'var(--tw-sage)' }[t]);
  const toneBg   = (t) => ({ teal: 'rgba(58,146,166,0.08)', gold: 'rgba(191,172,95,0.10)', clay: 'rgba(206,142,114,0.08)', sage: 'rgba(100,125,87,0.08)' }[t]);

  return (
    <div style={{ padding: '24px 26px 26px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--tw-border)' }}>
        <div>
          <div style={{ fontFamily: 'var(--tw-font-heading)', fontWeight: 700, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--tw-teal)', marginBottom: 4 }}>Action Item List · CINC Board Portal</div>
          <div style={{ fontFamily: 'var(--tw-font-heading)', fontWeight: 800, fontSize: 17, color: 'var(--tw-dark)', letterSpacing: '-0.01em' }}>Open Violations &middot; <span style={{ color: 'var(--tw-fg-muted)', fontWeight: 600, fontSize: 14 }}>this month</span></div>
        </div>
        <div style={{ fontFamily: 'var(--tw-font-mono)', fontSize: 10.5, color: 'var(--tw-fg-subtle)', letterSpacing: '0.04em' }}>LIVE</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 12, alignItems: 'center', padding: '10px 12px', background: toneBg(it.tone), border: '1px solid var(--tw-border)', borderRadius: 8 }}>
            <div style={{ fontFamily: 'var(--tw-font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--tw-fg-muted)', letterSpacing: '0.04em' }}>{it.code}</div>
            <div>
              <div style={{ fontFamily: 'var(--tw-font-heading)', fontWeight: 700, fontSize: 13, color: 'var(--tw-dark)', marginBottom: 2 }}>{it.topic}</div>
              <div style={{ fontFamily: 'var(--tw-font-body)', fontSize: 11.5, color: toneColor(it.tone), fontWeight: 600, lineHeight: 1.4 }}>{it.stage}</div>
            </div>
            <div style={{ fontFamily: 'var(--tw-font-mono)', fontSize: 10.5, color: 'var(--tw-fg-subtle)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{it.date}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, padding: '10px 14px', background: 'var(--tw-warm-100)', border: '1px dashed var(--tw-border-strong)', borderRadius: 8, fontFamily: 'var(--tw-font-body)', fontSize: 11.5, color: 'var(--tw-fg-muted)', lineHeight: 1.45, fontStyle: 'italic' }}>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────
function CovenantHero() {
  return (
    <section className="tw-sol-hero">
      <div className="tw-sol-hero-paper"></div>
      <div className="tw-sol-hero-grid">
        <div className="tw-sol-hero-copy">
          <h1 className="tw-sol-hero-title">
            Covenant enforcement, <em>without making your board the bad guy.</em>
          </h1>
          <p className="tw-sol-hero-lede">
            Most boards outsource covenant enforcement for one reason: to take board members out of the middle of neighbor disputes. Tidewater delivers consistent, third-party violation notices and a documented process &mdash; tracked in real time in CINC &mdash; so the rules apply the same way to every owner, every time.
          </p>
          <div className="tw-sol-hero-actions">
            <a href="/request-a-proposal" className="tw-btn tw-btn-primary tw-btn-lg">Request a proposal →</a>
            <a href="#process" className="tw-btn tw-btn-ghost">See the process →</a>
          </div>
          <div className="tw-sol-hero-stats">
            <div>
              <div className="tw-sol-hero-stat-num">CINC</div>
              <div className="tw-sol-hero-stat-label">Real-time violation &amp; compliance monitoring on the board portal</div>
            </div>
            <div>
              <div className="tw-sol-hero-stat-num gold">In-house</div>
              <div className="tw-sol-hero-stat-label">Administrative team handles letters &mdash; not a third-party platform</div>
            </div>
            <div>
              <div className="tw-sol-hero-stat-num">AAMC&reg;</div>
              <div className="tw-sol-hero-stat-label">Accredited Association Management Company &mdash; CAI&rsquo;s highest credential</div>
            </div>
          </div>
        </div>
        <aside className="tw-sol-hero-side">
          <CovenantHeroSide />
        </aside>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Why third-party enforcement
// ─────────────────────────────────────────────────────────────
function CovenantWhyThirdParty() {
  const cards = [
    { num: '01', title: 'Same standard, every owner',         body: 'Photo-documented, template-driven correspondence applied consistently. No favoritism. No selective enforcement.' },
    { num: '02', title: 'Real-time tracking in CINC',         body: 'Every violation is logged, time-stamped, and visible to the board on the CINC portal — not buried in a file cabinet.' },
    { num: '03', title: 'Administrative team handles letters', body: 'Violation letters drafted & mailed by Tidewater\'s in-house administrative support — freeing the community manager for on-site work.' },
    { num: '04', title: 'Action Item List for follow-through', body: 'A live tracker boards can audit at any time. Open notices, cure-period status, and escalations all visible without asking.' },
  ];
  return (
    <section className="tw-section tw-sol-warnings">
      <div className="tw-container-wide">
        <div className="tw-sol-warn-grid">
          <div className="tw-sol-warn-head">
            <div className="tw-eyebrow">Why Boards Outsource This</div>
            <h2>Enforcement should never feel <em>personal.</em></h2>
            <p>The board member who lives two houses down should not be the one mailing the notice about the trash cans. Third-party enforcement — with a documented process and the same letter going to every owner — takes the personality out of the equation.</p>
            <p style={{ marginTop: 14 }}><strong style={{ color: 'var(--tw-dark)', fontWeight: 700 }}>The board still sets the policy.</strong> Tidewater applies it consistently, in writing, with photo documentation and a recorded audit trail.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--tw-border)', border: '1px solid var(--tw-border)', borderRadius: 12, overflow: 'hidden' }}>
            {cards.map((c, i) => (
              <div key={i} style={{ background: 'var(--tw-cream)', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontFamily: 'var(--tw-font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--tw-teal)' }}>{c.num}</div>
                <h3 style={{ fontFamily: 'var(--tw-font-heading)', fontWeight: 700, fontSize: 16, lineHeight: 1.25, color: 'var(--tw-dark)', margin: 0, letterSpacing: '-0.005em' }}>{c.title}</h3>
                <p style={{ fontFamily: 'var(--tw-font-body)', fontSize: 13.5, lineHeight: 1.55, color: 'var(--tw-fg-muted)', margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Process (5 steps)
// ─────────────────────────────────────────────────────────────
function CovenantProcess() {
  const steps = [
    {
      num: '01', range: 'Discovery',
      title: 'Violation identified',
      tasks: [
        'Community manager walk or resident report',
        'Photo documentation captured on-site',
        'Logged in CINC against the property record',
      ],
    },
    {
      num: '02', range: 'Notice',
      title: 'First written notice',
      tasks: [
        'Drafted by administrative team',
        'Template-driven for consistency',
        'Cites the specific governing-document clause',
      ],
    },
    {
      num: '03', range: 'Follow-up',
      title: 'Cure period &amp; re-inspection',
      tasks: [
        'Status visible in CINC Action Item List',
        'Re-inspection at cure deadline',
        'Photo log updated either way',
      ],
    },
    {
      num: '04', range: 'Escalation',
      title: 'Escalation per board policy',
      tasks: [
        'Second notice and fine per the community\'s recorded schedule',
        'Hearing rights communicated per bylaws',
        'Board notified before any fine',
      ],
    },
    {
      num: '05', range: 'Resolution',
      title: 'Closed or referred to counsel',
      tasks: [
        'Cured → case closed in CINC',
        'Not cured → referred to association attorney',
        'Full audit trail preserved',
      ],
    },
  ];
  return (
    <section id="process" className="tw-section tw-sol-timeline-section">
      <div className="tw-container-wide">
        <div className="tw-section-head" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <div className="tw-eyebrow">The Process</div>
          <h2 className="tw-section-title">A documented enforcement workflow, <em>start to finish.</em></h2>
          <p className="tw-section-lede">The board sets policy — cure periods, fine schedules, hearing procedures — per the community&rsquo;s governing documents. Tidewater applies that policy consistently and tracks every step.</p>
        </div>
        <div className="tw-sol-timeline-wrap">
          <div className="tw-sol-timeline" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {steps.map((w, i) => (
              <div key={i} className={`tw-sol-week ${i === steps.length - 1 ? 'is-final' : ''}`}>
                <div className="tw-sol-week-marker">
                  <div className="tw-sol-week-marker-num">{w.num}</div>
                  <div className="tw-sol-week-marker-label">{w.range}</div>
                </div>
                <div className="tw-sol-week-card">
                  <h4 className="tw-sol-week-title" dangerouslySetInnerHTML={{ __html: w.title }} />
                  <ul className="tw-sol-week-tasks">
                    {w.tasks.map((tk, j) => <li key={j} dangerouslySetInnerHTML={{ __html: tk }} />)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="tw-sol-timeline-foot" style={{ textAlign: 'left' }}>
            <div className="tw-sol-timeline-foot-text" style={{ fontStyle: 'italic', color: 'var(--tw-fg-muted)' }}>
              The sequence above is a representative example of a typical enforcement flow. Cure periods, fine schedules, and hearing procedures are determined by the board per the community&rsquo;s governing documents.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CINC platform + team breakdown
// ─────────────────────────────────────────────────────────────
function CovenantCinc() {
  const team = [
    { role: 'Community Manager (CAM)',  body: 'On-site walks, photo documentation, board meeting attendance, resale inspections.' },
    { role: 'Administrative Support',   body: 'Drafts &amp; mails violation letters and architectural review correspondence on a template-driven basis.' },
    { role: 'Client Services',          body: 'First-call resolution for owner inquiries about open violations — trained to answer directly in CINC.' },
    { role: 'Quality Assurance',        body: 'Second set of eyes on the portfolio. Compliance reporting, vendor &amp; insurance tracking, transition support. Led by Joe Jordan, PCAM — former CAI Chesapeake Chapter President.' },
  ];
  return (
    <section className="tw-section tw-sol-compare-section">
      <div className="tw-container-wide">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div className="tw-eyebrow">Built on CINC</div>
            <h2 className="tw-section-title" style={{ margin: '10px 0 18px' }}>
              Real-time visibility, <em>not a quarterly summary.</em>
            </h2>
            <p className="tw-section-lede" style={{ margin: '0 0 22px' }}>
              Every covenant violation — from first sighting to final closure — lives in CINC, the purpose-built HOA management platform Tidewater runs on. Boards see the same Action Item List the management team sees. Owners see their own record on the Tidewater PM app.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                '<strong>Real-time violation &amp; compliance monitoring</strong> on the board portal — no waiting for the monthly report.',
                '<strong>Automated resident communications</strong> — email or postal, per resident preference.',
                '<strong>Compliance recordkeeping</strong> — a complete audit trail per property, preserved for the life of the association.',
              ].map((text, i) => (
                <li key={i} style={{ fontFamily: 'var(--tw-font-body)', fontSize: 14.5, color: 'var(--tw-dark)', display: 'grid', gridTemplateColumns: '22px 1fr', gap: 10, alignItems: 'start' }}>
                  <span style={{ color: 'var(--tw-teal)', marginTop: 2 }}><CheckSmIcon /></span>
                  <span dangerouslySetInnerHTML={{ __html: text }} />
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'var(--tw-cream)', border: '1px solid var(--tw-border)', borderRadius: 14, padding: '28px 28px 24px', boxShadow: '0 14px 36px rgba(23,35,37,.08)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--tw-border)' }}>
              <div style={{ fontFamily: 'var(--tw-font-heading)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--tw-fg-muted)' }}>The team behind it</div>
              <div style={{ fontFamily: 'var(--tw-font-mono)', fontSize: 10.5, color: 'var(--tw-fg-subtle)', letterSpacing: '0.04em' }}>IN-HOUSE</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {team.map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, alignItems: 'start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--tw-teal-50)', color: 'var(--tw-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'var(--tw-font-heading)', fontWeight: 800, fontSize: 13 }}>{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--tw-font-heading)', fontWeight: 700, fontSize: 14, color: 'var(--tw-dark)', marginBottom: 3 }}>{r.role}</div>
                    <div style={{ fontFamily: 'var(--tw-font-body)', fontSize: 13.5, color: 'var(--tw-fg-muted)', lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: r.body }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Why outsource covenant enforcement at all?',
    a: 'The most consistent reason boards we work with cite: <strong>they don\'t want to be the neighbor sending the violation letter.</strong> Third-party enforcement — with a documented process and the same template going to every owner — takes the personality out of the equation, reduces board-neighbor conflict, and gives the association a defensible audit trail.',
  },
  {
    q: 'Who actually writes the violation letters?',
    a: 'Your community manager identifies violations during routine inspections and documents them on-site. From there, Tidewater\'s in-house administrative team processes the notices through CINC so every owner\'s record reflects the full history and your board has real-time visibility into compliance status.',
  },
  {
    q: 'Does the board see what\'s happening, or just get a summary?',
    a: 'Real-time. Every open violation is visible on the CINC board portal — the same <strong>Action Item List</strong> the management team uses. Boards can audit follow-through at any time without asking the manager for a report.',
  },
  {
    q: 'Who decides the cure period, fine schedule, and hearing procedure?',
    a: '<strong>The board</strong>, per the community\'s governing documents and applicable Maryland law. Tidewater applies the policy consistently and documents every step. We don\'t set the rules — we run the process.',
  },
  {
    q: 'What happens when a violation isn\'t cured?',
    a: 'Escalation follows the community\'s policy — typically through second notice, hearing, and fines per the recorded schedule, with referral to the association\'s attorney as a final step.',
  },
  {
    q: 'How is ARC (architectural review) related?',
    a: 'ARC requests are processed by the same administrative team and tracked in CINC alongside violations. The two workflows are coordinated so an owner with a pending ARC isn\'t simultaneously getting a violation notice for the same change.',
  },
  {
    q: 'What about appeals?',
    a: 'Every homeowner has the right to be heard. Tidewater helps your board organize hearings and manage the appeals process in accordance with your association\'s governing documents and applicable state law. Your community manager and administrative team handle the coordination — scheduling, notices, documentation — so the process is consistent, fair, and defensible.',
  },
  {
    q: 'Does this comply with state HOA law?',
    a: 'Tidewater is an <strong>AAMC&reg;</strong>-accredited management company with multiple PCAM-credentialed managers and a dedicated Quality Assurance team that monitors compliance across every community we manage. Our enforcement processes are built around your association\'s governing documents and the statutory requirements of your state — whether that\'s Maryland, Delaware, Virginia, Pennsylvania, West Virginia, or Washington D.C. For questions involving specific legal interpretation, we coordinate directly with your association\'s legal counsel to make sure your board is protected.',
  },
];

function CovenantFaq() {
  return (
    <section className="tw-section tw-sol-faq-section">
      <div className="tw-container-wide">
        <div className="tw-sol-faq-grid">
          <div className="tw-sol-faq-head">
            <div className="tw-eyebrow">Board Questions</div>
            <h2>The covenant-enforcement <em>questions</em> we get most.</h2>
            <p>For a deeper walkthrough of the violation lifecycle, see the related blog spoke: <em></em>.</p>
            <a href="/request-a-proposal" className="tw-btn tw-btn-primary">Ask your own question →</a>
          </div>
          <FaqAccordion items={FAQS} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Page composer
// ─────────────────────────────────────────────────────────────
export default function CovenantEnforcement() {
  return (
    <>
      <CovenantHero />
      <CovenantWhyThirdParty />
      <CovenantProcess />
      <CovenantCinc />
      <CovenantFaq />
    </>
  );
}
