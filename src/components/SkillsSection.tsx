import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-24 border-t border-[var(--border-color)]/40 bg-[var(--bg-surface-alt)]/25 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header with Motion */}
        <motion.div
          className="text-center max-w-xl mx-auto mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[var(--text-muted)]">
            COMPETENCIES
          </span>
          <h2 className="text-3xl font-display font-bold text-[var(--text-primary)] mt-2">
            Tools &amp; Technologies
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-3 font-light">
            The foundational stack and workflow tools I use to design, build, and deploy software.
          </p>
        </motion.div>

        {/* Competencies Grid with Staggered Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              className={`p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]/70 hover:border-[var(--text-muted)]/40 transition-all shadow-sm ${
                cat.span || ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-xs font-bold font-mono tracking-wider text-[var(--text-muted)] uppercase mb-4">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--text-muted)]/50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
