# Care Plans PDF + LP — Defensibility Edits

Two copy changes + a verification pass. No structural or pricing changes.

## 1. Replace popularity claims with a defensible recommendation

Both the PDF (`scripts/build-care-plans-pdf.py`) and the LP component (`src/components/landing/CarePlans.tsx`) currently make popularity claims on the Growth tier. Swap them for a professional recommendation — same visual elevation, no unsupportable stat.

- Badge: **"MOST POPULAR" → "RECOMMENDED"** (both PDF and LP)
- Growth subtitle: **"Most churches start here." → "For churches building their presence."** (both PDF and LP)
- Keep the visual elevation (raised card, border, badge styling) — that's design, not a claim.
- Also remove the `Star` icon's "most popular" connotation in the LP badge — keep the star as pure visual accent or drop it; either is fine, but the label is the contract.

## 2. Confirm + (if needed) restore the PDF footer

The current script already includes a navy footer band:

> **hlpr Ministries** · Named for the Holy Spirit — our Helper. · tim@hlpr.io

Verification step (build mode): regenerate the PDF, render every page to JPG at 150dpi, and visually confirm:

1. The footer band is present and fully visible on page 1.
2. The PDF is **exactly one page** — no spillover. If page 2 exists, tighten vertical rhythm (reduce card padding, header padding, or tagline margins) until it fits, then re-verify.
3. Footer text is legible and not clipped at the bottom edge.

## 3. Out of scope

- No price changes, no deliverable changes (8 graphics/mo stays as written).
- No changes to existing `Pricing.tsx`.
- No new sections, no nav changes.

## Technical notes

- Files touched: `scripts/build-care-plans-pdf.py`, `src/components/landing/CarePlans.tsx`, regenerated `public/hlpr-care-plans.pdf`.
- Regeneration: `python3 scripts/build-care-plans-pdf.py public/hlpr-care-plans.pdf`, then `pdftoppm -jpeg -r 150 public/hlpr-care-plans.pdf /tmp/care` and inspect `/tmp/care-*.jpg`.
- Also copy the final PDF to `/mnt/documents/hlpr-care-plans.pdf` and surface it as a `<presentation-artifact>` so you can download and forward it as-is.
