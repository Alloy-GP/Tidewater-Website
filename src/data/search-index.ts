// ─────────────────────────────────────────────────────────────
// SITE SEARCH INDEX — every public page, built once at build time and served
// as /search-index.json (src/pages/search-index.json.ts). Consumed by the
// header search (SiteSearch.jsx) and the mobile menu (MobileMenu.jsx) through
// src/lib/site-search.ts.
//
// Static pages are listed by hand below; blog posts, blog categories and Board
// Brief issues come from their existing data files so a new post or issue is
// searchable without touching this file. ADDED A PAGE? Add a line here — the
// shape is { t: title, h: route, s: section, c?: crumb, d?: description,
// k?: extra match terms }. Keep titles short labels, not the SEO <title>.
// ─────────────────────────────────────────────────────────────
import { ALL_POSTS } from '../components/BlogPostsData.js';
import { SORTED as ISSUES, href as issueHref, issueLabel } from './newsletters';
import type { SearchEntry } from '../lib/site-search';

const S = {
  company:  'Company',
  hoa:      'HOA & Condo Management',
  rental:   'Rental Management',
  loc:      'Locations',
  services: 'Maintenance & Real Estate',
  articles: 'Articles & Guides',
  brief:    'The Board Brief',
  resources:'Resources',
} as const;

