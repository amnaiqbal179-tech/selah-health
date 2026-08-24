"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BreathingLight() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden -z-10">
      <motion.div
        animate={{
          scale: [1, 1.35, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full bg-gradient-to-tr from-[#C6BDDC]/40 via-[#A9C2D4]/30 to-[#EBB8AA]/30 blur-[120px]"
      />
    </div>
  );
}