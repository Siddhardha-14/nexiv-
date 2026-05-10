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
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="card-surface p-7 md:p-9 border border-[var(--border-subtle)]">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge badge-primary">🎯 Active</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
            Welcome back, <span className="text-[var(--text-primary)]">Aravind</span> 👋
          </h1>
          <p className="text-[var(--text-secondary)] text-sm md:text-[15px] max-w-lg leading-relaxed">
            You have 3 active projects and 2 pending reviews. Keep building —
            your portfolio is growing!
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/dashboard/projects" className="btn-primary flex items-center gap-2">
              Continue Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/dashboard/portfolio" className="btn-secondary">
              View Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Projects Completed", value: "8", icon: "✅", change: "+2 this month", color: "#10B981" },
          { label: "Active Tracks", value: "3", icon: "📚", change: "2 in progress", color: "#3B82F6" },
          { label: "Certificates", value: "5", icon: "🏆", change: "1 pending", color: "#F59E0B" },
          { label: "Portfolio Score", value: "87%", icon: "⭐", change: "+5% this week", color: "#00E5FF" },
        ].map((stat, i) => (
          <div key={i} className="stat-card p-5" style={{ "--stat-color": stat.color } as React.CSSProperties}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-md flex items-center justify-center text-xl border" style={{ background: `${stat.color}15`, borderColor: `${stat.color}30` }}>
                <span className="opacity-80">{stat.icon}</span>
              </div>
              <span className="badge badge-success">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">{stat.value}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects */}
        <div className="lg:col-span-2 card-surface p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold tracking-tight">Active Projects</h2>
            <Link href="/dashboard/projects" className="text-xs text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors font-medium flex items-center gap-1">
              View All
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="space-y-3">
            {activeProjects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="block rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 hover:bg-[var(--bg-elevated)] transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-[var(--text-muted)] mt-0.5">{project.track} Track</span>
                  </div>
                  <span className={`badge ${
                    project.status === "Review" ? "badge-warning" : "badge-primary"
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="progress-bar flex-1">
                    <div
                      className="progress-fill"
                      style={{ width: `${project.progress}%`, background: `var(--text-primary)` }}
                    />
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] font-semibold w-10 text-right">
                    {project.progress}%
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-[var(--text-muted)]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Due: {project.deadline}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Track Progress */}
          <div className="card-surface p-6">
            <h2 className="text-lg font-semibold mb-5 tracking-tight">Track Progress</h2>
            <div className="space-y-5">
              {trackProgress.map((track) => (
                <div key={track.name} className="group">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-sm text-[var(--text-secondary)] font-medium">{track.name}</span>
                    <span className="text-xs font-bold" style={{ color: track.color }}>
                      {track.progress}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${track.progress}%`, background: track.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="card-surface p-6">
            <h2 className="text-lg font-semibold mb-5 tracking-tight">Notifications</h2>
            <div className="space-y-4">
              {recentNotifications.map((notif, i) => (
                <div key={i} className="flex items-start gap-3 text-sm group p-3 -mx-3 rounded-lg hover:bg-[var(--bg-elevated)] transition-all">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ring-4 ${
                    notif.type === "success" ? "bg-[var(--color-success)] ring-[var(--color-success)]/10" :
                    notif.type === "team" ? "bg-[var(--color-accent)] ring-[var(--color-accent)]/10" :
                    "bg-[var(--color-primary)] ring-[var(--color-primary)]/10"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[var(--text-primary)] font-medium leading-snug group-hover:text-white transition-colors">{notif.text}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{notif.time}</p>
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
