import { siteConfig } from "@/lib/site-config";
import { CallButton, WhatsAppButton } from "./CTAButtons";

// A trust/local-SEO strip right after the hero — on every breakpoint now
// (it used to be desktop-only). The Call/WhatsApp/Directions row stays
// desktop-only since the hero already puts those same three CTAs in front
// of mobile guests; what mobile gains here is the trust/hours/offer line.
export default function TrustStrip() {
  const { rating, reviewCount } = siteConfig.googleRating;
  const hasRating = !!(rating && reviewCount);
  const tags = [...siteConfig.serviceTags, ...siteConfig.trustTags];

  return (
    <div className="border-b border-line/70 bg-cream">
      <div className="container-luxe flex flex-col gap-3 py-4 sm:gap-2">
        <div className="hidden flex-row items-center justify-between gap-6 sm:flex">
          <div className="flex flex-wrap items-center gap-3">
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

          <p className="max-w-xl text-right text-[11px] uppercase tracking-widest2 text-ink/40">
            {tags.join(" · ")}
          </p>
        </div>

        {/* Trust/hours/offer line — the one part of this strip mobile
            guests see too, since their Call/WhatsApp/Directions CTAs
            already sit right above in the hero. */}
        <div className="flex flex-col items-center gap-1.5 text-center sm:hidden">
          <p className="text-[11px] uppercase leading-relaxed tracking-widest2 text-ink/50">
            {tags.join(" · ")}
          </p>
          <p className="text-[11px] text-ink/60">
            Open {siteConfig.hours[0].day} &middot; {siteConfig.hours[0].time} &middot; 15%
            Off Every Service
          </p>
        </div>
      </div>
    </div>
  );
}
