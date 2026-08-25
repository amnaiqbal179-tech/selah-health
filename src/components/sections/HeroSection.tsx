"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, ShieldCheck, Users, Star, Activity } from "lucide-react";

interface HeroSectionProps {
  onOpenAssessment?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function HeroSection({ onOpenAssessment }: HeroSectionProps) {
  return (
    <section className="relative pt-24 sm:pt-32 lg:pt-36 pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Soft Ambient Background Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.35, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        className="absolute top-10 left-1/4 -translate-x-1/2 w-[480px] h-[280px] bg-gradient-to-tr from-[#C6BDDC]/30 to-[#F2EFF8]/50 rounded-full blur-3xl pointer-events-none"
      />

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C6BDDC]/60 shadow-xs backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8C82B5] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5A5180]"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#5A5180]">
                Private Clinical Intake Open
              </span>
            </div>
          </motion.div>

          {/* Corrected Professional Dark Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1A1B1F] leading-[1.12] tracking-tight font-bold"
          >
            Precision psychiatry for <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#5A5180] relative inline-block">
              cognitive clarity
              <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#C6BDDC]/60" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> & resilience.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-[#2B2D33]/80 font-normal max-w-lg leading-relaxed"
          >
            Concierge psychiatry, neuro-biomarker analysis, and evidence-based psychotherapy. Tailored care pathways for high-performing individuals seeking sustainable balance.
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
          >
            <motion.button
              onClick={onOpenAssessment}
              whileHover={{ scale: 1.02, backgroundColor: "#484067" }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#5A5180] text-white px-7 py-3.5 rounded-full font-medium transition-all text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#5A5180]/15 group cursor-pointer"
            >
              <span>Schedule Consultation</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#FFFFFF" }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/90 border border-[#C6BDDC]/80 text-[#1A1B1F] px-6 py-3.5 rounded-full font-medium transition-all text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs backdrop-blur-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#8C82B5]" />
              <span>Explore Protocols</span>
            </motion.button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="pt-6 border-t border-[#E2DACD]/80 flex flex-wrap items-center gap-6 text-xs text-[#2B2D33]/70 font-medium"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1.5 font-bold text-[#1A1B1F]">4.98 Rating</span>
            </div>
            <span className="flex items-center gap-1.5 text-[#5A5180]">
              <ShieldCheck className="w-4 h-4 text-[#8C82B5]" /> HIPAA Compliant
            </span>
            <span className="flex items-center gap-1.5 text-[#2B2D33]">
              <Users className="w-4 h-4 text-[#8C82B5]" /> Confidential Care
            </span>
          </motion.div>
        </motion.div>

        {/* Right Sanctuary Image Card */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="lg:col-span-5 relative mt-4 lg:mt-0"
        >
          <div className="relative rounded-3xl p-2.5 bg-white/80 border border-[#E2DACD] shadow-xl backdrop-blur-xl">
            <div className="relative rounded-2xl overflow-hidden group h-[380px] sm:h-[440px] lg:h-[460px]">
              
              <Image
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop"
                alt="Clinical Sanctuary Space"
                fill
                priority
                className="object-cover object-center filter brightness-[0.96] group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1F]/80 via-transparent to-transparent" />

              {/* Top Pill Overlay */}
              <div className="absolute top-3.5 left-3.5">
                <div className="px-3 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-[#C3D7E3]" />
                  <span>Sanctuary Environment</span>
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-4 left-4 right-4 space-y-2.5 text-white">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#C6BDDC]">
                    Concierge Psychiatric Care
                  </p>
                  <p className="text-sm sm:text-base font-serif font-medium leading-snug text-white/95">
                    “An environment specifically engineered for cognitive rest.”
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center font-serif font-bold text-xs">
                      Ψ
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-white">1-on-1 Specialist Care</p>
                      <p className="text-[10px] text-white/80">Tailored Protocols</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#C3D7E3]">100% Confidential</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}