// Blog Landing — /blog
// Featured post + categorized grid + search + sticky filter chips + pagination

import { useState, useMemo } from 'react';
import { ALL_POSTS as _ALL_POSTS } from './BlogPostsData.js';

const BlogIndexIcons = {
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
};

// All posts — data lives in BlogPostsData.js (shared with FromTheBlog.jsx).
const ALL_POSTS = _ALL_POSTS;

const ALL_CATEGORIES = [
  { id: 'all',        label: 'All posts' },
  { id: 'hoa-mgmt',  label: 'HOA Management' },
  { id: 'rental',    label: 'Rental Management' },
  { id: 'governance',label: 'Board Governance' },
  { id: 'finances',  label: 'HOA Finances' },
  { id: 'solutions', label: 'Solutions' },
];

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────
function BlogIndexHero({ showSearch, query, onQuery, onSubmit }) {
  return (
    <section className="tw-bi-hero">
      <div className="tw-bi-hero-bg"></div>
      <div className="tw-bi-hero-paper"></div>
      <div className="tw-bi-hero-inner">
        <h1>The Tidewater <em>practical guides.</em></h1>
        <p>Practical guides for HOA and condo boards across Maryland and the Mid-Atlantic. Reserve studies, switching management, governance mechanics, Maryland HOA law, and the operational systems that work in practice.</p>

        {showSearch && (
          <form className="tw-bi-search" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            {BlogIndexIcons.search}
            <input
              type="text"
              placeholder="Search 30+ posts — reserves, switching, ARC, Maryland law…"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              aria-label="Search blog posts"
            />
            <button type="submit">Search</button>
          </form>
        )}

        <div className="tw-bi-hero-stats">
          <span><strong>7</strong> posts &amp; growing</span>
          <span><strong>5</strong> categories</span>
          <span><strong>4,200+</strong> board members subscribed</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Featured post
// ─────────────────────────────────────────────────────────────
function BlogIndexFeatured({ post }) {
  if (!post) return null;
  return (
    <section className="tw-bi-featured-section">
      <div className="tw-container-wide">
        <div className="tw-bi-featured-eyebrow-row">
          <span className="tw-divider"></span>
          <span className="tw-eyebrow tw-eyebrow-gold">Featured this week</span>
        </div>

        <a href={post.href} className="tw-bi-featured">
          <div className={`tw-bi-featured-img ${post.tone}`}>
            {post.coverImage && <img src={post.coverImage} alt={post.coverAlt || post.title.replace(/<[^ loading="lazy" decoding="async">]+>/g, '')} />}
          </div>
          <div className="tw-bi-featured-body">
            <span className={`tw-bi-featured-cat ${post.tone}`}>{post.category.label}</span>
            <h2 dangerouslySetInnerHTML={{ __html: post.title }} />
            <p>{post.dek}</p>
            <div className="tw-bi-featured-meta">
              <span>{post.date}</span>
              <span className="sep">·</span>
              <span>{post.readTime} min read</span>
              <span className="sep">·</span>
              <span>{post.author}</span>
              <span className="cta">Read the playbook →</span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Category filter (sticky)
// ─────────────────────────────────────────────────────────────
function BlogIndexCats({ active, onSelect, counts }) {
  return (
    <section className="tw-bi-cats">
      <div className="tw-bi-cats-inner">
        {ALL_CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`tw-bi-cat-chip ${active === c.id ? 'is-active' : ''}`}
            onClick={() => onSelect(c.id)}
          >
            <span>{c.label}</span>
            <span className="tw-bi-cat-count">{counts[c.id] || 0}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Posts grid
// ─────────────────────────────────────────────────────────────
function BlogIndexCard({ post }) {
  return (
    <a href={post.href} className="tw-bi-card">
      <div className={`tw-bi-card-img ${post.tone}`}>
        {post.coverImage && <img src={post.coverImage} alt={post.coverAlt || post.title.replace(/<[^ loading="lazy" decoding="async">]+>/g, '')} />}
      </div>
      <div className="tw-bi-card-body">
        <span className={`tw-bi-card-cat ${post.tone}`}>{post.category.label}</span>
        <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
        <p>{post.dek}</p>
        <div className="tw-bi-card-meta">
          <span>{post.date}</span>
          <span className="sep">·</span>
          <span>{post.readTime} min read</span>
        </div>
      </div>
    </a>
  );
}

function BlogIndexGrid({ posts, total, onLoadMore, hasMore, activeCat, query }) {
  const headLabel =
    query ? 'Search results' :
    activeCat === 'all' ? 'All posts' :
    ALL_CATEGORIES.find(c => c.id === activeCat)?.label || 'Posts';

  return (
    <section className="tw-bi-grid-section">
      <div className="tw-container-wide">
        <div className="tw-bi-grid-head">
          <div>
            <h2>{headLabel}</h2>
            <div className="tw-bi-grid-head-count">
              {total} {total === 1 ? 'POST' : 'POSTS'}{query && ` MATCHING "${query.toUpperCase()}"`}
            </div>
          </div>
          <div className="tw-bi-sort">
            Sort by
            <select defaultValue="newest" aria-label="Sort posts">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="reading-time">Reading time</option>
            </select>
          </div>
        </div>

        <div className="tw-bi-grid">
          {posts.length > 0 ? (
            posts.map((p, i) => <BlogIndexCard key={i} post={p} />)
          ) : (
            <div className="tw-bi-empty">
              <h3>No posts match{query ? ` "${query}"` : ''} yet.</h3>
              <p>Try a different filter, or send us the question and we&rsquo;ll write the post.</p>
              <a href="/request-a-proposal" className="tw-btn tw-btn-primary">Ask a question →</a>
            </div>
          )}
        </div>

        {hasMore && (
          <div className="tw-bi-more">
            <button type="button" onClick={onLoadMore}>Load more posts</button>
            <div className="tw-bi-more-count">Showing {posts.length} of {total}</div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Newsletter capture
// ─────────────────────────────────────────────────────────────
function BlogIndexNewsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.target);
    try {
      await fetch('/api/subscribe', { method: 'POST', body: fd });
    } catch {}
    setSubmitted(true);
    setLoading(false);
  };
  return (
    <section className="tw-blog-newsletter">
      <div className="tw-blog-newsletter-inner">
        <div className="tw-blog-newsletter-eyebrow">Tidewater Resources</div>
        <h2>Get the <em>monthly board memo</em> in your inbox.</h2>
        <p>One email a month. Practical board playbooks, Maryland HOA law updates, reserve-study deep-dives. Written for working boards, not vendors. No fluff.</p>
        {submitted ? (
          <div style={{ fontFamily: 'var(--tw-font-heading)', fontWeight: 700, fontSize: 15, color: 'var(--tw-gold)' }}>
            Thanks &mdash; first issue lands the first Tuesday of next month.
          </div>
        ) : (
          <form className="tw-blog-newsletter-form" onSubmit={onSubmit}>
            {/* Honeypot — hidden from real users, bots fill it in */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:'absolute',left:'-9999px',width:'1px',height:'1px',opacity:0}} />
            <input type="email" name="email" placeholder="board@yourcommunity.org" aria-label="Email address" required />
            <button type="submit" disabled={loading}>Subscribe</button>
          </form>
        )}
        <div className="tw-blog-newsletter-fine">Unsubscribe any time &middot; We never share your email &middot; 4,200+ board members subscribed</div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Page composer
// ─────────────────────────────────────────────────────────────
export default function BlogIndex({ perPage: initialPerPage = 6, showSearch = true, showFeatured = true, showNewsletter = true }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('all');
  const [perPage, setPerPage] = useState(initialPerPage);
  const [submittedQuery, setSubmittedQuery] = useState('');

  const counts = useMemo(() => {
    const c = { all: ALL_POSTS.length };
    ALL_POSTS.forEach(p => { c[p.category.id] = (c[p.category.id] || 0) + 1; });
    return c;
  }, []);

  const filtered = useMemo(() => {
    let list = ALL_POSTS;
    if (active !== 'all') list = list.filter(p => p.category.id === active);
    if (submittedQuery.trim()) {
      const q = submittedQuery.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.dek.toLowerCase().includes(q) ||
        p.category.label.toLowerCase().includes(q)
      );
    }
    return list;
  }, [active, submittedQuery]);

  // The newest post always takes the featured spot. dateIso is 'YYYY-MM-DD',
  // so a lexicographic max gives the most recent post automatically — no need
  // to hand-toggle a `featured` flag when a new post is added.
  const featuredPost = (active === 'all' && !submittedQuery && showFeatured)
    ? ALL_POSTS.reduce((newest, p) => (!newest || p.dateIso > newest.dateIso ? p : newest), null)
    : null;

  const gridPosts = featuredPost ? filtered.filter(p => p.slug !== featuredPost.slug) : filtered;
  const visiblePosts = gridPosts.slice(0, perPage);
  const hasMore = gridPosts.length > perPage;

  const onSubmitSearch = () => { setSubmittedQuery(query); setActive('all'); };
  const onSelectCat = (id) => {
    setActive(id);
    setSubmittedQuery('');
    setQuery('');
    setPerPage(initialPerPage);
  };

  return (
    <>
      <BlogIndexHero
        showSearch={showSearch}
        query={query}
        onQuery={(v) => { setQuery(v); if (!v.trim()) setSubmittedQuery(''); }}
        onSubmit={onSubmitSearch}
      />

      <BlogIndexCats active={active} onSelect={onSelectCat} counts={counts} />

      {featuredPost && <BlogIndexFeatured post={featuredPost} />}

      <BlogIndexGrid
        posts={visiblePosts}
        total={gridPosts.length}
        onLoadMore={() => setPerPage(p => p + initialPerPage)}
        hasMore={hasMore}
        activeCat={active}
        query={submittedQuery}
      />

      {showNewsletter && <BlogIndexNewsletter />}
    </>
  );
}
