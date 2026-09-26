import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import LocationSection from "@/components/LocationSection";
import { CallButton, WhatsAppButton } from "@/components/CTAButtons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with SoulSpirit Spa in Hyderabad — call, WhatsApp, or find directions to our sanctuary.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-40 pb-16 text-center sm:pt-48 sm:pb-20">
        <div className="container-luxe">
          <Reveal>
            <p className="eyebrow">Get in Touch</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-5 max-w-xl text-display-lg font-serif text-balance">
              We&rsquo;d love to host you.
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row sm:justify-center">
              <CallButton label="Call Us" />
              <WhatsAppButton message="Hi SoulSpirit Spa, I have a question about your treatments." />
            </div>
          </Reveal>
        </div>
      </section>

      <LocationSection />
    </>
  );
}
