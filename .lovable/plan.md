# Pre-Ship SEO Sprint

Two parallel tracks: (B) close out Workstream A technical foundation so the site is fully crawl-ready, and (C) run Semrush validation to lock the Month 1 publishing calendar.

---

## Track B — Technical foundation

### B1. Re-enable `/blog`
- `src/pages/Blog.tsx`: change `<meta name="robots" content="noindex,nofollow" />` → `index,follow`.
- `src/pages/BlogPost.tsx`: same fix if a noindex is present (verify first).
- `public/robots.txt`: remove the three `Disallow: /blog` lines (Googlebot, Bingbot, `*` blocks). Keep `Disallow: /admin`.
- `public/llms.txt`: re-add blog section if it was stripped.

### B2. Sitemap — migrate to generator
Current `public/sitemap.xml` is hand-edited and missing `/blog` + the two posts. Posts come from `src/lib/posts.ts` (static array), so a generator script is the right call now and scales when posts move to a DB later.

- Create `scripts/generate-sitemap.ts` per the head-meta convention. Entries:
  - `/` (priority 1.0, weekly)
  - `/blog` (priority 0.7, weekly)
  - One entry per post in `src/lib/posts.ts` at `/blog/{slug}` with `lastmod` from `post.date` (priority 0.6, monthly)
  - `/privacy`, `/terms` (priority 0.3, yearly)
  - Omit `/admin`, `/admin/seo`, `*`
- Add `predev` and `prebuild` npm scripts: `bunx tsx scripts/generate-sitemap.ts`.
- Delete the hand-edited `public/sitemap.xml` (regenerated on next dev/build).

### B3. JSON-LD on home
Add to `src/pages/Index.tsx` Helmet alongside the existing FAQPage schema:

- **Organization**: name "HLPR Ministries", url, logo, sameAs (any social profiles — ask if unknown, otherwise skip sameAs).
- **Service**: serviceType "Custom church website design", provider → Organization, areaServed "US" (or worldwide if remote), audience "pastors, ministry leaders, creator-ministers".

### B4. Open Graph + Twitter card meta
Add to `src/pages/Index.tsx` Helmet:
- `og:type=website`, `og:image` (1200×630), `og:image:alt`
- `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`

OG image: generate one fresh via imagegen (premium tier — has text). Headline like "Custom websites for ministries · live in 14 days". Save to `src/assets/og-home.jpg`, reference at the deployed URL.

Also propagate to `Blog.tsx` and `BlogPost.tsx` (per-post og:title/og:description/og:image/og:url + Article JSON-LD on BlogPost — verify if not already there).

### B5. Quick page audit
Spot-check before shipping:
- One `<h1>` per page (Index, Blog, BlogPost, Privacy, Terms)
- Meta titles <60 chars, descriptions <160 chars
- Alt text on portfolio + hero images
- Internal links from each blog post → `/portfolio` and `/packages` anchors

---

## Track C — Week 1 keyword validation (Semrush)

Goal: validate the four pillars from `.lovable/plan.md` with real volume + difficulty data, then lock the Month 1 (Cost & Comparison) calendar.

### C1. Pillar validation — `keyword_compare` runs
Three batched calls covering the four pillars' primary terms:

1. **Cost & comparison**: `church website cost`, `church website builder vs custom`, `best church website platforms 2026`, `Squarespace vs custom church site`, `Wix vs Squarespace church website`, `cheap church website design`
2. **Creator-minister**: `podcast ministry website`, `creator pastor website`, `online ministry platform`, `Substack alternative for ministries`, `digital ministry website`
3. **Launch + features**: `how to launch a church website`, `church website checklist`, `online giving for small churches`, `sermon hosting on website`, `church event registration tools`

Score each on volume + KDI bands; flag winners (volume 100–10k, KDI <40 ideal for new domain).

### C2. Deep-dive top 4 winners — `keyword_research`
For the four highest-scoring terms, pull related + question variations to seed H2s/FAQs in each post.

### C3. SERP reality check — `serp_analysis`
For the two highest-priority Month 1 targets, see who currently ranks. If top 10 is dominated by big sites (Capterra, Subsplash, Tithely), niche down to a longer variant.

