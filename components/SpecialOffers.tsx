import Reveal from "./Reveal";
import { CallButton, WhatsAppButton } from "./CTAButtons";

const offers = [
  {
    n: "01",
    tag: "First Visit",
    title: "Welcome Offer",
    text: "For guests visiting SoulSpirit for the first time.",
    inclusions: [
      "A short consultation to choose your ideal treatment",
      "A warm, unhurried welcome from our team",
    ],
  },
  {
    n: "02",
    tag: "For Two",
    title: "Bring a Friend",
    text: "Book together, and relax on your own schedule.",
    inclusions: [
      "Coordinated appointment times",
      "Each treatment tailored to the individual guest",
    ],
  },
  {
    n: "03",
    tag: "Gifting",
    title: "Gift a Spa Experience",
    text: "For a birthday, anniversary, or simply because.",
    inclusions: [
      "Redeemable for any treatment on our menu",
      "Arranged with a personal note, on request",
    ],
  },
];

export default function SpecialOffers() {
  return (
    <section className="section-pad bg-sand">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Currently Available</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-display-md font-serif text-balance">
              Your next escape awaits.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 text-ink/60">
              Curated offers, confirmed by our team on WhatsApp or by phone.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {offers.map((o, i) => (
            <Reveal key={o.n} delay={i * 0.08}>
              <article className="flex h-full flex-col border border-line bg-ivory p-8">
                <span className="font-serif text-2xl text-bronze/60">{o.n}</span>
                <p className="mt-4 eyebrow text-ink/40">{o.tag}</p>
                <h3 className="mt-2 font-serif text-2xl">{o.title}</h3>
                <p className="mt-3 text-sm text-ink/60">{o.text}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-ink/60">
                  {o.inclusions.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bronze" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <CallButton size="sm" className="w-full justify-center sm:flex-1" />
                  <WhatsAppButton
                    size="sm"
                    label="WhatsApp"
                    message={`Hi SoulSpirit Spa, I would like to know more about the ${o.title}.`}
                    className="w-full justify-center sm:flex-1"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-xs text-ink/40">
          Offers are subject to availability and confirmation by SoulSpirit Spa. Contact us for current terms.
        </p>
      </div>
    </section>
  );
}
