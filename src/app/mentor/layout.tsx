"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mentorNav = [
  { label: "Dashboard", href: "/mentor", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
  { label: "Reviews", href: "/mentor/reviews", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /> },
];

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-16 flex items-center px-4 border-b border-[var(--border-subtle)] flex-shrink-0 relative z-10">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-md bg-[var(--bg-elevated)] flex items-center justify-center font-bold text-white text-sm flex-shrink-0 border border-[var(--border-subtle)]">
              N
            </div>
            {!collapsed && (
              <span className="text-lg font-bold tracking-tight whitespace-nowrap">
                Nexiv
              </span>
            )}
          </Link>
          {!collapsed && (
            <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--bg-elevated)] text-[var(--text-secondary)] uppercase border border-[var(--border-subtle)]">
              Mentor
            </span>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-5 px-3 space-y-1 overflow-y-auto relative z-10">
          {mentorNav.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3 px-2.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive 
                    ? "bg-[var(--color-primary)]/8 text-[var(--color-primary)] sidebar-active" 
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-white/[0.03]"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isActive ? "bg-[var(--color-primary)]/10" : "bg-white/[0.02] group-hover:bg-white/[0.04]"
                }`}>
                  <svg className={`w-[16px] h-[16px] flex-shrink-0 transition-colors ${
                    isActive ? "text-[var(--color-primary)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-[var(--border-subtle)] flex-shrink-0">
          <div className={`flex items-center gap-3 px-3 py-3 rounded-lg border border-transparent hover:bg-[var(--bg-elevated)] transition-all cursor-pointer ${collapsed ? "justify-center px-2" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center font-bold text-[var(--text-primary)] text-xs flex-shrink-0">
              RK
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">Rajesh Kumar</p>
                <p className="text-[11px] text-[var(--text-muted)] truncate">Mentor</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3.5 top-20 w-7 h-7 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all z-10 shadow-sm"
        >
          <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-[var(--bg-primary)]">
        <header className="h-16 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] flex items-center px-6 sticky top-0 z-30">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-[var(--text-muted)] hover:text-[var(--text-primary)] mr-4 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <h2 className="text-lg font-semibold tracking-tight">Mentor Dashboard</h2>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
