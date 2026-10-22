import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero');
      const threshold = heroElement ? heroElement.offsetHeight * 0.75 : 450;
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-alt)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-muted)]/50 shadow-xl backdrop-blur-md flex items-center justify-center transition-all cursor-pointer group active:scale-90"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Scroll back to top"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4 text-[var(--text-primary)] group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
