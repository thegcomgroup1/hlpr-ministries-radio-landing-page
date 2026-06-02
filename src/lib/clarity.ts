// Microsoft Clarity loader. Only injects the script after consent is granted.
// Skips dev so local sessions don't pollute the dashboard.

let injected = false;

export function loadClarity() {
  if (injected) return;
  if (typeof window === "undefined") return;
  if (import.meta.env.DEV) return;

  const projectId = import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined;
  if (!projectId) {
    console.warn("[clarity] VITE_CLARITY_PROJECT_ID not set — skipping.");
    return;
  }

  injected = true;

  // Standard Clarity snippet, async.
  (function (c: any, l: Document, a: string, r: string, i: string) {
    c[a] =
      c[a] ||
      function (...args: unknown[]) {
        (c[a].q = c[a].q || []).push(args);
      };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window as any, document, "clarity", "script", projectId);
}
