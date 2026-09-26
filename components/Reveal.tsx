"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// A subtle scroll-in motion effect — content only ever *slides* up slightly,
// it is never hidden via opacity. Gating real visibility behind an
// IntersectionObserver trigger is fragile: fast/instant scrolling (a flick,
// End/Home keys, a scrollbar drag) can leave elements at opacity:0
// permanently if the browser never samples them mid-viewport. So opacity
// stays at 1 at all times here — only the position animates.
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const MotionTag = as === "span" ? motion.span : motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ y }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0, margin: "0px 0px 400px 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
