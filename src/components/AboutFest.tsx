import React from 'react';
import { 
  Lightbulb, 
  Cpu, 
  Trophy, 
  Users, 
  Sparkles, 
  Building2, 
  Compass, 
  CheckCircle2,
  ArrowRight,
  Code2
} from 'lucide-react';
import { FEST_INFO, FEST_PILLARS } from '../data/festData';
import { soundManager } from '../utils/audio';

interface AboutFestProps {
  onOpenRegister: () => void;
  onExploreEvents: () => void;
}

export const AboutFest: React.FC<AboutFestProps> = ({
  onOpenRegister,
  onExploreEvents
}) => {
  const pillarIcons: Record<string, React.ElementType> = {
    Lightbulb,
    Cpu,
    Trophy,
    Users
  };

  return (
    <section id="about" className="relative py-24 border-t border-slate-800/80 overflow-hidden">
      {/* Background Neon Blobs */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header — Hand-crafted human style */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 tilt-left">
            <Sparkles className="w-4 h-4" />
            <span className="font-hand text-lg font-semibold tracking-wide">~ about NIRVAN '26 ~</span>
          </div>

          <h2 className="font-hand font-bold text-4xl sm:text-6xl text-white tracking-normal leading-tight">
            Where <span className="hand-highlight">Ideas</span> become{' '}
            <span className="font-marker text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 hand-underline inline-block tilt-tiny text-3xl sm:text-5xl">
              Innovation
            </span>
          </h2>

          <p className="font-hand-body text-slate-300 text-sm sm:text-base leading-relaxed">
            NIRVAN '26 is the flagship annual college technical festival hosted by Graphic Era Hill University, Haldwani Campus. Over two electric days, tech prodigies, visionary coders, cybersecurity enthusiasts, and digital artists converge to push the boundaries of modern computing.
          </p>
        </div>

        {/* Narrative Feature Card */}
        <div className="rounded-3xl cyber-glass border-cyan-500/30 p-8 sm:p-10 mb-16 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 text-purple-400 tilt-right">
                <Code2 className="w-4 h-4" />
                <span className="font-hand text-lg font-semibold">Web-a-thon 4.0 &amp; beyond...</span>
              </div>

              <h3 className="font-hand font-bold text-3xl sm:text-4xl text-white leading-snug">
                A <span className="hand-highlight">48-hour</span> high-octane playground for the future of technology
              </h3>

              <p className="font-hand-body text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether you are racing the 24-hour hackathon clock to build revolutionary AI agents, cracking complex cryptograms in our AR treasure hunt, clutching 1v4 tournament rounds on LAN esports, or defending simulated cyber infrastructures against zero-day exploits, NIRVAN '26 is engineered to challenge, inspire, and elevate your skills.
              </p>

              {/* Fast Bullet Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2.5 text-slate-200 font-hand-body text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>100% industry verified certifications</span>
                </div>
                <div className="flex items-center space-x-2.5 text-slate-200 font-hand-body text-sm">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>mentorship from Silicon Valley leads</span>
                </div>
                <div className="flex items-center space-x-2.5 text-slate-200 font-hand-body text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>direct venture angel &amp; job fast-tracks</span>
                </div>
                <div className="flex items-center space-x-2.5 text-slate-200 font-hand-body text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>gourmet meals &amp; participant swag kits</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onExploreEvents();
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider transition-colors flex items-center space-x-2"
                >
                  <span>Browse 15+ Events</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    soundManager.playModalOpen();
                    onOpenRegister();
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="px-6 py-3 rounded-xl border border-slate-700 hover:border-purple-400 text-purple-300 font-orbitron font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Join as Attendee
                </button>
              </div>
            </div>

            {/* Right Side Campus Visual Banner */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 group">
                <img
                  src="https://images.pexels.com/photos/1181260/pexels-photo-1181260.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Students Collaborating at NIRVAN"
                  className="w-full h-72 sm:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
                  <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono-code mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Host Campus</span>
                  </div>
                  <p className="font-bold text-white text-sm">Graphic Era Hill University, Haldwani</p>
                  <p className="text-slate-400 text-xs">Picturesque Himalayan Foothills • Modern Tech Labs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-hand font-bold text-2xl sm:text-3xl text-white tilt-tiny">
              the <span className="hand-underline">4 pillars</span> of NIRVAN
            </h3>
            <span className="font-hand text-base text-cyan-400 flex items-center space-x-1 tilt-right">
              <Compass className="w-4 h-4" />
              <span>core philosophy ✍️</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEST_PILLARS.map((pillar, idx) => {
              const IconComp = pillarIcons[pillar.icon] || Lightbulb;
              const accentBorder = 
                pillar.color === 'cyan' ? 'hover:border-cyan-400 group-hover:text-cyan-400' :
                pillar.color === 'purple' ? 'hover:border-purple-400 group-hover:text-purple-400' :
                pillar.color === 'amber' ? 'hover:border-amber-400 group-hover:text-amber-400' :
                'hover:border-emerald-400 group-hover:text-emerald-400';

              const handTilt = idx % 2 === 0 ? 'tilt-left' : 'tilt-right';
              return (
                <div
                  key={pillar.title}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`group rounded-2xl cyber-glass border-slate-800 p-6 transition-all duration-300 transform hover:-translate-y-1.5 hover:rotate-0 sticky-note ${handTilt} ${accentBorder}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-cyan-400 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="font-hand text-lg text-slate-500 font-bold">
                      #{idx + 1}
                    </span>
                  </div>

                  <h4 className="font-marker text-lg text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {pillar.title.toLowerCase()}
                  </h4>
                  
                  <p className="font-hand text-base text-cyan-400/90 mb-3 font-semibold">
                    {pillar.subtitle}
                  </p>

                  <p className="font-hand-body text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {pillar.description}
                  </p>

                  <div className="pt-3 border-t border-dashed border-slate-700 flex items-center justify-between">
                    <span className="font-hand text-sm text-slate-400">impact →</span>
                    <span className="font-hand text-base text-amber-400 font-bold">{pillar.stat}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlight Key Stats Bar */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl cyber-glass border-cyan-500/20 bg-gradient-to-r from-slate-900/90 via-slate-900/90 to-purple-950/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            <div className="p-3 tilt-left">
              <p className="font-marker text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {FEST_INFO.stats.prizePool}
              </p>
              <p className="font-hand text-base text-slate-400 mt-1">total prize pool 💰</p>
            </div>
            <div className="p-3 tilt-right">
              <p className="font-marker text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {FEST_INFO.stats.participants}
              </p>
              <p className="font-hand text-base text-slate-400 mt-1">expected hackers 👨‍💻</p>
            </div>
            <div className="p-3 tilt-left">
              <p className="font-marker text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                {FEST_INFO.stats.eventsCount}
              </p>
              <p className="font-hand text-base text-slate-400 mt-1">battle arenas ⚔️</p>
            </div>
            <div className="p-3 tilt-right">
              <p className="font-marker text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                {FEST_INFO.stats.partnerColleges}
              </p>
              <p className="font-hand text-base text-slate-400 mt-1">partner colleges 🏫</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
