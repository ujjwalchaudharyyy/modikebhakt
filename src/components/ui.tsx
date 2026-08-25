import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
}: {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("mb-14 max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 font-mono text-[11px] font-semibold tracking-[0.25em] text-violet-600 uppercase dark:text-violet-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-5 text-4xl leading-[1.05] font-bold tracking-tight md:text-6xl">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-400">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

export function MagneticButton({
  children,
  onClick,
  variant = "primary",
  className,
  as = "button",
  href,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  as?: "button" | "a";
  href?: string;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-transform duration-300 active:scale-95";
  const styles =
    variant === "primary"
      ? "text-white shadow-[0_18px_45px_-15px_rgba(124,58,237,0.9)]"
      : "border border-slate-300 text-slate-900 hover:border-violet-500 dark:border-white/20 dark:text-white";

  const inner = (
    <>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 transition-transform duration-500 group-hover:scale-110" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (as === "a") {
    return (
      <a href={href} className={cn(base, styles, className)}>
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cn(base, styles, className)}>
      {inner}
    </button>
  );
}
