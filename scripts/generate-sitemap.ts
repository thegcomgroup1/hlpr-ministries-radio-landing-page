// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
import { writeFileSync, readdirSync, readFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://ministries.hlpr.io";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

// Discover blog posts from src/content/posts/*.tsx (mirrors src/lib/posts.ts loader).
const postsDir = resolve("src/content/posts");
const postEntries: SitemapEntry[] = readdirSync(postsDir)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => {
    const src = readFileSync(resolve(postsDir, f), "utf8");
    const slug = src.match(/slug:\s*["']([^"']+)["']/)?.[1];
    const date = src.match(/date:\s*["']([^"']+)["']/)?.[1];
    if (!slug) return null;
    return {
      path: `/blog/${slug}`,
      lastmod: date,
      changefreq: "monthly" as const,
      priority: "0.6",
    };
  })
  .filter((e): e is SitemapEntry => e !== null);

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  ...postEntries,
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
