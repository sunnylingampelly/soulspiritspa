// ---------------------------------------------------------------------------
// SITE CONFIG — SINGLE SOURCE OF TRUTH FOR NAP (Name / Address / Phone) DATA
// ---------------------------------------------------------------------------
// Every value below marked with [ ] brackets is a PLACEHOLDER.
// Replace with real business information before launch. Nothing here is
// invented — these are intentionally fake-looking so they are never
// mistaken for real data and accidentally published.
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "SoulSpirit Spa",
  shortName: "SoulSpirit",
  tagline: "Return to yourself.",
  url: "https://www.soulspiritspa.in", // [WEBSITE URL]
  locale: "en_IN",

  location: {
    city: "Hyderabad",
    region: "Telangana",
    country: "India",
    neighborhood: "Khairatabad",
    postalCode: "500004",
    addressLine:
      "Second Floor, Pillar No. A1180, 202, Khairatabad Road, above Union Bank of India, Taj Enclave, Khairatabad",
    // Pinned to the exact confirmed coordinates from the business's own
    // Google Maps listing (no API key needed for either link below).
    lat: 17.4105619,
    lng: 78.4611984,
    // The verified Google Business Profile listing itself (from its Maps
    // CID) — links straight to the real, reviewable listing rather than a
    // generic address search.
    googleMapsCid: "11004772594877310207",
    // The official embed generated directly from the Google Business
    // Profile listing (Share -> Embed a map) — the same place (matching
    // CID 0x3bcb978590f9cfeb:0x98b8ce5e879da4ff) as the two links above.
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15227.223727538769!2d78.43251085540628!3d17.4210986355471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb978590f9cfeb%3A0x98b8ce5e879da4ff!2ssoulspiritspa!5e0!3m2!1sen!2sin!4v1790423941664!5m2!1sen!2sin",
    mapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=17.4105619,78.4611984",
  },

  contact: {
    phoneDisplay: "+91 96765 25278",
    phoneHref: "tel:+919676525278",
    whatsappNumber: "919676525278",
    email: "soulspiritspa2026@gmail.com",
  },

  hours: [{ day: "Every Day", time: "10:30 AM – 9:30 PM" }],

  social: {
    instagram: "", // [INSTAGRAM URL]
    facebook: "", // [FACEBOOK URL]
  },

  // Only ever render this if both values are real — never fabricate a
  // rating or review count. Fill in once the Google Business Profile exists.
  googleRating: {
    rating: null as number | null, // e.g. 4.9
    reviewCount: null as number | null, // e.g. 90
    profileUrl: "https://www.google.com/maps?cid=11004772594877310207",
  },

  // Short, honest service tags shown in the trust strip below the hero.
  // Only list what SoulSpirit actually offers and actually does.
  serviceTags: [
    "Massage",
    "Body Rituals",
    "Couples Experiences",
  ],
  trustTags: [
    "Private Treatment Rooms",
    "Hygiene-First Environment",
    "Considered, Unhurried Care",
  ],

  nav: [
    { label: "Home", href: "/" },
    { label: "Treatments", href: "/treatments" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Membership", href: "/membership" },
    { label: "Booking", href: "/booking" },
    { label: "Contact", href: "/contact" },
  ],
};

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function to24Hour(time: string) {
  const m = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;
  let hours = parseInt(m[1], 10);
  const minutes = m[2];
  const meridiem = m[3].toUpperCase();
  if (meridiem === "AM" && hours === 12) hours = 0;
  if (meridiem === "PM" && hours !== 12) hours += 12;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

function daysForLabel(label: string): string[] {
  if (/every ?day/i.test(label)) return WEEKDAYS;
  const [start, end] = label.split(/[–-]/).map((s) => s.trim());
  const startIndex = WEEKDAYS.findIndex((d) => d.startsWith(start));
  const endIndex = WEEKDAYS.findIndex((d) => d.startsWith(end));
  if (startIndex === -1 || endIndex === -1) return [];
  return WEEKDAYS.slice(startIndex, endIndex + 1);
}

// Schema.org OpeningHoursSpecification entries, derived from `hours` above
// so the two never drift apart. Entries with unparseable time ranges (e.g.
// a still-placeholder "[OPENING HOURS]") are simply omitted.
export function openingHoursSpecification() {
  return siteConfig.hours
    .map((h) => {
      const [openStr, closeStr] = h.time.split(/[–-]/).map((s) => s.trim());
      const opens = openStr ? to24Hour(openStr) : null;
      const closes = closeStr ? to24Hour(closeStr) : null;
      const dayOfWeek = daysForLabel(h.day);
      if (!opens || !closes || dayOfWeek.length === 0) return null;
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        opens,
        closes,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
}

export function buildWhatsAppLink(message: string) {
  const base = siteConfig.contact.whatsappNumber
    ? `https://wa.me/${siteConfig.contact.whatsappNumber}`
    : "https://wa.me/"; // no number yet — link is inert until provided
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsAppMessage =
  "Hi SoulSpirit Spa, I would like to book a spa treatment.";
