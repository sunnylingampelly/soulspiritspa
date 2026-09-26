import Reveal from "./Reveal";
import { WhatsAppButton } from "./CTAButtons";

// Pricing is intentionally not shown — membership terms are confirmed
// directly with our team. Benefits below are real, qualitative and
// non-numeric until the final structure is set.
const plans = [
  {
    name: "Essential",
    tag: "For occasional escapes",
    benefits: [
      "Priority booking access",
      "A complimentary welcome ritual on your first visit",
      "Member-only scheduling flexibility",
    ],
  },
  {
    name: "Restore",
    tag: "For regular wellness",
    benefits: [
      "Everything in Essential",
      "Regular, unhurried sessions built around your routine",
      "A dedicated therapist who knows your preferences",
    ],
    featured: true,
  },
  {
    name: "Soul",
    tag: "For complete self-care",
    benefits: [
      "Everything in Restore",
      "First access to new rituals and seasonal offerings",
      "The most personalised level of care we offer",
    ],
  },
];

export default function MembershipSection() {
  return (
    <section id="membership" className="section-pad bg-ivory">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Membership</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-display-md font-serif text-balance">
              Make wellness a ritual.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 text-ink/60">
              Message us on WhatsApp for current membership terms and
              pricing, tailored to how often you&rsquo;d like to visit.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div
                className={`flex h-full flex-col border p-8 ${
                  p.featured
                    ? "border-bronze bg-charcoal text-ivory"
                    : "border-line"
                }`}
              >
                <h3 className={`font-serif text-2xl ${p.featured ? "text-ivory" : ""}`}>{p.name}</h3>
                <p
                  className={`mt-1 text-sm ${
                    p.featured ? "text-ivory/60" : "text-ink/50"
                  }`}
                >
                  {p.tag}
                </p>
                <ul
                  className={`mt-6 flex-1 space-y-3 text-sm ${
                    p.featured ? "text-ivory/70" : "text-ink/60"
                  }`}
                >
                  {p.benefits.map((b, bi) => (
                    <li key={bi} className="flex gap-2">
                      <span
                        className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${
                          p.featured ? "bg-champagne" : "bg-bronze"
                        }`}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                <WhatsAppButton
                  tone={p.featured ? "light" : "dark"}
                  label={`Enquire — ${p.name}`}
                  message={`Hi SoulSpirit Spa, I would like to know more about the ${p.name} membership.`}
                  className="mt-8 w-full justify-center"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
