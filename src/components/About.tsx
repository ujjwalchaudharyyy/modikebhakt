import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Layers, Trophy, Users2, Rocket, Code2 } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const STATS = [
  { icon: Users2, label: "Expected Attendees", to: 2500, suffix: "+" },
  { icon: Trophy, label: "Total Prize Pool", to: 51000, prefix: "₹" },
  { icon: Layers, label: "Flagship Events", to: 6 },
  { icon: Cpu, label: "Hours of Building", to: 48 },
];

const PILLARS = [
  {
    icon: Code2,
    title: "Build",
    text: "Hackathons and sprints where raw ideas turn into deployed products within hours, judged by working engineers.",
  },
  {
    icon: Rocket,
    title: "Learn",
    text: "Expert-led workshops and tech talks that hand you the playbooks used inside real product teams.",
  },
  {
    icon: Users2,
    title: "Connect",
    text: "A campus-wide community of developers, designers and founders — plus recruiters scouting for talent.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute top-1/4 -left-32 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="About the Fest"
          title={
            <>
              Two days of <span className="text-gradient">pure signal</span>, zero noise.
            </>
          }
          subtitle="NIRVAN '26 is Graphic Era Hill University Haldwani's annual technical extravaganza — a 48-hour convergence of developers, innovators and designers competing, building and collaborating across hackathons, cybersecurity arenas, gaming leagues and hands-on workshops."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="glass group relative h-full overflow-hidden rounded-3xl p-7"
              >
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/25 to-cyan-400/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0" />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
                  <p.icon size={20} />
                </span>
                <h3 className="font-display relative mt-5 text-2xl font-bold">{p.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.text}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="glass clip-corner relative overflow-hidden p-6 text-center">
                <s.icon className="mx-auto mb-3 text-violet-500" size={22} />
                <div className="font-display text-3xl font-black md:text-4xl">
                  <Counter to={s.to} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <p className="mt-2 font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
