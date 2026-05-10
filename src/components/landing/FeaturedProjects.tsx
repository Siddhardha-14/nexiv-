"use client";

import { projects } from "@/data/siteData";

const difficultyColors: Record<string, string> = {
  Beginner: "#10B981",
  Intermediate: "#F59E0B",
  Advanced: "#EF4444",
};

const trackGradients: Record<string, [string, string]> = {
  iot: ["#10B981", "#06B6D4"],
  python: ["#3B82F6", "#2563FF"],
  "embedded-systems": ["#F59E0B", "#EF4444"],
  "ui-ux-design": ["#EC4899", "#7C3AED"],
  networking: ["#8B5CF6", "#3B82F6"],
  "data-analytics": ["#06B6D4", "#10B981"],
};

export default function FeaturedProjects() {
  return (
    <section id="projects" className="relative section-padding overflow-hidden bg-[var(--bg-primary)]">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label justify-center">
            Real Projects
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            Featured <span className="text-[var(--text-primary)]">Projects</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
            Build industry-grade projects that solve real engineering problems.
            Each project adds directly to your professional portfolio.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const gradient = trackGradients[project.trackId] || ["#2563FF", "#00E5FF"];
            return (
              <div
                key={project.id}
                className="group card-surface border border-[var(--border-subtle)] overflow-hidden cursor-pointer hover:bg-[var(--bg-elevated)] transition-all duration-300"
              >
                {/* Project Image Area */}
                <div
                  className="relative h-48 flex items-center justify-center overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
                >

                  {/* Track icon */}
                  <div className="relative z-10 w-16 h-16 rounded-xl flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-105 border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                    <span className="opacity-80">
                      {project.trackId === "iot" && "🌐"}
                      {project.trackId === "python" && "🐍"}
                      {project.trackId === "embedded-systems" && "⚡"}
                      {project.trackId === "ui-ux-design" && "🎨"}
                      {project.trackId === "networking" && "🔗"}
                      {project.trackId === "data-analytics" && "📊"}
                    </span>
                  </div>

                  {/* Difficulty Badge */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)]">
                    {project.difficulty}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-[var(--text-primary)] group-hover:text-white transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[10px] font-medium text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                    <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {project.duration}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-primary)]">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {project.mentorRating}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
