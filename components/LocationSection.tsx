import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";
import { CallButton, WhatsAppButton } from "./CTAButtons";
import { siteConfig } from "@/lib/site-config";

export default function LocationSection() {
  return (
    <section id="location" className="section-pad bg-cream">
      <div className="container-luxe grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">Visit Us</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-display-md font-serif text-balance">
              {siteConfig.location.neighborhood}, {siteConfig.location.city}.
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 space-y-6 text-ink/75">
              <div>
                <p className="eyebrow text-ink/40">Address</p>
                <p className="mt-2 max-w-sm">
                  {siteConfig.location.addressLine}, {siteConfig.location.city},{" "}
                  {siteConfig.location.region} {siteConfig.location.postalCode}
                </p>
              </div>
              <div className="hidden sm:block">
                <p className="eyebrow text-ink/40">Nearby</p>
                <p className="mt-2 max-w-sm">
                  Minutes from {siteConfig.nearbyAreas.slice(1).join(" and ")}, and
                  easily reached from across central Hyderabad.
                </p>
              </div>
              <div>
                <p className="eyebrow text-ink/40">Phone</p>
                <p className="mt-2">{siteConfig.contact.phoneDisplay}</p>
              </div>
              <div className="hidden sm:block">
                <p className="eyebrow text-ink/40">WhatsApp</p>
                <p className="mt-2">{siteConfig.contact.phoneDisplay}</p>
              </div>
              <div>
                <p className="eyebrow text-ink/40">Hours</p>
                <div className="mt-2 space-y-1">
                  {siteConfig.hours.map((h) => (
                    <p key={h.day}>
                      {h.day}: {h.time}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <CallButton className="w-full sm:w-auto" />
              <WhatsAppButton className="w-full sm:w-auto" />
              <a
                href={siteConfig.location.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full justify-center sm:w-auto"
              >
                Get Directions
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="aspect-[4/3] w-full overflow-hidden bg-sand lg:aspect-auto lg:h-full">
            {siteConfig.location.mapEmbedUrl ? (
              <iframe
                src={siteConfig.location.mapEmbedUrl}
                className="h-full w-full"
                loading="lazy"
                title="SoulSpirit Spa location map"
              />
            ) : (
              <ImagePlaceholder
                label="Google Maps embed — pending exact location"
                tone="stone"
                className="h-full w-full"
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
