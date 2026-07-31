"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { openingCopy } from "@/data/hero";
import { HeartMark } from "@/components/ui/heart-mark";

const floatingHearts = [
  "left-[7%] top-[20%] size-5 text-[#ff4d8d]/50",
  "right-[10%] top-[17%] size-8 text-[#6a1b9a]/25",
  "left-[19%] bottom-[23%] size-4 text-[#ff7eb3]/60",
  "right-[21%] bottom-[19%] size-6 text-[#ff4d8d]/35",
  "left-[42%] top-[14%] size-3 text-[#ff7eb3]/70",
] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [typedTitle, setTypedTitle] = useState("");

  useEffect(() => {
    if (reduceMotion) return;

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypedTitle(openingCopy.title.slice(0, index));
      if (index === openingCopy.title.length) window.clearInterval(interval);
    }, 68);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const displayTitle = reduceMotion ? openingCopy.title : typedTitle;

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: {
      duration: reduceMotion ? 0.01 : 0.85,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  });

  return (
    <section className="relative grid min-h-dvh place-items-center overflow-hidden bg-[#fff8fc] px-6 py-24 sm:px-10">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-30rem] size-[56rem] -translate-x-1/2 rounded-full bg-[#ff7eb3]/25 blur-[110px]" />
        <div className="absolute -left-44 bottom-[-25rem] size-[42rem] rounded-full bg-[#6a1b9a]/15 blur-[120px]" />
        <div className="absolute -right-44 bottom-[-20rem] size-[40rem] rounded-full bg-[#ff4d8d]/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,248,252,0.22)_50%,#fff8fc_100%)]" />
      </div>

      {floatingHearts.map((className, index) => (
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -18, 0], rotate: [0, 9, 0] }}
          className={`pointer-events-none absolute ${className}`}
          key={className}
          transition={{ duration: 3.6 + index * 0.45, delay: index * 0.28, repeat: Infinity, ease: "easeInOut" }}
        >
          <HeartMark className="size-full" />
        </motion.div>
      ))}

      <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
        <motion.p {...enter(0.15)} className="mb-7 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[#6a1b9a] sm:text-xs">
          {openingCopy.eyebrow}
        </motion.p>
        <motion.h1
          {...enter(0.3)}
          className="max-w-4xl text-balance font-serif text-5xl font-medium leading-[0.95] tracking-[-0.065em] text-[#222222] sm:text-7xl lg:text-8xl"
        >
          {displayTitle}
          <motion.span
            animate={reduceMotion ? { opacity: 0 } : { opacity: [0, 1, 0] }}
            className="ml-1 inline-block h-[0.78em] w-[0.045em] bg-[#ff4d8d] align-[-0.05em]"
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <span className="ml-3 inline-block text-[#ff4d8d]" role="img" aria-label="heart">
            ♥
          </span>
        </motion.h1>
        <motion.p {...enter(1.05)} className="mt-8 max-w-md text-pretty text-base leading-7 text-[#222222]/65 sm:text-lg">
          {openingCopy.subtitle}
        </motion.p>
      </div>

      <motion.div {...enter(1.35)} className="absolute bottom-9 flex flex-col items-center gap-3 text-[#222222]/50">
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em]">{openingCopy.prompt}</span>
        <span aria-hidden="true" className="flex h-9 w-5 justify-center rounded-full border border-[#222222]/15 p-1">
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, 13, 0], opacity: [0.4, 1, 0.4] }}
            className="size-1.5 rounded-full bg-[#ff4d8d]"
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
