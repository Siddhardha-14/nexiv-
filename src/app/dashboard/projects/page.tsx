"use client";

import Link from "next/link";
import { projects } from "@/data/siteData";

const statuses = ["All Projects", "In Progress", "Review", "Completed"];

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#1A1A1A]">Curriculum Projects</h1>
          <p className="text-base font-medium text-[#8C8C8C] mt-1">
            Practical engineering building blocks for your portfolio.
          </p>
        </div>
      </div>

      {/* Filter Segmented Control */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex p-1.5 bg-gray-100 rounded-2xl inline-flex">
          {statuses.map((s) => (
            <button
              key={s}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                s === "All Projects"
                  ? "bg-white text-[#1A1A1A] shadow-sm"
                  : "text-[#575757] hover:text-[#1A1A1A]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/dashboard/projects/${project.id}`}
            className="group bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(255,75,58,0.12)] transition-all duration-500 flex flex-col transform hover:-translate-y-1"
          >
            <div className="h-40 bg-[#FFFDFB] border-b border-gray-50 flex items-center justify-center relative overflow-hidden">
              <div className="absolute w-32 h-32 bg-orange-100/50 blur-3xl rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-700" />
              
              <span className="relative z-10 text-5xl group-hover:scale-110 transition-transform duration-300">
                {project.trackId === "iot" && "🌐"}
                {project.trackId === "python" && "🐍"}
                {project.trackId === "embedded-systems" && "⚡"}
                {project.trackId === "ui-ux-design" && "🎨"}
                {project.trackId === "networking" && "🔗"}
                {project.trackId === "data-analytics" && "📊"}
              </span>
              
              <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                project.difficulty === "Beginner" ? "bg-green-50 text-green-600" :
                project.difficulty === "Intermediate" ? "bg-yellow-50 text-yellow-600" :
                "bg-red-50 text-red-600"
              }`}>
                {project.difficulty}
              </span>
            </div>
            
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF4B3A] transition-colors leading-snug line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm font-medium text-[#666666] mb-5 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                {project.technologies.slice(0, 3).map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#F5F7FA] text-[#575757]">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs font-bold text-[#8C8C8C]">
                <span className="flex items-center gap-1.5">
                   <svg className="w-4 h-4 text-[#FF4B3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   {project.duration}
                </span>
                <span className="flex items-center gap-1 text-[#1A1A1A] bg-yellow-50 px-2 py-0.5 rounded-full">
                  <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  {project.mentorRating}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