const PAGES: SearchEntry[] = [
  // ── Company ────────────────────────────────────────────────────────────────
  { t: 'Home', h: '/', s: S.company, d: 'Hands-on HOA, condo and rental property management for the Mid-Atlantic.', k: 'tidewater homepage' },
  { t: 'Our Story', h: '/about', s: S.company, c: 'About', d: 'Family-owned in the Mid-Atlantic since 1989. Two generations, ~75 in-house staff, 450+ communities.', k: 'about history family owned independent' },
  { t: 'Leadership', h: '/about/leadership', s: S.company, c: 'About', d: 'PCAM-credentialed team and CAI chapter presidents.', k: 'team directors regional director staff Marc Greenberg Kate Cornell Don Gentry Cody Bishop' },
  { t: 'Careers', h: '/careers', s: S.company, c: 'About', d: 'Join an independent, board-first management firm. Open roles and benefits.', k: 'jobs hiring work employment' },
  { t: 'Testimonials', h: '/testimonials', s: S.company, c: 'About', d: 'What boards and owners say about Tidewater.', k: 'reviews google reviews board quotes' },
  { t: 'Request a Proposal / Contact', h: '/request-a-proposal', s: S.company, d: 'Get a line-item proposal for your community, or reach the right team for any other request.', k: 'contact us quote pricing rfp proposal phone email' },
  { t: 'FAQ', h: '/faq', s: S.company, c: 'Resources', d: 'Straight answers to what boards and homeowners ask most — portal access, proposals, enforcement and more.', k: 'questions help cinc portal login pay assessment' },
  { t: 'Accessibility Statement', h: '/accessibility', s: S.company, k: 'ada wcag' },
  { t: 'Privacy Policy', h: '/privacy', s: S.company, k: 'data cookies' },
  { t: 'Terms of Use', h: '/terms', s: S.company, k: 'legal' },

  // ── HOA & condo management ─────────────────────────────────────────────────
  { t: 'HOA Management', h: '/hoa-management', s: S.hoa, d: 'Full-service management for homeowner associations. AAMC-accredited, portfolios capped at 8–12 communities per manager.', k: 'homeowners association community association management companies full flex financial only tiers' },
  { t: 'Townhome & Planned Communities', h: '/hoa-management/townhome-community-management', s: S.hoa, c: 'HOA Management', d: 'Master-planned and townhome association expertise.', k: 'townhouse pud master planned' },
  { t: 'HOA Financial Management', h: '/hoa-management/hoa-financial-management', s: S.hoa, c: 'HOA Management', d: 'MBA/CPA Controller, StrongRoom invoice approval, financial-only service tier.', k: 'accounting budgets reserves collections bookkeeping financial only' },
  { t: 'Covenant Enforcement', h: '/hoa-management/covenant-enforcement', s: S.hoa, c: 'HOA Management', d: 'Consistent, documented rule enforcement.', k: 'violations rules architectural fines' },
  { t: 'Condo Association Management', h: '/condo-management', s: S.hoa, d: 'High-rise, mid-rise and garden-style condominium expertise — life safety, reserve studies, mechanical systems.', k: 'condominium coa' },
  { t: 'Commercial Associations', h: '/hoa-management/commercial-association-management', s: S.hoa, c: 'Condo Management', d: 'Mixed-use, office condos and business parks.', k: 'commercial property' },
  { t: 'Switching HOA Management Companies', h: '/solutions/switching-hoa-management-company', s: S.hoa, c: 'Solutions', d: 'Thinking of switching? The transition timeline, what to ask, and how records move.', k: 'change transition new manager fire' },
  { t: 'Self-Managed HOA Transition', h: '/solutions/self-managed-hoa-transition', s: S.hoa, c: 'Solutions', d: 'Self-managed today? What actually changes when a board hires professional management.', k: 'volunteer board self managed' },

  // ── Rental management ──────────────────────────────────────────────────────
  { t: 'Rental Property Management', h: '/rental-management', s: S.rental, d: 'For owners. One flat fee, single-family and multifamily, AppFolio-backed.', k: 'landlord investor property manager appfolio flat fee' },
  { t: 'Available Rentals', h: '/rental-listings', s: S.rental, d: 'For renters. Browse homes available now in Maryland and Delaware and apply online.', k: 'listings apartments homes for rent tenants apply' },
  { t: 'Maryland Rental Management', h: '/rental-management/maryland', s: S.rental, c: 'Rental Management', d: 'Rental management across Maryland — from the Bay to the Beltway.', k: 'md counties' },
  { t: 'Anne Arundel County Rental Management', h: '/rental-management/maryland/anne-arundel-county', s: S.rental, c: 'Rental Management · Maryland', k: 'Annapolis Severna Park Crofton Pasadena Glen Burnie Odenton Fort Meade' },
  { t: 'Baltimore County Rental Management', h: '/rental-management/maryland/baltimore-county', s: S.rental, c: 'Rental Management · Maryland', k: 'Towson Owings Mills Cockeysville Pikesville Catonsville White Marsh Dundalk' },
  { t: 'Howard County Rental Management', h: '/rental-management/maryland/howard-county', s: S.rental, c: 'Rental Management · Maryland', k: 'Columbia Ellicott City Elkridge Clarksville Fulton Glenwood' },
  { t: 'Montgomery County Rental Management', h: '/rental-management/maryland/montgomery-county', s: S.rental, c: 'Rental Management · Maryland', k: 'Rockville Bethesda Gaithersburg Germantown Wheaton Potomac' },
  { t: 'Prince George’s County Rental Management', h: '/rental-management/maryland/prince-georges-county', s: S.rental, c: 'Rental Management · Maryland', k: 'PG Bowie Largo Greenbelt Hyattsville College Park Laurel Upper Marlboro' },
  { t: 'Silver Spring Property Management', h: '/rental-management/maryland/silver-spring', s: S.rental, c: 'Rental Management · Maryland', k: 'Four Corners Forest Glen Aspen Hill Wheaton Takoma Park DC commuter' },
  { t: 'Ocean City Rental Management', h: '/rental-management/maryland/ocean-city', s: S.rental, c: 'Rental Management · Maryland', k: 'OC West Ocean City Ocean Pines Berlin beach condo' },
  { t: 'Delaware Rental Management', h: '/rental-management/delaware', s: S.rental, c: 'Rental Management', d: 'Rental management across coastal Delaware — Sussex County.', k: 'DE Sussex coastal second home' },
  { t: 'Lewes Rental Management', h: '/rental-management/delaware/lewes', s: S.rental, c: 'Rental Management · Delaware', k: 'Cape Henlopen Pilottown Henlopen Acres Long Neck Milton' },
  { t: 'Rehoboth Beach Rental Management', h: '/rental-management/delaware/rehoboth-beach', s: S.rental, c: 'Rental Management · Delaware', k: 'North Shores Dewey Beach Silver Lake' },
  { t: 'Bethany Beach Rental Management', h: '/rental-management/delaware/bethany-beach', s: S.rental, c: 'Rental Management · Delaware', k: 'Sea Colony South Bethany Ocean View Millville' },
  { t: 'Fenwick Island Rental Management', h: '/rental-management/delaware/fenwick-island', s: S.rental, c: 'Rental Management · Delaware', k: 'Bayside Selbyville Route 54' },

  // ── Locations ──────────────────────────────────────────────────────────────
  { t: 'Service Areas', h: '/service-areas', s: S.loc, d: 'Six states, one family-owned firm — Maryland, DC, Virginia, Pennsylvania, Delaware and West Virginia.', k: 'where we serve coverage map states counties offices' },
  { t: 'Owings Mills Office (Headquarters)', h: '/locations/maryland/owings-mills', s: S.loc, c: 'Offices', d: '3600 Crondall Lane, Suite 100, Owings Mills, MD 21117 · (855) 876-5500', k: 'hq headquarters address directions hours phone Baltimore' },
  { t: 'Ocean City Office', h: '/locations/maryland/ocean-city', s: S.loc, c: 'Offices', d: '8101 Coastal Hwy, Ste 5, Ocean City, MD 21842 · (855) 876-5500', k: 'address directions hours phone Delmarva Eastern Shore' },
  { t: 'Lewes Office', h: '/locations/delaware/lewes', s: S.loc, c: 'Offices', d: '20375 John J Williams Hwy, Lewes, DE 19958 · (302) 260-9595', k: 'address directions hours phone Delaware Sussex' },
  { t: 'Maryland HOA Management', h: '/hoa-management/maryland', s: S.loc, c: 'HOA Management', d: 'HOA management across Maryland — 14 counties plus Baltimore City.', k: 'MD counties statewide' },
  { t: 'Anne Arundel County HOA Management', h: '/hoa-management/maryland/anne-arundel-county', s: S.loc, c: 'HOA Management · Maryland', k: 'Annapolis Severna Park Crofton Pasadena Glen Burnie Odenton Arnold Edgewater Linthicum Mayo Davidsonville Shady Side' },
  { t: 'Baltimore County HOA Management', h: '/hoa-management/maryland/baltimore-county', s: S.loc, c: 'HOA Management · Maryland', k: 'Towson Owings Mills Pikesville Catonsville Cockeysville Timonium White Marsh Perry Hall Reisterstown Essex' },
  { t: 'Carroll County HOA Management', h: '/hoa-management/maryland/carroll-county', s: S.loc, c: 'HOA Management · Maryland', k: 'Westminster Eldersburg Sykesville Mount Airy Hampstead Taneytown Manchester' },
  { t: 'Cecil County HOA Management', h: '/hoa-management/maryland/cecil-county', s: S.loc, c: 'HOA Management · Maryland', k: 'Elkton North East Perryville Chesapeake City Rising Sun Port Deposit' },
  { t: 'Frederick County HOA Management', h: '/hoa-management/maryland/frederick-county', s: S.loc, c: 'HOA Management · Maryland', k: 'Frederick Urbana Middletown Mount Airy Walkersville Brunswick New Market' },
  { t: 'Howard County HOA Management', h: '/hoa-management/maryland/howard-county', s: S.loc, c: 'HOA Management · Maryland', k: 'Columbia Ellicott City Elkridge Fulton Clarksville Jessup Laurel Savage Glenelg' },
  { t: 'Kent County HOA Management', h: '/hoa-management/maryland/kent-county', s: S.loc, c: 'HOA Management · Maryland', k: 'Chestertown Rock Hall Betterton Galena Millington Eastern Shore' },
  { t: 'Montgomery County HOA Management', h: '/hoa-management/maryland/montgomery-county', s: S.loc, c: 'HOA Management · Maryland', k: 'Rockville Silver Spring Bethesda Gaithersburg Germantown Chevy Chase Wheaton Olney' },
  { t: 'Prince George’s County HOA Management', h: '/hoa-management/maryland/prince-georges-county', s: S.loc, c: 'HOA Management · Maryland', k: 'PG Bowie Laurel Upper Marlboro Largo Greenbelt Hyattsville Accokeek Fort Washington' },
  { t: 'Queen Anne’s County HOA Management', h: '/hoa-management/maryland/queen-annes-county', s: S.loc, c: 'HOA Management · Maryland', k: 'Stevensville Chester Grasonville Centreville Queenstown Church Hill Kent Island Eastern Shore' },
  { t: 'Washington, DC HOA & Condo Management', h: '/hoa-management/washington-dc', s: S.loc, c: 'HOA Management', k: 'District of Columbia Capitol Hill Navy Yard Northwest condo' },
  { t: 'Virginia HOA & Condo Management', h: '/hoa-management/virginia', s: S.loc, c: 'HOA Management', k: 'VA Northern Virginia Fairfax Loudoun Arlington Alexandria' },
  { t: 'Pennsylvania HOA & Condo Management', h: '/hoa-management/pennsylvania', s: S.loc, c: 'HOA Management', k: 'PA Chester Lancaster York Adams' },
  { t: 'Delaware HOA & Condo Management', h: '/hoa-management/delaware', s: S.loc, c: 'HOA Management', k: 'DE Sussex Lewes Rehoboth coastal' },
  { t: 'West Virginia HOA & Condo Management', h: '/hoa-management/west-virginia', s: S.loc, c: 'HOA Management', k: 'WV Eastern Panhandle Berkeley Jefferson Morgan' },

  // ── Maintenance & real estate ──────────────────────────────────────────────
  { t: 'Maintenance Services', h: '/maintenance-services', s: S.services, d: 'Tidewater Property Maintenance — in-house crews, emergency response, preventive programs.', k: 'repairs emergency handyman vendors plumbing' },
  { t: 'Real Estate', h: '/real-estate', s: S.services, d: 'Tidewater Realty — buy and sell investment property.', k: 'realty broker buy sell investment property agent' },

  // ── Resources ──────────────────────────────────────────────────────────────
  { t: 'All Resources', h: '/resources', s: S.resources, d: 'Tools, guides and FAQs for boards and homeowners.', k: 'library downloads seasonal' },
  { t: 'Articles & Guides', h: '/blog', s: S.articles, d: 'The HOA Board Playbook — practical guides written by PCAM-credentialed managers.', k: 'blog news posts' },
  { t: 'The Board Brief', h: '/resources/newsletter', s: S.brief, d: 'Our monthly newsletter for boards. Every issue archived.', k: 'newsletter subscribe email monthly archive' },
];

