import React, { useRef } from 'react';
import { 
  X, 
  Download, 
  Share2, 
  CheckCircle2, 
  QrCode, 
  Calendar, 
  MapPin, 
  Cpu
} from 'lucide-react';
import { TicketPassData } from '../types/fest';
import { FEST_INFO } from '../data/festData';
import { soundManager } from '../utils/audio';
import { useToast } from '../context/ToastContext';

interface DigitalPassModalProps {
  pass: TicketPassData | null;
  onClose: () => void;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({ pass, onClose }) => {
  const passCardRef = useRef<HTMLDivElement | null>(null);
  const { showToast } = useToast();

  if (!pass) return null;

  const handleDownloadTicket = () => {
    soundManager.playSuccess();
    window.print();
    showToast('Printing Pass', 'Digital Fest Pass prepared for print/save as PDF!', 'success');
  };

  const handleShareTicket = () => {
    soundManager.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `I am attending NIRVAN '26 (Web-a-thon 4.0) at GEHU Haldwani! Ticket ID: ${pass.ticketId} | Reg: ${pass.registrationNumber}`
      );
      showToast('Copied to Clipboard', 'Festival attendance badge text copied!', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative max-w-lg w-full flex flex-col items-center my-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white bg-slate-900/80 rounded-full border border-slate-700"
          aria-label="Close pass modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Confetti Alert Capsule */}
        <div className="mb-4 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono-code animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>REGISTRATION CONFIRMED • PASS ACTIVE</span>
        </div>

        {/* Holographic Cyber Fest Pass Card */}
        <div
          ref={passCardRef}
          className="w-full rounded-3xl bg-slate-950 border-2 border-cyan-400/60 p-6 sm:p-8 shadow-2xl shadow-cyan-950/80 relative overflow-hidden text-slate-100 space-y-6"
        >
          {/* Hologram Gradient Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/15 to-transparent pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Pass Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4 relative z-10">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-orbitron font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  NIRVAN '26
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono-code uppercase font-bold">
                  {pass.tier}
                </span>
              </div>
              <p className="text-[11px] font-mono-code text-slate-400">
                {FEST_INFO.organization} • {FEST_INFO.campus}
              </p>
            </div>

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-0.5 shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </div>

          {/* Pass Attendee Info */}
          <div className="grid grid-cols-2 gap-4 relative z-10 text-xs">
            <div>
              <span className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider block">
                Delegate Name
              </span>
              <p className="font-orbitron font-bold text-base text-white truncate mt-0.5">
                {pass.attendeeName}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider block">
                Registration ID
              </span>
              <p className="font-mono-code font-bold text-sm text-cyan-400 mt-0.5">
                {pass.registrationNumber}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider block">
                Institution / College
              </span>
              <p className="text-slate-200 truncate mt-0.5 font-medium">
                {pass.collegeName}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider block">
                Team Affiliation
              </span>
              <p className="text-purple-300 truncate mt-0.5 font-semibold">
                {pass.teamName || 'Solo Contender'}
              </p>
            </div>
          </div>

          {/* Enrolled Events Tags */}
          <div className="relative z-10 space-y-1.5 pt-2 border-t border-slate-800">
            <span className="text-[10px] font-mono-code text-cyan-400 uppercase tracking-wider block">
              Enrolled Arenas & Access Rights:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {pass.eventNames.map((name, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-slate-200 text-xs font-mono-code font-medium"
                >
                  ⚡ {name}
                </span>
              ))}
            </div>
          </div>

          {/* QR Code & Barcode Section */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-slate-400 text-[11px] font-mono-code">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{FEST_INFO.dates}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-400 text-[11px] font-mono-code">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Lab 1 / Main Audi Check-in</span>
              </div>
              <p className="text-[10px] font-mono-code text-emerald-400 font-semibold pt-1">
                ✓ VERIFIED DIGITALLY • ADMIT ONE
              </p>
            </div>

            {/* Simulated Cyber QR Stamp */}
            <div className="p-2 rounded-xl bg-white text-slate-950 flex flex-col items-center justify-center shrink-0 shadow-lg">
              <QrCode className="w-12 h-12 text-slate-950" />
              <span className="text-[8px] font-mono-code font-black uppercase tracking-tighter text-slate-800">
                NIRVAN-26
              </span>
            </div>
          </div>

          {/* Barcode Graphic */}
          <div className="text-center pt-1 border-t border-slate-800 relative z-10">
            <div className="flex items-center justify-center space-x-1 h-6 opacity-60">
              {Array.from({ length: 42 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-full bg-cyan-400 ${
                    i % 3 === 0 ? 'w-1' : i % 5 === 0 ? 'w-1.5' : 'w-0.5'
                  }`}
                />
              ))}
            </div>
            <span className="font-mono-code text-[10px] text-slate-500 tracking-widest mt-1 block">
              *{pass.ticketId}*
            </span>
          </div>

        </div>

        {/* Action Controls */}
        <div className="w-full grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={handleDownloadTicket}
            className="py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Print / Save Pass</span>
          </button>

          <button
            onClick={handleShareTicket}
            className="py-3 px-4 rounded-xl cyber-glass border-slate-700 hover:border-purple-400 text-slate-200 text-xs font-mono-code flex items-center justify-center space-x-2 transition-colors"
          >
            <Share2 className="w-4 h-4 text-purple-400" />
            <span>Copy Badge Link</span>
          </button>
        </div>

      </div>
    </div>
  );
};
