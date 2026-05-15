"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import FormInput from "@/components/ui/FormInput";
import InlineError, { InlineWarning } from "@/components/ui/InlineError";
import {
  useFormValidation,
  validateEmail,
  EmailValidationResult,
} from "@/hooks/useFormValidation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const { refreshProfile } = useAuth();

  const { validateFieldImmediate, getFieldState } = useFormValidation();
  const emailState = getFieldState("email");

  // Auto-focus email
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // Clear error on typing
  useEffect(() => {
    if (error) setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  // Lockout countdown
  useEffect(() => {
    if (lockoutTimer <= 0) return;
    const interval = setInterval(() => {
      setLockoutTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const handleEmailBlur = () => {
    if (email) {
      const result = validateFieldImmediate("email", () => validateEmail(email)) as EmailValidationResult;
      if (result.suggestion) {
        setEmailSuggestion(result.suggestion);
      } else {
        setEmailSuggestion(null);
      }
    }
  };

  const applyEmailSuggestion = () => {
    if (emailSuggestion) {
      setEmail(emailSuggestion);
      setEmailSuggestion(null);
      validateFieldImmediate("email", () => validateEmail(emailSuggestion));
    }
  };

  const isLockedOut = lockoutTimer > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;

    setError("");
    const emailCheck = validateFieldImmediate("email", () => validateEmail(email));
    if (!emailCheck.isValid) return;

    setIsLoading(true);
    
    try {
      // 1. Primary Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Fetch User Document to Gate Role Access
      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const data = userSnapshot.data();
        if (data.role === "admin") {
          // Admin successfully authenticated & authorized
          setFailedAttempts(0);
          await refreshProfile();
          setIsLoading(false);
          router.push("/admin");
        } else {
          // Deny non-admin and instantly kill current auth session
          await signOut(auth);
          throw new Error("unauthorized-role");
        }
      } else {
        // User exists in Auth but profile doesn't exist - assume unauthorized
        await signOut(auth);
        throw new Error("unauthorized-role");
      }

    } catch (err: any) {
      setIsLoading(false);
      console.error("Admin login failed:", err);

      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      // Handle security lockouts
      if (newAttempts >= 5) {
        setLockoutTimer(60);
        setError(`Too many failed attempts. Account locked for 60 seconds.`);
        return;
      }

      // Customize feedback warning
      const isOffline = err.code === "unavailable" || err.message?.toLowerCase().includes("offline");

      if (isOffline) {
        setError("Connection lost. Please check your network connection and try again.");
      } else if (err.message === "unauthorized-role") {
        setError("Access denied. Account does not have administrative privileges.");
      } else if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        if (newAttempts >= 3) {
          setError(`Invalid credentials. ${5 - newAttempts} attempt(s) remaining before lockout.`);
        } else {
          setError("Invalid credentials. Admin access only.");
        }
      } else if (err.code === "auth/too-many-requests") {
        setLockoutTimer(120);
        setError("Platform heavily throttled. Try again in a few minutes.");
      } else {
        setError("Authorization failed. Please contact platform operations.");
      }
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-[#FFF8F2] text-[#1A1A1A] font-sans">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden border-r border-black/[0.04] bg-white">
        {/* Subtle Geometric Design */}
        <div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-[#FF4B3A]/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <div className="w-12 h-12 rounded-2xl bg-[#FF4B3A] flex items-center justify-center font-bold text-white text-2xl shadow-lg shadow-[#FF4B3A]/20 transition-transform group-hover:scale-105 duration-300">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-[#1A1A1A] leading-none">
                Nexiv
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#FF4B3A] leading-none mt-1.5">
                Administration
              </span>
            </div>
          </Link>

          {/* Hero Copy */}
          <div className="mt-auto mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B3A]/10 text-[#FF4B3A] text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 bg-[#FF4B3A] rounded-full animate-pulse"/>
              Secure Gateway
            </div>
            <h1 className="text-5xl font-bold mb-6 tracking-tight leading-[1.1] text-[#1A1A1A]">
              Control the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B3A] to-[#FF8A65]">Ecosystem.</span>
            </h1>
            <p className="text-lg text-[#4A4A4A] max-w-md leading-relaxed">
              Enter the Command Center to oversee mentorship workflows, review project submittals, and drive institutional performance.
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 text-sm font-medium text-[#7C7C7C]">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-[#FFF8F2] relative">
        <div className="w-full max-w-[400px] mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-black/[0.02]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#FF4B3A] flex items-center justify-center font-bold text-white text-xl shadow-lg">
                N
              </div>
              <div className="flex flex-col items-start">
                <span className="text-2xl font-bold tracking-tight text-[#1A1A1A] leading-none">Nexiv</span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#FF4B3A] mt-1">Admin</span>
              </div>
            </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2 tracking-tight">Access Portal</h2>
            <p className="text-[#4A4A4A] text-[15px]">
              Authenticate to access administrator tools.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-xl border animate-slide-down ${
              isLockedOut 
                ? "bg-amber-50 border-amber-100 text-amber-700" 
                : "bg-red-50 border-red-100 text-red-600"
            }`} role="alert">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isLockedOut ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                )}
              </svg>
              <span className="text-sm font-semibold">{error}</span>
            </div>
          )}

          {/* Lockout countdown */}
          {isLockedOut && (
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-600 text-sm font-bold">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Try again in {lockoutTimer}s
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Email — clear, non-jargon label */}
            <div>
              <FormInput
                label="Email address"
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value.trim());
                  setEmailSuggestion(null);
                }}
                placeholder="admin@nexiv.com"
                required={true}
                disabled={isLockedOut}
                autoComplete="email"
                suggestion={emailSuggestion}
                onSuggestionApply={applyEmailSuggestion}
                error={emailState.touched && !emailState.isValid ? emailState.message : null}
              />
            </div>

            {/* Password — clear, non-jargon label */}
            <div>
              <label htmlFor="admin-password" className="block text-sm font-bold text-[#1A1A1A] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  autoComplete="current-password"
                  disabled={isLockedOut}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#FAFAFA] border border-gray-200 text-[#1A1A1A] text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#FF4B3A] focus:ring-1 focus:ring-[#FF4B3A] transition-all duration-200 pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1A1A1A] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Failed attempts warning */}
            {failedAttempts > 0 && failedAttempts < 3 && !isLockedOut && (
              <p className="text-[11px] text-[#A1A1A1] text-center animate-slide-down">
                {5 - failedAttempts} of 5 attempts remaining
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password || isLockedOut}
              className="w-full py-4 mt-2 rounded-xl text-[16px] font-bold text-white bg-[#1A1A1A] hover:bg-[#000000] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-300 shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authorizing...
                </span>
              ) : (
                "Enter Command Center"
              )}
            </button>
          </form>

          {/* User login redirect */}
          <div className="mt-8 text-center border-t border-gray-100 pt-8">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 text-sm text-[#4A4A4A] hover:text-[#FF4B3A] transition-colors font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Student Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
