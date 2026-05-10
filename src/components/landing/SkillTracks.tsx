"use client";

import { tracks } from "@/data/siteData";

export default function SkillTracks() {
  return (
    <section id="tracks" className="relative section-padding overflow-hidden bg-background">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label justify-center">
            Skill Tracks
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight text-foreground">
            Engineering{" "}
            <span className="text-[#2563EB]">Skill Tracks</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Choose your engineering path. Each track combines structured learning
            with hands-on projects guided by industry mentors.
          </p>
        </div>

        {/* Track Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className="group relative bg-card border border-border rounded-2xl p-7 shadow-sm hover:shadow-xl hover:border-[#2563EB]/30 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="relative size-14 mb-5 flex items-center justify-center rounded-xl bg-[#2563EB]/10 text-2xl group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                {track.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-[#2563EB] transition-colors">
                {track.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">
                {track.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {track.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground group-hover:bg-[#2563EB]/10 group-hover:text-[#2563EB] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <svg className="size-4 text-[#0D9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {track.projectCount} Projects
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="size-4 text-[#0D9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {track.duration}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#F97316]/10 text-[10px] font-bold uppercase text-[#F97316]">
                  {track.difficulty}
                </span>
              </div>

              {/* Arrow Indicator */}
              <div className="absolute bottom-7 right-7 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                 <div className="size-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white shadow-lg">
                   <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
