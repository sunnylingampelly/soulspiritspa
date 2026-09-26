import Reveal from "./Reveal";
import { CallButton, WhatsAppButton } from "./CTAButtons";

export default function GuidanceCTA() {
  return (
    <section className="border-y border-line bg-sand">
      <div className="container-luxe flex flex-col items-center gap-5 py-14 text-center sm:flex-row sm:justify-between sm:text-left">
        <Reveal>
          <div>
            <p className="eyebrow">A Little Guidance</p>
            <h2 className="mt-2 font-serif text-2xl">
              Not sure which treatment is right for you?
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink/60">
              Tell us what kind of relaxation you&rsquo;re looking for, and
              we&rsquo;ll help you choose.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <CallButton label="Call Us" />
            <WhatsAppButton message="Hi SoulSpirit Spa, I'm not sure which treatment is right for me, could you help?" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
