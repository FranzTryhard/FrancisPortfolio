import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for fluid progress bar tracking
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[var(--text-primary)]/70 via-[var(--text-primary)] to-emerald-500 origin-left z-[100] shadow-[0_0_10px_rgba(243,241,236,0.3)] pointer-events-none"
      aria-hidden="true"
    />
  );
};
