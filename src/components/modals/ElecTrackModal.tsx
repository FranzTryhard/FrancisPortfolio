import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Activity, AlertTriangle, ArrowRight, Layers } from 'lucide-react';

interface ElecTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (project: string) => void;
}

interface Appliance {
  id: string;
  name: string;
  load: number;
  category: string;
  active: boolean;
}

export const ElecTrackModal: React.FC<ElecTrackModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  const [timeOfDay, setTimeOfDay] = useState<'Morning' | 'Noon' | 'Night' | 'Peak'>('Night');
  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: 'base', name: 'Baseline & Refrigeration', load: 0.35, category: 'Essential', active: true },
    { id: 'ac', name: 'Central Air Conditioning', load: 1.45, category: 'Climate', active: true },
    { id: 'ev', name: 'Level 2 EV Charging', load: 2.20, category: 'Mobility', active: false },
    { id: 'wh', name: 'Smart Water Heater', load: 0.90, category: 'Sanitary', active: false },
    { id: 'stove', name: 'Induction Cooktop', load: 1.20, category: 'Kitchen', active: false },
    { id: 'pc', name: 'Workstation & Lab Rig', load: 0.40, category: 'Tech', active: true },
  ]);

  const toggleAppliance = (id: string) => {
    setAppliances(prev => prev.map(item => {
      if (item.id === 'base') return item;
      return item.id === id ? { ...item, active: !item.active } : item;
    }));
  };

  const handleTimePreset = (time: 'Morning' | 'Noon' | 'Night' | 'Peak') => {
    setTimeOfDay(time);
    if (time === 'Morning') {
      setAppliances(prev => prev.map(a => ({
        ...a,
        active: ['base', 'stove', 'pc'].includes(a.id)
      })));
    } else if (time === 'Noon') {
      setAppliances(prev => prev.map(a => ({
        ...a,
        active: ['base', 'ac'].includes(a.id)
      })));
    } else if (time === 'Night') {
      setAppliances(prev => prev.map(a => ({
        ...a,
        active: ['base', 'ac', 'pc'].includes(a.id)
      })));
    } else if (time === 'Peak') {
      setAppliances(prev => prev.map(a => ({
        ...a,
        active: ['base', 'ac', 'ev', 'stove'].includes(a.id)
      })));
    }
  };

  const currentTotalLoad = appliances
    .filter(a => a.active)
    .reduce((sum, a) => sum + a.load, 0);

  const maxCapacity = 5.0;
  const loadPercentage = Math.min(Math.round((currentTotalLoad / maxCapacity) * 100), 100);
  const isOverload = loadPercentage > 75;

  const dailyKWh = (currentTotalLoad * 14).toFixed(1);
  const monthlyCost = Math.round(Number(dailyKWh) * 30 * 0.16);

  const hourlyReadings = [
    { hour: '00:00', kw: 0.4 },
    { hour: '04:00', kw: 0.35 },
    { hour: '08:00', kw: 0.8 },
    { hour: '12:00', kw: 1.2 },
    { hour: '16:00', kw: 1.5 },
    { hour: '20:00', kw: currentTotalLoad },
    { hour: '22:00', kw: 1.8 },
  ];

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
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[var(--text-muted)]">02 / SMART MONITORING</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      Live Metrics Simulator
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-[var(--text-primary)]">ElecTrack</h3>
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
              {/* Key Metrics Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)]">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase">Instantaneous Draw</span>
                  <div className="text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
                    {currentTotalLoad.toFixed(2)}{' '}
                    <span className="text-sm font-sans font-normal text-emerald-500">kW/h</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">
                    Active appliances: {appliances.filter(a => a.active).length} of {appliances.length}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[var(--text-muted)] uppercase">Panel Capacity</span>
                    {isOverload && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-amber-500">
                        <AlertTriangle className="w-3 h-3" /> Peak Threshold
                      </span>
                    )}
                  </div>
                  <div className="text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
                    {loadPercentage}%{' '}
                    <span className="text-sm font-sans font-normal text-[var(--text-muted)]">of 5.0kW</span>
                  </div>
                  <div className="w-full bg-[var(--bg-surface)] h-2 rounded-full overflow-hidden mt-2 border border-[var(--border-color)]/30">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isOverload ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${loadPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)]">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase">Projected Utility Cost</span>
                  <div className="text-3xl font-display font-bold text-emerald-500 mt-1">
                    ${monthlyCost}{' '}
                    <span className="text-xs font-sans font-normal text-[var(--text-muted)]">/ month</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">
                    ~{dailyKWh} kWh/day estimated burn
                  </p>
                </div>
              </div>

              {/* Time of Day Presets */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase text-[var(--text-muted)]">Diurnal Profile Simulation</span>
                  <span className="text-xs text-[var(--text-muted)]">Select a time scenario or toggle appliances below</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Morning', 'Noon', 'Night', 'Peak'] as const).map(time => (
                    <button
                      key={time}
                      onClick={() => handleTimePreset(time)}
                      className={`py-2 px-3 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                        timeOfDay === time
                          ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold border-[var(--btn-primary-bg)] shadow-sm'
                          : 'bg-[var(--bg-surface-alt)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--text-muted)]/50 hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {time} Scenario
                    </button>
                  ))}
                </div>
              </div>

              {/* Appliance Toggles */}
              <div>
                <span className="text-xs font-mono uppercase text-[var(--text-muted)] block mb-3">
                  Interactive Circuit Breakers / Appliance Loads
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {appliances.map(app => (
                    <div
                      key={app.id}
                      onClick={() => toggleAppliance(app.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer select-none ${
                        app.active
                          ? 'bg-[var(--bg-surface-alt)] border-emerald-500/40 text-[var(--text-primary)] shadow-sm'
                          : 'bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--text-muted)]/40'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-medium text-[var(--text-primary)]">{app.name}</div>
                        <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                          {app.category} &middot; <span className="font-mono text-emerald-500 font-medium">+{app.load} kW</span>
                        </div>
                      </div>
                      <div
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                          app.active ? 'bg-emerald-500' : 'bg-[var(--border-color)]'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-[var(--bg-surface)] transition-transform ${
                            app.active ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hourly Telemetry Chart */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-500" />
                    Time-Series Household Load Curve (24h)
                  </span>
                  <span className="text-xs font-mono text-emerald-500">TimescaleDB Pipeline</span>
                </div>
                <div className="flex items-end justify-between gap-2 h-28 pt-4 border-b border-[var(--border-color)]">
                  {hourlyReadings.map((reading, i) => {
                    const heightPercent = Math.min(Math.round((reading.kw / 3.5) * 100), 100);
                    const isCurrent = i === 5;
                    return (
                      <div key={reading.hour} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          {reading.kw.toFixed(1)}k
                        </span>
                        <div
                          className={`w-full rounded-t transition-all duration-300 ${
                            isCurrent
                              ? isOverload ? 'bg-amber-500' : 'bg-emerald-500'
                              : 'bg-[var(--border-color)] hover:bg-[var(--border-hover)]'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                        <span className={`text-[10px] font-mono ${isCurrent ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-muted)]'}`}>
                          {reading.hour}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Architecture Card */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-[var(--text-primary)]">Stack &amp; Pipeline</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Constructed with <span className="text-[var(--text-primary)] font-medium">Python</span> asynchronous ingestion workers, <span className="text-[var(--text-primary)] font-medium">Django REST framework</span> endpoints, and a time-series hypertable database structure for instantaneous roll-up statistics across millions of meter events.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-[var(--border-color)] bg-[var(--bg-surface-alt)]/50 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
                Status: Simulation mode active
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
                    onOpenInquiry('ElecTrack');
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 cursor-pointer shadow-sm"
                >
                  <span>Inquire About ElecTrack</span>
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
