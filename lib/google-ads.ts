// ---------------------------------------------------------------------------
// GOOGLE ADS CONVERSION TRACKING
// ---------------------------------------------------------------------------
// Single source of truth for Google Ads IDs/labels and the one shared
// helper used to send conversion events. Nothing here is invented: every
// value comes from NEXT_PUBLIC_* environment variables (see .env.example),
// and if they're missing or still placeholders, tracking quietly no-ops —
// it never blocks a call, a WhatsApp chat, or directions from working.
//
// The Google Ads *customer ID* (406-315-8174) is NOT used here — it is not
// a tag ID and gtag has no use for it. NEXT_PUBLIC_GOOGLE_ADS_ID must be the
// actual Google *tag* ID, which always looks like "AW-123456789".
// ---------------------------------------------------------------------------

// "booking" stays reserved for a genuinely *confirmed* booking (see
// trackConfirmedBooking below) — it must never fire on a click. For the
// lighter-weight "someone clicked a booking CTA" signal, use
// "booking_click" instead; it's a distinct conversion action/label.
export type ConversionKind =
  | "phone"
  | "booking"
  | "whatsapp"
  | "directions"
  | "booking_click"
  | "contact_form";

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";

const LABELS: Record<ConversionKind, string> = {
  phone: process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_LABEL ?? "",
  booking: process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_LABEL ?? "",
  whatsapp: process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL ?? "",
  directions: process.env.NEXT_PUBLIC_GOOGLE_ADS_DIRECTIONS_LABEL ?? "",
  booking_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CLICK_LABEL ?? "",
  contact_form: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_FORM_LABEL ?? "",
};

// A real Google tag ID is always "AW-" followed by digits. Anything else
// (empty, a customer ID like "406-315-8174", a copy-pasted placeholder)
// fails this check and tracking stays off.
const GOOGLE_ADS_ID_PATTERN = /^AW-\d+$/;

// Common placeholder text people paste into env files before they have the
// real value — treated the same as "missing".
const PLACEHOLDER_PATTERN = /^(your[-_]?|replace[-_]?|xxx|todo|changeme|label|example)/i;

function isPlaceholder(value: string): boolean {
  return value.trim() === "" || PLACEHOLDER_PATTERN.test(value.trim());
}

export function isGoogleAdsIdConfigured(): boolean {
  return GOOGLE_ADS_ID_PATTERN.test(GOOGLE_ADS_ID.trim()) && !isPlaceholder(GOOGLE_ADS_ID);
}

export function isConversionConfigured(kind: ConversionKind): boolean {
  return isGoogleAdsIdConfigured() && !isPlaceholder(LABELS[kind]);
}

export function getGoogleAdsId(): string {
  return GOOGLE_ADS_ID.trim();
}

function getSendTo(kind: ConversionKind): string {
  return `${getGoogleAdsId()}/${LABELS[kind].trim()}`;
}

let warnedMissingId = false;
const warnedMissingLabel = new Set<ConversionKind>();

