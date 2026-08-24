"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Sparkles, RefreshCw, HeartPulse } from "lucide-react";

const scrollRevealVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function BreathingSanctuary() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");
  const [secondsLeft, setSecondsLeft] = useState(4);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 4));
    }, 1000);

    const interval = setInterval(() => {
      setPhase((prev) => {
        if (prev === "Inhale") return "Hold";
        if (prev === "Hold") return "Exhale";
        return "Inhale";
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [isActive]);

  const handleReset = () => {
    setIsActive(false);
    setPhase("Inhale");
    setSecondsLeft(4);
  };

  return (
    <section className="px-4 sm:px-6 max-w-5xl mx-auto py-12 sm:py-16">
      <motion.div
        variants={scrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        className="rounded-[2.5rem] bg-gradient-to-b from-[#F2EFF8]/70 via-[#FDFBF7] to-[#FDFBF7] border border-[#E2DACD] px-6 py-10 sm:p-12 shadow-xl text-center relative overflow-hidden backdrop-blur-2xl"
      >
        {/* Dynamic Drifting Background Glows */}
        <motion.div
          animate={{
            scale: isActive ? [1, 1.25, 1] : 1,
            opacity: isActive ? [0.2, 0.45, 0.2] : 0.2,
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#C6BDDC]/40 rounded-full blur-3xl pointer-events-none z-0"
        />

        <div className="max-w-xl mx-auto space-y-6 relative z-10">
          
          {/* Clinical Badge */}
          <div className="inline-block">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-widest text-[#5A5180] font-bold px-4 py-1.5 rounded-full bg-white/90 border border-[#C6BDDC]/60 shadow-2xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#8C82B5]" /> Micro-Restoration Protocol
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1B1F] tracking-tight font-bold">
              60-Second Cognitive Reset
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2D33]/70 font-light max-w-md mx-auto">
              Synchronize parasympathetic nervous system activity through structured box-breathing interval intervals.
            </p>
          </div>

          {/* Interactive Breathing Sphere Container */}
          <div className="pt-6 pb-4 flex flex-col items-center justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
              
              {/* Outer Wave Pulse Ring 1 */}
              <motion.div
                className="absolute inset-0 rounded-full bg-[#8C82B5]/10 border border-[#8C82B5]/20"
                animate={{
                  scale: isActive ? (phase === "Inhale" ? 1.35 : phase === "Hold" ? 1.35 : 0.85) : 1,
                  opacity: isActive ? (phase === "Hold" ? 0.7 : 0.3) : 0.2,
                }}
                transition={{ duration: 4, ease: "easeInOut" }}
              />

              {/* Middle Wave Pulse Ring 2 */}
              <motion.div
                className="absolute inset-4 rounded-full bg-[#C6BDDC]/20 border border-[#C6BDDC]/40"
                animate={{
                  scale: isActive ? (phase === "Inhale" ? 1.2 : phase === "Hold" ? 1.2 : 0.9) : 1,
                  opacity: isActive ? (phase === "Hold" ? 0.8 : 0.4) : 0.3,
                }}
                transition={{ duration: 4, ease: "easeInOut" }}
              />

              {/* Center Interactive Breathing Orb */}
              <motion.div
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#5A5180] to-[#3B3456] text-white flex flex-col items-center justify-center shadow-2xl relative z-10 border border-white/20"
                animate={{
                  scale: isActive ? (phase === "Inhale" ? 1.12 : phase === "Hold" ? 1.12 : 0.92) : 1,
                }}
                transition={{ duration: 4, ease: "easeInOut" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isActive ? phase : "Ready"}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <span className="font-serif text-xl sm:text-2xl font-medium tracking-wide">
                      {isActive ? phase : "Ready?"}
                    </span>
                    <span className="text-[10px] tracking-widest uppercase mt-1 font-bold text-[#C6BDDC]">
                      {isActive ? `${secondsLeft}s` : "Press Start"}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "#484067" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsActive(!isActive)}
                className="bg-[#5A5180] text-white font-medium px-8 py-3.5 rounded-full transition-all text-xs sm:text-sm flex items-center gap-2.5 shadow-md shadow-[#5A5180]/20 cursor-pointer"
              >
                {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isActive ? "Pause Session" : "Begin Breathing"}</span>
              </motion.button>

              {isActive && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="p-3.5 rounded-full bg-white border border-[#C6BDDC]/60 text-[#5A5180] shadow-2xs hover:bg-[#F2EFF8] transition-colors cursor-pointer"
                  title="Reset Session"
                >
                  <RefreshCw className="w-4 h-4" />
                </motion.button>
              )}
            </div>

          </div>

          {/* Footer Metric */}
          <div className="pt-4 border-t border-[#E2DACD]/60 flex items-center justify-center gap-2 text-xs text-[#2B2D33]/60 font-medium">
            <HeartPulse className="w-4 h-4 text-[#8C82B5]" />
            <span>Reduces acute stress markers within 4 breath cycles.</span>
          </div>

        </div>
      </motion.div>
    </section>
  );
}