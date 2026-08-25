import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, PartyPopper, X } from "lucide-react";
import { EVENTS } from "../data";

interface Props {
  open: boolean;
  onClose: () => void;
  preselect?: string;
}

const empty = { name: "", email: "", phone: "", event: "", team: "", members: "1", college: "" };

export default function RegisterModal({ open, onClose, preselect }: Props) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, event: preselect ?? f.event }));
      setState("idle");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, preselect]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (k: keyof typeof empty, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (form.name.trim().length < 3) err.name = "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Enter a valid email";
    if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone)) err.phone = "Enter a valid phone number";
    if (!form.event) err.event = "Select an event";
    setErrors(err);
    if (Object.keys(err).length) return;
    setState("loading");
    setTimeout(() => setState("done"), 1200);
  };

  const field =
    "w-full rounded-xl border border-slate-300 bg-white/60 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/25 dark:border-white/15 dark:bg-white/5";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[95] grid place-items-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-8 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-white shadow-2xl dark:bg-[#0a0b14]"
          >
            <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 px-7 py-6 text-white">
              <div className="noise absolute inset-0" />
              <h3 className="font-display relative text-2xl font-black">Register for NIRVAN '26</h3>
              <p className="relative mt-1 text-sm text-white/85">
                Lock your slot in under a minute. Confirmation lands in your inbox.
              </p>
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-full bg-white/15 transition hover:bg-white/30"
              >
                <X size={17} />
              </button>
            </div>

            {state === "done" ? (
              <div className="px-7 py-14 text-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14 }}
                  className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/15 text-emerald-500"
                >
                  <CheckCircle2 size={44} />
                </motion.span>
                <h4 className="font-display mt-6 text-3xl font-black">You're in, {form.name.split(" ")[0]}!</h4>
                <p className="mx-auto mt-3 max-w-md text-sm text-slate-600 dark:text-slate-400">
                  Your registration for <b>{EVENTS.find((e) => e.id === form.event)?.name}</b> is confirmed. Check{" "}
                  <b>{form.email}</b> for your entry pass and event brief.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-7 py-3 text-sm font-semibold text-white"
                >
                  <PartyPopper size={16} /> See you at GEHU
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-4 px-7 py-7 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="mb-1.5 block text-xs font-semibold tracking-wide uppercase">Full Name *</label>
                  <input className={field} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Aarav Joshi" />
                  {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold tracking-wide uppercase">Email *</label>
                  <input className={field} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@gehu.in" />
                  {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold tracking-wide uppercase">Phone *</label>
                  <input className={field} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" />
                  {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold tracking-wide uppercase">College</label>
                  <input className={field} value={form.college} onChange={(e) => set("college", e.target.value)} placeholder="GEHU Haldwani" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold tracking-wide uppercase">Select Event *</label>
                  <select className={field} value={form.event} onChange={(e) => set("event", e.target.value)}>
                    <option value="">Choose an event…</option>
                    {EVENTS.map((e) => (
                      <option key={e.id} value={e.id} className="text-slate-900">
                        {e.name} — {e.fee} · {e.team}
                      </option>
                    ))}
                  </select>
                  {errors.event && <p className="mt-1 text-xs text-rose-500">{errors.event}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold tracking-wide uppercase">Team Name</label>
                  <input className={field} value={form.team} onChange={(e) => set("team", e.target.value)} placeholder="Null Pointers" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold tracking-wide uppercase">Team Size</label>
                  <select className={field} value={form.members} onChange={(e) => set("members", e.target.value)}>
                    {["1", "2", "3", "4", "5"].map((n) => (
                      <option key={n} value={n} className="text-slate-900">
                        {n} {n === "1" ? "member (solo)" : "members"}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:opacity-95 disabled:opacity-70 sm:col-span-2"
                >
                  {state === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Securing your slot…
                    </>
                  ) : (
                    "Confirm Registration"
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 sm:col-span-2">
                  By registering you agree to the NIRVAN '26 code of conduct.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
