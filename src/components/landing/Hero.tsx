"use client";

import Link from "next/link";
import { stats } from "@/data/siteData";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-[80px]">

      {/* Content */}
      <div className="section-container relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs font-medium text-[var(--text-secondary)] mb-10 animate-slide-up">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)]" />
          Now open for early access
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-[-0.02em] mb-7 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-[var(--text-muted)]">Learner</span>
          <br />
          to <span className="text-[var(--text-primary)]">Builder.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Master engineering skills through{" "}
          <span className="text-[var(--text-primary)] font-semibold">real-world projects</span>,{" "}
          <span className="text-[var(--text-primary)] font-semibold">expert mentorship</span>, and{" "}
          <span className="text-[var(--text-primary)] font-semibold">portfolio-driven</span> career acceleration.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Link
            href="/auth/signup"
            className="btn-primary text-base py-4 px-9 rounded-xl inline-flex items-center gap-2 w-full sm:w-auto justify-center group"
          >
            Start Building Free
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <a
            href="#tracks"
            className="btn-secondary text-base py-4 px-9 rounded-xl inline-flex items-center gap-2 w-full sm:w-auto justify-center group"
          >
            Explore Tracks
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Stats Bar */}
        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="border border-[var(--border-subtle)] bg-[var(--bg-secondary)] rounded-xl p-7 md:p-9 inline-flex flex-wrap gap-10 md:gap-16 justify-center">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-1.5 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-[var(--text-muted)] font-medium uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
