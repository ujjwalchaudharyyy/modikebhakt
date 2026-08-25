import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X, Sparkles, LogIn } from "lucide-react";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Schedule", href: "#schedule" },
  { label: "Speakers", href: "#speakers" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({
  dark,
  toggleTheme,
  onRegister,
}: {
  dark: boolean;
  toggleTheme: () => void;
  onRegister: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      let current = "";
      for (const l of LINKS) {
        const el = document.querySelector(l.href) as HTMLElement | null;
        if (el && el.getBoundingClientRect().top <= 140) current = l.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 z-[70] h-[3px] w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-all duration-500",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6",
            scrolled
              ? "glass w-[94%] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]"
              : "w-[96%] border border-transparent",
          )}
        >
          <a href="#home" className="flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 font-black text-white">
              N
              <span className="absolute inset-0 animate-pulse-ring rounded-xl border border-violet-400/60" />
            </span>
            <span className="font-display text-lg leading-none font-extrabold tracking-tight">
              NIRVAN <span className="text-gradient">'26</span>
              <span className="mt-1 block font-mono text-[9px] font-medium tracking-[0.22em] text-slate-500 uppercase dark:text-slate-400">
                GEHU Haldwani
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                    active === l.href
                      ? "text-violet-600 dark:text-cyan-300"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
                  )}
                >
                  {active === l.href && (
                    <motion.span
                      layoutId="navpill"
                      className="absolute inset-0 rounded-full bg-violet-500/10 ring-1 ring-violet-500/25"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-700 transition hover:border-violet-500 hover:text-violet-600 dark:border-white/15 dark:text-slate-300 dark:hover:text-cyan-300"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={dark ? "moon" : "sun"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {dark ? <Moon size={17} /> : <Sun size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <a
              href="#/login"
              className="hidden items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-[13px] font-semibold text-slate-700 transition hover:border-violet-500 hover:text-violet-600 md:inline-flex dark:border-white/15 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            >
              <LogIn size={14} /> Log In
            </a>

            <button
              onClick={onRegister}
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/50 sm:inline-flex"
            >
              <Sparkles size={14} /> Register
            </button>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 lg:hidden dark:border-white/15"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-slate-950/70 backdrop-blur-md lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 right-0 flex h-full w-[78%] max-w-xs flex-col gap-2 bg-white p-6 dark:bg-[#0a0b14]"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-xl font-extrabold">
                  NIRVAN <span className="text-gradient">'26</span>
                </span>
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="border-b border-slate-200/70 py-3 text-lg font-semibold dark:border-white/10"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#/login"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold dark:border-white/20"
              >
                <LogIn size={16} /> Log In
              </a>
              <button
                onClick={() => {
                  setOpen(false);
                  onRegister();
                }}
                className="mt-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 font-semibold text-white"
              >
                Register Now
              </button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
