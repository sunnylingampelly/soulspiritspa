import Link from "next/link";
import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";
import { treatments, formatDurations } from "@/lib/treatments-data";
import { treatmentImageForSlug } from "@/lib/images";

// Homepage menu: just a photo, the name and durations per treatment — two
// to a row on mobile. Prices and full descriptions live on each
// treatment's own page.
export default function SignatureTreatments() {
  return (
    <section id="treatments" className="section-pad bg-ivory">
      <div className="container-luxe">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Reveal>
              <h2 className="text-display-sm font-serif sm:hidden">Our Treatments</h2>
              <p className="eyebrow hidden sm:block">Our Services</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 hidden max-w-xl text-display-md font-serif text-balance sm:block">
                Rituals chosen with care.
              </h2>
            </Reveal>
          </div>
          <Link
            href="/treatments"
            className="link-underline shrink-0 text-xs uppercase tracking-widest2 text-ink/70"
          >
            <span className="sm:hidden">View all</span>
            <span className="hidden sm:inline">Full menu &amp; pricing</span>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-4">
          {treatments.map((t, i) => (
            <Link
              key={t.slug}
              href={`/treatments/${t.slug}`}
              className="group flex flex-col border border-line bg-ivory"
            >
              <div className="overflow-hidden">
                <ImagePlaceholder
                  label={t.name}
                  tone={i % 2 === 0 ? "sand" : "stone"}
                  src={treatmentImageForSlug(t.slug)}
                  className="aspect-[4/3] w-full transition-transform duration-1000 ease-luxe group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-5">
                <h3 className="font-serif text-base leading-snug sm:text-lg">{t.name}</h3>
                <p className="mt-1 text-[11px] text-ink/55 sm:text-xs">
                  {formatDurations(t)} min
                </p>
                <span className="mt-auto pt-3">
                  <span className="flex w-full items-center justify-center border border-ink/25 py-2.5 text-[10px] font-semibold uppercase tracking-widest2 text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-ivory sm:text-xs">
                    View Details
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
