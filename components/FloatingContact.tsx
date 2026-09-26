"use client";

import { buildWhatsAppLink, defaultWhatsAppMessage, siteConfig } from "@/lib/site-config";
import { PhoneIcon, WhatsAppIcon } from "./CTAButtons";

export default function FloatingContact() {
  return (
    // Desktop/tablet only — mobile already has both Call and WhatsApp
    // permanently visible in the bottom action bar, so a floating copy
    // here would be redundant and can overlap a section's own CTAs.
    <div className="fixed bottom-8 right-5 z-40 hidden flex-col items-end gap-3 sm:flex sm:right-8">
      <a
        href={siteConfig.contact.phoneHref}
        aria-label={`Call SoulSpirit Spa at ${siteConfig.contact.phoneDisplay}`}
        className="tap-target flex h-12 items-center justify-center gap-2 rounded-full bg-charcoal pl-3 pr-4 text-ivory shadow-soft transition-transform duration-500 ease-luxe hover:scale-105"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          <PhoneIcon className="h-5 w-5" />
        </span>
        <span className="whitespace-nowrap text-xs normal-case tracking-normal">
          {siteConfig.contact.phoneDisplay}
        </span>
      </a>

      <a
        href={buildWhatsAppLink(defaultWhatsAppMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SoulSpirit Spa on WhatsApp"
        className="tap-target group flex items-center gap-2 rounded-full border border-line bg-ivory py-3 pl-3 pr-4 text-ink shadow-soft transition-all duration-600 ease-luxe hover:border-[#25D366]/50 hover:pr-5"
      >
        <span className="flex h-6 w-6 items-center justify-center">
          <WhatsAppIcon className="h-5 w-5" />
        </span>
        <span className="text-xs uppercase tracking-widest2">Chat with us</span>
      </a>
    </div>
  );
}
