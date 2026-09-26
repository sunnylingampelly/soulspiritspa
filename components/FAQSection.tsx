import Reveal from "./Reveal";
import { siteConfig } from "@/lib/site-config";

const faqs = [
  {
    q: "Where is SoulSpirit Spa located?",
    a: `SoulSpirit Spa is located at ${siteConfig.location.addressLine}, ${siteConfig.location.city}, ${siteConfig.location.region} ${siteConfig.location.postalCode}. See our Location page for directions.`,
  },
  {
    q: "How do I book an appointment?",
    a: "You can book online through our Booking page, message us on WhatsApp, or call us directly, whichever is easiest for you.",
  },
  {
    q: "Does SoulSpirit accept WhatsApp bookings?",
    a: "Yes. Tap the WhatsApp button anywhere on the site to send us your preferred treatment, date and time.",
  },
  {
    q: "What treatments are available?",
    a: "Our current menu includes Thai, Swedish, Balinese, Deep Tissue, Aromatherapy, Yantra and Candle massage, as well as our four-hands Lomi Lomi. See the full Treatments page for details.",
  },
  {
    q: "Are treatments available in different durations?",
    a: "Yes, every treatment on our menu is available in 60, 90 and 120 minute sessions.",
  },
  {
    q: "What are your opening hours?",
    a: `We are open ${siteConfig.hours.map((h) => `${h.day}: ${h.time}`).join(", ")}.`,
  },
  {
    q: "Is SoulSpirit suitable for first-time guests?",
    a: "Absolutely. Let us know it's your first visit and our team will help you choose the right treatment.",
  },
  {
    q: "How do I get directions to SoulSpirit Spa?",
    a: "Use the Get Directions link on our Location or Contact page to open Google Maps directly.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FAQSection() {
  return (
    <section id="faq" className="section-pad scroll-mt-24 bg-sand">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Information</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-display-md font-serif text-balance">
              Frequently asked questions.
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 max-w-2xl divide-y divide-line">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={(i % 4) * 0.05}>
              <div className="py-6">
                <p className="font-serif text-lg">{f.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
