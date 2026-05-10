"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Login:", { email, password });
    setIsLoading(false);
    router.push("/dashboard");
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
              Elevate your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563FF] to-[#00E5FF]">engineering</span> career.
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-md leading-relaxed">
              Join a community of forward-thinking builders. Master new skills, connect with industry mentors, and launch your next big project.
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
        <div className="w-full max-w-[400px] mx-auto">
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

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</h2>
            <p className="text-[var(--text-muted)] text-[15px]">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Google SSO */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] text-[15px] font-medium transition-all duration-200 mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-[var(--text-primary)]">Log in with Google</span>
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/[0.04]" />
            <span className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Or continue with</span>
            <div className="flex-1 h-px bg-white/[0.04]" />
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

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="text-sm font-medium text-[#2563FF] hover:text-[#00E5FF] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#060A13] border border-white/[0.06] text-white text-[15px] placeholder:text-[var(--text-muted)]/70 focus:outline-none focus:border-[#2563FF] focus:ring-1 focus:ring-[#2563FF] transition-all duration-200 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors"
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

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full py-3.5 mt-2 rounded-xl text-[15px] font-medium text-white bg-[#2563FF] hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_15px_rgba(37,99,255,0.3)] hover:shadow-[0_0_25px_rgba(37,99,255,0.4)]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in to your account"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="font-medium text-white hover:text-[#00E5FF] transition-colors">
              Sign up
            </Link>
          </p>
          
          <div className="mt-8 text-center text-xs text-[var(--text-muted)]/50">
            <Link href="/admin/login" className="hover:text-[var(--text-secondary)] transition-colors">
              Login as Administrator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
