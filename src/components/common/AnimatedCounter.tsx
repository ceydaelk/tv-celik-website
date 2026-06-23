"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

// Splits "30+" → { num: 30, suffix: "+" }, "500+" → { num: 500, suffix: "+" }
function parse(value: string): { num: number; suffix: string } {
  const m = value.match(/^(\d+)(.*)/);
  return m ? { num: parseInt(m[1], 10), suffix: m[2] } : { num: 0, suffix: value };
}

interface Props {
  value: string; // e.g. "30+", "500+", "5"
  className?: string;
}

// Counts from 0 to the target number when scrolled into view (once).
// Uses ease-out-cubic so it decelerates naturally as it approaches the target.
// Respects prefers-reduced-motion: shows final value immediately.
export default function AnimatedCounter({ value, className }: Props) {
  const { num, suffix } = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(num);
      return;
    }

    const duration = 1500;
    const start = Date.now();

    function tick() {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setCount(Math.round(eased * num));
      if (t < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, num]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
