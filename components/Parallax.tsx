"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Wraps a background image so it drifts slightly slower/faster than the
// page as you scroll past it — a common, subtle depth cue. The wrapped
// content is rendered oversized and shifted so the drift never reveals
// empty space at the top/bottom edges.
export default function Parallax({
  children,
  className = "",
  strength = 60,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[10%] h-[120%]">
        {children}
      </motion.div>
    </div>
  );
}
