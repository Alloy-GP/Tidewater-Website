---
name: review-widget-lifecycle
description: When a reviewed blog post / page goes live on production, remove it from the stg review widget
metadata:
  type: feedback
---

Once a page reaches production (merged to `main`), drop it from the staging review widget (`src/config/review.ts` `REVIEW_ITEMS`). The widget is for items still awaiting client review, not published ones.

**Why:** the Pastel review widget is stg-only tooling for client sign-off; keeping already-published items in it is noise.

**How to apply:** after publishing a post/page to `main`, edit `review.ts` on `stg` to delete that item, rebuild, push `stg`. Paths have no trailing slash (trailingSlash:'never').
