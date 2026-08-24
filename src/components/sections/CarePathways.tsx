"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Moon, Shield, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";

const PATHWAYS = [
  {
    title: "Executive Burnout & Resilience",
    desc: "Targeted neuro-optimization, cortisol modulation, and biometric tracking tailored for high-stress leadership environments.",
    icon: Brain,
    tag: "Most Requested",
    bullets: ["Biomarker Screening", "Stress Recovery Protocols"],
  },
  {
    title: "Sleep Architecture & Rest",
    desc: "Comprehensive circadian re-alignment and non-pharmacological sleep synchronization to maximize cognitive restoration.",
    icon: Moon,
    tag: "Clinical Care",
    bullets: ["REM Phase Analysis", "Circadian Synchronization"],
  },
  {
    title: "Concierge Psychiatry",
    desc: "Direct 1-on-1 access to elite psychiatrists for precision diagnostics, medication protocols, and psychodynamic therapy.",
    icon: Shield,
    tag: "Private Intake",
    bullets: ["1-on-1 Direct Access", "Custom Psychodynamics"],
  },
];

// Parent Scroll Stagger Variant
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Advanced Card Scroll & View-In/Out Variant
const cardScrollVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.95,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Header Fade Variant
const headerVariants = {
  hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function CarePathways({ onOpenAssessment }: { onOpenAssessment?: () => void }) {
  return (
    <section id="pathways" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background Ambient Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#F2EFF8] via-[#C6BDDC]/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ staggerChildren: 0.12 }}
        className="text-center max-w-2xl mx-auto space-y-4 mb-16 sm:mb-20"
      >
        <motion.div variants={headerVariants} className="inline-block">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#5A5180] bg-[#F2EFF8] border border-[#C6BDDC]/40 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8C82B5]" />
            Tailored Clinical Protocols
          </span>
        </motion.div>

        <motion.h2
          variants={headerVariants}
          className="text-3xl sm:text-5xl font-serif text-[#1A1B1F] tracking-tight font-bold"
        >
          Specialized Care Pathways
        </motion.h2>

        <motion.p
          variants={headerVariants}
          className="text-sm sm:text-base text-[#2B2D33]/75 font-light leading-relaxed max-w-lg mx-auto"
        >
          Evidence-backed therapeutic interventions designed specifically for high-cognitive demands and emotional restoration.
        </motion.p>
      </motion.div>

      {/* Animated Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }} // Re-triggers animations when scrolling up/down
        className="grid md:grid-cols-3 gap-6 sm:gap-8"
      >
        {PATHWAYS.map((path, idx) => {
          const Icon = path.icon;
          return (
            <motion.div
              key={idx}
              variants={cardScrollVariants}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group relative bg-white/80 border border-[#C6BDDC]/60 rounded-[2.2rem] p-7 sm:p-8 shadow-xs hover:shadow-2xl hover:border-[#5A5180]/50 transition-all duration-500 backdrop-blur-xl flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Card Accent Light on Hover */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C6BDDC]/20 rounded-full blur-2xl group-hover:bg-[#5A5180]/15 transition-all duration-500 pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Icon & Tag Header */}
                <div className="flex items-center justify-between">
                  <motion.div 
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    className="w-13 h-13 rounded-2xl bg-[#F2EFF8] border border-[#C6BDDC]/40 text-[#5A5180] flex items-center justify-center group-hover:bg-[#5A5180] group-hover:text-white transition-all duration-300 shadow-2xs"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#5A5180] bg-[#F2EFF8] border border-[#C6BDDC]/30 px-3 py-1 rounded-full shadow-2xs">
                    {path.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-2.5">
                  <h3 className="text-xl font-serif text-[#1A1B1F] group-hover:text-[#5A5180] transition-colors duration-300 font-semibold">
                    {path.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2B2D33]/75 font-light leading-relaxed">
                    {path.desc}
                  </p>
                </div>

                {/* Micro Bullet Highlights */}
                <div className="pt-2 space-y-2 border-t border-[#E2DACD]/50">
                  {path.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-[11px] font-medium text-[#2B2D33]/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8C82B5]" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="pt-6 mt-6 border-t border-[#E2DACD]/60 flex items-center justify-between relative z-10">
                <button
                  onClick={onOpenAssessment}
                  className="w-full text-xs font-semibold text-[#5A5180] flex items-center justify-between group-hover:text-[#1A1B1F] transition-colors py-1 cursor-pointer"
                >
                  <span>Explore Pathway</span>
                  <div className="w-7 h-7 rounded-full bg-[#F2EFF8] group-hover:bg-[#5A5180] group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}