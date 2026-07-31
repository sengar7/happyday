"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { endingCopy } from "@/data/ending";
import { HeartMark } from "@/components/ui/heart-mark";

export function FinalSurprise() {
  const [isSurprised, setIsSurprised] = useState(false);
  const reduceMotion = useReducedMotion();

  function triggerSurprise() {
    setIsSurprised(true);
    if (!reduceMotion) {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.68 }, colors: ["#ff4d8d", "#ff7eb3", "#6a1b9a", "#ffffff"] });
      window.setTimeout(() => {
        confetti({ particleCount: 80, angle: 60, spread: 58, origin: { x: 0, y: 0.72 }, colors: ["#ff4d8d", "#ff7eb3"] });
        confetti({ particleCount: 80, angle: 120, spread: 58, origin: { x: 1, y: 0.72 }, colors: ["#6a1b9a", "#ff7eb3"] });
      }, 190);
    }
  }

  return (
    <section aria-labelledby="surprise-heading" className={`relative overflow-hidden bg-[#ffedf5] px-6 py-28 sm:px-10 sm:py-36 ${isSurprised ? "surprise-shake" : ""}`}>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,126,179,0.34),transparent_34%)]" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6a1b9a]">{endingCopy.surpriseEyebrow}</p>
        <h2 id="surprise-heading" className="mt-5 font-serif text-4xl tracking-[-0.05em] text-[#222222] sm:text-6xl">{endingCopy.surpriseTitle}</h2>
        <motion.button
          aria-label="Trigger the final surprise"
          className="relative mt-12 grid size-40 place-items-center rounded-full bg-[#ff4d8d] font-serif text-2xl text-white shadow-[0_20px_60px_rgba(255,77,141,0.38)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6a1b9a] sm:size-48 sm:text-3xl"
          onClick={triggerSurprise}
          type="button"
          whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        >
          <span>{endingCopy.surpriseButton}</span>
          <span aria-hidden="true" className="absolute inset-2 rounded-full border border-white/30" />
        </motion.button>

        <AnimatePresence>
          {isSurprised && (
            <motion.div
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-12 max-w-md rounded-3xl border border-white/80 bg-white/75 p-7 shadow-[0_24px_70px_rgba(255,77,141,0.18)] backdrop-blur-xl"
              exit={{ opacity: 0, scale: 0.92 }}
              initial={{ opacity: 0, scale: 0.78, y: 18 }}
              role="status"
              transition={{ duration: reduceMotion ? 0.01 : 0.55, type: "spring", bounce: 0.35 }}
            >
              <HeartMark className="mx-auto size-7 text-[#ff4d8d]" />
              <p className="mt-4 font-serif text-2xl leading-7 tracking-[-0.035em] text-[#222222]">{endingCopy.surpriseMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {isSurprised && !reduceMotion && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {["left-[12%] top-[25%]", "left-[25%] top-[70%]", "left-[75%] top-[24%]", "left-[86%] top-[67%]"].map((position, index) => (
            <motion.div
              animate={{ opacity: [0, 1, 0], y: [0, -100, -180], rotate: [0, index % 2 ? 30 : -30, 0] }}
              className={`absolute ${position} text-[#ff4d8d]`}
              initial={{ opacity: 0, scale: 0.3 }}
              key={position}
              transition={{ duration: 1.6, delay: index * 0.12, ease: "easeOut" }}
            >
              <HeartMark className="size-8" />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
