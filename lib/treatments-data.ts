// ---------------------------------------------------------------------------
// TREATMENT MENU
// ---------------------------------------------------------------------------
// Real menu — names, durations and prices as supplied. Descriptions,
// benefits, "what to expect" and FAQs are written in SoulSpirit's own
// voice rather than reproduced from any external source, and avoid
// medical claims per the brand's content guidelines.
// ---------------------------------------------------------------------------

export type PricingTier = {
  minutes: number;
  price: number;
};

export type Treatment = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  tagline: string;
  description: string;
  tiers: PricingTier[];
  benefits: string[];
  whatToExpect: string[];
  whoItsFor: string;
  faqs: { q: string; a: string }[];
  signature?: boolean;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "massage",
    name: "Massage",
    description: "Time-honoured techniques to ease tension and restore flow.",
  },
  {
    slug: "body-rituals",
    name: "Body Rituals",
    description: "Full-body rituals that renew the skin and quiet the mind.",
  },
  {
    slug: "facials",
    name: "Facials",
    description: "Gentle, restorative rituals for the skin.",
  },
  {
    slug: "couples-experiences",
    name: "Couples Experiences",
    description: "A shared escape, side by side.",
  },
  {
    slug: "wellness",
    name: "Wellness",
    description: "Rituals that support balance beyond the treatment room.",
  },
];

