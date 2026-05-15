"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import InlineError from "@/components/ui/InlineError";
import {
  useFormValidation,
  validateEmail,
} from "@/hooks/useFormValidation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const emailRef = useRef<HTMLInputElement>(null);
  const { resetPassword } = useAuth();

  const { validateFieldImmediate, getFieldState } = useFormValidation();
  const emailState = getFieldState("email");

  // Auto-focus on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // Cooldown timer for rate limiting
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleEmailBlur = () => {
    if (email) validateFieldImmediate("email", () => validateEmail(email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const emailCheck = validateFieldImmediate("email", () => validateEmail(email));
    if (!emailCheck.isValid) return;

    setIsLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      setIsLoading(false);
      setCooldown(60); // 60s rate limit
    } catch (err: any) {
      setIsLoading(false);
      console.error("Reset failed:", err);
      if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Failed to send link. Please verify the email address and try again.");
      }
    }
  };

  // Mask email for privacy display (e.g., "ar***d@example.com")
  const maskedEmail = (() => {
    const [local, domain] = email.split("@");
    if (!local || !domain) return email;
    if (local.length <= 2) return `${local[0]}***@${domain}`;
    return `${local[0]}${local[1]}${'*'.repeat(Math.min(local.length - 2, 5))}${local[local.length - 1]}@${domain}`;
  })();

  const handleResend = () => {
    if (cooldown > 0) return;
    // Keep email pre-filled for convenience — just go back to form
    setSent(false);
  };

  return (
    <div className="min-h-screen flex w-full bg-white font-sans text-[#1A1A1A]">
      {/* Left Panel - Branding (Warm cream theme for consistency) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden border-r border-black/[0.04] bg-[#FFF3E3]">
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <div className="w-10 h-10 rounded-xl bg-[#FF4B3A] flex items-center justify-center font-bold text-white text-xl shadow-md transition-transform group-hover:scale-105 duration-300">
              N
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#1A1A1A]">
              Nexiv
            </span>
          </Link>

          {/* Illustration */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-[80%] h-[60%] animate-fade-in">
              <Image
                src="/images/auth_illustration.png"
                alt="Student illustration"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Hero Copy */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 tracking-tight leading-[1.1] text-[#1A1A1A]">
              Recover your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B3A] to-[#FF8A65]">access.</span>
            </h1>
            <p className="text-lg text-[#4A4A4A] max-w-md leading-relaxed">
              We&apos;ll help you get back to building. Enter your email to reset your password and secure your account.
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-6 text-sm text-[#7C7C7C]">
            <span>© 2026 Nexiv. All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-white relative">
        <div className="w-full max-w-[400px] mx-auto py-12">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#FF4B3A] flex items-center justify-center font-bold text-white text-xl shadow-md">
                N
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#1A1A1A]">
                Nexiv
              </span>
            </Link>
          </div>

          {!sent ? (
            <>
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2 tracking-tight">Reset password</h2>
                <p className="text-[#4A4A4A] text-[15px]">
                  Enter your email to receive a reset link.
                </p>
              </div>

              {error && (
                <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 animate-slide-down" role="alert">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-sm font-semibold">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Email address
                  </label>
                  <input
                    ref={emailRef}
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    onBlur={handleEmailBlur}
                    placeholder="name@example.com"
                    required
                    autoComplete="email"
                    className={`w-full px-4 py-3.5 rounded-xl bg-[#FAFAFA] border border-gray-200 text-[#1A1A1A] text-[15px] placeholder:text-[#A1A1A1]/70 focus:outline-none focus:border-[#FF4B3A] focus:ring-1 focus:ring-[#FF4B3A] transition-all duration-200 ${emailState.touched && !emailState.isValid ? "input-error" : ""}`}
                  />
                  <InlineError message={emailState.message} show={emailState.touched && !emailState.isValid} />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full py-3.5 mt-2 rounded-xl text-[15px] font-bold text-white bg-[#FF4B3A] hover:bg-[#E33A2B] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_8px_25px_rgba(255,75,58,0.25)] hover:shadow-[0_12px_30px_rgba(255,75,58,0.35)]"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending link...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4 animate-slide-up">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6 mx-auto border border-emerald-100 shadow-sm">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-3 text-[#1A1A1A]">Check your email</h2>
              <p className="text-[#4A4A4A] text-[15px] mb-8 leading-relaxed">
                We&apos;ve sent a password reset link to<br/>
                <span className="text-[#1A1A1A] font-medium mt-1 inline-block">{maskedEmail}</span>
              </p>
              <button
                onClick={handleResend}
                disabled={cooldown > 0}
                className="text-sm font-semibold text-[#FF4B3A] hover:text-[#E33A2B] transition-colors disabled:text-[#A1A1A1] disabled:cursor-not-allowed"
              >
                {cooldown > 0
                  ? `Resend available in ${cooldown}s`
                  : "Didn't receive it? Try again"}
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 text-sm text-[#7C7C7C] hover:text-[#1A1A1A] transition-colors group font-medium"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
