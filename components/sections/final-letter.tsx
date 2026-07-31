"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { finalLetter } from "@/data/final-letter";
import { HeartMark } from "@/components/ui/heart-mark";

const letterText = [finalLetter.greeting, ...finalLetter.paragraphs, finalLetter.signature].join("\n\n");

export function FinalLetter() {
  const [typedText, setTypedText] = useState("");
  const reduceMotion = useReducedMotion();
  const letterRef = useRef<HTMLElement>(null);
  const isInView = useInView(letterRef, { once: true, amount: 0.45 });

  useEffect(() => {
    if (!isInView || reduceMotion) return;

    let index = 0;
    const interval = window.setInterval(() => {
      index += 2;
      setTypedText(letterText.slice(0, index));
      if (index >= letterText.length) window.clearInterval(interval);
    }, 18);

    return () => window.clearInterval(interval);
  }, [isInView, reduceMotion]);

  const displayText = reduceMotion ? letterText : typedText;

  return (
    <section ref={letterRef} aria-labelledby="final-letter-heading" className="relative overflow-hidden bg-[#2b1033] px-6 py-28 text-white sm:px-10 sm:py-36">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,126,179,0.32),transparent_36%)]" />
      <motion.article
        initial={{ opacity: 0, rotateX: -14, y: 40 }}
        transition={{ duration: reduceMotion ? 0.01 : 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.3 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        className="relative mx-auto max-w-3xl rounded-[2rem] bg-[#fffdf8] p-8 text-[#422d35] shadow-[0_35px_100px_rgba(0,0,0,0.32)] sm:p-14"
      >
        <HeartMark className="size-6 text-[#ff4d8d]" />
        <h2 id="final-letter-heading" className="sr-only">Final letter</h2>
        <p className="mt-8 whitespace-pre-line font-serif text-xl leading-8 tracking-[-0.015em] sm:text-2xl sm:leading-9">{displayText}</p>
        {!reduceMotion && typedText.length < letterText.length && isInView && <span aria-hidden="true" className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-[#ff4d8d] align-middle" />}
      </motion.article>
    </section>
  );
}
