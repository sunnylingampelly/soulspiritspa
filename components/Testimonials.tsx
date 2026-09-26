import Reveal from "./Reveal";
import { siteConfig } from "@/lib/site-config";

// ---------------------------------------------------------------------------
// No real reviews have been supplied yet — do not fabricate quotes, names,
// ratings or dates, and do not remove this empty state to hide fabricated
// ones in its place. Once real, attributable Google reviews are available
// (copied verbatim, with the guest's actual name and rating), add them here
// and they will render as genuine Google review cards.
// ---------------------------------------------------------------------------
type Testimonial = {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  timeAgo: string;
  isSample?: boolean;
};
const testimonials: Testimonial[] = [];

function GoogleLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={className}>
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill={filled ? "#FBBC04" : "#E3E3E3"}>
      <path d="M12 2.75l2.76 5.6 6.18.9-4.47 4.36 1.06 6.15L12 16.9l-5.53 2.86 1.06-6.15L3.06 9.25l6.18-.9L12 2.75z" />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={i <= rating} />
      ))}
    </div>
  );
}

function ReviewCard({ t }: { t: Testimonial }) {
  const initial = t.name.trim().charAt(0).toUpperCase();
  return (
    <div className="relative rounded-lg border border-black/10 bg-white p-5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
      {t.isSample && (
        <span className="absolute -top-2.5 right-4 rounded-full bg-bronze px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
          Sample
        </span>
      )}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bronze font-medium text-white">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[#1f1f1f]">{t.name}</p>
          <div className="mt-0.5 flex items-center gap-2">
            <StarRow rating={t.rating} />
            <span className="text-xs text-[#70757a]">{t.timeAgo}</span>
          </div>
        </div>
        <GoogleLogo className="mt-0.5 h-5 w-5 shrink-0" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#3c4043]">{t.text}</p>
    </div>
  );
}

export default function Testimonials() {
  const { rating, reviewCount, profileUrl } = siteConfig.googleRating;
  const hasRating = !!(rating && reviewCount);

  return (
    <section className="section-pad bg-sand">
      <div className="container-luxe text-center">
        <Reveal>
          <p className="eyebrow">Guest Reflections</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 text-display-md font-serif text-balance">
            What guests say on Google.
          </h2>
        </Reveal>

        {hasRating && (
          <Reveal delay={0.1}>
            <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-lg border border-black/10 bg-white px-5 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
              <GoogleLogo className="h-6 w-6" />
              <span className="font-serif text-xl text-[#1f1f1f]">{rating!.toFixed(1)}</span>
              <StarRow rating={Math.round(rating!)} />
              <span className="text-sm text-[#70757a]">
                {reviewCount} review{reviewCount === 1 ? "" : "s"}
              </span>
              {profileUrl && (
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline ml-1 text-xs uppercase tracking-widest2 text-bronze"
                >
                  See All
                </a>
              )}
            </div>
          </Reveal>
        )}

        {testimonials.length > 0 ? (
          <>
            {testimonials.every((t) => t.isSample) && (
              <Reveal delay={0.1}>
                <p className="mx-auto mt-6 max-w-md text-balance text-xs text-stone">
                  Layout preview only — the cards below are sample placeholders,
                  not real guest reviews. They&apos;ll be replaced with genuine,
                  verbatim Google reviews once shared.
                </p>
              </Reveal>
            )}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.name + i} delay={0.14 + i * 0.08}>
                  <ReviewCard t={t} />
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <Reveal delay={0.16}>
            <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 rounded-lg border border-dashed border-black/15 bg-white/60 px-8 py-10">
              <GoogleLogo className="h-7 w-7 opacity-60" />
              <p className="text-balance text-sm text-[#3c4043]">
                Guest reviews will appear here once shared, drawn directly
                from our Google Business Profile.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
