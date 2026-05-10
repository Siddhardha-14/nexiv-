"use client";

import { projects } from "@/data/siteData";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="relative section-padding overflow-hidden bg-muted/30">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label justify-center">
            Real Projects
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight text-foreground">
            Featured{" "}
            <span className="text-[#0D9488]">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Build industry-grade projects that solve real engineering problems.
            Each project adds directly to your professional portfolio.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            return (
              <div
                key={project.id}
                className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:border-[#0D9488]/30 transition-all duration-300 flex flex-col transform hover:-translate-y-1"
              >
                {/* Project Image Area */}
                <div className="relative h-48 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2563EB]/5 to-[#0D9488]/5 border-b border-border">
                  {/* Background Accent */}
                  <div className="absolute size-32 rounded-full bg-[#0D9488]/10 blur-2xl opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Track icon */}
                  <div className="relative z-10 size-16 rounded-2xl bg-card shadow-lg flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 border border-border">
                    <span>
                      {project.trackId === "iot" && "🌐"}
                      {project.trackId === "python" && "🐍"}
                      {project.trackId === "embedded-systems" && "⚡"}
                      {project.trackId === "ui-ux-design" && "🎨"}
                      {project.trackId === "networking" && "🔗"}
                      {project.trackId === "data-analytics" && "📊"}
                    </span>
                  </div>

                  {/* Difficulty Badge */}
                  <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase bg-card text-foreground shadow-sm border border-border tracking-wide">
                    {project.difficulty}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-[#0D9488] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <svg className="size-4 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {project.duration}
                    </span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F97316]/10">
                      <svg className="size-3.5 text-[#F97316]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-semibold text-[#F97316]">{project.mentorRating}</span>
                    </div>
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
