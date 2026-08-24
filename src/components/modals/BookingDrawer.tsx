"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, ShieldCheck, CheckCircle2, User, Sparkles } from "lucide-react";

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName?: string;
  doctorTitle?: string;
}

const TIME_SLOTS = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];
const DATES = [
  { day: "Mon", date: "25 Aug" },
  { day: "Tue", date: "26 Aug" },
  { day: "Wed", date: "27 Aug" },
  { day: "Thu", date: "28 Aug" },
];

export default function BookingDrawer({
  isOpen,
  onClose,
  doctorName = "Dr. Elena Vance",
  doctorTitle = "Lead Neuro-Psychiatrist",
}: BookingDrawerProps) {
  const [selectedDate, setSelectedDate] = useState("25 Aug");
  const [selectedTime, setSelectedTime] = useState("11:30 AM");
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = () => {
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A1B1F]/50 backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            {/* Slide-over Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-white/95 backdrop-blur-2xl border-l border-[#E2DACD] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#E2DACD]/60">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8C82B5]" />
                    <span className="text-xs uppercase font-bold tracking-widest text-[#5A5180]">
                      Concierge Booking
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-[#F2EFF8] text-[#5A5180] hover:bg-[#5A5180] hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {!isBooked ? (
                  <div className="mt-6 space-y-6">
                    {/* Doctor Info Card */}
                    <div className="p-4 rounded-2xl bg-[#F2EFF8]/70 border border-[#C6BDDC]/40 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#5A5180] text-white flex items-center justify-center font-serif text-lg font-bold">
                        {doctorName.charAt(4)}
                      </div>
                      <div>
                        <h4 className="text-base font-serif font-bold text-[#1A1B1F]">
                          {doctorName}
                        </h4>
                        <p className="text-xs text-[#2B2D33]/70 font-light">
                          {doctorTitle}
                        </p>
                      </div>
                    </div>

                    {/* Date Selector */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-[#5A5180] uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Select Date
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {DATES.map((item) => {
                          const active = selectedDate === item.date;
                          return (
                            <button
                              key={item.date}
                              onClick={() => setSelectedDate(item.date)}
                              className={`p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                                active
                                  ? "bg-[#5A5180] text-white border-[#5A5180] shadow-md"
                                  : "bg-white text-[#1A1B1F] border-[#E2DACD] hover:bg-[#F2EFF8]"
                              }`}
                            >
                              <div className="text-[10px] uppercase opacity-75">{item.day}</div>
                              <div className="text-xs font-bold mt-0.5">{item.date}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slot Selector */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-[#5A5180] uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Available Slots
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {TIME_SLOTS.map((slot) => {
                          const active = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`px-4 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                                active
                                  ? "bg-[#8C82B5] text-white border-[#8C82B5] shadow-md"
                                  : "bg-white text-[#1A1B1F] border-[#E2DACD] hover:bg-[#F2EFF8]"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Security Guarantee Note */}
                    <div className="pt-2 flex items-center gap-2 text-[11px] text-[#2B2D33]/60 font-light">
                      <ShieldCheck className="w-4 h-4 text-[#5A5180] shrink-0" />
                      <span>Encrypted HIPAA-compliant intake session.</span>
                    </div>
                  </div>
                ) : (
                  /* Success Screen */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-16 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#5A5180] text-white flex items-center justify-center mx-auto shadow-lg">
                      <CheckCircle2 className="w-8 h-8 text-[#C3D7E3]" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#1A1B1F]">
                      Session Reserved
                    </h3>
                    <p className="text-xs text-[#2B2D33]/70 font-light max-w-xs mx-auto">
                      Your consultation with <span className="font-semibold text-[#5A5180]">{doctorName}</span> is confirmed for <span className="font-semibold">{selectedDate}</span> at <span className="font-semibold">{selectedTime}</span>.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Bottom Submit Button */}
              {!isBooked && (
                <div className="pt-6 border-t border-[#E2DACD]">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBooking}
                    className="w-full bg-[#1A1B1F] hover:bg-[#5A5180] text-white font-semibold py-3.5 rounded-full text-xs transition-all shadow-md cursor-pointer"
                  >
                    Confirm Concierge Reservation
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}