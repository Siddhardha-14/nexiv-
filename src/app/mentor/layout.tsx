"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

const mentorNav = [
  { label: "Dashboard", href: "/mentor", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
  { label: "Reviews", href: "/mentor/reviews", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /> },
];

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col bg-card border-r border-border transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-16 flex items-center px-4 border-b border-border flex-shrink-0 relative z-10">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
            <div className="size-8 rounded-xl bg-[#FF4B3A] shadow-lg shadow-[#FF4B3A]/20 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
              N
            </div>
            {!collapsed && (
              <span className="text-lg font-bold tracking-tight whitespace-nowrap text-foreground">
                Nexiv
              </span>
            )}
          </Link>
          {!collapsed && (
            <Badge variant="secondary" className="ml-auto text-[10px] font-bold uppercase">
              Mentor
            </Badge>
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
                    ? "bg-[#FF4B3A]/10 text-[#FF4B3A]" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className={`size-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isActive ? "bg-[#FF4B3A]/10" : "bg-secondary/50 group-hover:bg-secondary"
                }`}>
                  <svg className={`size-4 flex-shrink-0 transition-colors ${
                    isActive ? "text-[#FF4B3A]" : "text-muted-foreground group-hover:text-foreground"
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
        <div className="p-3 border-t border-border flex-shrink-0">
          <div className={`flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-secondary/50 transition-all cursor-pointer ${collapsed ? "justify-center px-2" : ""}`}>
            <Avatar className="size-8">
              <AvatarFallback className="bg-[#FF4B3A]/10 text-[#FF4B3A] font-bold text-xs">RK</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">Rajesh Kumar</p>
                <p className="text-[11px] text-muted-foreground truncate">Mentor</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3.5 top-20 size-7 rounded-full bg-background border border-border items-center justify-center text-muted-foreground hover:text-foreground transition-all z-10 shadow-sm"
        >
          <svg className={`size-3.5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md flex items-center px-6 justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-muted-foreground hover:text-foreground mr-4 transition-colors">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Mentor Dashboard</h2>
          </div>
          <ThemeToggle />
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
