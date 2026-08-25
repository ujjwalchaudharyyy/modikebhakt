import { ArrowUp, Heart } from "lucide-react";

const SOCIALS = [
  {
    name: "GitHub",
    d: "M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z",
  },
  {
    name: "LinkedIn",
    d: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z",
  },
  {
    name: "Instagram",
    d: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
  },
  {
    name: "X",
    d: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.02 4.13H5.05l12.03 15.64Z",
  },
];

const LINKS = [
  { title: "Explore", items: ["About", "Events", "Schedule", "Speakers"] },
  { title: "Participate", items: ["Register", "Sponsors", "Gallery", "Contact"] },
];

export default function Footer({ onRegister }: { onRegister: () => void }) {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200/70 pt-16 dark:border-white/10">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#home" className="font-display text-3xl font-black tracking-tight">
              NIRVAN <span className="text-gradient">'26</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Where Ideas Become Innovation. The annual technical fest of Graphic Era Hill University, Haldwani Campus.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href="#home"
                  aria-label={s.name}
                  className="glass grid h-10 w-10 place-items-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:text-violet-600 dark:hover:text-cyan-300"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] tracking-[0.25em] text-slate-500 uppercase">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((l) => (
                  <li key={l}>
                    <a
                      href={l === "Register" ? "#home" : `#${l.toLowerCase()}`}
                      onClick={l === "Register" ? (e) => (e.preventDefault(), onRegister()) : undefined}
                      className="text-sm text-slate-600 transition hover:text-violet-600 dark:text-slate-400 dark:hover:text-cyan-300"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.25em] text-slate-500 uppercase">Stay Updated</h4>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Drop your email for schedule changes and surprise event drops.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="glass mt-4 flex items-center gap-2 rounded-full p-1.5 pl-4"
            >
              <input
                type="email"
                required
                placeholder="you@college.edu"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
              <button className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2 text-xs font-bold text-white">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200/70 py-7 text-center sm:flex-row sm:text-left dark:border-white/10">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © 2026 NIRVAN — Graphic Era Hill University, Haldwani. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            Crafted with <Heart size={12} className="fill-rose-500 text-rose-500" /> for Web-a-thon 4.0
          </p>
          <a
            href="#home"
            className="glass grid h-10 w-10 place-items-center rounded-full transition hover:-translate-y-1 hover:text-violet-600"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
