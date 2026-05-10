"use client";

import { testimonials } from "@/data/siteData";

export default function SuccessShowcase() {
  return (
    <section className="relative section-padding overflow-hidden bg-[var(--bg-primary)]">

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label justify-center">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            Built by <span className="text-[var(--text-primary)]">Students</span>,{" "}
            Hired by <span className="text-[var(--text-primary)]">Industry</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
            Real outcomes from real students. See how Nexiv projects and
            portfolios helped them land engineering roles.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
              <div
                key={t.id}
                className="group card-surface border border-[var(--border-subtle)] p-7 hover:bg-[var(--bg-elevated)] transition-all duration-300"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Quote Icon */}
                <div className="mb-5">
                  <svg className="w-8 h-8 text-[var(--text-muted)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
                  </svg>
                </div>

              {/* Quote Text */}
              <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed mb-7 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center font-bold text-[var(--text-primary)] text-sm flex-shrink-0">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] truncate">
                    {t.name}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] truncate">
                    {t.role} @ {t.company}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex gap-0.5 mb-1 justify-end">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">
                    {t.projectsCompleted} projects
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Metrics */}
        <div className="mt-20">
          <div className="max-w-3xl mx-auto">
            <div className="border border-[var(--border-subtle)] bg-[var(--bg-secondary)] rounded-2xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: "95%", label: "Students Placed" },
                  { value: "4.8★", label: "Avg Rating" },
                  { value: "500+", label: "Portfolios Built" },
                  { value: "50+", label: "Partner Companies" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-1.5 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-widest">
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
