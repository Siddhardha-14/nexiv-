"use client";

const chartBars = [35, 48, 62, 55, 78, 85, 72, 90, 68, 95, 88, 100];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Overview</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Monitor platform performance and user growth</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs py-2 px-4 rounded-xl flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "1,247", change: "+12%", color: "#3B82F6", icon: "👥" },
          { label: "Active Students", value: "892", change: "+8%", color: "#10B981", icon: "🎓" },
          { label: "Revenue (MTD)", value: "₹4.2L", change: "+23%", color: "#00E5FF", icon: "💰" },
          { label: "Completions", value: "156", change: "+15%", color: "#F59E0B", icon: "🏆" },
        ].map((stat, i) => (
          <div key={i} className="stat-card p-5" style={{ "--stat-color": stat.color } as React.CSSProperties}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-md flex items-center justify-center text-xl border" style={{ background: `${stat.color}15`, borderColor: `${stat.color}30` }}>
                <span className="opacity-80">{stat.icon}</span>
              </div>
              <span className="badge badge-success">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold tracking-tight" style={{ color: stat.color }}>{stat.value}</div>
            <p className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-wider font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card-surface p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">User Growth</h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">Monthly active users over the last year</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />
              Users
            </div>
          </div>
        </div>
        <div className="flex items-end gap-2.5 h-52">
          {chartBars.map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="text-[10px] text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                {Math.round(height * 12.5)}
              </div>
              <div
                className="w-full rounded-t-sm transition-all duration-300 cursor-pointer hover:opacity-100"
                style={{
                  height: `${height}%`,
                  background: `var(--text-primary)`,
                  opacity: 0.8,
                }}
              />
              <span className="text-[10px] text-[var(--text-muted)] font-medium">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card-surface p-6">
          <h2 className="text-lg font-semibold mb-5 tracking-tight">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { text: "New student registered: Anita P.", time: "10 min ago", icon: "👤", color: "#3B82F6" },
              { text: "Project submission: ML Pipeline by Vikram", time: "1 hour ago", icon: "📦", color: "#10B981" },
              { text: "Certificate issued: Sneha R. - Networking", time: "3 hours ago", icon: "🏆", color: "#F59E0B" },
              { text: "New mentor application: Dr. Sharma", time: "5 hours ago", icon: "👨‍🏫", color: "#7C3AED" },
              { text: "Payment received: ₹499 from Rahul M.", time: "8 hours ago", icon: "💳", color: "#00E5FF" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 text-sm group hover:bg-[var(--bg-elevated)] p-3 -mx-3 rounded-lg transition-all cursor-pointer">
                <div
                  className="w-9 h-9 rounded-md flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: `${activity.color}12`, border: `1px solid ${activity.color}20` }}
                >
                  <span className="opacity-80">{activity.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[var(--text-primary)] font-medium leading-snug group-hover:text-white transition-colors truncate">{activity.text}</p>
                  <span className="text-[11px] text-[var(--text-muted)]">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track Performance */}
        <div className="card-surface p-6">
          <h2 className="text-lg font-semibold mb-5 tracking-tight">Track Performance</h2>
          <div className="space-y-5">
            {[
              { name: "Python Engineering", students: 312, completion: 78, color: "#3B82F6" },
              { name: "UI/UX Design", students: 256, completion: 72, color: "#EC4899" },
              { name: "IoT", students: 198, completion: 65, color: "#10B981" },
              { name: "Embedded Systems", students: 174, completion: 58, color: "#F59E0B" },
              { name: "Data Analytics", students: 148, completion: 82, color: "#06B6D4" },
              { name: "Networking", students: 89, completion: 45, color: "#8B5CF6" },
            ].map((track) => (
              <div key={track.name} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--text-secondary)] font-medium group-hover:text-[var(--text-primary)] transition-colors">{track.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[var(--text-muted)]">{track.students} students</span>
                    <span className="text-xs font-bold text-[var(--text-primary)]">{track.completion}%</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${track.completion}%`, background: `var(--text-primary)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
