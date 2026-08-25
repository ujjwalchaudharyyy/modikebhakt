import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Download, 
  Radio, 
  User,
  Sparkles,
  Code,
  Trophy,
  Cpu,
  Coffee
} from 'lucide-react';
import { FEST_SCHEDULE } from '../data/festData';
import { ScheduleItem } from '../types/fest';
import { soundManager } from '../utils/audio';
import { useToast } from '../context/ToastContext';

export const EventSchedule: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const { showToast } = useToast();

  const daySchedule = FEST_SCHEDULE.filter((item) => item.day === activeDay);

  const filteredSchedule = daySchedule.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ceremony':
        return Sparkles;
      case 'hackathon':
        return Code;
      case 'gaming':
        return Trophy;
      case 'workshop':
        return Cpu;
      case 'break':
        return Coffee;
      default:
        return Clock;
    }
  };

  const handleExportCalendar = (item: ScheduleItem) => {
    soundManager.playSuccess();
    const eventText = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:NIRVAN 26: ${item.title}\nDESCRIPTION:${item.description}\nLOCATION:${item.venue}, GEHU Haldwani\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([eventText], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NIRVAN26-${item.title.substring(0, 15).replace(/\s+/g, '_')}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Calendar Invite Downloaded', `${item.title} has been added to your calendar!`, 'success');
  };

  return (
    <section id="schedule" className="relative py-24 border-t border-slate-800/80 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            48-HOUR EVENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400">CHRONOLOGY</span>
          </h2>
        </div>

        {/* Day Selector & Category Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          {/* Day 1 vs Day 2 Toggle */}
          <div className="flex items-center p-1.5 rounded-2xl cyber-glass border-slate-700 w-full sm:w-auto">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveDay('day1');
              }}
              className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl font-orbitron font-bold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center space-x-2 ${
                activeDay === 'day1'
                  ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>DAY 01</span>
              <span className="font-mono-code text-[11px] opacity-80">(12 OCT 2026)</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveDay('day2');
              }}
              className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl font-orbitron font-bold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center space-x-2 ${
                activeDay === 'day2'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>DAY 02</span>
              <span className="font-mono-code text-[11px] opacity-80">(13 OCT 2026)</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {['all', 'hackathon', 'gaming', 'cyber', 'workshop', 'ceremony'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setFilterCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code uppercase transition-all ${
                  filterCategory === cat
                    ? 'bg-slate-800 text-cyan-400 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {cat === 'all' ? 'All Tracks' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="relative border-l-2 border-cyan-500/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
          {filteredSchedule.map((item) => {
            const IconComp = getCategoryIcon(item.category);

            return (
              <div
                key={item.id}
                onMouseEnter={() => soundManager.playHover()}
                className="relative group transition-all"
              >
                {/* Timeline Dot */}
                <div className={`absolute -left-[35px] sm:-left-[51px] top-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-125 ${
                  item.isLive
                    ? 'bg-rose-500 border-rose-300 shadow-lg shadow-rose-500/50'
                    : 'bg-slate-900 border-cyan-400 group-hover:border-cyan-300'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${item.isLive ? 'bg-white animate-ping' : 'bg-cyan-400'}`} />
                </div>

                {/* Timeline Card */}
                <div className="rounded-2xl cyber-glass border-slate-800 group-hover:border-cyan-500/40 p-5 sm:p-6 transition-all duration-300 shadow-xl group-hover:shadow-cyan-950/30">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Left details */}
                    <div className="space-y-2 flex-1">
                      {/* Top Time & Venue Bar */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono-code text-xs font-bold flex items-center space-x-1.5">
                          <IconComp className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.time} {item.endTime ? `– ${item.endTime}` : ''}</span>
                        </span>

                        <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono-code text-xs flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-purple-400" />
                          <span>{item.venue}</span>
                        </span>

                        {item.isLive && (
                          <span className="px-2.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/50 text-rose-300 font-mono-code text-[11px] font-bold flex items-center space-x-1 animate-pulse">
                            <Radio className="w-3 h-3" />
                            <span>FLAGSHIP STAGE</span>
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-orbitron font-bold text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors pt-1 flex items-center space-x-2">
                        <span>{item.title}</span>
                      </h3>

                      {/* Description */}
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                        {item.description}
                      </p>

                      {/* Keynote Speaker if any */}
                      {item.speaker && (
                        <div className="flex items-center space-x-2 text-xs font-mono-code text-purple-300 pt-1">
                          <User className="w-3.5 h-3.5 text-purple-400" />
                          <span>Speaker: <strong>{item.speaker}</strong></span>
                        </div>
                      )}
                    </div>

                    {/* Right Quick Actions */}
                    <div className="flex items-center space-x-2 shrink-0 pt-2 lg:pt-0">
                      <button
                        onClick={() => handleExportCalendar(item)}
                        className="px-3.5 py-2 rounded-xl cyber-glass border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-xs font-mono-code flex items-center space-x-1.5 transition-colors"
                        title="Add to Google / Apple Calendar"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Add to Calendar</span>
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
