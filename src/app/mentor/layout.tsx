"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const mentorNav = [
  { label: "Dashboard", href: "/mentor", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
  { label: "Reviews", href: "/mentor/reviews", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /> },
];

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userProfile, loading, logout } = useAuth();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Secure route protection: auto-gating unauthenticated traffic & cross-role redirection
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login");
      } else if (userProfile && userProfile.role === "student") {
        // Prevent students from entering Mentor UI
        router.push("/dashboard");
      }
    }
  }, [user, userProfile, loading, router]);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "M";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Mentor logout failed:", error);
    }
  };

  // Elegant mentor loading interlude
  if (loading || !user || userProfile?.role === "student") {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#FFF8F2]">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-14 h-14 bg-gradient-to-br from-[#FF4B3A] to-[#FF8A65] rounded-[18px] flex items-center justify-center font-black text-white text-3xl shadow-lg shadow-[#FF4B3A]/20">
            N
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin text-[#FF4B3A]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-sm font-bold text-[#1A1A1A] tracking-tight">Synchronizing instructor desk...</p>
          </div>
        </div>
      </div>
    );
  }

  const displayName = userProfile?.fullName || user.displayName || user.email?.split("@")[0] || "Mentor";
  const displayRole = userProfile?.role 
    ? userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1) 
    : "Instructor";

  return (
    <div className="h-screen bg-[var(--bg-primary)] flex overflow-hidden text-[var(--text-primary)]">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 bg-[var(--bg-elevated)] border-r border-[var(--border-subtle)] shadow-premium ${
          collapsed ? "w-[84px]" : "w-72"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-24 flex items-center px-8 border-b border-[var(--border-subtle)] flex-shrink-0 relative z-10">
          <Link href="/" className="flex items-center gap-3.5 overflow-hidden group">
            <div className="w-10 h-10 rounded-[16px] bg-gradient-to-br from-[#FF4B3A] to-[#FF6D5E] shadow-lg shadow-orange-500/20 flex items-center justify-center font-black text-white text-xl flex-shrink-0 transition-transform group-hover:scale-[1.06]">
              N
            </div>
            {!collapsed && (
              <span className="text-2xl font-black tracking-tighter text-white">
                Nexiv<span className="text-[#FF4B3A]">.</span>
              </span>
            )}
          </Link>
          {!collapsed && (
            <span className="ml-auto px-2.5 py-0.5 rounded-lg text-[9px] font-black bg-[var(--color-primary)]/15 text-[var(--color-primary)] uppercase tracking-wider border border-[var(--color-primary)]/20">
              Mentor
            </span>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-8 px-5 flex flex-col gap-3 overflow-y-auto relative z-10 scrollbar-hide">
          {mentorNav.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[14px] font-black uppercase tracking-wider transition-all duration-300 group ${
                  isActive 
                    ? "bg-gradient-to-r from-[#FF4B3A] to-[#FF6D5E] text-white shadow-lg shadow-orange-500/25 scale-[1.01]" 
                    : "text-[var(--text-muted)] hover:text-white hover:bg-white/[0.03]"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className={`flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isActive ? "text-white scale-110" : "text-[var(--text-muted)] group-hover:text-[#FF4B3A]"
                }`}>
                  <svg className="w-[19px] h-[19px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                {!collapsed && <span className="truncate font-extrabold text-[13px] leading-none">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-5 border-t border-[var(--border-subtle)] flex-shrink-0 relative z-10">
          <div className={`flex items-center gap-3.5 p-2.5 rounded-[22px] border border-transparent hover:border-white/[0.03] hover:bg-white/[0.02] transition-all duration-300 group relative ${collapsed ? "justify-center" : ""}`}>
            <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-black text-sm flex-shrink-0 uppercase shadow-inner relative overflow-hidden">
              <span className="relative z-10">{getInitials(displayName)}</span>
              <div className="absolute inset-0 bg-white/5 animate-pulse" />
            </div>
            {!collapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-white truncate capitalize tracking-tight">{displayName}</p>
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mt-0.5">{displayRole}</p>
                </div>
                {/* Sleek Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-xl bg-white/[0.02] hover:bg-red-500/10 border border-white/[0.04] hover:border-red-500/20 text-[var(--text-muted)] hover:text-[#FF4B3A] shadow-sm transition-all duration-300"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </>
            )}
            {collapsed && (
              <button 
                onClick={handleLogout}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                title="Sign out"
              />
            )}
          </div>
        </div>

        {/* Collapse Toggle Floating Rail */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-4 top-24 w-8 h-8 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] items-center justify-center text-[var(--text-muted)] hover:text-white shadow-md transition-all z-20"
        >
          <svg className={`w-4 h-4 transition-transform duration-500 ${collapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </aside>

      {/* Main Frame */}
      <div className="flex-1 flex flex-col min-w-0 bg-[var(--bg-primary)]">
        <header className="h-24 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 backdrop-blur-2xl flex items-center px-10 justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-10 h-10 rounded-xl bg-white/[0.02] text-[var(--text-muted)] hover:text-white flex items-center justify-center transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h2 className="text-lg font-black tracking-tight text-white uppercase tracking-widest text-sm">Command Desk</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Systems Nominal</span>
          </div>
        </header>
        
        <main className="flex-1 p-8 md:p-12 overflow-y-auto bg-[var(--bg-primary)] relative">
          <div className="max-w-7xl mx-auto w-full relative z-10">
            {children}
          </div>
          {/* Dynamic background visual accent for deep tech aesthetic */}
          <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        </main>
      </div>
    </div>
  );
}
