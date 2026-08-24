"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Sparkles, Brain, Moon, Zap, Shield } from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "What primary focus brings you to Selah?",
    subtitle: "Select the area where you need the most support right now.",
    options: [
      { id: "burnout", label: "Executive Stress & Burnout", icon: Zap },
      { id: "anxiety", label: "Cognitive Overload & Anxiety", icon: Brain },
      { id: "sleep", label: "Sleep Architecture & Rest", icon: Moon },
      { id: "performance", label: "Peak Mental Performance", icon: Sparkles },
    ],
  },
  {
    id: 2,
    title: "What type of care protocol do you prefer?",
    subtitle: "We tailor treatment models to your personal lifestyle.",
    options: [
      { id: "psychiatry", label: "Concierge Psychiatry & Biomarkers", icon: Shield },
      { id: "therapy", label: "Psychodynamic Integrative Therapy", icon: Brain },
      { id: "hybrid", label: "Comprehensive Hybrid Protocol", icon: Sparkles },
    ],
  },
  {
    id: 3,
    title: "How soon would you like to begin?",
    subtitle: "Immediate priority intake is available for urgent needs.",
    options: [
      { id: "immediate", label: "Within 24–48 Hours (Priority)", icon: Zap },
      { id: "week", label: "This Week", icon: Brain },
      { id: "flexible", label: "Flexible Intake", icon: Sparkles },
    ],
  },
];

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssessmentModal({ isOpen, onClose }: AssessmentModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentStep]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A1B1F]/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#FDFBF7] rounded-[2.5rem] border border-[#C6BDDC]/60 p-6 sm:p-10 shadow-2xl z-10 overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#F2EFF8] text-[#1A1B1F] hover:bg-[#E2DACD] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isCompleted ? (
              <div>
                {/* Progress Bar Ticker */}
                <div className="flex items-center gap-2 mb-8">
                  {STEPS.map((step, idx) => (
                    <div
                      key={step.id}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                        idx <= currentStep ? "bg-[#5A5180]" : "bg-[#E2DACD]"
                      }`}
                    />
                  ))}
                </div>

                {/* Animated Step Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C82B5] block mb-1">
                        Step 0{currentStep + 1} of 0{STEPS.length}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1B1F] leading-tight">
                        {STEPS[currentStep].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#2B2D33]/70 font-light mt-1">
                        {STEPS[currentStep].subtitle}
                      </p>
                    </div>

                    {/* Options Grid */}
                    <div className="space-y-3 pt-2">
                      {STEPS[currentStep].options.map((option) => {
                        const Icon = option.icon;
                        const isSelected = selectedAnswers[currentStep] === option.id;

                        return (
                          <motion.button
                            key={option.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleSelectOption(option.id)}
                            className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                              isSelected
                                ? "bg-[#5A5180] text-white border-[#5A5180] shadow-md"
                                : "bg-white/80 border-[#C6BDDC]/60 text-[#1A1B1F] hover:border-[#5A5180]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                  isSelected ? "bg-white/20 text-white" : "bg-[#F2EFF8] text-[#5A5180]"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium">{option.label}</span>
                            </div>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Footer Controls */}
                <div className="mt-8 pt-4 border-t border-[#E2DACD]/60 flex items-center justify-between">
                  <button
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="text-xs font-semibold text-[#5A5180] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>

                  <button
                    disabled={!selectedAnswers[currentStep]}
                    onClick={handleNext}
                    className="bg-[#5A5180] hover:bg-[#484067] disabled:opacity-50 text-white px-7 py-3 rounded-full text-xs font-semibold transition-all flex items-center gap-2 shadow-md"
                  >
                    <span>{currentStep === STEPS.length - 1 ? "Complete Match" : "Next Step"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Success Step Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-[#5A5180] text-white flex items-center justify-center mx-auto shadow-lg">
                  <Sparkles className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-serif text-[#1A1B1F]">
                    Care Pathway Matched
                  </h3>
                  <p className="text-sm text-[#2B2D33]/70 font-light max-w-md mx-auto leading-relaxed">
                    Based on your selections, we have allocated priority intake slots for custom concierge assessment.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F2EFF8] border border-[#C6BDDC]/60 text-xs text-[#5A5180] font-semibold">
                  Intake Specialist Assigned • Available Today
                </div>

                <button
                  onClick={handleReset}
                  className="w-full bg-[#5A5180] text-white py-4 rounded-full font-semibold text-sm shadow-md hover:bg-[#484067] transition-all"
                >
                  Schedule Initial Consultation
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}