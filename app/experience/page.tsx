import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import JourneySection from "@/components/JourneySection";
import { siteImages } from "@/lib/images";
import ExperiencePrinciples from "@/components/ExperiencePrinciples";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "The Experience",
  description:
    "From arrival to renewal, discover what a visit to SoulSpirit Spa in Hyderabad feels like.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <section className="pt-40 pb-16 sm:pt-48 sm:pb-20">
        <div className="container-luxe">
          <Reveal>
            <p className="eyebrow">The Experience</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-xl text-display-lg font-serif text-balance">
              Imagine slowing down.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-prose text-ink/60">
              A visit to SoulSpirit is designed as a full journey, not a
              single hour. Here is what to expect, from the moment you
              arrive to the moment you leave.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container-luxe">
        <ImagePlaceholder
          label="A private treatment suite at SoulSpirit"
          tone="sand"
          src={siteImages.heroDesktop}
          className="aspect-[16/9] w-full"
        />
      </div>

      <JourneySection />
      <ExperiencePrinciples />
      <FinalCTA />
    </>
  );
}
