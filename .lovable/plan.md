# SEO Growth Plan for ministries.hlpr.io

Two parts: (1) finish the Google Search Console connection so we can measure, and (2) build a real content + SEO engine so there's something for Google to rank.

---

## Part 1 — Finish Google Search Console setup

Right now GSC is half-done. To complete it:

1. **Approve the connector** — I'll re-trigger the Google Search Console connection prompt. You sign in with the Google account you want to own the property (use the one that will manage SEO long-term, not a personal throwaway).
2. **Verify the domain via meta tag** — once connected, I'll:
   - Request a verification token from Google
   - Add a `<meta name="google-site-verification" content="...">` tag to `index.html`
   - Ask you to **publish** so the tag goes live on `ministries.hlpr.io`
   - Call Google's verify endpoint
3. **Register the property + submit sitemap** — I'll PUT the site into your GSC account and submit `https://ministries.hlpr.io/sitemap.xml` so indexing starts.
4. **Confirm** — pull the site list back from GSC to confirm it's verified and the sitemap is accepted.

After this, Google will start crawling and within ~1–2 weeks you'll see impressions/clicks data we can act on.

---

## Part 2 — SEO growth strategy

Your site is brand new with ~0 organic traffic. Three levers, in priority order:

### Lever A — Blog (the main growth engine)

A `/blog` section with answer-style articles targeting the questions your buyers (church admins, ministry leaders, podcasters) actually Google. We'd build:

- **Route + layout**: `/blog` index, `/blog/:slug` post page, both SEO-optimized (per-route Helmet, Article JSON-LD, OG tags, canonical).
- **Content storage**: posts as MDX/Markdown files in the repo (simple, no CMS needed) OR Lovable Cloud table if you want to write/edit from a web UI. I'd recommend **MDX files** for speed and zero ops.
- **Sitemap auto-generation**: extend `scripts/generate-sitemap.ts` to include every published post.
- **Internal linking**: posts link to homepage CTA ("Get a free 72-hour preview") so traffic converts.

**Starter cluster — 8 posts targeting real ministry-website intent:**
1. "How much should a church website cost in 2026?"
2. "Best church website builders compared (Squarespace vs Wix vs custom)"
3. "Church website checklist: 12 pages every ministry site needs"
4. "How to launch a podcast website for your ministry"
5. "Sermon archive websites: hosting, search, and SEO best practices"
6. "Online giving on your church website: Stripe vs Tithe.ly vs Pushpay"
7. "Church website SEO: how to rank locally for 'church near me'"
8. "Migrating from Squarespace to a custom church website"

I'd validate each title with Semrush volume/difficulty before writing, and pick the 4–5 with the best traffic-to-difficulty ratio.

### Lever B — On-page SEO for the homepage

Quick wins on the existing landing page:
- Add an FAQ-targeted section (already have FAQPage JSON-LD — good).
- Add an `<h2>` cluster targeting "custom church website", "ministry web design", "podcast website design".
- Add a small "Who we serve" section listing ministry types (churches, podcasts, nonprofits) — captures long-tail.
- Add testimonials with `Review` schema once you have quotes.

### Lever C — Off-page (links + listings)

These I can't do for you in code, but they matter:
- List the business in **Google Business Profile** (even as a remote service — picks up "near me" traffic).
- Get listed in church/ministry tool directories (ChurchTechToday, Ministry Tech, Capterra, G2).
- Guest posts on 2–3 ministry blogs linking back — biggest lever for a new domain.
- Ask the 4 portfolio clients (Dunamis, Eden Cove, Lifework, Saved Singles) to add a small "Site by HLPR" footer link → instant relevant backlinks.

### Tracking & iteration

- GA4 is already installed (`G-H5TXJYXG76`) ✓
- GSC will be installed in Part 1 ✓
- After 30 days I can pull GSC data, see which queries you're getting impressions for, and write/optimize posts toward the winners.

---

## Suggested execution order

1. **Now**: Finish GSC setup (Part 1) — ~5 minutes of your time.
2. **This week**: I build the `/blog` infrastructure + write the first 2 posts using your existing brand voice (ones I read in `Hero.tsx` and `FounderSection.tsx`).
3. **Next 2 weeks**: Write remaining 3–6 posts (1–2 per week is sustainable).
4. **30 days**: Review GSC, double down on what's working.

---

## Technical scope of Part 2 (what I'd actually build)

- `src/pages/Blog.tsx` — index page listing posts
- `src/pages/BlogPost.tsx` — dynamic post page
- `src/content/posts/*.mdx` — post files with frontmatter (title, description, slug, date, ogImage)
- `src/lib/posts.ts` — load + parse MDX at build time
- `vite.config.ts` — add `@mdx-js/rollup` plugin
- `scripts/generate-sitemap.ts` — extend to include all posts
- `App.tsx` — add `/blog` and `/blog/:slug` routes
- `StickyNav.tsx` + `Footer.tsx` — add Blog links

---

## What I need from you to proceed

- **Confirm the GSC Google account** to use (or just approve when I trigger the prompt).
- **Pick a content storage approach**: MDX files in repo (fast, my recommendation) vs Lovable Cloud table with an admin UI (more work, but you write posts in-browser).
- **Approve the starter post topics** above, or swap in topics you'd rather target.
