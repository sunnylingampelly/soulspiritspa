"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// A subtle scroll-in motion effect — content only ever *slides* in, it is
// never hidden via opacity. Gating real visibility behind an
// IntersectionObserver trigger is fragile: fast/instant scrolling (a flick,
// End/Home keys, a scrollbar drag) can leave elements at opacity:0
// permanently if the browser never samples them mid-viewport. So opacity
// stays at 1 at all times here — only the position animates.
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
  const MotionTag = as === "span" ? motion.span : motion.div;
  const distance = x ?? 40;
  const initial =
    direction === "left" ? { x: -distance } : direction === "right" ? { x: distance } : { y };
  const animate = direction === "up" ? { y: 0 } : { x: 0 };
  return (
    <MotionTag
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
