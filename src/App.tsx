/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TechStrip } from './components/TechStrip';
import { AboutSection } from './components/AboutSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { InquiryModal } from './components/modals/InquiryModal';
import { EasyTripModal } from './components/modals/EasyTripModal';
import { ElecTrackModal } from './components/modals/ElecTrackModal';
import { PaloseboModal } from './components/modals/PaloseboModal';
import { CustomCursor } from './components/CustomCursor';
import { ModalType } from './types';

function PortfolioApp() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [inquiryProject, setInquiryProject] = useState<string>('General');

  const handleOpenInquiry = (project: string = 'General') => {
    setInquiryProject(project);
    setActiveModal('inquiry');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] min-h-screen flex flex-col justify-between transition-colors duration-300">
      {/* Animated Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Site Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Main Content Sections */}
      <main className="flex-grow pt-24 sm:pt-28">
        {/* Hero Section with Arch Container & Floated Badges */}
        <HeroSection onOpenInquiry={handleOpenInquiry} />

        {/* Tech Strip */}
        <TechStrip />

        {/* About Section */}
        <AboutSection />

        {/* Selected Work & Live Interactive Simulators */}
        <SelectedWorkSection
          onOpenModal={(type) => setActiveModal(type)}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* Skills & Competencies Grid */}
        <SkillsSection />

        {/* Contact & Inquiry CTA */}
        <ContactSection onOpenInquiry={handleOpenInquiry} />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Floating Scroll To Top Action Button */}
      <ScrollToTopButton />

      {/* Interactive Modals */}
      <InquiryModal
        isOpen={activeModal === 'inquiry'}
        onClose={handleCloseModal}
        initialProject={inquiryProject}
      />

      <EasyTripModal
        isOpen={activeModal === 'easytrip'}
        onClose={handleCloseModal}
        onOpenInquiry={handleOpenInquiry}
      />

      <ElecTrackModal
        isOpen={activeModal === 'electrack'}
        onClose={handleCloseModal}
        onOpenInquiry={handleOpenInquiry}
      />

      <PaloseboModal
        isOpen={activeModal === 'palosebo'}
        onClose={handleCloseModal}
        onOpenInquiry={handleOpenInquiry}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
