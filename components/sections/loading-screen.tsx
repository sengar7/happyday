"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { openingCopy } from "@/data/hero";
import { HeartMark } from "@/components/ui/heart-mark";

export function LoadingScreen() {
  const [progress, setProgress] = useState(4);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((current) => Math.min(current + 4, 100));
    }, 64);

    return () => window.clearInterval(interval);
  }, []);

  const duration = reduceMotion ? 0.01 : 0.7;

  return (
    <motion.section
      aria-label="Preparing your love story"
      className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#fff8fc] px-6"
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.03, filter: "blur(10px)" }}
      transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -left-24 top-[-10%] size-72 rounded-full bg-[#ff7eb3]/20 blur-3xl" />
        <div className="absolute -right-16 bottom-[-5%] size-80 rounded-full bg-[#6a1b9a]/15 blur-3xl" />
      </div>

      <div className="relative flex w-full max-w-xs flex-col items-center gap-7 text-center">
        <motion.div
          animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], rotate: [0, -4, 4, 0] }}
          className="grid size-20 place-items-center rounded-[2rem] border border-white/70 bg-white/60 text-[#ff4d8d] shadow-[0_20px_50px_rgba(255,77,141,0.2)] backdrop-blur-xl"
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
        >
          <HeartMark className="size-9" />
        </motion.div>
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#6a1b9a]">
            {openingCopy.loadingLabel}
          </p>
          <div
            aria-label={`${progress}% loaded`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={progress}
            className="h-1 overflow-hidden rounded-full bg-[#ff4d8d]/10"
            role="progressbar"
          >
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-[#ff4d8d] via-[#ff7eb3] to-[#6a1b9a]"
              transition={{ duration: 0.25 }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
