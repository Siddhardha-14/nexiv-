"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    ),
  },
  {
    label: "Tracks",
    href: "/dashboard/tracks",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    ),
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    ),
  },
  {
    label: "Teams",
    href: "/dashboard/teams",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
  },
  {
    label: "Portfolio",
    href: "/dashboard/portfolio",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    label: "Certificates",
    href: "/dashboard/certificates",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    ),
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userProfile, loading, logout } = useAuth();
  
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Secure route protection: auto-gating unauthenticated traffic & cross-role redirection
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login");
      } else if (userProfile && userProfile.role === "mentor") {
        // Prevent mentors from loading Student UI
        router.push("/mentor");
      }
    }
  }, [user, userProfile, loading, router]);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "??";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Elegant dashboard loading interlude
  if (loading || !user || userProfile?.role === "mentor") {
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
            <p className="text-sm font-bold text-[#1A1A1A] tracking-tight">Synchronizing workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  const displayName = userProfile?.fullName || user.displayName || user.email?.split("@")[0] || "User";
  const displayRole = userProfile?.role 
    ? userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1) 
    : "Student";

  return (
    <div className="h-screen bg-[var(--color-bg-dashboard)] flex overflow-hidden text-[#1A1A1A]">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 bg-white shadow-premium border-r border-black/[0.02] ${
          collapsed ? "w-[84px]" : "w-72"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="h-24 flex items-center px-8 border-b border-black/[0.02] flex-shrink-0">
          <Link href="/" className="flex items-center gap-3.5 overflow-hidden group">
            <div className="w-10 h-10 rounded-[16px] bg-gradient-to-br from-[#FF4B3A] to-[#FF6D5E] shadow-lg shadow-orange-500/20 flex items-center justify-center font-black text-white text-xl flex-shrink-0 transition-transform group-hover:scale-[1.06]">
              N
            </div>
            {!collapsed && (
              <span className="text-2xl font-black tracking-tighter text-[#1A1A1A]">
                Nexiv<span className="text-[#FF4B3A]">.</span>
              </span>
            )}
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-8 px-5 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[14px] font-black uppercase tracking-wider transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#FF4B3A] to-[#FF6D5E] text-white shadow-lg shadow-orange-500/25 scale-[1.01]"
                    : "text-[#575757] hover:bg-[#FFF8F2]/80 hover:text-[#FF4B3A]"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className={`flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isActive ? "text-white scale-110" : "text-gray-400 group-hover:text-[#FF4B3A]"
                }`}>
                  <svg
                    className="w-[19px] h-[19px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </svg>
                </div>
                {!collapsed && <span className="truncate font-extrabold text-[13px] leading-none">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-5 border-t border-black/[0.02] flex-shrink-0">
          <div className={`flex items-center gap-3.5 p-2.5 rounded-[22px] border border-transparent hover:border-black/[0.03] hover:bg-[#FFF8F2]/50 transition-all duration-300 group/user relative ${collapsed ? "justify-center" : ""}`}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF4B3A]/10 to-[#FF6D5E]/10 border border-orange-500/10 text-[#FF4B3A] flex items-center justify-center font-black text-sm flex-shrink-0 uppercase shadow-inner relative overflow-hidden">
              <span className="relative z-10">{getInitials(displayName)}</span>
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
            {!collapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-[#1A1A1A] truncate capitalize tracking-tight">{displayName}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{displayRole}</p>
                </div>
                
                {/* Explicit, sleek Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-xl bg-white hover:bg-red-50 border border-black/[0.02] hover:border-red-100 text-gray-400 hover:text-[#FF4B3A] shadow-sm hover:shadow transition-all duration-300"
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
      </aside>

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-24 bg-white/80 backdrop-blur-2xl border-b border-black/[0.01] flex items-center px-10 justify-between sticky top-0 z-30">
          <div className="flex items-center gap-6 flex-1">
            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-[#575757] w-10 h-10 rounded-xl bg-black/[0.02] hover:bg-[#FFF3E3] flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Collapse Toggle Desktop */}
            <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex w-10 h-10 rounded-xl items-center justify-center bg-black/[0.02] border border-transparent hover:border-black/[0.03] text-gray-400 hover:bg-white hover:text-[#1A1A1A] shadow-sm transition-all">
               <svg className={`w-5 h-5 transition-transform duration-500 ${collapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
               </svg>
            </button>

            {/* Search */}
            <div className="hidden sm:block w-full max-w-md ml-2">
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF4B3A] transition-colors">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Intelligent Command Search..."
                  className="w-full pl-12 pr-5 py-3 bg-black/[0.02] border border-transparent rounded-xl text-sm font-bold text-[#1A1A1A] placeholder:text-gray-400/80 focus:outline-none focus:bg-white focus:border-[#FF4B3A]/20 focus:shadow-premium transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center gap-5">
            {/* Notifications */}
            <button className="relative w-11 h-11 rounded-xl bg-black/[0.02] border border-transparent hover:border-black/[0.03] hover:bg-white hover:shadow-sm text-gray-400 hover:text-[#FF4B3A] hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-[#FF4B3A] to-[#FF6D5E] text-white text-[9px] font-black flex items-center justify-center border-2 border-white shadow-sm">3</span>
            </button>
            
            {/* Quick Action */}
            <Link href="/dashboard/projects" className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] text-white text-xs uppercase tracking-wider font-black rounded-xl hover:from-black hover:to-[#1A1A1A] hover:-translate-y-0.5 transition-all shadow-lg shadow-black/10 group">
               <span>Initialize Build</span>
               <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
               </svg>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 md:p-12 overflow-y-auto bg-[var(--color-bg-dashboard)] relative">
          <div className="max-w-7xl mx-auto w-full relative z-10">
            {children}
          </div>
          {/* Subtle bottom mesh accent */}
          <div className="fixed bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        </main>
      </div>
    </div>
  );
}
