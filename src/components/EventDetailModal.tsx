import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Trophy, 
  Phone, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { FestEvent } from '../types/fest';
import { soundManager } from '../utils/audio';

interface EventDetailModalProps {
  event: FestEvent | null;
  onClose: () => void;
  onRegister: (event: FestEvent) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onRegister
}) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/70 overflow-hidden my-8">
        
        {/* Banner Cover Image Header */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-rose-500/80 border border-slate-700 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge & Title in Header */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider">
                {event.badge}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-purple-500/40 text-purple-300 font-mono-code text-xs uppercase">
                {event.category}
              </span>
            </div>
            <h3 className="font-orbitron font-black text-2xl sm:text-4xl text-white tracking-wide">
              {event.name}
            </h3>
            <p className="text-cyan-300 font-syne text-sm sm:text-base mt-1">
              {event.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Meta Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl cyber-glass border-slate-800">
            <div className="flex items-center space-x-2.5">
              <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <p className="text-[10px] font-mono-code text-slate-400 uppercase">Date</p>
                <p className="font-semibold text-xs sm:text-sm text-white">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <Clock className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <p className="text-[10px] font-mono-code text-slate-400 uppercase">Timing</p>
                <p className="font-semibold text-xs sm:text-sm text-white">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="text-[10px] font-mono-code text-slate-400 uppercase">Venue</p>
                <p className="font-semibold text-xs sm:text-sm text-white">{event.venue}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <Users className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="text-[10px] font-mono-code text-slate-400 uppercase">Team Size</p>
                <p className="font-semibold text-xs sm:text-sm text-white">{event.teamSize}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-orbitron font-bold text-sm text-cyan-400 uppercase tracking-wider">
              Event Overview
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {event.longDescription || event.description}
            </p>
          </div>

          {/* Prize Breakdown */}
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-amber-400">
                <Trophy className="w-5 h-5" />
                <h4 className="font-orbitron font-bold text-sm uppercase tracking-wider">
                  Prize Pool Breakdown
                </h4>
              </div>
              <span className="font-orbitron font-black text-lg text-amber-300">
                {event.prizePool}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/20">
                <p className="text-amber-400 font-bold mb-1">🥇 1st Place Champion</p>
                <p className="text-slate-200">{event.firstPrize}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
                <p className="text-slate-300 font-bold mb-1">🥈 2nd Place Runner Up</p>
                <p className="text-slate-200">{event.secondPrize}</p>
              </div>
              {event.thirdPrize && (
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
                  <p className="text-amber-600 font-bold mb-1">🥉 3rd Place / Special</p>
                  <p className="text-slate-200">{event.thirdPrize}</p>
                </div>
              )}
            </div>
          </div>

          {/* Highlights & Perks */}
          {event.highlights && (
            <div className="space-y-2">
              <h4 className="font-orbitron font-bold text-sm text-purple-400 uppercase tracking-wider">
                Event Highlights & Resources Provided
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {event.highlights.map((item, i) => (
                  <div key={i} className="flex items-start space-x-2 text-slate-300 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rules & Guidelines */}
          {event.rules && (
            <div className="space-y-2">
              <h4 className="font-orbitron font-bold text-sm text-slate-200 uppercase tracking-wider">
                Rules & Eligibility
              </h4>
              <ul className="space-y-1.5 list-disc list-inside text-xs text-slate-300">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="leading-relaxed">{rule}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Judging Criteria */}
          {event.judgingCriteria && (
            <div className="space-y-2">
              <h4 className="font-orbitron font-bold text-sm text-cyan-400 uppercase tracking-wider">
                Evaluation & Judging Parameters
              </h4>
              <div className="flex flex-wrap gap-2">
                {event.judgingCriteria.map((crit, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-cyan-950/50 border border-cyan-800/40 text-cyan-200 text-xs font-mono-code"
                  >
                    {crit}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Coordinators Contact */}
          {event.coordinators && event.coordinators.length > 0 && (
            <div className="pt-2 border-t border-slate-800">
              <h4 className="font-mono-code text-xs text-slate-400 uppercase tracking-wider mb-2">
                Student Coordinators
              </h4>
              <div className="flex flex-wrap gap-4">
                {event.coordinators.map((c, i) => (
                  <div key={i} className="flex items-center space-x-3 text-xs bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="font-bold text-white">{c.name}</span>
                    <a href={`tel:${c.phone}`} className="text-cyan-400 hover:underline flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>{c.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer / Action CTA */}
        <div className="p-6 bg-slate-900 border-t border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-slate-400 text-xs font-mono-code block">Registration Fee:</span>
            <span className="font-orbitron font-black text-xl text-emerald-400">
              {event.registrationFee === 0 ? 'FREE ENTRY' : `₹${event.registrationFee} / Team`}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 font-mono-code text-xs transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                soundManager.playLaser();
                onRegister(event);
              }}
              className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-orbitron font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 flex items-center space-x-2 transition-transform active:scale-95 text-white"
            >
              <span>Register For {event.name.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
