import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Trophy, Award, ArrowRight, Layers, Flame } from 'lucide-react';

interface PaloseboModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (project: string) => void;
}

export const PaloseboModal: React.FC<PaloseboModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  const [playerHeight, setPlayerHeight] = useState<number>(0);
  const [botHeight, setBotHeight] = useState<number>(0);
  const [gameState, setGameState] = useState<'idle' | 'racing' | 'won' | 'lost'>('idle');
  const [matchId, setMatchId] = useState<number>(849);
  const [stamina, setStamina] = useState<number>(100);
  const [climbStreak, setClimbStreak] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const heightsRef = useRef({ player: 0, bot: 0, state: 'idle' as 'idle' | 'racing' | 'won' | 'lost' });

  useEffect(() => {
    heightsRef.current.player = playerHeight;
    heightsRef.current.bot = botHeight;
    heightsRef.current.state = gameState;
  }, [playerHeight, botHeight, gameState]);

  useEffect(() => {
    if (gameState !== 'racing') return;

    const interval = setInterval(() => {
      // Bot climbs steadily
      setBotHeight(prevBot => {
        if (prevBot >= 10) {
          setGameState('lost');
          return 10;
        }
        const botStep = 0.08 + Math.random() * 0.05;
        const newBot = Math.min(prevBot + botStep, 10);
        if (newBot >= 10) {
          setGameState('lost');
        }
        return newBot;
      });

      // Player experiences subtle greased pole slip if not actively climbing
      setPlayerHeight(prevP => {
        if (prevP <= 0) return 0;
        const slip = 0.025;
        return Math.max(0, prevP - slip);
      });

      // Stamina naturally recovers slightly
      setStamina(prev => Math.min(100, prev + 2));
    }, 100);

    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; color: string; life: number }[] = [];

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Night sky background
      ctx.fillStyle = '#0e0e12';
      ctx.fillRect(0, 0, width, height);

      // Festival festoon string / bunting at top
      ctx.strokeStyle = '#232329';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.quadraticCurveTo(width / 2, 35, width, 20);
      ctx.stroke();

      const flagColors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];
      for (let i = 20; i < width - 20; i += 30) {
        ctx.fillStyle = flagColors[(i / 30) % flagColors.length];
        ctx.beginPath();
        ctx.moveTo(i, 22);
        ctx.lineTo(i + 14, 23);
        ctx.lineTo(i + 7, 36);
        ctx.fill();
      }

      const poleWidth = 12;
      const poleBaseY = height - 30;
      const poleTopY = 55;
      const poleTotalPixels = poleBaseY - poleTopY;

      const p1X = width * 0.35;
      const p2X = width * 0.65;

      [p1X, p2X].forEach((poleX, index) => {
        const poleGrad = ctx.createLinearGradient(poleX - poleWidth / 2, 0, poleX + poleWidth / 2, 0);
        poleGrad.addColorStop(0, '#785324');
        poleGrad.addColorStop(0.5, '#b88636');
        poleGrad.addColorStop(1, '#66441b');
        ctx.fillStyle = poleGrad;
        ctx.fillRect(poleX - poleWidth / 2, poleTopY, poleWidth, poleTotalPixels);

        ctx.fillStyle = '#452b0e';
        for (let y = poleTopY; y <= poleBaseY; y += 40) {
          ctx.fillRect(poleX - (poleWidth + 4) / 2, y, poleWidth + 4, 3);
        }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.fillRect(poleX - 2, poleTopY, 3, poleTotalPixels);

        // Prize pouch at top
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(poleX, poleTopY - 8, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#b45309';
        ctx.fillRect(poleX - 5, poleTopY - 20, 10, 5);

        ctx.fillStyle = '#ef4444';
        ctx.fillRect(poleX - 2, poleTopY - 2, 4, 8);

        ctx.font = '10px monospace';
        ctx.fillStyle = '#8e8e96';
        ctx.textAlign = 'center';
        ctx.fillText(index === 0 ? 'P1 (You)' : 'P2 (CPU)', poleX, poleBaseY + 20);
      });

      // Ground
      ctx.fillStyle = '#18181c';
      ctx.fillRect(0, poleBaseY, width, 30);
      ctx.fillStyle = '#232329';
      ctx.fillRect(0, poleBaseY, width, 2);

      const p1H = heightsRef.current.player;
      const p2H = heightsRef.current.bot;

      const p1Y = poleBaseY - (p1H / 10) * poleTotalPixels;
      const p2Y = poleBaseY - (p2H / 10) * poleTotalPixels;

      drawClimber(ctx, p1X, p1Y, '#f3f1ec', '#10b981', 'P1');
      drawClimber(ctx, p2X, p2Y, '#8e8e96', '#6366f1', 'P2');

      if (heightsRef.current.state === 'won') {
        if (Math.random() < 0.3) {
          for (let k = 0; k < 5; k++) {
            particles.push({
              x: p1X + (Math.random() - 0.5) * 40,
              y: poleTopY,
              vx: (Math.random() - 0.5) * 4,
              vy: -Math.random() * 4 - 2,
              color: flagColors[Math.floor(Math.random() * flagColors.length)],
              life: 1
            });
          }
        }
      }

      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life -= 0.02;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(p.x, p.y, 4, 4);
        ctx.globalAlpha = 1;
      });

      requestRef.current = requestAnimationFrame(render);
    };

    const drawClimber = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      bodyColor: string,
      accentColor: string,
      _label: string
    ) => {
      c.fillStyle = bodyColor;
      c.beginPath();
      c.ellipse(x + 2, y, 7, 12, 0.1, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = '#f87171';
      c.beginPath();
      c.arc(x + 2, y - 14, 6, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = accentColor;
      c.fillRect(x - 6, y - 17, 16, 3);

      c.strokeStyle = bodyColor;
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(x - 1, y - 6);
      c.lineTo(x - 9, y - 4);
      c.lineTo(x, y - 2);
      c.stroke();

      c.beginPath();
      c.moveTo(x + 1, y + 8);
      c.lineTo(x - 8, y + 12);
      c.lineTo(x, y + 15);
      c.stroke();
    };

    requestRef.current = requestAnimationFrame(render);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handleClimbAction = () => {
    if (gameState === 'idle') {
      setGameState('racing');
    }
    if (gameState === 'won' || gameState === 'lost') return;

    if (stamina <= 0) return;

    setStamina(prev => Math.max(0, prev - 4));
    setClimbStreak(prev => prev + 1);

    const baseStep = 0.32;
    const frictionPenalty = Math.random() * 0.08;
    const finalStep = baseStep - frictionPenalty;

    setPlayerHeight(prev => {
      const nextH = Math.min(10, prev + finalStep);
      if (nextH >= 10) {
        setGameState('won');
      }
      return nextH;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isOpen) {
        e.preventDefault();
        handleClimbAction();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, gameState, stamina]);

  const handleRestart = () => {
    setPlayerHeight(0);
    setBotHeight(0);
    setStamina(100);
    setClimbStreak(0);
    setMatchId(prev => prev + 1);
    setGameState('racing');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            onClick={onClose}
            className="fixed inset-0 bg-[var(--modal-backdrop)] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className="relative w-full max-w-4xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)] bg-[var(--bg-surface-alt)]/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[var(--text-muted)]">03 / MULTIPLAYER GAME CONCEPT</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      Playable Mini-Game
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-[var(--text-primary)]">Palosebo</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-alt)] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Match Telemetry Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)] text-xs font-mono">
                <span className="text-[var(--text-primary)] font-bold">Race Match #{matchId}</span>
                <span className="text-amber-500 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  Live Pole Ascent (10m Summit)
                </span>
              </div>

              {/* Canvas & Controls Container */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* 2D Canvas Arena */}
                <div
                  data-cursor="play"
                  data-cursor-label="CLICK TO CLIMB"
                  onClick={handleClimbAction}
                  className="md:col-span-7 bg-[#0a0a0c] rounded-xl border border-[var(--border-color)] overflow-hidden relative shadow-inner cursor-pointer"
                >
                  <canvas
                    ref={canvasRef}
                    width={380}
                    height={320}
                    className="w-full h-[320px] block"
                  />

                  {/* Game Result Banner Overlay */}
                  {gameState === 'won' && (
                    <div className="absolute inset-0 bg-[#0a0a0c]/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                      <Award className="w-12 h-12 text-amber-400 mb-2 animate-bounce" />
                      <h4 className="text-2xl font-bold font-display text-[#f3f1ec]">Summit Conquered!</h4>
                      <p className="text-xs text-[#8e8e96] mt-1 max-w-xs">
                        You reached the 10m summit prize pouch before the rival climber!
                      </p>
                      <button
                        onClick={handleRestart}
                        className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#f3f1ec] text-[#0a0a0c] hover:bg-white cursor-pointer shadow-md"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Race Again</span>
                      </button>
                    </div>
                  )}

                  {gameState === 'lost' && (
                    <div className="absolute inset-0 bg-[#0a0a0c]/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-2">
                        <X className="w-6 h-6" />
                      </div>
                      <h4 className="text-2xl font-bold font-display text-[#f3f1ec]">Opponent Won!</h4>
                      <p className="text-xs text-[#8e8e96] mt-1 max-w-xs">
                        Manila Climber reached the prize pouch first. Grease friction caught you!
                      </p>
                      <button
                        onClick={handleRestart}
                        className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#f3f1ec] text-[#0a0a0c] hover:bg-white cursor-pointer shadow-md"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Rematch</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Interactive Controller & Stats */}
                <div className="md:col-span-5 space-y-4">
                  {/* Live Ascent Metrics */}
                  <div className="p-4 rounded-xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)] space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[var(--text-primary)] font-medium">Player 1 (You)</span>
                        <span className="font-mono text-emerald-500 font-semibold">{playerHeight.toFixed(1)}m / 10.0m</span>
                      </div>
                      <div className="w-full bg-[var(--bg-surface)] h-2.5 rounded-full overflow-hidden border border-[var(--border-color)]/30">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-100"
                          style={{ width: `${(playerHeight / 10) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[var(--text-muted)]">Player 2 (Remote Bot)</span>
                        <span className="font-mono text-[var(--text-muted)]">{botHeight.toFixed(1)}m / 10.0m</span>
                      </div>
                      <div className="w-full bg-[var(--bg-surface)] h-2.5 rounded-full overflow-hidden border border-[var(--border-color)]/30">
                        <div
                          className="bg-[#6366f1] h-full rounded-full transition-all duration-100"
                          style={{ width: `${(botHeight / 10) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Grip Stamina */}
                    <div className="pt-2 border-t border-[var(--border-color)]/60">
                      <div className="flex justify-between text-[11px] text-[var(--text-muted)] mb-1">
                        <span>Grip Stamina</span>
                        <span className="font-mono">{stamina}%</span>
                      </div>
                      <div className="w-full bg-[var(--bg-surface)] h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-200 ${
                            stamina > 40 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${stamina}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={handleClimbAction}
                      data-cursor="play"
                      data-cursor-label="CLIMB!"
                      className="w-full py-4 rounded-xl text-sm font-bold tracking-wide uppercase bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 active:scale-95 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 select-none"
                    >
                      <Flame className="w-4 h-4 text-amber-500" />
                      <span>Tap to Climb (or Spacebar)</span>
                    </button>
                    <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] px-1">
                      <span>Grease Slip: Active (-0.03m/s)</span>
                      <span>Climb Streak: {climbStreak}</span>
                    </div>
                  </div>

                  {/* Restart button */}
                  <button
                    onClick={handleRestart}
                    className="w-full py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-alt)] text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Match</span>
                  </button>
                </div>
              </div>

              {/* Technical Architecture Info */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-[var(--text-primary)]">Physics &amp; Multiplayer Engine</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Implemented with <span className="text-[var(--text-primary)] font-medium">HTML5 Canvas</span> 60fps continuous render loop with custom friction &amp; gravity coefficients, simulating greased surface slippage. Synchronized multiplayer relies on lightweight <span className="text-[var(--text-primary)] font-medium">WebSockets</span> binary delta packets for zero-lag competitor tracking.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-[var(--border-color)] bg-[var(--bg-surface-alt)]/50 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
                Cultural heritage digital adaptation
              </span>
              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-full text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenInquiry('Palosebo');
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 cursor-pointer shadow-sm"
                >
                  <span>Inquire About Palosebo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
