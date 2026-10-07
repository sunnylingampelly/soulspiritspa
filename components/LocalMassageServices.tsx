import Reveal from "./Reveal";
import { CallButton, WhatsAppButton } from "./CTAButtons";
import { getTreatmentBySlug, formatINR } from "@/lib/treatments-data";
import { siteConfig } from "@/lib/site-config";

// Local-SEO content for the Google Ads campaign targeting Khairatabad,
// Somajiguda and Lakdikapul searches ("spa near me", "massage near me",
// "Thai massage near me", etc.) — every service named here is a real
// listing in lib/treatments-data.ts, and every neighbourhood named is a
// real area within reach of the Khairatabad address. No claims, reviews
// or ratings are invented here.
const LOCAL_SERVICES = [
  {
    slug: "swedish-massage",
    description:
      "Swedish massage is one of our most requested treatments, using long, flowing strokes and gentle kneading to ease everyday tension. It's a calm, unhurried session, well suited to first-time guests or anyone who prefers a lighter touch. Many guests from Khairatabad, Somajiguda and Lakdikapul choose it after a long week at the desk or a day of travel, with pressure adjusted throughout to your comfort. Call or WhatsApp our team to check availability and book your Swedish massage.",
    benefits: [
      "Eases everyday tension",
      "Gentle, suited to first-time guests",
      "Leaves you feeling calmer and more rested",
    ],
  },
  {
    slug: "thai-massage-dry",
    description:
      "Thai Massage (Dry) combines assisted stretching with firm, rhythmic pressure-point work, performed fully clothed without oil. It's a more active session than a classic Swedish massage, working through the back, shoulders and legs. Guests searching for a Thai massage near Khairatabad, Somajiguda or Lakdikapul often choose this when they want a firmer, more energising treatment. Available in 60, 90 and 120-minute sessions. Share your preferred time with our team on WhatsApp or by phone to confirm your booking.",
    benefits: [
      "Loosens tight muscles through stretching",
      "A firmer, more energising session",
      "Works through the whole body",
    ],
  },
  {
    slug: "deep-tissue-massage",
    description:
      "Deep Tissue Massage uses firmer, more focused pressure to work through persistent tightness in the back, shoulders and neck — a popular choice for guests searching for deep tissue massage near Khairatabad. Our therapists adjust pressure to what feels right for you; it doesn't need to hurt to be effective. It's often chosen after a physically demanding week or long hours at a desk. Sessions run 60, 90 or 120 minutes at our Khairatabad spa, close to Somajiguda and Lakdikapul.",
    benefits: [
      "Targets persistent tightness",
      "Pressure adjusted to your comfort",
      "Popular after a physically demanding week",
    ],
  },
  {
    slug: "balinese-massage",
    description:
      "Balinese Massage blends warm oil with deep, rhythmic strokes for a fuller-body treatment than a gentle Swedish session, without being as firm as deep tissue work. It's a favourite among guests in Khairatabad, Somajiguda and Lakdikapul who want a more deliberate, grounding massage. The combination of pressure and warm oil is designed to ease tension while still feeling restorative. Choose from 60, 90 or 120-minute sessions, and WhatsApp our team with your preferred date and time to book.",
    benefits: [
      "Combines warm oil with deep pressure",
      "Eases tension through the whole body",
      "A grounding, restorative experience",
    ],
  },
  {
    slug: "aromatherapy-massage",
    description:
      "Aromatherapy Massage is a calming, full-body treatment using therapeutic oils alongside gentle, flowing strokes, for guests who want their massage to feel like a complete sensory escape. It's a gentler option, similar in pressure to a Swedish massage, with the added experience of carefully chosen scents. Many guests from Khairatabad and nearby Somajiguda and Lakdikapul book this session to unwind after a stressful week. Available in 60, 90 or 120-minute sessions — call or WhatsApp to check today's availability.",
    benefits: [
      "A calming, full sensory experience",
      "Therapeutic oils chosen with care",
      "Gentle pressure, similar to Swedish massage",
    ],
  },
  {
    slug: "couple-massage",
    description:
      "Couple Massage lets two guests enjoy a treatment together, side by side, in one of our private rooms — a popular option for partners, friends or family visiting our Khairatabad spa together. Each person's massage is tailored individually, so one guest can choose a gentler Swedish-style session while the other opts for firmer pressure. It's a relaxed, shared experience well suited to a special occasion. Sessions run 60, 90 or 120 minutes — WhatsApp or call to arrange timings for both guests.",
    benefits: [
      "A private room for two",
      "Each massage tailored individually",
      "Ideal for partners, friends or family",
    ],
  },
] as const;

export default function LocalMassageServices() {
  const areas = siteConfig.nearbyAreas.slice(1).join(" and "); // "Somajiguda and Lakdikapul"

  return (
    <section className="section-pad bg-ivory">
      <div className="container-luxe">
        <Reveal>
          <p className="eyebrow">Local to Khairatabad</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 max-w-2xl text-display-md font-serif text-balance">
            Spa in Khairatabad, Hyderabad
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-ink/70">
            SoulSpirit Spa is based in {siteConfig.location.neighborhood},{" "}
            {siteConfig.location.city}, and welcomes guests from across{" "}
            {areas} and the surrounding central Hyderabad neighbourhoods. If
            you&rsquo;ve been searching for a spa near you in this part of
            the city, our private treatment rooms are just a short drive or
            auto ride away, above Union Bank of India on Khairatabad Road.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <h2 className="mt-16 max-w-2xl text-display-sm font-serif text-balance">
            Massage Spa Near Somajiguda &amp; Lakdikapul
          </h2>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mt-5 max-w-2xl text-ink/70">
            Every treatment below is available to book today at our
            Khairatabad studio, in 60, 90 or 120-minute sessions, with 15%
            off every service.
          </p>
        </Reveal>

        {/* lg:pr-24 keeps the third column's text clear of the persistent
            floating Call/Directions buttons, which sit flush against the
            right edge at this container's own max-width. */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:pr-24">
          {LOCAL_SERVICES.map((service, i) => {
            const treatment = getTreatmentBySlug(service.slug);
            if (!treatment) return null;
            return (
              <Reveal key={service.slug} delay={(i % 3) * 0.06} direction={i % 2 === 0 ? "left" : "right"}>
                <article className="flex h-full flex-col border border-line bg-cream p-7">
                  <p className="eyebrow text-ink/40">{treatment.category}</p>
                  <h3 className="mt-2 font-serif text-xl">{treatment.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">
                    {service.description}
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-ink/55">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bronze" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs uppercase tracking-widest2 text-bronze-dark">
                    {treatment.tiers.map((t) => t.minutes).join(" / ")} min &middot; from{" "}
                    {formatINR(Math.min(...treatment.tiers.map((t) => t.price)))}
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5 sm:flex-row">
                    <CallButton size="sm" className="w-full justify-center sm:flex-1" />
                    <WhatsAppButton
                      size="sm"
                      label="WhatsApp to Book"
                      message={`Hi SoulSpirit Spa, I would like to book the ${treatment.name}.`}
                      className="w-full justify-center sm:flex-1"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
