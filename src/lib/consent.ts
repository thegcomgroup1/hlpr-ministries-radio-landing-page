// Lightweight cookie-consent store backed by localStorage + a custom event.
// Components subscribe via `subscribeConsent` to react immediately when the
// user accepts/declines or re-opens preferences.

export type ConsentState = "accepted" | "declined" | "unset";

const KEY = "hlpr_consent";
const EVENT = "hlpr:consent-change";

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return "unset";
  const v = window.localStorage.getItem(KEY);
  return v === "accepted" || v === "declined" ? v : "unset";
}

export function setConsent(value: Exclude<ConsentState, "unset">) {
  window.localStorage.setItem(KEY, value);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

export function resetConsent() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: "unset" }));
}

export function subscribeConsent(cb: (state: ConsentState) => void) {
  const handler = () => cb(getConsent());
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
