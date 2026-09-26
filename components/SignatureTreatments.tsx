import Link from "next/link";
import Reveal from "./Reveal";
import TreatmentGrid from "./TreatmentGrid";

export default function SignatureTreatments() {
  return (
    <section id="treatments" className="section-pad bg-ivory">
      <div className="container-luxe">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">Our Services</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-xl text-display-md font-serif text-balance">
                Rituals chosen with care.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Link href="/treatments" className="link-underline text-sm uppercase tracking-widest2 text-ink/70">
              Full menu &amp; pricing
            </Link>
          </Reveal>
        </div>

        <div className="mt-14">
          <TreatmentGrid showFilters={false} />
        </div>
      </div>
    </section>
  );
}
