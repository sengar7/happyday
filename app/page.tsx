"use client";

import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Hero } from "@/components/sections/hero";
import { LoadingScreen } from "@/components/sections/loading-screen";
import { StoryTimeline } from "@/components/sections/story-timeline";
import { LoveCounter } from "@/components/sections/love-counter";
import { ReasonsGrid } from "@/components/sections/reasons-grid";
import { HeartGarden } from "@/components/sections/heart-garden";
import { SecretLetters } from "@/components/sections/secret-letters";
import { PromiseSection } from "@/components/sections/promise-section";
import { FinalLetter } from "@/components/sections/final-letter";
import { FinalSurprise } from "@/components/sections/final-surprise";
import { Ending } from "@/components/sections/ending";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 1800);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main id="main-content">
      <Hero />
      <StoryTimeline />
      <LoveCounter />
      <ReasonsGrid />
      <HeartGarden />
      <SecretLetters />
      <PromiseSection />
      <FinalLetter />
      <FinalSurprise />
      <Ending />
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
    </main>
  );
}
