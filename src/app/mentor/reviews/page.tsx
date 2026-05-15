"use client";

import { useState, useEffect, useCallback } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, serverTimestamp } from "firebase/firestore";

const FEEDBACK_MAX = 2000;

const FEEDBACK_TEMPLATES = [
  "Clean code structure",
  "Good documentation",
  "Missing unit tests",
  "Needs error handling",
  "Solid architecture",
  "Add code comments",
];

export default function ReviewsPage() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);

  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(85); // Smart default: median good score
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRevisionDialog, setShowRevisionDialog] = useState(false);
  const [showCloseGuard, setShowCloseGuard] = useState(false);
  const [pendingClose, setPendingClose] = useState(false);

  const [processingReview, setProcessingReview] = useState(false);

  // ── 1. Connect Live Firestore Submissions Listener ──
  useEffect(() => {
    const q = query(collection(db, "submissions"), orderBy("submittedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedSubmissions = snapshot.docs.map((doc) => {
        const data = doc.data();
        // Fallback calculation for fuzzy time diff
        let displayTime = "Some time ago";
        if (data.submittedAt?.toDate) {
          const diffMs = Date.now() - data.submittedAt.toDate().getTime();
          const diffMins = Math.floor(diffMs / 60000);
          const diffHours = Math.floor(diffMins / 60);
          const diffDays = Math.floor(diffHours / 24);
          if (diffMins < 60) displayTime = `${diffMins} minutes ago`;
          else if (diffHours < 24) displayTime = `${diffHours} hours ago`;
          else displayTime = `${diffDays} days ago`;
        }

        return {
          id: doc.id,
          ...data,
          submitted: displayTime,
        };
      });
      setSubmissions(loadedSubmissions);
      setLoadingSubmissions(false);
    }, (err) => {
      console.error("Firestore listener failed:", err);
      setLoadingSubmissions(false);
    });

    return () => unsubscribe();
  }, []);

  const filtered = filter === "all" ? submissions : submissions.filter((s) => s.status === filter);
  const selectedSubmission = submissions.find((s) => s.id === selectedId);

  // Auto-save draft to localStorage
  useEffect(() => {
    if (selectedId && feedback) {
      localStorage.setItem(`review-draft-${selectedId}`, feedback);
    }
  }, [feedback, selectedId]);

  // Load draft when selecting a submission
  useEffect(() => {
    if (selectedId) {
      const draft = localStorage.getItem(`review-draft-${selectedId}`);
      if (draft) setFeedback(draft);
      else setFeedback("");
      setScore(85);
    }
  }, [selectedId]);

  // ── Score constraint helpers ──
  const handleScoreInput = useCallback((value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    if (cleaned === "") {
      setScore(0);
      return;
    }
    const num = parseInt(cleaned, 10);
    setScore(Math.max(0, Math.min(100, num)));
  }, []);

  const handleScoreSlider = useCallback((value: string) => {
    setScore(parseInt(value, 10));
  }, []);

  // ── Validation ──
  const isScoreValid = score >= 0 && score <= 100;
  const isFeedbackValid = feedback.trim().length >= 10;
  const canSubmitReview = isScoreValid && isFeedbackValid && !processingReview;
  const hasDraftContent = feedback.trim().length > 0 || score !== 85;

  // ── Close panel with guard ──
  const handleClosePanel = useCallback(() => {
    if (hasDraftContent) {
      setPendingClose(true);
      setShowCloseGuard(true);
    } else {
      setSelectedId(null);
      setFeedback("");
      setScore(85);
    }
  }, [hasDraftContent]);

  const confirmClosePanel = useCallback(() => {
    setShowCloseGuard(false);
    setPendingClose(false);
    if (selectedId) localStorage.removeItem(`review-draft-${selectedId}`);
    setSelectedId(null);
    setFeedback("");
    setScore(85);
  }, [selectedId]);

  // ── Insert feedback template ──
  const insertTemplate = useCallback((template: string) => {
    setFeedback((prev) => {
      const prefix = prev.trim() ? prev.trim() + "\n• " : "• ";
      return prefix + template;
    });
  }, []);

  // ── Firestore persistence Actions ──
  const handleApprove = async () => {
    if (!selectedId || !user) return;
    setProcessingReview(true);
    try {
      const docRef = doc(db, "submissions", selectedId);
      await updateDoc(docRef, {
        status: "approved",
        score,
        feedback,
        reviewedAt: serverTimestamp(),
        reviewedBy: user.uid,
      });

      localStorage.removeItem(`review-draft-${selectedId}`);
      setSelectedId(null);
      setFeedback("");
      setScore(85);
    } catch (error) {
      console.error("Approve failed in Firestore:", error);
    } finally {
      setProcessingReview(false);
      setShowApproveDialog(false);
    }
  };

  const handleRevision = async () => {
    if (!selectedId || !user) return;
    setProcessingReview(true);
    try {
      const docRef = doc(db, "submissions", selectedId);
      await updateDoc(docRef, {
        status: "revision",
        score,
        feedback,
        reviewedAt: serverTimestamp(),
        reviewedBy: user.uid,
      });

      localStorage.removeItem(`review-draft-${selectedId}`);
      setSelectedId(null);
      setFeedback("");
      setScore(85);
    } catch (error) {
      console.error("Revision post failed in Firestore:", error);
    } finally {
      setProcessingReview(false);
      setShowRevisionDialog(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold mb-1">Submission Reviews</h1>
        <p className="text-[var(--text-secondary)] text-sm">Audit codebases and deliver feedback ratings to real-time candidates</p>
      </div>

      {/* Filters */}
      <div className="flex gap-1 p-1 rounded-lg bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)] w-fit">
        {["all", "pending", "approved", "revision"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
              filter === f ? "bg-[var(--color-primary)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submissions List */}
        <div className="space-y-3">
          {loadingSubmissions ? (
            <div className="p-8 border border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 rounded-2xl flex items-center justify-center text-[var(--text-secondary)] text-sm">
              <svg className="w-4 h-4 animate-spin text-[var(--color-primary)] mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Fetching latest assignments...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 border-2 border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)]/10 rounded-2xl text-center text-[var(--text-muted)]">
              <span className="text-3xl block mb-2">🗃️</span>
              <p className="font-bold text-sm text-[var(--text-secondary)]">No items found</p>
              <p className="text-xs mt-1">All candidates in this queue are currently synchronized.</p>
            </div>
          ) : (
            filtered.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setSelectedId(sub.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedId === sub.id
                    ? "border-[var(--color-primary)]/50 bg-[var(--color-primary)]/5"
                    : "border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 hover:border-[var(--color-primary)]/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold flex-shrink-0 select-none shadow-sm uppercase">
                    {sub.studentAvatar || "S"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate capitalize">{sub.projectName}</p>
                    <p className="text-xs text-[var(--text-muted)] truncate">
                      <span className="font-bold text-[var(--text-secondary)]">{sub.studentName}</span> • {sub.track} • {sub.submitted}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold select-none capitalize ${
                    sub.status === "approved" ? "bg-[var(--color-success)]/10 text-[var(--color-success)]" :
                    sub.status === "revision" ? "bg-[var(--color-warning)]/10 text-[var(--color-warning)]" :
                    "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  }`}>
                    {sub.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Review Panel */}
        {selectedId && selectedSubmission ? (
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 p-6 lg:sticky lg:top-24 h-fit animate-slide-down">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Review Submission</h3>
              <button
                onClick={handleClosePanel}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors font-medium flex items-center gap-1"
                title="Close review panel"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </button>
            </div>

            <div className="mb-4 p-3 rounded-lg bg-[var(--bg-primary)]/30 border border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--text-muted)] mb-1">GitHub Repository Reference</p>
              <a href={selectedSubmission.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-accent)] hover:underline font-mono break-all">
                {selectedSubmission.githubUrl}
              </a>
            </div>

            {selectedSubmission.note && (
              <div className="mb-4 p-3 rounded-lg bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)] italic text-xs text-[var(--text-secondary)] leading-relaxed">
                &quot;{selectedSubmission.note}&quot;
              </div>
            )}

            {/* Score — Constrained slider + number input */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                Score (0–100) <span className="text-[var(--color-error)]">*</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={score}
                  onChange={(e) => handleScoreSlider(e.target.value)}
                  className="flex-1 h-2 rounded-full appearance-none cursor-pointer accent-[var(--color-primary)]"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) ${score}%, rgba(0,0,0,0.06) ${score}%)`,
                  }}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min={0}
                  max={100}
                  value={score}
                  onChange={(e) => handleScoreInput(e.target.value)}
                  className="w-16 px-2 py-1.5 rounded-lg bg-[var(--bg-primary)]/50 border border-[var(--border-subtle)] text-sm text-center font-bold text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
              {/* Score label */}
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] text-[var(--text-muted)]">Failing</span>
                <span className={`text-[11px] font-bold ${
                  score >= 90 ? "text-[var(--color-success)]" :
                  score >= 70 ? "text-[#84CC16]" :
                  score >= 50 ? "text-[var(--color-warning)]" :
                  "text-[var(--color-error)]"
                }`}>
                  {score >= 90 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Needs Work" : "Failing"}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">Excellent</span>
              </div>
            </div>

            {/* Feedback — with character counter */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                Feedback <span className="text-[var(--color-error)]">*</span>
                <span className="text-[10px] text-[var(--text-muted)] ml-1 font-normal">(min 10 characters)</span>
              </label>

              {/* Quick feedback templates */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {FEEDBACK_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl}
                    type="button"
                    onClick={() => insertTemplate(tpl)}
                    className="feedback-pill"
                  >
                    + {tpl}
                  </button>
                ))}
              </div>

              <textarea
                rows={5}
                value={feedback}
                onChange={(e) => {
                  if (e.target.value.length <= FEEDBACK_MAX) setFeedback(e.target.value);
                }}
                placeholder="Provide detailed feedback on code quality, approach, and areas for improvement..."
                className={`w-full px-4 py-2.5 rounded-lg bg-[var(--bg-primary)]/50 border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none ${feedback.length >= FEEDBACK_MAX ? "input-warning" : ""}`}
              />
              <div className="flex items-center justify-between mt-1">
                {feedback.length > 0 && feedback.trim().length < 10 && (
                  <span className="text-[11px] text-[var(--color-warning)]">
                    Minimum 10 characters required
                  </span>
                )}
                <span className={`char-counter ml-auto ${
                  feedback.length >= FEEDBACK_MAX ? "over" : feedback.length > FEEDBACK_MAX * 0.9 ? "warn" : "ok"
                }`}>
                  {feedback.length}/{FEEDBACK_MAX}
                </span>
              </div>
              {/* Draft saved indicator */}
              {feedback.length > 0 && (
                <p className="text-[10px] text-[var(--text-muted)] mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Draft saved locally
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowApproveDialog(true)}
                disabled={!canSubmitReview}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-[#10B981] hover:bg-[#059669] shadow-[0_6px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.35)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-1.5"
                title={!canSubmitReview ? "Provide a score and at least 10 characters of feedback" : "Approve implementation"}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Approve
              </button>
              <button
                onClick={() => setShowRevisionDialog(true)}
                disabled={!canSubmitReview}
                className="flex-1 py-3 rounded-xl text-sm font-semibold border-2 border-[var(--color-warning)] text-[var(--color-warning)] hover:bg-[var(--color-warning)]/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                title={!canSubmitReview ? "Provide a score and at least 10 characters of feedback" : "Send for revision"}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Revision
              </button>
            </div>

            {!canSubmitReview && (score !== 85 || feedback.length > 0) && (
              <p className="text-[11px] text-[var(--color-warning)] text-center mt-2 animate-slide-down">
                {!isFeedbackValid ? "Feedback must be at least 10 characters" : "Please enter a valid score (0–100)"}
              </p>
            )}
          </div>
        ) : (
          <div className="hidden lg:flex flex-col items-center justify-center text-center border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)]/10 rounded-xl p-12 h-[400px]">
            <span className="text-4xl block mb-3 select-none opacity-60">👁️</span>
            <h3 className="font-bold text-[var(--text-secondary)] text-base">Desk Unoccupied</h3>
            <p className="text-xs text-[var(--text-muted)] max-w-[220px] mx-auto mt-1">Select a submitted project from the left queue to open the auditing environment.</p>
          </div>
        )}
      </div>

      {/* ── UI Bug Shield: Wrapped dialogue in truthy constraints to defeat `"undefined"` prop string ticks ── */}
      {selectedSubmission && (
        <>
          {/* Approve Confirmation Dialog */}
          <ConfirmDialog
            open={showApproveDialog}
            onClose={() => setShowApproveDialog(false)}
            onConfirm={handleApprove}
            title="Approve Submission?"
            description={`You are about to approve "${selectedSubmission.projectName}" by ${selectedSubmission.studentName} with a score of ${score}/100. This will notify the student and mark the submission as complete.`}
            confirmLabel="Approve & Notify"
            cancelLabel="Go Back"
            variant="info"
            loading={processingReview}
          />

          {/* Revision Confirmation Dialog */}
          <ConfirmDialog
            open={showRevisionDialog}
            onClose={() => setShowRevisionDialog(false)}
            onConfirm={handleRevision}
            title="Request Revision?"
            description={`This will send "${selectedSubmission.projectName}" back to ${selectedSubmission.studentName} for revision with your feedback. Make sure your instructions are actionable.`}
            confirmLabel="Send for Revision"
            cancelLabel="Go Back"
            variant="warning"
            loading={processingReview}
          />
        </>
      )}

      {/* Close Panel Guard — unsaved feedback warning */}
      <ConfirmDialog
        open={showCloseGuard}
        onClose={() => {
          setShowCloseGuard(false);
          setPendingClose(false);
        }}
        onConfirm={confirmClosePanel}
        title="Discard unsaved review?"
        description="You have an in-progress review with feedback that hasn't been submitted. If you close this panel, your draft will be discarded."
        confirmLabel="Discard Draft"
        cancelLabel="Keep Editing"
        variant="warning"
      />
    </div>
  );
}
