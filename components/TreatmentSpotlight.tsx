import Link from "next/link";
import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";
import { CallButton, WhatsAppButton } from "./CTAButtons";
import { getTreatmentBySlug, formatDurations } from "@/lib/treatments-data";
import { treatmentImageForSlug } from "@/lib/images";

export default function TreatmentSpotlight() {
  const treatment = getTreatmentBySlug("lomi-lomi-4-hands");
  if (!treatment) return null;

  return (
    <section className="bg-ink text-ivory">
      <div className="container-luxe grid grid-cols-1 items-center gap-0 lg:grid-cols-2">
        <Reveal>
          <ImagePlaceholder
            label={`${treatment.name} — two therapists working in synchrony`}
            tone="charcoal"
            src={treatmentImageForSlug(treatment.slug)}
            className="aspect-[4/5] w-full lg:aspect-square"
          />
        </Reveal>
        <div className="py-14 lg:pl-16 lg:py-0">
          <Reveal delay={0.05}>
            <p className="eyebrow text-champagne">Signature Ritual</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-display-sm font-serif text-balance text-ivory">
              {treatment.name}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md text-ivory/70">{treatment.description}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-5 text-xs uppercase tracking-widest2 text-ivory/40">
              {formatDurations(treatment)} min · call or WhatsApp for pricing
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <CallButton tone="light" label="Call to Book" />
              <WhatsAppButton
                tone="light"
                label="WhatsApp Enquiry"
                message={`Hi SoulSpirit Spa, I would like to enquire about the ${treatment.name}.`}
              />
              <Link
                href={`/treatments/${treatment.slug}`}
                className="link-underline text-xs uppercase tracking-widest2 text-ivory/70"
              >
                View Treatment
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
