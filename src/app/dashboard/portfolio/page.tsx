"use client";

import Link from "next/link";

const portfolioProjects = [
  { title: "Smart Home Automation System", track: "IoT", tech: ["ESP32", "MQTT", "Firebase"], score: 92, date: "Apr 2026" },
  { title: "Real-Time Task Scheduler", track: "Embedded Systems", tech: ["C", "STM32", "FreeRTOS"], score: 88, date: "Mar 2026" },
  { title: "FinTech Analytics Dashboard", track: "UI/UX Design", tech: ["Figma", "React", "D3.js"], score: 95, date: "Feb 2026" },
  { title: "ML Data Pipeline System", track: "Data Analytics", tech: ["Python", "Airflow", "Docker"], score: 90, date: "Jan 2026" },
];

const skills = ["IoT", "Embedded C", "Python", "React", "MQTT", "Firebase", "Figma", "Docker", "RTOS", "REST APIs"];

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Portfolio</h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Your auto-generated engineering portfolio
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm py-2 px-4 rounded-lg flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
          <button className="btn-primary text-sm py-2 px-4 rounded-lg flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/40 overflow-hidden">
        {/* Profile Header */}
        <div className="relative p-8 bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--bg-surface)] to-[var(--color-accent)]/10">

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
              AK
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">Aravind Kumar</h2>
              <p className="text-[var(--text-secondary)] text-sm mt-1">
                IoT & Embedded Systems Engineer | Building Connected Solutions
              </p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                <a href="#" className="text-xs text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
                <a href="#" className="text-xs text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="md:ml-auto flex gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-[var(--text-primary)]">8</div>
                <div className="text-xs text-[var(--text-muted)]">Projects</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[var(--text-primary)]">5</div>
                <div className="text-xs text-[var(--text-muted)]">Certificates</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[var(--text-primary)]">91%</div>
                <div className="text-xs text-[var(--text-muted)]">Avg Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="p-6 border-t border-[var(--border-subtle)]">
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-[var(--text-muted)]">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary-light)] border border-[var(--color-primary)]/20">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="p-6 border-t border-[var(--border-subtle)]">
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-[var(--text-muted)]">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioProjects.map((project, i) => (
              <div key={i} className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/30 hover:border-[var(--color-primary)]/20 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-semibold">{project.title}</h4>
                  <span className="text-xs font-bold text-[var(--color-success)]">{project.score}%</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mb-2">{project.track} • {project.date}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((t) => (
                    <span key={t} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[var(--bg-surface)] text-[var(--text-secondary)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Public URL */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 p-4 flex items-center gap-3">
        <svg className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span className="text-sm text-[var(--text-secondary)] flex-1 truncate">
          nexiv.dev/portfolio/<span className="text-[var(--color-accent)]">aravind-kumar</span>
        </span>
        <button className="text-xs text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors font-medium">
          Copy Link
        </button>
      </div>
    </div>
  );
}
