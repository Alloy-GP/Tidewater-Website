// src/config/review.ts
// Source of truth for the Alloy Preview Review widget (stg only).
//
//   PASTEL_BASE  — fixed Pastel share link for this client. Set once. (trailing # required)
//   TICKET_ID    — rewritten at the start of each review session (blank = none).
//   REVIEW_ITEMS — every reviewable page. Only items with review:true appear in the
//                  widget; if none are true the widget is hidden entirely.
//
// Paths must match the live route exactly. Tidewater uses trailingSlash:'never',
// so paths have NO trailing slash (e.g. '/request-a-proposal').

export const PASTEL_BASE = 'https://usepastel.com/link/o0ngekr3/#';
export const TICKET_ID   = '';

export interface ReviewItem {
  label: string;
  path: string;
  review: boolean;
}

export const REVIEW_ITEMS: ReviewItem[] = [
  { label: 'Maryland HOA Law (blog post)', path: '/blog/maryland-hoa-law', review: true },
  { label: 'HOA Special Assessments (blog post)', path: '/blog/hoa-special-assessment', review: true },
  { label: 'HOA & Condo Insurance (blog post)', path: '/blog/hoa-insurance', review: true },
  { label: 'Owings Mills office (city page)', path: '/locations/maryland/owings-mills', review: true },
  { label: 'Ocean City office (city page)', path: '/locations/maryland/ocean-city', review: true },
  { label: 'Lewes office (city page)', path: '/locations/delaware/lewes', review: true },
];
