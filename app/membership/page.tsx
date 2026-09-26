import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import MembershipSection from "@/components/MembershipSection";
import FinalCTA from "@/components/FinalCTA";
import { CallButton, WhatsAppButton } from "@/components/CTAButtons";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Make wellness a ritual with SoulSpirit membership plans in Hyderabad. Message us for current terms and pricing.",
  alternates: { canonical: "/membership" },
};

export default function MembershipPage() {
  return (
    <>
      <section className="bg-cream pb-8 pt-40 text-center sm:pt-48">
        <div className="container-luxe">
          <Reveal>
            <p className="eyebrow">Membership</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-5 max-w-2xl text-display-lg font-serif text-balance">
              Make wellness a ritual.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-ink/60">
              For guests who return often, membership is designed to make
              rest a habit rather than an occasion. Message us for current
              terms and pricing.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CallButton />
              <WhatsAppButton
                label="Ask About Membership"
                message="Hi SoulSpirit Spa, I would like to know more about membership."
              />
            </div>
          </Reveal>
        </div>
      </section>

      <MembershipSection />
      <FinalCTA />
    </>
  );
}
