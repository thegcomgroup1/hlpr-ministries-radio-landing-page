import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { StickyNav } from "@/components/landing/StickyNav";
import { Footer } from "@/components/landing/Footer";
import { posts } from "@/lib/posts";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Blog = () => {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "HLPR Ministries Blog",
    url: "https://ministries.hlpr.io/blog",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `https://ministries.hlpr.io/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <Helmet>
        <title>Blog — Church & Ministry Website Guides | HLPR Ministries</title>
        <meta
          name="description"
          content="Practical guides on church website design, ministry SEO, online giving, podcast sites, and growing your ministry online."
        />
        <link rel="canonical" href="https://ministries.hlpr.io/blog" />
        <meta property="og:title" content="HLPR Ministries Blog" />
        <meta
          property="og:description"
          content="Practical guides on church website design, ministry SEO, online giving, and more."
        />
        <meta property="og:url" content="https://ministries.hlpr.io/blog" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(blogJsonLd)}</script>
      </Helmet>
      <StickyNav />
      <main id="main">
        <section className="bg-gradient-cream pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-brand-blue">
              The HLPR Journal
            </p>
            <h1 className="mt-3 font-serif font-bold tracking-tight text-brand-navy text-balance text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05]">
              Honest guides for ministries building online.
            </h1>
            <p className="mt-5 text-lg text-brand-navy-soft leading-relaxed max-w-2xl">
              Costs, comparisons, checklists, and SEO playbooks — written for
              pastors, ministry leaders, and church admins (no agency jargon).
            </p>
          </div>
        </section>

        <section className="bg-background py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
            {posts.length === 0 ? (
              <p className="text-brand-navy-soft">New articles coming soon.</p>
            ) : (
              <ul className="grid gap-6 sm:gap-8">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to={`/blog/${p.slug}`}
                      className="block group rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-brand-blue/40 hover:shadow-soft transition-all"
                    >
                      <p className="text-xs uppercase tracking-[0.18em] font-semibold text-brand-blue">
                        {p.category}
                      </p>
                      <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy group-hover:text-brand-blue-deep transition-colors">
                        {p.title}
                      </h2>
                      <p className="mt-3 text-brand-navy-soft leading-relaxed">
                        {p.description}
                      </p>
                      <p className="mt-4 text-sm text-brand-navy-soft">
                        {formatDate(p.date)} · {p.readMinutes} min read
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
