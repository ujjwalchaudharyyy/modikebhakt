import { motion } from "framer-motion";
import { AtSign, Link2, Mic2 } from "lucide-react";
import { SPEAKERS } from "../data";
import { Reveal, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

export default function Speakers() {
  return (
    <section id="speakers" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Speakers & Guests"
          title={
            <>
              Minds worth <span className="text-gradient">listening to</span>
            </>
          }
          subtitle="Engineers, researchers and founders shipping at scale — on campus, on stage, and in the hallway track."
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {SPEAKERS.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.09}>
              <motion.article
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                className="glass group relative h-full overflow-hidden rounded-3xl p-6 text-center"
              >
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-28 bg-gradient-to-br opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-50",
                    s.accent,
                  )}
                />
                <div className="relative mx-auto mb-5 h-24 w-24">
                  <div className={cn("absolute inset-0 rounded-full bg-gradient-to-br p-[2px]", s.accent)}>
                    <div className="grid h-full w-full place-items-center rounded-full bg-white dark:bg-[#0a0b14]">
                      <span className={cn("font-display bg-gradient-to-br bg-clip-text text-3xl font-black text-transparent", s.accent)}>
                        {s.initials}
                      </span>
                    </div>
                  </div>
                  <span className="absolute -right-1 -bottom-1 grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-white ring-4 ring-white dark:bg-white dark:text-slate-900 dark:ring-[#05060f]">
                    <Mic2 size={14} />
                  </span>
                </div>

                <h3 className="font-display relative text-xl font-bold">{s.name}</h3>
                <p className="relative mt-1 text-[13px] font-semibold text-violet-600 dark:text-cyan-300">{s.role}</p>
                <p className="relative font-mono text-[11px] tracking-wide text-slate-500 uppercase">{s.org}</p>
                <p className="relative mt-4 text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">{s.bio}</p>

                <div className="relative mt-5 flex items-center justify-between border-t border-slate-200/70 pt-4 dark:border-white/10">
                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-[10px] font-semibold text-violet-600 dark:text-violet-300">
                    {s.topic}
                  </span>
                  <div className="flex gap-2 text-slate-400">
                    <a href="#speakers" aria-label="Profile" className="transition hover:text-violet-500">
                      <Link2 size={15} />
                    </a>
                    <a href="#speakers" aria-label="Handle" className="transition hover:text-violet-500">
                      <AtSign size={15} />
                    </a>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
