#!/usr/bin/env python3
"""Build the single-page Care Plans PDF for hlpr Ministries."""
import asyncio, os, sys
from pathlib import Path

HTML = r"""<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page { size: 8.5in 11in; margin: 0; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html, body { margin: 0; padding: 0; width: 8.5in; height: 11in; font-family: 'Inter', sans-serif; color: #1B2A4A; }
  body { display: flex; flex-direction: column; }
  .header { background: #1B2A4A; color: #fff; padding: 0.45in 0.55in 0.4in; }
  .header h1 { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 32pt; margin: 0; letter-spacing: -0.5px; }
  .header p { margin: 0.1in 0 0; font-size: 10.5pt; line-height: 1.4; color: #DCE6F4; max-width: 6.6in; }
  .body { flex: 1; padding: 0.35in 0.45in 0.2in; display: flex; flex-direction: column; }
  .cols { display: grid; grid-template-columns: 1fr 1.08fr 1fr; gap: 0.18in; align-items: stretch; }
  .card { background: #EEF3FA; border: 1px solid #DCE6F4; border-radius: 10px; padding: 0.28in 0.24in; display: flex; flex-direction: column; position: relative; }
  .card.elevated { background: #fff; border: 2px solid #2E5FA3; box-shadow: 0 8px 18px rgba(27,42,74,0.08); transform: translateY(-6px); }
  .badge { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #2E5FA3; color: #fff; font-size: 7.5pt; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; }
  .tier-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 17pt; margin: 0; }
  .tier-label { font-size: 8.5pt; color: #5A6A85; margin: 2px 0 8px; font-style: italic; }
  .price { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 22pt; color: #1B2A4A; line-height: 1; }
  .price .per { font-family: 'Inter', sans-serif; font-size: 9pt; font-weight: 500; color: #5A6A85; }
  .plus { font-size: 8.5pt; font-weight: 600; color: #2E5FA3; margin: 10px 0 4px; }
  ul { list-style: none; padding: 0; margin: 8px 0 0; font-size: 9pt; line-height: 1.45; }
  ul li { display: flex; gap: 6px; padding: 3px 0; align-items: flex-start; }
  ul li svg.check { flex: 0 0 12px; width: 12px; height: 12px; margin-top: 3px; display: block; }
  .tagline { text-align: center; font-style: italic; color: #1B2A4A; font-size: 10pt; margin: 0.25in 0 0.15in; margin-top: auto; padding-top: 0.25in; }
  .trust { background: #EEF3FA; border-top: 1px solid #DCE6F4; text-align: center; padding: 0.22in 0.6in; font-size: 10.5pt; color: #1B2A4A; line-height: 1.45; }
  .trust strong { font-weight: 700; }
  .footer { background: #1B2A4A; color: #DCE6F4; text-align: center; padding: 0.22in 0.5in; font-size: 9pt; }
  .footer strong { color: #fff; font-family: 'Playfair Display', serif; font-weight: 700; letter-spacing: 0.3px; }
</style></head>
<body>
  <div class="header">
    <h1>Website Care Plans</h1>
    <p>Every hlpr Ministries website includes a monthly care plan — hosting, security, and a team that keeps it current.</p>
  </div>
  <div class="body">
    <div class="cols">
      <div class="card">
        <h2 class="tier-name">Foundation</h2>
        <div class="tier-label">The essentials.</div>
        <div class="price">$49.99<span class="per"> /mo</span></div>
        <ul>
          <li><svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.5 4.5l-7 7L2.5 7.5" fill="none" stroke="#2E5FA3" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Secure hosting &amp; SSL</li>
          <li><svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.5 4.5l-7 7L2.5 7.5" fill="none" stroke="#2E5FA3" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Automatic backups</li>
          <li><svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.5 4.5l-7 7L2.5 7.5" fill="none" stroke="#2E5FA3" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Uptime monitoring</li>
          <li><svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.5 4.5l-7 7L2.5 7.5" fill="none" stroke="#2E5FA3" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Unlimited content updates within 24 hours (text, email, or Slack)</li>
        </ul>
      </div>
      <div class="card elevated">
        <span class="badge">Recommended</span>
        <h2 class="tier-name">Growth</h2>
        <div class="tier-label">For churches building their presence.</div>
        <div class="price">$249.99<span class="per"> /mo</span></div>
        <div class="plus">Everything in Foundation, plus:</div>
        <ul>
          <li><svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.5 4.5l-7 7L2.5 7.5" fill="none" stroke="#2E5FA3" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>8 branded social media graphics per month (2/week)</li>
          <li><svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.5 4.5l-7 7L2.5 7.5" fill="none" stroke="#2E5FA3" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Profile setup &amp; upkeep</li>
          <li><svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.5 4.5l-7 7L2.5 7.5" fill="none" stroke="#2E5FA3" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Monthly content guidance</li>
          <li><svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.5 4.5l-7 7L2.5 7.5" fill="none" stroke="#2E5FA3" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Priority support</li>
        </ul>
      </div>
      <div class="card">
        <h2 class="tier-name">Established</h2>
        <div class="tier-label">Maximum reach.</div>
        <div class="price">$449.99<span class="per"> /mo</span></div>
        <div class="plus">Everything in Growth, plus:</div>
        <ul>
          <li><svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.5 4.5l-7 7L2.5 7.5" fill="none" stroke="#2E5FA3" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Sermon publishing to YouTube each week</li>
          <li><svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.5 4.5l-7 7L2.5 7.5" fill="none" stroke="#2E5FA3" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Channel optimization &amp; thumbnails</li>
          <li><svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.5 4.5l-7 7L2.5 7.5" fill="none" stroke="#2E5FA3" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Content strategy for reach</li>
          <li><svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.5 4.5l-7 7L2.5 7.5" fill="none" stroke="#2E5FA3" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Dedicated team member</li>
        </ul>
      </div>
    </div>
    <div class="tagline">Plans are month to month. Upgrade or downgrade any time as your ministry grows.</div>
  </div>
  <div class="trust">
    <strong>Every plan includes a real human team.</strong> Reach us by text, email, or Slack — updates live within 24 hours.
  </div>
  <div class="footer">
    <strong>hlpr Ministries</strong> &middot; Named for the Holy Spirit — our Helper. &middot; tim@hlpr.io
  </div>
</body></html>"""

async def main():
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("public/hlpr-care-plans.pdf")
    out.parent.mkdir(parents=True, exist_ok=True)
    from playwright.async_api import async_playwright
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_content(HTML, wait_until="networkidle")
        await page.pdf(path=str(out), width="8.5in", height="11in", print_background=True, margin={"top":"0","right":"0","bottom":"0","left":"0"}, prefer_css_page_size=True)
        await browser.close()
    print(f"wrote {out}")

if __name__ == "__main__":
    asyncio.run(main())
