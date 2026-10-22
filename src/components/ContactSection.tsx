import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, MessageSquare, Github, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenInquiry: (initialProject?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenInquiry }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative text-center border-t border-[var(--border-color)]/40 transition-colors duration-300">
      <motion.div
        className="max-w-3xl mx-auto px-6 sm:px-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="text-xs font-bold tracking-[0.25em] uppercase text-[var(--text-muted)] mb-4 inline-block"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          GET IN TOUCH
        </motion.span>
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--text-primary)] tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Have a project in mind?
        </motion.h2>
        <motion.p
          className="text-[var(--text-muted)] text-base sm:text-lg mb-10 max-w-lg mx-auto font-light leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          Let's connect and build something useful. Whether it's a software opportunity, collaboration, or technical inquiry.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Direct Mailto Link (Professor requirement) */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            data-cursor="pointer"
            data-cursor-label="MAIL"
            className="w-full sm:w-auto px-7 py-4 rounded-full text-sm font-semibold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md hover:shadow-lg"
            title={`Send an email to ${PERSONAL_INFO.email}`}
          >
            <Mail className="w-4 h-4" />
            <span>{PERSONAL_INFO.email}</span>
          </a>

          {/* Quick Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            className="w-full sm:w-auto px-5 py-4 rounded-full text-sm font-medium border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-alt)] text-[var(--text-primary)] transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Inquiry Modal Trigger */}
          <button
            onClick={() => onOpenInquiry('General')}
            className="w-full sm:w-auto px-6 py-4 rounded-full text-sm font-medium border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-alt)] text-[var(--text-primary)] transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm"
          >
            <MessageSquare className="w-4 h-4 text-emerald-500" />
            <span>Send Message</span>
          </button>

          {/* GitHub Profile */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            data-cursor-label="GITHUB"
            className="w-full sm:w-auto px-6 py-4 rounded-full text-sm font-medium border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-alt)] text-[var(--text-primary)] hover:border-[var(--text-muted)]/50 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-sm active:scale-95 cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>GitHub (@{PERSONAL_INFO.githubHandle})</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
