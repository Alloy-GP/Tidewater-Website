// FromTheBlog — "From the blog" section for service pages.
// Reads from shared BlogPostsData.js. Filters by category with newest-N fallback.
//
// Usage:
//   <FromTheBlog
//     categories={['hoa-mgmt', 'governance']}
//     titleHtml="Resources for <em>HOA boards.</em>"
//   />

import { ALL_POSTS } from './BlogPostsData.js';

export default function FromTheBlog({ categories, eyebrow, titleHtml, limit = 3, viewAllHref = '/blog' }) {
  const allowed = categories && categories.length ? categories : null;
  const posts = ALL_POSTS.slice().sort((a, b) => (b.dateIso || '').localeCompare(a.dateIso || ''));

  let picked = allowed
    ? posts.filter(p => allowed.includes(p.category && p.category.id))
    : [];

  // Top up with newest unmatched posts if pool is too small
  if (picked.length < limit) {
    const have = new Set(picked.map(p => p.slug));
    for (const p of posts) {
      if (picked.length >= limit) break;
      if (!have.has(p.slug)) { picked.push(p); have.add(p.slug); }
    }
  }
  picked = picked.slice(0, limit);

  const eb = eyebrow || 'From the Blog';
  const heading = titleHtml || (allowed ? 'Practical reading for <em>your situation.</em>' : 'Latest from <em>the Tidewater blog.</em>');

  if (!picked.length) return null;

  return (
    <section className="tw-blog-related tw-ftb-section">
      <div className="tw-blog-related-inner">
        <div className="tw-ftb-head">
          <div>
            <div className="tw-blog-related-eyebrow">{eb}</div>
            <h2 dangerouslySetInnerHTML={{ __html: heading }} />
          </div>
          <a href={viewAllHref} className="tw-ftb-viewall">
            View all posts <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div className="tw-blog-related-grid">
          {picked.map((p, i) => (
            <a key={i} href={p.href} className="tw-blog-related-card">
              <div className={`tw-blog-related-card-img ${p.tone || ''}`}>
                {p.coverImage && <img src={p.coverImage} alt={p.coverAlt || ''}  loading="lazy" decoding="async" />}
              </div>
              <div className="tw-blog-related-card-body">
                <span className={`tw-blog-related-card-cat ${p.tone || ''}`}>
                  {p.category && p.category.label}
                </span>
                <h3 dangerouslySetInnerHTML={{ __html: p.title }} />
                <p>{p.dek}</p>
                <div className="tw-blog-related-card-meta">
                  {p.date} <span className="sep">&middot;</span> {p.readTime} min read
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
