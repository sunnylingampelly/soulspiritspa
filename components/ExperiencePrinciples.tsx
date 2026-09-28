"use client";

import Reveal from "./Reveal";

const principles = [
  {
    n: "01",
    title: "Restore",
    text: "Release physical tension and let the body settle into ease.",
  },
  {
    n: "02",
    title: "Reconnect",
    text: "Step away from noise and return to a quieter sense of self.",
  },
  {
    n: "03",
    title: "Renew",
    text: "Leave lighter, calmer, and gently restored.",
  },
  {
    n: "04",
    title: "Rebalance",
    text: "Find a steadier rhythm to carry back into daily life.",
  },
];

export default function ExperiencePrinciples() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-luxe">
        <Reveal>
          <p className="eyebrow text-center">The SoulSpirit Experience</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-5 max-w-2xl text-center text-display-md font-serif text-balance">
            Four principles guide every visit.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 divide-y divide-line/70 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {principles.map((p, i) => (
            <Reveal
              key={p.n}
              delay={0.1 + i * 0.06}
              direction={i % 2 === 0 ? "left" : "right"}
              className="group px-4 py-8 lg:px-8"
            >
              <span className="font-serif text-3xl text-bronze/50 transition-colors duration-600 group-hover:text-bronze">
                {p.n}
              </span>
              <h3 className="mt-4 font-serif text-2xl">{p.title}</h3>
              <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-ink/60">
                {p.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
