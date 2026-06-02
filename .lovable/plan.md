# Add Microsoft Clarity + Cookie Consent

Goal: get heatmaps, session recordings, scroll/rage-click data on the landing page so we can diagnose the 96% bounce rate and iterate on CRO — without breaking GDPR if EU traffic ever shows up.

## What you'll need to do (one step)

1. Create a free Microsoft Clarity project at clarity.microsoft.com → add `ministries.hlpr.io` → copy the **Project ID** (looks like `abc123xyz`).
2. Paste it when prompted — I'll store it as `VITE_CLARITY_PROJECT_ID`.

That's it. No billing, unlimited sessions, no cap.

## What I'll build

**1. Consent banner** (`src/components/ConsentBanner.tsx`)
- Slim bottom-right card: "We use cookies for analytics to improve this site. [Accept] [Decline]"
- Stores choice in `localStorage` (`hlpr_consent` = `accepted` | `declined`)
- Hidden once a choice is made; never re-prompts
- Styled with existing design tokens (matches site)

**2. Clarity loader** (`src/lib/clarity.ts` + hook in `App.tsx`)
- Only injects the Clarity script after consent === `accepted`
- Reads project ID from `import.meta.env.VITE_CLARITY_PROJECT_ID`
- Listens for consent changes so accepting immediately starts tracking (no reload needed)
- No-ops in dev to avoid polluting recordings with your own sessions

**3. Privacy page update** (`src/pages/Privacy.tsx`)
- Add a short "Analytics & cookies" section naming Microsoft Clarity + Lovable Analytics, what they collect (anonymized session behavior, no PII), and how to opt out (clear cookies / decline banner)

**4. Footer link**
- Small "Cookie preferences" link in the footer that re-opens the banner so users can change their mind

## What you'll see in Clarity (within ~2 hours of accepting on the live site)

- **Heatmaps**: click, scroll, area-of-attention overlays per page
- **Session recordings**: full replays with mouse/touch movement + scroll depth
- **Insights tab**: auto-flagged rage clicks, dead clicks, excessive scrolling, quick-backs (the exact signals to explain a 96% bounce)
- **Smart events**: filter recordings by source (so you can isolate the Facebook traffic that's bouncing)

## CRO hypotheses we'll be able to test immediately

Your data already shows: 74% mobile, 96% bounce, 6s avg duration, 33 visits from facebook.com. Clarity will tell us within a few days whether bouncers are:
- Not scrolling past the hero (hero doesn't match ad creative)
- Scrolling fast then leaving (content not what they expected)
- Rage-clicking a non-clickable element (UX bug)
- Hitting mobile layout issues (74% mobile audience)

## Technical notes (skip if not interested)

- Clarity script tag is the standard `https://www.clarity.ms/tag/{id}` snippet, injected via `document.createElement` not in `index.html` (so consent gating actually works — putting it in `index.html` would fire before React mounts).
- No edge function needed — Clarity is fully client-side and the project ID is a publishable identifier (safe in the bundle).
- Total bundle impact: ~0 KB (script loaded async from Clarity's CDN, only after consent).
- No conflict with the existing Lovable Analytics (Plausible-style, server-side).

## Files touched

- new: `src/components/ConsentBanner.tsx`, `src/lib/clarity.ts`, `src/lib/consent.ts`
- edited: `src/App.tsx` (mount banner + clarity loader), `src/components/landing/Footer.tsx` (cookie prefs link), `src/pages/Privacy.tsx` (analytics section), `.env.example` (document the var)
- secret: `VITE_CLARITY_PROJECT_ID` (you'll paste it after approving this plan)

Approve and I'll build it, then ask you for the Clarity ID.