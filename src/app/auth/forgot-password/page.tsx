"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex w-full bg-[#060A13] text-[var(--text-primary)]">
      {/* Left Panel - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden border-r border-white/[0.04]">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[#0A0E17]" />
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            background: 'radial-gradient(circle at 0% 0%, #2563FF 0%, transparent 50%), radial-gradient(circle at 100% 100%, #7C3AED 0%, transparent 50%)'
          }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563FF] to-[#00E5FF] flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-[#2563FF]/20 group-hover:shadow-[#2563FF]/40 transition-all duration-300">
              N
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Nex<span className="text-[#00E5FF]">iv</span>
            </span>
          </Link>

          {/* Hero Copy */}
          <div className="mt-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.1] text-white">
              Recover your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563FF] to-[#00E5FF]">access.</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-md leading-relaxed">
              We'll help you get back to building. Enter your email to reset your password and secure your account.
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
            <span>© 2026 Nexiv. All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-[#0A0E17] relative">
        <div className="w-full max-w-[400px] mx-auto py-12">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563FF] to-[#00E5FF] flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-[#2563FF]/20">
                N
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Nex<span className="text-[#00E5FF]">iv</span>
              </span>
            </Link>
          </div>

          {!sent ? (
            <>
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Reset password</h2>
                <p className="text-[var(--text-muted)] text-[15px]">
                  Enter your email to receive a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#060A13] border border-white/[0.06] text-white text-[15px] placeholder:text-[var(--text-muted)]/70 focus:outline-none focus:border-[#2563FF] focus:ring-1 focus:ring-[#2563FF] transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full py-3.5 mt-2 rounded-xl text-[15px] font-medium text-white bg-[#2563FF] hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_15px_rgba(37,99,255,0.3)] hover:shadow-[0_0_25px_rgba(37,99,255,0.4)]"
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
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 mx-auto border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-3 text-white">Check your email</h2>
              <p className="text-[var(--text-secondary)] text-[15px] mb-8 leading-relaxed">
                We've sent a password reset link to<br/>
                <span className="text-white font-medium mt-1 inline-block">{email}</span>
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-sm font-semibold text-[#2563FF] hover:text-[#00E5FF] transition-colors"
              >
                Didn't receive it? Try again
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 text-sm text-[var(--text-muted)] hover:text-white transition-colors group font-medium"
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
