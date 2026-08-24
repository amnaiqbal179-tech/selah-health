"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";

export default function IntakeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [careType, setCareType] = useState("");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-cream-50 border border-cream-300 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-charcoal-800/60 hover:text-charcoal-900 p-1 rounded-full bg-cream-200/50"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[10px] font-bold text-sage-600 tracking-widest uppercase block mb-1">
            Step {step} of 2 • Intake Matching
          </span>

          {step === 1 ? (
            <div className="space-y-6 pt-2">
              <h3 className="text-2xl font-serif text-charcoal-900">
                What support pathway fits your needs today?
              </h3>
              <div className="space-y-3">
                {[
                  "Psychiatry & Medication Guidance",
                  "Talk Therapy & Counseling",
                  "Combined Hybrid Mental Healthcare",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setCareType(option)}
                    className={`w-full p-4 rounded-2xl text-left border text-sm transition-all ${
                      careType === option
                        ? "border-sage-600 bg-sage-500/10 font-medium"
                        : "border-cream-300 bg-cream-100/60 hover:bg-cream-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                disabled={!careType}
                onClick={() => setStep(2)}
                className="w-full bg-charcoal-900 disabled:opacity-40 text-cream-50 hover:bg-sage-600 py-3.5 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-6 pt-2 text-center">
              <div className="w-12 h-12 bg-sage-600 text-cream-50 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif text-charcoal-900">
                Matched with Care Coordinator
              </h3>
              <p className="text-xs text-charcoal-800/80 font-light leading-relaxed">
                Selected Pathway: <span className="font-semibold text-sage-600">{careType}</span>. Our intake specialist will reach out within 2 business hours.
              </p>
              <button
                onClick={onClose}
                className="w-full bg-charcoal-900 text-cream-50 hover:bg-sage-600 py-3.5 rounded-full text-xs font-semibold transition-all"
              >
                Return to Experience
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}