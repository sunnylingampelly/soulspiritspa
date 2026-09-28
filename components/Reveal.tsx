"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

// A subtle scroll-in motion effect — content only ever *slides* in, it is
// never hidden via opacity. Gating real visibility behind an
// IntersectionObserver trigger is fragile: fast/instant scrolling (a flick,
// End/Home keys, a scrollbar drag) can leave elements at opacity:0
// permanently if the browser never samples them mid-viewport. So opacity
// stays at 1 at all times here — only the position animates.
//
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
  const MotionTag = as === "span" ? motion.span : motion.div;
  const distance = x ?? 40;
  const initial =
    effectiveDirection === "left"
      ? { x: -distance }
      : effectiveDirection === "right"
      ? { x: distance }
      : { y };
  const animate = effectiveDirection === "up" ? { y: 0 } : { x: 0 };
  return (
    <MotionTag
      // Framer Motion only reads `initial` on first mount, so once the
      // real breakpoint is known (a tick after mount) the direction is
      // applied by remounting with a fresh key — otherwise a card that
      // mounted as SSR's "up" default would keep animating on the y-axis
      // even after we learn we're on desktop and it should slide sideways.
      key={effectiveDirection}
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0, margin: "0px 0px 400px 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
