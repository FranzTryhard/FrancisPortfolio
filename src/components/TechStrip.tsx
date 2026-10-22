import React from 'react';
import { motion } from 'framer-motion';
import { CURRENT_TECH } from '../data/portfolioData';

// Extended tech list for a rich, continuous marquee stream
const MARQUEE_TECH = [
  ...CURRENT_TECH,
  'TypeScript',
  'REST APIs',
  'Tailwind CSS',
  'Docker',
  'Git & GitHub'
];

export const TechStrip: React.FC = () => {
  // Duplicate array for an infinite, seamless loop
  const duplicatedList = [...MARQUEE_TECH, ...MARQUEE_TECH];

  return (
    <motion.section
      className="border-y border-[var(--border-color)]/60 bg-[var(--bg-surface-alt)]/35 py-5 overflow-hidden relative transition-colors duration-300"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center gap-6">
        {/* Pinned Label */}
        <div className="flex items-center gap-3 shrink-0 md:border-r md:border-[var(--border-color)]/80 md:pr-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold tracking-[0.25em] text-[var(--text-muted)] uppercase whitespace-nowrap">
            CURRENTLY EXPLORING
          </span>
        </div>

        {/* Marquee Track Container with Edge Vignette Fades */}
        <div className="relative w-full overflow-hidden flex-1">
          {/* Left subtle fade mask */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 transition-colors duration-300" />

          {/* Right subtle fade mask */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 transition-colors duration-300" />

          {/* Running Loop */}
          <div className="animate-marquee items-center gap-8 text-sm font-medium text-[var(--text-muted)]">
            {duplicatedList.map((tech, idx) => (
              <div key={`${tech}-${idx}`} className="flex items-center gap-8 shrink-0">
                <span className="hover:text-[var(--text-primary)] transition-colors cursor-default select-none whitespace-nowrap">
                  {tech}
                </span>
                <span className="text-[var(--border-color)] select-none text-xs font-mono" aria-hidden="true">
                  /
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
