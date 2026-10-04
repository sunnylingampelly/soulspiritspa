import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { CallButton, WhatsAppButton } from "@/components/CTAButtons";
import SignatureTreatments from "@/components/SignatureTreatments";
import WhySoulSpirit from "@/components/WhySoulSpirit";
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import { siteImages } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";

// A focused landing page for paid traffic (Google Ads etc.) targeting
// "spa in Khairatabad" — the headline, offer, service list, hours and
// landmark below are a deliberate, word-for-word match to the ad copy
// driving people here, for Quality Score / landing-page-experience and
// so the page feels like a continuation of the ad, not a different story.
export const metadata: Metadata = {
  title: "Spa in Khairatabad | 15% Off All Services",
  description:
    "SoulSpirit Spa in Khairatabad, Hyderabad — Thai, Swedish, Deep Tissue, Balinese and Aromatherapy massage. 15% off all services, limited time. Open daily 10:30 AM–9:30 PM. Call or WhatsApp to book.",
  alternates: { canonical: "/spa-khairatabad" },
};

export default function SpaKhairatabadPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <ImagePlaceholder
            label="A private treatment suite at SoulSpirit, warm light and still water"
            tone="charcoal"
            src={siteImages.heroDesktop}
            priority
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="container-luxe relative z-10 pb-20 pt-40 text-center sm:pb-24 sm:pt-48">
          <Reveal>
            <p className="eyebrow text-champagne">SoulSpirit Spa in Khairatabad</p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mx-auto mt-5 inline-flex max-w-xs items-center gap-2 rounded-full border border-champagne/40 bg-charcoal/40 px-4 py-2 text-[11px] uppercase tracking-widest2 text-champagne backdrop-blur-sm sm:max-w-none">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-light" />
              15% Off All Spa Services — Limited Time
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <h1 className="mx-auto mt-6 max-w-2xl text-display-lg font-serif text-balance text-ivory">
              A private spa sanctuary in Khairatabad.
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mx-auto mt-5 max-w-lg text-balance text-sm uppercase tracking-widest2 text-ivory/80 sm:text-base">
              Thai &middot; Swedish &middot; Deep Tissue &middot; Balinese &middot; Aromatherapy
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mx-auto mt-9 flex max-w-md flex-col gap-4 sm:flex-row sm:justify-center">
              <CallButton tone="light" label="Call Now" />
              <WhatsAppButton
                tone="light"
                label="WhatsApp to Book"
                message="Hi SoulSpirit Spa, I'd like to book a treatment — I saw your ad for Khairatabad."
              />
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mx-auto mt-6 max-w-md text-balance text-xs text-ivory/60">
              Open Daily {siteConfig.hours[0].time} &middot; Above Union Bank
              of India, Pillar No. A1180
            </p>
          </Reveal>
        </div>
      </section>

      <SignatureTreatments />
      <WhySoulSpirit />
      <LocationSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
