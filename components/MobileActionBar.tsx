"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buildWhatsAppLink, defaultWhatsAppMessage, siteConfig } from "@/lib/site-config";
import { PhoneIcon, WhatsAppIcon } from "./CTAButtons";

export default function MobileActionBar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Routes with a full-bleed hero (the same ones Nav treats specially)
  // start with this bar tucked below the viewport — it would otherwise sit
  // on top of the hero's own Call/WhatsApp buttons — and it slides up once
  // scroll clears the hero. Other routes show it immediately.
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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-500 ease-luxe lg:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="grid grid-cols-2 items-stretch text-xs uppercase tracking-widest2">
        <a
          href={siteConfig.contact.phoneHref}
          className="tap-target flex items-center justify-center gap-2 bg-charcoal py-3 text-ivory active:bg-ink"
        >
          <PhoneIcon className="h-4 w-4 shrink-0" />
          <span className="flex flex-col items-start leading-tight normal-case">
            <span className="text-[10px] tracking-widest2">Call Now</span>
            <span className="text-[11px] tracking-normal opacity-80">
              {siteConfig.contact.phoneDisplay}
            </span>
          </span>
        </a>
        <a
          href={buildWhatsAppLink(defaultWhatsAppMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target flex items-center justify-center gap-2 bg-ivory py-4 text-ink active:bg-cream"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
