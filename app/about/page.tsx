import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Gallery from "@/components/Gallery";
import FinalCTA from "@/components/FinalCTA";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "SoulSpirit Spa is a private wellness sanctuary in Hyderabad, built on quiet hospitality, considered detail and genuine care.",
  alternates: { canonical: "/about" },
};

const pillars = [
  {
    title: "Philosophy",
    text: "We believe rest is not indulgence, it is maintenance. SoulSpirit exists to give that time back.",
  },
  {
    title: "Ambience",
    text: "Warm light, natural materials and quiet spaces, designed so the mind can slow down before the body does.",
  },
  {
    title: "Hospitality",
    text: "A calm welcome, unhurried pacing and full attention from the moment you arrive.",
  },
  {
    title: "Therapists",
    text: "Trained hands, a considered touch, and a genuine focus on how you feel, not just what is treated.",
  },
  {
    title: "Products",
    text: "Chosen with care, used with restraint, always in service of your comfort.",
  },
  {
    title: "Privacy & Cleanliness",
    text: "Every room, every session, held to the same quiet standard of care.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-16 sm:pt-48 sm:pb-24">
        <div className="container-luxe grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">About SoulSpirit</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 text-display-lg font-serif text-balance">
                More than a treatment.
                <br />A ritual of renewal.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-prose text-lg leading-relaxed text-ink/70">
                SoulSpirit was created as an answer to a city that rarely
                pauses, a private space where attention, quiet and skilled
                care come together.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ImagePlaceholder
              label="A guest mid-session, warm light on the treatment table"
              tone="cream"
              src={siteImages.backMassageTable}
              className="aspect-[4/5] w-full"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="container-luxe">
          <Reveal>
            <h2 className="max-w-xl text-display-md font-serif text-balance">
              What we hold ourselves to.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <h3 className="font-serif text-xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-luxe grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <ImagePlaceholder
              label="A considered touch on the shoulder"
              tone="stone"
              src={siteImages.shoulderHandsCloseup}
              className="aspect-[4/5] w-full"
            />
          </Reveal>
          <div>
            <Reveal delay={0.08}>
              <h2 className="text-display-sm font-serif text-balance">
                Personalised, every time.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-prose leading-relaxed text-ink/70">
                No two guests arrive carrying the same day. We take a moment
                before every session to understand what you need, and adjust
                accordingly, in pressure, pace and attention.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 max-w-prose leading-relaxed text-ink/70">
                What we offer is not a medical treatment, and we make no such
                claims. It is a considered space for rest and self-care.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Gallery />

      <FinalCTA />
    </>
  );
}
