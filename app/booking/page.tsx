import type { Metadata } from "next";
import { Suspense } from "react";
import Reveal from "@/components/Reveal";
import BookingFlow from "@/components/BookingFlow";
import { CallButton, WhatsAppButton } from "@/components/CTAButtons";

export const metadata: Metadata = {
  title: "Book Your Experience",
  description:
    "Book your treatment at SoulSpirit Spa, Hyderabad. Choose your ritual, date and time, or book instantly on WhatsApp.",
  alternates: { canonical: "/booking" },
};

export default function BookingPage() {
  return (
    <section className="pt-40 pb-section sm:pt-48">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Book Your Experience</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-display-md font-serif text-balance">
              Your time is waiting.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 text-ink/60">
              Prefer to book directly? Reach us on WhatsApp or by phone.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <CallButton label="Call to Book" />
              <WhatsAppButton
                label="Book on WhatsApp"
                message="Hi SoulSpirit Spa, I would like to book a spa treatment."
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-20">
          <Suspense fallback={null}>
            <BookingFlow />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
