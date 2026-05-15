"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { projects } from "@/data/siteData";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useFormValidation, validateGithubUrl, validateUrl } from "@/hooks/useFormValidation";

export default function ProjectDetailPage() {
  const params = useParams();
  const { user, userProfile } = useAuth();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Live submission record fetched to render the Feedback tab dynamically
  const [existingSubmission, setExistingSubmission] = useState<any>(null);

  // Form hooks
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [note, setNote] = useState("");
  const [formError, setFormError] = useState("");
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const tabs = ["overview", "resources", "submit", "feedback"];
  
  const { validateField, getFieldState } = useFormValidation();

  // Find active project or fallback to default
  const currentProjectId = params.id as string;
  const currentProject = projects.find((p) => p.id === currentProjectId) || projects[0];

  // Check if user already submitted this project to render existing status/feedback
  useEffect(() => {
    async function fetchStatus() {
      if (!user || !currentProject) return;
      try {
        const q = query(
          collection(db, "submissions"),
          where("projectId", "==", currentProject.id),
          where("studentId", "==", user.uid),
          orderBy("submittedAt", "desc"),
          limit(1)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const subData = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
          setExistingSubmission(subData);
        }
      } catch (error) {
        console.error("Error loading existing submission:", error);
      }
    }
    fetchStatus();
  }, [user, currentProject]);

  // ── Validation Listeners ──
  useEffect(() => {
    if (githubUrl) {
      validateField("github", () => validateGithubUrl(githubUrl), 300);
    }
  }, [githubUrl, validateField]);

  useEffect(() => {
    if (demoUrl) {
      validateField("demo", () => validateUrl(demoUrl), 300);
    }
  }, [demoUrl, validateField]);

  useEffect(() => {
    if (videoUrl) {
      validateField("video", () => validateUrl(videoUrl), 300);
    }
  }, [videoUrl, validateField]);

  const githubState = getFieldState("github");
  const demoState = getFieldState("demo");
  const videoState = getFieldState("video");

  const isFormValid = githubUrl && githubState.isValid && 
                     (!demoUrl || demoState.isValid) && 
                     (!videoUrl || videoState.isValid);

  // ── AutoFill Helper ──
  const handleAutofill = useCallback(() => {
    const baseUsername = userProfile?.fullName 
      ? userProfile.fullName.toLowerCase().trim().replace(/\s+/g, "-") 
      : user?.displayName?.toLowerCase().trim().replace(/\s+/g, "-") 
      || user?.email?.split("@")[0] 
      || "engineer";
    
    const repoName = `nexiv-${currentProject.trackId}-${currentProject.id}`;
    setGithubUrl(`https://github.com/${baseUsername}/${repoName}`);
  }, [user, userProfile, currentProject]);

  // High-Stakes Interception: Triggers pre-submit ConfirmDialog
  const handleSubmitTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setShowConfirmSubmit(true);
  };

  // The real persistence handler called inside the ConfirmDialog
  const executeFinalSubmit = async () => {
    if (!user) {
      setFormError("Authentication required to dispatch to review queue.");
      setShowConfirmSubmit(false);
      return;
    }

    setSubmitting(true);
    setFormError("");

    try {
      const displayName = userProfile?.fullName || user.displayName || user.email?.split("@")[0] || "Student";
      const getInitials = (name: string) => {
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      };

      const docRef = await addDoc(collection(db, "submissions"), {
        projectId: currentProject.id,
        projectName: currentProject.title,
        track: currentProject.trackId.toUpperCase(),
        studentId: user.uid,
        studentName: displayName,
        studentAvatar: getInitials(displayName),
        githubUrl: githubUrl.trim(),
        demoUrl: demoUrl.trim() || null,
        videoUrl: videoUrl.trim() || null,
        note: note.trim() || null,
        status: "pending",
        submittedAt: serverTimestamp(),
        // Review fields default to null
        score: null,
        feedback: null,
        reviewedBy: null,
        reviewedAt: null,
      });

      setSubmitSuccess(true);
      setExistingSubmission({
        id: docRef.id,
        status: "pending",
        githubUrl,
        demoUrl,
        note,
        projectName: currentProject.title,
        track: currentProject.trackId.toUpperCase(),
      });
    } catch (error: any) {
      console.error("Firestore dispatch error:", error);
      setFormError("Deployment dispatch failure. Check active connectivity.");
    } finally {
      setSubmitting(false);
      setShowConfirmSubmit(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Breadcrumb & Navigation */}
      <nav className="flex items-center gap-3 text-sm font-bold">
        <Link 
          href="/dashboard/projects" 
          className="text-[#8C8C8C] hover:text-[#FF4B3A] transition-colors flex items-center gap-1.5 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-[#1A1A1A] truncate max-w-[200px]">{currentProject.title}</span>
      </nav>

      {/* Project Hero Header */}
      <div className="relative bg-white rounded-[32px] border border-gray-100 p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 rounded-3xl bg-[#FFF3E3] flex items-center justify-center text-4xl shadow-sm flex-shrink-0">
              {currentProject.trackId === "iot" ? "🌐" : 
               currentProject.trackId === "embedded-systems" ? "⚡" :
               currentProject.trackId === "ui-ux-design" ? "🎨" : "🐍"}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[#1A1A1A]">
                  {currentProject.title}
                </h1>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-50 text-[#FF4B3A] border border-orange-100/50">
                  {currentProject.trackId.toUpperCase()} Track
                </span>
              </div>
              <p className="text-[#666666] text-sm md:text-base font-medium max-w-2xl leading-relaxed">
                {currentProject.description}
              </p>

              {/* Meta Stats */}
              <div className="flex flex-wrap gap-5 mt-5 text-xs font-bold text-[#8C8C8C]">
                <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full">
                  <svg className="w-4 h-4 text-[#FF4B3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {currentProject.duration} Expected
                </span>
                <span className="flex items-center gap-1.5 bg-yellow-50 text-[#1A1A1A] px-2.5 py-1 rounded-full">
                  <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {currentProject.mentorRating}/5.0 Rating
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    existingSubmission?.status === "approved" ? "bg-emerald-500" : 
                    existingSubmission?.status === "pending" ? "bg-amber-500" : "bg-red-500/40"
                  }`} />
                  Status: {existingSubmission?.status ? existingSubmission.status.toUpperCase() : "Not Submitted"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Complexity Badge */}
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className="px-4 py-2 bg-yellow-50 text-yellow-700 text-xs font-black uppercase tracking-wider rounded-2xl border border-yellow-100 shadow-sm">
              {currentProject.difficulty}
            </span>
          </div>
        </div>

        {/* Tech Tags Horizontal List */}
        <div className="flex flex-wrap gap-2 mt-8 border-t border-gray-50 pt-6">
          {currentProject.technologies.map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-xl text-[11px] font-black bg-[#F5F7FA] text-[#575757] border border-gray-100">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Secondary Navigation (Tabs) */}
      <div className="flex justify-center md:justify-start">
        <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl border border-black/[0.02]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-extrabold capitalize transition-all duration-300 ${
                activeTab === tab
                  ? "bg-white text-[#1A1A1A] shadow-sm"
                  : "text-[#575757] hover:text-[#1A1A1A]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === "overview" && (
            <>
              <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
                <h2 className="text-xl font-black text-[#1A1A1A] mb-4 tracking-tight flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#FF4B3A] rounded-full" />
                  Problem Statement
                </h2>
                <p className="text-[#575757] text-base font-medium leading-relaxed">
                  Industrial demands prioritize real-world implementations rather than isolated theory. 
                  For the {currentProject.title}, you will craft an extensible, performant system targeting {currentProject.trackId} guidelines.
                </p>
                <p className="text-[#575757] text-base font-medium leading-relaxed mt-4">
                  Your solution should be optimized for concurrent access, modular system designs, and meet specific benchmarks required for the review cycle.
                </p>
              </div>

              <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
                <h2 className="text-xl font-black text-[#1A1A1A] mb-6 tracking-tight flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#FF4B3A] rounded-full" />
                  Learning Outcomes
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "Maintain architectural isolation principles",
                    "Connect system services to enterprise telemetry APIs",
                    "Establish optimized runtime build configs",
                    "Write detailed documentation schemas",
                    "Enforce standardized error mitigation layers",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-[#FAFAFA] rounded-2xl border border-gray-50 hover:bg-[#FFFDFB] hover:border-orange-50 transition-all">
                      <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-bold text-[#1A1A1A] text-[15px]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "resources" && (
            <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#1A1A1A] mb-6 tracking-tight flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#FF4B3A] rounded-full" />
                Project Assets
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Starter Code (GitHub)", icon: "📦", type: "Repository", color: "#F3E8FF" },
                  { name: "Architecture Diagram", icon: "📐", type: "PDF Specs", color: "#E0F2FE" },
                  { name: "Testing Configurations", icon: "📄", type: "Guides", color: "#DCFCE7" },
                  { name: "Walkthrough Tutorial", icon: "🎥", type: "Stream", color: "#FFEDD5" },
                ].map((resource, i) => (
                  <div 
                    key={i} 
                    className="group flex items-center gap-4 p-5 rounded-3xl border border-gray-100 bg-white hover:shadow-md hover:border-[#FF4B3A]/20 transition-all cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform" style={{ backgroundColor: resource.color }}>
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-black text-[#1A1A1A] mb-0.5">{resource.name}</p>
                      <p className="text-[11px] font-bold text-[#8C8C8C] uppercase tracking-wider">{resource.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "submit" && (
            <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#1A1A1A] mb-2 tracking-tight flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#FF4B3A] rounded-full" />
                Submit Implementation
              </h2>
              <p className="text-sm font-medium text-[#8C8C8C] mb-8 ml-4.5">
                Provide references for live reviews. Mentors review repository layouts and commits.
              </p>
              
              {submitSuccess ? (
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] rounded-3xl p-8 text-center space-y-4 animate-scale-in">
                  <div className="w-14 h-14 bg-[#DCFCE7] text-[#16A34A] rounded-2xl flex items-center justify-center mx-auto text-2xl">
                    🎉
                  </div>
                  <h3 className="text-lg font-black">Submission Dispatched Successfully!</h3>
                  <p className="text-sm text-[#166534] max-w-md mx-auto font-medium">
                    Your repository references have been pushed to the Instructor Verification Desk. Mentors will review your code within 48-72 hours.
                  </p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="bg-[#16A34A] hover:bg-[#15803D] text-white font-black px-6 py-2.5 rounded-xl text-sm transition-all shadow-sm"
                  >
                    View Submission Log
                  </button>
                </div>
              ) : existingSubmission && existingSubmission.status === "pending" ? (
                <div className="bg-[#FFFBEB] border border-[#FEF3C7] text-[#B45309] rounded-3xl p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 bg-[#FDE68A] rounded-xl flex items-center justify-center text-xl">⏳</span>
                    <h3 className="font-black">Awaiting Professional Evaluation</h3>
                  </div>
                  <p className="text-sm text-[#92400E] font-medium">
                    You have an active submission waiting for mentor review. If you committed new changes, they will reflect directly inside the linked GitHub repository:
                  </p>
                  <div className="p-3.5 bg-white rounded-xl border border-[#FDE68A] text-sm font-mono text-[#B45309] overflow-hidden text-ellipsis">
                    {existingSubmission.githubUrl}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitTrigger} className="space-y-6">
                  {formError && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2">
                      <span>🚨</span> {formError}
                    </div>
                  )}

                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <label className="block text-sm font-extrabold text-[#1A1A1A]">GitHub Repository URL *</label>
                      <button
                        type="button"
                        onClick={handleAutofill}
                        className="inline-flex items-center text-[11px] font-black text-[#FF4B3A] uppercase tracking-wider hover:underline gap-1 bg-[#FFF3E3] px-2.5 py-1 rounded-md transition-colors duration-300 hover:bg-[#FFEDD5]"
                      >
                        ✨ Auto-fill Sandbox
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        required
                        type="url"
                        placeholder="https://github.com/username/project-repo"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className={`w-full pl-4 pr-12 py-3.5 rounded-2xl bg-[#FAFAFA] border text-[#1A1A1A] text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 ${
                          githubUrl
                            ? githubState.isValid
                              ? "border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 bg-emerald-50/10"
                              : "border-red-200 focus:border-red-500 focus:ring-red-500 bg-red-50/10"
                            : "border-gray-200 focus:border-[#FF4B3A] focus:ring-[#FF4B3A]"
                        }`}
                      />
                      {githubUrl && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          {githubState.isValid ? (
                            <span className="w-5 h-5 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">✓</span>
                          ) : (
                            <span className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">!</span>
                          )}
                        </div>
                      )}
                    </div>
                    {githubUrl && !githubState.isValid && githubState.message && (
                      <p className="text-[11px] font-bold text-red-500 mt-1.5 ml-1 animate-fade-in flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {githubState.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-extrabold text-[#1A1A1A] mb-2">Deployed Demo (Optional)</label>
                      <div className="relative">
                        <input
                          type="url"
                          placeholder="https://your-demo-app.web.app"
                          value={demoUrl}
                          onChange={(e) => setDemoUrl(e.target.value)}
                          className={`w-full pl-4 pr-12 py-3.5 rounded-2xl bg-[#FAFAFA] border text-[#1A1A1A] text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 ${
                            demoUrl
                              ? demoState.isValid
                                ? "border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 bg-emerald-50/10"
                                : "border-red-200 focus:border-red-500 focus:ring-red-500 bg-red-50/10"
                              : "border-gray-200 focus:border-[#FF4B3A] focus:ring-[#FF4B3A]"
                          }`}
                        />
                        {demoUrl && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {demoState.isValid ? (
                              <span className="w-5 h-5 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center">✓</span>
                            ) : (
                              <span className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">!</span>
                            )}
                          </div>
                        )}
                      </div>
                      {demoUrl && !demoState.isValid && demoState.message && (
                        <p className="text-[11px] font-bold text-red-500 mt-1.5 ml-1 flex items-center gap-1">{demoState.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-extrabold text-[#1A1A1A] mb-2">Walkthrough Video (Optional)</label>
                      <div className="relative">
                        <input
                          type="url"
                          placeholder="Loom, YouTube, or Drive link"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          className={`w-full pl-4 pr-12 py-3.5 rounded-2xl bg-[#FAFAFA] border text-[#1A1A1A] text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 ${
                            videoUrl
                              ? videoState.isValid
                                ? "border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 bg-emerald-50/10"
                                : "border-red-200 focus:border-red-500 focus:ring-red-500 bg-red-50/10"
                              : "border-gray-200 focus:border-[#FF4B3A] focus:ring-[#FF4B3A]"
                          }`}
                        />
                        {videoUrl && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {videoState.isValid ? (
                              <span className="w-5 h-5 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center">✓</span>
                            ) : (
                              <span className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">!</span>
                            )}
                          </div>
                        )}
                      </div>
                      {videoUrl && !videoState.isValid && videoState.message && (
                        <p className="text-[11px] font-bold text-red-500 mt-1.5 ml-1 flex items-center gap-1">{videoState.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-extrabold text-[#1A1A1A] mb-2">Submission Notes</label>
                    <textarea
                      rows={4}
                      placeholder="Write brief descriptions of your architecture patterns or queries you have for the mentor..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full px-4 py-4 rounded-2xl bg-[#FAFAFA] border border-gray-200 text-[#1A1A1A] text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#FF4B3A] focus:ring-1 focus:ring-[#FF4B3A] transition-all resize-none"
                    />
                  </div>

                  <div className="relative group/tip w-full md:w-auto">
                    <button 
                      disabled={!isFormValid || submitting}
                      type="submit" 
                      className="btn-primary w-full md:w-auto py-4 px-10 rounded-2xl text-base font-black shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Publishing to Cloud...
                        </>
                      ) : (
                        <>
                          <span>Push Submission to Mentor</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                    
                    {!isFormValid && (
                      <div className="absolute bottom-full left-0 mb-2 hidden group-hover/tip:block bg-gray-900 text-white text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-10 animate-slide-up">
                        ⚠️ A valid GitHub repository URL is required to dispatch
                      </div>
                    )}
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#1A1A1A] mb-6 tracking-tight flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#FF4B3A] rounded-full" />
                Mentor Evaluation
              </h2>
              
              {existingSubmission && existingSubmission.feedback ? (
                <div className="space-y-6 animate-fade-in">
                  <div className={`relative p-8 rounded-[28px] bg-[#FFFDFB] border ${existingSubmission.status === "approved" ? "border-[#10B981]/20" : "border-amber-500/20"}`}>
                    <div className={`absolute -top-3 right-6 px-3 py-1 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm ${existingSubmission.status === "approved" ? "bg-[#10B981]" : "bg-[#F59E0B]"}`}>
                      {existingSubmission.status}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF4B3A] to-[#FF8A65] flex items-center justify-center text-white text-lg font-black shadow-md">
                        ME
                      </div>
                      <div>
                        <p className="text-base font-black text-[#1A1A1A]">Official Staff Reviewer</p>
                        <p className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wide mt-0.5">Industry Mentor • Verified Implementation</p>
                      </div>
                      <div className="sm:ml-auto text-right">
                        <div className={`text-3xl font-black tracking-tighter ${existingSubmission.status === "approved" ? "text-[#10B981]" : "text-[#F59E0B]"}`}>
                          {existingSubmission.score}<span className="text-sm text-[#A1A1A1] tracking-normal font-bold">/100</span>
                        </div>
                      </div>
                    </div>

                    <div className="prose prose-sm text-[#575757] max-w-none">
                      <p className="font-medium text-[15px] leading-relaxed whitespace-pre-line">
                        &quot;{existingSubmission.feedback}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-[#FAFAFA] rounded-3xl border border-gray-100">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto text-2xl border border-gray-50 shadow-sm mb-4">
                    📋
                  </div>
                  <h3 className="text-base font-black text-[#1A1A1A]">No Assessments Logged Yet</h3>
                  <p className="text-sm text-[#8C8C8C] font-medium max-w-xs mx-auto mt-1">
                    Feedback evaluations from Mentors will show up here as soon as your implementation is audited.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Sidebar Widgets */}
        <div className="space-y-8">
          {/* Required Stack Card */}
          <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
            <h3 className="text-base font-black text-[#1A1A1A] mb-6 tracking-tight">System Stack</h3>
            <div className="space-y-4">
              {currentProject.technologies.slice(0, 5).map((tech, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-[#FAFAFA] border border-gray-50 rounded-2xl">
                  <span className="text-xl">🛠️</span>
                  <span className="text-[14px] font-bold text-[#1A1A1A]">{tech}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Support Banner */}
          <div className="bg-[#FFF3E3] border border-[#FFDDB5] rounded-[32px] p-6">
             <div className="flex items-center gap-3 mb-3">
               <span className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-xl shadow-sm">💡</span>
               <p className="font-black text-[#1A1A1A] text-[15px]">Need technical help?</p>
             </div>
             <p className="text-[#666666] text-xs font-medium leading-relaxed mb-4">Schedule a 15-min 1:1 debugging session with an industry mentor.</p>
             <button className="text-[#FF4B3A] font-black text-sm uppercase tracking-wider hover:underline">
               Book Office Hours &rarr;
             </button>
          </div>
        </div>
      </div>

      {/* High-Stakes Pre-Submission Confirmation Barrier */}
      <ConfirmDialog
        open={showConfirmSubmit}
        onClose={() => setShowConfirmSubmit(false)}
        onConfirm={executeFinalSubmit}
        title="Dispatch Repository to Review Desk?"
        description={`You are about to send your implementation of "${currentProject.title}" to the official reviewer queue. Mentors are assigned automatically. Make sure your master/main branch holds your latest changes.`}
        confirmLabel="Confirm Dispatch"
        cancelLabel="Wait, Go Back"
        variant="info"
        loading={submitting}
      />
    </div>
  );
}
