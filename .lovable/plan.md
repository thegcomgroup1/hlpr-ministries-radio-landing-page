## Care Plans PDF — final cosmetic pass

Two small edits to `scripts/build-care-plans-pdf.py`, then regenerate and visually QA.

### 1. Fill the whitespace with a trust strip

Insert a full-width band between the month-to-month tagline and the navy footer:

> **Every plan includes a real human team.** Reach us by text, email, or Slack — updates live within 24 hours.

Styling:
- Light blue-gray background (`#EEF3FA`) to bridge the card row and footer without competing with either
- Centered, ~10.5pt Inter, navy `#1B2A4A` text, bold lead phrase
- Padding ~`0.22in 0.5in`, full bleed left/right
- Sits directly above the existing navy footer band (footer still anchored at bottom)

This turns the empty void into the trust line boards actually weigh, without changing any pricing, deliverables, badge, or footer copy.

### 2. Clean checkmark rendering

The current bullets use a CSS-masked SVG check. In some renders the mask edges can read as a faint double-stroke. Switch to a single inline SVG check per `<li>` (same navy `#2E5FA3`, 2.4 stroke, round caps) so the glyph is identical across every card and rasterizes cleanly at 100% zoom. No layout change — same size, same spacing.

### 3. Regenerate + QA

- Run the existing build command to overwrite `public/hlpr-care-plans.pdf`
- Render with `pdftoppm -jpeg -r 150` and visually inspect:
  - Exactly one page (no spillover)
  - Footer still anchored at the bottom edge
  - Trust strip sits flush above footer, no gap
  - Checks render as single clean strokes on all three cards (Foundation's last two items + Growth's "Priority support" specifically)
- Copy final PDF to `/mnt/documents/hlpr-care-plans.pdf` and surface as artifact

### Out of scope

No price changes. No deliverable changes. No edits to `src/components/landing/CarePlans.tsx` or any other site code — this is PDF-only.

### Files touched

- `scripts/build-care-plans-pdf.py` (edit HTML template)
- `public/hlpr-care-plans.pdf` (regenerated)
