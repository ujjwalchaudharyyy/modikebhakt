import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Calendar, 
  Trophy, 
  HelpCircle, 
  Image as ImageIcon,
  Flame,
  ArrowRight
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onOpenRegister: () => void;
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  toggleTheme,
  onOpenRegister,
  onOpenTerminal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { label: 'Overview', href: '#about', icon: Sparkles },
    { label: 'Event Arena', href: '#arena', icon: Trophy, badge: '15+ Events' },
    { label: 'Schedule', href: '#schedule', icon: Calendar },
    { label: 'Sponsors', href: '#sponsors', icon: Flame },
    { label: 'Gallery', href: '#gallery', icon: ImageIcon },
    { label: 'FAQ', href: '#faq', icon: HelpCircle }
  ];

  const handleLinkClick = (href: string) => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'cyber-glass border-b border-cyan-500/20 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            soundManager.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-3 group"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-400/60 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-lg">
                  N
                </span>
              </div>
            </div>
            {/* Live Indicator Dot */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-orbitron font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-300 group-hover:from-cyan-300 group-hover:to-purple-200 transition-colors">
                NIRVAN
              </span>
              <span className="font-mono-code text-xs px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
                '26
              </span>
            </div>
            <p className="text-[10px] font-mono-code tracking-widest text-slate-400 uppercase">
              GEHU HALDWANI
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 dark:bg-slate-900/80 light:bg-white/80 p-1.5 rounded-full border border-slate-700/40 backdrop-blur-md">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              onMouseEnter={() => soundManager.playHover()}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-cyan-400 hover:bg-slate-800/80 transition-all flex items-center space-x-1.5 relative group"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls & CTA */}
        <div className="hidden sm:flex items-center space-x-2.5">
          {/* Terminal CLI Shortcut Button */}
          {onOpenTerminal && (
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenTerminal();
              }}
              onMouseEnter={() => soundManager.playHover()}
              title="Open NIRVAN Cyber CLI"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 text-cyan-400 transition-all"
            >
              <Terminal className="w-4 h-4" />
            </button>
          )}

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={() => soundManager.playHover()}
            title={isMuted ? 'Unmute UI Audio SFX' : 'Mute UI Audio SFX'}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              toggleTheme();
            }}
            onMouseEnter={() => soundManager.playHover()}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-amber-400/50 text-amber-400 transition-all"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-purple-400" />}
          </button>

          {/* Register CTA Button */}
          <button
            onClick={() => {
              soundManager.playLaser();
              onOpenRegister();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 font-bold text-xs tracking-wider uppercase font-orbitron transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center space-x-1.5 text-white font-bold">
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={() => {
              soundManager.playClick();
              toggleTheme();
            }}
            className="p-2 rounded-lg bg-slate-800 text-amber-400 border border-slate-700"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden cyber-glass border-b border-cyan-500/30 px-4 pt-3 pb-6 mt-3 space-y-2.5 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-mono-code text-cyan-400">
              NIRVAN 26 • GEHU HALDWANI
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSoundToggle}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs flex items-center space-x-1"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                <span className="text-[10px]">{isMuted ? 'Muted' : 'Sound ON'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-left text-xs font-medium text-slate-200 border border-slate-700/50"
                >
                  <IconComponent className="w-4 h-4 text-cyan-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                soundManager.playLaser();
                onOpenRegister();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-orbitron font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/30"
            >
              <span>Register for Fest</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
