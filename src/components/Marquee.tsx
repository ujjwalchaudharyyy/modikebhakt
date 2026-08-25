const WORDS = [
  "HACKATHON",
  "CTF",
  "E-SPORTS",
  "TREASURE HUNT",
  "WORKSHOPS",
  "HACKSPRINT",
  "DJ NIGHT",
  "₹51,000 PRIZE POOL",
];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-slate-200/70 bg-gradient-to-r from-violet-600/10 via-fuchsia-500/10 to-cyan-400/10 py-5 dark:border-white/10">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="font-display flex items-center gap-10 text-xl font-black tracking-tight sm:text-3xl">
            <span className="text-slate-800 dark:text-slate-200">{w}</span>
            <span className="text-gradient">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
