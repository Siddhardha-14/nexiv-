"use client";

import { useState } from "react";

const submissions = [
  { id: 1, student: "Aravind K.", avatar: "AK", project: "Smart Home Automation", track: "IoT", submitted: "2 hours ago", github: "https://github.com/aravind/smart-home", status: "pending" },
  { id: 2, student: "Priya S.", avatar: "PS", project: "FinTech Dashboard", track: "UI/UX", submitted: "5 hours ago", github: "https://github.com/priya/fintech-dash", status: "pending" },
  { id: 3, student: "Vikram T.", avatar: "VT", project: "ML Data Pipeline", track: "Data Analytics", submitted: "1 day ago", github: "https://github.com/vikram/ml-pipeline", status: "pending" },
  { id: 4, student: "Sneha R.", avatar: "SR", project: "Network Health Monitor", track: "Networking", submitted: "2 days ago", github: "https://github.com/sneha/net-monitor", status: "approved" },
  { id: 5, student: "Rahul M.", avatar: "RM", project: "RTOS Task Scheduler", track: "Embedded", submitted: "3 days ago", github: "https://github.com/rahul/rtos", status: "revision" },
];

export default function ReviewsPage() {
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState("");

  const filtered = filter === "all" ? submissions : submissions.filter((s) => s.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Submission Reviews</h1>
        <p className="text-[var(--text-secondary)] text-sm">Review and provide feedback on student submissions</p>
      </div>

      {/* Filters */}
      <div className="flex gap-1 p-1 rounded-lg bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)] w-fit">
        {["all", "pending", "approved", "revision"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
              filter === f ? "bg-[var(--color-primary)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submissions List */}
        <div className="space-y-3">
          {filtered.map((sub) => (
            <div
              key={sub.id}
              onClick={() => setSelectedId(sub.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedId === sub.id
                  ? "border-[var(--color-primary)]/50 bg-[var(--color-primary)]/5"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 hover:border-[var(--color-primary)]/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {sub.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{sub.project}</p>
                  <p className="text-xs text-[var(--text-muted)]">{sub.student} • {sub.track} • {sub.submitted}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  sub.status === "approved" ? "bg-[var(--color-success)]/10 text-[var(--color-success)]" :
                  sub.status === "revision" ? "bg-[var(--color-warning)]/10 text-[var(--color-warning)]" :
                  "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                }`}>
                  {sub.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Review Panel */}
        {selectedId && (
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 p-6 lg:sticky lg:top-24 h-fit">
            <h3 className="text-lg font-semibold mb-4">Review Submission</h3>
            <div className="mb-4 p-3 rounded-lg bg-[var(--bg-primary)]/30 border border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--text-muted)] mb-1">GitHub Repository</p>
              <p className="text-sm text-[var(--color-accent)]">{submissions.find((s) => s.id === selectedId)?.github}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Score (out of 100)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="92"
                className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-primary)]/50 border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Feedback</label>
              <textarea
                rows={5}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide detailed feedback..."
                className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-primary)]/50 border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
              />
            </div>

            <div className="flex gap-2">
              <button className="btn-primary flex-1 py-2.5 rounded-lg text-sm flex items-center justify-center gap-1.5">
                ✅ Approve
              </button>
              <button className="flex-1 py-2.5 rounded-lg text-sm font-semibold border border-[var(--color-warning)] text-[var(--color-warning)] hover:bg-[var(--color-warning)]/10 transition-colors">
                🔄 Request Revision
              </button>
              <button className="py-2.5 px-4 rounded-lg text-sm font-semibold border border-[var(--color-error)]/30 text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors">
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
