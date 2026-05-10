"use client";

import { tracks } from "@/data/siteData";

export default function SkillTracks() {
  return (
    <section id="tracks" className="relative section-padding overflow-hidden bg-[#FFFDFB]">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-md bg-[#FFECE8] text-[#FF4B3A] text-xs font-bold uppercase tracking-wider mb-3">
            Skill Tracks
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-5 tracking-tight text-[#1A1A1A]">
            Engineering <span className="text-[#FF4B3A]">Skill Tracks</span>
          </h2>
          <p className="text-[#575757] max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Choose your engineering path. Each track combines structured learning
            with hands-on projects guided by industry mentors.
          </p>
        </div>

        {/* Track Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className="group relative bg-white border border-gray-100 rounded-[32px] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_-10px_rgba(255,75,58,0.15)] cursor-pointer transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >

              {/* Icon */}
              <div className="relative w-14 h-14 mb-6 flex items-center justify-center rounded-2xl bg-[#FFF3E3] text-3xl group-hover:bg-[#FF4B3A] group-hover:text-white transition-colors duration-300">
                {track.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-3 text-[#1A1A1A] group-hover:text-[#FF4B3A] transition-colors">
                {track.title}
              </h3>
              <p className="text-[#666666] text-[15px] leading-relaxed mb-6 line-clamp-3 font-medium">
                {track.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {track.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#F5F7FA] text-xs font-bold text-[#575757] group-hover:bg-[#FFE5D3] group-hover:text-[#D14000] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between pt-5 border-t border-gray-50 mt-auto">
                <div className="flex items-center gap-4 text-xs font-bold text-[#8C8C8C]">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#FF4B3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {track.projectCount} Projects
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#FF4B3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {track.duration}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-orange-50 text-[10px] font-black uppercase text-[#FF4B3A]">
                  {track.difficulty}
                </span>
              </div>

              {/* Arrow Indicator */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                 <div className="w-8 h-8 rounded-full bg-[#FF4B3A] flex items-center justify-center text-white shadow-lg">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
