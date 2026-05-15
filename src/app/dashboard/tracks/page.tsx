"use client";

import { tracks } from "@/data/siteData";

const enrolledTracks = ["embedded-systems", "ui-ux-design", "python"];

export default function TracksPage() {
  return (
    <div className="space-y-10 pb-12">
      {/* Page Header */}
      <div className="relative bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4B3A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10">
          <span className="px-3 py-1 bg-[#FFF3E3] text-[#FF4B3A] text-[10px] font-black uppercase tracking-[0.15em] rounded-lg inline-block mb-4 border border-[#FF4B3A]/10">
            Skill Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1A1A1A] mb-3">
            Expertise <span className="text-[#FF4B3A]">Rails</span>
          </h1>
          <p className="text-[#666666] text-base font-medium max-w-xl leading-relaxed">
            Accelerate your engineering career by mastering end-to-end project pipelines curated by industry architects.
          </p>
        </div>
      </div>

      {/* My Tracks Section */}
      <section>
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-xl font-black tracking-tight text-[#1A1A1A] flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#FF4B3A] rounded-full" />
            In-Flight Tracks
          </h2>
          <span className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wider">{enrolledTracks.length} Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks
            .filter((t) => enrolledTracks.includes(t.id))
            .map((track) => {
               const randomProgress = Math.floor(Math.random() * 60 + 30);
               return (
                <div
                  key={track.id}
                  className="group relative bg-white border border-gray-100 rounded-[32px] p-7 shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-orange-50 transition-colors duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${track.color}10` }}
                      >
                        {track.icon}
                      </div>
                      <span className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#10B981]/20">
                        Active
                      </span>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-black text-[#1A1A1A] group-hover:text-[#FF4B3A] transition-colors mb-1">{track.title}</h3>
                      <span className="text-xs font-bold text-[#8C8C8C] flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {track.duration} Coursework
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-[#1A1A1A]">
                         <span>Rail Progress</span>
                         <span>{randomProgress}%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-[#F5F5F5] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 shadow-inner"
                          style={{
                            width: `${randomProgress}%`,
                            backgroundColor: track.color,
                          }}
                        />
                      </div>
                      <div className="flex justify-between pt-2">
                         <span className="text-[11px] font-bold text-[#8C8C8C]">{track.projectCount} Comprehensive Projects</span>
                      </div>
                    </div>
                  </div>
                </div>
               );
            })}
        </div>
      </section>

      {/* Available Tracks */}
      <section>
        <div className="flex items-center justify-between mb-6 mt-6 px-2">
          <h2 className="text-xl font-black tracking-tight text-[#1A1A1A] flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#FF4B3A] rounded-full" />
            Expand Your Horizons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks
            .filter((t) => !enrolledTracks.includes(t.id))
            .map((track) => (
              <div
                key={track.id}
                className="group bg-white border border-gray-100 rounded-[32px] p-7 shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-gray-50 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${track.color}08` }}
                  >
                    {track.icon}
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border"
                    style={{ 
                      backgroundColor: `${track.color}10`, 
                      color: track.color, 
                      borderColor: `${track.color}20` 
                    }}
                  >
                    {track.difficulty}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-black text-[#1A1A1A] mb-2 group-hover:text-[#FF4B3A] transition-colors leading-snug">{track.title}</h3>
                  <p className="text-sm font-medium text-[#666666] leading-relaxed line-clamp-2">
                    {track.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 mb-6 text-xs font-bold text-[#8C8C8C]">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {track.projectCount} Builds
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {track.duration}
                  </span>
                </div>

                <button className="w-full mt-auto py-3.5 rounded-2xl border-2 border-black/[0.03] bg-[#FAFAFA] text-sm font-extrabold text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-300 shadow-sm group/btn flex items-center justify-center gap-2">
                  Initialize Integration
                  <svg className="w-4 h-4 transform transition-transform group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
