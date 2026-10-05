// A slim, permanent announcement strip above the nav. Pure CSS marquee
// (no framer-motion, no scroll-linking) so it's always running reliably,
// regardless of hydration timing or scroll-event quirks elsewhere on the
// site — it's just a compositor-driven CSS animation.
const MESSAGE = "15% Off Every Service — Every Day";

function Segment() {
  return (
    <span className="flex shrink-0 items-center" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="mx-6 flex items-center gap-2 whitespace-nowrap text-[10px] uppercase tracking-widest2 text-ivory sm:text-xs"
        >
          <span className="text-champagne">✦</span>
          {MESSAGE}
        </span>
      ))}
    </span>
  );
}

export default function OfferBanner() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-8 overflow-hidden bg-gradient-to-r from-bronze-dark via-bronze to-bronze-dark sm:h-9"
      role="note"
      aria-label={MESSAGE}
    >
      <div className="flex h-full w-max items-center" style={{ animation: "marquee 26s linear infinite" }}>
        <Segment />
        <Segment />
      </div>
    </div>
  );
}
