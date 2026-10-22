import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type CursorType = 'default' | 'hover' | 'project' | 'play' | 'text';

export const CustomCursor: React.FC = () => {
  const { theme } = useTheme();
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [customLabel, setCustomLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse Coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for trailing ring / pill badge
  const springRingConfig = { damping: 24, stiffness: 240, mass: 0.5 };
  const smoothX = useSpring(mouseX, springRingConfig);
  const smoothY = useSpring(mouseY, springRingConfig);

  // Tight responsive spring for center precision dot
  const springDotConfig = { damping: 35, stiffness: 700, mass: 0.15 };
  const dotX = useSpring(mouseX, springDotConfig);
  const dotY = useSpring(mouseY, springDotConfig);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    const checkTouch = () => {
      const isTouch =
        window.matchMedia('(pointer: coarse)').matches ||
        !window.matchMedia('(hover: hover)').matches ||
        'ontouchstart' in window;
      setIsTouchDevice(isTouch);
      if (!isTouch) {
        document.documentElement.classList.add('has-custom-cursor');
      } else {
        document.documentElement.classList.remove('has-custom-cursor');
      }
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Play / Mini-game interactive areas
      const playTarget = target.closest('[data-cursor="play"], canvas, .play-trigger');
      if (playTarget) {
        setCursorType('play');
        const customText = playTarget.getAttribute('data-cursor-label');
        setCustomLabel(customText || 'PLAY');
        return;
      }

      // 2. Buttons & clickable interactive triggers take precedence if hovered inside a card
      const buttonTarget = target.closest('button, a, [role="button"], [data-cursor="pointer"], .cursor-pointer');
      if (buttonTarget) {
        setCursorType('hover');
        const customText = buttonTarget.getAttribute('data-cursor-label');
        setCustomLabel(customText || null);
        return;
      }

      // 3. Project cards & interactive showcase viewports
      const projectTarget = target.closest('[data-cursor="project"], article, .project-card');
      if (projectTarget) {
        setCursorType('project');
        const customText = projectTarget.getAttribute('data-cursor-label');
        setCustomLabel(customText || 'EXPLORE');
        return;
      }

      // 4. Input & Text fields
      const inputTarget = target.closest('input, textarea, [contenteditable="true"]');
      if (inputTarget) {
        setCursorType('text');
        setCustomLabel(null);
        return;
      }

      // Default
      setCursorType('default');
      setCustomLabel(null);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  // Don't render cursor on mobile or touch-only displays
  if (isTouchDevice) {
    return null;
  }

  // Ring dimension & style variants depending on hover state
  const isPill = cursorType === 'project' || cursorType === 'play';
  const isHover = cursorType === 'hover';
  const isText = cursorType === 'text';

  // Ring styling based on theme and state
  const getRingStyles = () => {
    if (cursorType === 'play') {
      return {
        width: 104,
        height: 38,
        borderRadius: 9999,
        backgroundColor: 'rgba(245, 158, 11, 0.16)',
        borderColor: 'rgba(245, 158, 11, 0.85)',
        backdropFilter: 'blur(8px)',
        scale: isClicking ? 0.9 : 1,
      };
    }

    if (cursorType === 'project') {
      return {
        width: 110,
        height: 38,
        borderRadius: 9999,
        backgroundColor: theme === 'dark' ? 'rgba(24, 24, 28, 0.88)' : 'rgba(255, 255, 255, 0.92)',
        borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(8px)',
        scale: isClicking ? 0.9 : 1,
      };
    }

    if (isHover) {
      return {
        width: 58,
        height: 58,
        borderRadius: 9999,
        backgroundColor: theme === 'dark' ? 'rgba(243, 241, 236, 0.08)' : 'rgba(17, 17, 20, 0.08)',
        borderColor: theme === 'dark' ? 'rgba(243, 241, 236, 0.65)' : 'rgba(17, 17, 20, 0.65)',
        backdropFilter: 'none',
        scale: isClicking ? 0.82 : 1,
      };
    }

    if (isText) {
      return {
        width: 4,
        height: 24,
        borderRadius: 2,
        backgroundColor: theme === 'dark' ? '#f3f1ec' : '#111114',
        borderColor: 'transparent',
        backdropFilter: 'none',
        scale: 1,
      };
    }

    // Default ring
    return {
      width: 36,
      height: 36,
      borderRadius: 9999,
      backgroundColor: 'transparent',
      borderColor: theme === 'dark' ? 'rgba(243, 241, 236, 0.45)' : 'rgba(17, 17, 20, 0.45)',
      backdropFilter: 'none',
      scale: isClicking ? 0.75 : 1,
    };
  };

  const ringStyles = getRingStyles();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.25s ease' }}
      aria-hidden="true"
    >
      {/* Outer Spring Trailing Ring / Interactive Pill Badge */}
      <motion.div
        className="absolute top-0 left-0 border flex items-center justify-center font-mono text-[11px] font-bold tracking-wider select-none shadow-sm"
        style={{
          x: smoothX,
          y: smoothY,
          transform: 'translate(-50%, -50%)',
          width: ringStyles.width,
          height: ringStyles.height,
          borderRadius: ringStyles.borderRadius,
          backgroundColor: ringStyles.backgroundColor,
          borderColor: ringStyles.borderColor,
          backdropFilter: ringStyles.backdropFilter,
        }}
        animate={{
          scale: ringStyles.scale,
          width: ringStyles.width,
          height: ringStyles.height,
        }}
        transition={{
          type: 'spring',
          damping: 22,
          stiffness: 300,
        }}
      >
        <AnimatePresence mode="wait">
          {isPill && (
            <motion.div
              key={cursorType}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5 px-3 whitespace-nowrap"
            >
              {cursorType === 'play' ? (
                <>
                  <Play className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span className="text-amber-500">{customLabel || 'PLAY'}</span>
                </>
              ) : (
                <>
                  <span className={theme === 'dark' ? 'text-[#f3f1ec]' : 'text-[#111114]'}>
                    {customLabel || 'EXPLORE'}
                  </span>
                  <ArrowUpRight
                    className={`w-3 h-3 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}
                  />
                </>
              )}
            </motion.div>
          )}

          {isHover && customLabel && (
            <motion.div
              key="hover-label"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className={`text-[9px] font-mono uppercase tracking-widest ${
                theme === 'dark' ? 'text-[#f3f1ec]' : 'text-[#111114]'
              }`}
            >
              {customLabel}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Center Precision Dot (hidden during text or pill mode to ensure crisp text legibility) */}
      {!isText && !isPill && (
        <motion.div
          className="absolute top-0 left-0 rounded-full"
          style={{
            x: dotX,
            y: dotY,
            transform: 'translate(-50%, -50%)',
            width: isHover ? 8 : 6,
            height: isHover ? 8 : 6,
            backgroundColor: theme === 'dark' ? '#f3f1ec' : '#111114',
            boxShadow:
              theme === 'dark'
                ? '0 0 10px rgba(255, 255, 255, 0.4)'
                : '0 0 8px rgba(0, 0, 0, 0.25)',
          }}
          animate={{
            scale: isClicking ? 0.6 : isHover ? 1.25 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 500,
          }}
        />
      )}
    </div>
  );
};
