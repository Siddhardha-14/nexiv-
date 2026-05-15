"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { projects as allProjects, tracks } from "@/data/siteData";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Tooltip from "@/components/ui/Tooltip";

export default function AdminProjectsPage() {
  const [projectList, setProjectList] = useState(allProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<typeof allProjects[0] | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [undoCountdown, setUndoCountdown] = useState(0);

  // Undo deletion state
  const [undoItem, setUndoItem] = useState<{ project: typeof allProjects[0]; index: number } | null>(null);
  const undoTimer = useRef<NodeJS.Timeout | null>(null);

  // Search filter
  const filteredProjects = searchQuery.trim()
    ? projectList.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.trackId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : projectList;

  // Clear undo timer on unmount
  useEffect(() => {
    return () => {
      if (undoTimer.current) clearTimeout(undoTimer.current);
    };
  }, []);

  // Undo countdown
  useEffect(() => {
    if (undoCountdown <= 0) return;
    const interval = setInterval(() => {
      setUndoCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [undoCountdown]);

  // ── Delete with undo ──
  const handleDeleteConfirm = useCallback(() => {
    if (!deleteTarget) return;
    const index = projectList.findIndex((p) => p.id === deleteTarget.id);
    if (index === -1) return;

    // Remove from list
    setProjectList((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setUndoItem({ project: deleteTarget, index });
    setDeleteTarget(null);
    setShowDeleteDialog(false);
    setUndoCountdown(5);

    // Auto-clear undo after 5 seconds (permanent delete)
    if (undoTimer.current) clearTimeout(undoTimer.current);
    undoTimer.current = setTimeout(() => {
      setUndoItem(null);
      setUndoCountdown(0);
      // In production, call the permanent delete API here
    }, 5000);
  }, [deleteTarget, projectList]);

  const handleUndo = useCallback(() => {
    if (!undoItem) return;
    if (undoTimer.current) clearTimeout(undoTimer.current);

    // Reinsert at original index
    setProjectList((prev) => {
      const next = [...prev];
      next.splice(undoItem.index, 0, undoItem.project);
      return next;
    });
    setUndoItem(null);
    setUndoCountdown(0);
  }, [undoItem]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Project Management</h1>
          <p className="text-[var(--text-secondary)] text-sm">{projectList.length} projects • {tracks.length} tracks</p>
        </div>
        <Tooltip content="Project creation coming in v2.0" position="bottom">
          <button
            className="btn-primary text-sm py-2 px-4 rounded-lg opacity-60 cursor-not-allowed coming-soon-badge"
            disabled
          >
            + Add Project
          </button>
        </Tooltip>
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

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#A1A1A1]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search projects by name, track, or technology..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--bg-surface)]/40 border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results count */}
      {searchQuery && (
        <p className="text-xs text-[var(--text-muted)]">
          {filteredProjects.length} result{filteredProjects.length !== 1 ? "s" : ""} found
        </p>
      )}

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
              {filteredProjects.map((project) => (
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
                      <button
                        onClick={() => {
                          setDeleteTarget(project);
                          setShowDeleteDialog(true);
                        }}
                        className="text-xs text-[var(--color-error)] hover:text-red-700 transition-colors font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Undo Toast */}
      {undoItem && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 toast-undo">
          <div className="flex flex-col rounded-2xl bg-[#1A1A1A] shadow-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center gap-4 px-5 py-3 text-white">
              <span className="text-sm font-medium">
                &quot;{undoItem.project.title}&quot; deleted
              </span>
              <button
                onClick={handleUndo}
                className="text-sm font-bold text-[#FF4B3A] hover:text-[#FF6D5E] transition-colors uppercase tracking-wider"
              >
                Undo
              </button>
            </div>
            {/* Countdown progress bar */}
            <div className="h-[3px] bg-white/10">
              <div
                className="h-full bg-[#FF4B3A] rounded-r-full transition-all duration-1000 ease-linear"
                style={{ width: `${(undoCountdown / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleDeleteConfirm}
        title={`Delete "${deleteTarget?.title}"?`}
        description={`This will permanently remove "${deleteTarget?.title}" (${deleteTarget?.trackId.replace("-", " ")} track, ${deleteTarget?.difficulty} difficulty, ${deleteTarget?.technologies.length} technologies) from the platform. All student submissions associated with this project will also be affected. You'll have 5 seconds to undo.`}
        confirmLabel="Delete Project"
        cancelLabel="Keep Project"
        variant="danger"
      />
    </div>
  );
}
