import { Helmet } from "react-helmet-async";
import { StickyNav } from "@/components/landing/StickyNav";
import { Hero } from "@/components/landing/Hero";
import { SocialProofBar } from "@/components/landing/SocialProofBar";
import { PainPointSection } from "@/components/landing/PainPointSection";
import { RiskReversalStrip } from "@/components/landing/RiskReversalStrip";
import { ValueProps } from "@/components/landing/ValueProps";
import { Differentiator } from "@/components/landing/Differentiator";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { MinistryPortfolio } from "@/components/landing/MinistryPortfolio";
import { FounderSection } from "@/components/landing/FounderSection";
import { Pricing } from "@/components/landing/Pricing";
import { FudStrip } from "@/components/landing/FudStrip";
import { FinalCtaBand } from "@/components/landing/FinalCtaBand";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { FAQS } from "@/lib/content";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>HLPR Ministries — Custom Websites for Ministries</title>
        <meta
          name="description"
          content="Custom websites for churches, podcasts, and digital ministries. Free 72-hour homepage preview, live in 14 days. No payment until you approve."
        />
        <link rel="canonical" href="https://ministries.hlpr.io/" />
        <meta property="og:title" content="HLPR Ministries — Custom Websites for Ministries" />
        <meta
          property="og:description"
          content="Custom websites for churches, podcasts, and digital ministries. Free 72-hour homepage preview, live in 14 days. No payment until you approve."
        />
        <meta property="og:url" content="https://ministries.hlpr.io/" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <StickyNav />
      <main id="main">
        <Hero />
        <SocialProofBar />
        <PainPointSection />
        <RiskReversalStrip />
        <ValueProps />
        <Differentiator />
        <HowItWorks />
        <MinistryPortfolio />
        <FounderSection />
        <Pricing />
        <FudStrip />
        <FinalCtaBand />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default Index;
