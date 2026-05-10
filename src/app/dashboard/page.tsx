"use client";

import Link from "next/link";

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
  { name: "Embedded Systems", progress: 72, color: "#F59E0B" },
  { name: "UI/UX Design", progress: 45, color: "#EC4899" },
  { name: "Python Engineering", progress: 88, color: "#3B82F6" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#FFF3E3] to-transparent opacity-60 z-0" />
        
        <div className="relative z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-black uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" /> Active Session
          </span>
          <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight text-[#1A1A1A]">
            Welcome back, <span className="text-[#FF4B3A]">Aravind</span> 👋
          </h1>
          <p className="text-[#575757] text-base md:text-lg max-w-lg font-medium leading-relaxed">
            You have <span className="font-bold text-[#1A1A1A]">3 active projects</span> and 2 pending reviews. Keep building — your portfolio is growing!
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/dashboard/projects" className="flex items-center gap-2 px-6 py-3 bg-[#FF4B3A] text-white font-bold rounded-full hover:bg-[#FF6252] transition-all shadow-md shadow-orange-200">
              Continue Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/dashboard/portfolio" className="px-6 py-3 border border-gray-200 bg-white text-[#1A1A1A] font-bold rounded-full hover:bg-gray-50 transition-all">
              View Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Projects Completed", value: "8", icon: "✅", change: "+2 this month", color: "#FF4B3A" },
          { label: "Active Tracks", value: "3", icon: "📚", change: "2 in progress", color: "#3B82F6" },
          { label: "Certificates", value: "5", icon: "🏆", change: "1 pending", color: "#F59E0B" },
          { label: "Portfolio Score", value: "87%", icon: "⭐", change: "+5% this week", color: "#10B981" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm" style={{ backgroundColor: `${stat.color}10` }}>
                {stat.icon}
              </div>
              <span className="px-2.5 py-1 rounded-full bg-gray-50 text-[#575757] text-[10px] font-black uppercase tracking-wide border border-gray-100">
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-black text-[#1A1A1A] tracking-tight">{stat.value}</div>
            <div className="text-sm font-bold text-[#8C8C8C] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Projects */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black tracking-tight text-[#1A1A1A]">Active Projects</h2>
            <Link href="/dashboard/projects" className="text-sm font-bold text-[#FF4B3A] hover:underline flex items-center gap-1">
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="block rounded-2xl border border-gray-100 bg-[#FFFDFB] p-6 hover:bg-white hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#FF4B3A] transition-colors mb-1">
                      {project.title}
                    </h3>
                    <span className="text-xs font-black text-[#A1A1A1] uppercase tracking-wider">{project.track} Track</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                    project.status === "Review" 
                    ? "bg-yellow-50 text-yellow-600" 
                    : "bg-[#FFF3E3] text-[#FF4B3A]"
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                {/* Progress bar overhaul */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full bg-[#FF4B3A] rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-black text-[#1A1A1A] w-8 text-right">
                    {project.progress}%
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C8C8C]">
                  <svg className="w-4 h-4 text-[#FF4B3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Due: {project.deadline}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Track Progress */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
            <h2 className="text-xl font-black mb-6 tracking-tight text-[#1A1A1A]">Track Progress</h2>
            <div className="space-y-6">
              {trackProgress.map((track) => (
                <div key={track.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[15px] font-bold text-[#4A4A4A]">{track.name}</span>
                    <span className="text-sm font-black" style={{ color: track.color }}>
                      {track.progress}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-50 overflow-hidden border border-gray-100">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${track.progress}%`, backgroundColor: track.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
            <h2 className="text-xl font-black mb-6 tracking-tight text-[#1A1A1A]">Notifications</h2>
            <div className="space-y-4">
              {recentNotifications.map((notif, i) => (
                <div key={i} className="flex items-start gap-3 p-3 -mx-2 rounded-xl hover:bg-[#FFFDFB] transition-all">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    notif.type === "success" ? "bg-green-500" :
                    notif.type === "team" ? "bg-purple-500" :
                    "bg-[#FF4B3A]"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-[#1A1A1A] leading-tight mb-1">{notif.text}</p>
                    <p className="text-xs font-medium text-[#A1A1A1]">{notif.time}</p>
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
