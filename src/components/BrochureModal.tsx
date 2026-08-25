import React from 'react';
import { X, Download, FileText, CheckCircle2, Trophy, MapPin, Calendar, Sparkles } from 'lucide-react';
import { FEST_INFO, FEST_EVENTS } from '../data/festData';
import { soundManager } from '../utils/audio';
import { useToast } from '../context/ToastContext';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
  onRegister
}) => {
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleDownload = () => {
    soundManager.playSuccess();
    const docContent = `=====================================================
NIRVAN '26 - ANNUAL 2-DAY TECH EXTRAVAGANZA
Organized by: Graphic Era Hill University (GEHU), Haldwani Campus
Dates: October 12-13, 2026
Tagline: "Where Ideas Become Innovation"
Web-a-thon 4.0 Challenge & Festival Rulebook
=====================================================

Total Prize Pool: ₹1,50,000+
Expected Innovators: 2,000+
Campuses Represented: 45+

FEATURED EVENT TRACKS:
-----------------------------------------------------
1. HACKATHON (Web-a-thon 4.0)
   - 24-Hour continuous code sprint
   - Venue: Computer Lab 1
   - Team Size: 2-4 Members | Fee: ₹100 | Prize: ₹15,000

2. THE CYBER TREASURE HUNT
   - Cryptic clues, AR checkpoints, logical enigmas
   - Venue: Seminar Hall & Campus Ground
   - Team Size: 2-3 Members | Fee: Free | Prize: ₹8,000

3. E-SPORTS CHAMPIONSHIP
   - Valorant & BGMI LAN Arena
   - Venue: Lab 2 / Gaming Arena
   - Team Size: 4-5 Members | Fee: ₹100 | Prize: ₹12,000

4. CAPTURE THE FLAG (CTF)
   - Web exploits, forensics, cryptography & reverse engineering
   - Venue: Open Ground Cyber Tent & NetLab
   - Team Size: 1-3 Members | Fee: ₹50 | Prize: ₹10,000

5. GEN-AI & AUTONOMOUS AGENTS MASTERCLASS
   - Industry-led hands-on AI agent deployment
   - Venue: Main Auditorium
   - Entry: Free with official credential

CONTACT & HELPDESK:
-----------------------------------------------------
Email: ${FEST_INFO.contactEmail}
Phone: ${FEST_INFO.contactPhone}
Address: ${FEST_INFO.fullVenue}
Official Portal: https://nirvan26.gehu.in
`;

    const blob = new Blob([docContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NIRVAN26-Official-Handbook.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Handbook Downloaded', 'Official NIRVAN 26 Handbook saved to your device!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-950 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/70 overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-base sm:text-lg text-white">
                NIRVAN '26 OFFICIAL FEST BROCHURE & RULEBOOK
              </h3>
              <p className="text-[11px] font-mono-code text-cyan-400">
                Graphic Era Hill University, Haldwani Campus • Web-a-thon 4.0
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brochure Content Preview */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto text-xs sm:text-sm text-slate-300">
          
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono-code font-bold">
              <Sparkles className="w-4 h-4" />
              <span>THE GRAND CONVERGENCE OF MINDS</span>
            </div>
            <p className="leading-relaxed">
              NIRVAN '26 represents the pinnacle of collegiate technical competitiveness in North India. Spanning two intensive days, the fest bridges theoretical engineering with practical industry engineering standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl cyber-glass border-slate-800">
              <Calendar className="w-4 h-4 text-cyan-400 mb-1" />
              <p className="font-bold text-white text-xs">Event Dates</p>
              <p className="text-slate-400 text-xs font-mono-code">{FEST_INFO.dates}</p>
            </div>

            <div className="p-3.5 rounded-xl cyber-glass border-slate-800">
              <MapPin className="w-4 h-4 text-purple-400 mb-1" />
              <p className="font-bold text-white text-xs">Fest Ground</p>
              <p className="text-slate-400 text-xs font-mono-code">GEHU Campus, Haldwani</p>
            </div>

            <div className="p-3.5 rounded-xl cyber-glass border-slate-800">
              <Trophy className="w-4 h-4 text-amber-400 mb-1" />
              <p className="font-bold text-white text-xs">Total Bounty</p>
              <p className="text-amber-300 font-mono-code font-bold text-xs">{FEST_INFO.stats.prizePool}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
              Featured Arenas Summary
            </h4>
            <div className="space-y-2">
              {FEST_EVENTS.map((e) => (
                <div key={e.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-xs">{e.name}</span>
                    <p className="text-slate-400 text-[11px] font-mono-code">{e.venue} • {e.teamSize}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-amber-400 font-bold text-xs">{e.prizePool}</span>
                    <span className="text-slate-500 block text-[10px] font-mono-code">
                      {e.registrationFee === 0 ? 'Free' : `₹${e.registrationFee}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
              Campus Facilities & Logistics
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24x7 Dedicated High-Speed Gigabit WiFi with redundant optical fiber</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hostel boarding available for outstation participants with secure campus lockers</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free meals, midnight snacks, and coffee lounge access for hackathon teams</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 text-xs font-mono-code"
          >
            Close Preview
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownload}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 font-mono-code text-xs flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Text Handbook</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onRegister();
              }}
              className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase shadow-md"
            >
              Register Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
