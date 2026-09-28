"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ImagePlaceholder from "./ImagePlaceholder";
import { siteImages } from "@/lib/images";
import { buildWhatsAppLink } from "@/lib/site-config";

const SESSION_KEY = "soulspirit-promo-seen";

export default function PromoPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (!name.trim() || digits.length !== 10) return;
    const message = `Hi SoulSpirit Spa, I'm ${name.trim()} (+91 ${digits}). I'd like to claim the 15% off offer.`;
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4">
          {/* Plain div, not motion — it needs no entrance animation of its
              own, and opacity-only animations that never get to finish
              (a throttled tab, slow device) leave things invisible. */}
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          <motion.div
            // Position only, never opacity — see note above.
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Special offer"
            className="relative flex min-h-[480px] max-h-[92svh] w-full max-w-md flex-col overflow-x-hidden overflow-y-auto rounded-t-2xl shadow-soft sm:min-h-0 sm:max-h-[85vh] sm:rounded-2xl sm:bg-ivory"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="tap-target absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-ivory shadow-subtle backdrop-blur-sm transition-colors hover:bg-ink/90"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {/* Mobile: the photo fills the whole card as a background,
                behind the text, with a strong, even scrim so the text and
                fields on top stay clearly legible no matter which part of
                the photo sits behind them. */}
            <div className="absolute inset-0 sm:hidden">
              <ImagePlaceholder
                label="SoulSpirit Spa"
                tone="cream"
                src={siteImages.welcomeGreeting}
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-ink/55" />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/60 to-ink/95" />
            </div>

            {/* Desktop/tablet: the photo stays a normal block above the
                card's own ivory background, as before. */}
            <ImagePlaceholder
              label="SoulSpirit Spa"
              tone="cream"
              src={siteImages.welcomeGreeting}
              className="hidden sm:block sm:aspect-[16/9] sm:w-full"
            />

            <div className="relative z-10 mt-auto p-5 text-ivory sm:mt-0 sm:p-7 sm:text-ink">
              <p className="eyebrow text-champagne sm:text-bronze">Limited Time Offer</p>
              <h3 className="mt-2 font-serif text-2xl text-balance text-ivory sm:text-ink">
                Enjoy 15% off
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/80 sm:text-ink/60">
                Share your details and we&rsquo;ll confirm your discount on
                WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-line bg-ivory px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-bronze focus:outline-none"
                />
                <div className="flex border border-line bg-ivory focus-within:border-bronze">
                  <span className="flex items-center border-r border-line px-4 text-base text-ink/60">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="w-full min-w-0 bg-transparent px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-full justify-center bg-bronze text-ivory hover:bg-bronze-dark"
                >
                  Book Now
                </button>
              </form>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 w-full text-center text-xs uppercase tracking-widest2 text-ivory/70 hover:text-ivory sm:text-ink/40 sm:hover:text-ink/60"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
