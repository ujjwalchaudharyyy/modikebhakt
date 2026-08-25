import { useState, useEffect } from 'react';
import { ToastProvider, useToast } from './context/ToastContext';
import { CyberBackground } from './components/CyberBackground';
import { CustomCursor } from './components/CustomCursor';
import { WebGLAurora } from './components/WebGLAurora';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutFest } from './components/AboutFest';
import { EventArena } from './components/EventArena';
import { EventDetailModal } from './components/EventDetailModal';
import { EventSchedule } from './components/EventSchedule';
import { SponsorWall } from './components/SponsorWall';
import { FestGallery } from './components/FestGallery';
import { PrizeCalculator } from './components/PrizeCalculator';
import { FAQSection } from './components/FAQSection';
import { ContactFooter } from './components/ContactFooter';
import { LiveTerminal } from './components/LiveTerminal';
import { RegistrationModal } from './components/RegistrationModal';
import { DigitalPassModal } from './components/DigitalPassModal';
import { BrochureModal } from './components/BrochureModal';
import { FestEvent, TicketPassData } from './types/fest';
import { soundManager } from './utils/audio';

function FestApp() {
  const [isDark, setIsDark] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [preSelectedEvent, setPreSelectedEvent] = useState<FestEvent | null>(null);
  const [selectedDetailEvent, setSelectedDetailEvent] = useState<FestEvent | null>(null);
  const [digitalPass, setDigitalPass] = useState<TicketPassData | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    // Theme setup — DEFAULT IS DARK (CYBERPUNK)
    const savedTheme = localStorage.getItem('nirvan_theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light');
    } else {
      setIsDark(true);
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('nirvan_theme', 'dark');
      showToast('Cyber Dark Mode Engaged', 'Matrix high-contrast dark aesthetic active.', 'cyber');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('nirvan_theme', 'light');
      showToast('Cyber Light Mode Engaged', 'High contrast daytime visual theme.', 'info');
    }
  };

  const handleOpenRegister = (event: FestEvent | null = null) => {
    setPreSelectedEvent(event);
    setIsRegisterOpen(true);
    soundManager.playModalOpen();
  };

  const handleExploreEvents = () => {
    const arenaEl = document.getElementById('arena');
    if (arenaEl) {
      arenaEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegistrationSuccess = (pass: TicketPassData) => {
    setDigitalPass(pass);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 relative selection:bg-cyan-400 selection:text-black">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* WebGL Aurora Shader Background */}
      <WebGLAurora />

      {/* Dynamic Cyber Particle Canvas Background */}
      <CyberBackground isDark={isDark} />

      {/* Main Sticky Navigation */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenRegister={() => handleOpenRegister(null)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section Above the Fold */}
        <Hero
          onOpenRegister={() => handleOpenRegister(null)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onExploreEvents={handleExploreEvents}
        />

        {/* 2. About The Fest & Pillars */}
        <AboutFest
          onOpenRegister={() => handleOpenRegister(null)}
          onExploreEvents={handleExploreEvents}
        />

        {/* 3. Event Arena (Catalogue & Filters) */}
        <EventArena
          onSelectEvent={(ev) => setSelectedDetailEvent(ev)}
          onRegisterEvent={(ev) => handleOpenRegister(ev)}
        />

        {/* 4. Interactive Timeline & Schedule */}
        <EventSchedule />

        {/* Interactive Team Perk & Prize Calculator */}
        <PrizeCalculator onOpenRegister={() => handleOpenRegister(null)} />

        {/* 6. Sponsor Wall */}
        <SponsorWall />

        {/* 7. Image Archives & Lightbox Gallery */}
        <FestGallery />

        {/* 8. FAQ Survival Guide */}
        <FAQSection />
      </main>

      {/* Footer & Telemetry */}
      <ContactFooter onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Interactive Cyber CLI Terminal Modal */}
      <LiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenRegister={() => {
          setIsTerminalOpen(false);
          handleOpenRegister(null);
        }}
      />

      {/* Event Details Breakdown Modal */}
      <EventDetailModal
        event={selectedDetailEvent}
        onClose={() => setSelectedDetailEvent(null)}
        onRegister={(ev) => {
          setSelectedDetailEvent(null);
          handleOpenRegister(ev);
        }}
      />

      {/* Multi-step Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        preSelectedEvent={preSelectedEvent}
        onClose={() => {
          setIsRegisterOpen(false);
          setPreSelectedEvent(null);
        }}
        onSuccess={handleRegistrationSuccess}
      />

      {/* Holographic Digital Pass Ticket Modal */}
      <DigitalPassModal
        pass={digitalPass}
        onClose={() => setDigitalPass(null)}
      />

      {/* Fest Brochure Preview Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        onRegister={() => {
          setIsBrochureOpen(false);
          handleOpenRegister(null);
        }}
      />
    </div>
  );
}

export function App() {
  return (
    <ToastProvider>
      <FestApp />
    </ToastProvider>
  );
}

export default App;
