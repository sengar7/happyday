"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { relationship } from "@/data/relationship";

type TimeParts = Record<"Days" | "Hours" | "Minutes" | "Seconds", string>;

function getTimeParts(): TimeParts {
  const elapsed = Math.max(0, Date.now() - new Date(relationship.startedAt).getTime());
  const totalSeconds = Math.floor(elapsed / 1000);
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  return {
    Days: String(days),
    Hours: String(hours).padStart(2, "0"),
    Minutes: String(minutes).padStart(2, "0"),
    Seconds: String(seconds).padStart(2, "0"),
  };
}

export function LoveCounter() {
  const [time, setTime] = useState<TimeParts>(getTimeParts);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = window.setInterval(() => setTime(getTimeParts()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section aria-labelledby="counter-heading" className="relative overflow-hidden bg-[#6a1b9a] px-6 py-24 text-white sm:px-10 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,126,179,0.7),transparent_28%),radial-gradient(circle_at_85%_80%,rgba(255,77,141,0.5),transparent_30%)]" />
      <div className="relative mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.65 }}
          className="text-xs font-semibold uppercase tracking-[0.26em] text-white/70"
        >
          {relationship.label}
        </motion.p>
        <motion.h2
          id="counter-heading"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7, delay: reduceMotion ? 0 : 0.1 }}
          className="mt-5 font-serif text-4xl tracking-[-0.045em] sm:text-6xl"
        >
          And still counting.
        </motion.h2>

        <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {Object.entries(time).map(([label, value]) => (
            <div className="rounded-3xl border border-white/20 bg-white/10 px-4 py-6 backdrop-blur-md sm:px-5 sm:py-8" key={label}>
              <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/65">{label}</dt>
              <dd className="mt-3 font-serif text-4xl tracking-[-0.05em] sm:text-5xl">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
