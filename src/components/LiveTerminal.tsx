import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { FEST_EVENTS, FEST_INFO, FEST_SCHEDULE, FEST_SPEAKERS } from '../data/festData';
import { soundManager } from '../utils/audio';

interface LiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const LiveTerminal: React.FC<LiveTerminalProps> = ({
  isOpen,
  onClose,
  onOpenRegister
}) => {
  const [input, setInput] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'init nirvan-v4.0.0',
      timestamp: new Date().toLocaleTimeString(),
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">
            ⚡ NIRVAN '26 CYBERNETIC SHELL [v4.0.0-RELEASE]
          </p>
          <p className="text-slate-400 text-xs">
            Graphic Era Hill University, Haldwani Campus • Web-a-thon 4.0
          </p>
          <p className="text-emerald-400 text-xs">
            Type <span className="text-amber-400 font-bold underline cursor-pointer">help</span> or click command chips below to explore fest operations.
          </p>
        </div>
      )
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    const cmd = raw.toLowerCase();
    const timestamp = new Date().toLocaleTimeString();
    soundManager.playClick();

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-400 font-bold">Available Cyber Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
              <p><span className="text-amber-400 font-mono-code font-bold">events</span> - Catalogue of all 8 tech battles</p>
              <p><span className="text-amber-400 font-mono-code font-bold">prize</span> - View ₹1.5L+ prize pool breakdown</p>
              <p><span className="text-amber-400 font-mono-code font-bold">schedule</span> - Check 2-Day timeline</p>
              <p><span className="text-amber-400 font-mono-code font-bold">speakers</span> - List keynote tech luminaries</p>
              <p><span className="text-amber-400 font-mono-code font-bold">register</span> - Launch instant registration form</p>
              <p><span className="text-amber-400 font-mono-code font-bold">rules</span> - Web-a-thon 4.0 guidelines</p>
              <p><span className="text-amber-400 font-mono-code font-bold">contact</span> - GEHU Haldwani campus desk</p>
              <p><span className="text-amber-400 font-mono-code font-bold">easteregg</span> - 🎁 Unlock secret VIP promo code</p>
              <p><span className="text-amber-400 font-mono-code font-bold">clear</span> - Flush terminal buffer</p>
            </div>
          </div>
        );
        break;

      case 'events':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-400 font-bold">⚡ NIRVAN '26 BATTLE ROSTER:</p>
            <div className="space-y-1.5">
              {FEST_EVENTS.map((ev) => (
                <div key={ev.id} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold">{ev.name}</span>
                    <span className="text-slate-400 block text-[11px]">{ev.date} • {ev.venue}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-amber-400 font-bold">{ev.prizePool}</span>
                    <span className="text-cyan-400 text-[10px] block font-mono-code">Fee: ₹{ev.registrationFee}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'prize':
      case 'prizes':
        output = (
          <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs space-y-1.5">
            <p className="font-bold text-amber-400 text-sm">🏆 TOTAL FESTIVAL PRIZE POOL: ₹1,50,000+</p>
            <p>• Web-a-thon 4.0: ₹15,000 + Tech Goodies & Cloud Credits</p>
            <p>• E-Sports Championship: ₹12,000 + Championship Trophy</p>
            <p>• Capture The Flag (CTF): ₹10,000 + Security Certifications</p>
            <p>• Cyber Treasure Hunt: ₹8,000 + Golden Cipher Trophy</p>
          </div>
        );
        break;

      case 'schedule':
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-400 font-bold">📅 DAY 1 & 2 QUICK TIMELINE:</p>
            {FEST_SCHEDULE.slice(0, 6).map((item) => (
              <div key={item.id} className="text-slate-300 flex items-start space-x-2">
                <span className="text-purple-400 font-mono-code font-semibold shrink-0">{item.time}</span>
                <span>—</span>
                <span className="text-slate-200">{item.title} <span className="text-slate-500">({item.venue})</span></span>
              </div>
            ))}
            <p className="text-slate-400 italic text-[11px] mt-1">+ Day 2 Grand Finale, AI Masterclasses, and Valedictory.</p>
          </div>
        );
        break;

      case 'speakers':
        output = (
          <div className="space-y-1.5 text-xs">
            <p className="text-purple-400 font-bold">🎙️ FEATURED LUMINARIES & KEYNOTES:</p>
            {FEST_SPEAKERS.map((sp) => (
              <div key={sp.id} className="text-slate-300">
                <span className="text-white font-bold">{sp.name}</span> ({sp.role} @ {sp.organization})
                <p className="text-cyan-400 text-[11px]">Topic: {sp.topic}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'rules':
        output = (
          <div className="text-xs space-y-1 text-slate-300">
            <p className="text-amber-400 font-bold">📜 WEB-A-THON 4.0 CORE DIRECTIVES:</p>
            <p>1. 24-Hour continuous sprint starting 12 Oct 10:00 AM.</p>
            <p>2. Teams of 2 to 4 students from any verified educational institution.</p>
            <p>3. All source code must be authored inside the hackathon window.</p>
            <p>4. Git commits will be audited with automated integrity checkers.</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-xs space-y-1 text-slate-300">
            <p className="text-emerald-400 font-bold">📍 FESTIVAL HELPDESK & VENUE:</p>
            <p>University: {FEST_INFO.organization}</p>
            <p>Campus: {FEST_INFO.fullVenue}</p>
            <p>Email: <span className="text-cyan-400">{FEST_INFO.contactEmail}</span></p>
            <p>Emergency Hotline: <span className="text-cyan-400">{FEST_INFO.contactPhone}</span></p>
          </div>
        );
        break;

      case 'register':
        onClose();
        onOpenRegister();
        return;

      case 'easteregg':
      case 'secret':
        output = (
          <div className="p-3 rounded-lg bg-purple-950/50 border border-purple-400 text-purple-200 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-purple-300 font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>🎁 HACKER DISCOUNT UNLOCKED!</span>
            </div>
            <p>Use coupon code <span className="font-mono-code font-black text-amber-300 text-sm px-2 py-0.5 bg-slate-900 rounded border border-amber-400">GEHU2026</span> during fest registration for instant ₹50 waiver on team entry!</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <p className="text-rose-400 text-xs">
            Command not recognized: "{raw}". Type <span className="text-cyan-400 underline font-bold">help</span> to view supported commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: raw,
        output,
        timestamp
      }
    ]);

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const quickCommands = ['help', 'events', 'prize', 'schedule', 'speakers', 'easteregg', 'register', 'clear'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className={`w-full bg-slate-950/95 border border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col transition-all duration-300 ${
          isMaximized ? 'h-[92vh] max-w-6xl' : 'h-[580px] max-w-3xl'
        }`}
      >
        {/* Terminal Titlebar */}
        <div className="px-4 py-3 bg-slate-900 border-b border-cyan-500/30 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
              <div className="w-3 h-3 rounded-full bg-amber-500/80 cursor-pointer" onClick={() => handleCommand('clear')} />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
            </div>
            <div className="flex items-center space-x-2 pl-3">
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
              <span className="font-mono-code text-xs font-bold text-slate-200">
                nirvan-terminal@gehu-haldwani:~ (zsh)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="text-slate-400 hover:text-white p-1"
              title="Toggle Size"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-rose-400 p-1"
              title="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Chips */}
        <div className="px-4 py-2 bg-slate-900/70 border-b border-slate-800 flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-mono-code text-slate-500 uppercase shrink-0">Chips:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-0.5 rounded-full bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-400 border border-slate-700/60 font-mono-code text-[11px] text-slate-300 transition-colors shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Output Console */}
        <div className="flex-1 p-4 overflow-y-auto font-mono-code space-y-4 bg-slate-950/90 text-sm">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-emerald-400">user@nirvan26:~$</span>
                <span className="text-white font-bold">{item.command}</span>
                <span className="text-slate-600 text-[10px] ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4 border-l border-slate-800">{item.output}</div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Prompt Input Bar */}
        <div className="p-3 bg-slate-900 border-t border-cyan-500/30 flex items-center space-x-2">
          <span className="text-emerald-400 font-mono-code text-xs font-bold shrink-0">
            user@nirvan26:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-white font-mono-code text-xs sm:text-sm focus:outline-none placeholder-slate-600"
          />
          <button
            onClick={() => handleCommand(input)}
            className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
