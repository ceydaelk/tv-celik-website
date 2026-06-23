"use client";
import { MotionConfig } from "framer-motion";

// Wraps the app with MotionConfig so prefers-reduced-motion is respected globally.
// All framer-motion animations inside this boundary honour the OS accessibility setting.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
