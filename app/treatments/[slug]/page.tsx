import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import {
  treatments,
  getTreatmentBySlug,
  getRelatedTreatments,
  formatDurations,
  formatINR,
} from "@/lib/treatments-data";
import { siteConfig } from "@/lib/site-config";
import { CallButton, WhatsAppButton } from "@/components/CTAButtons";
import { treatmentImageForSlug } from "@/lib/images";

type Params = { slug: string };

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) return {};
  return {
    title: `${treatment.name} in Khairatabad`,
    description: treatment.description,
    alternates: { canonical: `/treatments/${treatment.slug}` },
  };
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) notFound();

  const related = getRelatedTreatments(slug, 3);

  const faqJsonLd =
    treatment.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: treatment.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Treatments",
        item: `${siteConfig.url}/treatments`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: treatment.name,
        item: `${siteConfig.url}/treatments/${treatment.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <section className="relative flex h-[70vh] min-h-[420px] items-end overflow-hidden bg-charcoal">
        <ImagePlaceholder
          label={`${treatment.name} — treatment in progress`}
          tone="charcoal"
          src={treatmentImageForSlug(treatment.slug)}
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/10" />
        {/* Scrim behind the nav, independent of the treatment photo's own
            brightness — some rotation images (oils, towels) are quite
            light at the top. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/55 to-transparent" />
        <div className="container-luxe relative z-10 pb-16 pt-32">
          <p className="eyebrow text-champagne">{treatment.category}</p>
          <h1 className="mt-4 max-w-2xl text-display-lg font-serif text-ivory text-balance">
            {treatment.name} in Khairatabad
          </h1>
          <p className="mt-4 text-sm uppercase tracking-widest2 text-ivory/70">
            {treatment.tagline}
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-luxe grid grid-cols-1 gap-16 lg:grid-cols-[1fr_360px]">
          <div className="order-2 lg:order-1">
            <Reveal>
              <p className="max-w-prose text-lg leading-relaxed text-ink/75">
                {treatment.description}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-14 font-serif text-2xl">Benefits</h2>
              <ul className="mt-5 space-y-3">
                {treatment.benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-ink/70">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bronze" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <h2 className="mt-14 font-serif text-2xl">What to Expect</h2>
              <ol className="mt-5 space-y-4">
                {treatment.whatToExpect.map((step, i) => (
                  <li key={step} className="flex gap-4 text-ink/70">
                    <span className="font-serif text-bronze">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="mt-14 font-serif text-2xl">Who It&rsquo;s For</h2>
              <p className="mt-4 max-w-prose text-ink/70">{treatment.whoItsFor}</p>
            </Reveal>

            {treatment.faqs.length > 0 && (
              <Reveal delay={0.26}>
                <h2 className="mt-14 font-serif text-2xl">Frequently Asked</h2>
                <div className="mt-5 divide-y divide-line">
                  {treatment.faqs.map((f) => (
                    <div key={f.q} className="py-5">
                      <p className="font-medium text-ink">{f.q}</p>
                      <p className="mt-2 text-sm text-ink/60">{f.a}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <aside className="border border-line p-8 lg:sticky lg:top-28">
              <p className="eyebrow text-ink/40">Duration &amp; Pricing</p>
              <dl className="mt-4 divide-y divide-line">
                {treatment.tiers.map((tier) => (
                  <div key={tier.minutes} className="flex items-baseline justify-between py-3">
                    <dt className="font-serif text-lg">{tier.minutes} minutes</dt>
                    <dd className="text-ink/70">{formatINR(tier.price)}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-ink/50">
                15% off every service — no coupon needed, just mention it when you book.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <CallButton label="Call to Book" className="w-full justify-center" />
                <WhatsAppButton
                  label="WhatsApp to Book"
                  message={`Hi SoulSpirit Spa, I would like to book the ${treatment.name}.`}
                  className="w-full justify-center"
                />
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-pad bg-cream">
          <div className="container-luxe">
            <Reveal>
              <p className="eyebrow">You Might Also Like</p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {related.map((t, i) => (
                <Reveal key={t.slug} delay={i * 0.06}>
                  <Link href={`/treatments/${t.slug}`} className="group block">
                    <ImagePlaceholder
                      label={`${t.name} — related treatment`}
                      tone={i % 2 === 0 ? "sand" : "stone"}
                      src={treatmentImageForSlug(t.slug)}
                      className="aspect-[4/3] w-full transition-transform duration-1000 ease-luxe group-hover:scale-[1.03]"
                    />
                    <h3 className="mt-4 font-serif text-xl">{t.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-widest2 text-ink/40">
                      {formatDurations(t)} min
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
