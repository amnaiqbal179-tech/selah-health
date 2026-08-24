"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Building2,
  Users,
  Clock,
  Sparkles,
  Award,
} from "lucide-react";

const NETWORKS = ["Aetna", "BlueCross BlueShield", "Cigna", "UnitedHealthcare", "Optum"];
const STATES = ["California", "New York", "Texas", "Florida", "Illinois"];

// Mock matched specialists data based on region
const SPECIALIST_PREVIEWS: Record<string, { count: number; leadDoctor: string; waitTime: string }> = {
  California: { count: 18, leadDoctor: "Dr. Elena Rostova, MD", waitTime: "< 24 Hours" },
  "New York": { count: 14, leadDoctor: "Dr. Marcus Vance, PhD", waitTime: "< 12 Hours" },
  Texas: { count: 22, leadDoctor: "Dr. Sarah Jenkins, MD", waitTime: "Same Day" },
  Florida: { count: 11, leadDoctor: "Dr. Aris Thorne, MD", waitTime: "< 48 Hours" },
  Illinois: { count: 9, leadDoctor: "Dr. Clara Chen, PsyD", waitTime: "< 24 Hours" },
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.97,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ProviderFilter() {
  const [selectedState, setSelectedState] = useState("California");
  const [selectedInsurance, setSelectedInsurance] = useState("BlueCross BlueShield");

  const currentMatch = SPECIALIST_PREVIEWS[selectedState] || {
    count: 12,
    leadDoctor: "Dr. Elena Rostova, MD",
    waitTime: "< 24 Hours",
  };

  return (
    <section className="px-4 sm:px-6 max-w-7xl mx-auto py-16 sm:py-24 relative overflow-hidden">
      {/* Dynamic Ambient Background Aura */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#C6BDDC]/30 via-[#8C82B5]/20 to-[#F2EFF8]/50 rounded-full blur-3xl -z-10 pointer-events-none"
      />

      {/* Main Filter Glass Container */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="p-8 sm:p-12 md:p-14 rounded-[2.5rem] bg-white/80 border border-[#E2DACD] shadow-2xl backdrop-blur-2xl relative z-10"
      >
        {/* Header Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#E2DACD]/60">
          <div className="max-w-2xl space-y-3">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-widest text-[#5A5180] font-bold px-4 py-1.5 rounded-full bg-[#F2EFF8] border border-[#C6BDDC]/60 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8C82B5] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5A5180]"></span>
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C82B5]" /> Real-Time Coverage Finder
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1B1F] tracking-tight font-bold leading-tight">
              Find in-network care in your region.
            </h2>

            <p className="text-sm sm:text-base text-[#2B2D33]/75 font-light leading-relaxed">
              Instantly match active insurance coverage with certified state-licensed psychiatric specialists.
            </p>
          </div>

          {/* Real-time Matching Counter Badge */}
          <motion.div
            key={selectedState}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#F2EFF8]/80 border border-[#C6BDDC]/50 shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-[#5A5180] text-white flex items-center justify-center">
              <Users className="w-5 h-5 text-[#C3D7E3]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8C82B5] uppercase tracking-wider block">
                Active Providers
              </span>
              <span className="text-sm font-bold text-[#1A1B1F]">
                {currentMatch.count} Board Certified Specialists
              </span>
            </div>
          </motion.div>
        </div>

        {/* Filter Controls Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* State Selection */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-[#5A5180] uppercase tracking-widest flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8C82B5]" />
              Select State
            </label>
            <div className="flex flex-wrap gap-2">
              {STATES.map((st) => {
                const isSelected = selectedState === st;
                return (
                  <motion.button
                    key={st}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedState(st)}
                    className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-300 cursor-pointer ${
                      isSelected
                        ? "text-white shadow-md shadow-[#5A5180]/20"
                        : "text-[#2B2D33]/80 bg-[#F2EFF8]/70 hover:bg-[#F2EFF8] border border-[#C6BDDC]/30"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeStateBg"
                        className="absolute inset-0 bg-[#5A5180] rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{st}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Insurance Selection */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-[#5A5180] uppercase tracking-widest flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#8C82B5]" />
              Insurance Provider
            </label>
            <div className="flex flex-wrap gap-2">
              {NETWORKS.map((net) => {
                const isSelected = selectedInsurance === net;
                return (
                  <motion.button
                    key={net}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedInsurance(net)}
                    className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-300 cursor-pointer ${
                      isSelected
                        ? "text-white shadow-md shadow-[#8C82B5]/20"
                        : "text-[#2B2D33]/80 bg-[#F2EFF8]/70 hover:bg-[#F2EFF8] border border-[#C6BDDC]/30"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeInsuranceBg"
                        className="absolute inset-0 bg-[#8C82B5] rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{net}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Status & Matched Specialist Preview Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedState}-${selectedInsurance}`}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-3xl bg-[#F2EFF8]/90 border border-[#C6BDDC]/70 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 backdrop-blur-xl shadow-lg relative overflow-hidden"
          >
            {/* Soft Ambient Light Glow Inside Card */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/40 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#5A5180] text-white flex items-center justify-center shrink-0 shadow-md">
                <CheckCircle2 className="w-6 h-6 text-[#C3D7E3]" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base sm:text-lg font-serif font-bold text-[#1A1B1F]">
                    In-Network Care Verified in {selectedState}
                  </h4>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#5A5180]/10 text-[#5A5180] border border-[#5A5180]/20">
                    100% Guaranteed
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#2B2D33]/75 font-light">
                  Direct coverage confirmed for <span className="font-semibold text-[#5A5180]">{selectedInsurance}</span>.
                  Average copay: <span className="font-semibold text-[#1A1B1F]">$15 – $35/session</span>.
                </p>

                {/* Sub-meta details */}
                <div className="flex items-center gap-4 pt-1 text-[11px] font-medium text-[#8C82B5]">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#5A5180]" /> Lead: {currentMatch.leadDoctor}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#5A5180]" /> Intake: {currentMatch.waitTime}
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 10px 25px -5px rgba(90, 81, 128, 0.4)" }}
              whileTap={{ scale: 0.96 }}
              className="bg-[#5A5180] hover:bg-[#1A1B1F] text-white px-7 py-3.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md shrink-0 w-full lg:w-auto cursor-pointer group z-10"
            >
              <span>View {currentMatch.count} Matched Specialists</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}