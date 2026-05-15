"use client";

import { useState } from "react";

const certificates = [
  { title: "Smart Home Automation System", track: "IoT", date: "Apr 15, 2026", code: "NXV-IOT-2026-0847", score: 92 },
  { title: "Real-Time Task Scheduler", track: "Embedded Systems", date: "Mar 20, 2026", code: "NXV-EMB-2026-0623", score: 88 },
  { title: "FinTech Analytics Dashboard", track: "UI/UX Design", date: "Feb 10, 2026", code: "NXV-UIX-2026-0415", score: 95 },
  { title: "ML Data Pipeline System", track: "Data Analytics", date: "Jan 5, 2026", code: "NXV-DAT-2026-0201", score: 90 },
  { title: "Python API Server", track: "Python Engineering", date: "Dec 12, 2025", code: "NXV-PYT-2025-1198", score: 87 },
];

export default function CertificatesPage() {
  return (
    <div className="space-y-10 animate-fade-in pb-10">
      
      {/* Enhanced Premium Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-black/[0.05] pb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-black tracking-widest text-amber-600 uppercase">Verifiable Credentials</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1A1A1A]">Professional Recognition</h1>
          <p className="text-[#575757] font-medium mt-1 text-sm md:text-base">
            Displaying verified architectural completions and peer-validated benchmarks.
          </p>
        </div>
        <div className="inline-flex items-center px-4 py-2 bg-white border border-black/[0.03] rounded-2xl shadow-sm self-start md:self-auto">
          <div className="flex -space-x-1 mr-3">
            <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-xs">🏆</div>
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs">📜</div>
          </div>
          <span className="text-sm font-bold text-[#1A1A1A]">{certificates.length} Earned</span>
        </div>
      </div>

      {/* Luxury Certificate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certificates.map((cert, i) => (
          <div
            key={i}
            className="group relative rounded-[32px] border border-black/[0.05] bg-white overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
          >
            {/* Shimmering Hover Beam */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none z-20" />

            {/* The Certificate 'Face' Cover */}
            <div className="h-48 bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#111111] flex items-center justify-center relative overflow-hidden select-none">
              {/* Abstract Luxury Line Pattern BG */}
              <svg className="absolute inset-0 w-full h-full opacity-20 text-white/40 group-hover:scale-105 transition-transform duration-1000" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 Q25,50 50,0 T100,0 M0,20 Q25,70 50,20 T100,20 M0,40 Q25,90 50,40 T100,40 M0,60 Q25,110 50,60 T100,60 M0,80 Q25,130 50,80 T100,80" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
              <div className="absolute top-[-50%] right-[-30%] w-64 h-64 bg-amber-500/15 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center px-6">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/15 backdrop-blur-md shadow-xl mb-3 group-hover:scale-110 group-hover:border-amber-400/40 transition-all duration-500">
                  <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="text-[10px] font-black tracking-[0.25em] text-white/60 uppercase mb-1">Engineering Credentials</div>
                <h4 className="text-white font-black tracking-wide text-sm px-2 truncate max-w-xs">{cert.title}</h4>
              </div>

              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-black tracking-wider bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 uppercase backdrop-blur-sm">
                VERIFIED
              </span>
            </div>

            {/* Bottom Metadata Info Segment */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1">
                <div className="inline-flex items-center gap-1 text-[10px] font-black text-[#FF4B3A] tracking-wider uppercase mb-2.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  {cert.track} Track
                </div>
                <h3 className="text-lg font-black text-[#1A1A1A] mb-1 leading-snug group-hover:text-[#FF4B3A] transition-colors">{cert.title}</h3>
                <p className="text-xs text-[#8C8C8C] font-bold mb-5">Conferred: {cert.date} • Score Benchmark: <span className="text-[#1A1A1A]">{cert.score}%</span></p>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-black/[0.03] mt-auto">
                <code className="text-[11px] tracking-wide text-[#575757] font-black bg-[#F8F9FB] px-3 py-1.5 rounded-xl border border-black/[0.02] font-mono">
                  {cert.code}
                </code>
                <button className="group/btn flex items-center gap-2 text-sm font-black text-[#1A1A1A] hover:text-[#FF4B3A] transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-[#F8F9FB] group-hover/btn:bg-[#FFF3E3] text-inherit flex items-center justify-center transition-all group-hover/btn:scale-105">
                    <svg className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <span className="hidden sm:inline">Retrieve</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

