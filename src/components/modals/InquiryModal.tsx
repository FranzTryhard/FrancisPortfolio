import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Send, Sparkles } from 'lucide-react';
import { InquiryFormData } from '../../types';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProject?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialProject = 'General'
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    project: initialProject,
    timeline: 'Within 1-2 months',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        project: initialProject || 'General'
      }));
      setSubmitted(false);
      setErrors({});
    }
  }, [isOpen, initialProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please include a message or inquiry details';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            onClick={onClose}
            className="fixed inset-0 bg-[var(--modal-backdrop)] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border-color)]">
              <div>
                <span className="text-xs font-mono tracking-wider text-[var(--text-muted)] uppercase">
                  PROJECT INQUIRY &amp; CONTACT
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-primary)] mt-1">
                  {submitted ? 'Inquiry Received' : 'Start a Conversation'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-alt)] rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[var(--text-primary)]">Thank you, {formData.name}!</h4>
                <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
                  Your inquiry regarding <span className="text-[var(--text-primary)] font-medium">{formData.project}</span> has been logged. Francis will review your message and reply to <span className="text-[var(--text-primary)] font-mono">{formData.email}</span> shortly.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 transition-all cursor-pointer shadow-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1.5">
                    Inquiry Topic / Project
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['General', 'EasyTrip', 'ElecTrack', 'Palosebo'].map((proj) => (
                      <button
                        key={proj}
                        type="button"
                        onClick={() => setFormData({ ...formData, project: proj })}
                        className={`px-3 py-2 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                          formData.project.toLowerCase() === proj.toLowerCase()
                            ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-[var(--btn-primary-bg)] font-bold shadow-sm'
                            : 'bg-[var(--bg-surface-alt)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--text-muted)]/50 hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {proj}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Rivera"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-alt)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-[var(--border-color)] focus:border-[var(--text-primary)]/60'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-alt)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500/80 focus:border-red-500' : 'border-[var(--border-color)] focus:border-[var(--text-primary)]/60'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1.5">
                    Timeline / Urgency
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)]/60"
                  >
                    <option value="Immediate (< 2 weeks)">Immediate (&lt; 2 weeks)</option>
                    <option value="Within 1-2 months">Within 1-2 months</option>
                    <option value="Exploring opportunities / Casual">Exploring opportunities / Casual</option>
                    <option value="Full-time / Apprenticeship">Full-time / Apprenticeship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1.5">
                    Message / Technical Scope *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share project requirements, opportunity details, or questions regarding Francis's code implementations..."
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-alt)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-500/80 focus:border-red-500' : 'border-[var(--border-color)] focus:border-[var(--text-primary)]/60'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Direct dispatch to Francis</span>
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 shadow-md"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
