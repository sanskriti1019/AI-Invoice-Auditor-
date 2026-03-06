"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMedia } from "react-use";

import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import WhatItChecks from "@/components/sections/WhatItChecks";
import Demo from "@/components/sections/Demo";
import Dashboard from "@/components/sections/Dashboard";
import DesignPhilosophy from "@/components/sections/DesignPhilosophy";
import WriteUp from "@/components/sections/WriteUp";
import Footer from "@/components/sections/Footer";
import IntroScreen from "@/components/sections/IntroScreen";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const isDesktop = useMedia("(min-width: 1024px)", true);

  // Prevent scrolling while intro is active
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showIntro]);

  return (
    <>
      <CustomCursor isDesktop={isDesktop} />
      
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroScreen key="intro" onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <motion.main
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <Hero />
          <Problem />
          <HowItWorks />
          <WhatItChecks />
          <Demo />
          <Dashboard />
          <DesignPhilosophy />
          <WriteUp />
          <Footer />
        </motion.main>
      )}
    </>
  );
}
