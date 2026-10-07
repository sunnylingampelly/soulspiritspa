import Reveal from "./Reveal";
import { siteConfig } from "@/lib/site-config";

const faqs = [
  {
    q: "Where is SoulSpirit Spa located?",
    a: `SoulSpirit Spa is located at ${siteConfig.location.addressLine}, ${siteConfig.location.city}, ${siteConfig.location.region} ${siteConfig.location.postalCode}. See our Location page for directions.`,
  },
  {
    q: "Is there a spa near Somajiguda?",
    a: `Yes — SoulSpirit Spa is in ${siteConfig.location.neighborhood}, just a short drive from Somajiguda and Lakdikapul, and easily reached from across central Hyderabad.`,
  },
  {
    q: "Which massage therapies are available in Khairatabad?",
    a: "Our current menu includes Thai, Swedish, Balinese, Deep Tissue, Aromatherapy, Yantra and Candle massage, as well as our four-hands Lomi Lomi and Couple Massage. See the full Treatments page for details.",
  },
  {
    q: "Do you offer Thai massage?",
    a: "Yes. Thai Massage (Dry) is on our menu at SoulSpirit Spa, combining assisted stretching with firm, rhythmic pressure-point work, in 60, 90 or 120-minute sessions.",
  },
  {
    q: "Do you offer deep tissue massage?",
    a: "Yes. Deep Tissue Massage is available in 60, 90 and 120-minute sessions, with pressure adjusted to what's comfortable for you.",
  },
  {
    q: "Is Soul Spirit Spa open today?",
    a: `We're open ${siteConfig.hours.map((h) => `${h.day}, ${h.time}`).join(", ")} — including today.`,
  },
  {
    q: "How can I book a massage?",
    a: "You can call us, message us on WhatsApp, or submit a request through our Booking page — whichever is easiest for you.",
  },
  {
    q: "Does SoulSpirit accept WhatsApp bookings?",
    a: "Yes. Tap the WhatsApp button anywhere on the site to send us your preferred treatment, date and time.",
  },
  {
    q: "Are treatments available in different durations?",
    a: "Yes, every treatment on our menu is available in 60, 90 and 120 minute sessions.",
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
