import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { StickyNav } from "./StickyNav";
import { Footer } from "./Footer";
import { CtaButton } from "./CtaButton";
import { BUSINESS } from "@/lib/content";

interface PostLayoutProps {
  title: string;
  description: string;
  date: string;
  readMinutes: number;
  category: string;
  children: ReactNode;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const PostLayout = ({
  title,
  description,
  date,
  readMinutes,
  category,
  children,
}: PostLayoutProps) => {
  return (
    <>
      <StickyNav />
      <main id="main">
        <section className="bg-gradient-cream pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16">
          <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy-soft hover:text-brand-navy transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] font-semibold text-brand-blue">
              {category}
            </p>
            <h1 className="mt-3 font-serif font-bold tracking-tight text-brand-navy text-balance text-[clamp(2rem,4.5vw,3rem)] leading-[1.05]">
              {title}
            </h1>
            <p className="mt-5 text-lg text-brand-navy-soft leading-relaxed">
              {description}
            </p>
            <p className="mt-5 text-sm text-brand-navy-soft">
              {formatDate(date)} · {readMinutes} min read
            </p>
          </div>
        </section>

        <section className="bg-background py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12">
            <article
              className="
                text-brand-navy-soft leading-relaxed
                [&_h2]:font-serif [&_h2]:text-brand-navy [&_h2]:text-2xl sm:[&_h2]:text-3xl
                [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:mt-12 [&_h2]:mb-4
                [&_h3]:font-serif [&_h3]:text-brand-navy [&_h3]:text-xl
                [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3
                [&_p]:my-4 [&_p]:text-base
                [&_ul]:my-4 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2
                [&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2
                [&_li]:text-base
                [&_a]:text-brand-blue [&_a]:underline hover:[&_a]:text-brand-blue-deep
                [&_strong]:text-brand-navy [&_strong]:font-semibold
                [&_blockquote]:border-l-4 [&_blockquote]:border-brand-blue/40
                [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:my-6
                [&_blockquote]:text-brand-navy
              "
            >
              {children}
            </article>

            <div className="mt-16 rounded-2xl bg-brand-navy text-brand-cream p-8 sm:p-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to see what your ministry's site could look like?
              </h2>
              <p className="mt-3 text-brand-cream/90 leading-relaxed">
                We'll build a free homepage preview in 72 hours. No payment
                until you approve.
              </p>
              <div className="mt-6">
                <CtaButton href={BUSINESS.ctaUrl} label="Get my free preview" size="lg" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
