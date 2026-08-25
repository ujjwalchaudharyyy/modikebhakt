import React, { useState } from 'react';
import { Trophy, Gift, Cpu, Award, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface PrizeCalculatorProps {
  onOpenRegister: () => void;
}

export const PrizeCalculator: React.FC<PrizeCalculatorProps> = ({ onOpenRegister }) => {
  const [teamSize, setTeamSize] = useState<number>(3);
  const [selectedTracks, setSelectedTracks] = useState<string[]>(['hackathon', 'ctf']);
  const [aimPosition, setAimPosition] = useState<'1st' | '2nd' | 'participant'>('1st');

  const trackRewards: Record<string, { label: string; p1: number; p2: number; p3: number }> = {
    hackathon: { label: 'Web-a-thon 4.0 Hackathon', p1: 10000, p2: 5000, p3: 2000 },
    esports: { label: 'E-Sports LAN Championship', p1: 8000, p2: 4000, p3: 1500 },
    ctf: { label: 'Capture The Flag (CTF)', p1: 7000, p2: 3000, p3: 1000 },
    'treasure-hunt': { label: 'Cyber Treasure Hunt', p1: 5000, p2: 3000, p3: 1000 }
  };

  const toggleTrack = (trackKey: string) => {
    soundManager.playClick();
    setSelectedTracks((prev) =>
      prev.includes(trackKey) ? prev.filter((t) => t !== trackKey) : [...prev, trackKey]
    );
  };

  // Calculations
  const calculatedCash = selectedTracks.reduce((sum, key) => {
    const track = trackRewards[key];
    if (!track) return sum;
    if (aimPosition === '1st') return sum + track.p1;
    if (aimPosition === '2nd') return sum + track.p2;
    return sum + 0;
  }, 0);

  const estimatedCloudCredits = selectedTracks.length * 150;
  const estimatedSwags = teamSize * selectedTracks.length * 3;

  return (
    <section className="relative py-20 border-t border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="rounded-3xl cyber-glass border-purple-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-purple-950/40">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Title */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <h3 className="font-orbitron font-black text-2xl sm:text-4xl text-white">
              PRIZE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300">CALCULATOR</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Pick your events and see how much your team can win.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Options Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Target Placement */}
              <div>
                <label className="block text-xs font-mono-code text-cyan-400 uppercase tracking-wider mb-2">
                  1. Your Target Position
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: '1st', label: '🥇 1st Place (Winner)' },
                    { id: '2nd', label: '🥈 2nd Place (Runner-up)' },
                    { id: 'participant', label: '🎖️ Delegate (Participant)' }
                  ].map((pos) => (
                    <button
                      key={pos.id}
                      onClick={() => {
                        soundManager.playClick();
                        setAimPosition(pos.id as '1st' | '2nd' | 'participant');
                      }}
                      className={`p-2.5 rounded-xl text-xs font-mono-code font-bold transition-all border ${
                        aimPosition === pos.id
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-300 shadow-md'
                          : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Size */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono-code text-cyan-400 uppercase tracking-wider">
                    2. Team Size: <span className="text-white font-bold">{teamSize} Members</span>
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  {[1, 2, 3, 4, 5].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        soundManager.playClick();
                        setTeamSize(size);
                      }}
                      className={`w-11 h-11 rounded-xl font-orbitron font-bold text-sm transition-all ${
                        teamSize === size
                          ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30'
                          : 'cyber-glass text-slate-300 hover:border-cyan-400/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Tracks */}
              <div>
                <label className="block text-xs font-mono-code text-cyan-400 uppercase tracking-wider mb-2">
                  3. Select Events ({selectedTracks.length} selected)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(trackRewards).map(([key, item]) => {
                    const isSelected = selectedTracks.includes(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggleTrack(key)}
                        className={`p-2.5 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-purple-950/60 border-purple-400 text-white'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] shrink-0 ml-2 ${
                          isSelected ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {isSelected ? '✓' : '+'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Projected Yield Card */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 shadow-2xl space-y-6">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2 text-amber-400">
                    <Trophy className="w-5 h-5" />
                    <h4 className="font-orbitron font-bold text-sm uppercase">Your Estimate</h4>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Cash Prize Big Digit */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30">
                    <p className="text-[10px] font-mono-code text-amber-400 uppercase tracking-widest">
                      Possible Cash Prize
                    </p>
                    <p className="font-orbitron font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 mt-1">
                      ₹{calculatedCash.toLocaleString()}
                    </p>
                    <p className="text-slate-400 text-[11px] font-mono-code mt-1">
                      {aimPosition === 'participant' ? 'Certificate & goodies for all participants' : `If your team finishes ${aimPosition}`}
                    </p>
                  </div>

                  {/* Cloud Credits */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>Cloud & AI Credits</span>
                    </div>
                    <span className="font-mono-code font-bold text-cyan-300">${estimatedCloudCredits} USD</span>
                  </div>

                  {/* Goodies & Kits */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Gift className="w-4 h-4 text-pink-400" />
                      <span>Fest Kits & Swags</span>
                    </div>
                    <span className="font-mono-code font-bold text-pink-300">{estimatedSwags}+ Items</span>
                  </div>

                  {/* Verified Credential */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Award className="w-4 h-4 text-purple-400" />
                      <span>Certificates</span>
                    </div>
                    <span className="font-mono-code font-bold text-purple-300">{teamSize} Verified</span>
                  </div>
                </div>

                {/* Direct Register Action */}
                <button
                  onClick={() => {
                    soundManager.playLaser();
                    onOpenRegister();
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 font-orbitron font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all text-white"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
