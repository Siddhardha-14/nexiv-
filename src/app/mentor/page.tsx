"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

export default function MentorDashboardPage() {
  const { user, userProfile } = useAuth();
  const [pendingReviews, setPendingReviews] = useState<any[]>([]);
  const [allReviewsCount, setAllReviewsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const mentorName = userProfile?.fullName 
    ? userProfile.fullName.trim().split(/\s+/)[0] 
    : user?.displayName?.split(/\s+/)[0] || "Mentor";

  // ── 1. Realtime Pipeline Feed ──
  useEffect(() => {
    // Fetch all to extract global stats
    const allQ = query(collection(db, "submissions"));
    const unsubscribeAll = onSnapshot(allQ, (snap) => {
      setAllReviewsCount(snap.size);
    });

    // Fetch pending to display chronological queue
    const pendingQ = query(
      collection(db, "submissions"),
      where("status", "==", "pending"),
      orderBy("submittedAt", "desc")
    );

    const unsubscribePending = onSnapshot(pendingQ, (snapshot) => {
      const docs = snapshot.docs.map(doc => {
        const data = doc.data();
        let displayTime = "Recent";
        if (data.submittedAt?.toDate) {
          const diffMs = Date.now() - data.submittedAt.toDate().getTime();
          const diffMins = Math.floor(diffMs / 60000);
          const diffHours = Math.floor(diffMins / 60);
          if (diffMins < 60) displayTime = `${diffMins}m ago`;
          else if (diffHours < 24) displayTime = `${diffHours}h ago`;
          else displayTime = `${Math.floor(diffHours / 24)}d ago`;
        }

        return {
          id: doc.id,
          student: data.studentName || "Student",
          project: data.projectName || "Unknown Project",
          track: data.track || "CORE",
          submitted: displayTime,
          avatar: data.studentAvatar || "S",
        };
      });
      setPendingReviews(docs);
      setLoading(false);
    }, (err) => {
      console.error("Dashboard snapshot error:", err);
      setLoading(false);
    });

    return () => {
      unsubscribeAll();
      unsubscribePending();
    };
  }, []);

  const approvedCount = allReviewsCount - pendingReviews.length;

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      
      {/* Premium Command Welcome Banner */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] text-white rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden group border border-white/[0.03]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')] opacity-10" />
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#FF4B3A]/10 rounded-full blur-[80px] group-hover:bg-[#FF4B3A]/15 transition-all duration-1000 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-lg bg-white/5 text-[#FF8A65] border border-white/10 text-[10px] font-black tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse" />
            Critique Deck
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight leading-tight">
            Greetings, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B3A] to-[#FF8A65]">{mentorName}</span>.
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-medium max-w-xl">
            There are <span className="text-white font-black underline decoration-[#FF4B3A] decoration-2 underline-offset-4">{pendingReviews.length} architectural submissions</span> requiring your authoritative verification in the queue.
          </p>
        </div>
      </div>

      {/* Premium Visual Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: "Pending Queue", 
            value: String(pendingReviews.length), 
            color: "#FF4B3A",
            bg: "from-red-500/10 to-orange-500/10",
            icon: (
              <svg className="w-5 h-5 text-[#FF4B3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            )
          },
          { 
            label: "Certified Total", 
            value: String(approvedCount >= 0 ? approvedCount : 0), 
            color: "#10B981",
            bg: "from-emerald-500/10 to-teal-500/10",
            icon: (
              <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )
          },
          { 
            label: "Pool Aggregation", 
            value: String(allReviewsCount), 
            color: "#3B82F6",
            bg: "from-blue-500/10 to-indigo-500/10",
            icon: (
              <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )
          },
          { 
            label: "Velocity Rating", 
            value: "4.8", 
            color: "#F59E0B",
            bg: "from-amber-500/10 to-yellow-500/10",
            icon: (
              <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            )
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-black/[0.03] rounded-[24px] p-6 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${stat.bg} transition-transform group-hover:scale-110 duration-300`}>
              {stat.icon}
            </div>
            <div className="text-3xl font-black tracking-tight text-[#1A1A1A] group-hover:text-[#FF4B3A] transition-colors">{stat.value}</div>
            <div className="text-[10px] font-black tracking-wider uppercase text-[#8C8C8C] mt-1.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Interactive Review Queue Stack */}
      <div className="bg-white border border-black/[0.03] rounded-[32px] p-7 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-black text-[#1A1A1A] tracking-tight">Verification Pipeline</h2>
            <p className="text-xs font-bold text-[#8C8C8C] mt-1">Chronological engineering audit stack.</p>
          </div>
          <Link href="/mentor/reviews" className="inline-flex items-center gap-1.5 text-xs font-black text-[#FF4B3A] hover:text-[#E33A2B] tracking-wider uppercase border border-black/[0.03] px-3 py-1.5 rounded-xl hover:bg-[#FFF3E3]/50 transition-all">
            Display All 
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
        
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-[var(--text-secondary)] text-sm">
              <svg className="w-4 h-4 animate-spin mr-2 text-[#FF4B3A]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading pipeline feeds...
            </div>
          ) : pendingReviews.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-[24px] bg-[#FAFAFA]">
              <span className="text-3xl block mb-2">🎉</span>
              <p className="text-[15px] font-black text-[#1A1A1A]">Queue Fully Audited</p>
              <p className="text-xs font-bold text-[#8C8C8C] mt-1">No active items currently require your authoritative verification.</p>
            </div>
          ) : (
            pendingReviews.map((review) => (
              <div 
                key={review.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-[20px] border border-black/[0.03] bg-[#FCFCFD] hover:bg-white hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:border-[#FF4B3A]/20 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-[3px] h-full bg-transparent group-hover:bg-[#FF4B3A] transition-all duration-300" />
                
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[#FF4B3A]/10 text-[#FF4B3A] text-xs font-black uppercase shadow-sm shrink-0 border border-[#FF4B3A]/5">
                    {review.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-black text-[#1A1A1A] tracking-tight group-hover:text-[#FF4B3A] transition-colors mb-0.5 truncate capitalize">{review.project}</p>
                    <div className="flex flex-wrap items-center gap-y-1 text-xs text-[#8C8C8C] font-bold">
                      <span className="text-[#1A1A1A] capitalize">{review.student}</span>
                      <span className="mx-1.5 text-black/15">•</span>
                      <span className="inline-flex items-center gap-1 text-[#FF4B3A] tracking-wider text-[9px] font-black uppercase bg-[#FFF3E3] px-1.5 py-0.5 rounded-md">{review.track} TRACK</span>
                      <span className="mx-1.5 text-black/15">•</span>
                      <span>{review.submitted}</span>
                    </div>
                  </div>
                </div>
                
                <Link href="/mentor/reviews" className="group/btn self-start sm:self-center flex items-center gap-1.5 text-xs font-black bg-[#1A1A1A] text-white px-4 py-2.5 rounded-xl hover:bg-[#FF4B3A] shadow-md hover:shadow-[#FF4B3A]/20 transition-all">
                  <span>Audit File</span>
                  <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
