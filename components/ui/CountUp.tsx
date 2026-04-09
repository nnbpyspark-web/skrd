"use client";
import { useEffect, useRef } from "react";
import { useMotionValue, useTransform, animate, useInView, motion } from "framer-motion";

export function CountUp({ end, suffix = "", duration = 2 }: {
  end: number; suffix?: string; duration?: number;
}) {
  const ref   = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) animate(count, end, { duration, ease: "easeOut" });
  }, [isInView, count, end, duration]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}