### C4. Competitor snapshot — `competitive_analysis`
One call on `ministries.hlpr.io` (or `subsplash.com` as a stand-in if our domain has no data yet) to surface auto-discovered competitors and keyword gaps. Calibrate Month 2/3 picks.

### C5. Lock Month 1 calendar
Output: 4 finalized post briefs (week 1–4), each with primary keyword, supporting questions, target word count, internal-link plan, target page (`/packages` or `/portfolio`). Append to `.lovable/plan.md`.

---

## Order of operations

1. **B1 + B2 together** — unblock blog + fix sitemap (one commit).
2. **B3 + B4** — JSON-LD + OG meta + image generation.
3. **B5** — audit pass; fix anything flagged.
4. **C1 → C2 → C3 → C4** — Semrush runs (parallel where possible).
5. **C5** — write the locked calendar back to `.lovable/plan.md`.
6. Re-submit sitemap in Search Console after deploy.

---

## Out of scope

- Rewriting the two existing post drafts (separate task, after calendar is locked).
- Off-page workstream (directories, guest posts) — Workstream D, runs in parallel later.
- GA4 integration into the dashboard.

---

# Week 1 keyword validation — RESULTS (Semrush US, May 2026)

## Pillar scoring

| Term | Volume | KDI | Verdict |
|---|---|---|---|
| **church seo** | 1,300/mo | very easy | TOP win — content pillar |
| **seo for churches** | 1,000/mo | very easy | bundle with above |
| **church website builder** | 1,300/mo | 43 (possible) | stretch, SERP is product-heavy |
| **best church website builder** | 720/mo | medium | comparison-post angle works |
| **church website design** | 720/mo | low | service-page term (use on /packages) |
| **online giving for small churches** | 70/mo | 42 | commercial intent, $9.15 CPC |
| **how to build a church website** | 170/mo | medium | how-to play |
| **local seo for churches** | 210/mo | low | local-pack target |
| church website cost | 50/mo | very easy | already covered |
| church website checklist | 50/mo | very easy | already covered |
| church website seo | 170/mo | 12 | SERP open (no big SaaS in top 5) |
| church website features | 20/mo | very easy | bundle internally |

Creator-minister pillar (`podcast ministry website`, `creator pastor website`, `digital ministry website`) all returned **no data** — too niche/emerging. Hold this pillar until Month 2 and target adjacent terms like "online ministry platform" via comparison angles instead.

## Competitor landscape (Subsplash neighborhood)
Big players to outflank with longer, more specific posts: tithe.ly, pushpay, churchtrac, churchcenter.com, snappages.site, reachrightstudios, churchspring.com, thechurchco.com.

---

# Month 1 publishing calendar — LOCKED

| Wk | Slug | Primary KW (vol/KDI) | Secondary KWs | Words | Internal link |
|---|---|---|---|---|---|
| 1 | `best-church-website-builders-2026` | best church website builder (720, medium) | church website builder, squarespace church website, wix church website, nucleus, tithely | 2,400 | → /packages (custom alternative) |
| 2 | `church-seo-guide-2026` | church seo (1,300, very easy) | seo for churches, church website seo, local seo for churches, church seo keywords, church seo audit | 2,800 | → /portfolio (proof) + /packages |
| 3 | `how-to-build-a-church-website` | how to build a church website (170, medium) | church website features, how to build a church website step by step, what is the best website builder for churches | 2,000 | → cost-2026 + checklist + /packages |
| 4 | `online-giving-for-small-churches` | online giving for small churches (70, 42) | how to set up online giving for small churches, givelify vs tithely, donation website | 1,800 | → /packages (Growth tier mentions giving setup) |

Each post must include:
- H1 = primary keyword variant
- 5–8 H2s pulled from the question-keyword lists above (FAQ schema)
- BreadcrumbList JSON-LD
- 2+ internal links to /packages or /portfolio
- 1 external link to authoritative source (state law for giving, Google docs for SEO)
- Custom OG image (or fall back to /og-home.jpg)

## Month 2/3 candidates (preview)
- `church-website-design-cost-breakdown` (church website design 720/low)
- `local-seo-for-churches` (210/low)
- `church-website-checklist-audit` — companion to existing checklist
- Outreach/comparison posts targeting `nucleus alternative`, `tithely alternative`, `churchspring alternative`
