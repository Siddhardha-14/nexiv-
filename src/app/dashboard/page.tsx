"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const activeProjects = [
  { id: "smart-home-iot", title: "Smart Home Automation System", track: "IoT", progress: 65, deadline: "May 25, 2026", status: "In Progress" },
  { id: "portfolio-builder", title: "Engineering Portfolio Generator", track: "Python", progress: 40, deadline: "Jun 2, 2026", status: "In Progress" },
  { id: "fintech-dashboard", title: "FinTech Analytics Dashboard", track: "UI/UX", progress: 85, deadline: "May 18, 2026", status: "Review" },
];

const recentNotifications = [
  { text: "Mentor approved your RTOS Scheduler submission", time: "2h ago", type: "success" },
  { text: "New project available: ML Data Pipeline", time: "5h ago", type: "info" },
  { text: "Team invite from Rahul for IoT project", time: "1d ago", type: "team" },
];

const trackProgress = [
  { name: "Embedded Systems", progress: 72, color: "#F59E0B", gradient: "from-amber-400 to-orange-500" },
  { name: "UI/UX Design", progress: 45, color: "#EC4899", gradient: "from-pink-500 to-rose-500" },
  { name: "Python Engineering", progress: 88, color: "#3B82F6", gradient: "from-blue-500 to-indigo-600" },
];

