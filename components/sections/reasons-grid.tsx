"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { reasons } from "@/data/reasons";
import { HeartMark } from "@/components/ui/heart-mark";

export function ReasonsGrid() {
  const [flippedReasons, setFlippedReasons] = useState<Set<number>>(new Set());
  const reduceMotion = useReducedMotion();

  function toggleReason(id: number) {
    setFlippedReasons((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section aria-labelledby="reasons-heading" className="relative overflow-hidden bg-[#fff8fc] px-6 py-28 sm:px-10 sm:py-36">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7 }}
          className="mx-auto mb-16 max-w-xl text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#6a1b9a]">One hundred, at least</p>
          <h2 id="reasons-heading" className="font-serif text-4xl tracking-[-0.05em] text-[#222222] sm:text-6xl">
            Reasons I love you.
          </h2>
          <p className="mt-5 text-sm leading-6 text-[#222222]/60 sm:text-base">Tap a card and let it tell you something true.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reasons.map((reason) => {
            const isFlipped = flippedReasons.has(reason.id);

            return (
              <button
                aria-label={`Reason ${reason.id}: ${reason.text}`}
                aria-pressed={isFlipped}
                className="reason-card group w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6a1b9a]"
                data-flipped={isFlipped}
                key={reason.id}
                onClick={() => toggleReason(reason.id)}
                type="button"
              >
                <div className="reason-card-inner">
                  <div className="reason-card-face absolute inset-0 flex flex-col justify-between rounded-3xl border border-[#ff4d8d]/10 bg-white p-6 shadow-[0_15px_38px_rgba(255,77,141,0.07)] transition-shadow group-hover:shadow-[0_18px_45px_rgba(255,77,141,0.15)]">
                    <span className="text-xs font-semibold tracking-[0.18em] text-[#ff4d8d]">{String(reason.id).padStart(2, "0")}</span>
                    <HeartMark className="size-6 text-[#ff7eb3]" />
                  </div>
                  <div className="reason-card-face reason-card-back absolute inset-0 flex flex-col justify-between rounded-3xl bg-[#ff4d8d] p-6 text-white shadow-[0_15px_38px_rgba(255,77,141,0.2)]">
                    <HeartMark className="size-5 text-white/75" />
                    <p className="text-pretty font-serif text-xl leading-6 tracking-[-0.035em]">{reason.text}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
