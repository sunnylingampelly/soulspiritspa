"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

// A subtle scroll-in motion effect — content only ever *slides* in, it is
// never hidden via opacity. Opacity stays at 1 at all times — only the
// position animates — so a failed/late trigger never leaves content
// invisible, only un-animated (still fully readable).
//
// This drives the reveal with a hand-rolled IntersectionObserver rather
// than Framer Motion's own `whileInView` — `whileInView` was found to get
// permanently stuck at its initial offset even after the element had been
// fully on screen for several seconds, on both a real device and in
// automated testing here. The native browser API, wired up directly, does
// not have that failure mode. A short fallback timer also forces the
// settled (animated-in) state regardless, in case observation somehow
// never fires at all — the card must never be stuck off-position forever.
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);

    const fallback = setTimeout(() => setInView(true), 4000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [inView]);

  return { ref, inView };
}

// Below the sm breakpoint, "left"/"right" is ignored in favour of "up":
// alternating sideways entrances read as a left/right *column* cue, and on
// a single-column mobile layout there's no column to cue — it just looks
// like the wrong item drifted in from the wrong place. Above sm, grids
// really do have side-by-side columns, so the alternation reads correctly.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  x,
  direction = "up",
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  // Horizontal slide distance in px, used when direction is "left"/"right".
  // Defaults to a slightly larger distance than the vertical one — a
  // sideways entrance reads best with a touch more travel.
  x?: number;
  direction?: "up" | "left" | "right";
  className?: string;
  as?: "div" | "span";
}) {
  const isDesktop = useIsDesktop();
  const effectiveDirection = isDesktop ? direction : "up";
  const { ref, inView } = useInView<HTMLDivElement>();
  const MotionTag = as === "span" ? motion.span : motion.div;
  const distance = x ?? 40;
  const offset =
    effectiveDirection === "left"
      ? { x: -distance }
      : effectiveDirection === "right"
      ? { x: distance }
      : { y };
  const settled = effectiveDirection === "up" ? { y: 0 } : { x: 0 };
  return (
    <MotionTag
      // Framer Motion only reads `initial` on first mount. isDesktop
      // resolves a tick after mount (SSR always starts at "up"), so once
      // it's known, remounting with a fresh key applies the correct
      // starting offset instead of animating a visible, unwanted jump
      // from the wrong starting point to the right one.
      key={effectiveDirection}
      ref={ref}
      className={className}
      initial={offset}
      animate={inView ? settled : offset}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