export default function DashboardPage() {
  const { user, userProfile } = useAuth();
  
  const firstName = userProfile?.fullName 
    ? userProfile.fullName.trim().split(/\s+/)[0] 
    : user?.displayName?.split(/\s+/)[0] || "Builder";

  return (
    <div className="flex flex-col gap-10 pb-16 w-full animate-fade-in">
      
      {/* Enhanced Hero Premium Welcome Card */}
      <div className="relative bg-gradient-to-br from-[#1E1E1E] to-[#111111] text-white rounded-[36px] p-8 md:p-14 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.15)] overflow-hidden group border border-white/[0.04]">
        {/* Absolute Abstract Background Geometry */}
        <div className="absolute top-[-50%] right-[-20%] w-[600px] h-[600px] bg-[#FF4B3A]/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#FF4B3A]/25 transition-all duration-1000" />
        <div className="absolute bottom-[-30%] left-[20%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')] opacity-10" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/5 text-[#FF8A65] text-[11px] font-black tracking-wider mb-6 border border-white/10 uppercase backdrop-blur-md">
              <span className="relative flex h-2 w-2 mr-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              LIVE STREAM ACTIVE
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-5 tracking-tight leading-[1.1] drop-shadow-sm">
              Welcome back, <br className="sm:hidden"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B3A] via-[#FF8A65] to-amber-400">
                {firstName}
              </span> 👋
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-9">
              Your velocity is running high! You possess <span className="text-white font-black border-b-2 border-[#FF4B3A]">3 ongoing modules</span> and 2 pending reviews waiting on the stack.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard/projects" className="group/btn flex items-center gap-3 px-8 py-4 bg-white text-[#111] font-black rounded-2xl hover:bg-[#FF4B3A] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-[#FF4B3A]/30">
                <span>Resume Workloads</span>
                <svg className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link href="/dashboard/portfolio" className="px-8 py-4 border border-white/15 bg-white/5 text-white font-black rounded-2xl hover:border-white/30 hover:bg-white/10 backdrop-blur-md transition-all hover:-translate-y-0.5">
                Showcase Stack
              </Link>
            </div>
          </div>

          {/* Modern radial progress layout */}
          <div className="hidden lg:flex w-40 h-40 rounded-full bg-white/5 border border-white/10 items-center justify-center relative shadow-2xl backdrop-blur-sm shrink-0">
             <div className="absolute inset-1.5 rounded-full border-[6px] border-white/5" />
             <div className="absolute inset-1.5 rounded-full border-[6px] border-transparent border-t-[#FF4B3A] border-r-[#FF8A65] animate-spin" style={{ animationDuration: '5s' }} />
             <div className="flex flex-col items-center">
                <span className="text-3xl font-black tracking-tighter text-white">78%</span>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Mastery</span>
             </div>
          </div>
        </div>
      </div>

      {/* Premium Metric Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {[
          { 
            label: "Modules Achieved", 
            value: "8", 
            change: "+2 this month", 
            color: "#FF4B3A", 
            bg: "from-orange-500/10 to-red-500/10",
            icon: (
              <svg className="w-6 h-6 text-[#FF4B3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )
          },
          { 
            label: "Active Tracks", 
            value: "3", 
            change: "2 in progress", 
            color: "#3B82F6", 
            bg: "from-blue-500/10 to-cyan-500/10",
            icon: (
              <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            )
          },
          { 
            label: "Certificates Earned", 
            value: "5", 
            change: "1 pending Verification", 
            color: "#F59E0B", 
            bg: "from-amber-500/10 to-yellow-500/10",
            icon: (
              <svg className="w-6 h-6 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            )
          },
          { 
            label: "System Rank Score", 
            value: "87%", 
            change: "Top 5% active", 
            color: "#10B981", 
            bg: "from-emerald-500/10 to-green-500/10",
            icon: (
              <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            )
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-black/[0.03] rounded-[28px] p-6 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
            <div className="flex items-center justify-between mb-5 relative z-10">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${stat.bg} shadow-sm border border-black/[0.02] transition-transform group-hover:scale-110 duration-300`}>
                {stat.icon}
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-black/[0.03] text-[#575757] text-[10px] font-extrabold uppercase tracking-wider border border-black/[0.01]">
                {stat.change}
              </span>
            </div>
            <div className="relative z-10">
              <div className="text-4xl font-black text-[#1A1A1A] tracking-tight group-hover:text-[#FF4B3A] transition-colors">{stat.value}</div>
              <div className="text-xs font-bold text-[#8C8C8C] tracking-wide uppercase mt-1.5">{stat.label}</div>
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-black/[0.01] rounded-tl-[100px] pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Core Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
        
        {/* Interactive Projects Card */}
        <div className="lg:col-span-2 bg-white border border-black/[0.03] rounded-[32px] p-7 md:p-10 shadow-sm relative">
          <div className="flex items-center justify-between mb-8">
            <div>
               <h2 className="text-2xl font-black tracking-tight text-[#1A1A1A]">Ongoing Pipelines</h2>
               <p className="text-sm font-semibold text-[#8C8C8C] mt-1">Modules under active review and deployment.</p>
            </div>
            <Link href="/dashboard/projects" className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F9FB] text-[#1A1A1A] hover:bg-[#FF4B3A] hover:text-white transition-all duration-300 hover:shadow-[0_10px_20px_-5px_rgba(255,75,58,0.3)] group">
              <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="flex flex-col gap-5 w-full">
            {activeProjects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="block rounded-[24px] border border-black/[0.03] bg-[#FCFCFD] p-6 md:p-7 hover:bg-white hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group border-l-[4px]"
                style={{ borderLeftColor: project.status === "Review" ? "#F59E0B" : "#FF4B3A" }}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 mb-2">
                       <span className="text-[9px] font-black text-[#FF4B3A] uppercase tracking-[0.2em] bg-[#FFF3E3] px-2 py-0.5 rounded-md">
                         {project.track} ENGINE
                       </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] group-hover:text-[#FF4B3A] transition-colors leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shrink-0 ${
                    project.status === "Review" 
                    ? "bg-amber-50 text-amber-600 border-amber-100" 
                    : "bg-blue-50 text-blue-600 border-blue-100"
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                {/* Fine tuned progress gauge */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C8C8C]">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Target: {project.deadline}
                    </div>
                    <span className="text-sm font-black text-[#1A1A1A]">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-black/[0.03] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF4B3A] via-[#FF8A65] to-[#FFC38A] rounded-full transition-all duration-1000 ease-out group-hover:shadow-[0_0_12px_rgba(255,75,58,0.3)]"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Hand Visual Stack */}
        <div className="flex flex-col gap-8 w-full">
          
          {/* Mastery Tracks Gauge */}
          <div className="bg-white border border-black/[0.03] rounded-[32px] p-7 md:p-8 shadow-sm">
            <h2 className="text-lg font-black mb-6 tracking-tight text-[#1A1A1A] uppercase tracking-wider text-xs font-black text-[#8C8C8C]">Expertise Vectors</h2>
            <div className="flex flex-col gap-6">
              {trackProgress.map((track) => (
                <div key={track.name} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-[#4A4A4A] group-hover:text-[#1A1A1A] transition-colors">{track.name}</span>
                    <span className="text-xs font-black" style={{ color: track.color }}>
                      {track.progress}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-black/[0.03] overflow-hidden p-[1px]">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${track.gradient} transition-all duration-700 ease-out opacity-90 group-hover:opacity-100`}
                      style={{ width: `${track.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Intelligence Log */}
          <div className="bg-white border border-black/[0.03] rounded-[32px] p-7 md:p-8 shadow-sm">
            <h2 className="text-lg font-black mb-6 tracking-tight text-[#1A1A1A] uppercase tracking-wider text-xs font-black text-[#8C8C8C]">Command Center Feed</h2>
            <div className="flex flex-col gap-1">
              {recentNotifications.map((notif, i) => (
                <div key={i} className="flex items-start gap-3.5 p-3 -mx-1 rounded-2xl hover:bg-[#FAFAFA] transition-all duration-200 cursor-pointer group border border-transparent hover:border-black/[0.02]">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 transition-all duration-300 group-hover:scale-125 shadow-[0_0_6px_rgba(0,0,0,0.1)] ${
                    notif.type === "success" ? "bg-[#10B981] shadow-[#10B981]/30" :
                    notif.type === "team" ? "bg-indigo-500 shadow-indigo-500/30" :
                    "bg-[#FF4B3A] shadow-[#FF4B3A]/30"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#2E2E2E] leading-snug mb-0.5 group-hover:text-[#FF4B3A] transition-colors">{notif.text}</p>
                    <p className="text-[10px] font-semibold text-[#A1A1A1] uppercase">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

