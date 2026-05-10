"use client";

import { projects } from "@/data/siteData";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="relative section-padding overflow-hidden bg-[#FFF8F2]">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-md bg-orange-100 text-[#FF4B3A] text-xs font-bold uppercase tracking-wider mb-3">
            Real Projects
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-5 tracking-tight text-[#1A1A1A]">
            Featured <span className="text-[#FF4B3A]">Projects</span>
          </h2>
          <p className="text-[#575757] max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Build industry-grade projects that solve real engineering problems.
            Each project adds directly to your professional portfolio.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            return (
              <div
                key={project.id}
                className="group bg-white rounded-[32px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(255,75,58,0.12)] transition-all duration-500 flex flex-col transform hover:-translate-y-1.5"
              >
                {/* Project Image Area */}
                <div
                  className="relative h-52 flex items-center justify-center overflow-hidden bg-[#FFFDFB] border-b border-gray-50"
                >
                  {/* Background Accents for visual flair */}
                  <div className="absolute w-40 h-40 rounded-full bg-orange-100 blur-3xl opacity-40 scale-0 group-hover:scale-100 transition-transform duration-700" />
                  
                  {/* Track icon */}
                  <div className="relative z-10 w-20 h-20 rounded-3xl bg-white shadow-md flex items-center justify-center text-4xl transition-transform duration-500 group-hover:scale-110">
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
                  <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] font-black uppercase bg-white text-[#1A1A1A] shadow-sm tracking-wider">
                    {project.difficulty}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-3 text-[#1A1A1A] group-hover:text-[#FF4B3A] transition-colors line-clamp-1 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-[#666666] text-[15px] leading-relaxed mb-6 line-clamp-2 font-medium">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] text-[11px] font-bold text-[#575757]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-5 border-t border-gray-50 mt-auto">
                    <span className="flex items-center gap-2 text-xs font-bold text-[#8C8C8C]">
                      <svg className="w-4 h-4 text-[#FF4B3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {project.duration}
                    </span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-50">
                      <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-bold text-[#1A1A1A]">{project.mentorRating} Rating</span>
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
