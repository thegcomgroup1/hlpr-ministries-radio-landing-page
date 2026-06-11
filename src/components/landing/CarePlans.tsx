import { Check, Star, Download } from "lucide-react";
import { CtaButton } from "./CtaButton";
import { BUSINESS } from "@/lib/content";
import { cn } from "@/lib/utils";

type CarePlan = {
  name: string;
  label: string;
  price: string;
  cadence: string;
  plus: string | null;
  features: string[];
  mostPopular?: boolean;
};

const CARE_PLANS: CarePlan[] = [
  {
    name: "Foundation",
    label: "The essentials.",
    price: "$49.99",
    cadence: "/mo",
    plus: null,
    features: [
      "Secure hosting & SSL",
      "Automatic backups",
      "Uptime monitoring",
      "Unlimited content updates within 24 hours (text, email, or Slack)",
    ],
  },
  {
    name: "Growth",
    label: "For churches building their presence.",
    price: "$249.99",
    cadence: "/mo",
    plus: "Everything in Foundation, plus:",
    features: [
      "8 branded social media graphics per month (2/week)",
      "Profile setup & upkeep",
      "Monthly content guidance",
      "Priority support",
    ],
    mostPopular: true,
  },
  {
    name: "Established",
    label: "Maximum reach.",
    price: "$449.99",
    cadence: "/mo",
    plus: "Everything in Growth, plus:",
    features: [
      "Sermon publishing to YouTube each week",
      "Channel optimization & thumbnails",
      "Content strategy for reach",
      "Dedicated team member",
    ],
  },
];

export const CarePlans = () => {
  return (
    <section id="care-plans" className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-brand-navy-soft">
            Simple, honest pricing
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy text-balance leading-tight">
            One build price. One simple care plan. No surprises.
          </h2>
          <p className="mt-5 text-lg text-brand-navy-soft leading-relaxed">
            Everything you pay is on this page. No hidden fees, no surprise invoices —
            just stewardship-priced work and a team that keeps your site current.
          </p>
        </div>

        {/* Build banner */}
        <div className="mt-10 rounded-2xl border border-brand-navy/10 bg-gradient-cream p-7 sm:p-8 shadow-soft flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-brand-navy-soft">
              One-time website build
            </p>
            <div className="mt-2 flex items-baseline gap-3 flex-wrap">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-brand-navy tracking-tight">
                $1,500
              </span>
              <span className="text-sm text-brand-navy-soft">
                · split payment available
              </span>
            </div>
            <p className="mt-2 text-brand-navy-soft text-sm sm:text-base max-w-xl">
              Custom design, mobile-first build, content migration, launch in 14 days.
              Free 72-hour homepage preview before you pay anything.
            </p>
          </div>
          <div className="md:flex-shrink-0">
            <CtaButton
              href={BUSINESS.ctaUrl}
              label={BUSINESS.ctaLabel}
              size="md"
            />
          </div>
        </div>

        {/* Care plans */}
        <div className="mt-10">
          <p className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-brand-navy-soft">
            Monthly website care
          </p>
          <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
            Hosting, security & a team that keeps it current.
          </h3>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {CARE_PLANS.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative rounded-2xl border bg-card p-7 sm:p-8 flex flex-col shadow-soft",
                tier.mostPopular &&
                  "lg:scale-[1.04] border-brand-navy shadow-elevated"
              )}
            >
              {tier.mostPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-brand-navy px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-navy-foreground">
                  <Star className="h-3 w-3 fill-brand-amber text-brand-amber" aria-hidden />
                  Recommended
                </div>
              )}

              <div>
                <h4 className="font-serif text-2xl font-bold text-brand-navy">
                  {tier.name}
                </h4>
                <p className="mt-1 text-sm italic text-brand-navy-soft">
                  {tier.label}
                </p>
              </div>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-brand-navy tracking-tight">
                  {tier.price}
                </span>
                <span className="text-sm text-brand-navy-soft">{tier.cadence}</span>
              </div>

              {tier.plus && (
                <p className="mt-5 text-sm font-semibold text-brand-navy">
                  {tier.plus}
                </p>
              )}

              <ul className="mt-4 space-y-3 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-3 items-start text-sm sm:text-base">
                    <Check className="h-5 w-5 flex-shrink-0 text-brand-navy mt-0.5" aria-hidden />
                    <span className="text-brand-navy-soft">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm italic text-brand-navy-soft">
          Plans are month to month. Upgrade or downgrade any time as your ministry grows.
        </p>

        <div className="mt-10 flex flex-col items-center gap-5">
          <a
            href="/hlpr-care-plans.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-blue transition-colors underline underline-offset-4"
          >
            <Download className="h-4 w-4" aria-hidden />
            Download the one-page Care Plans PDF
          </a>
          <CtaButton
            href={BUSINESS.ctaUrl}
            label={BUSINESS.ctaLabel}
            size="lg"
          />
        </div>
      </div>
    </section>
  );
};
