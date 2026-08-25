import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY } from "../data";
import { Reveal, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

export default function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (idx === null) return;
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => ((i ?? 0) + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setIdx((i) => ((i ?? 0) - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx]);

  const item = idx !== null ? GALLERY[idx] : null;

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Gallery"
          title={
            <>
              Frames from <span className="text-gradient">NIRVAN '25</span>
            </>
          }
          subtitle="A glimpse of the chaos, the caffeine and the confetti from last year's edition."
        />

        <div className="grid auto-rows-[190px] grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.05} className={cn("h-full", g.span)}>
              <button
                onClick={() => setIdx(i)}
                className={cn(
                  "group relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br text-left",
                  g.accent,
                )}
              >
                <span className="noise absolute inset-0" />
                <span
                  className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.35) 1px,transparent 1px)",
                    backgroundSize: "34px 34px",
                  }}
                />
                <span className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/5" />
                <span className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                  <Camera size={18} className="mb-auto opacity-80 transition-transform duration-500 group-hover:scale-125" />
                  <span className="font-display translate-y-2 text-base font-bold transition-transform duration-500 group-hover:translate-y-0 sm:text-lg">
                    {g.title}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-90">
                    {g.tag}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {item && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIdx(null)}
            className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/85 p-5 backdrop-blur-xl"
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white" aria-label="Close">
              <X size={26} />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                setIdx((i) => ((i ?? 0) - 1 + GALLERY.length) % GALLERY.length);
              }}
              className="absolute left-4 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white/80 hover:bg-white/10 sm:left-10"
            >
              <ChevronLeft />
            </button>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                setIdx((i) => ((i ?? 0) + 1) % GALLERY.length);
              }}
              className="absolute right-4 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white/80 hover:bg-white/10 sm:right-10"
            >
              <ChevronRight />
            </button>

            <motion.figure
              key={item.title}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br",
                item.accent,
              )}
            >
              <span className="noise absolute inset-0" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <h3 className="font-display text-2xl font-bold sm:text-3xl">{item.title}</h3>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-80">{item.tag}</p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
