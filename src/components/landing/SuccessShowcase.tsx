"use client";

import { testimonials } from "@/data/siteData";

export default function SuccessShowcase() {
  return (
    <section className="relative section-padding overflow-hidden bg-muted/30">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label justify-center">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight text-foreground">
            Built by{" "}
            <span className="text-[#2563EB]">Students</span>,{" "}
            Hired by{" "}
            <span className="text-[#0D9488]">Industry</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Real outcomes from real students. See how Nexiv projects and
            portfolios helped them land engineering roles.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-[#2563EB]/20 transition-all duration-300"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <svg className="size-8 text-[#2563EB]/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
                </svg>
              </div>

              {/* Quote Text */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="size-11 rounded-full bg-gradient-to-br from-[#2563EB] to-[#0D9488] flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {t.name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {t.role} @ {t.company}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex gap-0.5 mb-1 justify-end">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg key={i} className="size-3.5 text-[#F97316]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {t.projectsCompleted} projects
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Metrics */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-8 shadow-xl border border-[#334155]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: "95%", label: "Students Placed", color: "#3B82F6" },
                  { value: "4.8★", label: "Avg Rating", color: "#F97316" },
                  { value: "500+", label: "Portfolios Built", color: "#14B8A6" },
                  { value: "50+", label: "Partner Companies", color: "#A78BFA" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1.5 tracking-tight" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
