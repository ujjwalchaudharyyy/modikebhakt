import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import { SPONSORS } from "../data";
import { Reveal, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="Sponsor Wall"
          title={
            <>
              Powered by <span className="text-gradient">believers</span>
            </>
          }
          subtitle="Companies and communities backing the next generation of builders at GEHU Haldwani."
        />

        <div className="space-y-12">
          {SPONSORS.map((group, gi) => (
            <Reveal key={group.tier} delay={gi * 0.1}>
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-mono text-[11px] tracking-[0.28em] whitespace-nowrap text-slate-500 uppercase dark:text-slate-400">
                    {group.tier}
                  </span>
                  <span className="h-px w-full bg-gradient-to-r from-violet-500/40 to-transparent" />
                </div>
                <div
                  className={cn(
                    "grid gap-5",
                    group.items.length === 2 ? "sm:grid-cols-2" : "grid-cols-2 lg:grid-cols-4",
                  )}
                >
                  {group.items.map((name) => (
                    <motion.div
                      key={name}
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                      className="glass group relative grid place-items-center overflow-hidden rounded-2xl px-4 py-10"
                    >
                      <span className="absolute inset-x-0 -bottom-20 h-32 bg-gradient-to-t from-violet-500/30 to-transparent blur-2xl transition-all duration-500 group-hover:bottom-0" />
                      <span
                        className={cn(
                          "font-display relative font-extrabold tracking-tight text-slate-500 transition-colors duration-300 group-hover:text-transparent dark:text-slate-400",
                          "group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:via-fuchsia-500 group-hover:to-cyan-400 group-hover:bg-clip-text",
                          group.size,
                        )}
                      >
                        {name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="glass mt-14 flex flex-col items-center justify-between gap-4 rounded-3xl p-8 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-400 text-white">
                <Handshake size={20} />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold">Want your logo on this wall?</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Sponsorship decks available for the 2026 edition.
                </p>
              </div>
            </div>
            <a
              href="mailto:nirvan@gehu.in"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-slate-900"
            >
              Become a Sponsor
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
