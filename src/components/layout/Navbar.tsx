"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Sparkles, ShieldCheck } from "lucide-react";

const NAV_LINKS = [
  { name: "Care Pathways", href: "#pathways" },
  { name: "Specialists", href: "#specialists" },
  { name: "Insights", href: "#resources" },
  { name: "Insurance", href: "#trust" },
];

interface NavbarProps {
  onOpenAssessment?: () => void;
}

export default function Navbar({ onOpenAssessment }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleActionClick = () => {
    if (onOpenAssessment) {
      onOpenAssessment();
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pointer-events-none"
    >
      <nav
        className={`max-w-7xl mx-auto rounded-full transition-all duration-500 ease-out pointer-events-auto px-5 sm:px-6 py-3 flex items-center justify-between relative ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-xl shadow-[#1A1B1F]/5 border border-[#C6BDDC]/50 py-2.5"
            : "bg-[#FDFBF7]/85 backdrop-blur-md border border-[#E2DACD]/80"
        }`}
      >
        {/* Glow Accent under Navbar when Scrolled */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#8C82B5]/10 via-transparent to-[#8C82B5]/10 pointer-events-none transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Brand Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 group cursor-pointer z-10"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#5A5180] text-white flex items-center justify-center font-serif font-bold text-sm shadow-md group-hover:bg-[#1A1B1F] transition-colors duration-300">
              S
            </div>
            <motion.span
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#8C82B5] border-2 border-[#FDFBF7]"
            />
          </div>
          <div>
            <span className="font-serif text-base font-bold text-[#1A1B1F] tracking-tight block leading-none group-hover:text-[#5A5180] transition-colors">
              Selah Health
            </span>
            <span className="text-[8px] font-bold tracking-widest text-[#8C82B5] uppercase block pt-0.5">
              Psychiatry & Care
            </span>
          </div>
        </motion.a>

        {/* Desktop Interactive Pill Links */}
        <div
          className="hidden md:flex items-center gap-1 relative px-3 py-1 rounded-full bg-[#F2EFF8]/60 border border-[#C6BDDC]/40 backdrop-blur-sm z-10"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredIndex(index)}
              className="relative px-4 py-1.5 text-xs font-semibold text-[#2B2D33] hover:text-[#5A5180] transition-colors z-10"
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-xs -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3 z-10">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleActionClick}
            className="px-3.5 py-1.5 rounded-full border border-[#C6BDDC]/60 text-[11px] font-bold text-[#5A5180] bg-white/60 hover:bg-white transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#5A5180]" />
            <span>Intake Open</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 10px 25px -5px rgba(90, 81, 128, 0.35)" }}
            whileTap={{ scale: 0.96 }}
            onClick={handleActionClick}
            className="px-5 py-2 rounded-full bg-[#5A5180] hover:bg-[#1A1B1F] text-white text-xs font-semibold transition-all duration-300 shadow-md flex items-center gap-1.5 group cursor-pointer"
          >
            <span>Begin Journey</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>

        {/* Mobile Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#1A1B1F] p-2 rounded-full bg-[#F2EFF8] border border-[#C6BDDC]/50 focus:outline-none cursor-pointer z-10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#5A5180]" /> : <Menu className="w-5 h-5 text-[#5A5180]" />}
        </motion.button>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mt-3 rounded-3xl p-6 shadow-2xl border border-[#C6BDDC]/60 pointer-events-auto max-w-7xl mx-auto bg-white/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2 text-sm font-semibold text-[#1A1B1F]">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-2xl hover:bg-[#F2EFF8] text-[#2B2D33] hover:text-[#5A5180] transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8C82B5]" />
                </a>
              ))}
            </div>

            <div className="pt-5 mt-3 border-t border-[#C6BDDC]/40 flex flex-col gap-3">
              <button
                onClick={handleActionClick}
                className="w-full py-3.5 rounded-full bg-[#5A5180] hover:bg-[#1A1B1F] text-white font-semibold text-xs text-center shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C6BDDC]" />
                <span>Begin Assessment Journey</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}