"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = ["overview", "resources", "submit", "feedback"];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <Link href="/dashboard/projects" className="hover:text-[var(--text-primary)] transition-colors">
          Projects
        </Link>
        <span>/</span>
        <span className="text-[var(--text-primary)]">Smart Home Automation System</span>
      </nav>

      {/* Project Header */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/40 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🌐</span>
              <h1 className="text-2xl font-bold">Smart Home Automation System</h1>
            </div>
            <p className="text-[var(--text-secondary)] text-sm max-w-2xl">
              Build a complete IoT-based home automation system with sensor networks,
              mobile app control, and cloud dashboard integration.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-warning)]/10 text-[var(--color-warning)]">
              Intermediate
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
              IoT Track
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-6 text-sm text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            4 weeks
          </span>
          <span className="flex items-center gap-1.5 text-[var(--color-warning)]">
            ★ 4.8 rating
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            234 students
          </span>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {["ESP32", "MQTT", "React Native", "Firebase"].map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary-light)] border border-[var(--color-primary)]/20">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)] w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-[var(--color-primary)] text-white"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 p-6">
              <h2 className="text-lg font-semibold mb-3">Problem Statement</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Modern homes lack integrated automation systems that are both affordable and customizable.
                Build a complete smart home solution that monitors environmental conditions, controls appliances
                remotely, and provides a real-time dashboard for data visualization. The system should support
                multiple sensor types and be expandable for future devices.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 p-6">
              <h2 className="text-lg font-semibold mb-3">Learning Outcomes</h2>
              <ul className="space-y-2">
                {[
                  "Design and implement IoT sensor networks",
                  "Configure MQTT broker for device communication",
                  "Build real-time cloud dashboards with Firebase",
                  "Develop cross-platform mobile app with React Native",
                  "Implement OTA firmware updates for ESP32",
                  "Apply security best practices for IoT systems",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <svg className="w-4 h-4 text-[var(--color-success)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 p-5">
              <h3 className="text-sm font-semibold mb-3">Required Tools</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                {["ESP32 DevKit", "DHT22 Sensor", "Relay Module", "Arduino IDE", "Node.js", "Firebase Account"].map((tool, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--bg-surface)]/30 p-5">
              <h3 className="text-sm font-semibold mb-2">Progress</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-3 rounded-full bg-[var(--bg-primary)]">
                  <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />
                </div>
                <span className="text-sm font-bold text-[var(--text-primary)]">65%</span>
              </div>
              <button className="btn-primary w-full py-2.5 rounded-lg text-sm">
                Continue Building
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "resources" && (
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 p-6">
          <h2 className="text-lg font-semibold mb-4">Project Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: "Starter Code (GitHub)", icon: "📦", type: "Repository" },
              { name: "Circuit Schematics", icon: "📐", type: "PDF" },
              { name: "MQTT Configuration Guide", icon: "📄", type: "Documentation" },
              { name: "Firebase Setup Tutorial", icon: "🎥", type: "Video" },
              { name: "ESP32 Datasheet", icon: "📋", type: "Datasheet" },
              { name: "Mobile App Figma Design", icon: "🎨", type: "Figma" },
            ].map((resource, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)]/30 hover:border-[var(--color-primary)]/20 transition-colors cursor-pointer">
                <span className="text-2xl">{resource.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{resource.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{resource.type}</p>
                </div>
                <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "submit" && (
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 p-6 max-w-2xl">
          <h2 className="text-lg font-semibold mb-4">Submit Your Project</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">GitHub Repository Link</label>
              <input
                type="url"
                placeholder="https://github.com/username/project"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)]/50 border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Demo Video URL</label>
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)]/50 border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Upload Files (PDF, ZIP)</label>
              <div className="border-2 border-dashed border-[var(--border-subtle)] rounded-xl p-8 text-center hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer">
                <svg className="w-10 h-10 mx-auto mb-3 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-[var(--text-secondary)]">Drag & drop or click to upload</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Max 50MB per file</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Notes for Mentor</label>
              <textarea
                rows={3}
                placeholder="Any specific areas you'd like feedback on..."
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)]/50 border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
              />
            </div>
            <button type="button" className="btn-primary py-3 px-6 rounded-xl text-sm">
              Submit for Review
            </button>
          </form>
        </div>
      )}

      {activeTab === "feedback" && (
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 p-6 max-w-2xl">
          <h2 className="text-lg font-semibold mb-4">Mentor Feedback</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-[var(--color-success)]/20 bg-[var(--color-success)]/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center text-white text-xs font-bold">
                  RK
                </div>
                <div>
                  <p className="text-sm font-medium">Rajesh Kumar</p>
                  <p className="text-xs text-[var(--text-muted)]">Senior IoT Engineer • 2 days ago</p>
                </div>
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-bold bg-[var(--color-success)]/10 text-[var(--color-success)]">
                  Approved
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Excellent implementation of the MQTT broker setup. The sensor calibration code is well-structured.
                Consider adding error handling for WiFi reconnection scenarios. Overall, great work — this demonstrates
                strong IoT engineering skills. Score: <span className="font-bold text-[var(--color-success)]">92/100</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
