import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";
import { siteImages } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { CallButton, WhatsAppButton } from "./CTAButtons";

export default function BrandIntro() {
  return (
    <section className="section-pad bg-ivory">
      <div className="container-luxe grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <ImagePlaceholder
            label="A warm welcome from the SoulSpirit team"
            tone="cream"
            src={siteImages.welcomeGreeting}
            className="aspect-[4/5] w-full"
          />
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">The SoulSpirit Philosophy</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-display-md font-serif text-balance">
              A moment to pause.
              <br />A space to breathe.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-prose text-base leading-relaxed text-ink/70 sm:text-lg">
              In the middle of a city that never slows down, SoulSpirit
              offers a quiet place to reconnect with yourself.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/70 sm:text-lg">
              Every detail, from light to touch, is considered so you can
              simply arrive, and let go.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink/50">
              SoulSpirit Spa is located at {siteConfig.location.addressLine},{" "}
              {siteConfig.location.city}, {siteConfig.location.region}{" "}
              {siteConfig.location.postalCode}. Call or WhatsApp us to
              enquire about treatments and availability.
            </p>
          </Reveal>
          <Reveal delay={0.34}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <CallButton label="Call to Enquire" className="w-full sm:w-auto" />
              <WhatsAppButton
                label="WhatsApp Now"
                message="Hi SoulSpirit Spa, I would like to enquire about your treatments."
                className="w-full sm:w-auto"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
