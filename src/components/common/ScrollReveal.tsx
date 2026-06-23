"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease } from "@/lib/motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// Fade + rise on viewport entry. Triggers once. Respects prefers-reduced-motion
// via the global MotionProvider (MotionConfig reducedMotion="user").
export default function ScrollReveal({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.65, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
