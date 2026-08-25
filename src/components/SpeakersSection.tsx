import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  X, 
  Send
} from 'lucide-react';
import { FEST_SPEAKERS } from '../data/festData';
import { Speaker } from '../types/fest';
import { soundManager } from '../utils/audio';
import { useToast } from '../context/ToastContext';

export const SpeakersSection: React.FC = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [questionText, setQuestionText] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleAskQuestion = (speaker: Speaker) => {
    soundManager.playModalOpen();
    setSelectedSpeaker(speaker);
    setIsSubmitted(false);
    setQuestionText('');
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    soundManager.playSuccess();
    setIsSubmitted(true);
    showToast('Question Transmitted!', `Your inquiry has been queued for ${selectedSpeaker?.name}'s Q&A segment.`, 'success');
    setTimeout(() => {
      setSelectedSpeaker(null);
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <section id="speakers" className="relative py-24 border-t border-slate-800/80 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            MEET THE TECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">LUMINARIES</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Gain direct insights, architectural masterclasses, and career wisdom from top engineers, security architects, and product designers.
          </p>
        </div>

        {/* Speakers Grid (4 distinguished speakers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEST_SPEAKERS.map((speaker) => (
            <div
              key={speaker.id}
              onMouseEnter={() => soundManager.playHover()}
              className="group rounded-3xl cyber-glass border-slate-800 hover:border-cyan-400/50 p-5 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 shadow-xl hover:shadow-cyan-950/40"
            >
              {/* Speaker Photo / Card Header */}
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-slate-700/80 group-hover:border-cyan-400/40 transition-colors">
                  <img
                    src={speaker.avatar}
                    alt={speaker.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Badge */}
                  {speaker.featuredBadge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-purple-500/90 text-white font-orbitron font-bold text-[10px] tracking-wider uppercase backdrop-blur-md">
                        {speaker.featuredBadge}
                      </span>
                    </div>
                  )}

                  {/* Session Time Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-cyan-300 font-mono-code text-[11px] backdrop-blur-md">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>{speaker.sessionTime}</span>
                    </span>
                  </div>
                </div>

                {/* Speaker Info */}
                <div className="space-y-1.5">
                  <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {speaker.name}
                  </h3>

                  <p className="text-xs font-mono-code text-purple-400 font-semibold">
                    {speaker.role}
                  </p>

                  <p className="text-xs text-slate-400 font-medium">
                    {speaker.organization}
                  </p>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed pt-2">
                    {speaker.bio}
                  </p>
                </div>

                {/* Keynote Topic Highlight */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <p className="text-[10px] font-mono-code text-cyan-400 uppercase tracking-wider flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Keynote / Workshop</span>
                  </p>
                  <p className="text-xs font-semibold text-white line-clamp-2">
                    {speaker.topic}
                  </p>
                </div>
              </div>

              {/* Card Footer: Socials & Ask Question */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-400">
                  {speaker.socials.linkedin && (
                    <a
                      href={speaker.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                      aria-label={`${speaker.name} LinkedIn`}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    </a>
                  )}
                  {speaker.socials.twitter && (
                    <a
                      href={speaker.socials.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                      aria-label={`${speaker.name} Twitter`}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                  {speaker.socials.github && (
                    <a
                      href={speaker.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                      aria-label={`${speaker.name} GitHub`}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => handleAskQuestion(speaker)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono-code flex items-center space-x-1 transition-colors"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Ask Q&A</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Ask Speaker Q&A Modal */}
      {selectedSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-950 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedSpeaker.avatar}
                  alt={selectedSpeaker.name}
                  className="w-10 h-10 rounded-full object-cover border border-cyan-400"
                />
                <div>
                  <h3 className="font-orbitron font-bold text-sm text-white">Ask {selectedSpeaker.name}</h3>
                  <p className="text-[11px] font-mono-code text-cyan-400">{selectedSpeaker.organization}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-orbitron font-bold text-white text-lg">Question Queued!</h4>
                <p className="text-slate-300 text-xs">
                  Your question has been sent to the moderator terminal for {selectedSpeaker.name}'s keynote Q&A round.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuestion} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1">
                    Your Email (For Follow-up Answers)
                  </label>
                  <input
                    type="email"
                    required
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    placeholder="you@college.edu"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1">
                    Your Question / Discussion Topic
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder={`e.g. In your talk about "${selectedSpeaker.topic}", how do you address...`}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSpeaker(null)}
                    className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 text-xs font-mono-code"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase flex items-center space-x-1.5"
                  >
                    <span>Transmit Question</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
