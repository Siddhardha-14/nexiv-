"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <div className="min-h-screen bg-[var(--color-bg-dashboard)] flex text-[#1A1A1A]">
      {mobileOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 w-72 flex flex-col bg-white shadow-sm border-r border-gray-100 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >

        <div className="h-20 flex items-center px-6 border-b border-gray-50 relative z-10">
          <Link href="/" className="flex items-center gap-2.5">
             <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] shadow-md flex items-center justify-center font-black text-white text-lg">N</div>
             <span className="text-xl font-black tracking-tight text-[#1A1A1A]">Nexiv</span>
          </Link>
          <span className="ml-auto px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-wider">
            Admin
          </span>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[15px] font-bold transition-all duration-200 group ${isActive ? "bg-[#F8F9FB] text-[#1A1A1A]" : "text-[#575757] hover:bg-[#FFF8F2] hover:text-[#1A1A1A]"}`}
              >
                <div className={`flex items-center justify-center flex-shrink-0 transition-colors ${isActive ? "text-[#FF4B3A]" : "text-[#A1A1A1] group-hover:text-[#FF4B3A]"}`}>
                  <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                </div>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-50">
          <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-[#FFF3E3]/50 transition-all cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-black text-sm">AD</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#1A1A1A] truncate">Administrator</p>
              <p className="text-xs font-medium text-[#8C8C8C]">Global Access</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-50 flex items-center px-6 justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-[#575757] mr-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black tracking-tight text-[#1A1A1A]">Management Console</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Live
              </span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#FFF8F2]">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
