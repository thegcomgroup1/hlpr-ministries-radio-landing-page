# SEO Dashboard + 90-Day Growth Plan

Two deliverables: (1) a private dashboard at `/admin/seo` showing live Google Search Console data for ministries.hlpr.io, and (2) a tactical 90-day growth plan with validated keywords and a publishing calendar.

---

## Part 1 — SEO Dashboard

### Access
- Route: `/admin/seo` (also a simple `/admin` index).
- Gate: single shared password stored as Lovable Cloud secret `ADMIN_PASSWORD`.
- Flow: enter password → store hashed token in `localStorage` → all dashboard requests pass it to the edge function, which checks against the secret. No signup, no DB users table.

### Data source
- Google Search Console only (already connected). GA4/Semrush can be added later in the same dashboard shell.

### Dashboard sections (one page, tabs or stacked cards)

1. **Headline KPIs (last 28 days vs prior 28)**
   - Total clicks, impressions, average CTR, average position. Each with a delta arrow.

2. **Trend chart** — daily clicks + impressions, last 90 days. Recharts area chart.

3. **Top queries table** — top 25 queries by impressions: query, clicks, impressions, CTR, position. Sortable.

4. **Top pages table** — top 25 pages by clicks: page, clicks, impressions, CTR, position.

5. **Opportunity queries** — queries ranking position 5–20 with >100 impressions and CTR below the position-expected baseline. These are the fastest wins. Each row links to the page that ranks for it.

6. **Coverage snapshot** — sitemap status (last submitted, last read, errors) pulled from `/webmasters/v3/sites/{site}/sitemaps`.

### Technical pieces
- New edge function `gsc-analytics` that:
  - Validates `x-admin-password` header against `ADMIN_PASSWORD` env.
  - Accepts `{ endpoint, params }` and proxies to GSC via the connector gateway (`https://connector-gateway.lovable.dev/google_search_console/...`) using `LOVABLE_API_KEY` + `GOOGLE_SEARCH_CONSOLE_API_KEY`.
  - Endpoints used: `searchAnalytics/query` (for KPIs/queries/pages/trend, multiple calls with different `dimensions`), `sites/{site}/sitemaps` (for coverage).
  - Caches responses in-memory per cold start (5 min TTL) to keep GSC quota healthy.
- Frontend:
  - `src/pages/admin/AdminGate.tsx` — password form, stores token.
  - `src/pages/admin/SeoDashboard.tsx` — fetches via `supabase.functions.invoke('gsc-analytics', ...)` with the admin header.
  - `src/components/admin/` — `KpiCard`, `TrendChart`, `QueryTable`, `OpportunityTable`, `CoverageCard`.
  - Routes added in `src/App.tsx`. Both routes get `noindex` meta + `Disallow: /admin` in `robots.txt`.
- Reuses existing shadcn/Tailwind tokens. No new design system work.

### Out of scope (for v1)
- No GA4, no Semrush live pulls (those stay in chat tools for now).
- No multi-user auth, no per-user roles.
- No write actions to GSC from the dashboard (read-only).

---

## Part 2 — 90-Day SEO Growth Plan

### Target audience (locked in)
Pastors, ministry leaders, and creator-ministers with audiences of 500+ and growing. Buying triggers: launching/relaunching a site, outgrowing Squarespace/Wix, needing donations + sermons + events in one place, wanting a modern look without hiring an agency.

### Strategy in one line
Own the long-tail "modern church/ministry website" space by publishing high-intent comparison + how-to content, then convert with the existing portfolio and packages pages.

### Workstream A — Technical foundation (Week 1, one-time)
- Verify GSC sitemap is processed (already submitted).
- Audit existing pages: confirm one H1 per page, unique meta titles/descriptions <60/<160 chars, alt text on all portfolio images, internal links from blog → packages.
- Add `Organization` + `Service` JSON-LD on home; `FAQPage` JSON-LD on FAQ section.
- Re-enable `/blog` (remove `noindex`, add back to sitemap, nav, llms.txt, robots).
- Open Graph image refresh for social shares.

### Workstream B — Keyword targets (validated via Semrush, Weeks 1–2)
Cluster around four pillars. Each post = one primary keyword + 3–5 supporting questions.

1. **Cost & comparison** (commercial intent, fastest revenue)
   - "church website cost", "church website builder vs custom", "best church website platforms 2026", "Squarespace vs custom church site"
2. **Launch & relaunch how-to** (informational, builds authority)
   - "how to launch a church website", "church website checklist", "what every ministry website needs"
3. **Creator-minister specific** (low-competition niche we can own)
   - "podcast ministry website", "creator pastor website", "online ministry platform", "Substack alternative for ministries"
4. **Conversion features** (bottom funnel)
   - "online giving for small churches", "sermon hosting on website", "church event registration tools"

I'll validate volume + KDI for each with `keyword_research` / `keyword_compare` before locking the calendar in week 1.

### Workstream C — Content publishing calendar
- **Cadence**: 1 high-quality post per week, 1,500–2,500 words, original screenshots, internal link to `/portfolio` and `/packages`.
- **Month 1 (Weeks 1–4)**: Cost & comparison pillar. Launch the two existing drafts (`church-website-cost-2026`, `church-website-checklist`) after rewrite + expansion, then 2 new comparison posts.
- **Month 2 (Weeks 5–8)**: Creator-minister pillar — least competition, highest brand fit. 4 posts.
- **Month 3 (Weeks 9–12)**: Launch how-to + features pillar. 4 posts. Add 1 case-study post per existing portfolio client.

### Workstream D — Off-page (parallel, Weeks 2–12)
- List on church-tech directories (ChurchTechToday, ChurchMag, Capterra under "Church Management").
- Guest posts: pitch 2 ministry-creator newsletters/podcasts per month with a "modern ministry website" angle.
- Add a "Built by" backlink in footer of each portfolio client site (request once, recurring authority).
- Encourage Google reviews from portfolio clients.

### Workstream E — Measurement (using the new dashboard)
- Weekly: check Opportunity Queries; if any post enters position 5–20, refresh that post within 7 days (expand, add FAQ, add internal links).
- Bi-weekly: review top pages — if a non-blog page (e.g., /packages) is gaining queries, add an FAQ block targeting those queries.
- Monthly: rerun `seo_trend` + `competitive_analysis` in chat to spot new gaps.

### 90-day targets (realistic for a new domain)
- 12 indexed blog posts.
- 1,000+ monthly impressions in GSC by day 60, 5,000+ by day 90.
- 3+ posts ranking in top 20 for their primary keyword by day 90.
- First non-brand organic conversions (contact form / package inquiry) by month 3.

---

## Technical reference

```text
src/
  pages/admin/
    AdminGate.tsx          # password form
    SeoDashboard.tsx       # main dashboard
  components/admin/
    KpiCard.tsx
    TrendChart.tsx
    QueryTable.tsx
    OpportunityTable.tsx
    CoverageCard.tsx
  lib/admin-auth.ts        # localStorage token helper

supabase/functions/gsc-analytics/index.ts
  - validates x-admin-password header
  - proxies to GSC via connector gateway
  - in-memory 5min cache

public/robots.txt          # add: Disallow: /admin
secrets:
  ADMIN_PASSWORD           # new, requested via add_secret
  LOVABLE_API_KEY          # already present
  GOOGLE_SEARCH_CONSOLE_API_KEY  # already present (connector linked)
```

After approval I'll add the `ADMIN_PASSWORD` secret first, then build the edge function, then the UI, then unhide the blog and start the Week 1 keyword validation.
