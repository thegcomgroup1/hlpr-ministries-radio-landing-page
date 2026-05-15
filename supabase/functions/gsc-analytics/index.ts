// Edge function: gsc-analytics
// Proxies Google Search Console queries via the Lovable connector gateway.
// Gated by a single shared password (ADMIN_PASSWORD).

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-password",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE_URL = "https://ministries.hlpr.io/";
const ENC_SITE = encodeURIComponent(SITE_URL);

// in-memory cache (per cold start)
type CacheEntry = { ts: number; data: unknown };
const cache = new Map<string, CacheEntry>();
const TTL_MS = 5 * 60 * 1000;

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function gscFetch(path: string, init: RequestInit = {}) {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const gscKey = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
  if (!lovableKey) throw new Error("LOVABLE_API_KEY not configured");
  if (!gscKey) throw new Error("GOOGLE_SEARCH_CONSOLE_API_KEY not configured");

  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gscKey,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`GSC ${res.status}: ${text.slice(0, 500)}`);
  }
  return data;
}

function ymd(d: Date) {
  return d.toISOString().slice(0, 10);
}

async function searchAnalytics(body: Record<string, unknown>) {
  return gscFetch(
    `/webmasters/v3/sites/${ENC_SITE}/searchAnalytics/query`,
    { method: "POST", body: JSON.stringify(body) },
  );
}

async function getAll() {
  const cached = cache.get("all");
  if (cached && Date.now() - cached.ts < TTL_MS) return cached.data;

  const today = new Date();
  const end = new Date(today);
  end.setUTCDate(end.getUTCDate() - 2); // GSC lag
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 27);
  const prevEnd = new Date(start);
  prevEnd.setUTCDate(prevEnd.getUTCDate() - 1);
  const prevStart = new Date(prevEnd);
  prevStart.setUTCDate(prevStart.getUTCDate() - 27);
  const trendStart = new Date(end);
  trendStart.setUTCDate(trendStart.getUTCDate() - 89);

  const [current, previous, trend, queries, pages, opportunities, sitemaps] =
    await Promise.all([
      searchAnalytics({ startDate: ymd(start), endDate: ymd(end), dimensions: [] }),
      searchAnalytics({ startDate: ymd(prevStart), endDate: ymd(prevEnd), dimensions: [] }),
      searchAnalytics({
        startDate: ymd(trendStart),
        endDate: ymd(end),
        dimensions: ["date"],
        rowLimit: 100,
      }),
      searchAnalytics({
        startDate: ymd(start),
        endDate: ymd(end),
        dimensions: ["query"],
        rowLimit: 25,
      }),
      searchAnalytics({
        startDate: ymd(start),
        endDate: ymd(end),
        dimensions: ["page"],
        rowLimit: 25,
      }),
      searchAnalytics({
        startDate: ymd(start),
        endDate: ymd(end),
        dimensions: ["query", "page"],
        rowLimit: 200,
      }),
      gscFetch(`/webmasters/v3/sites/${ENC_SITE}/sitemaps`),
    ]);

  const data = {
    range: { start: ymd(start), end: ymd(end) },
    previousRange: { start: ymd(prevStart), end: ymd(prevEnd) },
    current,
    previous,
    trend,
    queries,
    pages,
    opportunities,
    sitemaps,
  };
  cache.set("all", { ts: Date.now(), data });
  return data;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const adminPass = Deno.env.get("ADMIN_PASSWORD");
    if (!adminPass) return jsonResponse({ error: "ADMIN_PASSWORD not configured" }, 500);

    const provided = req.headers.get("x-admin-password");
    if (!provided || provided !== adminPass) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    const data = await getAll();
    return jsonResponse(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("gsc-analytics error:", message);
    return jsonResponse({ error: message }, 500);
  }
});
