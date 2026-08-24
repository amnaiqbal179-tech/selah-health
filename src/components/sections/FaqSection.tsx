"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle, MessageSquare } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Care & Therapy" | "Insurance";
}

const FAQS: FAQItem[] = [
  {
    category: "General",
    question: "How quickly can I schedule an initial consultation?",
    answer:
      "Most new patients are matched with a specialist within 48 hours. Once you complete our 2-minute digital assessment, our intake team coordinates your first appointment.",
  },
  {
    category: "Care & Therapy",
    question: "Are virtual (telehealth) appointments available?",
    answer:
      "Yes, we offer 100% HIPAA-compliant virtual psychiatric visits and therapy sessions so you can receive expert care from the comfort of your home.",
  },
  {
    category: "Insurance",
    question: "Do you accept insurance or provide superbills?",
    answer:
      "We partner with major insurance providers. For out-of-network care, we automatically generate itemized superbills that you can submit for reimbursement.",
  },
  {
    category: "Care & Therapy",
    question: "What is the difference between psychiatry and psychotherapy?",
    answer:
      "Psychiatrists are medical doctors (MDs) who diagnose, manage complex medical biomarkers, and prescribe treatment. Psychotherapists focus on talk therapy and behavioral strategies.",
  },
];

const CATEGORIES = ["All", "General", "Care & Therapy", "Insurance"] as const;

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredFaqs =
    activeCategory === "All"
      ? FAQS
      : FAQS.filter((faq) => faq.category === activeCategory);

  return (
    <section id="resources" className="px-4 sm:px-6 md:px-8 max-w-5xl mx-auto py-16 sm:py-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-[#5A5180] font-bold px-4 py-1.5 rounded-full bg-[#F2EFF8] border border-[#C6BDDC]/50"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#8C82B5]" /> Clear Answers
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-serif text-[#1A1B1F] tracking-tight"
        >
          Frequently Asked Questions
        </motion.h2>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setOpenIndex(null);
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-[#5A5180] text-white shadow-md"
                : "bg-white/80 text-[#2B2D33]/70 hover:bg-[#F2EFF8] border border-[#E2DACD]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <motion.div layout className="space-y-4">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              layout
              key={faq.question}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-white border-[#C6BDDC] shadow-md"
                  : "bg-white/60 hover:bg-white border-[#E2DACD]/80 shadow-2xs"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-serif text-base sm:text-lg font-bold text-[#1A1B1F]">
                  {faq.question}
                </span>

                {/* Animated Plus / Cross Icon */}
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "backOut" }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen
                      ? "bg-[#5A5180] text-white"
                      : "bg-[#F2EFF8] text-[#5A5180]"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </motion.div>
              </button>

              {/* Animated Expandable Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#2B2D33]/80 leading-relaxed border-t border-[#F2EFF8] pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}