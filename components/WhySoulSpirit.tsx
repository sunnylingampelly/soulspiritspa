import Reveal from "./Reveal";

// Honest, defensible reasons only — no fabricated ratings, review counts or
// statistics. Once a real Google rating exists, the TrustStrip component
// already surfaces it; this section stays qualitative on purpose.
const reasons = [
  {
    n: "01",
    title: "Private Treatment Rooms",
    text: "Every session takes place in its own private, closed room, never shared.",
  },
  {
    n: "02",
    title: "Hygiene-First Environment",
    text: "Linens, tools and surfaces are prepared fresh before every guest.",
  },
  {
    n: "03",
    title: "Considered, Unhurried Care",
    text: "No back-to-back rushing, sessions are paced around you, not the clock.",
  },
  {
    n: "04",
    title: "Skilled Therapists",
    text: "Trained hands and a genuine focus on how each guest actually feels.",
  },
  {
    n: "05",
    title: "Premium, Considered Products",
    text: "Oils and materials chosen with care, used with restraint.",
  },
  {
    n: "06",
    title: "Easy to Reach Us",
    text: "Call, WhatsApp or book online, whichever is easiest for you.",
  },
];

export default function WhySoulSpirit() {
  return (
    <section id="why-soulspirit" className="section-pad scroll-mt-24 bg-cream">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Why SoulSpirit</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-display-md font-serif text-balance">
              A few reasons guests return.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.n} delay={(i % 3) * 0.06} direction={i % 2 === 0 ? "left" : "right"}>
              <span className="font-serif text-2xl text-bronze/50">{r.n}</span>
              <h3 className="mt-3 font-serif text-xl">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{r.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
