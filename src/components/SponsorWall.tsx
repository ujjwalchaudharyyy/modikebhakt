import React, { useState } from 'react';
import { ExternalLink, Download, Sparkles, Building, X, CheckCircle2 } from 'lucide-react';
import { FEST_SPONSORS } from '../data/festData';
import { soundManager } from '../utils/audio';
import { useToast } from '../context/ToastContext';

export const SponsorWall: React.FC = () => {
  const [isProspectusOpen, setIsProspectusOpen] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const { showToast } = useToast();

  const titleSponsors = FEST_SPONSORS.filter((s) => s.tier === 'title');
  const goldSponsors = FEST_SPONSORS.filter((s) => s.tier === 'gold');
  const communityPartners = FEST_SPONSORS.filter((s) => s.tier === 'community');

  const handleDownloadProspectus = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();
    setIsProspectusOpen(false);
    showToast('Sponsorship Deck Sent!', 'Our corporate relations team will contact your organization within 24 hours.', 'success');
  };

  return (
    <section id="sponsors" className="relative py-24 border-t border-slate-800/80 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            BACKED BY <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400">GLOBAL LEADERS</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We are proud to collaborate with vanguard tech enterprises and developer communities empowering student innovation.
          </p>
        </div>

        {/* 1. TITLE SPONSORS */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center space-x-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/40" />
            <span className="font-orbitron font-bold text-xs uppercase tracking-widest text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
              👑 TITLE SPONSORS
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/40" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {titleSponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                onMouseEnter={() => soundManager.playHover()}
                className="group rounded-3xl cyber-glass border-amber-500/30 hover:border-amber-400 p-6 sm:p-8 transition-all duration-300 shadow-xl hover:shadow-amber-950/40 transform hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="px-4 py-2 rounded-xl bg-slate-900 border border-amber-500/40">
                    <span className="font-orbitron font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
                      {sponsor.logoText}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-code text-amber-400 uppercase tracking-widest bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-800/60">
                    Lead Partner
                  </span>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {sponsor.description}
                </p>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono-code">
                  <span className="text-slate-400">{sponsor.perks}</span>
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. GOLD SPONSORS */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center space-x-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/30" />
            <span className="font-orbitron font-bold text-xs uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              💎 GOLD SPONSORS
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/30" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {goldSponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                onMouseEnter={() => soundManager.playHover()}
                className="group rounded-2xl cyber-glass border-slate-800 hover:border-cyan-400/50 p-5 transition-all duration-300 shadow-lg transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-orbitron font-black text-lg text-white group-hover:text-cyan-300 transition-colors">
                      {sponsor.logoText}
                    </span>
                    <span className="text-[10px] font-mono-code text-cyan-400">GOLD</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed mb-3">
                    {sponsor.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono-code">
                  <span className="text-slate-400 truncate mr-2">{sponsor.perks}</span>
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-white shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. COMMUNITY PARTNERS */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/30" />
            <span className="font-orbitron font-bold text-xs uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
              🚀 COMMUNITY PARTNERS
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/30" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {communityPartners.map((sponsor) => (
              <div
                key={sponsor.id}
                onMouseEnter={() => soundManager.playHover()}
                className="rounded-2xl cyber-glass border-slate-800 hover:border-purple-400/50 p-5 transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="font-orbitron font-bold text-base text-white">{sponsor.name}</h4>
                  <p className="text-xs text-slate-400">{sponsor.perks}</p>
                </div>
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor Call to Action Banner */}
        <div className="mt-16 p-8 rounded-3xl cyber-glass border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-900/90 to-purple-950/40 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center space-x-2 text-cyan-400 text-xs font-mono-code font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Partner With NIRVAN '26</span>
            </div>
            <h3 className="font-orbitron font-black text-xl sm:text-2xl text-white">
              Want to Elevate Your Brand to 2,000+ Elite Tech Builders?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Custom booth spaces, keynote slots, hackathon problem challenge sponsorship, and exclusive recruitment access.
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playModalOpen();
              setIsProspectusOpen(true);
            }}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-orbitron font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 flex items-center space-x-2 shrink-0 transition-transform active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Sponsorship Deck</span>
          </button>
        </div>

      </div>

      {/* Sponsorship Prospectus Modal */}
      {isProspectusOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-amber-400">
                <Building className="w-5 h-5" />
                <h3 className="font-orbitron font-bold text-base text-white">Sponsorship Prospectus</h3>
              </div>
              <button
                onClick={() => setIsProspectusOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-300 text-xs">
              Enter your corporate coordinates to immediately receive the NIRVAN '26 Partnership Tiers & Deliverables Brochure.
            </p>

            <form onSubmit={handleDownloadProspectus} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1">Company / Organization</label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Acme Tech Labs"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1">Corporate Work Email</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="partnerships@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200 flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Instant PDF download + dedicated liaison call slot within 24h.</span>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProspectusOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-orbitron font-bold text-xs uppercase"
                >
                  Download Deck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
