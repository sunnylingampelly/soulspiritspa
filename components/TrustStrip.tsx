import { siteConfig } from "@/lib/site-config";
import { CallButton, WhatsAppButton } from "./CTAButtons";

export default function TrustStrip() {
  const { rating, reviewCount } = siteConfig.googleRating;
  const hasRating = !!(rating && reviewCount);
  const tags = [...siteConfig.serviceTags, ...siteConfig.trustTags];

  return (
    <div className="hidden border-b border-line/70 bg-cream sm:block">
      <div className="container-luxe flex flex-col items-center gap-4 py-4 sm:flex-row sm:justify-between sm:gap-6">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          {hasRating && (
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest2 text-ink">
              <span aria-hidden className="text-bronze">★</span>
              {rating!.toFixed(1)} · {reviewCount} Google Reviews
            </span>
          )}
          <CallButton size="sm" />
          <WhatsAppButton size="sm" />
          <a
            href={siteConfig.location.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-xs uppercase tracking-widest2 text-ink/60"
          >
            Get Directions
          </a>
        </div>

        <p className="max-w-xl text-center text-[11px] uppercase tracking-widest2 text-ink/40 sm:text-right">
          {tags.join(" · ")}
        </p>
      </div>
    </div>
  );
}
