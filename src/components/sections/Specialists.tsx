"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Calendar, Star } from "lucide-react";

interface SpecialistsProps {
  onOpenAssessment?: () => void;
  onOpenBooking?: () => void;
}

const SPECIALISTS = [
  {
    name: "Dr. Elena Rostova",
    title: "Lead Executive Psychiatrist",
    degree: "MD, HARVARD MEDICAL",
    focus: "Focus: Cognitive Performance & Burnout",
    rating: "4.9",
    availability: "Next Available: Tomorrow",
    image:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Dr. Marcus Vance",
    title: "Integrative Neuropsychiatrist",
    degree: "MD, JOHNS HOPKINS",
    focus: "Focus: Biomarkers & Sleep Architecture",
    rating: "5.0",
    availability: "Next Available: Today",
    image:
      "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Specialists({ onOpenAssessment, onOpenBooking }: SpecialistsProps) {
  const handleBookingClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else if (onOpenAssessment) {
      onOpenAssessment();
    }
  };

  return (
    <section id="specialists" className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto py-16 sm:py-24 relative">
      {/* Background Section Accent Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-radial from-[#C6BDDC]/15 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block text-[10px] sm:text-xs uppercase tracking-widest text-[#5A5180] font-bold px-4 py-1.5 rounded-full bg-[#F2EFF8] border border-[#C6BDDC]/50 shadow-xs"
        >
          Clinical Excellence
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1B1F] tracking-tight"
        >
          Meet Your Care Team
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs sm:text-sm text-[#2B2D33]/70 font-light"
        >
          Board-certified clinical leaders delivering personalized precision psychiatry.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
      >
        {SPECIALISTS.map((doctor, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            className="group relative rounded-3xl bg-white/80 backdrop-blur-xl border border-[#E2DACD]/80 p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:border-[#C6BDDC] transition-all duration-500 flex flex-col sm:flex-row gap-6 items-center sm:items-start overflow-hidden"
          >
            {/* Subtle Inner Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8C82B5]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Doctor Headshot Container */}
            <div className="relative w-44 sm:w-48 h-56 rounded-2xl overflow-hidden shrink-0 shadow-md bg-[#F2EFF8]">
              <motion.img
                src={doctor.image}
                alt={doctor.name}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full h-full object-cover object-top transition-transform duration-500"
              />

              {/* Verified Badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#1A1B1F] flex items-center gap-1 shadow-xs border border-black/5">
                <CheckCircle2 className="w-3 h-3 text-[#5A5180]" />
                <span>Verified</span>
              </div>

              {/* Rating Badge */}
              <div className="absolute bottom-3 right-3 bg-[#1A1B1F]/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-medium text-white flex items-center gap-1 shadow-xs">
                <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                <span>{doctor.rating}</span>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex flex-col justify-between h-full space-y-4 text-center sm:text-left w-full relative z-10">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold tracking-widest text-[#8C82B5] uppercase block">
                  {doctor.degree}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1A1B1F] font-bold group-hover:text-[#5A5180] transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-xs font-medium text-[#2B2D33]/70">
                  {doctor.title}
                </p>
              </div>

              {/* Specialization Tag */}
              <div className="bg-[#F2EFF8]/80 border border-[#C6BDDC]/40 p-3 rounded-xl space-y-1">
                <p className="text-[11px] font-medium text-[#5A5180] leading-snug">
                  {doctor.focus}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-[10px] text-[#2B2D33]/60 font-light">
                  <Calendar className="w-3 h-3 text-[#8C82B5]" />
                  <span>{doctor.availability}</span>
                </div>
              </div>

              {/* Consultation Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookingClick}
                className="w-full bg-[#5A5180] hover:bg-[#1A1B1F] text-white text-xs font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}