import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  KeyRound,
  Loader2,
  Lock,
  LogOut,
  Mail,
  Phone,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "../utils/cn";

type Mode = "new" | "student";
type Step = "form" | "otp" | "forgot" | "done";

const OTP_LEN = 6;
const emptyOtp = () => Array<string>(OTP_LEN).fill("");

const fieldBase =
  "w-full rounded-2xl border bg-white/[0.06] py-3.5 pl-12 text-sm font-medium text-white placeholder:text-slate-500 backdrop-blur transition-all duration-300 outline-none";

export default function LoginPage() {
  /* ------------------------------ 3D tilt state ------------------------------ */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [9, -9]), { stiffness: 140, damping: 16 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 140, damping: 16 });
  const gx = useTransform(mx, [0, 1], [0, 100]);
  const gy = useTransform(my, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(440px circle at ${gx}% ${gy}%, rgba(255,255,255,0.16), transparent 65%)`;

  /* -------------------------------- form state ------------------------------- */
  const [mode, setMode] = useState<Mode>("new");
  const [step, setStep] = useState<Step>("form");
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shakeKey, setShakeKey] = useState(0);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sid, setSid] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [otp, setOtp] = useState<string[]>(emptyOtp());
  const [resendIn, setResendIn] = useState(0);
  const [resetSent, setResetSent] = useState(false);
  const [who, setWho] = useState<{ kind: Mode; id: string }>({ kind: "new", id: "" });
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* ------------------------------- page effects ------------------------------ */
  useEffect(() => {
    const prev = document.title;
    document.title = "Log In · GRAPHIC ERA — NIRVAN '26";
    return () => {
      document.title = prev;
    };
  }, []);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [resendIn > 0]);

  useEffect(() => {
    if (step !== "otp" || busy || otp.some((d) => d === "")) return;
    const t = setTimeout(() => verifyOtp(), 300);
    return () => clearTimeout(t);
  }, [otp, step, busy]);

  /* --------------------------------- helpers --------------------------------- */
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    setStep("form");
    setErrors({});
    setOtp(emptyOtp());
    setResendIn(0);
    setResetSent(false);
    setBusy(false);
  };

  const fail = (err: Record<string, string>) => {
    setErrors(err);
    setShakeKey((s) => s + 1);
  };

  /* ------------------------------- new user flow ------------------------------ */
  const sendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) err.email = "Enter a valid email address";
    if (!/^[+]?\d{10,15}$/.test(phone.replace(/[\s-]/g, ""))) err.phone = "Enter a valid phone number";
    if (Object.keys(err).length) return fail(err);
    setBusy(true);
    setTimeout(() => {
      setOtp(emptyOtp());
      setResendIn(30);
      setStep("otp");
      setBusy(false);
    }, 1400);
  };

  const handleOtpChange = (i: number, raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, OTP_LEN - i);
    setOtp((prev) => {
      const next = [...prev];
      digits.split("").forEach((d, k) => {
        next[i + k] = d;
      });
      return next;
    });
    otpRefs.current[Math.min(i + digits.length, OTP_LEN - 1)]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LEN);
    if (!digits) return;
    e.preventDefault();
    setOtp([...digits.split(""), ...Array(OTP_LEN - digits.length).fill("")]);
    otpRefs.current[Math.min(digits.length, OTP_LEN - 1)]?.focus();
  };

  const verifyOtp = () => {
    if (busy || otp.some((d) => d === "")) return;
    setBusy(true);
    setTimeout(() => {
      setWho({ kind: "new", id: email.trim() });
      setStep("done");
      setBusy(false);
    }, 1300);
  };

  const resendOtp = () => {
    if (resendIn > 0) return;
    setOtp(emptyOtp());
    setResendIn(30);
    otpRefs.current[0]?.focus();
  };

  /* ------------------------------ student flow ------------------------------- */
  const submitStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!/^[A-Za-z0-9][A-Za-z0-9-]{5,}$/.test(sid.trim())) err.sid = "Enter a valid Student ID (min 6 characters)";
    if (pass.length < 6) err.pass = "Password must be at least 6 characters";
    if (Object.keys(err).length) return fail(err);
    setBusy(true);
    setTimeout(() => {
      setWho({ kind: "student", id: sid.trim() });
      setStep("done");
      setBusy(false);
    }, 1200);
  };

  const sendResetLink = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!/^[A-Za-z0-9][A-Za-z0-9-]{5,}$/.test(sid.trim())) err.sid = "Enter a valid Student ID";
    if (Object.keys(err).length) return fail(err);
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setResetSent(true);
    }, 1300);
  };

  const backToForm = () => {
    setStep("form");
    setErrors({});
    setResetSent(false);
    setOtp(emptyOtp());
    setResendIn(0);
  };

  const maskedPhone = phone.length > 2 ? `•••••• ${phone.trim().slice(-2)}` : "your phone";

  /* --------------------------------- render ---------------------------------- */
  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto overscroll-contain text-white">
      {/* Background image + overlays */}
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <img
          src="/images/login-bg.jpg"
          alt=""
          className="h-full w-full scale-105 object-cover blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/65 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.6)_100%)]" />
        <div className="grid-bg absolute inset-0 opacity-40" />
        {/* Aurora glows */}
        <div className="animate-float-slow absolute -top-24 -left-24 h-[26rem] w-[26rem] rounded-full bg-cyan-500/25 blur-[120px]" />
        <div className="animate-float-slower absolute top-1/4 -right-28 h-[30rem] w-[30rem] rounded-full bg-violet-600/25 blur-[130px]" />
        <div className="animate-float-slower absolute -bottom-20 left-1/4 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-[110px]" />
      </div>

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="#home"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-semibold text-slate-200 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/[0.12] hover:text-white"
        >
          <ArrowLeft size={14} /> Back to site
        </a>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 font-mono text-[10px] font-medium tracking-[0.22em] text-slate-300 uppercase backdrop-blur-xl">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> GEHU · NIRVAN '26
        </span>
      </div>

      <main className="relative z-10 flex min-h-full flex-col items-center justify-center px-4 py-16">
        {/* Hero header */}
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold tracking-[0.25em] text-cyan-200 uppercase backdrop-blur-xl">
            <Sparkles size={12} className="text-cyan-300" /> Graphic Era Hill University
          </span>
          <h1 className="font-poppins mt-5 bg-[linear-gradient(105deg,#ffffff_0%,#7dd3fc_38%,#a78bfa_58%,#f0abfc_78%,#ffffff_100%)] bg-[length:200%_auto] bg-clip-text text-[2.7rem] leading-none font-extrabold tracking-tight text-transparent drop-shadow-[0_0_30px_rgba(103,232,249,0.3)] animate-text-shine sm:text-6xl lg:text-7xl">
            GRAPHIC ERA
          </h1>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/70 sm:w-16" />
            <span className="text-cyan-300/80">✦</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-fuchsia-400/70 sm:w-16" />
          </div>
          <p className="mt-3 text-[11px] font-light tracking-[0.42em] text-slate-300/90 uppercase sm:text-sm">
            Transforming Dreams Into Reality
          </p>
        </motion.header>

        {/* 3D tilt glass card */}
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.25 }}
          className="group/tilt relative mt-12 w-full max-w-md"
          style={{ perspective: 1100 }}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          {/* halo behind the card */}
          <div className="absolute -inset-7 -z-10 rounded-[40px] bg-gradient-to-r from-cyan-500/30 via-violet-600/30 to-fuchsia-500/30 opacity-60 blur-2xl transition-opacity duration-700 group-hover/tilt:opacity-100" />

          <motion.div
            style={{ rotateX, rotateY }}
            className="relative rounded-[28px] border border-white/15 bg-white/[0.08] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85),0_0_50px_-12px_rgba(34,211,238,0.3),0_0_90px_-25px_rgba(139,92,246,0.4)] backdrop-blur-2xl transition-shadow duration-700 will-change-transform group-hover/tilt:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9),0_0_70px_-12px_rgba(34,211,238,0.5),0_0_110px_-25px_rgba(139,92,246,0.6)]"
          >
            {/* top edge highlight + noise */}
            <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
            <div className="noise pointer-events-none absolute inset-0 rounded-[inherit]" />

            <div className="relative p-7 sm:p-8" style={{ transformStyle: "preserve-3d" }}>
              {/* Tabs */}
              <div
                className="mb-7 grid grid-cols-2 gap-1.5 rounded-2xl border border-white/10 bg-black/25 p-1.5"
                style={{ transform: "translateZ(34px)" }}
              >
                {(["new", "student"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => switchMode(m)}
                    className={cn(
                      "relative rounded-xl px-2 py-2.5 text-[12px] font-semibold transition-colors duration-300 sm:text-[13px]",
                      mode === m ? "text-white" : "text-slate-300 hover:text-white",
                    )}
                  >
                    {mode === m && (
                      <motion.span
                        layoutId="loginTab"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 shadow-[0_8px_24px_-8px_rgba(34,211,238,0.7)]"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span className="relative flex items-center justify-center gap-1.5">
                      {m === "new" ? <Sparkles size={13} /> : <GraduationCap size={15} />}
                      {m === "new" ? "New User Login" : "GE Student Login"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Form area */}
              <div style={{ transform: "translateZ(22px)" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${mode}-${step}`}
                    initial={{ opacity: 0, x: 26 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -26 }}
                    transition={{ duration: 0.22 }}
                  >
                    <motion.div
                      key={shakeKey}
                      animate={shakeKey ? { x: [0, -9, 9, -6, 6, -3, 3, 0] } : undefined}
                      transition={{ duration: 0.45 }}
                    >
                      {mode === "new" && step === "form" && (
                        <form onSubmit={sendOtp} noValidate>
                          <h2 className="font-display text-xl font-extrabold tracking-tight">New User Login</h2>
                          <p className="mt-1 text-[13px] text-slate-400">
                            Verify with a one-time password and dive straight into NIRVAN '26.
                          </p>
                          <div className="mt-6 grid gap-4">
                            <Field
                              id="nl-email"
                              label="Email Address"
                              icon={<Mail size={17} />}
                              type="email"
                              placeholder="you@example.com"
                              autoComplete="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors((er) => ({ ...er, email: "" }));
                              }}
                              error={errors.email}
                            />
                            <Field
                              id="nl-phone"
                              label="Phone Number"
                              icon={<Phone size={17} />}
                              type="tel"
                              placeholder="+91 98765 43210"
                              autoComplete="tel"
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value);
                                setErrors((er) => ({ ...er, phone: "" }));
                              }}
                              error={errors.phone}
                            />
                            <button
                              type="submit"
                              disabled={busy}
                              className="group mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_-10px_rgba(34,211,238,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(124,58,237,0.8)] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-80"
                            >
                              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                              {busy ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
                              {busy ? "Sending OTP…" : "Send OTP / Log In"}
                            </button>
                            <p className="text-center text-[11px] leading-relaxed text-slate-500">
                              By continuing you agree to our Terms of Service &amp; Privacy Policy.
                            </p>
                          </div>
                        </form>
                      )}

                      {mode === "new" && step === "otp" && (
                        <div>
                          <h2 className="font-display text-xl font-extrabold tracking-tight">Enter OTP</h2>
                          <p className="mt-1 text-[13px] text-slate-400">
                            We sent a 6-digit code to <b className="text-slate-200">{maskedPhone}</b>
                            <span className="mx-1">·</span>
                            <b className="break-all text-slate-200">{email.trim() || "your email"}</b>
                          </p>
                          <div className="mt-6 flex justify-between gap-2 sm:gap-3">
                            {otp.map((d, i) => (
                              <input
                                key={i}
                                ref={(el) => {
                                  otpRefs.current[i] = el;
                                }}
                                value={d}
                                inputMode="numeric"
                                autoComplete={i === 0 ? "one-time-code" : "off"}
                                onChange={(e) => handleOtpChange(i, e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
                                }}
                                onPaste={i === 0 ? handleOtpPaste : undefined}
                                aria-label={`OTP digit ${i + 1}`}
                                className="h-13 w-11 rounded-xl border border-white/15 bg-white/[0.06] text-center text-lg font-bold text-white outline-none transition-all duration-200 focus:border-cyan-400/80 focus:bg-white/[0.1] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.16),0_0_22px_-6px_rgba(34,211,238,0.6)] sm:h-14 sm:w-12"
                              />
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={verifyOtp}
                            disabled={busy || otp.some((d) => d === "")}
                            className="group mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_-10px_rgba(34,211,238,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(124,58,237,0.8)] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                            {busy ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                            {busy ? "Verifying…" : "Verify & Log In"}
                          </button>
                          <div className="mt-4 flex items-center justify-between text-[12px]">
                            <button
                              type="button"
                              onClick={resendOtp}
                              disabled={resendIn > 0}
                              className={cn(
                                "inline-flex items-center gap-1.5 font-semibold transition-colors",
                                resendIn > 0 ? "text-slate-500" : "text-cyan-300 hover:text-cyan-200",
                              )}
                            >
                              <RotateCcw size={12} className={resendIn === 0 ? "animate-spin-slow" : ""} />
                              {resendIn > 0 ? `Resend OTP in 0:${String(resendIn).padStart(2, "0")}` : "Resend OTP"}
                            </button>
                            <button
                              type="button"
                              onClick={backToForm}
                              className="font-semibold text-slate-400 transition-colors hover:text-white"
                            >
                              Change details
                            </button>
                          </div>
                          <p className="mt-5 text-center font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
                            Demo mode · any 6-digit OTP works
                          </p>
                        </div>
                      )}

                      {mode === "student" && step === "form" && (
                        <form onSubmit={submitStudent} noValidate>
                          <h2 className="font-display text-xl font-extrabold tracking-tight">
                            Graphic Era Student Login
                          </h2>
                          <p className="mt-1 text-[13px] text-slate-400">
                            Use your university credentials to access the portal.
                          </p>
                          <div className="mt-6 grid gap-4">
                            <Field
                              id="st-sid"
                              label="Student ID"
                              icon={<BadgeCheck size={17} />}
                              type="text"
                              placeholder="e.g. GEHU2026-0142"
                              autoComplete="username"
                              value={sid}
                              onChange={(e) => {
                                setSid(e.target.value);
                                setErrors((er) => ({ ...er, sid: "" }));
                              }}
                              error={errors.sid}
                            />
                            <div>
                              <div className="mb-1.5 flex items-center justify-between">
                                <label
                                  htmlFor="st-pass"
                                  className="text-[11px] font-semibold tracking-[0.18em] text-slate-300/90 uppercase"
                                >
                                  Password
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setStep("forgot");
                                    setResetSent(false);
                                  }}
                                  className="text-[11px] font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                                >
                                  Forgot Password?
                                </button>
                              </div>
                              <div className="group relative">
                                <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-cyan-300 group-focus-within:drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]">
                                  <Lock size={17} />
                                </span>
                                <input
                                  id="st-pass"
                                  type={showPass ? "text" : "password"}
                                  placeholder="••••••••"
                                  autoComplete="current-password"
                                  value={pass}
                                  onChange={(e) => {
                                    setPass(e.target.value);
                                    setErrors((er) => ({ ...er, pass: "" }));
                                  }}
                                  className={cn(
                                    fieldBase,
                                    "pr-12",
                                    errors.pass
                                      ? "border-rose-500/70 focus:border-rose-400 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.18),0_0_24px_-8px_rgba(244,63,94,0.6)]"
                                      : "border-white/12 hover:border-white/25 focus:border-cyan-400/80 focus:bg-white/[0.09] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.16),0_0_28px_-8px_rgba(34,211,238,0.55)]",
                                  )}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPass((s) => !s)}
                                  aria-label={showPass ? "Hide password" : "Show password"}
                                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition-colors hover:text-white"
                                >
                                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                              </div>
                              <AnimatePresence>
                                {errors.pass && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-rose-400"
                                  >
                                    <span className="inline-block h-1 w-1 rounded-full bg-rose-400" /> {errors.pass}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>
                            <button
                              type="submit"
                              disabled={busy}
                              className="group mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_-10px_rgba(34,211,238,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(124,58,237,0.8)] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-80"
                            >
                              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                              {busy ? <Loader2 size={16} className="animate-spin" /> : <Lock size={15} />}
                              {busy ? "Signing in…" : "Log In"}
                            </button>
                            <p className="text-center text-[12px] text-slate-500">
                              New to GEHU?{" "}
                              <button
                                type="button"
                                onClick={() => switchMode("new")}
                                className="font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                              >
                                Create a new account
                              </button>
                            </p>
                          </div>
                        </form>
                      )}

                      {mode === "student" && step === "forgot" && (
                        <form onSubmit={sendResetLink} noValidate>
                          <h2 className="font-display text-xl font-extrabold tracking-tight">Forgot Password?</h2>
                          <p className="mt-1 text-[13px] text-slate-400">
                            Enter your Student ID and we'll email you a secure reset link.
                          </p>
                          <div className="mt-6 grid gap-4">
                            <Field
                              id="fp-sid"
                              label="Student ID"
                              icon={<BadgeCheck size={17} />}
                              type="text"
                              placeholder="e.g. GEHU2026-0142"
                              autoComplete="username"
                              value={sid}
                              onChange={(e) => {
                                setSid(e.target.value);
                                setErrors((er) => ({ ...er, sid: "" }));
                              }}
                              error={errors.sid}
                            />
                            {resetSent && (
                              <motion.p
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-[12px] leading-relaxed text-emerald-300"
                              >
                                <CheckCircle2 size={13} className="mr-1.5 inline -translate-y-px" />
                                Reset link sent to your registered GEHU email. Check your inbox (demo).
                              </motion.p>
                            )}
                            <button
                              type="submit"
                              disabled={busy}
                              className="group mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_-10px_rgba(34,211,238,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(124,58,237,0.8)] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-80"
                            >
                              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                              {busy ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
                              {busy ? "Sending…" : "Send Reset Link"}
                            </button>
                            <button
                              type="button"
                              onClick={backToForm}
                              className="text-center text-[12px] font-semibold text-slate-400 transition-colors hover:text-white"
                            >
                              ← Back to Log In
                            </button>
                          </div>
                        </form>
                      )}

                      {step === "done" && (
                        <div className="py-3 text-center">
                          <motion.div
                            initial={{ scale: 0, rotate: -40 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 210, damping: 13 }}
                            className="relative mx-auto h-20 w-20"
                          >
                            <span className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-600 opacity-40 blur-lg" />
                            <span className="relative grid h-full w-full place-items-center rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 shadow-[0_0_40px_-8px_rgba(34,211,238,0.9)]">
                              <CheckCircle2 size={38} />
                            </span>
                          </motion.div>
                          <h2 className="font-display mt-5 text-2xl font-extrabold tracking-tight">Login Successful</h2>
                          <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
                            {who.kind === "new" ? (
                              <>
                                Your OTP is verified, <b className="text-slate-200">{email.split("@")[0] || "friend"}</b>.
                                You're all set for NIRVAN '26.
                              </>
                            ) : (
                              <>
                                Welcome back, <b className="text-slate-200">{who.id}</b>. Your student dashboard is
                                ready.
                              </>
                            )}
                          </p>
                          <a
                            href="#home"
                            className="group mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_-10px_rgba(34,211,238,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(124,58,237,0.8)] active:translate-y-0 active:scale-[0.99]"
                          >
                            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                            Continue to NIRVAN '26 <ArrowRight size={15} />
                          </a>
                          <button
                            type="button"
                            onClick={backToForm}
                            className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-400 transition-colors hover:text-white"
                          >
                            <LogOut size={13} /> Log out
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* moving glare */}
            <motion.div
              aria-hidden="true"
              style={{ background: glare }}
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
            />
          </motion.div>
        </motion.div>

        {/* under-card helpers */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-[12px] text-slate-400"
        >
          Trouble signing in?{" "}
          <a href="mailto:support@gehu.ac.in" className="font-semibold text-cyan-300 transition-colors hover:text-cyan-200">
            support@gehu.ac.in
          </a>
        </motion.p>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-3 flex flex-col items-center gap-1.5 pb-4 text-center"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-slate-500">
            <ShieldCheck size={12} className="text-emerald-400" /> SSL Secured · 256-bit Encryption
          </span>
          <span className="text-[11px] text-slate-600">© 2026 Graphic Era Hill University · NIRVAN '26</span>
        </motion.footer>
      </main>
    </div>
  );
}

/* ------------------------------- field helper ------------------------------- */
function Field({
  id,
  label,
  icon,
  error,
  right,
  className,
  ...rest
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
  right?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-semibold tracking-[0.18em] text-slate-300/90 uppercase"
      >
        {label}
      </label>
      <div className="group relative">
        <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-cyan-300 group-focus-within:drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]">
          {icon}
        </span>
        <input
          id={id}
          {...rest}
          className={cn(
            fieldBase,
            right ? "pr-12" : "pr-4",
            error
              ? "border-rose-500/70 focus:border-rose-400 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.18),0_0_24px_-8px_rgba(244,63,94,0.6)]"
              : "border-white/12 hover:border-white/25 focus:border-cyan-400/80 focus:bg-white/[0.09] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.16),0_0_28px_-8px_rgba(34,211,238,0.55)]",
            className,
          )}
        />
        {right && <span className="absolute top-1/2 right-3 -translate-y-1/2">{right}</span>}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-rose-400"
          >
            <span className="inline-block h-1 w-1 rounded-full bg-rose-400" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
