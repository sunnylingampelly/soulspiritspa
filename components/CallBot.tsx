"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { PhoneIcon, WhatsAppIcon } from "./CTAButtons";

const SESSION_KEY = "soulspirit-callbot-opened";

type Choice = {
  label: string;
  reply: string;
};

const CHOICES: Choice[] = [
  {
    label: "📅 Book an appointment",
    reply:
      "Perfect — the fastest way to lock in your slot is a quick call. Our team will help you pick the right time.",
  },
  {
    label: "💆 Ask about treatments",
    reply:
      "We'd love to help you choose. A quick call is the easiest way to talk through what's right for you.",
  },
  {
    label: "🎁 About the 15% off",
    reply:
      "Good news — it applies to every treatment on the menu. Call now and our team will confirm it for your visit.",
  },
];

// A small, scripted "chat" — not a real assistant, just a friendly guided
// path that always ends the same way: a call. The number is never shown
// up front; it only appears once the guest has picked something, as the
// natural next step of the conversation rather than a cold phone number.
export default function CallBot() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<Choice | null>(null);
  const [showReply, setShowReply] = useState(false);

  // Opens itself once, a little after the page loads, then collapses back
  // to a small launcher bubble that stays reachable for the rest of the
  // visit — it never disappears for good.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  function selectChoice(c: Choice) {
    setChoice(c);
    setShowReply(false);
    // A short "typing" beat before the reply lands — cheap, reliable
    // (plain setTimeout, no scroll/animation-completion dependency) and
    // makes the exchange feel like a conversation rather than a form.
    setTimeout(() => setShowReply(true), 700);
  }

  function reset() {
    setChoice(null);
    setShowReply(false);
  }

  const whatsappMessage = choice
    ? `Hi SoulSpirit Spa, I'm interested in: ${choice.label.replace(/^\S+\s/, "")}.`
    : "Hi SoulSpirit Spa, I'd like to know more.";

  return (
    <>
      {/* The launcher — always present, bottom-right, on every page. */}
      <div className="fixed bottom-[calc(96px+env(safe-area-inset-bottom))] right-5 z-40 sm:bottom-40 sm:right-8">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="launcher"
              type="button"
              onClick={() => setOpen(true)}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Chat with SoulSpirit Spa"
              className="tap-target relative flex h-14 w-14 items-center justify-center rounded-full bg-bronze text-ivory shadow-soft transition-transform hover:scale-105"
            >
              {/* A soft, continuous pulse ring — pure CSS, so it keeps
                  running regardless of any JS/animation-completion quirk. */}
              <span className="absolute inset-0 animate-ping rounded-full bg-bronze/60" />
              <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.03 2 11c0 2.42 1.08 4.62 2.86 6.24-.14 1.1-.5 2.4-1.14 3.5-.14.24.06.54.34.5 1.7-.24 3.24-.94 4.3-1.6C9.48 19.9 10.7 20 12 20c5.52 0 10-4.03 10-9s-4.48-9-10-9Z" />
              </svg>
            </motion.button>
          ) : (
            <motion.div
              key="panel"
              initial={{ y: 16, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 16, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-label="Chat with SoulSpirit Spa"
              className="w-[calc(100vw-2.5rem)] max-w-[300px] overflow-hidden rounded-2xl border border-line bg-ivory shadow-soft sm:w-[300px]"
            >
              <div className="flex items-center justify-between bg-ink px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bronze font-serif text-sm text-ivory">
                    S
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ivory">SoulSpirit Spa</p>
                    <p className="flex items-center gap-1 text-[11px] text-ivory/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      Typically replies instantly
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="tap-target flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ivory/70 transition-colors hover:bg-ivory/10 hover:text-ivory"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <div className="max-h-[60svh] overflow-y-auto p-4">
                <div className="flex items-start gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand font-serif text-xs text-ink/70">
                    S
                  </span>
                  <p className="rounded-2xl rounded-tl-sm bg-sand px-3 py-2 text-sm leading-relaxed text-ink">
                    Hi 👋 Ready to relax? Tell me what you&rsquo;re after and
                    I&rsquo;ll point you the right way.
                  </p>
                </div>

                {!choice && (
                  <div className="mt-3 flex flex-col gap-2 pl-9">
                    {CHOICES.map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        onClick={() => selectChoice(c)}
                        className="rounded-full border border-bronze/40 px-3 py-2 text-left text-xs text-bronze-dark transition-colors hover:bg-bronze/10"
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}

                {choice && (
                  <div className="mt-3 flex items-start justify-end gap-2">
                    <p className="rounded-2xl rounded-tr-sm bg-ink px-3 py-2 text-sm text-ivory">
                      {choice.label}
                    </p>
                  </div>
                )}

                {choice && !showReply && (
                  <div className="mt-3 flex items-center gap-2 pl-9">
                    <span className="flex gap-1 rounded-2xl rounded-tl-sm bg-sand px-3 py-2.5">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40" />
                    </span>
                  </div>
                )}

                {choice && showReply && (
                  <>
                    <div className="mt-3 flex items-start gap-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand font-serif text-xs text-ink/70">
                        S
                      </span>
                      <p className="rounded-2xl rounded-tl-sm bg-sand px-3 py-2 text-sm leading-relaxed text-ink">
                        {choice.reply}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-col gap-2 pl-9">
                      <a
                        href={siteConfig.contact.phoneHref}
                        className="btn justify-center bg-bronze text-ivory hover:bg-bronze-dark"
                      >
                        <PhoneIcon className="h-4 w-4" />
                        <span className="flex flex-col items-start leading-tight">
                          <span>Call Now</span>
                          <span className="text-[10px] normal-case tracking-normal opacity-80">
                            {siteConfig.contact.phoneDisplay}
                          </span>
                        </span>
                      </a>
                      <a
                        href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline justify-center !py-2.5 text-[11px]"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5" />
                        Chat on WhatsApp instead
                      </a>
                      <button
                        type="button"
                        onClick={reset}
                        className="mt-1 text-center text-[11px] uppercase tracking-widest2 text-ink/40 hover:text-ink/60"
                      >
                        ← Ask something else
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
