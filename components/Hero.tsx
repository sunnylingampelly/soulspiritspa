"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ImagePlaceholder from "./ImagePlaceholder";
import { CallButton, WhatsAppButton } from "./CTAButtons";
import { siteImages } from "@/lib/images";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Some mobile browsers (in-app webviews especially) ignore the
  // declarative autoplay attributes and need play() called explicitly
  // once the element exists — muted is also set imperatively since a
  // couple of older WebViews don't honour it as a plain attribute.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  }, []);

  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        {/* Mobile only: a short looping clip shot for portrait screens. */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          // eslint-disable-next-line react/no-unknown-property
          webkit-playsinline="true"
          disablePictureInPicture
          preload="auto"
          poster={siteImages.heroMobile}
          className="absolute inset-0 h-full w-full object-cover sm:hidden"
        >
          <source src="/soul-video.mp4" type="video/mp4" />
        </video>

        {/* Tablet/desktop: still image. */}
        <ImagePlaceholder
          label="A private treatment suite at SoulSpirit, warm light and still water"
          tone="charcoal"
          src={siteImages.heroDesktop}
          priority
          className="hidden h-full w-full sm:block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-charcoal/10" />
        {/* Flat black layer over the web/desktop hero photo — it's bright
            enough throughout (not just top-to-bottom) that the gradient
            alone wasn't enough to keep the headline and copy legible. */}
        <div className="absolute inset-0 hidden bg-black/45 sm:block" />
        {/* A dedicated scrim behind the nav — independent of the bottom-up
            gradient above, so the floating nav stays legible no matter how
            bright the top of whichever hero image/video is in place. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/55 to-transparent sm:h-48" />
        {/* Extra even wash on mobile — a moving video can't guarantee the
            same contrast a graded still photo can, so give the CTAs a
            reliable floor regardless of the current frame. */}
        <div className="absolute inset-0 bg-charcoal/20 sm:hidden" />
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
          Upto 30% Off
        </motion.div>

        <motion.p
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mt-4 text-champagne"
        >
          SoulSpirit Spa · Khairatabad, Hyderabad
        </motion.p>

        <motion.h1
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-4xl text-5xl font-serif font-normal text-ivory sm:mx-0 sm:text-display-xl"
        >
          Relax.
          <br />
          Recharge.
        </motion.h1>

        <motion.p
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 max-w-md text-balance font-sans text-base text-ivory/75 sm:mx-0 sm:text-lg"
        >
          A calm, private spa in Khairatabad, Hyderabad — real massages,
          real rest.
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
