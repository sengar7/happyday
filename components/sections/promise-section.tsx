"use client";

import { motion, useReducedMotion } from "motion/react";
import { promises } from "@/data/promises";

export function PromiseSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="promises-heading" className="bg-[#fff8fc] px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-[#d7bca2]/55 bg-[#fffdf7] px-7 py-12 shadow-[0_25px_75px_rgba(108,71,40,0.12)] [background-image:linear-gradient(to_bottom,transparent_0,transparent_2rem,#e8ddca_2.05rem)] [background-size:100%_2.05rem] sm:px-14 sm:py-16">
        <div className="border-l-2 border-[#ff7eb3]/35 pl-6 sm:pl-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6a1b9a]">A page from my notebook</p>
          <h2 id="promises-heading" className="mt-5 font-serif text-4xl tracking-[-0.05em] text-[#3e2b24] sm:text-6xl">My promises to you.</h2>
          <ol className="mt-12 space-y-8">
            {promises.map((promise, index) => (
              <motion.li
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                key={promise}
                transition={{ duration: reduceMotion ? 0.01 : 1, delay: reduceMotion ? 0 : index * 0.16, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.75 }}
                whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              >
                <span className="mr-3 font-serif text-xl text-[#ff4d8d]">{index + 1}.</span>
                <span className="font-serif text-xl leading-8 tracking-[-0.02em] text-[#4b352d] sm:text-2xl">{promise}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
