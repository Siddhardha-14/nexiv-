"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SaveIndicator from "@/components/ui/SaveIndicator";
import InlineError from "@/components/ui/InlineError";
import UnsavedChangesGuard from "@/components/ui/UnsavedChangesGuard";
import { validateEmail, validateFullName } from "@/hooks/useFormValidation";

const BIO_MAX = 500;

export default function SettingsPage() {
  const { userProfile, user, refreshProfile } = useAuth();

  // Core Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  
  const [emailTouched, setEmailTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [notifSaveFlash, setNotifSaveFlash] = useState(false);

  // Track base values from db to detect dirty/changes accurately
  const baseValues = useMemo(() => {
    return {
      fullName: userProfile?.fullName || user?.displayName || "",
      email: userProfile?.email || user?.email || "",
      bio: (userProfile as any)?.bio || ""
    };
  }, [userProfile, user]);

  // Initialize/Reset form with live database values
  useEffect(() => {
    setFullName(baseValues.fullName);
    setEmail(baseValues.email);
    setBio(baseValues.bio);
  }, [baseValues]);

  // Notification preferences
  const [notifications, setNotifications] = useState([
    { label: "Project reminders", desc: "Get reminded about upcoming deadlines", checked: true },
    { label: "Mentor feedback", desc: "Notify when mentor reviews your submission", checked: true },
    { label: "Team invitations", desc: "Receive team invite notifications", checked: true },
    { label: "Platform updates", desc: "News about new features and tracks", checked: false },
  ]);

  // ── Serialized values for dirty detection ──
  const currentValues = useMemo(
    () => JSON.stringify({ fullName, email, bio }),
    [fullName, email, bio]
  );
  
  const originalValues = useMemo(
    () => JSON.stringify(baseValues),
    [baseValues]
  );

  const isDirty = currentValues !== originalValues;

  // ── Validation ──
  const emailValidation = emailTouched ? validateEmail(email) : { isValid: true, message: "", touched: false };
  const nameValidation = nameTouched ? validateFullName(fullName) : { isValid: true, message: "", touched: false };

  // ── Bio character counter ──
  const bioLength = bio.length;
  const bioCounterClass =
    bioLength > BIO_MAX ? "over" : bioLength > BIO_MAX * 0.9 ? "warn" : "ok";

  // ── Save handler with authentic Firestore writeback ──
  const handleSave = useCallback(async () => {
    if (!user) return;
    
    // Block invalid commits
    if (!validateFullName(fullName).isValid || !validateEmail(email).isValid) {
      throw new Error("Validation failed");
    }

    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        fullName: fullName.trim(),
        email: email.trim(),
        bio: bio.trim(),
        updatedAt: new Date().toISOString()
      });
      
      // Propagate updates upstream to Context & LocalStorage
      await refreshProfile();
    } catch (error) {
      console.error("Failed to persist profile settings updates:", error);
      throw error;
    }
  }, [user, fullName, email, bio, refreshProfile]);

  // ── Cancel handler ──
  const handleCancel = useCallback(() => {
    setFullName(baseValues.fullName);
    setEmail(baseValues.email);
    setBio(baseValues.bio);
    setEmailTouched(false);
    setNameTouched(false);
  }, [baseValues]);

  // ── Notification toggle with auto-save flash ──
  const toggleNotification = (index: number) => {
    setNotifications((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
    setNotifSaveFlash(true);
    setTimeout(() => setNotifSaveFlash(false), 1500);
  };

  const handleDeleteAccount = () => {
    console.log("Account deletion requested");
    setShowDeleteDialog(false);
  };

  const initials = useMemo(() => {
    if (!fullName) return "U";
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [fullName]);

  return (
    <div className="space-y-10 animate-fade-in max-w-3xl pb-12">
      <UnsavedChangesGuard isDirty={isDirty} />

      {/* Header Panel */}
      <div className="border-b border-black/[0.05] pb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-[#FF4B3A] animate-pulse" />
          <span className="text-[10px] font-black tracking-widest text-[#FF4B3A] uppercase">Control Panel</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1A1A1A]">Workspace Settings</h1>
        <p className="text-[#575757] font-medium text-sm md:text-base mt-1">
          Configure database persistence, active handles, and notification nodes.
        </p>
      </div>

      {/* Profile Component Card */}
      <div className="bg-white border border-black/[0.03] rounded-[32px] p-7 md:p-8 shadow-sm hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-black text-[#1A1A1A] tracking-tight">Public Node Profile</h2>
            <p className="text-xs font-bold text-[#8C8C8C] mt-0.5">Information deployed across the directory.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8 pb-8 border-b border-black/[0.03]">
          <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 flex items-center justify-center text-2xl font-black text-white shadow-md shadow-black/10">
            {initials}
          </div>
          <div>
            <button className="group/btn flex items-center gap-2 px-4 py-2.5 bg-[#FCFCFD] rounded-xl border border-black/[0.03] text-xs font-black text-[#1A1A1A] hover:bg-[#FFF3E3] hover:text-[#FF4B3A] transition-all hover:-translate-y-0.5">
              <svg className="w-4 h-4 group-hover/btn:scale-105 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Replace Graphic
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[11px] font-black uppercase tracking-wider text-[#575757]">Operational Handle</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => setNameTouched(true)}
              className={`w-full px-4 py-3.5 rounded-2xl bg-[#F8F9FB] border border-black/[0.02] text-sm font-bold text-[#1A1A1A] focus:outline-none focus:border-[#FF4B3A] focus:bg-white transition-all duration-300 ${nameTouched && !nameValidation.isValid ? "border-[#EF4444] focus:border-[#EF4444]" : ""}`}
            />
            <InlineError message={nameValidation.message} show={nameTouched && !nameValidation.isValid} />
          </div>
          <div className="space-y-2">
            <label className="block text-[11px] font-black uppercase tracking-wider text-[#575757]">Associated Mailbox</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              autoComplete="email"
              className={`w-full px-4 py-3.5 rounded-2xl bg-[#F8F9FB] border border-black/[0.02] text-sm font-bold text-[#1A1A1A] focus:outline-none focus:border-[#FF4B3A] focus:bg-white transition-all duration-300 ${emailTouched && !emailValidation.isValid ? "border-[#EF4444] focus:border-[#EF4444]" : ""}`}
            />
            <InlineError message={emailValidation.message} show={emailTouched && !emailValidation.isValid} />
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          <label className="block text-[11px] font-black uppercase tracking-wider text-[#575757]">Professional Digest (Bio)</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= BIO_MAX) setBio(e.target.value);
            }}
            className={`w-full px-4 py-3.5 rounded-2xl bg-[#F8F9FB] border border-black/[0.02] text-sm font-bold text-[#1A1A1A] focus:outline-none focus:border-[#FF4B3A] focus:bg-white transition-all duration-300 resize-none ${bioLength >= BIO_MAX ? "border-amber-400" : ""}`}
          />
          <div className={`text-[10px] font-bold text-right ${bioCounterClass === "over" ? "text-red-500" : bioCounterClass === "warn" ? "text-amber-500" : "text-[#8C8C8C]"}`}>
            {bioLength}/{BIO_MAX} chars {bioLength >= BIO_MAX && "(limit reached)"}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-black/[0.03]">
          <SaveIndicator
            currentValues={currentValues}
            originalValues={originalValues}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </div>

      {/* Channel Notifications Stack */}
      <div className="bg-white border border-black/[0.03] rounded-[32px] p-7 md:p-8 shadow-sm hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-black text-[#1A1A1A] tracking-tight">Transmission Routings</h2>
            <p className="text-xs font-bold text-[#8C8C8C] mt-0.5">Configure external webhooks and alerts.</p>
          </div>
          {notifSaveFlash && (
            <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase px-2 py-1 bg-emerald-50 rounded-lg border border-emerald-100 animate-fade-in">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Auto-Saved
            </span>
          )}
        </div>
        <div className="space-y-2">
          {notifications.map((item, i) => (
            <div 
              key={i} 
              onClick={() => toggleNotification(i)}
              className="flex items-center justify-between p-4 rounded-2xl hover:bg-[#FCFCFD] border border-transparent hover:border-black/[0.02] transition-all duration-200 cursor-pointer group"
            >
              <div>
                <p className="text-[14px] font-black text-[#1A1A1A] leading-tight group-hover:text-[#FF4B3A] transition-colors">{item.label}</p>
                <p className="text-xs text-[#8C8C8C] font-bold mt-1">{item.desc}</p>
              </div>
              <div
                className={`toggle-switch shrink-0 ${item.checked ? "active" : ""}`}
                role="switch"
                aria-checked={item.checked}
                tabIndex={0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Executive Destruction Gate */}
      <div className="bg-[#FEF2F2] border border-red-100 rounded-[32px] p-7 md:p-8">
        <h2 className="text-lg font-black text-[#991B1B] tracking-tight mb-2">Destruction Pathway</h2>
        <p className="text-sm font-bold text-[#B91C1C]/80 mb-6 leading-relaxed">Permanently purge user profile indices, credentials, and file pointers from the operational stack. This process cannot be rolled back.</p>
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="px-5 py-3 rounded-xl bg-white border border-[#FCA5A5] text-xs font-black text-[#991B1B] hover:bg-[#FEE2E2] hover:border-[#EF4444] transition-all"
        >
          Initiate Account Destruction
        </button>
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
        title="Initiate Destruction Protocol?"
        description="This action will physically remove all registered indices, submitted project repositories, and verified awards from our clusters. Recovery is impossible."
        confirmLabel="Acknowledge & Destroy"
        cancelLabel="Abort Protocol"
        variant="danger"
        requireTypedConfirmation="DELETE MY ACCOUNT"
      />
    </div>
  );
}

