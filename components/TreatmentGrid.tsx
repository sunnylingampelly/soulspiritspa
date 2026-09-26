"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";
import { CallButton, WhatsAppButton } from "./CTAButtons";
import {
  categories,
  treatments as allTreatments,
  formatDurations,
  getTreatmentsByCategory,
  type Treatment,
} from "@/lib/treatments-data";
import { treatmentImageForSlug } from "@/lib/images";

export default function TreatmentGrid({
  treatments = allTreatments,
  showFilters = true,
}: {
  treatments?: Treatment[];
  showFilters?: boolean;
}) {
  const availableCategories = useMemo(
    () => categories.filter((c) => getTreatmentsByCategory(c.slug).length > 0),
    []
  );

  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all" ? treatments : treatments.filter((t) => t.categorySlug === active);

  return (
    <div>
      {showFilters && availableCategories.length > 1 && (
        <Reveal>
          <div className="mb-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActive("all")}
              className={`tap-target border px-5 py-2 text-xs uppercase tracking-widest2 transition-colors duration-300 ${
                active === "all"
                  ? "border-ink bg-ink text-ivory"
                  : "border-line text-ink/60 hover:border-ink/40"
              }`}
            >
              All
            </button>
            {availableCategories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setActive(c.slug)}
                className={`tap-target border px-5 py-2 text-xs uppercase tracking-widest2 transition-colors duration-300 ${
                  active === c.slug
                    ? "border-ink bg-ink text-ivory"
                    : "border-line text-ink/60 hover:border-ink/40"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </Reveal>
      )}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t, i) => {
          const globalIndex = allTreatments.findIndex((x) => x.slug === t.slug);
          return (
            <Reveal key={t.slug} delay={(i % 6) * 0.05}>
              <article className="group flex h-full flex-col border border-line bg-ivory">
                <Link href={`/treatments/${t.slug}`} className="relative block overflow-hidden">
                  <ImagePlaceholder
                    label={`${t.name} — treatment in progress`}
                    tone={globalIndex % 2 === 0 ? "sand" : "stone"}
                    src={treatmentImageForSlug(t.slug)}
                    className="aspect-[4/3] w-full transition-transform duration-1000 ease-luxe group-hover:scale-[1.04]"
                  />
                  {t.signature && (
                    <span className="absolute left-4 top-4 bg-charcoal px-3 py-1 text-[10px] uppercase tracking-widest2 text-ivory">
                      Signature
                    </span>
                  )}
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow text-ink/40">{t.category}</p>
                  <h3 className="mt-2 font-serif text-xl">
                    <Link href={`/treatments/${t.slug}`} className="link-underline">
                      {t.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-widest2 text-bronze">{t.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">{t.description}</p>
                  <p className="mt-4 text-xs text-ink/40">
                    <span className="uppercase tracking-widest2">For:</span> {t.whoItsFor}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-widest2 text-ink/40">
                    {formatDurations(t)} min · call or WhatsApp for pricing
                  </p>

                  <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
                    <CallButton size="sm" className="w-full justify-center sm:flex-1" />
                    <WhatsAppButton
                      size="sm"
                      label="WhatsApp"
                      message={`Hi SoulSpirit Spa, I would like to enquire about the ${t.name}.`}
                      className="w-full justify-center sm:flex-1"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
