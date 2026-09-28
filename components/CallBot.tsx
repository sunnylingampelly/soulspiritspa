"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { PhoneIcon } from "./CTAButtons";

const SESSION_KEY = "soulspirit-callbot-seen";

// A lightweight, scripted "chat bubble" — not a real conversation, just a
// single friendly nudge that always ends the same way: call us. It shows
// once per session, well before the promo popup, so a first-time visitor
// gets a warm human prompt before the harder-sell offer form appears.
export default function CallBot() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          // Position/scale only, never opacity — a mount animation that
          // never gets to finish (a throttled tab, slow device, etc.)
          // must not leave this stuck invisible; it should just appear.
          initial={{ y: 12, scale: 0.96 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 12, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-[calc(96px+env(safe-area-inset-bottom))] right-5 z-40 w-[calc(100vw-2.5rem)] max-w-[300px] rounded-2xl border border-line bg-ivory p-4 shadow-soft sm:bottom-40 sm:right-8 sm:w-[300px]"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="tap-target absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-ivory shadow-subtle transition-colors hover:bg-ink/80"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bronze font-serif text-sm text-ivory">
              S
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">SoulSpirit Spa</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Hi 👋 Have a question, or ready to book? We&rsquo;re quickest
                to reach by phone.
              </p>
            </div>
          </div>

          <a
            href={siteConfig.contact.phoneHref}
            className="btn mt-3 w-full justify-center bg-bronze text-ivory hover:bg-bronze-dark"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="flex flex-col items-start leading-tight">
              <span>Call Now</span>
              <span className="text-[10px] normal-case tracking-normal opacity-80">
                {siteConfig.contact.phoneDisplay}
              </span>
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
