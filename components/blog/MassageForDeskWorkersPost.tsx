import Link from "next/link";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { CallButton, WhatsAppButton } from "@/components/CTAButtons";
import { siteImages } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { getBlogPostMeta } from "@/lib/blog-data";

const meta = getBlogPostMeta("massage-for-desk-workers-hyderabad")!;

const publishedDisplay = new Date(meta.publishedAt).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function MassageForDeskWorkersPost() {
  return (
    <>
      <section className="relative flex h-[55vh] min-h-[380px] items-end overflow-hidden bg-charcoal">
        <ImagePlaceholder
          label="A considered touch on the shoulder during a massage at SoulSpirit Spa"
          tone="charcoal"
          src={siteImages.shoulderHandsCloseup}
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-charcoal/10" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/55 to-transparent" />
        <div className="container-luxe relative z-10 pb-16 pt-32">
          <p className="eyebrow text-champagne">{meta.category}</p>
          <h1 className="mt-4 max-w-3xl text-display-md font-serif text-ivory text-balance">
            {meta.title}
          </h1>
          <p className="mt-4 text-xs uppercase tracking-widest2 text-ivory/60">
            {meta.author} · {publishedDisplay}
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-luxe max-w-prose">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink/75">
              A day of meetings, laptop work and Hyderabad traffic can leave
              you wanting a proper pause. If you have been searching for a
              massage near you, the next question is often harder: which
              treatment should you choose?
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-5 leading-relaxed text-ink/70">
              Recovery-focused wellness is receiving attention in 2026. The{" "}
              <a
                href="https://globalwellnessinstitute.org/global-wellness-institute-blog/2026/04/06/massage-makes-me-healthy-and-happy-initiative-trends-for-2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                Global Wellness Institute&rsquo;s massage trends report
              </a>{" "}
              highlights massage&rsquo;s growing place in recovery
              programmes. That does not make a spa visit a medical
              treatment, but it is a useful reminder to make room for rest
              alongside a busy routine.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 leading-relaxed text-ink/70">
              At SoulSpirit Spa in Khairatabad, you can choose a session
              based on your preferred pressure, comfort and the experience
              you want — not simply whichever massage sounds strongest.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <h2 className="mt-14 font-serif text-2xl">
              Choose your massage by the experience you want
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <h3 className="mt-10 font-serif text-xl">
              Swedish massage: for a gentler session
            </h3>
            <p className="mt-3 leading-relaxed text-ink/70">
              If this is your first visit, or you prefer lighter pressure,{" "}
              <Link href="/treatments/swedish-massage" className="link-underline">
                Swedish Massage
              </Link>{" "}
              is an option to discuss with the team. SoulSpirit&rsquo;s
              treatment uses long, flowing strokes for a gentle massage
              experience.
            </p>
            <p className="mt-3 leading-relaxed text-ink/70">
              Tell your therapist which areas feel uncomfortable and how
              much pressure you prefer. There is no need to choose a firm
              treatment just because you have had a demanding week.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <h3 className="mt-10 font-serif text-xl">
              Balinese massage: for firmer, rhythmic pressure
            </h3>
            <p className="mt-3 leading-relaxed text-ink/70">
              <Link href="/treatments/balinese-massage" className="link-underline">
                Balinese Massage
              </Link>{" "}
              combines warm oil with deep, rhythmic strokes. It may suit
              guests who enjoy more deliberate pressure than a gentle
              Swedish session.
            </p>
            <p className="mt-3 leading-relaxed text-ink/70">
              Your comfort should guide the session. Ask for pressure to be
              reduced whenever you need to; a massage does not need to hurt
              to be worthwhile.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h3 className="mt-10 font-serif text-xl">
              Deep Tissue massage: for a more focused experience
            </h3>
            <p className="mt-3 leading-relaxed text-ink/70">
              <Link href="/treatments/deep-tissue-massage" className="link-underline">
                Deep Tissue Massage
              </Link>{" "}
              uses firmer, focused work. If you are considering it after a
              long week at your desk, discuss your preferences and any
              existing health concerns before the session.
            </p>
            <p className="mt-3 leading-relaxed text-ink/70">
              Massage may offer short-term relief for some neck or shoulder
              discomfort, according to the{" "}
              <a
                href="https://www.nccih.nih.gov/health/massage-therapy-what-you-need-to-know"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                US National Center for Complementary and Integrative Health
              </a>
              . Results vary, and evidence does not establish that one
              massage style is the best choice for every desk worker.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <h3 className="mt-10 font-serif text-xl">
              Hot Stone Therapy: for guests who enjoy warmth
            </h3>
            <p className="mt-3 leading-relaxed text-ink/70">
              <Link href="/treatments/hot-stone-therapy" className="link-underline">
                Hot Stone Therapy
              </Link>{" "}
              combines heated stones and warm oil. It is a different sensory
              experience from choosing a massage mainly for its pressure.
            </p>
            <p className="mt-3 leading-relaxed text-ink/70">
              Let the therapist know if the temperature feels uncomfortable.
              If you have a medical condition affecting sensation or are
              unsure whether heat is appropriate, seek medical advice before
              booking.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <h2 className="mt-14 font-serif text-2xl">
              What to ask before you book
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              SoulSpirit offers 60-, 90- and 120-minute sessions. Before
              confirming an appointment, ask:
            </p>
            <ul className="mt-4 space-y-3 text-ink/70">
              {[
                "Which treatment fits my pressure preference?",
                "What is the price after the current discount?",
                "What does the session include?",
                "Is my preferred date and time available?",
              ].map((q) => (
                <li key={q} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bronze" />
                  {q}
                </li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed text-ink/70">
              Share relevant health conditions, recent injuries or other
              concerns with the team. Persistent, worsening or unexplained
              pain needs assessment by a healthcare professional; a spa
              appointment should not delay that care.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <h2 className="mt-14 font-serif text-2xl">
              Make time for rest between appointments, too
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              A spa session can be one part of how you unwind. It should sit
              alongside everyday habits such as taking comfortable movement
              breaks, reviewing your desk setup and making time for sleep.
              Avoid treating a single appointment as a permanent fix for the
              demands of your working day.
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <h2 className="mt-14 font-serif text-2xl">
              Book a massage in Khairatabad
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              SoulSpirit Spa offers private treatment rooms and a choice of
              massage styles in Khairatabad, Hyderabad. The current
              advertised offer is 15% off spa services. Ask the team to
              confirm pricing, availability and applicable offer terms when
              you book.
            </p>
          </Reveal>

          <Reveal delay={0.38}>
            <div className="mt-8 border border-line p-8">
              <dl className="space-y-4 text-sm text-ink/70">
                <div>
                  <dt className="text-xs uppercase tracking-widest2 text-ink/40">Call</dt>
                  <dd className="mt-1">
                    <a href={siteConfig.contact.phoneHref} className="link-underline">
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest2 text-ink/40">WhatsApp</dt>
                  <dd className="mt-1">
                    Ask about treatments and available appointments
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest2 text-ink/40">Visit</dt>
                  <dd className="mt-1">
                    {siteConfig.location.addressLine}, {siteConfig.location.city},{" "}
                    {siteConfig.location.region} {siteConfig.location.postalCode}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest2 text-ink/40">Hours</dt>
                  <dd className="mt-1">
                    {siteConfig.hours[0]?.day}: {siteConfig.hours[0]?.time}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CallButton label="Call to Ask" className="w-full justify-center sm:w-auto" />
                <WhatsAppButton
                  label="WhatsApp to Ask"
                  message="Hi SoulSpirit Spa, I would like to check massage availability and the 15% offer."
                  className="w-full justify-center sm:w-auto"
                />
              </div>

              <Link
                href="/contact"
                className="link-underline mt-5 inline-block text-xs uppercase tracking-widest2 text-ink/50"
              >
                View location and directions
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.42}>
            <h2 className="mt-14 font-serif text-xl">Sources</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink/50">
              <li>
                <a
                  href="https://globalwellnessinstitute.org/global-wellness-institute-blog/2026/04/06/massage-makes-me-healthy-and-happy-initiative-trends-for-2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Global Wellness Institute: Massage trends for 2026
                </a>
              </li>
              <li>
                <a
                  href="https://www.nccih.nih.gov/health/massage-therapy-what-you-need-to-know"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  NCCIH: Massage Therapy — What You Need To Know
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