const stripHtml = (s: string) => s.replace(/<[^>]+>/g, '');
const decode = (s: string) =>
  s.replace(/&rsquo;|&#8217;/g, '’').replace(/&lsquo;/g, '‘').replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')
   .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
   .replace(/&hellip;/g, '…').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const clean = (s: string) => decode(stripHtml(s)).replace(/\s+/g, ' ').trim();

type Post = { href: string; title: string; dek: string; category: { id: string; label: string } };
const posts = ALL_POSTS as Post[];

const postEntries: SearchEntry[] = posts
  .filter((p) => p.href.startsWith('/blog/'))
  .map((p) => ({ t: clean(p.title).replace(/\.$/, ''), h: p.href, s: S.articles, c: `Articles · ${p.category.label}`, d: clean(p.dek) }));

const categoryEntries: SearchEntry[] = [...new Map(posts.map((p) => [p.category.id, p.category])).values()]
  .map((c) => ({ t: `${c.label} articles`, h: `/blog/category/${c.id}`, s: S.articles, c: 'Articles · Category' }));

const issueEntries: SearchEntry[] = ISSUES.map((i) => ({
  t: `The Board Brief ${issueLabel(i)}: ${clean(i.title)}`,
  h: issueHref(i),
  s: S.brief,
  c: `Newsletter · ${i.month} ${i.year}`,
}));

export function buildSearchIndex(): SearchEntry[] {
  const seen = new Set<string>();
  const out: SearchEntry[] = [];
  for (const e of [...PAGES, ...postEntries, ...categoryEntries, ...issueEntries]) {
    const h = e.h.replace(/\/+$/, '') || '/';
    if (seen.has(h)) continue;
    seen.add(h);
    out.push({ ...e, h });
  }
  return out;
}
