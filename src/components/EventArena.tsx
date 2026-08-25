import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  SlidersHorizontal,
  Info,
  Layers
} from 'lucide-react';
import { FEST_EVENTS } from '../data/festData';
import { FestEvent, EventCategory } from '../types/fest';
import { soundManager } from '../utils/audio';

interface EventArenaProps {
  onSelectEvent: (event: FestEvent) => void;
  onRegisterEvent: (event: FestEvent) => void;
}

export const EventArena: React.FC<EventArenaProps> = ({
  onSelectEvent,
  onRegisterEvent
}) => {
  const [activeCategory, setActiveCategory] = useState<EventCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'prize' | 'fee-asc' | 'team'>('default');

  const categories: { id: EventCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'All Arenas', icon: '⚡' },
    { id: 'hackathon', label: 'Hackathons', icon: '💻' },
    { id: 'gaming', label: 'Gaming / E-Sports', icon: '🎮' },
    { id: 'cybersecurity', label: 'Cybersecurity / CTF', icon: '🛡️' },
    { id: 'treasure-hunt', label: 'Treasure Hunt', icon: '🧭' },
    { id: 'workshop', label: 'Workshops', icon: '📚' }
  ];

  const filteredEvents = useMemo(() => {
    return FEST_EVENTS.filter((ev) => {
      // Category match
      const matchesCategory = activeCategory === 'all' || ev.category === activeCategory;
      
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        ev.name.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q) ||
        ev.venue.toLowerCase().includes(q) ||
        ev.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'prize') {
        return b.prizeAmount - a.prizeAmount;
      }
      if (sortBy === 'fee-asc') {
        return a.registrationFee - b.registrationFee;
      }
      if (sortBy === 'team') {
        return b.maxTeamSize - a.maxTeamSize;
      }
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <section id="arena" className="relative py-24 border-t border-slate-800/80 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            COMPETE. CODE. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">CONQUER.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Choose your battleground! From 24-hour hackathons and AR treasure hunts to cyber penetration testing and intense LAN gaming brackets with ₹1,50,000+ total prizes.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="space-y-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveCategory(cat.id);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`px-4 py-2.5 rounded-xl font-mono-code text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/30'
                      : 'cyber-glass text-slate-300 hover:text-white hover:border-cyan-500/40'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/20 text-slate-900' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {cat.id === 'all' 
                      ? FEST_EVENTS.length 
                      : FEST_EVENTS.filter(e => e.category === cat.id).length
                    }
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by title, track, venue, skills (e.g. Hackathon, Valorant, CTF, AI)..."
                className="w-full pl-10 pr-4 py-3 rounded-xl cyber-glass border-slate-700/80 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono-code text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="sm:col-span-4 relative">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-purple-400 shrink-0 ml-1 hidden sm:block" />
                <select
                  value={sortBy}
                  onChange={(e) => {
                    soundManager.playClick();
                    setSortBy(e.target.value as 'default' | 'prize' | 'fee-asc' | 'team');
                  }}
                  className="w-full py-3 px-3.5 rounded-xl cyber-glass border-slate-700/80 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-purple-400 cursor-pointer"
                >
                  <option value="default" className="bg-slate-900 text-white">Sort: Recommended</option>
                  <option value="prize" className="bg-slate-900 text-white">Highest Prize Pool</option>
                  <option value="fee-asc" className="bg-slate-900 text-white">Free / Lowest Fee First</option>
                  <option value="team" className="bg-slate-900 text-white">Largest Team Size</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-6 px-1">
          <span>Showing <strong className="text-cyan-400">{filteredEvents.length}</strong> events in arena</span>
          {searchQuery && (
            <span>Filtered by: "<span className="text-white">{searchQuery}</span>"</span>
          )}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="p-12 rounded-3xl cyber-glass border-slate-800 text-center space-y-4">
            <Layers className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="font-orbitron font-bold text-lg text-white">No Arenas Found Matching Query</h3>
            <p className="text-slate-400 text-xs max-w-md mx-auto">
              Try adjusting your search terms or switch category filters to see all available competitions.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onMouseEnter={() => soundManager.playHover()}
                className="group rounded-2xl cyber-glass border-slate-800 hover:border-cyan-400/50 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-cyan-950/40 transform hover:-translate-y-1"
              >
                {/* Event Image Banner */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-cyan-500 text-slate-950 font-orbitron font-black text-[10px] uppercase tracking-wider shadow-md">
                      {event.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-slate-300 font-mono-code text-[10px] backdrop-blur-md">
                      {event.slotsRemaining} Slots Left
                    </span>
                  </div>

                  {/* Prize Badge Overlay */}
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-900/90 border border-amber-500/40 text-amber-300 backdrop-blur-md shadow-lg">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-orbitron font-bold text-xs">{event.prizePool}</span>
                    </div>
                  </div>

                  {/* Fee Overlay */}
                  <div className="absolute bottom-3 right-3">
                    <span className={`px-2.5 py-1 rounded-lg font-mono-code text-[11px] font-bold backdrop-blur-md ${
                      event.registrationFee === 0 
                        ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300' 
                        : 'bg-slate-900/90 border border-slate-700 text-cyan-300'
                    }`}>
                      {event.registrationFee === 0 ? 'FREE' : `₹${event.registrationFee} Entry`}
                    </span>
                  </div>
                </div>

                {/* Event Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono-code text-purple-400 uppercase tracking-widest font-semibold">
                        {event.category.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono-code text-slate-400 flex items-center space-x-1">
                        <Users className="w-3 h-3 text-amber-400" />
                        <span>{event.teamSize}</span>
                      </span>
                    </div>

                    <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {event.name}
                    </h3>

                    <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Meta: Date & Venue */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs font-mono-code text-slate-300">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{event.date} • {event.time.split('–')[0]}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {event.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-800/70 text-slate-300 text-[10px] font-mono-code"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => {
                        soundManager.playModalOpen();
                        onSelectEvent(event);
                      }}
                      className="py-2 px-3 rounded-xl cyber-glass border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-mono-code flex items-center justify-center space-x-1 transition-colors"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => {
                        soundManager.playLaser();
                        onRegisterEvent(event);
                      }}
                      className="py-2 px-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1 shadow-md hover:shadow-cyan-400/40 transition-all active:scale-95"
                    >
                      <span>Register</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