export function formatINR(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatDurations(t: Treatment) {
  return t.tiers.map((tier) => tier.minutes).join(" / ");
}

export function startingPrice(t: Treatment) {
  return formatINR(Math.min(...t.tiers.map((tier) => tier.price)));
}

export const treatments: Treatment[] = [
  {
    slug: "thai-massage-dry",
    name: "Thai Massage (Dry)",
    category: "Massage",
    categorySlug: "massage",
    signature: true,
    tagline: "Pressure points · stretching · release",
    description:
      "A traditional dry massage combining pressure-point work with gentle assisted stretching, easing tension through the whole body.",
    tiers: [
      { minutes: 60, price: 2200 },
      { minutes: 90, price: 3000 },
      { minutes: 120, price: 3800 },
    ],
    benefits: [
      "Eases deep-seated tension",
      "Improves flexibility and ease of movement",
      "A grounding, full-body reset",
    ],
    whatToExpect: [
      "Performed fully clothed, on a floor mat",
      "Rhythmic pressure-point work and assisted stretches",
      "A slow, grounded finish",
    ],
    whoItsFor:
      "Guests who want an active, stretch-based release rather than a purely gentle massage.",
    faqs: [
      { q: "Do I need to undress for this treatment?", a: "No — Thai massage is performed fully clothed in loose, comfortable clothing." },
    ],
  },
  {
    slug: "aromatherapy-massage",
    name: "Aromatherapy Massage",
    category: "Massage",
    categorySlug: "massage",
    tagline: "Essential oils · relaxation",
    description:
      "A calming full-body massage using pure essential oils, chosen to soothe the senses as much as the body.",
    tiers: [
      { minutes: 60, price: 2400 },
      { minutes: 90, price: 3400 },
      { minutes: 120, price: 4200 },
    ],
    benefits: [
      "Engages the senses",
      "Deepens relaxation",
      "Leaves skin softly scented",
    ],
    whatToExpect: [
      "A short scent consultation to choose your oil blend",
      "A gentle, full-body massage",
      "A quiet moment to rest before you leave",
    ],
    whoItsFor: "Guests who want their massage to feel like a full sensory escape.",
    faqs: [{ q: "Can I choose my scent?", a: "Yes, your therapist will guide you to a blend that suits you." }],
  },
  {
    slug: "swedish-massage",
    name: "Swedish Massage",
    category: "Massage",
    categorySlug: "massage",
    tagline: "Gentle · flowing · restorative",
    description:
      "A classic, gentle massage using long, flowing strokes to soothe the body and calm the mind.",
    tiers: [
      { minutes: 60, price: 2700 },
      { minutes: 90, price: 3500 },
      { minutes: 120, price: 4200 },
    ],
    benefits: ["Soothes the nervous system", "Eases everyday tension", "Leaves you deeply rested"],
    whatToExpect: [
      "Soft lighting and quiet music",
      "Long, rhythmic strokes at a gentle pressure",
      "A slow return to the everyday",
    ],
    whoItsFor: "Guests seeking a lighter, more gentle touch.",
    faqs: [{ q: "Is this a light-pressure massage?", a: "Yes, pressure is gentle throughout, though it can be adjusted." }],
  },
  {
    slug: "balinese-massage",
    name: "Balinese Massage",
    category: "Massage",
    categorySlug: "massage",
    tagline: "Deep pressure · rhythm · release",
    description:
      "A traditional Balinese technique blending deep, rhythmic strokes to work through tension and stubborn knots.",
    tiers: [
      { minutes: 60, price: 2800 },
      { minutes: 90, price: 3600 },
      { minutes: 120, price: 4400 },
    ],
    benefits: ["Targets stubborn tension", "Improves circulation through movement", "Leaves the body feeling looser"],
    whatToExpect: [
      "A conversation about areas that need attention",
      "Deep, rhythmic strokes with warm oil",
      "Aftercare guidance before you leave",
    ],
    whoItsFor: "Guests carrying tension who want firmer, more deliberate pressure.",
    faqs: [],
  },
  {
    slug: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    category: "Massage",
    categorySlug: "massage",
    tagline: "Release · restore · recover",
    description:
      "A firmer, focused massage that works into deeper layers of muscle to release built-up tension.",
    tiers: [
      { minutes: 60, price: 3000 },
      { minutes: 90, price: 4000 },
      { minutes: 120, price: 4700 },
    ],
    benefits: ["Targets chronic areas of tension", "Supports recovery", "Improves ease of movement"],
    whatToExpect: [
      "A conversation about neck, back and shoulder tension",
      "Firm, focused pressure throughout the session",
      "Aftercare guidance before you leave",
    ],
    whoItsFor: "Guests carrying tension in the neck, back or shoulders.",
    faqs: [
      { q: "Will this be painful?", a: "Pressure is adjusted to your comfort throughout, always tell your therapist what feels right." },
    ],
  },
  {
    slug: "yantra-massage",
    name: "Yantra Massage",
    category: "Massage",
    categorySlug: "massage",
    tagline: "Stretch · oil · deep release",
    description:
      "A therapeutic blend of stretching and deep massage with warm oil, easing tight joints and muscles into a deeper state of ease.",
    tiers: [
      { minutes: 60, price: 3300 },
      { minutes: 90, price: 4300 },
      { minutes: 120, price: 4800 },
    ],
    benefits: ["Releases tight joints and muscles", "Combines stretch and oil massage", "A deeper state of ease"],
    whatToExpect: [
      "Warm oil applied throughout",
      "A combination of stretching and deep massage",
      "A slow, settled finish",
    ],
    whoItsFor: "Guests wanting a more active, stretch-led session alongside massage.",
    faqs: [],
  },
  {
    slug: "candle-massage",
    name: "Candle Massage",
    category: "Massage",
    categorySlug: "massage",
    tagline: "Warm oil · candlelight · softness",
    description:
      "A warming massage using melted candle oil, leaving skin soft and the senses quietly soothed.",
    tiers: [
      { minutes: 60, price: 3500 },
      { minutes: 90, price: 4500 },
      { minutes: 120, price: 5000 },
    ],
    benefits: ["Leaves skin feeling soft", "A warm, soothing sensory experience", "Deeply relaxing"],
    whatToExpect: [
      "A massage candle warmed to a comfortable temperature",
      "Warm oil worked into the skin",
      "A soft, unhurried finish",
    ],
    whoItsFor: "Guests who love warmth and a softer, sensory-led experience.",
    faqs: [{ q: "Is the oil too hot?", a: "The candle is warmed to a safe, comfortable temperature and always checked with you first." }],
  },
  {
    slug: "lomi-lomi-4-hands",
    name: "Lomi Lomi (4 Hands Massage)",
    category: "Massage",
    categorySlug: "massage",
    tagline: "Four hands · lavender · ylang ylang",
    description:
      "Two therapists work in gentle synchrony using lavender and ylang ylang oils, palm pressure and flowing strokes for a fully immersive experience.",
    tiers: [
      { minutes: 60, price: 4800 },
      { minutes: 90, price: 5800 },
      { minutes: 120, price: 7000 },
    ],
    benefits: ["A fully immersive, synchronised massage", "Calming lavender and ylang ylang oils", "Deep, total relaxation"],
    whatToExpect: [
      "Two therapists working in synchrony",
      "Flowing palm pressure with lavender and ylang ylang oil",
      "A long, unhurried finish",
    ],
    whoItsFor: "Guests wanting the most immersive massage experience on the menu.",
    faqs: [{ q: "Is it strange having two therapists?", a: "Most guests find the synchronised rhythm even more relaxing than a single-handed massage." }],
  },
  {
    // Pricing below is an estimate in line with the rest of the menu's
    // ladder, pending the business confirming the actual rate — it is
    // never shown on the site (every treatment card says "call or
    // WhatsApp for pricing"), so nothing customer-facing depends on it.
    slug: "hot-stone-therapy",
    name: "Hot Stone Therapy",
    category: "Massage",
    categorySlug: "massage",
    tagline: "Heated stones · deep warmth · release",
    description:
      "Smooth, heated stones are worked into the muscles alongside warm oil, letting the heat ease tension deeper than pressure alone.",
    tiers: [
      { minutes: 60, price: 3200 },
      { minutes: 90, price: 4200 },
      { minutes: 120, price: 4900 },
    ],
    benefits: ["Warmth that eases deep muscle tension", "A slower, grounding rhythm", "Leaves muscles feeling loosened, not just relaxed"],
    whatToExpect: [
      "Smooth basalt stones warmed to a comfortable temperature",
      "Stones worked into the back, shoulders and legs alongside warm oil",
      "A settled, unhurried finish",
    ],
    whoItsFor: "Guests carrying deep tension who want warmth alongside pressure.",
    faqs: [{ q: "How hot are the stones?", a: "They're warmed to a safe, comfortable temperature and checked with you before use." }],
  },
  {
    // Pricing here reflects two guests, each with their own therapist,
    // side by side — same estimate/confirmation note as above.
    slug: "couple-massage",
    name: "Couple Massage",
    category: "Couples Experiences",
    categorySlug: "couples-experiences",
    tagline: "Side by side · shared calm",
    description:
      "Two guests, two therapists, one private room — a massage taken side by side, each paced to the individual, at the same unhurried time.",
    tiers: [
      { minutes: 60, price: 4600 },
      { minutes: 90, price: 5800 },
      { minutes: 120, price: 6800 },
    ],
    benefits: ["A shared experience without sharing the pressure or pace", "Two therapists, one private room", "A relaxed, unhurried finish together"],
    whatToExpect: [
      "A private room set up for two",
      "Two therapists working at the same time, each tailored to that guest",
      "Time afterward to rest together before you leave",
    ],
    whoItsFor: "Couples, friends or family wanting to relax together without compromising on their own pressure or pace.",
    faqs: [{ q: "Can we each choose a different massage?", a: "Yes — each guest's treatment and pressure is tailored individually, even though you're side by side." }],
  },
];

export function getTreatmentBySlug(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function getTreatmentsByCategory(categorySlug: string) {
  return treatments.filter((t) => t.categorySlug === categorySlug);
}

export function getRelatedTreatments(slug: string, count = 3) {
  const current = getTreatmentBySlug(slug);
  if (!current) return [];
  return treatments
    .filter((t) => t.slug !== slug && t.categorySlug === current.categorySlug)
    .concat(treatments.filter((t) => t.slug !== slug && t.categorySlug !== current.categorySlug))
    .slice(0, count);
}
