import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ChevronUp, 
  Compass, 
  Radio
} from 'lucide-react';
import { FEST_INFO } from '../data/festData';
import { soundManager } from '../utils/audio';
import { useToast } from '../context/ToastContext';

export const ContactFooter: React.FC<{ onOpenTerminal: () => void }> = ({ onOpenTerminal }) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const { showToast } = useToast();

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryMessage) return;
    soundManager.playSuccess();
    setIsSent(true);
    showToast('Inquiry Transmitted!', 'Our student fest committee will respond to your email within 6 hours.', 'success');
    setTimeout(() => {
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
      setIsSent(false);
    }, 3000);
  };

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-slate-950 border-t border-cyan-500/30 overflow-hidden pt-20 pb-12">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Contact & Inquiry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Left Column: Campus Info & Coordinators */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono-code">
                <Compass className="w-3.5 h-3.5" />
                <span>Headquarters & Helpdesk</span>
              </div>

              <h3 className="font-orbitron font-black text-2xl sm:text-3xl text-white">
                GRAPHIC ERA HILL UNIVERSITY <span className="text-cyan-400 block text-lg sm:text-xl font-mono-code mt-1">HALDWANI CAMPUS</span>
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Nestled in the picturesque foothills of Nainital, GEHU Haldwani is a premier technical institution fostering next-generation engineers, AI researchers, and startup founders.
              </p>
            </div>

            {/* Direct Coordinates Cards */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3.5 rounded-2xl cyber-glass border-slate-800">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-mono-code text-slate-400 uppercase block">Venue Location</span>
                  <p className="font-medium text-white">{FEST_INFO.fullVenue}</p>
                  <p className="text-slate-400 text-[11px] mt-0.5 font-mono-code">
                    (5 km from Kathgodam Railway Station • 30 km from Pantnagar Airport)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`mailto:${FEST_INFO.contactEmail}`}
                  className="flex items-center space-x-3 p-3.5 rounded-2xl cyber-glass border-slate-800 hover:border-cyan-400 transition-colors group"
                >
                  <Mail className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="text-xs">
                    <span className="font-mono-code text-slate-400 uppercase block">Official Email</span>
                    <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">{FEST_INFO.contactEmail}</span>
                  </div>
                </a>

                <a
                  href={`tel:${FEST_INFO.contactPhone}`}
                  className="flex items-center space-x-3 p-3.5 rounded-2xl cyber-glass border-slate-800 hover:border-cyan-400 transition-colors group"
                >
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="text-xs">
                    <span className="font-mono-code text-slate-400 uppercase block">Fest Helpline</span>
                    <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">{FEST_INFO.contactPhone}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Student Lead Directory */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono-code text-cyan-400 uppercase tracking-wider block">
                Lead Student Coordinators:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="font-bold text-white">Aarav Joshi</p>
                  <p className="text-slate-400 text-[11px] font-mono-code">Convenor • +91 98765 43210</p>
                </div>
                <div>
                  <p className="font-bold text-white">Ananya Negi</p>
                  <p className="text-slate-400 text-[11px] font-mono-code">Technical Lead • +91 98765 43211</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Contact Dispatch Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl cyber-glass border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-orbitron font-bold text-base sm:text-lg text-white">
                  DISPATCH INQUIRY TO COMMITTEE
                </h4>
                <span className="text-[10px] font-mono-code text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 flex items-center space-x-1">
                  <Radio className="w-2.5 h-2.5 animate-pulse" />
                  <span>ONLINE</span>
                </span>
              </div>

              {isSent ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h5 className="font-orbitron font-bold text-white text-base">Transmission Acknowledged!</h5>
                  <p className="text-slate-300 text-xs max-w-sm mx-auto">
                    Your inquiry has been logged into our central ticket router. Expect a rapid reply from our convenors.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendInquiry} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Ishaan Rawat"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">Your Email Address</label>
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="ishaan@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">Message / Question</label>
                    <textarea
                      rows={3}
                      required
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Ask regarding travel logistics, campus stay, team limits, or event rules..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 font-orbitron font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25 text-white transition-all hover:scale-[1.01]"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Middle Footer Navigation & Socials */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-slate-800 text-xs">
          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <span className="font-orbitron font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                NIRVAN '26
              </span>
              <span className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Web-a-thon 4.0
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Graphic Era Hill University, Haldwani Campus. "Where Ideas Become Innovation". A two-day tech extravaganza of coding, security, robotics, and community.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {/* Social Channels */}
              <a
                href={FEST_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href={FEST_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>

              <a
                href={FEST_INFO.socials.discord}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors"
                title="Discord Server"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>

              <button
                onClick={onOpenTerminal}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800 transition-colors font-mono-code text-[11px]"
              >
                &gt;_ CLI Terminal
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h5 className="font-orbitron font-bold text-slate-200 uppercase tracking-wider">Quick Jump</h5>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">Fest Narrative</a></li>
              <li><a href="#arena" className="hover:text-cyan-400 transition-colors">Event Arena</a></li>
              <li><a href="#schedule" className="hover:text-cyan-400 transition-colors">2-Day Timeline</a></li>
              <li><a href="#gallery" className="hover:text-cyan-400 transition-colors">Visual Archives</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Survival FAQ</a></li>
            </ul>
          </div>

          {/* Guidelines */}
          <div className="space-y-2">
            <h5 className="font-orbitron font-bold text-slate-200 uppercase tracking-wider">Code of Conduct</h5>
            <ul className="space-y-1.5 text-slate-400">
              <li><span className="text-slate-300">Web-a-thon 4.0 Ethics</span></li>
              <li><span className="text-slate-300">Cyber CTF Fairplay Rules</span></li>
              <li><span className="text-slate-300">Hostel Safety & Curfew</span></li>
              <li><span className="text-slate-300">Anti-Harassment Policy</span></li>
              <li><span className="text-slate-300">GEHU Campus Bylaws</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom System Telemetry & Heartbeat Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-slate-500">
          <div className="flex items-center space-x-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400">SYSTEM TELEMETRY: ALL CLUSTERS OPERATIONAL</span>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="text-cyan-400 hidden sm:inline">PING: 14ms</span>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-center sm:text-right text-slate-400">
              © 2026 NIRVAN '26. Graphic Era Hill University, Haldwani.
            </p>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-400 text-cyan-400 transition-all shadow-md"
              title="Scroll to Top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
