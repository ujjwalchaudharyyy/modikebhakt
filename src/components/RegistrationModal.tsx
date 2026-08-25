import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  Check, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { FEST_EVENTS } from '../data/festData';
import { FestEvent, TicketPassData } from '../types/fest';
import { soundManager } from '../utils/audio';
import { useToast } from '../context/ToastContext';

interface RegistrationModalProps {
  isOpen: boolean;
  preSelectedEvent: FestEvent | null;
  onClose: () => void;
  onSuccess: (pass: TicketPassData) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  preSelectedEvent,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState<number>(1);
  const { showToast } = useToast();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('Graphic Era Hill University, Haldwani');
  const [branchYear, setBranchYear] = useState('B.Tech CSE - 3rd Year');
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  const [participationType, setParticipationType] = useState<'solo' | 'team'>('team');
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<{ name: string; email: string; phone: string }[]>([
    { name: '', email: '', phone: '' }
  ]);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [accommodationRequired, setAccommodationRequired] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preSelectedEvent) {
      setSelectedEventIds((prev) => 
        prev.includes(preSelectedEvent.id) ? prev : [...prev, preSelectedEvent.id]
      );
      if (preSelectedEvent.minTeamSize > 1) {
        setParticipationType('team');
      }
    }
  }, [preSelectedEvent]);

  if (!isOpen) return null;

  const toggleEventSelection = (id: string) => {
    soundManager.playClick();
    setSelectedEventIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const addTeamMember = () => {
    if (teamMembers.length < 4) {
      soundManager.playClick();
      setTeamMembers([...teamMembers, { name: '', email: '', phone: '' }]);
    }
  };

  const removeTeamMember = (index: number) => {
    soundManager.playClick();
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index: number, field: 'name' | 'email' | 'phone', value: string) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const handleApplyCoupon = () => {
    soundManager.playClick();
    const code = couponCode.trim().toUpperCase();
    if (code === 'GEHU2026' || code === 'EARLYBIRD' || code === 'WEBATHON') {
      setDiscountApplied(50);
      soundManager.playSuccess();
      showToast('Promo Code Applied!', '₹50 discount deducted from your fest entry fee.', 'success');
    } else {
      showToast('Invalid Code', 'Try using code GEHU2026 for a student discount.', 'error');
    }
  };

  // Fee calculation
  const subtotalFee = selectedEventIds.reduce((sum, id) => {
    const event = FEST_EVENTS.find((e) => e.id === id);
    return sum + (event ? event.registrationFee : 0);
  }, 0);

  const finalFee = Math.max(0, subtotalFee - discountApplied);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || selectedEventIds.length === 0) {
      showToast('Required Fields Missing', 'Please fill in personal details and select at least one event.', 'error');
      return;
    }

    setIsSubmitting(true);
    soundManager.playSuccess();

    // Trigger celebratory confetti burst!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    const enrolledNames = selectedEventIds.map(
      (id) => FEST_EVENTS.find((e) => e.id === id)?.name || id
    );

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const passData: TicketPassData = {
      ticketId: `NIRVAN-${randomNum}`,
      registrationNumber: `GEHU-NV26-${randomNum}`,
      attendeeName: fullName,
      collegeName: college || 'Graphic Era Hill University',
      eventNames: enrolledNames,
      teamName: participationType === 'team' ? (teamName || 'Team CyberNovas') : undefined,
      qrCodeSeed: `https://nirvan26.gehu.in/verify/${randomNum}`,
      issueDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      tier: selectedEventIds.includes('hackathon') ? 'Hacker Pass' : 'VIP Innovator'
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      onSuccess(passData);
      showToast('Registration Successful!', 'Welcome aboard NIRVAN 26. Your digital pass is generated.', 'success');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-950 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/70 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-base sm:text-lg text-white">
                NIRVAN '26 Registration
              </h3>
              <p className="text-[11px] font-mono-code text-cyan-400">
                Graphic Era Hill University, Haldwani
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-3 bg-slate-900/60 border-b border-slate-800 text-xs font-mono-code">
          <div className={`p-3 text-center border-b-2 transition-colors ${
            step >= 1 ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/20' : 'border-transparent text-slate-500'
          }`}>
            1. Your Details
          </div>
          <div className={`p-3 text-center border-b-2 transition-colors ${
            step >= 2 ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/20' : 'border-transparent text-slate-500'
          }`}>
            2. Select Events
          </div>
          <div className={`p-3 text-center border-b-2 transition-colors ${
            step >= 3 ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/20' : 'border-transparent text-slate-500'
          }`}>
            3. Team & Fee
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* STEP 1: Personal & College */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1.5 flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Rawat"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1.5 flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aarav.rawat@gehu.ac.in"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1.5 flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1.5 flex items-center space-x-1">
                    <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>College / University *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. GEHU Haldwani, IIT Roorkee..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1.5">
                  Degree / Department & Current Year
                </label>
                <input
                  type="text"
                  value={branchYear}
                  onChange={(e) => setBranchYear(e.target.value)}
                  placeholder="e.g. B.Tech Computer Science & Engineering - 3rd Year"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Valid student ID will be verified upon arrival at campus registration desk.</span>
              </div>
            </div>
          )}

          {/* STEP 2: Event Selection */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono-code text-cyan-400 uppercase">
                  Select Events ({selectedEventIds.length} selected)
                </p>
                <span className="text-xs font-mono-code text-slate-400">
                  You can pick more than one
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEST_EVENTS.map((event) => {
                  const isSelected = selectedEventIds.includes(event.id);
                  return (
                    <div
                      key={event.id}
                      onClick={() => toggleEventSelection(event.id)}
                      className={`p-3.5 rounded-2xl cursor-pointer border transition-all flex items-start justify-between ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-950/50'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1 pr-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-orbitron font-bold text-xs text-white">
                            {event.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {event.tagline}
                        </p>
                        <div className="flex items-center space-x-2 text-[10px] font-mono-code pt-1">
                          <span className="text-amber-400 font-bold">{event.prizePool} Prize</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-purple-300">{event.teamSize}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold block mb-2 ${
                          event.registrationFee === 0 ? 'text-emerald-400 bg-emerald-950/50' : 'text-cyan-300 bg-slate-800'
                        }`}>
                          {event.registrationFee === 0 ? 'FREE' : `₹${event.registrationFee}`}
                        </span>

                        <div className={`w-5 h-5 rounded-md flex items-center justify-center ml-auto ${
                          isSelected ? 'bg-cyan-400 text-slate-950' : 'border border-slate-700'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedEventIds.length === 0 && (
                <p className="text-xs text-rose-400 font-mono-code text-center pt-2">
                  ⚠️ Please select at least 1 event to proceed.
                </p>
              )}
            </div>
          )}

          {/* STEP 3: Team Details & Checkout */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* Participation Mode */}
              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-2">
                  Participation Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setParticipationType('solo');
                    }}
                    className={`py-2.5 px-4 rounded-xl text-xs font-orbitron font-bold transition-all border ${
                      participationType === 'solo'
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                        : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    Solo
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setParticipationType('team');
                    }}
                    className={`py-2.5 px-4 rounded-xl text-xs font-orbitron font-bold transition-all border ${
                      participationType === 'team'
                        ? 'bg-purple-500 text-white border-purple-400'
                        : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    Team Entry (2–5 Members)
                  </button>
                </div>
              </div>

              {/* Team Name and Member fields */}
              {participationType === 'team' && (
                <div className="space-y-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. CyberNovas, ByteBlitzers"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-code text-purple-300">
                        Additional Teammates ({teamMembers.length})
                      </span>
                      {teamMembers.length < 3 && (
                        <button
                          type="button"
                          onClick={addTeamMember}
                          className="text-[11px] font-mono-code text-cyan-400 hover:underline"
                        >
                          + Add Member
                        </button>
                      )}
                    </div>

                    {teamMembers.map((member, idx) => (
                      <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                        <input
                          type="text"
                          placeholder={`Member #${idx + 2} Name`}
                          value={member.name}
                          onChange={(e) => updateTeamMember(idx, 'name', e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                        <input
                          type="email"
                          placeholder="Member Email"
                          value={member.email}
                          onChange={(e) => updateTeamMember(idx, 'email', e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                        <div className="flex items-center space-x-1">
                          <input
                            type="tel"
                            placeholder="Phone"
                            value={member.phone}
                            onChange={(e) => updateTeamMember(idx, 'phone', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                          />
                          {teamMembers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTeamMember(idx)}
                              className="text-rose-400 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Accommodation Checkbox */}
              <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={accommodationRequired}
                  onChange={(e) => setAccommodationRequired(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Hostel Accommodation required for outstation team (GEHU Haldwani Campus)</span>
              </label>

              {/* Coupon Code Input */}
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo Code (Try: GEHU2026)"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs uppercase font-mono-code focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-xs font-mono-code"
                >
                  Apply
                </button>
              </div>

              {/* Live Fee Summary */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
                <div className="flex justify-between text-xs text-slate-400 font-mono-code">
                  <span>Selected Events:</span>
                  <span className="text-white font-bold">{selectedEventIds.length} Events</span>
                </div>

                <div className="flex justify-between text-xs text-slate-400 font-mono-code">
                  <span>Total Fee:</span>
                  <span>₹{subtotalFee}</span>
                </div>

                {discountApplied > 0 && (
                  <div className="flex justify-between text-xs text-emerald-400 font-mono-code font-bold">
                    <span>Discount Voucher (GEHU2026):</span>
                    <span>-₹{discountApplied}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span className="font-orbitron font-bold text-sm text-white">Amount to Pay:</span>
                  <span className="font-orbitron font-black text-xl text-cyan-400">
                    {finalFee === 0 ? 'FREE ENTRY' : `₹${finalFee}`}
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* Modal Navigation Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setStep(step - 1);
                }}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-mono-code flex items-center space-x-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  if (step === 1 && (!fullName || !email || !phone)) {
                    showToast('Missing Details', 'Please complete your name, email and phone.', 'error');
                    return;
                  }
                  if (step === 2 && selectedEventIds.length === 0) {
                    showToast('Select an Event', 'Please choose at least 1 event.', 'error');
                    return;
                  }
                  setStep(step + 1);
                }}
                className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase flex items-center space-x-1.5 shadow-md"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 font-orbitron font-black text-xs uppercase tracking-wider flex items-center space-x-2 shadow-xl shadow-cyan-500/30 text-white hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Submit Registration</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};
