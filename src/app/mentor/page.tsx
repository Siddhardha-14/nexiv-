"use client";

import Link from "next/link";

const pendingReviews = [
  { student: "Aravind K.", project: "Smart Home Automation", track: "IoT", submitted: "2 hours ago", avatar: "AK" },
  { student: "Priya S.", project: "FinTech Dashboard", track: "UI/UX", submitted: "5 hours ago", avatar: "PS" },
  { student: "Vikram T.", project: "ML Data Pipeline", track: "Data Analytics", submitted: "1 day ago", avatar: "VT" },
];

export default function MentorDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="card-surface p-7 md:p-9">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2 tracking-tight">Welcome back, Rajesh.</h1>
        <p className="text-[var(--text-secondary)] text-sm">You have <span className="font-medium text-[var(--text-primary)]">{pendingReviews.length}</span> submissions waiting for review.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Pending Reviews", value: "3", icon: "📋", color: "var(--color-warning)" },
          { label: "Approved This Week", value: "12", icon: "✅", color: "var(--color-success)" },
          { label: "Students Assigned", value: "28", icon: "👨‍🎓", color: "var(--color-primary)" },
          { label: "Avg Rating", value: "4.8", icon: "⭐", color: "#F59E0B" },
        ].map((stat, i) => (
          <div key={i} className="stat-card p-5" style={{ "--stat-color": stat.color } as React.CSSProperties}>
            <div className="w-10 h-10 rounded-md flex items-center justify-center text-xl mb-4 border" style={{ background: `${stat.color}15`, borderColor: `${stat.color}30` }}>
              <span className="opacity-80">{stat.icon}</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Pending Reviews */}
      <div className="card-surface p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Pending Reviews</h2>
          <Link href="/mentor/reviews" className="text-xs text-[var(--color-primary)] hover:text-[var(--color-accent)]">View All →</Link>
        </div>
        <div className="space-y-3">
          {pendingReviews.map((review, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)] transition-all group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-primary)] text-sm font-semibold flex-shrink-0 bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                {review.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{review.project}</p>
                <p className="text-xs text-[var(--text-muted)]">{review.student} • {review.track} • {review.submitted}</p>
              </div>
              <Link href="/mentor/reviews" className="btn-primary text-xs py-1.5 px-3 rounded-lg">
                Review
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
