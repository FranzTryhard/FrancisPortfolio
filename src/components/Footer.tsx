import React from 'react';

export const Footer: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border-color)]/50 py-10 bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Wordmark & Note */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-tight text-[var(--text-primary)] font-display">
            Francis.
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} &middot; Built with precision
          </span>
        </div>

        {/* Footer Quick Links */}
        <div className="flex items-center gap-6 text-xs text-[var(--text-muted)]">
          <a
            href="https://github.com/FranzTryhard"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
            data-cursor="pointer"
            data-cursor-label="GITHUB"
          >
            <span>github.com/FranzTryhard</span>
          </a>
          <span className="text-[var(--border-color)]">&bull;</span>
          <a
            href="#hero"
            onClick={scrollToTop}
            className="hover:text-[var(--text-primary)] transition-colors"
            data-cursor="pointer"
            data-cursor-label="TOP"
          >
            Back to Top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
};
