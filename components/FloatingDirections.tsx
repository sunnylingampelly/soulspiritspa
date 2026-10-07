"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { MapPinIcon } from "./CTAButtons";

// A persistent floating "Get Directions" launcher — occupies the exact
// fixed position the old chat-bot launcher used to sit in (same offsets,
// same z-index), since that bubble was removed and this is what now goes
// in its place: a quick, always-reachable way to open Maps from anywhere
// on the site, on both mobile and desktop.
export default function FloatingDirections() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Same hero routes MobileActionBar and Nav treat specially — the hero's
  // own CTA row already includes a full Get Directions button, so this
  // floating copy stays tucked away until scroll clears the hero instead
  // of sitting on top of it.
  const isHeroRoute =
    pathname === "/" || (pathname.startsWith("/treatments/") && pathname !== "/treatments");

  useEffect(() => {
    if (!isHeroRoute) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHeroRoute]);

  const hidden = isHeroRoute && !scrolled;

  return (
    <div
      className={`fixed bottom-[calc(76px+env(safe-area-inset-bottom))] right-5 z-40 transition-all duration-500 ease-luxe sm:bottom-[150px] sm:right-8 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <a
        href={siteConfig.location.mapsDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get directions to SoulSpirit Spa"
        className="tap-target flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-ink text-ivory shadow-soft transition-transform hover:scale-105"
      >
        <MapPinIcon className="h-6 w-6" />
      </a>
    </div>
  );
}
