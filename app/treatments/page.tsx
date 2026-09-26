import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import TreatmentGrid from "@/components/TreatmentGrid";
import TreatmentSpotlight from "@/components/TreatmentSpotlight";
import GuidanceCTA from "@/components/GuidanceCTA";

export const metadata: Metadata = {
  title: "Treatments | Massage Menu",
  description:
    "Explore SoulSpirit's massage menu in Hyderabad — Thai, Swedish, Balinese, Deep Tissue, Aromatherapy, Yantra, Candle and Lomi Lomi, in a private sanctuary.",
  alternates: { canonical: "/treatments" },
};

export default function TreatmentsPage() {
  return (
    <>
      <section className="pt-40 pb-16 sm:pt-48 sm:pb-20">
        <div className="container-luxe">
          <Reveal>
            <p className="eyebrow">The Menu</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-2xl text-display-lg font-serif text-balance">
              Treatments
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-xl text-ink/60">
              Every ritual is performed with care, privacy and full
              attention.
            </p>
          </Reveal>
        </div>
      </section>

      <TreatmentSpotlight />

      <section className="section-pad">
        <div className="container-luxe">
          <TreatmentGrid />
        </div>
      </section>

      <GuidanceCTA />
    </>
  );
}
