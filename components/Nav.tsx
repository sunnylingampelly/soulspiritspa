"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { CallButton, WhatsAppButton } from "./CTAButtons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Routes whose very top is a full-bleed dark photo (the hero / a
  // treatment's hero banner) need light nav text until the guest scrolls
  // past it — otherwise dark ink text disappears into the dark image.
  const isDarkHeroRoute =
    pathname === "/" || (pathname.startsWith("/treatments/") && pathname !== "/treatments");
  const light = isDarkHeroRoute && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-8 z-50 pt-[env(safe-area-inset-top)] transition-all duration-600 ease-luxe sm:top-9 ${
        scrolled || open
          ? "bg-ivory/90 backdrop-blur-md shadow-subtle"
          : light
          ? "bg-gradient-to-b from-black/55 via-black/20 to-transparent"
          : "bg-transparent"
      }`}
    >
      <nav className="container-luxe flex h-20 items-center justify-between sm:h-24">
        <Link href="/" aria-label="SoulSpirit Spa — home" className="shrink-0">
          <Image
            src="/soul-logo.png"
            alt="SoulSpirit Spa"
            width={2009}
            height={783}
            priority
            className="h-14 w-auto sm:h-20"
          />
        </Link>

        <ul
          className={`hidden lg:flex items-center gap-9 text-[13px] uppercase tracking-widest2 transition-colors duration-500 ${
            light ? "text-ivory/80" : "text-ink/80"
          }`}
        >
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`link-underline ${light ? "hover:text-ivory" : "hover:text-ink"}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <CallButton size="sm" />
          <WhatsAppButton size="sm" tone={light ? "light" : "dark"} />
        </div>

        <button
          type="button"
          className="tap-target lg:hidden flex h-11 w-11 items-center justify-center -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 top-0 h-px w-6 transition-colors transition-transform duration-500 ease-luxe ${
                light ? "bg-ivory" : "bg-ink"
              } ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 bottom-0 h-px w-6 transition-colors transition-transform duration-500 ease-luxe ${
                light ? "bg-ivory" : "bg-ink"
              } ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-line bg-ivory px-gutter pb-10 pt-6"
          >
            <ul className="flex flex-col gap-1 text-2xl font-serif text-ink">
              {siteConfig.nav.map((item) => (
                <li key={item.href} className="border-b border-line/70 py-4">
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <CallButton className="w-full justify-center" />
              <WhatsAppButton className="w-full justify-center" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
