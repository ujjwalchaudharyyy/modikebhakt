import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, CalendarDays, MapPin, Rocket, Ticket, Users } from "lucide-react";
import Particles from "./Particles";
import { EVENT_START } from "../data";

function useCountdown(target: number) {
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return t;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Hero({ dark, onRegister }: { dark: boolean; onRegister: () => void }) {
  const t = useCountdown(EVENT_START);
  const units = [
    { label: "Days", value: pad(t.days) },
    { label: "Hours", value: pad(t.hours) },
    { label: "Minutes", value: pad(t.minutes) },
    { label: "Seconds", value: pad(t.seconds) },
  ];

  return (
<section id="home" className="noise relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 z-0 h-full w-full object-cover"
  >
    <source src="/videos/hero-bg.mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 z-0 bg-black/60" />

  <div className="grid-bg absolute inset-0 z-10" />
  <div className="absolute inset-0 z-10">
    <Particles dark={dark} />
  </div>

      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-violet-600/25 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-[130px]" />
      <div className="animate-floaty pointer-events-none absolute top-1/3 right-[12%] hidden h-40 w-40 rounded-3xl border border-violet-500/30 backdrop-blur-sm lg:block" style={{ transform: "rotate(18deg)" }} />
      <div className="animate-spin-slow pointer-events-none absolute bottom-[14%] left-[6%] hidden h-28 w-28 rounded-full border border-dashed border-cyan-400/40 lg:block" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Registrations Live · Web-a-thon 4.0
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display mt-7 text-[clamp(3.2rem,13vw,11rem)] leading-[0.86] font-black tracking-tighter"
          >
            <span className="block">NIRVAN</span>
            <span className="text-gradient block">'26</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-6 max-w-2xl text-lg font-light text-slate-600 sm:text-2xl dark:text-slate-300"
          >
            Where Ideas Become <span className="font-semibold text-slate-900 dark:text-white">Innovation</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 text-[13px] text-slate-600 dark:text-slate-400"
          >
            {[
              { icon: CalendarDays, text: "12 – 13 October 2026" },
              { icon: MapPin, text: "GEHU Campus, Haldwani" },
              { icon: Users, text: "2 Days · 6 Events" },
            ].map((m) => (
              <span key={m.text} className="glass flex items-center gap-2 rounded-full px-4 py-2">
                <m.icon size={14} className="text-violet-500" />
                {m.text}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#events"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-bold text-white shadow-[0_20px_50px_-18px_rgba(124,58,237,0.95)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 transition-transform duration-500 group-hover:scale-110" />
              <span className="relative z-10 flex items-center gap-2">
                <Rocket size={16} /> Explore Events
              </span>
            </a>
            <button
              onClick={onRegister}
              className="glass inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold transition hover:border-violet-500 hover:text-violet-600 dark:hover:text-cyan-300"
            >
              <Ticket size={16} /> Register Now
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-14 w-full max-w-3xl"
          >
            <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-slate-500 uppercase dark:text-slate-500">
              Countdown to Ignition
            </p>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {units.map((u) => (
                <div
                  key={u.label}
                  className="glass clip-corner relative overflow-hidden px-2 py-4 sm:py-6"
                  data-cursor
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                  <div className="font-display text-3xl leading-none font-black tabular-nums sm:text-5xl">
                    {u.value}
                  </div>
                  <div className="mt-2 font-mono text-[9px] tracking-[0.2em] text-slate-500 uppercase sm:text-[10px] dark:text-slate-400">
                    {u.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 sm:flex dark:text-slate-500"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
