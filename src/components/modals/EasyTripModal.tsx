import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Check, Plus, Layers, ArrowRight } from 'lucide-react';

interface EasyTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (project: string) => void;
}

interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  completed: boolean;
  cost: number;
}

interface DayPlan {
  day: number;
  title: string;
  activities: Activity[];
}

export const EasyTripModal: React.FC<EasyTripModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  const [budgetTier, setBudgetTier] = useState<'Tier A' | 'Tier B' | 'Tier C'>('Tier A');
  const [activeDay, setActiveDay] = useState<number>(1);
  const [newActivityTitle, setNewActivityTitle] = useState('');

  const [itinerary, setItinerary] = useState<DayPlan[]>([
    {
      day: 1,
      title: 'Arrival & Check-In',
      activities: [
        { id: '1-1', time: '10:00 AM', title: 'Airport Express Transfer', location: 'Terminal 3', completed: true, cost: 35 },
        { id: '1-2', time: '01:30 PM', title: 'Hotel Check-in & Orientation', location: 'District Center', completed: true, cost: 120 },
        { id: '1-3', time: '06:00 PM', title: 'Welcome Dinner & Itinerary Briefing', location: 'Harbor Walk', completed: false, cost: 65 },
      ]
    },
    {
      day: 2,
      title: 'City Landmark Tour',
      activities: [
        { id: '2-1', time: '09:00 AM', title: 'Historic Fortress & Museum Walk', location: 'Old Quarter', completed: false, cost: 25 },
        { id: '2-2', time: '01:00 PM', title: 'Artisanal Market Discovery', location: 'Artisans Row', completed: false, cost: 40 },
        { id: '2-3', time: '05:30 PM', title: 'Sunset Viewpoint Cable Ride', location: 'Summit Point', completed: false, cost: 30 },
      ]
    },
    {
      day: 3,
      title: 'Coastal Transit & Nature',
      activities: [
        { id: '3-1', time: '08:30 AM', title: 'High-speed Coastal Ferry', location: 'Pier 4', completed: false, cost: 50 },
        { id: '3-2', time: '11:00 AM', title: 'Coral Reef Snorkel & Eco Trail', location: 'Marine Sanctuary', completed: false, cost: 85 },
        { id: '3-3', time: '04:00 PM', title: 'Seaside Pavilion Rest', location: 'Cove Bay', completed: false, cost: 20 },
      ]
    }
  ]);

  const tierMultipliers = {
    'Tier A': { label: 'Tier A Budget (Luxury)', factor: 1.8, lodging: '5-Star Boutique Suite', transit: 'Private Van / Express' },
    'Tier B': { label: 'Tier B Budget (Comfort)', factor: 1.0, lodging: 'Midscale Modern Hotel', transit: 'Regional Rapid Rail' },
    'Tier C': { label: 'Tier C Budget (Backpacker)', factor: 0.5, lodging: 'Clean Pod Hostel', transit: 'Public Metro & Transit' },
  };

  const toggleActivity = (dayIndex: number, actId: string) => {
    setItinerary(prev => prev.map((d, idx) => {
      if (idx !== dayIndex) return d;
      return {
        ...d,
        activities: d.activities.map(act => act.id === actId ? { ...act, completed: !act.completed } : act)
      };
    }));
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivityTitle.trim()) return;

    setItinerary(prev => prev.map((d) => {
      if (d.day !== activeDay) return d;
      return {
        ...d,
        activities: [
          ...d.activities,
          {
            id: `${activeDay}-${Date.now()}`,
            time: '03:00 PM',
            title: newActivityTitle.trim(),
            location: 'Local Attraction',
            completed: false,
            cost: 30
          }
        ]
      };
    }));
    setNewActivityTitle('');
  };

  const currentDayData = itinerary.find(d => d.day === activeDay) || itinerary[0];
  const totalBaseCost = itinerary.flatMap(d => d.activities).reduce((acc, curr) => acc + curr.cost, 0);
  const calculatedTotal = Math.round(totalBaseCost * tierMultipliers[budgetTier].factor + (budgetTier === 'Tier A' ? 850 : budgetTier === 'Tier B' ? 420 : 180));

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
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[var(--text-muted)]">01 / TRAVEL ARCHITECTURE</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      Interactive Simulator
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-[var(--text-primary)]">EasyTrip Planner</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-alt)] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Controls Bar: Budget Tier Switcher & Summary */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-[var(--bg-surface-alt)] p-4 rounded-xl border border-[var(--border-color)]">
                <div className="md:col-span-7">
                  <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-2">
                    Select Budget Tier (Changes Cost Estimator &amp; Lodging)
                  </label>
                  <div className="flex gap-2">
                    {(['Tier A', 'Tier B', 'Tier C'] as const).map(tier => (
                      <button
                        key={tier}
                        onClick={() => setBudgetTier(tier)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                          budgetTier === tier
                            ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold border-[var(--btn-primary-bg)] shadow-sm'
                            : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--text-muted)]/50'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-5 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[var(--border-color)] pt-3 md:pt-0 md:pl-4">
                  <span className="text-xs font-mono text-[var(--text-muted)]">Projected 3-Day Expense</span>
                  <div className="text-2xl font-display font-bold text-emerald-500">
                    ${calculatedTotal.toLocaleString()}
                    <span className="text-xs font-sans font-normal text-[var(--text-muted)] ml-1">USD total</span>
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    {tierMultipliers[budgetTier].lodging} &middot; {tierMultipliers[budgetTier].transit}
                  </span>
                </div>
              </div>

              {/* Day Tabs */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase text-[var(--text-muted)]">Daily Route Schedule</span>
                  <span className="text-xs text-[var(--text-muted)]">Click items to toggle completion state</span>
                </div>
                <div className="flex gap-2 border-b border-[var(--border-color)] pb-3">
                  {itinerary.map(d => (
                    <button
                      key={d.day}
                      onClick={() => setActiveDay(d.day)}
                      className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        activeDay === d.day
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 font-bold'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-alt)]'
                      }`}
                    >
                      Day {d.day}: {d.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Activities List */}
              <div className="space-y-3">
                {currentDayData.activities.map((act) => (
                  <div
                    key={act.id}
                    onClick={() => toggleActivity(currentDayData.day - 1, act.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer select-none ${
                      act.completed
                        ? 'bg-[var(--bg-surface-alt)]/40 border-[var(--border-color)] text-[var(--text-muted)]'
                        : 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[var(--text-muted)]/50 text-[var(--text-primary)] shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                        act.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-[var(--border-color)] bg-[var(--bg-surface-alt)]'
                      }`}>
                        {act.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-[var(--text-muted)] mr-2">{act.time}</span>
                        <span className={`text-sm font-medium ${act.completed ? 'line-through opacity-70' : ''}`}>
                          {act.title}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-500/80" />
                          <span>{act.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-emerald-500 font-semibold">
                      ${Math.round(act.cost * tierMultipliers[budgetTier].factor)}
                    </div>
                  </div>
                ))}

                {/* Quick Add Stop */}
                <form onSubmit={handleAddActivity} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Add custom waypoint for Day"
                    value={newActivityTitle}
                    onChange={(e) => setNewActivityTitle(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--text-primary)]/60"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-[var(--border-color)] hover:bg-[var(--border-hover)] text-xs font-mono text-[var(--text-primary)] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Stop</span>
                  </button>
                </form>
              </div>

              {/* Technical Architecture Info */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                  <Layers className="w-4 h-4 text-emerald-500" />
                  <span className="font-bold text-[var(--text-primary)]">Architectural Highlights</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Engineered with <span className="text-[var(--text-primary)] font-medium">React Native</span> front-end state caching, <span className="text-[var(--text-primary)] font-medium">Node.js</span> route matrix solver for travel leg time optimizations, and <span className="text-[var(--text-primary)] font-medium">PostgreSQL</span> relational schema linking destinations, user preferences, and real-time transit status.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-[var(--border-color)] bg-[var(--bg-surface-alt)]/50 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
                Status: Production prototype build
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
                    onOpenInquiry('EasyTrip');
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 cursor-pointer shadow-sm"
                >
                  <span>Inquire About EasyTrip</span>
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
