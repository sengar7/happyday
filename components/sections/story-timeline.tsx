"use client";

import { motion, useReducedMotion } from "motion/react";
import { memories } from "@/data/memories";
import { HeartMark } from "@/components/ui/heart-mark";

export function StoryTimeline() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="timeline-heading" className="relative overflow-hidden bg-[#fff8fc] px-6 py-28 sm:px-10 sm:py-36">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute left-1/2 top-[35%] size-[38rem] -translate-x-1/2 rounded-full bg-[#ff7eb3]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: "easeOut" }}
          className="mx-auto mb-20 max-w-xl text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#6a1b9a]">Our story, so far</p>
          <h2 id="timeline-heading" className="text-balance font-serif text-4xl tracking-[-0.045em] text-[#222222] sm:text-6xl">
            The moments that became us.
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <div aria-hidden="true" className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-[#ff4d8d]/10 via-[#ff4d8d]/70 to-[#6a1b9a]/10 sm:left-1/2 sm:-translate-x-1/2" />

          <ol className="space-y-10 sm:space-y-16">
            {memories.map((memory, index) => {
              const isLeft = index % 2 === 0;

              return (
                <li className="relative grid grid-cols-[2.5rem_1fr] gap-5 sm:grid-cols-2 sm:gap-14" key={memory.title}>
                  <motion.div
                    initial={{ opacity: 0, x: reduceMotion ? 0 : isLeft ? -28 : 28, y: reduceMotion ? 0 : 14 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.72, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className={`col-start-2 rounded-3xl border border-white/70 bg-white/55 p-6 shadow-[0_18px_60px_rgba(106,27,154,0.08)] backdrop-blur-xl sm:col-start-auto sm:p-8 ${isLeft ? "sm:col-start-1 sm:row-start-1" : "sm:col-start-2"}`}
                  >
                    <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#ff4d8d]">{memory.moment}</p>
                    <h3 className="font-serif text-3xl tracking-[-0.04em] text-[#222222]">{memory.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#222222]/65 sm:text-base">{memory.description}</p>
                  </motion.div>

                  <motion.div
                    aria-hidden="true"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.45, delay: reduceMotion ? 0 : 0.2, type: "spring", bounce: 0.35 }}
                    className="absolute left-0 top-7 grid size-10 place-items-center rounded-2xl border border-white/80 bg-[#fff8fc] text-[#ff4d8d] shadow-[0_10px_30px_rgba(255,77,141,0.2)] sm:left-1/2 sm:-translate-x-1/2"
                  >
                    <HeartMark className="size-4" />
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
