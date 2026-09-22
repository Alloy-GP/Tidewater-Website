import { useState } from 'react';

// All board reviews are sourced from real named board members / officers.
// Do NOT add fabricated reviews — use <!-- PLACEHOLDER --> tags for any unconfirmed content.

export const ALL_REVIEWS = [
  {
    tag: 'HOA', tone: '',
    quote: 'I must say as a small Community, we have experienced great and timely service from Tidewater. We\'ve worked with Mr. Christopher Ziesat who has always quickly responded to our concerns even if it was for guidance. As President of our HOA, I\'m very pleased with being able to call upon Christopher Ziesat who will always respond in a professional and timely manner.',
    initials: 'WT', avatarTone: '',
    name: 'Walt Taylor',
    role: 'President', service: 'HOA Management',
    community: 'HOA — Maryland',
    location: 'Maryland',
    units: '', tenure: '',
    featured: false,
  },
  {
    tag: 'HOA', tone: '',
    quote: 'As a new treasurer to our HOA, Christopher Ziesat and the resources available at Tidewater have been an invaluable asset. Requests for help are quickly answered, information provided in a timely manner, and suggestions to make my job easier are offered without prompting. The reports provided to our Board and community keep us well informed and on a solid basis to understand our financial status.',
    initials: 'ST', avatarTone: '',
    name: 'Steve Turner',
    role: 'Treasurer', service: 'HOA Management',
    community: 'HOA — Maryland',
    location: 'Maryland',
    units: '', tenure: '',
    featured: true,
  },
  {
    tag: 'HOA', tone: '',
    quote: 'Crystal at Tidewater cleaned up our community after a bad situation with another management company. She handles problems and is always there for us. She is amazing.',
    initials: 'MV', avatarTone: '',
    name: 'Mary Vosik',
    role: 'Treasurer', service: 'HOA Management',
    community: 'Shoreview Woods',
    location: 'Maryland',
    units: '', tenure: '',
    featured: false,
  },
  {
    tag: 'HOA', tone: '',
    quote: 'Crystal Marine is by far the very best property Management Representative any organization could ever have. Crystal has demonstrated outstanding managerial ability in maintaining the Homestead HOA\'s diversified operations. She has displayed exceptional professional ability, initiative, and meticulous attention to detail in managing our HOA. She has demonstrated on all occasions a thorough knowledge of her work, exceptional ability and resoluteness of purpose. Her complete understanding of HOA rules, long hours of work are an inspiration to those with whom she serves. Her superb planning ability, contributed significantly to the success of our HOA. We thank her for her selfless attitude and willingness to expend every effort to achieve superior results. Crystal Marine is the best!',
    initials: 'DS', avatarTone: '',
    name: 'David Seamen',
    role: 'Board Member', service: 'HOA Management',
    community: 'Homestead HOA',
    location: 'Maryland',
    units: '', tenure: '',
    featured: false,
  },
  {
    tag: 'HOA', tone: '',
    quote: 'Tammy Alarie is very organized and a responsive and hardworking property manager for our small community.',
    initials: 'MN', avatarTone: '',
    name: 'Mary Neimeyer',
    role: 'Board Member', service: 'HOA Management',
    community: 'Shoreview',
    location: 'Delaware / Eastern Shore',
    units: '', tenure: 'Mar 2024',
    featured: false,
  },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function TestimonialCard({ r }) {
  return (
    <article className={`tw-tst-card${r.featured ? ' is-featured' : ''}`}>
      <div className="tw-tst-card-head">
        <span className="tw-tst-stars">
          {[0,1,2,3,4].map(i => <StarIcon key={i} />)}
        </span>
        <span className={`tw-tst-tag${r.tone ? ' ' + r.tone : ''}`}>{r.tag}</span>
      </div>
      <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
      <div className="tw-tst-card-foot">
        <div className={`tw-tst-card-avatar${r.avatarTone ? ' ' + r.avatarTone : ''}`}>{r.initials}</div>
        <div style={{flex:1,minWidth:0}}>
          <div className="tw-tst-card-name">{r.name}</div>
          <div className="tw-tst-card-meta">
            <span className="role">{r.role}</span> &middot; {r.community}
            <div className="tw-tst-card-meta-row">
              <span>{r.location}</span>
              {r.units && <><span className="sep">&middot;</span><span>{r.units}</span></>}
              {r.tenure && <><span className="sep">&middot;</span><span>{r.tenure}</span></>}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsGrid() {
  const [filter, setFilter] = useState('all');

  // Filters are derived from tags present in real review data.
  // Add more tags here as additional real board reviews are collected.
  const presentTags = [...new Set(ALL_REVIEWS.map(r => r.tag))];
  const TAG_LABELS = { HOA: 'HOA', CONDO: 'Condo Association', RENTAL: 'Rental Owners', DEVELOPER: 'Developers' };

  const filters = [
    { id: 'all', label: 'All board reviews', count: ALL_REVIEWS.length },
    ...presentTags.map(tag => ({
      id: tag,
      label: TAG_LABELS[tag] || tag,
      count: ALL_REVIEWS.filter(r => r.tag === tag).length,
    })),
  ];

  const reviews = filter === 'all' ? ALL_REVIEWS : ALL_REVIEWS.filter(r => r.tag === filter);

  return (
    <>
      <section className="tw-tst-filters">
        <div className="tw-tst-filters-inner">
          <span className="tw-tst-filter-label">Filter</span>
          {filters.map(f => (
            <button
              key={f.id}
              className={`tw-tst-filter-chip${filter === f.id ? ' is-active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              <span>{f.label}</span>
              <span className="tw-tst-filter-chip-count">{f.count}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="all-reviews" className="tw-tst-grid-section">
        <div className="tw-container-wide">
          <div className="tw-tst-grid">
            {reviews.map((r, i) => <TestimonialCard key={i} r={r} />)}
          </div>

          <div className="tw-tst-disclosure">
            <div className="tw-tst-disclosure-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </div>
            <div>
              <h3>How this page is built</h3>
              <p>
                Every review on this page is from a named board member, treasurer, or development partner whose community we currently manage or recently transitioned. <strong>We provide their direct contact</strong> on request &mdash; if you&rsquo;re evaluating Tidewater, we&rsquo;d rather you talk to them than read about them. <a href="/request-a-proposal">Request reference contacts &rarr;</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
