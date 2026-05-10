"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate auth delay
    await new Promise((r) => setTimeout(r, 1500));

    // TODO: Replace with real Firebase Admin auth
    if (email === "admin@nexiv.com" && password === "admin123") {
      router.push("/admin");
    } else {
      setError("Invalid credentials. Admin access only.");
      setIsLoading(false);
    }
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
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white leading-none">
                Nex<span className="text-[#00E5FF]">iv</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#00E5FF] leading-none mt-1">
                Command Center
              </span>
            </div>
          </Link>

          {/* Hero Copy */}
          <div className="mt-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.1] text-white">
              System <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563FF] to-[#00E5FF]">Administration.</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-md leading-relaxed">
              Secure access required. Enter your administrator credentials to manage platform operations and user data.
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Systems Operational</span>
            </div>
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
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white leading-none">
                  Nex<span className="text-[#00E5FF]">iv</span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#00E5FF] leading-none mt-1">
                  Command Center
                </span>
              </div>
            </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Login</h2>
            <p className="text-[var(--text-muted)] text-[15px]">
              Access restricted to authorized personnel.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nexiv.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#060A13] border border-white/[0.06] text-white text-[15px] placeholder:text-[var(--text-muted)]/70 focus:outline-none focus:border-[#2563FF] focus:ring-1 focus:ring-[#2563FF] transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="admin-password" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
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

            {/* Submit button */}
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
                  Authenticating...
                </span>
              ) : (
                "Access Command Center"
              )}
            </button>
          </form>

          {/* User login redirect */}
          <div className="mt-8 text-center border-t border-white/[0.04] pt-8">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 text-[15px] text-[var(--text-secondary)] hover:text-white transition-colors group font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              Login as Student or Mentor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
