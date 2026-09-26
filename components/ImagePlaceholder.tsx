// ---------------------------------------------------------------------------
// ImagePlaceholder
// ---------------------------------------------------------------------------
// Renders a real photo (via `src`) with a consistent warm colour-grade so
// images pulled from different sources read as one shoot. Omit `src` and it
// falls back to a labelled gradient block — see IMAGE-BRIEF.md for the full
// shot list and how to swap in the real brand photography.
// ---------------------------------------------------------------------------

import Image from "next/image";

type Tone = "sand" | "charcoal" | "cream" | "stone";

const tones: Record<Tone, string> = {
  sand: "from-[#E4D9C4] via-[#D9CBAE] to-[#C6B58F]",
  cream: "from-[#F1E9DA] via-[#E7DAC0] to-[#D8C4A0]",
  charcoal: "from-[#3A342B] via-[#2A251E] to-[#1B1814]",
  stone: "from-[#C9BDA6] via-[#B4A585] to-[#8A7C68]",
};

export default function ImagePlaceholder({
  label,
  tone = "sand",
  className = "",
  ratio,
  src,
  priority = false,
  objectPosition,
}: {
  label: string;
  tone?: Tone;
  className?: string;
  ratio?: string;
  src?: string;
  priority?: boolean;
  objectPosition?: string;
}) {
  if (src) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        <Image
          src={src}
          alt={label}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="photo-grade object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden bg-gradient-to-br ${tones[tone]} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 flex items-end p-4 sm:p-6">
        <span
          className={`text-[10px] sm:text-[11px] uppercase tracking-widest2 ${
            tone === "charcoal" ? "text-ivory/50" : "text-ink/40"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
