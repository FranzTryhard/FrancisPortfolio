import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Sparkles, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';
import { ModalType } from '../types';

interface SelectedWorkSectionProps {
  onOpenModal: (type: ModalType) => void;
  onOpenInquiry: (project: string) => void;
}

export type TechFilter = 'All' | 'React' | 'Python' | 'Full-Stack' | 'JavaScript';

interface FilterOption {
  id: TechFilter;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: 'All', label: 'All Stacks' },
  { id: 'React', label: 'React' },
  { id: 'Python', label: 'Python' },
  { id: 'Full-Stack', label: 'Full-Stack' },
  { id: 'JavaScript', label: 'JavaScript' },
];

interface ProjectConfig {
  id: 'easytrip' | 'electrack' | 'palosebo';
  title: string;
  stacks: TechFilter[];
}

const PROJECTS_CONFIG: ProjectConfig[] = [
  { id: 'easytrip', title: 'EasyTrip', stacks: ['React', 'Full-Stack'] },
  { id: 'electrack', title: 'ElecTrack', stacks: ['Python', 'Full-Stack'] },
  { id: 'palosebo', title: 'Palosebo', stacks: ['JavaScript'] },
];

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  onOpenModal,
  onOpenInquiry,
}) => {
  // Filter state
  const [activeFilter, setActiveFilter] = useState<TechFilter>('All');

  // Card 1 mini interactive state
  const [easyTripTier, setEasyTripTier] = useState<'Tier A' | 'Tier B' | 'Tier C'>('Tier A');

  // Card 2 mini interactive state (Morning / Noon / Night)
  const [elecPeriod, setElecPeriod] = useState<'Morning' | 'Noon' | 'Night'>('Night');
  const elecMetrics = {
    Morning: { kw: '0.8 kW/h', pct: '28%', barWidth: '28%' },
    Noon: { kw: '1.2 kW/h', pct: '42%', barWidth: '42%' },
    Night: { kw: '2.1 kW/h', pct: '68%', barWidth: '68%' },
  };

  // Card 3 mini interactive climb state
  const [paloseboProgress, setPaloseboProgress] = useState(8.2);
  const handleQuickClimb = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPaloseboProgress(prev => {
      const next = prev >= 9.9 ? 1.0 : prev + 0.3;
      return Number(next.toFixed(1));
    });
  };

  // Filter projects based on activeFilter
  const filteredProjects = PROJECTS_CONFIG.filter(project => {
    if (activeFilter === 'All') return true;
    return project.stacks.includes(activeFilter);
  });

  // Calculate count for each filter option
  const getFilterCount = (filterId: TechFilter) => {
    if (filterId === 'All') return PROJECTS_CONFIG.length;
    return PROJECTS_CONFIG.filter(p => p.stacks.includes(filterId)).length;
  };

  return (
    <section id="projects" className="py-20 border-t border-[var(--border-color)]/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Motion */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[var(--text-muted)]">
              SELECTED WORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] mt-2">
              Crafted Concepts &amp; Builds
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-sm font-light">
            Curated selection of full-stack implementations, mobile prototypes, and interactive experiences.
          </p>
        </motion.div>

        {/* Technology Stack Filter Bar */}
        <motion.div
          className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)]/70 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Label & Icon */}
          <div className="flex items-center gap-2 px-1 text-xs font-mono text-[var(--text-muted)]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--text-primary)]" />
            <span className="uppercase tracking-wider">Filter by stack:</span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilter === filter.id;
              const count = getFilterCount(filter.id);

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  data-cursor="interactive"
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold shadow-sm'
                      : 'bg-[var(--bg-surface-alt)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]/50 border border-[var(--border-color)]/60'
                  }`}
                  aria-pressed={isActive}
                >
                  {isActive && <Check className="w-3 h-3 stroke-[2.5]" />}
                  <span>{filter.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-[var(--bg-primary)]/20 text-[var(--bg-primary)]'
                        : 'bg-[var(--bg-primary)]/60 text-[var(--text-muted)]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Counter and Reset Link */}
          <div className="flex items-center justify-between sm:justify-end gap-3 px-1 text-xs font-mono text-[var(--text-muted)] border-t sm:border-t-0 pt-2 sm:pt-0 border-[var(--border-color)]/30">
            <span>
              Showing <strong className="text-[var(--text-primary)]">{filteredProjects.length}</strong> of 3
            </span>
            {activeFilter !== 'All' && (
              <button
                type="button"
                onClick={() => setActiveFilter('All')}
                className="inline-flex items-center gap-1 text-[11px] underline hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Show All</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Project Cards with AnimatePresence */}
        <div className="space-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              // 01 / EasyTrip
              if (project.id === 'easytrip') {
                return (
                  <motion.article
                    key="easytrip"
                    layout
                    data-cursor="project"
                    data-cursor-label="EASYTRIP"
                    className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)]/70 p-8 sm:p-12 hover:border-[var(--text-muted)]/40 transition-all duration-300 group shadow-sm"
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Info Column */}
                      <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
                        <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider mb-2">
                          01 / TRAVEL ARCHITECTURE
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-primary)] mb-3">
                          EasyTrip
                        </h3>
                        <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6 font-light">
                          A comprehensive trip-planning application organizing complex travel itineraries by calendar dates, customizable budget tiers, and curated accommodation preferences.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {['React Native', 'Node.js', 'PostgreSQL'].map(tag => {
                            const isHighlighted =
                              (activeFilter === 'React' && tag.includes('React')) ||
                              (activeFilter === 'Full-Stack' && (tag === 'Node.js' || tag === 'PostgreSQL'));
                            return (
                              <span
                                key={tag}
                                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                                  isHighlighted
                                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-semibold'
                                    : 'bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-[var(--text-primary)]'
                                }`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                          <button
                            onClick={() => onOpenInquiry('EasyTrip')}
                            className="inline-flex items-center text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:underline gap-1.5 cursor-pointer"
                          >
                            <span>View Project Inquiries</span>
                            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                          </button>
                          <button
                            onClick={() => onOpenModal('easytrip')}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono bg-[var(--bg-surface-alt)] hover:bg-[var(--border-color)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-muted)]/40 transition-all cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Open Interactive Demo</span>
                          </button>
                        </div>
                      </div>

                      {/* Display Block */}
                      <div
                        onClick={() => onOpenModal('easytrip')}
                        data-cursor="project"
                        data-cursor-label="VIEW DEMO"
                        className="lg:col-span-7 order-1 lg:order-2 card-grid-bg bg-[var(--bg-surface-alt)] rounded-xl border border-[var(--border-color)]/60 p-6 sm:p-8 flex items-center justify-center min-h-[260px] cursor-pointer hover:border-emerald-500/40 transition-all"
                      >
                        <div className="w-full max-w-md bg-[var(--bg-primary)]/95 rounded-lg p-5 border border-[var(--border-color)] shadow-xl">
                          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-color)]/50 text-xs font-mono text-[var(--text-muted)]">
                            <span className="text-[var(--text-primary)] font-bold">EasyTrip Planner</span>
                            <span className="text-emerald-500">v1.2.0 &bull; Online</span>
                          </div>
                          <div className="space-y-2.5 text-xs">
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setEasyTripTier(easyTripTier === 'Tier A' ? 'Tier B' : easyTripTier === 'Tier B' ? 'Tier C' : 'Tier A');
                              }}
                              className="bg-[var(--bg-surface)] p-2.5 rounded border border-[var(--border-color)]/40 flex justify-between items-center hover:border-emerald-500/40 transition-colors"
                            >
                              <span className="text-[var(--text-primary)]">Day 1: Arrival &amp; Check-In</span>
                              <span className="text-emerald-500 font-mono text-[11px] underline">
                                {easyTripTier} Budget (tap)
                              </span>
                            </div>
                            <div className="bg-[var(--bg-surface)] p-2.5 rounded border border-[var(--border-color)]/40 flex justify-between items-center">
                              <span className="text-[var(--text-primary)]">Day 2: City Landmark Tour</span>
                              <span className="text-[var(--text-muted)] font-mono text-[11px]">Confirmed</span>
                            </div>
                            <div className="bg-[var(--bg-surface)] p-2.5 rounded border border-[var(--border-color)]/40 flex justify-between items-center">
                              <span className="text-[var(--text-primary)]">Day 3: Coastal Transit</span>
                              <span className="text-[var(--text-muted)] font-mono text-[11px]">Planned</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              }

              // 02 / ElecTrack
              if (project.id === 'electrack') {
                return (
                  <motion.article
                    key="electrack"
                    layout
                    data-cursor="project"
                    data-cursor-label="ELECTRACK"
                    className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)]/70 p-8 sm:p-12 hover:border-[var(--text-muted)]/40 transition-all duration-300 group shadow-sm"
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Display Block */}
                      <div
                        onClick={() => onOpenModal('electrack')}
                        data-cursor="project"
                        data-cursor-label="VIEW METRICS"
                        className="lg:col-span-7 card-grid-bg bg-[var(--bg-surface-alt)] rounded-xl border border-[var(--border-color)]/60 p-6 sm:p-8 flex items-center justify-center min-h-[260px] cursor-pointer hover:border-emerald-500/40 transition-all"
                      >
                        <div className="w-full max-w-md bg-[var(--bg-primary)]/95 rounded-lg p-5 border border-[var(--border-color)] shadow-xl">
                          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-color)]/50 text-xs font-mono text-[var(--text-muted)]">
                            <span className="text-[var(--text-primary)] font-bold">ElecTrack Metrics</span>
                            <span className="text-emerald-500">Live {elecMetrics[elecPeriod].kw}</span>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-end text-xs">
                              <span className="text-[var(--text-muted)]">Household Peak Load</span>
                              <span className="font-mono text-[var(--text-primary)]">
                                {elecMetrics[elecPeriod].pct} Capacity
                              </span>
                            </div>
                            <div className="w-full bg-[var(--bg-surface)] h-2 rounded-full overflow-hidden border border-[var(--border-color)]/30">
                              <div
                                className="bg-[var(--text-primary)] h-full rounded-full transition-all duration-300"
                                style={{ width: elecMetrics[elecPeriod].barWidth }}
                              />
                            </div>
                            {/* Period Buttons */}
                            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] font-mono">
                              {(['Morning', 'Noon', 'Night'] as const).map(period => (
                                <button
                                  key={period}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setElecPeriod(period);
                                  }}
                                  className={`p-2 rounded border transition-colors cursor-pointer ${
                                    elecPeriod === period
                                      ? 'bg-[var(--bg-surface-alt)] border-[var(--text-primary)] text-[var(--text-primary)] font-bold shadow-sm'
                                      : 'bg-[var(--bg-surface)] border-[var(--border-color)]/50 text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                  }`}
                                >
                                  {period}: {period === 'Morning' ? '0.8kW' : period === 'Noon' ? '1.2kW' : '2.1kW'}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Info Column */}
                      <div className="lg:col-span-5 flex flex-col justify-center">
                        <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider mb-2">
                          02 / SMART MONITORING
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-primary)] mb-3">
                          ElecTrack
                        </h3>
                        <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6 font-light">
                          A smart energy management concept engineered to assist residential households in monitoring consumption, estimating projected monthly utility costs, and detecting high-load peak usage patterns.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {['Python', 'Django', 'Time-Series DB'].map(tag => {
                            const isHighlighted =
                              (activeFilter === 'Python' && tag.includes('Python')) ||
                              (activeFilter === 'Full-Stack' && (tag === 'Django' || tag === 'Time-Series DB'));
                            return (
                              <span
                                key={tag}
                                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                                  isHighlighted
                                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-semibold'
                                    : 'bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-[var(--text-primary)]'
                                }`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                          <button
                            onClick={() => onOpenInquiry('ElecTrack')}
                            className="inline-flex items-center text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:underline gap-1.5 cursor-pointer"
                          >
                            <span>View Project Inquiries</span>
                            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                          </button>
                          <button
                            onClick={() => onOpenModal('electrack')}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono bg-[var(--bg-surface-alt)] hover:bg-[var(--border-color)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-muted)]/40 transition-all cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Open Interactive Demo</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              }

              // 03 / Palosebo
              if (project.id === 'palosebo') {
                return (
                  <motion.article
                    key="palosebo"
                    layout
                    data-cursor="play"
                    data-cursor-label="PALOSEBO"
                    className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)]/70 p-8 sm:p-12 hover:border-[var(--text-muted)]/40 transition-all duration-300 group shadow-sm"
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Info Column */}
                      <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
                        <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider mb-2">
                          03 / MULTIPLAYER GAME CONCEPT
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-primary)] mb-3">
                          Palosebo
                        </h3>
                        <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6 font-light">
                          Traditional Filipino-inspired competitive greased-pole climbing game concept featuring physics-based friction mechanics, a synchronized 2-player race mode, and distributed global leaderboards.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {['JavaScript', 'HTML5 Canvas', 'WebSockets'].map(tag => {
                            const isHighlighted =
                              activeFilter === 'JavaScript' && (tag === 'JavaScript' || tag.includes('Canvas'));
                            return (
                              <span
                                key={tag}
                                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                                  isHighlighted
                                    ? 'bg-amber-500/15 border border-amber-500/40 text-amber-400 font-semibold'
                                    : 'bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-[var(--text-primary)]'
                                }`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                          <button
                            onClick={() => onOpenInquiry('Palosebo')}
                            className="inline-flex items-center text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:underline gap-1.5 cursor-pointer"
                          >
                            <span>View Project Inquiries</span>
                            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                          </button>
                          <button
                            onClick={() => onOpenModal('palosebo')}
                            data-cursor="play"
                            data-cursor-label="PLAY"
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 transition-all cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Play Mini-Game</span>
                          </button>
                        </div>
                      </div>

                      {/* Display Block */}
                      <div
                        onClick={() => onOpenModal('palosebo')}
                        data-cursor="play"
                        data-cursor-label="PLAY RACE"
                        className="lg:col-span-7 order-1 lg:order-2 card-grid-bg bg-[var(--bg-surface-alt)] rounded-xl border border-[var(--border-color)]/60 p-6 sm:p-8 flex items-center justify-center min-h-[260px] cursor-pointer hover:border-amber-500/40 transition-all"
                      >
                        <div className="w-full max-w-md bg-[var(--bg-primary)]/95 rounded-lg p-5 border border-[var(--border-color)] shadow-xl">
                          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-color)]/50 text-xs font-mono text-[var(--text-muted)]">
                            <span className="text-[var(--text-primary)] font-bold">Race Match #849</span>
                            <span className="text-amber-500">Live Pole Ascent</span>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-[var(--text-primary)]">Player 1 (Local)</span>
                                <span className="font-mono text-xs text-[var(--text-muted)]">
                                  {paloseboProgress.toFixed(1)}m / 10m
                                </span>
                              </div>
                              <div className="w-full bg-[var(--bg-surface)] h-2 rounded-full overflow-hidden border border-[var(--border-color)]/30">
                                <div
                                  className="bg-[var(--text-primary)] h-full rounded-full transition-all duration-200"
                                  style={{ width: `${(paloseboProgress / 10) * 100}%` }}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-[var(--text-muted)]">Player 2 (Remote)</span>
                                <span className="font-mono text-xs text-[var(--text-muted)]">7.1m / 10m</span>
                              </div>
                              <div className="w-full bg-[var(--bg-surface)] h-2 rounded-full overflow-hidden border border-[var(--border-color)]/30">
                                <div className="bg-[var(--text-muted)] h-full rounded-full w-[71%]" />
                              </div>
                            </div>
                            <div className="pt-1 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                              <span className="text-amber-500 font-mono flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Click card to launch 2D Canvas race
                              </span>
                              <button
                                onClick={handleQuickClimb}
                                className="px-2.5 py-1 rounded bg-[var(--bg-surface)] hover:bg-[var(--border-color)] text-xs font-mono text-[var(--text-primary)] cursor-pointer border border-[var(--border-color)]"
                              >
                                Quick Climb
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              }

              return null;
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
