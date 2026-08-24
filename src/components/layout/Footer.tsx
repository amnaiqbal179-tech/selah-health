"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Send,
  ShieldCheck,
  Lock,
  Sparkles,
  MapPin,
  Clock,
  ArrowUp,
  CheckCircle2,
} from "lucide-react";

const LOCATIONS = [
  {
    city: "Boston",
    address: "100 Cambridge St, Suite 1400",
    zip: "Boston, MA 02114",
    phone: "+1 (617) 555-0192",
  },
  {
    city: "New York",
    address: "450 Lexington Ave, Fl 22",
    zip: "New York, NY 10017",
    phone: "+1 (212) 555-0148",
  },
];

// View-In & View-Out Animation Variants
const scrollRevealVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
    filter: "blur(4px)",
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FDFBF7] text-[#1A1B1F] pt-16 pb-10 border-t border-[#E2DACD]/60 relative overflow-hidden">
      
      {/* Background Soft Glow Drifts (View-In & View-Out Animated) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-[#C6BDDC]/30 to-[#F2EFF8]/50 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Newsletter Banner with View-In / View-Out Scroll Animation */}
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // once: false triggers view-in and view-out
          className="rounded-3xl bg-gradient-to-r from-[#F2EFF8]/90 via-white to-[#F2EFF8]/70 border border-[#C6BDDC]/50 p-6 sm:p-9 mb-14 shadow-sm relative overflow-hidden backdrop-blur-xs"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#5A5180] font-bold px-3 py-0.5 rounded-full bg-white border border-[#C6BDDC]/40 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-[#8C82B5]" /> Clinical Digest
                </span>
                
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Intake Open
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-[#1A1B1F] font-bold">
                Stay updated with evidence-based insights.
              </h3>
              <p className="text-xs text-[#2B2D33]/70 max-w-md">
                Monthly digests on clinical psychiatry, stress architecture, and practice updates.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="w-full md:w-auto shrink-0">
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-xs font-semibold text-[#5A5180] bg-white px-5 py-3 rounded-2xl border border-[#C6BDDC]/60 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Subscribed to updates.</span>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter clinical email..."
                      required
                      className="bg-white border border-[#C6BDDC]/60 focus:border-[#5A5180] text-[#1A1B1F] placeholder:text-[#1A1B1F]/40 text-xs rounded-xl px-4 py-2.5 outline-none transition-all w-full sm:w-64 shadow-2xs"
                    />
                    <motion.button
                      whileHover={{ scale: 1.04, backgroundColor: "#484067" }}
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      className="bg-[#5A5180] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                    >
                      <span>Join</span>
                      <Send className="w-3 h-3" />
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Staggered Grid with Scroll View-In & View-Out */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // triggers every time section enters or leaves viewport
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#E2DACD]/60 text-xs"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-8 h-8 rounded-xl bg-[#5A5180] flex items-center justify-center text-white font-serif font-bold text-base shadow-xs cursor-pointer"
              >
                S
              </motion.div>
              <span className="font-serif text-lg font-bold text-[#1A1B1F]">
                Selah Health
              </span>
            </div>
            <p className="text-[#2B2D33]/70 leading-relaxed max-w-sm">
              Restoring cognitive clarity through integrated psychiatric expertise, personalized neuro-biomarker protocols, and compassionate care pathways.
            </p>
            <div className="flex items-center gap-3 text-[#5A5180] font-medium pt-1">
              <motion.span
                whileHover={{ y: -2 }}
                className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-[#E2DACD]/80 shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C82B5]" /> HIPAA Compliant
              </motion.span>
              <motion.span
                whileHover={{ y: -2 }}
                className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-[#E2DACD]/80 shadow-2xs"
              >
                <Lock className="w-3.5 h-3.5 text-[#8C82B5]" /> Encrypted Portal
              </motion.span>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#8C82B5]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-[#2B2D33]/80 font-medium">
              {["Care Pathways", "Specialists", "Insights", "Insurance & Pricing"].map((item) => (
                <li key={item}>
                  <motion.a
                    whileHover={{ x: 3 }}
                    href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                    className="hover:text-[#5A5180] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#5A5180]" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Clinical Care Links */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#8C82B5]">
              Clinical Care
            </h4>
            <ul className="space-y-2.5 text-[#2B2D33]/80 font-medium">
              {["Executive Burnout", "Sleep Architecture", "Mood & Anxiety", "Telehealth Visit"].map((item) => (
                <li key={item}>
                  <motion.a
                    whileHover={{ x: 3 }}
                    href="#specialists"
                    className="hover:text-[#5A5180] transition-colors inline-block"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Locations Column */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#8C82B5]">
              Practice Locations
            </h4>

            <div className="flex gap-1 bg-[#F2EFF8] p-1 rounded-lg border border-[#C6BDDC]/30">
              {LOCATIONS.map((loc, idx) => (
                <button
                  key={loc.city}
                  onClick={() => setActiveLocation(idx)}
                  className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                    activeLocation === idx
                      ? "bg-white text-[#5A5180] shadow-2xs"
                      : "text-[#2B2D33]/60 hover:text-[#1A1B1F]"
                  }`}
                >
                  {loc.city}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-1.5 text-[#2B2D33]/80 pt-1"
              >
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8C82B5] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1A1B1F]">
                      {LOCATIONS[activeLocation].address}
                    </p>
                    <p>{LOCATIONS[activeLocation].zip}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pt-1 text-[#5A5180] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#8C82B5]" />
                  <span>Mon – Fri: 8 AM – 7 PM EST</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Bottom Bar with Scroll-In Animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#2B2D33]/60"
        >
          <p>© {new Date().getFullYear()} Selah Health Psychiatry & Care. All rights reserved.</p>

          <div className="flex items-center gap-6 font-medium">
            <a href="#" className="hover:text-[#5A5180] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#5A5180] transition-colors">Terms of Service</a>
            
            {/* Animated Back to Top Button */}
            <motion.button
              whileHover={{ y: -4, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={scrollToTop}
              className="bg-white border border-[#C6BDDC]/60 hover:border-[#5A5180] text-[#5A5180] p-2.5 rounded-full transition-all shadow-xs cursor-pointer flex items-center justify-center"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}