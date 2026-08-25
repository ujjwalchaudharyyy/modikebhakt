import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, MapPin, Phone, Send } from "lucide-react";
import { FAQS } from "../data";
import { Reveal, SectionHeading } from "./ui";

const CONTACTS = [
  { icon: Mail, label: "Email us", value: "nirvan@gehu.in", href: "mailto:nirvan@gehu.in" },
  { icon: Phone, label: "Call us", value: "+91 1256489632", href: "tel:+911256489632" },
  { icon: MapPin, label: "Find us", value: "GEHU Campus, Haldwani", href: "#contact" },
];

export default function Contact({ onRegister }: { onRegister: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-cyan-400/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Contact & FAQ"
          title={
            <>
              Still have <span className="text-gradient">questions?</span>
            </>
          }
          subtitle="The organizing team replies within 24 hours. Or just walk into the Innovation Lab — we live there."
        />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="glass overflow-hidden rounded-2xl">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-[15px] font-semibold">{f.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-violet-500 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="space-y-4">
            {CONTACTS.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <a
                  href={c.href}
                  className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 text-white transition-transform duration-300 group-hover:scale-110">
                    <c.icon size={19} />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase">
                      {c.label}
                    </span>
                    <span className="block text-[15px] font-semibold">{c.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 p-8 text-white">
                <div className="noise absolute inset-0" />
                <h3 className="font-display relative text-2xl leading-tight font-black">
                  Seats are filling fast.
                  <br /> Don't watch from the sidelines.
                </h3>
                <p className="relative mt-3 text-sm text-white/85">
                  Over 2,500 participants expected across two days of building, breaking and winning.
                </p>
                <button
                  onClick={onRegister}
                  className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-violet-700 transition hover:scale-105"
                >
                  <Send size={15} /> Register Now
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
