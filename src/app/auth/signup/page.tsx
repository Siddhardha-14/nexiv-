"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import InlineError, { InlineSuccess, InlineWarning } from "@/components/ui/InlineError";
import PasswordStrength from "@/components/ui/PasswordStrength";
import FormProgress from "@/components/ui/FormProgress";
import {
  useFormValidation,
  validateEmail,
  validateUsername,
  validatePassword,
  validatePasswordMatch,
  getPasswordStrength,
  EmailValidationResult,
} from "@/hooks/useFormValidation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"student" | "mentor">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const { refreshProfile } = useAuth();

  const { validateField, validateFieldImmediate, getFieldState, setFieldState } = useFormValidation();

  // Auto-focus email field on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // ── Validation handlers ───────────────────────────────
  const handleEmailBlur = () => {
    const result = validateFieldImmediate("email", () => validateEmail(email)) as EmailValidationResult;
    if (result.suggestion) {
      setEmailSuggestion(result.suggestion);
    } else {
      setEmailSuggestion(null);
    }
  };

  const applyEmailSuggestion = () => {
    if (emailSuggestion) {
      setEmail(emailSuggestion);
      setEmailSuggestion(null);
      validateFieldImmediate("email", () => validateEmail(emailSuggestion));
    }
  };

  const handleUsernameBlur = () => {
    // Auto-trim whitespace on blur
    const trimmed = fullName.trim().toLowerCase().replace(/\s+/g, "_");
    if (trimmed !== fullName) setFullName(trimmed);
    validateFieldImmediate("username", () => validateUsername(trimmed || fullName));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value) validateField("password", () => validatePassword(value), 400);
    // Re-validate confirm if it's been filled
    if (confirmPassword) {
      validateField("confirmPassword", () => validatePasswordMatch(value, confirmPassword), 400);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (value) validateField("confirmPassword", () => validatePasswordMatch(password, value), 300);
  };

  // ── Computed states ───────────────────────────────────
  const emailState = getFieldState("email");
  const usernameState = getFieldState("username");
  const passwordState = getFieldState("password");
  const confirmState = getFieldState("confirmPassword");
  const passwordStrength = getPasswordStrength(password);

  // ── Password requirements checklist ───────────────────
  const pwRequirements = useMemo(() => [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
    { label: "One special character (!@#$%)", met: /[^a-zA-Z0-9]/.test(password) },
  ], [password]);

  // ── Form progress ────────────────────────────────────
  const formProgressFields = useMemo(() => [
    { label: "Email", completed: emailState.isValid && emailState.touched },
    { label: "Username", completed: usernameState.isValid && usernameState.touched },
    { label: "Password", completed: passwordState.isValid && passwordStrength.score >= 2 },
    { label: "Confirm Password", completed: confirmState.isValid && confirmState.touched },
    { label: "Terms", completed: agreedToTerms },
  ], [emailState, usernameState, passwordState, confirmState, passwordStrength.score, agreedToTerms]);

  const isFormReady =
    emailState.isValid &&
    usernameState.isValid &&
    passwordState.isValid &&
    confirmState.isValid &&
    passwordStrength.score >= 2 &&
    agreedToTerms;

  // ── Submit ────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Final validation pass
    const emailCheck = validateFieldImmediate("email", () => validateEmail(email));
    const usernameCheck = validateFieldImmediate("username", () => validateUsername(fullName));
    const passwordCheck = validateFieldImmediate("password", () => validatePassword(password));
    const confirmCheck = validateFieldImmediate("confirmPassword", () => validatePasswordMatch(password, confirmPassword));

    if (!emailCheck.isValid || !usernameCheck.isValid || !passwordCheck.isValid || !confirmCheck.isValid || !agreedToTerms) {
      return;
    }

    setIsLoading(true);
    try {
      // 1. Authenticate inside Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Create corresponding dynamic profile mapping in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email,
        fullName: fullName.replace(/_/g, " "), // restore visual spaces if trimmed auto-slugged
        role: role,
        createdAt: new Date().toISOString(),
      });

      // 3. Force context state synchronization before forwarding user
      await refreshProfile();
      
      setIsLoading(false);
      if (role === "mentor") {
        router.push("/mentor");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setIsLoading(false);
      if (err.code === "auth/email-already-in-use") {
        const conflictMsg = "This email address is already registered. Please log in.";
        setError(conflictMsg);
        setFieldState("email", { isValid: false, message: conflictMsg, touched: true });
      } else if (err.code === "auth/invalid-email") {
        const invalidMsg = "Please enter a valid email address.";
        setError(invalidMsg);
        setFieldState("email", { isValid: false, message: invalidMsg, touched: true });
      } else if (err.code === "auth/weak-password") {
        const weakMsg = "Password is too weak. Choose a stronger alternative.";
        setError(weakMsg);
        setFieldState("password", { isValid: false, message: weakMsg, touched: true });
      } else {
        console.error("Signup failed unexpectedly:", err);
        setError("An error occurred while creating your account. Please try again.");
      }
    }
  };

  // ── Field border class helper ─────────────────────────
  const fieldBorderClass = (state: { isValid: boolean; touched: boolean; message: string }) => {
    if (!state.touched) return "";
    return state.isValid ? "input-success" : "input-error";
  };

  // ── Role descriptions ────────────────────────────────
  const roleDescriptions = {
    student: "Learn by building real-world engineering projects with mentor guidance.",
    mentor: "Guide students, review submissions, and shape engineering talent.",
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-[#1A1A1A]">
      {/* Left Side: Glassmorphic Mesh Dashboard Preview Area */}
      <div className="hidden lg:flex flex-1 relative bg-[#0B0F19] p-16 flex-col justify-between items-start overflow-hidden">
        {/* Glowing Mesh Gradients */}
        <div className="absolute top-[-25%] left-[-15%] w-[70%] h-[70%] rounded-full bg-[#FF4B3A]/15 blur-[120px] animate-mesh-1" />
        <div className="absolute bottom-[-25%] right-[-15%] w-[75%] h-[75%] rounded-full bg-[#0052CC]/20 blur-[130px] animate-mesh-2" />
        
        {/* Diagonal grid background overlay for tech feel */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        {/* Top Left Logo */}
        <div className="relative flex items-center gap-3 z-10">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF4B3A] to-[#FF6D5E] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/20">
            N
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">Nexiv</span>
        </div>

        {/* High-Fidelity Dashboard Mockup Panel */}
        <div className="relative z-10 w-full max-w-[520px] self-center animate-slide-up my-8">
          <div className="glass-card-dark p-8 rounded-[32px] border border-white/10 shadow-2xl shadow-black/40 relative overflow-hidden">
            {/* Glowing dynamic overlay */}
            <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-gradient-to-br from-[#FF4B3A]/10 to-transparent rounded-full blur-3xl" />
            
            {/* Header card content */}
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
              <div>
                <div className="text-[11px] font-bold tracking-wider text-[#FF6D5E] uppercase mb-1">Command Console</div>
                <div className="text-3xl font-bold text-white tracking-tight">Next-Gen EdTech</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF4B3A] to-[#FF6D5E] flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>

            {/* Telemetry Metrics Feed */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-4 transition-transform duration-300 hover:scale-[1.02] backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">
                  ✓
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">Autonomous Rover Simulation</div>
                  <div className="text-[11px] text-gray-400">Audit completed by Tesla Senior Engineer</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">CERTIFIED</span>
              </div>
              
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-4 transition-transform duration-300 hover:scale-[1.02] backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-lg">
                  ⚙
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">Dynamic RTOS Kernel Port</div>
                  <div className="text-[11px] text-gray-400">Submission in static analysis pipeline</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-bold">RUNNING</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial / Value Prop footer */}
        <div className="relative z-10 max-w-[460px]">
          <h2 className="text-3xl font-bold text-white tracking-tight leading-tight mb-4">
            Master high-caliber engineering through deep construction.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed font-medium">
            Ditch the simple tutorials. Construct production-ready industrial IoT engines, bare-metal schedulers, and dynamic architectures with one-on-one evaluation from verified industry Leads.
          </p>
        </div>
      </div>

      {/* Right Side: Form Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-white overflow-y-auto">
        <div className="w-full max-w-[440px] px-4 py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-9 h-9 bg-gradient-to-br from-[#FF4B3A] to-[#FF6D5E] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
              N
            </div>
            <span className="text-xl font-bold text-[#1A1A1A] tracking-tight">Nexiv</span>
          </div>

          <div className="mb-8 text-left">
            <h1 className="text-4xl font-black text-[#1A1A1A] mb-3 tracking-tight">Create account</h1>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Begin your elite engineering journey today. <br className="hidden sm:block" />
              Already have an profile? <Link href="/auth/login" className="text-[#FF4B3A] font-bold hover:underline">Sign in here</Link>
            </p>
          </div>

          {/* Error alert banner */}
          {error && (
            <div className="mb-6 flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-red-50 border border-red-100 text-red-600 animate-slide-down" role="alert">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-wider">{error}</span>
            </div>
          )}

          {/* Form Progress */}
          <div className="mb-8">
            <FormProgress fields={formProgressFields} />
          </div>

          {/* Compact Role Switcher - Capsule segments with padding */}
          <div className="mb-8 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="grid grid-cols-2 gap-1">
              <button 
                type="button"
                onClick={() => setRole("student")}
                className={`py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${role === "student" ? "bg-white text-[#FF4B3A] shadow-sm border border-gray-100" : "text-gray-500 hover:text-gray-800"}`}
              >
                Student Account
              </button>
              <button 
                type="button"
                onClick={() => setRole("mentor")}
                className={`py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${role === "mentor" ? "bg-white text-[#FF4B3A] shadow-sm border border-gray-100" : "text-gray-500 hover:text-gray-800"}`}
              >
                Professional Mentor
              </button>
            </div>
            <div className="px-3 pt-2 pb-1 text-[11px] text-gray-400 text-center animate-fade-in" key={role}>
              {roleDescriptions[role]}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase ml-1" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center justify-center z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value.trim());
                    setEmailSuggestion(null);
                    if (emailState.touched) validateField("email", () => validateEmail(e.target.value.trim()));
                  }}
                  onBlur={handleEmailBlur}
                  className={`w-full py-3.5 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all text-sm font-medium text-[#1A1A1A] focus:bg-white focus:border-[#FF4B3A] focus:ring-4 focus:ring-[#FF4B3A]/5 placeholder:text-gray-400 ${fieldBorderClass(emailState)} ${emailSuggestion ? "input-warning" : ""}`}
                />
              </div>
              <InlineError message={emailState.message} show={emailState.touched && !emailState.isValid} />
              <InlineWarning
                message={emailSuggestion ? `Did you mean ${emailSuggestion}?` : ""}
                show={!!emailSuggestion}
                onAction={applyEmailSuggestion}
                actionLabel="Yes, fix it"
              />
              <InlineSuccess message="Valid email configuration" show={emailState.touched && emailState.isValid && !emailSuggestion} />
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase ml-1" htmlFor="fullName">Professional Identity (Username)</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center justify-center z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g. dev_master"
                  required
                  autoComplete="username"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (usernameState.touched) validateField("username", () => validateUsername(e.target.value));
                  }}
                  onBlur={handleUsernameBlur}
                  className={`w-full py-3.5 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all text-sm font-medium text-[#1A1A1A] focus:bg-white focus:border-[#FF4B3A] focus:ring-4 focus:ring-[#FF4B3A]/5 placeholder:text-gray-400 ${fieldBorderClass(usernameState)}`}
                />
              </div>
              <InlineError message={usernameState.message} show={usernameState.touched && !usernameState.isValid} />
              <InlineSuccess message="Identifier available" show={usernameState.touched && usernameState.isValid} />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase ml-1" htmlFor="password">Secure Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center justify-center z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className={`w-full py-3.5 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all text-sm font-medium text-[#1A1A1A] focus:bg-white focus:border-[#FF4B3A] focus:ring-4 focus:ring-[#FF4B3A]/5 placeholder:text-gray-400 ${fieldBorderClass(passwordState)}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                  </svg>
                </button>
              </div>
              <InlineError message={passwordState.message} show={passwordState.touched && !passwordState.isValid} />

              {/* Password Requirements Checklist */}
              {password.length > 0 && (
                <div className="mt-2 space-y-0.5 animate-slide-down bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  {pwRequirements.map((req) => (
                    <div key={req.label} className={`pw-check ${req.met ? "met" : "unmet"}`}>
                      <span className="pw-icon font-bold text-[10px]">✓</span>
                      <span className="text-[10px] font-semibold tracking-tight">{req.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <PasswordStrength password={password} />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase ml-1" htmlFor="confirmPassword">Verify Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center justify-center z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  className={`w-full py-3.5 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all text-sm font-medium text-[#1A1A1A] focus:bg-white focus:border-[#FF4B3A] focus:ring-4 focus:ring-[#FF4B3A]/5 placeholder:text-gray-400 ${fieldBorderClass(confirmState)}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showConfirmPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                  </svg>
                </button>
              </div>
              <InlineError message={confirmState.message} show={confirmState.touched && !confirmState.isValid} />
              <InlineSuccess message="Signatures align perfectly" show={confirmState.touched && confirmState.isValid} />
            </div>

            {/* Terms of Service checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group pt-1">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#FF4B3A] focus:ring-[#FF4B3A] accent-[#FF4B3A]"
              />
              <span className="text-xs text-gray-500 font-medium leading-relaxed select-none">
                By signing up, I consent to the absolute{" "}
                <Link href="/terms" className="font-bold text-[#1A1A1A] hover:underline hover:text-[#FF4B3A] transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-bold text-[#1A1A1A] hover:underline hover:text-[#FF4B3A] transition-colors">
                  Privacy Protocols
                </Link>.
              </span>
            </label>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading || !isFormReady}
                className="w-full py-3.5 bg-gradient-to-r from-[#FF4B3A] to-[#FF6D5E] text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-[2px] transition-all duration-300 text-sm tracking-wider uppercase disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none select-none"
                title={!isFormReady ? "Please complete authentication profiles above to continue" : undefined}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Initializing Profile...
                  </span>
                ) : (
                  "Establish Account"
                )}
              </button>

              {/* Disabled reason hint */}
              {!isFormReady && (email || fullName || password || confirmPassword) && (
                <p className="text-[11px] text-gray-400 font-medium text-center mt-3 animate-slide-down">
                  {!agreedToTerms && emailState.isValid && usernameState.isValid && passwordState.isValid && confirmState.isValid
                    ? "⚡ Please sign and accept the legal directives"
                    : "⚡ Configuration pending valid attribute payloads"}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
