"use client";

import Link from "next/link";
import { projects } from "@/data/siteData";

const statuses = ["All", "In Progress", "Review", "Completed"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Projects</h1>
        <p className="text-[var(--text-secondary)] text-sm">
          Build real-world engineering projects
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-1 p-1 rounded-lg bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)]">
          {statuses.map((s) => (
            <button
              key={s}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                s === "All"
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-1 p-1 rounded-lg bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)]">
          {difficulties.map((d) => (
            <button
              key={d}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                d === "All"
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/dashboard/projects/${project.id}`}
            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/40 overflow-hidden card-hover group"
          >
            <div className="h-32 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-primary)] flex items-center justify-center relative">
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {project.trackId === "iot" && "🌐"}
                {project.trackId === "python" && "🐍"}
                {project.trackId === "embedded-systems" && "⚡"}
                {project.trackId === "ui-ux-design" && "🎨"}
                {project.trackId === "networking" && "🔗"}
                {project.trackId === "data-analytics" && "📊"}
              </span>
              <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                project.difficulty === "Beginner" ? "bg-[#10B981]/20 text-[#10B981]" :
                project.difficulty === "Intermediate" ? "bg-[#F59E0B]/20 text-[#F59E0B]" :
                "bg-[#EF4444]/20 text-[#EF4444]"
              }`}>
                {project.difficulty}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-1 group-hover:text-white transition-colors line-clamp-1">
                {project.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.technologies.slice(0, 3).map((t) => (
                  <span key={t} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary-light)]">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>{project.duration}</span>
                <span className="flex items-center gap-1 text-[var(--color-warning)]">
                  ★ {project.mentorRating}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
