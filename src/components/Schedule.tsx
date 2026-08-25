import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { SCHEDULE } from "../data";
import { Reveal, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

const TAG_COLORS: Record<string, string> = {
  Ceremony: "from-amber-400 to-orange-500",
  Hackathons: "from-violet-500 to-indigo-500",
  Fun: "from-pink-500 to-rose-500",
  Break: "from-slate-400 to-slate-500",
  Gaming: "from-fuchsia-500 to-purple-600",
  Cybersecurity: "from-emerald-400 to-teal-500",
  Workshops: "from-sky-400 to-blue-600",
  Talk: "from-cyan-400 to-teal-400",
};

export default function Schedule() {
  const [day, setDay] = useState(0);
  const active = SCHEDULE[day];

  return (
    <section id="schedule" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          kicker="Schedule"
          title={
            <>
              The <span className="text-gradient">48-hour</span> runbook
            </>
          }
          subtitle="Every minute mapped. Switch between days to plan your route through the fest."
        />

        <Reveal>
          <div className="glass mx-auto mb-12 flex w-fit gap-1 rounded-full p-1.5">
            {SCHEDULE.map((d, i) => (
              <button
                key={d.day}
                onClick={() => setDay(i)}
                className={cn(
                  "relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors sm:px-9",
                  day === i ? "text-white" : "text-slate-600 dark:text-slate-400",
                )}
              >
                {day === i && (
                  <motion.span
                    layoutId="daypill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                  />
                )}
                <span className="relative">
                  {d.day}
                  <span className="ml-2 hidden font-mono text-[10px] opacity-70 sm:inline">{d.date.slice(0, 6)}</span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.ol
            key={day}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4 }}
            className="relative ml-3 border-l border-dashed border-violet-500/40 pl-6 sm:ml-6 sm:pl-10"
          >
            {active.slots.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="group relative pb-8 last:pb-0"
              >
                <span className="absolute top-2 -left-[31px] grid h-4 w-4 place-items-center sm:-left-[47px]">
                  <span className="h-4 w-4 rounded-full bg-gradient-to-br from-violet-600 to-cyan-400 ring-4 ring-white transition-transform duration-300 group-hover:scale-125 dark:ring-[#05060f]" />
                </span>

                <div className="glass rounded-2xl p-5 transition-all duration-300 group-hover:translate-x-1.5 group-hover:border-violet-500/40">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-bold text-violet-600 dark:text-cyan-300">{s.time}</span>
                    <span
                      className={cn(
                        "rounded-full bg-gradient-to-r px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase",
                        TAG_COLORS[s.tag] ?? "from-violet-500 to-indigo-500",
                      )}
                    >
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="font-display mt-2 text-xl font-bold sm:text-2xl">{s.title}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin size={13} className="text-violet-500" /> {s.venue}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </section>
  );
}
