"use client";

import { tracks } from "@/data/siteData";

const enrolledTracks = ["embedded-systems", "ui-ux-design", "python"];

export default function TracksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Skill Tracks</h1>
        <p className="text-[var(--text-secondary)] text-sm">
          Explore and enroll in engineering skill tracks
        </p>
      </div>

      {/* Enrolled Tracks */}
      <div>
        <h2 className="text-lg font-semibold mb-4">My Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks
            .filter((t) => enrolledTracks.includes(t.id))
            .map((track) => (
              <div
                key={track.id}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/40 p-5 card-hover"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                    style={{ background: `${track.color}15` }}
                  >
                    {track.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{track.title}</h3>
                    <span className="text-xs text-[var(--text-muted)]">{track.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-2 rounded-full bg-[var(--bg-primary)]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.floor(Math.random() * 60 + 30)}%`,
                        background: track.color,
                      }}
                    />
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">{track.projectCount} projects</span>
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-success)]/10 text-[var(--color-success)]">
                  Enrolled
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Available Tracks */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Explore Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks
            .filter((t) => !enrolledTracks.includes(t.id))
            .map((track) => (
              <div
                key={track.id}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/40 p-5 card-hover cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                    style={{ background: `${track.color}15` }}
                  >
                    {track.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{track.title}</h3>
                    <span className="text-xs text-[var(--text-muted)]">{track.duration}</span>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3 line-clamp-2">
                  {track.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)]">{track.projectCount} projects</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: `${track.color}15`, color: track.color }}
                  >
                    {track.difficulty}
                  </span>
                </div>
                <button className="w-full mt-3 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  Enroll Now
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
