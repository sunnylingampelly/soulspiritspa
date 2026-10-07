"use client";

import Link from "next/link";
import { buildWhatsAppLink, defaultWhatsAppMessage, siteConfig } from "@/lib/site-config";
import { sendConversion } from "@/lib/google-ads";

// ---------------------------------------------------------------------------
// The site's conversion CTAs: Call and WhatsApp are the two primary ones,
// used everywhere, consistently. Directions and Book Appointment are
// secondary — real destinations (Maps, the /booking page), not a generic
// "Book Now" placeholder.
//
// Call is solid (charcoal, or ivory on a dark background) — a primary,
// filled button. WhatsApp is an outlined button in the site's own palette;
// only the icon itself carries WhatsApp's brand green, so it reads as
// "WhatsApp" without dropping a saturated green block into an otherwise
// restrained ivory/charcoal/bronze page.
// ---------------------------------------------------------------------------

const WHATSAPP_GREEN = "#25D366";

export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={WHATSAPP_GREEN} className={className}>
      <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.46-.15-.65.15-.2.29-.75.93-.92 1.12-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.48.1-.2.05-.37-.02-.51-.08-.15-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.56-.01-.2 0-.51.07-.78.37-.26.29-1.02 1-1.02 2.43 0 1.43 1.05 2.82 1.19 3.01.15.2 2.06 3.14 4.99 4.4.7.3 1.24.48 1.66.61.7.22 1.34.19 1.84.11.56-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34z" />
      <path d="M12.02 2.5a9.5 9.5 0 0 0-8.17 14.35L2.5 21.5l4.8-1.3a9.5 9.5 0 1 0 4.72-17.7zm0 17.1a7.57 7.57 0 0 1-3.86-1.06l-.28-.16-2.85.77.76-2.78-.18-.29a7.6 7.6 0 1 1 6.41 3.52z" />
    </svg>
  );
}

export function MapPinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21.5c4.5-4.2 7.5-8.1 7.5-11.8a7.5 7.5 0 1 0-15 0c0 3.7 3 7.6 7.5 11.8z"
      />
      <circle cx="12" cy="9.7" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" strokeLinejoin="round" />
      <path strokeLinecap="round" d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
    </svg>
  );
}

type Tone = "dark" | "light";

const callToneClass: Record<Tone, string> = {
  // On a light/ivory page background.
  dark: "bg-charcoal text-ivory hover:bg-ink",
  // On a dark/charcoal page background.
  light: "bg-ivory text-ink hover:bg-champagne",
};

// Outline treatment for WhatsApp — the icon (fixed WhatsApp green, above)
// is the only thing carrying the brand colour; the button chrome matches
// whichever background it sits on, like Call's inverse.
const whatsappToneClass: Record<Tone, string> = {
  dark: "border border-ink/20 text-ink hover:border-[#25D366]/60 hover:bg-[#25D366]/5",
  light: "border border-ivory/30 text-ivory hover:border-[#25D366]/60 hover:bg-ivory/5",
};

// Outline treatment for Directions — same idea as WhatsApp's outline, but
// neutral (no brand colour to carry), so it reads as the third, secondary
// action next to the two primary conversion buttons.
const directionsToneClass: Record<Tone, string> = {
  dark: "border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/5",
  light: "border border-ivory/30 text-ivory hover:border-ivory/60 hover:bg-ivory/5",
};

const sizeClass = {
  default: "",
  sm: "!px-4 !py-3.5 !text-xs sm:!py-2.5 sm:!text-[10px]",
  // Smaller still — used by the desktop nav, where both buttons sit
  // alongside 7 nav links in a single row with limited width.
  xs: "!px-3 !py-2 !text-[9px]",
} as const;

const iconSizeClass: Record<keyof typeof sizeClass, string> = {
  default: "h-4 w-4",
  sm: "h-3.5 w-3.5",
  xs: "h-3 w-3",
};

// The number is shown on every Call button, not just the label text, per
// the brief — guests shouldn't have to tap through to learn the number.
export function CallButton({
  label = "Call Now",
  tone = "dark",
  size = "default",
  className = "",
}: {
  label?: string;
  tone?: Tone;
  size?: keyof typeof sizeClass;
  className?: string;
}) {
  return (
    <a
      href={siteConfig.contact.phoneHref}
      className={`btn ${callToneClass[tone]} ${sizeClass[size]} ${className}`}
    >
      <PhoneIcon className={iconSizeClass[size]} />
      {size === "sm" || size === "xs" ? (
        siteConfig.contact.phoneDisplay
      ) : (
        <span className="flex flex-col items-start leading-tight">
          <span>{label}</span>
          <span className="text-[10px] normal-case tracking-normal opacity-70">
            {siteConfig.contact.phoneDisplay}
          </span>
        </span>
      )}
    </a>
  );
}

export function WhatsAppButton({
  label = "WhatsApp Us",
  message = defaultWhatsAppMessage,
  tone = "dark",
  size = "default",
  className = "",
}: {
  label?: string;
  message?: string;
  tone?: Tone;
  size?: keyof typeof sizeClass;
  className?: string;
}) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${whatsappToneClass[tone]} ${sizeClass[size]} ${className}`}
    >
      <WhatsAppIcon className={iconSizeClass[size]} />
      {label}
    </a>
  );
}

// Opens the business's real Google Maps directions link (set once, in
// lib/site-config.ts) — a secondary conversion, same as Call/WhatsApp, and
// already recognised by the Google Ads click tracker in
// components/GoogleAdsTracking.tsx (it classifies any google.com/maps
// link as a "directions" click automatically).
export function DirectionsButton({
  label = "Get Directions",
  tone = "dark",
  size = "default",
  className = "",
}: {
  label?: string;
  tone?: Tone;
  size?: keyof typeof sizeClass;
  className?: string;
}) {
  return (
    <a
      href={siteConfig.location.mapsDirectionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${directionsToneClass[tone]} ${sizeClass[size]} ${className}`}
    >
      <MapPinIcon className={iconSizeClass[size]} />
      {label}
    </a>
  );
}

// Links to the real /booking page (the guided request flow that ends by
// opening WhatsApp with the filled details) and fires a "booking_click"
// conversion — a lighter-weight engagement signal, distinct from
// trackConfirmedBooking()'s genuine, server-confirmed booking conversion,
// which this never touches.
export function BookAppointmentButton({
  label = "Book Appointment",
  tone = "dark",
  size = "default",
  className = "",
}: {
  label?: string;
  tone?: Tone;
  size?: keyof typeof sizeClass;
  className?: string;
}) {
  return (
    <Link
      href="/booking"
      onClick={() => sendConversion("booking_click")}
      className={`btn ${directionsToneClass[tone]} ${sizeClass[size]} ${className}`}
    >
      <CalendarIcon className={iconSizeClass[size]} />
      {label}
    </Link>
  );
}

// Convenience pair — the two CTAs, side by side, in the standard order
// (Call first, then WhatsApp). Use this wherever a section needs both.
export function CallWhatsAppPair({
  tone = "dark",
  size = "default",
  whatsappMessage,
  callLabel,
  whatsappLabel,
  className = "",
}: {
  tone?: Tone;
  size?: keyof typeof sizeClass;
  whatsappMessage?: string;
  callLabel?: string;
  whatsappLabel?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row ${className}`}>
      <CallButton tone={tone} size={size} label={callLabel} />
      <WhatsAppButton tone={tone} size={size} label={whatsappLabel} message={whatsappMessage} />
    </div>
  );
}
