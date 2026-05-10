"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNav = [
  { label: "Analytics", href: "/admin", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> },
  { label: "Users", href: "/admin/users", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
  { label: "Projects", href: "/admin/projects", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Render login page as standalone without sidebar/header
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex">
      {mobileOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 w-64 flex flex-col bg-[var(--bg-primary)] border-r border-[var(--border-subtle)] transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >

        <div className="h-16 flex items-center px-4 border-b border-[var(--border-subtle)] relative z-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[var(--bg-elevated)] flex items-center justify-center font-bold text-[var(--text-primary)] text-sm border border-[var(--border-subtle)]">N</div>
            <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">Nexiv</span>
          </Link>
          <span className="ml-auto badge badge-error">Admin</span>
        </div>

        <nav className="flex-1 py-5 px-3 space-y-1">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`relative flex items-center gap-3 px-2.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive ? "bg-[var(--color-primary)]/8 text-[var(--color-primary)] sidebar-active" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-white/[0.03]"}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isActive ? "bg-[var(--color-primary)]/10" : "bg-white/[0.02] group-hover:bg-white/[0.04]"}`}>
                  <svg className={`w-[16px] h-[16px] ${isActive ? "text-[var(--color-primary)]" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                </div>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg border border-transparent hover:bg-[var(--bg-elevated)] transition-all cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center font-bold text-[var(--text-primary)] text-xs">AD</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[var(--text-primary)] truncate">Admin</p>
              <p className="text-[11px] text-[var(--text-muted)]">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-[var(--bg-primary)]">
        <header className="h-16 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] flex items-center px-6 sticky top-0 z-30">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-[var(--text-muted)] hover:text-[var(--text-primary)] mr-4 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold tracking-tight">Admin Panel</h2>
            <span className="badge badge-primary">Live</span>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
