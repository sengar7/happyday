"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { secretMessages } from "@/data/messages";
import { HeartMark } from "@/components/ui/heart-mark";

export function SecretLetters() {
  const [letter, setLetter] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  function openLetter(index: number) {
    setLetter(secretMessages[index % secretMessages.length]);
  }

  return (
    <section aria-labelledby="letters-heading" className="overflow-hidden bg-[#fbe7ef] px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#6a1b9a]">For your eyes only</p>
          <h2 id="letters-heading" className="font-serif text-4xl tracking-[-0.05em] text-[#222222] sm:text-6xl">Secret letters.</h2>
          <p className="mt-5 text-sm leading-6 text-[#222222]/60 sm:text-base">Choose an envelope. There is a small truth waiting inside.</p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-8">
          {secretMessages.map((message, index) => (
            <motion.button
              aria-label={`Open secret letter ${index + 1}`}
              className="group relative aspect-[1.35] rounded-2xl bg-[#ff4d8d] shadow-[0_20px_45px_rgba(255,77,141,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6a1b9a]"
              key={message}
              onClick={() => openLetter(index)}
              type="button"
              whileHover={reduceMotion ? undefined : { y: -8, rotate: index % 2 ? 2 : -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[56%] origin-top border-b border-white/30 bg-[#ff7eb3] [clip-path:polygon(0_0,100%_0,50%_100%)] transition-transform duration-500 group-hover:[transform:rotateX(28deg)]" />
              <span aria-hidden="true" className="absolute left-1/2 top-[55%] grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#fff8fc] text-[#ff4d8d] shadow-lg">
                <HeartMark className="size-4" />
              </span>
              <span className="sr-only">Open a love letter</span>
            </motion.button>
          ))}
        </div>

        {letter && (
          <motion.article
            aria-live="polite"
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            className="mx-auto mt-12 max-w-2xl rounded-[2rem] bg-[#fffdf8] p-8 text-center text-[#222222] shadow-[0_30px_80px_rgba(106,27,154,0.16)] sm:p-12"
            initial={{ opacity: 0, y: 24, rotate: -1.5 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.65, ease: "easeOut" }}
          >
            <HeartMark className="mx-auto size-6 text-[#ff4d8d]" />
            <p className="mt-6 font-serif text-3xl leading-9 tracking-[-0.04em] sm:text-4xl sm:leading-[1.1]">{letter}</p>
          </motion.article>
        )}
      </div>
    </section>
  );
}