// Dev-only, once-per-reason warnings — never thrown, never shown in
// production, never a reason to block navigation.
function devWarn(kind: ConversionKind | "id", message: string) {
  if (process.env.NODE_ENV === "production") return;
  if (kind === "id") {
    if (warnedMissingId) return;
    warnedMissingId = true;
  } else {
    if (warnedMissingLabel.has(kind)) return;
    warnedMissingLabel.add(kind);
  }
  // eslint-disable-next-line no-console
  console.warn(`[google-ads] ${message}`);
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function hasGtag(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/**
 * Sends a single Google Ads conversion event for `kind`, if (and only if)
 * both the tag ID and that conversion's label are configured with real
 * values. Never throws, never blocks the caller — a missing configuration
 * or a missing `gtag` (blocked by an ad blocker, consent not yet granted,
 * script still loading) simply results in a no-op plus a dev-only console
 * warning, so links and buttons keep working regardless.
 *
 * `onSent` fires once gtag's own `event_callback` runs *or* after a short
 * fallback timeout, whichever comes first — see `navigateAfterConversion`
 * for the common "track then navigate" case this exists for.
 */
export function sendConversion(
  kind: ConversionKind,
  options?: { params?: Record<string, unknown>; onSent?: () => void; fallbackMs?: number }
): boolean {
  const { params, onSent, fallbackMs = 300 } = options ?? {};

  if (!isGoogleAdsIdConfigured()) {
    devWarn(
      "id",
      "NEXT_PUBLIC_GOOGLE_ADS_ID is missing or invalid (expected \"AW-\" + digits — " +
        "this is the Google *tag* ID, not the Ads customer ID). Conversion tracking is disabled."
    );
    onSent?.();
    return false;
  }
  if (!isConversionConfigured(kind)) {
    devWarn(
      kind,
      `The "${kind}" conversion label is missing or still a placeholder. ` +
        `Set its NEXT_PUBLIC_GOOGLE_ADS_${kind.toUpperCase()}_LABEL env var once that ` +
        `conversion action exists in Google Ads.`
    );
    onSent?.();
    return false;
  }
  if (!hasGtag()) {
    devWarn(kind, "window.gtag is not available (script blocked or not yet loaded).");
    onSent?.();
    return false;
  }

  let called = false;
  const callOnce = () => {
    if (called) return;
    called = true;
    onSent?.();
  };

  // Base conversion params
  const conversionParams: Record<string, unknown> = {
    send_to: getSendTo(kind),
    event_callback: callOnce,
    ...params,
  };

  // Add value and currency for phone conversions
  if (kind === "phone") {
    conversionParams.value = 1.0;
    conversionParams.currency = "INR";
  }

  window.gtag!("event", "conversion", conversionParams);

  // gtag's event_callback is not guaranteed to fire (blocked request,
  // offline, the beacon racing page unload) — this fallback guarantees
  // `onSent` always runs so a caller using it to continue navigation is
  // never stuck waiting indefinitely.
  if (onSent) {
    setTimeout(callOnce, fallbackMs);
  }

  return true;
}

/**
 * The "track, then go" pattern for a same-tab outbound link (a `tel:`
 * click, chiefly): fire the conversion, then navigate — either once gtag's
 * callback confirms the hit was sent, or after `fallbackMs`, whichever is
 * first. If tracking isn't configured or gtag isn't available, this
 * navigates immediately with no artificial delay.
 */
export function navigateAfterConversion(
  href: string,
  kind: ConversionKind,
  options?: { params?: Record<string, unknown>; fallbackMs?: number }
) {
  const navigate = () => {
    window.location.href = href;
  };
  const sent = sendConversion(kind, {
    params: options?.params,
    onSent: navigate,
    fallbackMs: options?.fallbackMs,
  });
  if (!sent) {
    // sendConversion already called onSent synchronously in this case,
    // but only when onSent was provided — it was, so navigate() already
    // ran. Nothing further to do.
  }
}

// ---------------------------------------------------------------------------
// Confirmed-booking tracking — exposed, documented, and NOT wired up to
// anything yet. SoulSpirit's booking flow (components/BookingFlow.tsx) only
// ever reaches a local "request received" state asking the guest to confirm
// by phone or WhatsApp — there is no real booking backend that returns a
// genuinely confirmed appointment, so nothing on the site is allowed to
// call this. Wire it up only from server-confirmed booking data (e.g. a
// webhook or server action result), never from the booking form's own
// submit handler, "Book Now" clicks, or WhatsApp being opened.
//
// Usage once real booking confirmation exists:
//   trackConfirmedBooking(booking.id) // booking.id: an opaque, stable ID
//
// Deliberately takes no name/phone/email — never pass personal data here.
// ---------------------------------------------------------------------------
const TRACKED_BOOKINGS_KEY = "soulspirit:tracked-bookings";

function alreadyTracked(bookingId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.sessionStorage.getItem(TRACKED_BOOKINGS_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    return ids.includes(bookingId);
  } catch {
    return false;
  }
}

function markTracked(bookingId: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.sessionStorage.getItem(TRACKED_BOOKINGS_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    window.sessionStorage.setItem(
      TRACKED_BOOKINGS_KEY,
      JSON.stringify([...ids, bookingId].slice(-50))
    );
  } catch {
    // sessionStorage unavailable (private mode, disabled) — fall back to
    // firing every time rather than throwing; duplicate-prevention is a
    // best effort, not a hard guarantee, without a server-side record.
  }
}

/**
 * Fires the "Confirmed Booking" conversion exactly once per `bookingId`
 * (deduped via sessionStorage). Call this ONLY once a real booking system
 * confirms an appointment server-side — never on form submit, never on a
 * generic "thank you" page, never for a failed or pending booking.
 *
 * @param bookingId - A stable, opaque booking identifier (e.g. a database
 *   row ID or provider reference). Never a name, phone number or email.
 */
export function trackConfirmedBooking(bookingId: string): boolean {
  if (!bookingId) return false;
  if (alreadyTracked(bookingId)) return false;
  markTracked(bookingId);
  return sendConversion("booking", { params: { transaction_id: bookingId } });
}
