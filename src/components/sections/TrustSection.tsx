"use client";

import React from "react";
import { motion } from "framer-motion";
import { Dna, ShieldCheck, Activity, Award } from "lucide-react";

const STATS = [
  { value: "99.4%", label: "Clinical Precision Rate", sub: "Based on biomarker tracking" },
  { value: "14 Days", label: "Average Response Time", sub: "For cognitive stabilization" },
  { value: "100%", label: "Confidentiality Guaranteed", sub: "Strict HIPAA compliance" },
];

export default function TrustSection() {
  return (
    <section id="trust" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-[#5A5180] to-[#3B3456] rounded-[3rem] p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8C82B5]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#C3D7E3]">
              <Dna className="w-4 h-4 text-[#C6BDDC]" />
              <span>Biomarker-Driven Care</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif leading-tight">
              Evidence over intuition. Precision over protocol.
            </h2>

            <p className="text-sm sm:text-base text-white/80 font-light max-w-xl leading-relaxed">
              We integrate continuous metabolic tracking, cortisol regulation mapping, and quantitative EEG analysis to build your bespoke psychiatric profile.
            </p>
          </motion.div>

          {/* Animated Stats Cards */}
          <div className="lg:col-span-5 space-y-4">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white">{stat.value}</h3>
                  <p className="text-xs font-semibold text-[#C3D7E3]">{stat.label}</p>
                  <p className="text-[10px] text-white/60 mt-0.5">{stat.sub}</p>
                </div>
                <Activity className="w-6 h-6 text-[#C6BDDC]/60" />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}