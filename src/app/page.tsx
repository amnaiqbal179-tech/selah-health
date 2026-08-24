"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import CarePathways from "@/components/sections/CarePathways";
import ProviderFilter from "@/components/sections/ProviderFilter";
import BreathingSanctuary from "@/components/sections/BreathingSanctuary";
import SpecialistsSection from "@/components/sections/Specialists";
import TrustSection from "@/components/sections/TrustSection";
import FaqSection from "@/components/sections/FaqSection";
import Footer from "@/components/layout/Footer";
import NeuroAssessmentModal from "@/components/modals/NeuroAssessmentModal";
import BookingDrawer from "@/components/modals/BookingDrawer";

export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1A1B1F] relative selection:bg-[#C6BDDC]/40">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#C6BDDC]/20 via-[#F2EFF8]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <Navbar onOpenAssessment={() => setIsQuizOpen(true)} />
      <HeroSection onOpenAssessment={() => setIsQuizOpen(true)} />
      <CarePathways onOpenAssessment={() => setIsQuizOpen(true)} />
      <ProviderFilter />
      <BreathingSanctuary />

      {/* Specialists Section with Booking Trigger */}
      <SpecialistsSection
        onOpenAssessment={() => setIsQuizOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      <TrustSection />
      <FaqSection />
      <Footer onOpenAssessment={() => setIsQuizOpen(true)} />

      {/* Modals & Drawers */}
      <NeuroAssessmentModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      <BookingDrawer
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}