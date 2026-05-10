"use client";

import { projects, tracks } from "@/data/siteData";

export default function AdminProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Project Management</h1>
          <p className="text-[var(--text-secondary)] text-sm">{projects.length} projects • {tracks.length} tracks</p>
        </div>
        <button className="btn-primary text-sm py-2 px-4 rounded-lg">+ Add Project</button>
      </div>

      {/* Tracks Overview */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Tracks</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {tracks.map((track) => (
            <div key={track.id} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/40 p-4 text-center card-hover cursor-pointer">
              <div className="text-2xl mb-2">{track.icon}</div>
              <p className="text-xs font-semibold">{track.title}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{track.projectCount} projects</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-subtle)]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Project</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Track</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Difficulty</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Duration</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Rating</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-primary)]/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[var(--text-primary)]">{project.title}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.technologies.slice(0, 2).map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary-light)]">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)] capitalize">{project.trackId.replace("-", " ")}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      project.difficulty === "Beginner" ? "bg-[#10B981]/10 text-[#10B981]" :
                      project.difficulty === "Intermediate" ? "bg-[#F59E0B]/10 text-[#F59E0B]" :
                      "bg-[#EF4444]/10 text-[#EF4444]"
                    }`}>
                      {project.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{project.duration}</td>
                  <td className="px-4 py-3 text-[var(--color-warning)]">★ {project.mentorRating}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button className="text-xs text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors font-medium">Edit</button>
                      <button className="text-xs text-[var(--color-error)] hover:text-[var(--color-error)] transition-colors font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
