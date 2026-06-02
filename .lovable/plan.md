
# Flyer v5 — v2 layout + your ChatGPT visual

You're right on both counts: v2's layout was the strongest, and I kept regenerating my own composites instead of just using the image you uploaded. Fixing both.

## What I'll do

1. Take **v2 exactly as-is** — same 8.5×11" full-page layout, same headline, same Founding Partner ribbon, same 3 value-prop columns, same dual QR codes, same risk-reversal band, same Tim Godson footer.
2. **Swap the hero visual** for your uploaded image (`user-uploads://image.png`) — the desktop "Welcome Home" + iPhone composite on navy. Drop it in directly, no re-rendering, no Pillow compositing, no Playwright screenshots. Just embed the file you gave me.
3. Size it to fill the hero slot under the ribbon at print resolution, preserving aspect ratio with a subtle drop shadow on the existing cream/navy background.
4. Keep "& ministries alike" caption visible at top of image since it's part of your uploaded crop — or trim it if it reads awkwardly against the ribbon. I'll check in QA.

## Output

- `/mnt/documents/hlpr-ministries-flyer-v5.pdf` — single file, replaces v3/v4 as the recommended version
- Leave v2, v3, v4 in place so you can compare

## QA

Render to JPG, inspect: visual is crisp at 300dpi, nothing overflows, QRs scan, page is exactly one page. Iterate if anything's off.

## Technical

- Reuse the v2 HTML/CSS template unchanged
- Replace the hero `<img>` src with the uploaded file (copied from `/mnt/user-uploads/image.png` to `/tmp/`)
- Render via headless Chromium → PDF, same pipeline as v2
