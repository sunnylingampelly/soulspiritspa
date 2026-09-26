import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";
import { CallButton, WhatsAppButton } from "./CTAButtons";
import { siteImages } from "@/lib/images";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink text-center text-ivory">
      <div className="absolute inset-0">
        <ImagePlaceholder
          label="Candlelight, warm and still"
          tone="charcoal"
          src={siteImages.facialCandle}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-ink/80" />
      </div>

      <div className="container-luxe section-pad relative z-10">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-display-lg font-serif text-balance text-white">
            Leave the noise behind.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-ivory/60">
            Step into a quieter kind of luxury.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mx-auto mt-10 flex max-w-md flex-col justify-center gap-4 sm:max-w-none sm:flex-row sm:flex-wrap">
            <CallButton tone="light" className="w-full sm:w-auto" />
            <WhatsAppButton tone="light" className="w-full sm:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
