# Revised HLPR Ministries Flyer

Generate a print-ready, single-page PDF (US Letter, 8.5×11") at `/mnt/documents/hlpr-ministries-flyer-v2.pdf` that bakes in the high-impact feedback from the previous review.

## What changes vs. v1

**Hero / headline**
- New headline: **"Your Ministry Website. Live In 14 Days."**
- Subhead: *"Free homepage preview in 72 hours. No payment until you approve."*
- Add a **small QR code in the hero's top-right corner** so the CTA is visible at a glance (large QR still anchors the bottom).
- Keep the "hlpr MINISTRIES" wordmark but drop the thin flanking lines.

**Founding Partner ribbon**
- Thin navy ribbon under the hero: *"Founding Partner Program — 5 spots remaining · Founding-rate pricing locked in for life."*

**Body sections (keep 3-column structure, refine copy)**
1. Custom-Built For Your Ministry (unchanged bullets)
2. Built To Scale As You Grow — **swap the generic "HLPR Inbox" mockup** for a sermon-archive / giving-flow screenshot pulled from the live site portfolio section
3. Built For Where Ministry Is Going (unchanged)

**"Why HLPR Works" comparison**
- Reorder THE HLPR WAY bullets so **"Live in 14 days, fully managed forever"** is #1 (directly contrasts agencies' "3–6 month timelines" next to it).
- Add a 4th HLPR bullet: *"100% money-back guarantee"*.

**Bottom CTA band (biggest rework)**
- Replace the weak "Built for ministries of every size / Designed to engage / Support from a team" trio with the three real conversion levers:
  - ✓ Free preview in 72 hours
  - ✓ No payment until you approve
  - ✓ 100% money-back guarantee
- Tighten QR caption to: **"Scan or visit — see your free homepage preview. No commitment."**
- Reduce decorative leaf opacity to ~40% so they don't compete with the QR.

## Approach

Build with the existing `canvas-design` skill workflow (HTML → PDF via headless renderer) so the layout matches HLPR's brand:
- Palette: brand navy (`#0F1B3D`), HLPR blue (`#3B6FA0`), off-white (`#FAFAFA`), check-green accent only on guarantee bullets
- Type pair: bold condensed sans for headlines (Archivo Black or similar), clean grotesk for body (Inter/Work Sans)
- Real QR code generated pointing to `https://ministries.hlpr.io` with UTM `?utm_source=flyer&utm_medium=print&utm_campaign=founding`
- Pull two real screenshots from the live preview (`/` hero + a portfolio site) via `browser--screenshot` so mockups look authentic, not stock

## QA before delivery

Render PDF → convert to PNG → visually inspect for:
- No overlapping text, all elements inside margins
- QR code scannable (test resolution ≥ 300dpi)
- Headlines readable at thumbnail size (flyer test)
- Both screenshots crisp, not pixelated

Iterate until clean, then deliver as `<presentation-artifact>`.

## One thing worth confirming

**Where will this flyer live?** Print handout (pastors' conference, church mailers) vs. digital PDF (email, DM, download) changes density and QR size. Defaulting to **print-first** (large QR, high-contrast, 300dpi) since that's the harder constraint — digital still works fine from a print-ready file. Let me know if it's digital-only and I'll lean denser with more body copy.
