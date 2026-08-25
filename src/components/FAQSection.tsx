import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Mail, Phone } from 'lucide-react';
import { FEST_FAQS, FEST_INFO } from '../data/festData';
import { soundManager } from '../utils/audio';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleFAQ = (id: string) => {
    soundManager.playClick();
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = FEST_FAQS.filter((faq) => {
    if (activeCategory === 'all') return true;
    return faq.category === activeCategory;
  });

  return (
    <section id="faq" className="relative py-24 border-t border-slate-800/80 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono-code">
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">Hacker Survival Guide & FAQ</span>
          </div>

          <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            FREQUENTLY ASKED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">QUESTIONS</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about eligibility, team configurations, campus stay, food, WiFi, and certificates.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { id: 'all', label: 'All Queries' },
            { id: 'general', label: 'General & Entry' },
            { id: 'registration', label: 'Event Bundles' },
            { id: 'hackathon', label: 'Hackathon Rules' },
            { id: 'logistics', label: 'Hostel & Stay' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono-code font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'cyber-glass text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl cyber-glass transition-all duration-300 border ${
                  isOpen ? 'border-cyan-400/50 shadow-lg shadow-cyan-950/30' : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4"
                >
                  <span className="font-orbitron font-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 shrink-0 transform transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-cyan-500/20 text-cyan-300' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout Banner */}
        <div className="mt-12 p-6 rounded-2xl cyber-glass border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-orbitron font-bold text-sm text-white">Have a specific question not listed?</h4>
              <p className="text-slate-400 text-xs">Our student coordinator helpdesk is active 24/7 on WhatsApp & Email.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={`mailto:${FEST_INFO.contactEmail}`}
              className="px-4 py-2 rounded-xl cyber-glass border-slate-700 hover:border-cyan-400 text-cyan-300 text-xs font-mono-code flex items-center space-x-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{FEST_INFO.contactEmail}</span>
            </a>
            <a
              href={`tel:${FEST_INFO.contactPhone}`}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono-code flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{FEST_INFO.contactPhone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
