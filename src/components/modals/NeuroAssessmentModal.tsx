"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Sparkles, CheckCircle, Brain, Calendar, ShieldCheck, Check } from "lucide-react";

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  {
    id: "focus",
    title: "Primary Clinical Focus",
    subtitle: "Select the primary area where you seek cognitive or emotional restoration.",
    options: [
      { label: "Executive Burnout & High Stress", desc: "Chronic fatigue, workload overwhelm, or decision fatigue." },
      { label: "Sleep & Circadian Disruption", desc: "Difficulty falling/staying asleep, unrefreshing rest." },
      { label: "High-Cognitive Anxiety", desc: "Persistent racing thoughts, physiological tension." },
      { label: "Concierge Psychiatric Care", desc: "Comprehensive diagnostic, biomarker, & therapy intake." },
    ],
  },
  {
    id: "duration",
    title: "Symptom Duration",
    subtitle: "How long have you experienced these cognitive or physical symptoms?",
    options: [
      { label: "Under 1 Month", desc: "Recent onset related to an acute trigger." },
      { label: "1 to 6 Months", desc: "Persistent struggle over recent quarters." },
      { label: "6+ Months", desc: "Long-standing operational or emotional strain." },
    ],
  },
  {
    id: "preference",
    title: "Preferred Modality",
    subtitle: "Choose your ideal consultation structure.",
    options: [
      { label: "In-Person Clinical Sanctuary", desc: "Private physical suite evaluation." },
      { label: "Concierge Telehealth", desc: "Encrypted remote psychiatric sessions." },
      { label: "Hybrid Precision Protocol", desc: "Combined in-person baseline + digital follow-up." },
    ],
  },
];

export default function NeuroAssessmentModal({ isOpen, onClose }: AssessmentModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Booking Form State for Final Step
  const [formData, setFormData] = useState({ name: "", email: "", preferredDate: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeStepData = STEPS[currentStep];

  const handleSelectOption = (label: string) => {
    setAnswers((prev) => ({ ...prev, [activeStepData.id]: label }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
    setIsSubmitted(false);
    setFormData({ name: "", email: "", preferredDate: "" });
    onClose();
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      handleReset();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1B1F]/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white/95 border border-[#E2DACD] rounded-[2.5rem] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl overflow-hidden z-10"
          >
            {/* Header Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-[#F2EFF8] text-[#5A5180] hover:bg-[#5A5180] hover:text-white transition-all cursor-pointer z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {!isCompleted ? (
              <div className="space-y-6">
                {/* Step Indicator */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#5A5180]">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#8C82B5]" /> Cognitive Assessment
                    </span>
                    <span>Step 0{currentStep + 1} / 0{STEPS.length}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-[#F2EFF8] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#5A5180]"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Question Details */}
                <div className="space-y-1.5">
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1B1F] font-bold">
                    {activeStepData.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2B2D33]/70 font-light">
                    {activeStepData.subtitle}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {activeStepData.options.map((option, idx) => {
                    const isSelected = answers[activeStepData.id] === option.label;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelectOption(option.label)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-[#5A5180] text-white border-[#5A5180] shadow-md shadow-[#5A5180]/20"
                            : "bg-[#F2EFF8]/50 text-[#1A1B1F] border-[#C6BDDC]/40 hover:bg-[#F2EFF8]"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <p className={`text-sm font-semibold ${isSelected ? "text-white" : "text-[#1A1B1F]"}`}>
                            {option.label}
                          </p>
                          <p className={`text-xs ${isSelected ? "text-white/80" : "text-[#2B2D33]/60"} font-light`}>
                            {option.desc}
                          </p>
                        </div>
                        {isSelected && <CheckCircle className="w-5 h-5 text-[#C3D7E3] shrink-0" />}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom Navigation Actions */}
                <div className="pt-4 flex items-center justify-between border-t border-[#E2DACD]/60">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                      currentStep === 0 ? "opacity-30 cursor-not-allowed text-[#2B2D33]" : "text-[#5A5180] hover:bg-[#F2EFF8]"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={!answers[activeStepData.id]}
                    onClick={handleNext}
                    className={`px-7 py-3 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      answers[activeStepData.id]
                        ? "bg-[#1A1B1F] text-white hover:bg-[#5A5180] shadow-md"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <span>{currentStep === STEPS.length - 1 ? "Generate Pathway" : "Continue"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            ) : !isSubmitted ? (
              /* Interactive Step 4: Matched Protocol & Direct Booking Form */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-[#E2DACD]/60 pb-4">
                  <div className="w-12 h-12 bg-[#F2EFF8] text-[#5A5180] rounded-2xl flex items-center justify-center shrink-0 border border-[#C6BDDC]/50">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#5A5180]">
                      Personalized Diagnostics
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-[#1A1B1F] font-bold">
                      Your Care Protocol is Ready
                    </h3>
                  </div>
                </div>

                {/* Patient Summary Matrix */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#F2EFF8]/60 p-3 rounded-2xl border border-[#C6BDDC]/30 text-center">
                    <span className="text-[10px] uppercase font-semibold text-[#2B2D33]/60 block">Focus Area</span>
                    <span className="text-xs font-bold text-[#5A5180] truncate block mt-0.5">{answers.focus}</span>
                  </div>
                  <div className="bg-[#F2EFF8]/60 p-3 rounded-2xl border border-[#C6BDDC]/30 text-center">
                    <span className="text-[10px] uppercase font-semibold text-[#2B2D33]/60 block">Timeline</span>
                    <span className="text-xs font-bold text-[#5A5180] truncate block mt-0.5">{answers.duration}</span>
                  </div>
                  <div className="bg-[#F2EFF8]/60 p-3 rounded-2xl border border-[#C6BDDC]/30 text-center">
                    <span className="text-[10px] uppercase font-semibold text-[#2B2D33]/60 block">Structure</span>
                    <span className="text-xs font-bold text-[#5A5180] truncate block mt-0.5">{answers.preference}</span>
                  </div>
                </div>

                {/* Direct Intake Booking Form */}
                <form onSubmit={handleSubmitBooking} className="space-y-4 pt-2">
                  <p className="text-xs font-semibold text-[#1A1B1F]">
                    Schedule your priority intake consultation with a lead specialist:
                  </p>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F2EFF8]/40 border border-[#C6BDDC]/50 text-xs text-[#1A1B1F] focus:outline-none focus:border-[#5A5180] transition-all"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F2EFF8]/40 border border-[#C6BDDC]/50 text-xs text-[#1A1B1F] focus:outline-none focus:border-[#5A5180] transition-all"
                      />
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F2EFF8]/40 border border-[#C6BDDC]/50 text-xs text-[#1A1B1F] focus:outline-none focus:border-[#5A5180] transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-[#2B2D33]/60 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#5A5180]" />
                    <span>HIPAA Compliant & Confidential Intake</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#5A5180] hover:bg-[#1A1B1F] text-white font-semibold py-3.5 rounded-full text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Confirm Priority Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              /* Success Confirmation Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-[#5A5180] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-8 h-8 text-[#C3D7E3]" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1A1B1F]">
                  Intake Consultation Confirmed!
                </h3>
                <p className="text-xs text-[#2B2D33]/70 font-light max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-[#5A5180]">{formData.name}</span>. Our clinical team is reviewing your profile and will send session details to <span className="font-semibold">{formData.email}</span>.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}