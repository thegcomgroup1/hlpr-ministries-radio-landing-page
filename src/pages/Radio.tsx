import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  church_name: z.string().trim().min(1, "Please enter your church name").max(200),
  contact: z.string().trim().min(3, "Please enter an email or phone").max(200),
});
type LeadInput = z.infer<typeof leadSchema>;

function useUtm() {
  return useMemo(() => {
    if (typeof window === "undefined") return {};
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source: p.get("utm_source") ?? undefined,
      utm_medium: p.get("utm_medium") ?? undefined,
      utm_campaign: p.get("utm_campaign") ?? undefined,
      utm_content: p.get("utm_content") ?? undefined,
    };
  }, []);
}

function LeadForm({ id }: { id: string }) {
  const utm = useUtm();
  const [values, setValues] = useState({ name: "", church_name: "", contact: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your entries.");
      return;
    }
    setSubmitting(true);
    const data = parsed.data as LeadInput;
    const { error: dbError } = await supabase.from("leads").insert({
      name: data.name,
      church_name: data.church_name,
      contact: data.contact,
      source: "radio",
      utm_source: utm.utm_source ?? null,
      utm_medium: utm.utm_medium ?? null,
      utm_campaign: utm.utm_campaign ?? null,
      utm_content: utm.utm_content ?? null,
    });
    setSubmitting(false);
    if (dbError) {
      setError("Something went wrong. Please try again or call 302.550.8521.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div
        id={id}
        className="rounded-2xl bg-white p-6 text-center shadow-lg ring-1 ring-black/5 md:p-8"
      >
        <p className="font-serif text-2xl text-[#1B2A4A]">Got it.</p>
        <p className="mt-3 text-base text-slate-700">
          We're building your preview now. We'll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5 md:p-7"
      noValidate
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-[#1B2A4A]">
            Your name
          </Label>
          <Input
            id="name"
            autoComplete="name"
            required
            maxLength={100}
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className="mt-1 h-12 text-base"
          />
        </div>
        <div>
          <Label htmlFor="church" className="text-sm font-medium text-[#1B2A4A]">
            Church name
          </Label>
          <Input
            id="church"
            autoComplete="organization"
            required
            maxLength={200}
            value={values.church_name}
            onChange={(e) => setValues((v) => ({ ...v, church_name: e.target.value }))}
            className="mt-1 h-12 text-base"
          />
        </div>
        <div>
          <Label htmlFor="contact" className="text-sm font-medium text-[#1B2A4A]">
            Email or phone
          </Label>
          <Input
            id="contact"
            autoComplete="email"
            required
            maxLength={200}
            value={values.contact}
            onChange={(e) => setValues((v) => ({ ...v, contact: e.target.value }))}
            className="mt-1 h-12 text-base"
          />
        </div>
      </div>
      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
      <Button
        type="submit"
        disabled={submitting}
        className="mt-5 h-14 w-full bg-[#2E5FA3] text-base font-semibold text-white hover:bg-[#254e88]"
      >
        {submitting ? "Sending..." : "Build My Free Preview"}
      </Button>
      <p className="mt-3 text-center text-sm text-slate-600">
        Usually ready within a few days.
      </p>
    </form>
  );
}

export default function Radio() {
  const formRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const scrollToForm = () => {
    document.getElementById("lead-form-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Helmet>
        <title>Free church website preview | hlpr Ministries</title>
        <meta
          name="description"
          content="Heard us on the radio? Get a free preview of your church's new website. No cost, no obligation."
        />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className="min-h-screen bg-[#1B2A4A] text-white">
        {/* HERO */}
        <section className="px-5 pb-10 pt-8 md:pt-14">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center md:gap-12">
            <div>
              <p className="text-sm uppercase tracking-widest text-[#9DB4DA]">
                Heard us on the radio?
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
                Get a free preview of your church's new website.
              </h1>
              <p className="mt-4 text-lg text-white/85 md:text-xl">
                No cost, no obligation, and it's yours to keep — even if we never
                work together.
              </p>
            </div>
            <div ref={formRef}>
              <LeadForm id="lead-form-top" />
            </div>
          </div>
        </section>

        {/* TRUST LINE */}
        <section className="border-y border-white/10 bg-[#16233d] px-5 py-6">
          <p className="mx-auto max-w-3xl text-center text-base text-white/90 md:text-lg">
            Recommended by Jim Turner — we build the websites for the churches
            he works with.
          </p>
        </section>

        {/* WHAT YOU GET */}
        <section className="px-5 py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-serif text-3xl md:text-4xl">What you get</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: "✦",
                  text: "A real homepage designed for your church — not a template.",
                },
                {
                  icon: "☏",
                  text: "Built to work on phones, where people find you first.",
                },
                {
                  icon: "✉",
                  text: "Service times, location, and an easy way for first-time visitors to reach out.",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="rounded-xl bg-white/5 p-6 text-center ring-1 ring-white/10"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2E5FA3] text-2xl">
                    {item.icon}
                  </div>
                  <p className="mt-4 text-base text-white/90">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-[#16233d] px-5 py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-serif text-3xl md:text-4xl">How it works</h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                "Tell us about your church.",
                "We build your preview.",
                "You look it over — no strings attached.",
              ].map((step, i) => (
                <li key={step} className="rounded-xl bg-white/5 p-6 ring-1 ring-white/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2E5FA3] font-serif text-lg">
                    {i + 1}
                  </div>
                  <p className="mt-4 text-base text-white/90">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="px-5 py-14 text-center md:py-20">
          <h2 className="mx-auto max-w-3xl font-serif text-3xl md:text-4xl">
            Get a free preview of your church's new website.
          </h2>
          <Button
            onClick={scrollToForm}
            className="mt-6 h-14 bg-[#2E5FA3] px-8 text-base font-semibold text-white hover:bg-[#254e88]"
          >
            Build My Free Preview
          </Button>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-white/70">
          <p>hlpr Ministries · Named for the Holy Spirit, our Helper.</p>
          <p className="mt-2">
            Prefer to talk?{" "}
            <a href="tel:+13025508521" className="underline text-white">
              Call 302.550.8521
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
