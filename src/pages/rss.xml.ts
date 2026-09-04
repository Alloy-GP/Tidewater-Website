// RSS feed for the blog + solutions guides. Source of truth is BlogPostsData.js
// (same list that drives /blog and the From-the-Blog strips).
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { ALL_POSTS } from '../components/BlogPostsData.js';
import { SITE } from '../config/site';

export const prerender = true;

const strip = (html: string) =>
  String(html)
    .replace(/<[^>]+>/g, '')
    .replace(/&rsquo;|&#39;/g, '’')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

export function GET(context: APIContext) {
  const site = (context.site ?? new URL(SITE.url)).toString();
  return rss({
    title: 'Tidewater — HOA Board Blog & Playbooks',
    description: 'HOA board playbooks for Maryland and the Mid-Atlantic: governance, finances, switching management, and rental ownership, from Tidewater’s credentialed managers.',
    site,
    items: ALL_POSTS.map((p) => ({
      title: strip(p.title),
      description: strip(p.dek),
      link: p.href,
      pubDate: new Date(`${p.dateIso}T12:00:00-05:00`),
      categories: [p.category.label],
      author: p.author,
    })),
    customData: '<language>en-us</language>',
    stylesheet: false,
  });
}
