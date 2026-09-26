import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";
import { siteImages } from "@/lib/images";

const steps = [
  {
    n: "01",
    title: "Arrive",
    text: "Leave the noise at the door. A warm welcome, a quiet room.",
    tone: "cream" as const,
    image: siteImages.facialCandle,
  },
  {
    n: "02",
    title: "Unwind",
    text: "Settle in. Let the pace of the day slow to nothing.",
    tone: "sand" as const,
    image: siteImages.heroMobile,
  },
  {
    n: "03",
    title: "Restore",
    text: "Skilled hands, considered touch, full attention.",
    tone: "stone" as const,
    image: siteImages.compressTherapist,
  },
  {
    n: "04",
    title: "Renew",
    text: "Leave lighter than you arrived, at your own pace.",
    tone: "charcoal" as const,
    image: siteImages.backMassageTable,
  },
];

export default function JourneySection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`${compact ? "py-section" : "section-pad"} bg-charcoal`}>
      <div className="container-luxe">
        <Reveal>
          <p className="eyebrow text-champagne">The Journey</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-xl text-display-md font-serif text-ivory text-balance">
            From arrival to renewal.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={0.1 + i * 0.08} className="bg-ink">
              <div className="group relative flex h-full flex-col">
                <ImagePlaceholder
                  label={`${s.title} — SoulSpirit guest journey`}
                  tone={s.tone}
                  src={s.image}
                  className="aspect-[3/4] w-full transition-transform duration-1000 ease-luxe group-hover:scale-[1.04]"
                />
                <div className="flex flex-1 flex-col justify-end p-6">
                  <span className="font-serif text-xl text-champagne/70">{s.n}</span>
                  <h3 className="mt-2 font-serif text-2xl text-ivory">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/60">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
