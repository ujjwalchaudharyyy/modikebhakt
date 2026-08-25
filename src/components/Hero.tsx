import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { FEST_INFO } from '../data/festData';
import { soundManager } from '../utils/audio';

interface HeroProps {
  onOpenRegister: () => void;
  onOpenTerminal: () => void;
  onExploreEvents: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreEvents
}) => {
  // Live Countdown logic
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(FEST_INFO.targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / 1000 / 60) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      )
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    {
      label: 'DAYS',
      value: timeLeft.days,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      label: 'HOURS',
      value: timeLeft.hours,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      label: 'MINUTES',
      value: timeLeft.minutes,
      color: 'from-pink-500 to-rose-500'
    },
    {
      label: 'SECONDS',
      value: timeLeft.seconds,
      color: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden">

      {/* ========================================================= */}
      {/* 3D VIDEO BACKGROUND                                      */}
      {/* ========================================================= */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source
            src="/videos/hero-bg.mp4"
            type="video/mp4"
          />

          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-[#060913]" />

      </div>

      {/* ========================================================= */}
      {/* CYBER GRID                                               */}
      {/* ========================================================= */}

      <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />

      {/* ========================================================= */}
      {/* HERO CONTENT                                              */}
      {/* ========================================================= */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Centered Hero Content */}
        <div className="flex flex-col items-center text-center space-y-8">

          {/* ===================================================== */}
          {/* UNIVERSITY NAME                                       */}
          {/* ===================================================== */}

          <div className="space-y-3">

            <h1 className="font-univ-title text-3d-white text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight uppercase">
              GRAPHIC ERA HILL UNIVERSITY
            </h1>

            <p className="text-3d-white-sub text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-wide italic">
              Transforming Dreams Into Reality
            </p>

          </div>

          {/* ===================================================== */}
          {/* NIRVAN HEADING                                        */}
          {/* ===================================================== */}

          <div className="space-y-3">

            <h2 className="font-fest-title fest-title-colorful text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none uppercase">
              NIRVAN '26
            </h2>

            <p className="hero-tagline text-lg sm:text-xl lg:text-2xl font-semibold">
              "{FEST_INFO.tagline}"
            </p>

          </div>

          {/* ===================================================== */}
          {/* EXPLORE EVENTS BUTTON                                  */}
          {/* ===================================================== */}

          <button
            onClick={() => {
              soundManager.playClick();
              onExploreEvents();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="px-8 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-orbitron font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-2.5"
          >
            <span>Explore Events</span>

            <ArrowRight className="w-4 h-4" />

          </button>

          {/* ===================================================== */}
          {/* COUNTDOWN                                             */}
          {/* ===================================================== */}

          <div className="relative rounded-xl surface-card p-4 shadow-xl overflow-hidden w-full max-w-sm">

            {/* Countdown Header */}
            <div className="flex items-center justify-between pb-2.5">

              <span className="text-xs font-semibold surface-text">
                ⏳ Fest starts in
              </span>

              <span className="text-[10px] surface-text-muted">
                12 Oct 2026, 9:00 AM
              </span>

            </div>

            {/* Countdown Numbers */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 py-2.5">

              {timeBlocks.map((block, i) => (

                <React.Fragment key={block.label}>

                  <div className="flex flex-col items-center">

                    <div className="flip-card w-[46px] sm:w-[52px] h-[50px] sm:h-[58px] flex items-center justify-center">

                      <span className="flip-digit font-orbitron font-bold text-xl sm:text-2xl text-slate-100 relative z-[1]">
                        {String(block.value).padStart(2, '0')}
                      </span>

                    </div>

                    <span className="text-[9px] tracking-[0.15em] surface-text-muted uppercase mt-1.5 font-medium">
                      {block.label}
                    </span>

                  </div>

                  {/* Colon between countdown blocks */}
                  {i < timeBlocks.length - 1 && (

                    <span className="colon-blink text-lg sm:text-xl font-bold text-slate-500 pb-5 select-none">
                      :
                    </span>

                  )}

                </React.Fragment>

              ))}

            </div>

            {/* Countdown Footer */}
            <div className="flex items-center justify-center pt-2 border-t surface-border">

              <span className="text-[10px] surface-text-muted">
                Opening Ceremony · Main Auditorium, GEHU Haldwani
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};