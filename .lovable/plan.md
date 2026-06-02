# Hardcode Clarity project ID

Tiny change to finish what we started.

## What changes

**`src/lib/clarity.ts`** — replace the `import.meta.env.VITE_CLARITY_PROJECT_ID` lookup with the literal ID `"x0id004fi2"`. Drop the "warn if not set" branch since it can't happen anymore.

**`.env.example`** — remove the `VITE_CLARITY_PROJECT_ID` line we added (no longer needed).

That's it. Consent banner, gating, footer link, and privacy copy are all already in place from the previous build. Once you publish, accept the cookie banner on `ministries.hlpr.io`, and Clarity will start collecting data within ~2 hours.

## Why hardcode instead of a secret

The Clarity tag ID is a public identifier — it's visible in the `<script src>` URL of every page that loads Clarity. Treating it as a secret adds env-var plumbing for zero security benefit. Hardcoding is the standard pattern for analytics tag IDs (same as Google Analytics measurement IDs, Plausible domains, etc.).