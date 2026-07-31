"use client";

import { motion, useReducedMotion } from "motion/react";
import { endingCopy } from "@/data/ending";
import { HeartMark } from "@/components/ui/heart-mark";

const stars = [
  "left-[8%] top-[14%]", "left-[17%] top-[37%]", "left-[26%] top-[19%]", "left-[37%] top-[11%]", "left-[49%] top-[28%]",
  "left-[61%] top-[15%]", "left-[72%] top-[37%]", "left-[84%] top-[17%]", "left-[91%] top-[44%]", "left-[32%] top-[51%]",
] as const;

export function Ending() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative min-h-dvh overflow-hidden bg-[#100817] px-6 py-28 text-white sm:px-10 sm:py-36">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(106,27,154,0.4),transparent_33%),linear-gradient(180deg,#160a20_0%,#09060f_100%)]" />
      <div aria-hidden="true" className="absolute right-[13%] top-20 size-20 rounded-full bg-[#fff3cf] shadow-[0_0_90px_rgba(255,243,207,0.6)] sm:size-28" />
      {stars.map((position, index) => (
        <motion.span
          animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25], scale: [0.8, 1.35, 0.8] }}
          className={`absolute ${position} size-1 rounded-full bg-white`}
          key={position}
          transition={{ duration: 1.8 + index * 0.15, delay: index * 0.18, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(ellipse_at_center_bottom,rgba(255,126,179,0.18),transparent_70%)]" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ffb8d3]"
        >
          {endingCopy.endingEyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.8, delay: reduceMotion ? 0 : 0.1 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-6 font-serif text-balance text-5xl tracking-[-0.06em] sm:text-7xl lg:text-8xl"
        >
          {endingCopy.endingTitle}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.8, delay: reduceMotion ? 0 : 0.25 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-10 space-y-2"
        >
          <p className="font-serif text-2xl text-white/80 sm:text-3xl">{endingCopy.endingThankYou}</p>
          <p className="font-serif text-3xl text-[#ffb8d3] sm:text-4xl">{endingCopy.endingLove}</p>
        </motion.div>
        <HeartMark className="mt-12 size-7 text-[#ff4d8d]" />
      </div>
    </footer>
  );
}
