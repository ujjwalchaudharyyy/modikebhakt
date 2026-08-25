import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  Code2,
  Gamepad2,
  GraduationCap,
  IndianRupee,
  Map as MapIcon,
  MapPin,
  Search,
  ShieldCheck,
  Trophy,
  Users,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { CATEGORIES, EVENTS, type FestEvent } from "../data";
import { Reveal, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

const ICONS: Record<string, React.ElementType> = {
  Code2,
  Map: MapIcon,
  Gamepad2,
  ShieldCheck,
  GraduationCap,
  Zap,
};

function EventCard({ e, onRegister }: { e: FestEvent; onRegister: (id: string) => void }) {
  const Icon = ICONS[e.icon] ?? Code2;
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(ev) => {
        const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width;
        const py = (ev.clientY - r.top) / r.height;
        setTilt({ rx: (0.5 - py) * 9, ry: (px - 0.5) * 9, mx: px * 100, my: py * 100 });
      }}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0, mx: 50, my: 50 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: "preserve-3d",
      }}
      className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-shadow duration-300 hover:shadow-[0_35px_80px_-40px_rgba(124,58,237,0.85)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${tilt.mx}% ${tilt.my}%, rgba(124,58,237,0.16), transparent 60%)`,
        }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <span className={cn("grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white", e.accent)}>
          <Icon size={24} />
        </span>
        <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-violet-600 uppercase dark:text-violet-300">
          {e.category}
        </span>
      </div>

      <h3 className="font-display relative mt-5 text-2xl leading-tight font-bold">{e.name}</h3>
      <p className="relative mt-1 font-mono text-[11px] tracking-wide text-cyan-600 dark:text-cyan-400">{e.tagline}</p>
      <p className="relative mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{e.description}</p>

      <div className="relative mt-5 grid grid-cols-2 gap-x-3 gap-y-2.5 text-[12px] text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-2">
          <Clock size={13} className="shrink-0 text-violet-500" />
          {e.date} · {e.time}
        </span>
        <span className="flex items-center gap-2">
          <MapPin size={13} className="shrink-0 text-violet-500" />
          {e.venue}
        </span>
        <span className="flex items-center gap-2">
          <Users size={13} className="shrink-0 text-violet-500" />
          {e.team}
        </span>
        <span className="flex items-center gap-2">
          <IndianRupee size={13} className="shrink-0 text-violet-500" />
          Fee {e.fee}
        </span>
      </div>

      <div className="relative mt-5 flex items-center justify-between gap-3 border-t border-slate-200/70 pt-5 dark:border-white/10">
        <div>
          <p className="font-mono text-[9px] tracking-[0.2em] text-slate-500 uppercase">Prize Pool</p>
          <p className="font-display flex items-center gap-1.5 text-xl font-black text-amber-500">
            <Trophy size={16} /> {e.prize}
          </p>
        </div>
        <button
          onClick={() => onRegister(e.id)}
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 text-[12px] font-semibold text-white transition hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-500 dark:bg-white dark:text-slate-900 dark:hover:text-white"
        >
          Register <ArrowUpRight size={14} />
        </button>
      </div>
    </motion.article>
  );
}

export default function Events({ onRegister }: { onRegister: (id?: string) => void }) {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return EVENTS.filter(
      (e) =>
        (cat === "All" || e.category === cat) &&
        (!term ||
          e.name.toLowerCase().includes(term) ||
          e.description.toLowerCase().includes(term) ||
          e.venue.toLowerCase().includes(term)),
    );
  }, [cat, q]);

  return (
    <section id="events" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute top-40 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Event Arena"
          title={
            <>
              Pick your <span className="text-gradient">battlefield</span>
            </>
          }
          subtitle="Six flagship competitions across code, security, strategy and design. Filter, search and lock your slot before the seats vanish."
        />

        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[12.5px] font-semibold transition-colors",
                    cat === c
                      ? "text-white"
                      : "glass text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-cyan-300",
                  )}
                >
                  {cat === c && (
                    <motion.span
                      layoutId="catpill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>

            <div className="glass flex w-full items-center gap-2 rounded-full px-4 py-2.5 lg:w-72">
              <Search size={16} className="text-violet-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search events…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((e) => (
              <EventCard key={e.id} e={e} onRegister={onRegister} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-slate-500">No events matched your search. Try another keyword.</p>
        )}
      </div>
    </section>
  );
}
