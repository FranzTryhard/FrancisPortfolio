import React from 'react';
import { motion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <motion.div
        className="max-w-4xl mx-auto px-6 sm:px-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Eyebrow */}
        <motion.span
          className="text-xs font-bold tracking-[0.25em] uppercase text-[var(--text-muted)] mb-4 inline-block"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          ABOUT ME
        </motion.span>

        {/* Large Editorial Headline */}
        <motion.h2
          className="text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed text-[var(--text-muted)] mt-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          I'm an IT student who enjoys{' '}
          <span className="text-[var(--text-primary)] font-semibold">
            turning ideas into useful digital solutions
          </span>
          . I learn by building projects, experimenting with new technologies, and{' '}
          <span className="text-[var(--text-primary)] font-semibold">
            solving real-world problems
          </span>
          .
        </motion.h2>

        {/* Context Narrative */}
        <motion.p
          className="text-[var(--text-muted)]/90 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-light"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          My journey revolves around crafting software that balances clean system architecture with purposeful user interfaces. From developing end-to-end full-stack backends to architecting reliable database schemas and responsive cross-platform applications, I focus on practical execution, continuous curiosity, and delivering work that truly works.
        </motion.p>
      </motion.div>
    </section>
  );
};
