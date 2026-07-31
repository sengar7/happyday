"use client";

import { motion, useReducedMotion } from "motion/react";
import { KeyboardEvent, useState } from "react";
import { HeartMark } from "@/components/ui/heart-mark";

const bloomPositions = [
  "left-[8%] top-[65%]", "left-[20%] top-[32%]", "left-[32%] top-[72%]", "left-[45%] top-[42%]",
  "left-[57%] top-[68%]", "left-[69%] top-[28%]", "left-[80%] top-[62%]", "left-[88%] top-[39%]",
] as const;

type Bloom = { id: number; position: string };

export function HeartGarden() {
  const [blooms, setBlooms] = useState<Bloom[]>([]);
  const reduceMotion = useReducedMotion();

  function growGarden() {
    setBlooms((current) => [
      ...current.slice(-15),
      { id: Date.now(), position: bloomPositions[current.length % bloomPositions.length] },
    ]);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      growGarden();
    }
  }

  return (
    <section aria-labelledby="garden-heading" className="relative overflow-hidden bg-[#201226] px-6 py-28 text-white sm:px-10 sm:py-36">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,77,141,0.3),transparent_38%),linear-gradient(180deg,#201226_0%,#361342_100%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#ffb8d3]">A little bit of magic</p>
          <h2 id="garden-heading" className="font-serif text-4xl tracking-[-0.05em] sm:text-6xl">The heart garden.</h2>
          <p className="mt-5 text-sm leading-6 text-white/65 sm:text-base">Every tap leaves something lovely behind.</p>
        </div>

        <div
          aria-label="Interactive heart garden. Click or press Enter to grow a flower."
          className="relative mt-14 h-[28rem] cursor-crosshair overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/[0.04] shadow-[0_30px_100px_rgba(0,0,0,0.25)] outline-none focus-visible:ring-2 focus-visible:ring-[#ff7eb3] sm:h-[34rem]"
          onClick={growGarden}
          onKeyDown={onKeyDown}
          role="button"
          tabIndex={0}
        >
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_center_bottom,rgba(255,126,179,0.24),transparent_68%)]" />
          {["left-[13%] top-[18%]", "left-[73%] top-[14%]", "left-[43%] top-[22%]"].map((position, index) => (
            <motion.span
              animate={reduceMotion ? undefined : { x: [0, index % 2 ? 20 : -20, 0], y: [0, -14, 0] }}
              className={`absolute ${position} text-[#ffb8d3]/70`}
              key={position}
              transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-2xl">🦋</span>
            </motion.span>
          ))}
          {blooms.map((bloom) => (
            <motion.div
              animate={{ opacity: [0, 1, 1], scale: [0, 1.15, 1], y: [16, -5, 0] }}
              className={`absolute ${bloom.position} grid size-16 place-items-center rounded-full bg-[#ff7eb3]/25 text-[#ffb8d3] shadow-[0_0_45px_rgba(255,126,179,0.55)] backdrop-blur-sm sm:size-20`}
              initial={{ opacity: 0, scale: 0 }}
              key={bloom.id}
              transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: "easeOut" }}
            >
              <span className="text-2xl sm:text-3xl">✿</span>
              <HeartMark className="absolute size-4 translate-y-6 text-[#ff4d8d]" />
            </motion.div>
          ))}
          <div className="absolute inset-x-0 bottom-8 text-center text-xs font-medium uppercase tracking-[0.22em] text-white/50">Click anywhere to make it bloom</div>
        </div>
      </div>
    </section>
  );
}
