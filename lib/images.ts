// ---------------------------------------------------------------------------
// SITE PHOTOGRAPHY — SoulSpirit's own images, from public/gallery/
// ---------------------------------------------------------------------------
// These are real photographs supplied directly by the client, not stock.
// Every path below is a local file under public/gallery/ — no external
// hosts, no licensing concerns, no risk of hotlink watermarks. See
// IMAGE-BRIEF.md for what each one shows and where it's placed.
// ---------------------------------------------------------------------------

export const siteImages = {
  // Desktop/web hero still — a real treatment in progress.
  heroDesktop: "/hero-soul.webp",

  // Same suite, portrait crop — used as the mobile hero video's poster
  // frame and as a still elsewhere on mobile-shaped slots.
  heroMobile: "/gallery/hero-mobile.webp",

  // A real therapist performing a herbal compress massage — the only shot
  // in the set with an identifiable face, used once, deliberately, off the
  // hero.
  compressTherapist: "/gallery/mobile-hero.webp",

  // A therapist greeting guests with a wai — used on the brand-intro
  // "welcome" section.
  welcomeGreeting: "/welcome.webp",

  // Two therapists greeting guests with a wai, portrait crop — the
  // mobile hero background (replacing the looping video).
  mobileHeroGreeting: "/mobile-hero-greeting.webp",

  footReflexology: "/gallery/gallery-01.png",
  ritualFlatlay: "/gallery/gallery-02.png",
  footMassageTherapist: "/gallery/gallery-03.png",
  toweledSetup: "/gallery/gallery-04.png",
  woodToolFootMassage: "/gallery/gallery-05.png",
  shoulderHandsCloseup: "/gallery/gallery-06.png",
  compressBackMassage: "/gallery/gallery-07.png",
  backMassageTable: "/gallery/gallery-08.png",
  facialCandle: "/gallery/gallery-09.jpg",
  backMassageFlower: "/gallery/gallery-10.jpg",

  // Treatment-specific shots, one per service on the menu, supplied
  // directly by the client — used on the treatment cards and detail
  // pages instead of the generic gallery rotation below.
  thaiMassage: "/thai-dry.webp",
  aromatherapyMassage: "/aroma.webp",
  swedishMassage: "/swedish.webp",
  balineseMassage: "/balinese.webp",
  deepTissueMassage: "/deep-tissue.webp",
  yantraMassage: "/tantra.webp",
  candleMassage: "/candle.webp",
  lomiLomiMassage: "/loma-lomi.webp",
  hotStoneTherapy: "/stone.webp",
  coupleMassage: "/couple.webp",
} as const;

export type SiteImageKey = keyof typeof siteImages;

// One dedicated photo per treatment slug — the source of truth for
// treatment cards and detail pages.
export const treatmentImages: Record<string, SiteImageKey> = {
  "thai-massage-dry": "thaiMassage",
  "aromatherapy-massage": "aromatherapyMassage",
  "swedish-massage": "swedishMassage",
  "balinese-massage": "balineseMassage",
  "deep-tissue-massage": "deepTissueMassage",
  "yantra-massage": "yantraMassage",
  "candle-massage": "candleMassage",
  "lomi-lomi-4-hands": "lomiLomiMassage",
  "hot-stone-therapy": "hotStoneTherapy",
  "couple-massage": "coupleMassage",
};

export function treatmentImageForSlug(slug: string) {
  const key = treatmentImages[slug];
  return key ? siteImages[key] : undefined;
}

// A rotation for the many repeating card slots (treatment grid, related
// treatments) — one distinct photo per treatment, eight treatments, eight
// photos, no repeats within the rotation itself.
export const treatmentImageRotation: SiteImageKey[] = [
  "footReflexology",
  "ritualFlatlay",
  "footMassageTherapist",
  "toweledSetup",
  "woodToolFootMassage",
  "shoulderHandsCloseup",
  "compressBackMassage",
  "backMassageTable",
];

export function treatmentImageAt(index: number) {
  return siteImages[
    treatmentImageRotation[index % treatmentImageRotation.length]
  ];
}
