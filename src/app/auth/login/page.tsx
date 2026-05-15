"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import InlineError, { InlineWarning } from "@/components/ui/InlineError";
import Tooltip from "@/components/ui/Tooltip";
import {
  useFormValidation,
  validateEmail,
  EmailValidationResult,
} from "@/hooks/useFormValidation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const { refreshProfile } = useAuth();

  const { validateFieldImmediate, getFieldState } = useFormValidation();

  // Auto-focus email on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // Clear login error when user types
  useEffect(() => {
    if (loginError) setLoginError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  const emailState = getFieldState("email");

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

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailCheck = validateFieldImmediate("email", () => validateEmail(email));
    if (!emailCheck.isValid) return;
    if (!password) {
      setPasswordTouched(true);
      return;
    }

    setIsLoading(true);
    setLoginError("");
    
    try {
      // 1. Authenticate session via Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 2. Fetch profile directly to determine router destination
      let destination = "/dashboard";
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const profile = userDoc.data();
          if (profile.role === "mentor") {
            destination = "/mentor";
          }
        }
      } catch (dbErr) {
        console.warn("Failed to parse pre-route destinations offline, falling back to default.");
      }

      // 3. Sync cached firestore profile immediately before render redirect
      await refreshProfile();
      
      setIsLoading(false);
      router.push(destination);
    } catch (err: any) {
      setIsLoading(false);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setLoginError("Invalid email address or password.");
      } else if (err.code === "auth/too-many-requests") {
        setLoginError("Access disabled due to too many failed attempts. Try again later.");
      } else {
        console.error("Login encountered unexpected error:", err);
        setLoginError("Failed to sign in. Please check your credentials.");
      }
    }
  };

  const isFormFilled = email.length > 0 && password.length > 0;
  const isPasswordEmpty = passwordTouched && !password;

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
                <div className="text-[11px] font-bold tracking-wider text-[#FF6D5E] uppercase mb-1">Access Terminal</div>
                <div className="text-3xl font-bold text-white tracking-tight">Welcome Back</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF4B3A] to-[#FF6D5E] flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
            </div>

            {/* Dynamic Project Queue List */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-4 transition-transform duration-300 hover:scale-[1.02] backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-lg">
                  ⚙
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">Embedded Core Gateway</div>
                  <div className="text-[11px] text-gray-400">Latest commit 14m ago by mentor</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-[10px] font-bold">ACTIVE</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-4 transition-transform duration-300 hover:scale-[1.02] backdrop-blur-md opacity-80">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">
                  ✓
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">Control Logic PLC</div>
                  <div className="text-[11px] text-gray-400">Submission passed code verification</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">DONE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtitle footer */}
        <div className="relative z-10 max-w-[460px]">
          <h2 className="text-3xl font-bold text-white tracking-tight leading-tight mb-4">
            Re-engage your architectural environment.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed font-medium">
            Connect to your dashboard to review active code evaluations, check real-time mentor feedback, and launch your next system architecture build.
          </p>
        </div>
      </div>

      {/* Right Side: The Form Area */}
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
            <h1 className="text-4xl font-black text-[#1A1A1A] mb-3 tracking-tight">Welcome back</h1>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Access your command terminal profile. <br className="hidden sm:block" />
              New to Nexiv? <Link href="/auth/signup" className="text-[#FF4B3A] font-bold hover:underline">Register account</Link>
            </p>
          </div>

          {/* Login error banner */}
          {loginError && (
            <div className="mb-6 flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-red-50 border border-red-100 text-red-600 animate-slide-down" role="alert">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-wider">{loginError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase ml-1" htmlFor="email">Registered Email</label>
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
                  }}
                  onBlur={handleEmailBlur}
                  className={`w-full py-3.5 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all text-sm font-medium text-[#1A1A1A] focus:bg-white focus:border-[#FF4B3A] focus:ring-4 focus:ring-[#FF4B3A]/5 placeholder:text-gray-400 ${emailState.touched && !emailState.isValid ? "input-error" : ""} ${emailSuggestion ? "input-warning" : ""}`}
                />
              </div>
              <InlineError message={emailState.message} show={emailState.touched && !emailState.isValid} />
              <InlineWarning
                message={emailSuggestion ? `Did you mean ${emailSuggestion}?` : ""}
                show={!!emailSuggestion}
                onAction={applyEmailSuggestion}
                actionLabel="Yes, fix it"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase ml-1" htmlFor="password">Secure Password</label>
              </div>
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordTouched && e.target.value) setPasswordTouched(false);
                  }}
                  onBlur={handlePasswordBlur}
                  className={`w-full py-3.5 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all text-sm font-medium text-[#1A1A1A] focus:bg-white focus:border-[#FF4B3A] focus:ring-4 focus:ring-[#FF4B3A]/5 placeholder:text-gray-400 ${isPasswordEmpty ? "input-error" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
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
              <InlineError message="Password entry is mandatory" show={isPasswordEmpty} />
            </div>

            <div className="flex items-center justify-between text-[13px] pt-1 select-none">
              <Tooltip content="Secure session cache for 30 days on this machine" position="bottom">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-[#FF4B3A] focus:ring-[#FF4B3A] accent-[#FF4B3A]" />
                  <span className="text-gray-500 font-medium">Maintain Session</span>
                </label>
              </Tooltip>
              <Link href="/auth/forgot-password" className="text-gray-400 hover:text-[#FF4B3A] font-semibold transition-colors">Retrieve Credentials?</Link>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full py-3.5 bg-gradient-to-r from-[#FF4B3A] to-[#FF6D5E] text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-[2px] transition-all duration-300 text-sm tracking-wider uppercase disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none select-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Opening Channel...
                  </span>
                ) : (
                  "Connect Account"
                )}
              </button>

              {/* Keyboard hint */}
              {isFormFilled && !isLoading && (
                <p className="kbd-hint justify-center mt-3 font-bold">
                  Press <kbd>Enter ↵</kbd> to authenticate
                </p>
              )}

              {/* Disabled reason hint */}
              {!isFormFilled && (email || password) && (
                <p className="text-[11px] text-gray-400 font-medium text-center mt-3 animate-slide-down">
                  {!email ? "⚡ Supply identifier parameter" : "⚡ Credential hash payload expected"}
                </p>
              )}
            </div>
          </form>

          {/* Divider & Social logins */}
          <div className="mt-12 text-center">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <span className="relative px-4 text-xs font-bold tracking-widest text-gray-400 bg-white uppercase">Alternative Sync Methods</span>
            </div>
            <div className="flex justify-center gap-6">
              {/* Apple */}
              <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 shadow-sm hover:-translate-y-1 hover:bg-white hover:shadow-md transition-all duration-300 text-black" aria-label="Sign in with Apple">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2.002-.156-3.25 1.09-4.21 1.09zm2.376-4.649c.831-1.027 1.39-2.454 1.234-3.878-1.22.049-2.702.82-3.585 1.847-.792.91-1.48 2.363-1.299 3.761 1.364.104 2.74-.65 3.65-1.73z" />
                </svg>
              </button>
              {/* Google */}
              <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 shadow-sm hover:-translate-y-1 hover:bg-white hover:shadow-md transition-all duration-300" aria-label="Sign in with Google">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
             <Link href="/admin/login" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#FF4B3A] transition-colors">
              🛠️ Administrator Link
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
