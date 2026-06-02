# Flyer v3 + v4 — Two Variants

Keep US Letter (8.5 × 11"), full page. Deliver two PDFs.

## v3 — "Single Hero Composite" (your first ask)

One large product shot dominates the upper body of the flyer, mirroring the ChatGPT reference: desktop browser + iPhone floating over it, on a navy gradient.

- **Build the composite:** screenshot the live `ministries.hlpr.io` desktop hero (1440px) + a mobile viewport (390px), composite in Python/Pillow with browser chrome + phone frame on a navy gradient
- **Placement:** directly under Founding Partner ribbon, ~6.5" wide
- **Below it:** the 3 value-prop columns become text-only (no SVG mockups), tight, single page
- **Caption under composite:** *"What your ministry's site could look like in 14 days."*
- Hero QR + bottom QR retained from v2
- File: `/mnt/documents/hlpr-ministries-flyer-v3.pdf`

## v4 — "Multi-Visual Showcase" (the 3 new screenshots)

Same skeleton as v3, but swap the single composite for a **3-up product gallery** using the screenshots the user just uploaded:

1. **Desktop "Helping people find and follow Jesus Christ"** hero (Screenshot 11.08.24)
2. **"Your HLPR Inbox" + stats panel** (Screenshot 11.08.29)
3. **Stats trio with trend chart** (Screenshot 11.08.38)

- Use the uploaded images directly (already polished, already on-brand) — no compositing needed
- Arrange as a horizontal 3-up row with subtle drop shadows on a navy gradient band
- Caption under row: *"A real product. Real ministries. Live in 14 days."*
- Below row: same text-only 3 value-prop columns as v3
- Hero QR + bottom QR retained
- File: `/mnt/documents/hlpr-ministries-flyer-v4.pdf`

## Shared across both

- 8.5 × 11" Letter, print-ready 300dpi
- Headline: "Your Ministry Website. Live In 14 Days."
- Founding Partner ribbon, risk-reversal CTA band, money-back guarantee bullet
- Tim Godson, Founder footer
- QR codes with UTM `?utm_source=flyer&utm_medium=print&utm_campaign=founding`

## QA (both files)

Render → convert to JPG → inspect each for: no overflow, no overlapping text, QR scannable, screenshots crisp at print resolution, both fit on one page. Iterate until clean.

## Technical

- HTML template → headless Chromium → PDF (same workflow as v2)
- Pillow for v3 composite, direct `<img>` embed for v4 uploaded screenshots
- `qrcode` Python lib for QR generation
- Copy uploads from `/mnt/user-uploads/` into `/tmp/` for the renderer
