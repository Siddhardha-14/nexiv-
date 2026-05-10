"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

const adminNav = [
  { label: "Overview", href: "/admin", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> },
  { label: "User Directory", href: "/admin/users", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
  { label: "All Projects", href: "/admin/projects", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Render login page as standalone without sidebar/header
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {mobileOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 w-72 flex flex-col bg-card border-r border-border transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-20 flex items-center px-6 border-b border-border relative z-10">
          <Link href="/" className="flex items-center gap-2.5">
             <div className="size-9 rounded-xl bg-foreground shadow-lg flex items-center justify-center font-black text-background text-lg">N</div>
             <span className="text-xl font-black tracking-tight text-foreground">Nexiv</span>
          </Link>
          <Badge variant="destructive" className="ml-auto text-[10px] font-black uppercase tracking-wider">
            Admin
          </Badge>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-semibold transition-all duration-200 group ${
                  isActive 
                    ? "bg-secondary text-foreground" 
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <div className={`flex items-center justify-center flex-shrink-0 transition-colors ${
                  isActive ? "text-[#FF4B3A]" : "text-muted-foreground group-hover:text-[#FF4B3A]"
                }`}>
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                </div>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/50 transition-all cursor-pointer">
            <Avatar className="size-9">
              <AvatarFallback className="bg-foreground text-background font-bold text-sm">AD</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-foreground truncate">Administrator</p>
              <p className="text-xs font-medium text-muted-foreground">Global Access</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-card/80 backdrop-blur-md border-b border-border flex items-center px-6 justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-muted-foreground hover:text-foreground mr-2">
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black tracking-tight text-foreground">Management Console</h2>
              <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-0 text-[10px] font-black uppercase tracking-wider">
                <span className="size-1.5 rounded-full bg-green-500 animate-pulse mr-1"></span>
                Live
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/admin/login">
              <Button variant="outline" size="sm" className="font-semibold">
                Log out
              </Button>
            </Link>
          </div>
        </header>
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
