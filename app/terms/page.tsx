import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for SoulSpirit Spa, Hyderabad.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "5 October 2026";

export default function TermsPage() {
  return (
    <section className="section-pad pt-40 sm:pt-48">
      <div className="container-luxe max-w-prose">
        <h1 className="text-display-sm font-serif">Terms &amp; Conditions</h1>
        <p className="mt-4 text-sm text-ink/50">Last updated: {LAST_UPDATED}</p>

        <p className="mt-8 leading-relaxed text-ink/70">
          These terms apply to your use of this website ({siteConfig.url})
          and to appointments booked with {siteConfig.name} at{" "}
          {siteConfig.location.addressLine}, {siteConfig.location.city},{" "}
          {siteConfig.location.region} {siteConfig.location.postalCode}. By
          using this site or booking an appointment, you agree to them.
        </p>

        <h2 className="mt-12 font-serif text-2xl">Bookings and enquiries</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          This website lets you submit a booking request or reach us by
          phone or WhatsApp — it does not process payments or confirm an
          appointment automatically. Every request is confirmed by our team
          directly, by phone or WhatsApp, before it is treated as a
          scheduled appointment.
        </p>

        <h2 className="mt-12 font-serif text-2xl">Pricing and offers</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          Prices shown on this site are current at the time of publishing
          but may change without notice; the price confirmed by our team
          when you book is the one that applies. Our 15% off every service
          discount is a standing offer, applied when you mention it at the
          time of booking — it is not a coupon code, and specific
          combinations with other offers (such as a first-visit welcome
          offer) should be confirmed with our team.
        </p>

        <h2 className="mt-12 font-serif text-2xl">Cancellations and rescheduling</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          To cancel or reschedule an appointment, contact us directly by
          phone or WhatsApp as early as possible so we can offer the slot
          to another guest. We don&rsquo;t charge a cancellation fee through
          this website, since no payment is taken here.
        </p>

        <h2 className="mt-12 font-serif text-2xl">Your visit</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          Please tell our team about any health conditions, injuries,
          allergies, or pregnancy before your treatment begins, so we can
          recommend the right service and pressure for you. We reserve the
          right to decline or adjust a treatment where it would not be
          appropriate or safe for a guest, and to refuse service to anyone
          behaving inappropriately toward our staff or other guests.
        </p>

        <h2 className="mt-12 font-serif text-2xl">Website content</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          The text, photographs, and branding on this website belong to{" "}
          {siteConfig.name} and may not be copied or reused without
          permission.
        </p>

        <h2 className="mt-12 font-serif text-2xl">Liability</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          We take reasonable care to keep this website&rsquo;s information
          accurate, but it is provided without warranty of any kind, and we
          are not liable for any loss arising from your use of it.
        </p>

        <h2 className="mt-12 font-serif text-2xl">Governing law</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          These terms are governed by the laws of India, and subject to the
          jurisdiction of the courts in {siteConfig.location.city},{" "}
          {siteConfig.location.region}.
        </p>

        <h2 className="mt-12 font-serif text-2xl">Changes to these terms</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          We may update these terms from time to time. The date at the top
          shows when they were last revised.
        </p>

        <h2 className="mt-12 font-serif text-2xl">Contact us</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          Questions about these terms can be sent to{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="link-underline"
          >
            {siteConfig.contact.email}
          </a>{" "}
          or{" "}
          <a href={siteConfig.contact.phoneHref} className="link-underline">
            {siteConfig.contact.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
