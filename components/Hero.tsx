"use client";

import { motion } from "framer-motion";
import ImagePlaceholder from "./ImagePlaceholder";
import Parallax from "./Parallax";
import { CallButton, WhatsAppButton } from "./CTAButtons";
import { siteImages } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";

// The mobile hero video is commented out (not deleted) below, at the
// client's request — a still image is used instead for now. To bring the
// video back: restore the `useRef`/`useEffect` block and the <video> JSX,
// and remove the ImagePlaceholder that replaced it.
//
// const videoRef = useRef<HTMLVideoElement>(null);
// useEffect(() => {
//   const video = videoRef.current;
//   if (!video) return;
//   video.muted = true;
//   const playPromise = video.play();
//   if (playPromise) playPromise.catch(() => {});
// }, []);

export default function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        {/* Mobile only: a still image (the looping video is commented out
            above/below, not deleted, in case it comes back later). */}
        <ImagePlaceholder
          label="Two therapists greeting guests with a wai"
          tone="charcoal"
          src={siteImages.mobileHeroGreeting}
          priority
          className="absolute inset-0 h-full w-full sm:hidden"
        />
        {/*
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          disablePictureInPicture
          preload="auto"
          poster={siteImages.heroMobile}
          className="absolute inset-0 h-full w-full object-cover sm:hidden"
        >
          <source src="/soul-video.mp4" type="video/mp4" />
        </video>
        */}

        {/* Tablet/desktop: still image, with a slow parallax drift as the
            hero scrolls past — desktop only, video stays static on mobile. */}
        <Parallax className="hidden sm:block" strength={50}>
          <ImagePlaceholder
            label="A private treatment suite at SoulSpirit, warm light and still water"
            tone="charcoal"
            src={siteImages.heroDesktop}
            priority
            className="h-full w-full"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-charcoal/10" />
        {/* Flat black layer over the web/desktop hero photo — it's bright
            enough throughout (not just top-to-bottom) that the gradient
            alone wasn't enough to keep the headline and copy legible. */}
        <div className="absolute inset-0 hidden bg-black/45 sm:block" />
        {/* A dedicated scrim behind the nav — independent of the bottom-up
            gradient above, so the floating nav stays legible no matter how
            bright the top of whichever hero image/video is in place. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/55 to-transparent sm:h-48" />
        {/* Stronger, bottom-weighted wash on mobile — the greeting photo is
            bright and busy (two faces, patterned wall art) right where the
            headline sits, so it needs more contrast than a flat tint gives. */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/70 to-charcoal/20 sm:hidden" />
      </div>

      <div className="container-luxe relative z-10 pb-20 pt-40 text-center sm:pb-28 sm:text-left">
        {/* Position-only entrance animation, deliberately never opacity —
            same reasoning as Reveal.tsx: if the animation never gets to
            run (slow hydration, a blocked script, etc.) this content must
            still be visible and readable, not stuck invisible forever. */}
        <motion.div
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-champagne/40 bg-charcoal/40 px-4 py-1.5 text-[11px] uppercase tracking-widest2 text-champagne backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-light" />
          15% Off
        </motion.div>

        {/* Specific, keyword-led headline for search/ad relevance — "what
            is this and where" — with the brand name kept right underneath
            rather than above it, per the landing-page review. Long enough
            that it wraps on narrow screens rather than forcing a one-line
            fit (unlike the shorter "Relax. Recharge." this replaced). */}
        <motion.h1
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 max-w-xl text-balance text-[clamp(1.75rem,4.5vw,3.25rem)] font-serif font-normal leading-[1.1] text-ivory sm:mx-0"
        >
          Massage &amp; Wellness Spa in Khairatabad.
        </motion.h1>

        <motion.p
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mt-4 text-champagne"
        >
          SoulSpirit Spa · Khairatabad, Hyderabad
        </motion.p>

        <motion.p
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 max-w-md text-balance font-sans text-base text-ivory/75 sm:mx-0 sm:text-lg"
        >
          A calm, private spa in Khairatabad, Hyderabad — real massages,
          real rest.
        </motion.p>

        {/* Treatment names and the hours/landmark line below exist mainly
            for message-match with the ad copy driving traffic here — the
            same words a guest just read in the ad, right above the fold. */}
        <motion.p
          initial={{ y: 14 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 max-w-md text-balance text-xs uppercase tracking-widest2 text-champagne/90 sm:mx-0"
        >
          Thai &middot; Swedish &middot; Deep Tissue &middot; Balinese &middot; Aromatherapy
        </motion.p>

        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <CallButton tone="light" />
          <WhatsAppButton tone="light" />
        </motion.div>

        <motion.p
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-md text-balance text-xs text-ivory/55 sm:mx-0"
        >
          Open Daily {siteConfig.hours[0].time} &middot; Above Union Bank of
          India, Pillar No. A1180
        </motion.p>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="text-[10px] uppercase tracking-widest2 text-ivory/60">
          Scroll
        </span>
        <span className="h-10 w-px overflow-hidden bg-ivory/20">
          <motion.span
            className="block h-full w-full bg-ivory/70"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}
