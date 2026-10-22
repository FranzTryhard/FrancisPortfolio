import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Sun, Moon, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenInquiry: (initialProject?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-[var(--nav-backdrop)] border-b border-[var(--border-color)] shadow-lg'
          : 'backdrop-blur-sm bg-[var(--nav-backdrop)]/70 border-b border-[var(--border-color)]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-1.5 group shrink-0"
        >
          <span className="font-display">Francis</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)]/70 group-hover:bg-[var(--text-primary)] transition-colors" />
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="Desktop Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-[var(--text-muted)]"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[var(--text-primary)] transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions (GitHub + Theme Toggle + Primary CTA + Mobile Hamburger) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* GitHub Profile Link */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-alt)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--text-muted)]/50 transition-all cursor-pointer flex items-center justify-center active:scale-90"
            aria-label="GitHub Profile @FranzTryhard"
            title="GitHub: @FranzTryhard"
            data-cursor="pointer"
            data-cursor-label="GITHUB"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Theme Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-alt)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--text-muted)]/50 transition-all cursor-pointer relative flex items-center justify-center active:scale-90"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            data-cursor="pointer"
            data-cursor-label="THEME"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </motion.div>
          </button>

          {/* Let's Talk CTA */}
          <button
            onClick={() => onOpenInquiry('General')}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer whitespace-nowrap group"
            data-cursor="pointer"
            data-cursor-label="TALK"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-alt)] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-surface)] border-b border-[var(--border-color)] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-2 text-sm font-medium text-[var(--text-primary)] hover:text-emerald-400 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <span>GitHub (@{PERSONAL_INFO.githubHandle})</span>
            </span>
            <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)]" />
          </a>
          <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[var(--text-muted)]">Theme Appearance</span>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border-color)] bg-[var(--bg-surface-alt)] text-[var(--text-primary)]"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
