// Blog post registry. Each post lives in src/content/posts/{slug}.tsx
// and default-exports a `Post` object. Vite's import.meta.glob auto-discovers them.
import type { ReactNode } from "react";

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  readMinutes: number;
  category: string;
  content: ReactNode;
}

const modules = import.meta.glob<{ default: Post }>("../content/posts/*.tsx", {
  eager: true,
});

export const posts: Post[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPost = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug);
