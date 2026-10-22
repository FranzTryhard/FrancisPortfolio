import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Mail, Sparkles, Terminal, Code2, Layers, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenInquiry: (initialProject?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInquiry }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="hero"
      className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden"
    >
      {/* Background subtle radial ambient light */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/5 via-indigo-500/5 to-transparent blur-3xl pointer-events-none rounded-full" 
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center min-h-[580px] relative z-10">
        {/* Left Column: Typography & Introductory Narrative */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status Badge - Crisp, Theme-Aware, No Blurry Glows */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] w-fit mb-6 shadow-xs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
              {PERSONAL_INFO.status}
            </span>
            <span className="text-[var(--border-color)]">|</span>
            <span className="text-xs font-medium text-[var(--text-muted)]">
              IT Student & Developer
            </span>
          </motion.div>

          {/* Headline - Editorial Syne Display */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.08]">
              Hi, I'm <span className="underline decoration-[var(--border-color)] decoration-4 underline-offset-8">{PERSONAL_INFO.name}</span>.
            </h1>
            <p className="text-2xl sm:text-3xl font-display font-medium text-[var(--text-muted)] mt-3 leading-snug">
              Crafting practical software, intuitive interfaces, and scalable backends.
            </p>
          </motion.div>

          {/* Concise personal narrative */}
          <motion.p
            className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl font-light leading-relaxed mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            I'm an aspiring software developer and IT student who learns by actively building projects, experimenting with modern architectures, and solving real-world challenges through clean code.
          </motion.p>

          {/* Action CTA Group */}
          <motion.div
            className="flex flex-wrap items-center gap-3.5 mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#projects"
              data-cursor="pointer"
              data-cursor-label="VIEW"
              className="px-7 py-3.5 rounded-full text-sm font-semibold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md text-center cursor-pointer active:scale-95 inline-flex items-center gap-2"
            >
              <span>Explore My Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => onOpenInquiry('General')}
              data-cursor="pointer"
              data-cursor-label="CONTACT"
              className="px-6 py-3.5 rounded-full text-sm font-medium border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-alt)] text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all duration-300 text-center cursor-pointer active:scale-95 shadow-xs inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[var(--text-muted)]" />
              <span>Get In Touch</span>
            </button>

            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              data-cursor-label="GITHUB"
              className="p-3.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-alt)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all duration-300 cursor-pointer active:scale-95 shadow-xs"
              title="GitHub Profile (@FranzTryhard)"
              aria-label="GitHub Profile (@FranzTryhard)"
            >
              <Github className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Highlights / Quick Stats Bar */}
          <motion.div
            className="pt-6 border-t border-[var(--border-color)] grid grid-cols-3 gap-4 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <div>
              <span className="block text-2xl font-bold font-display text-[var(--text-primary)]">03</span>
              <span className="text-xs text-[var(--text-muted)] font-medium">Core Projects</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-display text-[var(--text-primary)]">Full-Stack</span>
              <span className="text-xs text-[var(--text-muted)] font-medium">Web & Mobile</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-display text-[var(--text-primary)]">Open Code</span>
              <span className="text-xs text-[var(--text-muted)] font-medium">GitHub Active</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Crisp Showcase Card (Optimized for both Light & Dark modes) */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center relative mt-4 lg:mt-0"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Main Showcase Container */}
          <div className="relative w-full max-w-[390px] sm:max-w-[420px]">
            {/* The Developer ID / Studio Showcase Card */}
            <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xl overflow-hidden transition-colors duration-300">
              {/* Card Header / Terminal Bar */}
              <div className="px-5 py-3.5 border-b border-[var(--border-color)] bg-[var(--bg-surface-alt)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-[var(--text-muted)] ml-2">francis.dev</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  Ready to Build
                </span>
              </div>

              {/* Photo Frame - Sharp, Crisp, Zero Foggy Vignette */}
              <div className="relative aspect-[4/4.6] w-full overflow-hidden bg-neutral-900 flex items-center justify-center">
                {!imageError ? (
                  <img
                    src={PERSONAL_INFO.portraitUrl}
                    alt="Francis - Software Developer & IT Student"
                    referrerPolicy="no-referrer"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                    className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-70'
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-neutral-800 to-neutral-950 text-neutral-200">
                    <div className="w-24 h-24 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-4">
                      <span className="text-3xl font-display font-bold text-white">F</span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-white">Francis</h3>
                    <p className="text-xs text-neutral-400 mt-1">Software Developer & IT Student</p>
                  </div>
                )}

                {/* Subtle Inner Border Line for crisp edge definition */}
                <div className="absolute inset-0 pointer-events-none border-b border-neutral-800/80" />
              </div>

              {/* Card Footer / Engineering Metadata Panel */}
              <div className="p-5 bg-[var(--bg-surface)] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold font-display text-[var(--text-primary)]">Francis</h3>
                    <p className="text-xs text-[var(--text-muted)]">BS Information Technology</p>
                  </div>
                  <a
                    href={PERSONAL_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>@FranzTryhard</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-[var(--text-primary)]">
                    React & Native
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-[var(--text-primary)]">
                    Python & Django
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-[var(--text-primary)]">
                    PostgreSQL
                  </span>
                </div>
              </div>
            </div>

            {/* Tactile Floated Badge 1: Clean Architecture (Top Right) */}
            <motion.div
              data-cursor="pointer"
              data-cursor-label="DEV"
              className="absolute -top-3 -right-3 sm:-right-4 px-3.5 py-1.5 rounded-full z-20 bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-lg flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] select-none hover:scale-105 transition-all duration-200"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Clean Code</span>
            </motion.div>

            {/* Tactile Floated Badge 2: UI & UX (Bottom Left) */}
            <motion.div
              data-cursor="pointer"
              data-cursor-label="UI/UX"
              className="absolute -bottom-3 -left-3 sm:-left-4 px-3.5 py-1.5 rounded-full z-20 bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-lg flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] select-none hover:scale-105 transition-all duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Modern UI/UX</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
